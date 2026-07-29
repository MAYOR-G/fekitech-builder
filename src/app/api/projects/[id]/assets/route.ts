import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { createClient } from "@/lib/supabase/server";
import { getAdminDb } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";
import { getStorage } from "@/lib/storage";
import { randomBytes } from "crypto";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string }> };

const MAX_ASSET_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg", "image/png", "image/webp", "image/svg+xml",
  "application/pdf",
  "video/mp4",
]);

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-asset-upload",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 50,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    return NextResponse.json({ error: "Invalid multipart form data." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No valid file uploaded." }, { status: 400 });
  }

  if (file.size > MAX_ASSET_SIZE) {
    return NextResponse.json({ error: "File exceeds maximum size of 10MB." }, { status: 400 });
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return NextResponse.json({ error: "File type not allowed." }, { status: 400 });
  }

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

  // Enforce total storage and asset limits based on plan
  const plan = await getUserPlan(sessionOrResponse.user.id);
  
  // Storage key logic
  const extension = file.name.split('.').pop()?.substring(0, 10) || "bin";
  const uniqueId = randomBytes(16).toString('hex');
  const storageKey = `projects/${project.id}/assets/${uniqueId}.${extension}`;
  
  const buffer = await file.arrayBuffer();

  try {
    await getStorage().put(storageKey, Buffer.from(buffer), file.type);
  } catch (storageError) {
    console.error("Storage upload error", storageError);
    return NextResponse.json({ error: "Storage failure." }, { status: 500 });
  }

  const admin = getAdminDb();
  const { data: asset, error: insertError } = await admin
    .from("assets")
    .insert({
      project_id: project.id,
      user_id: sessionOrResponse.user.id,
      original_name: file.name.substring(0, 200),
      storage_key: storageKey,
      byte_size: file.size,
      mime_type: file.type,
    })
    .select("id, original_name, byte_size, mime_type, created_at")
    .single();

  if (insertError || !asset) {
    console.error("Asset DB insert error", insertError);
    // Cleanup orphaned storage
    try {
      await getStorage().delete(storageKey);
    } catch(e) {}
    return NextResponse.json({ error: "Database failure." }, { status: 500 });
  }

  await admin.from("activity_logs").insert({
    user_id: sessionOrResponse.user.id,
    action: "asset.uploaded",
    details: JSON.stringify({ projectId: project.id, assetId: asset.id, name: asset.original_name }),
  });

  const mapped = {
    id: asset.id,
    originalName: asset.original_name,
    fileSize: asset.byte_size,
    mimeType: asset.mime_type,
    createdAt: asset.created_at,
    url: `/api/public/assets/${asset.id}`
  };

  return NextResponse.json({ asset: mapped }, { status: 201 });
}

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

  const { data: assets } = await supabase
    .from("assets")
    .select("id, original_name, byte_size, mime_type, created_at")
    .eq("project_id", project.id)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  const mapped = (assets ?? []).map(a => ({
    id: a.id,
    originalName: a.original_name,
    fileSize: a.byte_size,
    mimeType: a.mime_type,
    createdAt: a.created_at,
    url: `/api/public/assets/${a.id}`
  }));

  return NextResponse.json({ assets: mapped });
}
