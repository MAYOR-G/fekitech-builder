import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { createProjectSchema, isValidEditableData } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";
import { canPlanUseTemplate } from "@/lib/plans";
import { getTemplate } from "@/registry";

export async function GET() {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, template_id, subdomain, custom_domain, custom_domain_verified_at, is_published, created_at, updated_at")
    .eq("user_id", sessionOrResponse.user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("GET /api/projects error", error);
    return NextResponse.json({ error: "Unable to load projects." }, { status: 500 });
  }

  // Map snake_case to camelCase for frontend compatibility
  const mapped = (projects ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    templateId: p.template_id,
    subdomain: p.subdomain,
    customDomain: p.custom_domain,
    customDomainVerifiedAt: p.custom_domain_verified_at,
    isPublished: p.is_published,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));

  return NextResponse.json({ projects: mapped });
}

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 16 * 1024);
  if (contentError) return contentError;

  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const rateLimit = await enforceRateLimit({
    scope: "project-create",
    identifier: sessionOrResponse.user.id,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const parsed = createProjectSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a valid template and project name." }, { status: 400 });
  }

  const template = getTemplate(parsed.data.templateId);
  if (!template || !isValidEditableData(template.defaultData)) {
    return NextResponse.json({ error: "That template is unavailable." }, { status: 404 });
  }

  const userPlan = await getUserPlan(sessionOrResponse.user.id);
  if (!canPlanUseTemplate(userPlan.id, parsed.data.templateId)) {
    return NextResponse.json(
      { error: `The ${template.config.name} template is not included in your ${userPlan.definition.name} plan.` },
      { status: 403 },
    );
  }

  const supabase = await createClient();

  // Check project count
  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("user_id", sessionOrResponse.user.id);

  if ((count ?? 0) >= userPlan.definition.entitlements.maxProjects) {
    return NextResponse.json(
      { error: `Your plan supports up to ${userPlan.definition.entitlements.maxProjects} projects.` },
      { status: 403 },
    );
  }

  const { data: project, error } = await supabase
    .from("projects")
    .insert({
      name: parsed.data.name ?? `My ${template.config.name} Website`,
      user_id: sessionOrResponse.user.id,
      template_id: parsed.data.templateId,
      editable_data: template.defaultData,
    })
    .select()
    .single();

  if (error) {
    console.error("POST /api/projects error", error);
    return NextResponse.json({ error: "Unable to create the project." }, { status: 500 });
  }

  // Log activity (using admin client to bypass RLS on activity_logs)
  const { getAdminDb } = await import("@/lib/db");
  const admin = getAdminDb();
  await admin.from("activity_logs").insert({
    user_id: sessionOrResponse.user.id,
    action: "project.created",
    details: JSON.stringify({ projectId: project.id, templateId: project.template_id }),
  });

  const mappedProject = {
    id: project.id,
    name: project.name,
    templateId: project.template_id,
    subdomain: project.subdomain,
    customDomain: project.custom_domain,
    customDomainVerifiedAt: project.custom_domain_verified_at,
    isPublished: project.is_published,
    editableData: project.editable_data,
    createdAt: project.created_at,
    updatedAt: project.updated_at,
  };

  return NextResponse.json({ project: mappedProject }, { status: 201 });
}
