import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string; versionId: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  
  const params = await context.params;
  const id = projectIdSchema.safeParse(params.id);
  const versionId = projectIdSchema.safeParse(params.versionId);
  if (!id.success || !versionId.success) return NextResponse.json({ error: "Invalid IDs." }, { status: 400 });

  const rateLimit = await enforceRateLimit({
    scope: "version-restore",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  // Enforce access control and quota limits (though restoration doesn't create a new project/version)
  const plan = await getUserPlan(sessionOrResponse.user.id);
  
  const supabase = await createClient();

  // Validate Project
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("id")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .single();

  if (projectError || !project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  // Load target version data
  const { data: version, error: versionError } = await supabase
    .from("template_versions")
    .select("editable_data, data_version, version_name")
    .eq("id", versionId.data)
    .eq("project_id", project.id)
    .single();

  if (versionError || !version) return NextResponse.json({ error: "Version not found." }, { status: 404 });

  // Update project
  const { error: updateError } = await supabase
    .from("projects")
    .update({
      editable_data: version.editable_data,
      data_version: version.data_version,
      updated_at: new Date().toISOString()
    })
    .eq("id", project.id);

  if (updateError) {
    console.error("POST project version restore error", updateError);
    return NextResponse.json({ error: "Unable to restore the version." }, { status: 500 });
  }

  const admin = getAdminDb();
  await admin.from("activity_logs").insert({
    user_id: sessionOrResponse.user.id,
    action: "project.version_restored",
    details: JSON.stringify({ projectId: project.id, versionId: versionId.data, versionName: version.version_name }),
  });

  return NextResponse.json({ success: true });
}
