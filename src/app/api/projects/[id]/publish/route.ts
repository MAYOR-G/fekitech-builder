import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { canPlanUseTemplate } from "@/lib/plans";
import { projectIdSchema } from "@/lib/project-validation";
import { canPublishProject } from "@/lib/subscriptions";
import { slugifySubdomain } from "@/lib/subdomains";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-publish",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null)
    .single();

  if (fetchError || !existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const access = await canPublishProject(sessionOrResponse.user.id, existing.is_published);
  if (!access.allowed) return NextResponse.json({ error: access.reason }, { status: 403 });
  if (!canPlanUseTemplate(access.plan.id, existing.template_id)) {
    return NextResponse.json({ error: "Your current plan does not include this template." }, { status: 403 });
  }

  const admin = getAdminDb();

  // Check published count
  const { count: publishedCount } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null)
    .eq("is_published", true)
    .neq("id", existing.id);

  if ((publishedCount ?? 0) >= access.plan.definition.entitlements.maxPublishedProjects) {
    return NextResponse.json({ error: "Your published website limit has been reached." }, { status: 403 });
  }

  // Allocate subdomain if needed
  let subdomain = existing.subdomain;
  if (!subdomain) {
    subdomain = await allocateSubdomain(admin, existing.name, existing.id, existing.user_id);
    if (!subdomain) {
      return NextResponse.json({ error: "Unable to allocate a subdomain. Please choose one manually." }, { status: 409 });
    }
  } else {
    // Verify reservation is still valid
    const { data: reservation } = await admin
      .from("subdomain_reservations")
      .select("project_id")
      .eq("subdomain", subdomain)
      .single();

    if (reservation && reservation.project_id !== existing.id) {
      return NextResponse.json({ error: "The selected subdomain is no longer available." }, { status: 409 });
    }
    if (!reservation) {
      await admin.from("subdomain_reservations").insert({
        subdomain,
        project_id: existing.id,
        user_id: existing.user_id,
      });
    }
  }

  const publishedAt = new Date().toISOString();

  // Create publish snapshot version
  const { data: version, error: versionError } = await admin
    .from("template_versions")
    .insert({
      project_id: existing.id,
      version_name: `Published ${publishedAt}`,
      editable_data: existing.editable_data,
      data_version: existing.data_version,
      is_publish_snapshot: true,
      published_at: publishedAt,
    })
    .select()
    .single();

  if (versionError || !version) {
    console.error("POST project publish version error", versionError);
    return NextResponse.json({ error: "Unable to publish the project." }, { status: 500 });
  }

  // Update project
  const { data: updated, error: updateError } = await supabase
    .from("projects")
    .update({
      is_published: true,
      published_at: publishedAt,
      subdomain,
      published_version_id: version.id,
    })
    .eq("id", existing.id)
    .select()
    .single();

  if (updateError) {
    console.error("POST project publish update error", updateError);
    return NextResponse.json({ error: "Unable to publish the project." }, { status: 500 });
  }

  // Log activity
  await admin.from("activity_logs").insert({
    user_id: existing.user_id,
    action: "project.published",
    details: JSON.stringify({ projectId: existing.id, versionId: version.id, subdomain }),
  });

  const rootDomain = process.env.ROOT_DOMAIN ?? "localhost:3000";
  const protocol = rootDomain.startsWith("localhost") || rootDomain.startsWith("127.0.0.1") ? "http" : "https";
  return NextResponse.json({ project: updated, url: `${protocol}://${updated.subdomain}.${rootDomain}` });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const supabase = await createClient();
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null)
    .single();

  if (fetchError || !project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const { error: updateError } = await supabase
    .from("projects")
    .update({ is_published: false, published_version_id: null })
    .eq("id", project.id);

  if (updateError) {
    return NextResponse.json({ error: "Unable to unpublish." }, { status: 500 });
  }

  const admin = getAdminDb();
  await admin.from("activity_logs").insert({
    user_id: sessionOrResponse.user.id,
    action: "project.unpublished",
    details: JSON.stringify({ projectId: project.id }),
  });

  return NextResponse.json({ success: true });
}

async function allocateSubdomain(
  admin: ReturnType<typeof getAdminDb>,
  projectName: string,
  projectId: string,
  userId: string,
): Promise<string | null> {
  const base = slugifySubdomain(projectName);
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? "" : `-${randomBytes(3).toString("hex")}`;
    const candidate = `${base.slice(0, 63 - suffix.length)}${suffix}`;

    const { error } = await admin
      .from("subdomain_reservations")
      .insert({
        subdomain: candidate,
        user_id: userId,
        project_id: projectId,
      });

    if (!error) return candidate;
  }
  return null;
}
