import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/api-auth";
import { getAdminDb } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ assetId: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const assetId = projectIdSchema.safeParse((await context.params).assetId);
  if (!assetId.success) return new NextResponse(null, { status: 404 });

  const admin = getAdminDb();
  const { data: asset } = await admin
    .from("assets")
    .select(`
      id,
      storage_key,
      mime_type,
      projects!assets_project_id_fkey (user_id, is_published, status, deleted_at)
    `)
    .eq("id", assetId.data)
    .is("deleted_at", null)
    .single();

  if (!asset || !asset.projects) return new NextResponse(null, { status: 404 });

  // @ts-expect-error Supabase join types
  const project = asset.projects as { user_id: string; is_published: boolean; status?: string; deleted_at?: string | null };
  const isActiveProject = project.status !== "deleted" && !project.deleted_at;

  let canRead = isActiveProject && project.is_published;
  if (!canRead) {
    const session = await getSession();
    canRead = isActiveProject && session?.user.id === project.user_id;
  }
  if (!canRead) return new NextResponse(null, { status: 404 });

  const object = await getStorage().get(asset.storage_key, asset.mime_type);
  if (!object) return new NextResponse(null, { status: 404 });

  return new NextResponse(new Uint8Array(object.body), {
    headers: {
      "Content-Type": object.contentType,
      "Content-Length": String(object.body.length),
      "Cache-Control": project.is_published ? "public, max-age=31536000, immutable" : "private, no-store",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
