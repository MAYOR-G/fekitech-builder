import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-duplicate",
    identifier: sessionOrResponse.user.id,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;
  const plan = await getUserPlan(sessionOrResponse.user.id);

  const supabase = await createClient();

  const { data: source, error: fetchError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null)
    .single();

  if (fetchError || !source) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("user_id", sessionOrResponse.user.id)
    .eq("status", "ready")
    .is("deleted_at", null);

  if ((count ?? 0) >= plan.definition.entitlements.maxProjects) {
    return NextResponse.json({ error: `Your ${plan.definition.name} plan project limit has been reached.` }, { status: 403 });
  }

  const { data: duplicate, error: insertError } = await supabase
    .from("projects")
    .insert({
      user_id: source.user_id,
      name: `${source.name} copy`.slice(0, 120),
      template_id: source.template_id,
      editable_data: source.editable_data,
      data_version: source.data_version,
      status: "ready",
    })
    .select()
    .single();

  if (insertError || !duplicate) {
    console.error("POST project duplicate error", insertError);
    return NextResponse.json({ error: "Unable to duplicate the project." }, { status: 500 });
  }

  const admin = getAdminDb();
  await admin.from("activity_logs").insert({
    user_id: source.user_id,
    action: "project.duplicated",
    details: JSON.stringify({ sourceProjectId: source.id, projectId: duplicate.id }),
  });

  return NextResponse.json({ project: duplicate }, { status: 201 });
}
