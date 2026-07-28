import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { customDomainSchema, projectIdSchema } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 8 * 1024);
  if (contentError) return contentError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  const parsed = customDomainSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid custom domain." }, { status: 400 });
  const domain = parsed.data.customDomain.toLowerCase();

  const rateLimit = await enforceRateLimit({
    scope: "project-domain",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 5,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const plan = await getUserPlan(sessionOrResponse.user.id);
  if (!plan.definition.entitlements.canUseCustomDomain) {
    return NextResponse.json({ error: `Your ${plan.definition.name} plan does not support custom domains.` }, { status: 403 });
  }

  if (domain.endsWith(".fekitech.com") || domain.endsWith(".fekitech-builder.vercel.app")) {
    return NextResponse.json({ error: "FekiTech system domains cannot be used as custom domains." }, { status: 400 });
  }

  const admin = getAdminDb();
  
  // Check global uniqueness of custom domain
  const { count } = await admin
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("custom_domain", domain);

  if ((count ?? 0) > 0) {
    return NextResponse.json({ error: "This domain is already connected to another project." }, { status: 409 });
  }

  const supabase = await createClient();
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("id, custom_domain")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .single();

  if (fetchError || !project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const { error: updateError } = await supabase
    .from("projects")
    .update({ custom_domain: domain })
    .eq("id", project.id);

  if (!updateError) {
    await admin.from("activity_logs").insert({
      user_id: sessionOrResponse.user.id,
      action: "project.domain_updated",
      details: JSON.stringify({ projectId: project.id, oldDomain: project.custom_domain, newDomain: domain }),
    });
  }

  return NextResponse.json({ success: true, domain });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-domain",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 5,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const supabase = await createClient();
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("id, custom_domain")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .single();

  if (fetchError || !project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const { error: updateError } = await supabase
    .from("projects")
    .update({ custom_domain: null })
    .eq("id", project.id);

  if (!updateError && project.custom_domain) {
    const admin = getAdminDb();
    await admin.from("activity_logs").insert({
      user_id: sessionOrResponse.user.id,
      action: "project.domain_removed",
      details: JSON.stringify({ projectId: project.id, removedDomain: project.custom_domain }),
    });
  }

  return NextResponse.json({ success: true });
}
