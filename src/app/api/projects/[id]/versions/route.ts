import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { createVersionSchema, projectIdSchema } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null)
    .single();

  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const plan = await getUserPlan(sessionOrResponse.user.id);
  const { data: versions } = await supabase
    .from("template_versions")
    .select("id, version_name, is_publish_snapshot, created_at, published_at")
    .eq("project_id", project.id)
    .order("created_at", { ascending: false })
    .limit(plan.definition.entitlements.maxVersionsPerProject);

  // Map back to camelCase for frontend
  const mapped = (versions ?? []).map(v => ({
    id: v.id,
    versionName: v.version_name,
    isPublishSnapshot: v.is_publish_snapshot,
    createdAt: v.created_at,
    publishedAt: v.published_at,
  }));

  return NextResponse.json({ versions: mapped, limit: plan.definition.entitlements.maxVersionsPerProject });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 16 * 1024);
  if (contentError) return contentError;

  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  const parsed = createVersionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Provide a version name." }, { status: 400 });

  const rateLimit = await enforceRateLimit({
    scope: "version-create",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const plan = await getUserPlan(sessionOrResponse.user.id);
  const supabase = await createClient();

  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null)
    .single();

  if (fetchError || !project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const { count } = await supabase
    .from("template_versions")
    .select("id", { count: "exact", head: true })
    .eq("project_id", project.id)
    .eq("is_publish_snapshot", false);

  if ((count ?? 0) >= plan.definition.entitlements.maxVersionsPerProject) {
    return NextResponse.json({
      error: `Your ${plan.definition.name} plan supports ${plan.definition.entitlements.maxVersionsPerProject} versions per project.`
    }, { status: 403 });
  }

  const { data: created, error: insertError } = await supabase
    .from("template_versions")
    .insert({
      project_id: project.id,
      version_name: parsed.data.versionName,
      editable_data: project.editable_data,
      data_version: project.data_version,
    })
    .select("id, version_name, created_at, is_publish_snapshot")
    .single();

  if (insertError || !created) {
    console.error("POST project version error", insertError);
    return NextResponse.json({ error: "Unable to create the version." }, { status: 500 });
  }

  const admin = getAdminDb();
  await admin.from("activity_logs").insert({
    user_id: sessionOrResponse.user.id,
    action: "project.version_created",
    details: JSON.stringify({ projectId: project.id, versionId: created.id }),
  });

  const mapped = {
    id: created.id,
    versionName: created.version_name,
    createdAt: created.created_at,
    isPublishSnapshot: created.is_publish_snapshot,
  };

  return NextResponse.json({ version: mapped }, { status: 201 });
}
