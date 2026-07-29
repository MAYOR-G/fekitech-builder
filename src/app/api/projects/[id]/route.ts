import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { isValidEditableData, projectIdSchema, updateProjectSchema } from "@/lib/project-validation";
import { isSubdomainAvailable, validateSubdomain } from "@/lib/subdomains";
import { getStorage } from "@/lib/storage";
import { isCompatibleTemplateData, isTemplateData } from "@/lib/template-data";
import { getTemplate } from "@/registry";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .neq("status", "deleted")
    .is("deleted_at", null)
    .single();

  if (error || !project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  
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

  return NextResponse.json({ project: mappedProject });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request);
  if (contentError) return contentError;

  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-update",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 120,
    windowSeconds: 60,
  });
  if (rateLimit) return rateLimit;

  const parsed = updateProjectSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "The project update is invalid or too large." }, { status: 400 });
  }
  const editableData = parsed.data.editableData;
  if (editableData !== undefined && (!isValidEditableData(editableData) || !isTemplateData(editableData))) {
    return NextResponse.json({ error: "The project update is invalid or too large." }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .neq("status", "deleted")
    .is("deleted_at", null)
    .single();

  if (fetchError || !existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  if (editableData !== undefined) {
    const template = getTemplate(existing.template_id);
    if (!template || !isCompatibleTemplateData(template.defaultData, editableData)) {
      return NextResponse.json({ error: "The project data does not match this template." }, { status: 400 });
    }
  }

  let nextSubdomain: string | null | undefined;
  if (parsed.data.subdomain !== undefined) {
    if (parsed.data.subdomain === null || parsed.data.subdomain === "") {
      nextSubdomain = null;
    } else {
      const validation = validateSubdomain(parsed.data.subdomain);
      if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });
      if (!(await isSubdomainAvailable(validation.value, existing.id))) {
        return NextResponse.json({ error: "That subdomain is already reserved." }, { status: 409 });
      }
      nextSubdomain = validation.value;
    }
  }

  const admin = getAdminDb();

  // Handle subdomain reservation changes
  if (nextSubdomain !== undefined && nextSubdomain !== existing.subdomain) {
    if (existing.subdomain) {
      await admin
        .from("subdomain_reservations")
        .upsert({
          subdomain: existing.subdomain,
          user_id: existing.user_id,
          project_id: existing.id,
          released_at: new Date().toISOString(),
        }, { onConflict: "subdomain" });
    }
    if (nextSubdomain) {
      const { error: reserveError } = await admin
        .from("subdomain_reservations")
        .insert({
          subdomain: nextSubdomain,
          user_id: existing.user_id,
          project_id: existing.id,
        });
      if (reserveError) {
        return NextResponse.json({ error: "That hostname was reserved by another request." }, { status: 409 });
      }
    }
  }

  const updateData: Record<string, unknown> = {};
  if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
  if (editableData !== undefined) updateData.editable_data = editableData;
  if (nextSubdomain !== undefined) updateData.subdomain = nextSubdomain;

  const { data: project, error: updateError } = await supabase
    .from("projects")
    .update(updateData)
    .eq("id", existing.id)
    .select()
    .single();

  if (updateError) {
    console.error("PATCH /api/projects/[id] error", updateError);
    return NextResponse.json({ error: "Unable to save the project." }, { status: 500 });
  }

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

  return NextResponse.json({ project: mappedProject });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-delete",
    identifier: sessionOrResponse.user.id,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const supabase = await createClient();
  const { data: existing, error: fetchError } = await supabase
    .from("projects")
    .select("id, user_id, subdomain")
    .eq("id", id.data)
    .eq("user_id", sessionOrResponse.user.id)
    .neq("status", "deleted")
    .is("deleted_at", null)
    .single();

  if (fetchError || !existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  // Get assets for cleanup
  const { data: assets } = await supabase
    .from("assets")
    .select("storage_key")
    .eq("project_id", existing.id)
    .is("deleted_at", null);

  const admin = getAdminDb();

  // Release subdomain
  if (existing.subdomain) {
    await admin
      .from("subdomain_reservations")
      .upsert({
        subdomain: existing.subdomain,
        user_id: existing.user_id,
        project_id: null,
        released_at: new Date().toISOString(),
      }, { onConflict: "subdomain" });
  }

  const deletedAt = new Date().toISOString();
  const { error: deleteError } = await supabase
    .from("projects")
    .update({
      status: "deleted",
      deleted_at: deletedAt,
      is_published: false,
      published_at: null,
      published_version_id: null,
      subdomain: null,
    })
    .eq("id", existing.id);

  if (deleteError) {
    console.error("DELETE /api/projects/[id] error", deleteError);
    return NextResponse.json({ error: "Unable to delete the project." }, { status: 500 });
  }

  // Log activity
  await admin.from("activity_logs").insert({
    user_id: existing.user_id,
    action: "project.deleted",
    details: JSON.stringify({ projectId: existing.id }),
  });

  // Cleanup storage
  if (assets && assets.length > 0) {
    const storage = getStorage();
    const cleanup = await Promise.allSettled(assets.map((asset) => storage.delete(asset.storage_key)));
    if (cleanup.some((result) => result.status === "rejected")) {
      console.error("Some project assets could not be removed from storage", { projectId: existing.id });
    }
  }

  return NextResponse.json({ success: true });
}
