import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { getAdminDb } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";
import { projectIdSchema } from "@/lib/project-validation";
import { getStorage } from "@/lib/storage";

type RouteContext = { params: Promise<{ assetId: string }> };

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const assetId = projectIdSchema.safeParse((await context.params).assetId);
  if (!assetId.success) return NextResponse.json({ error: "Asset not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "asset-delete",
    identifier: sessionOrResponse.user.id,
    max: 60,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const supabase = await createClient();
  const { data: asset, error: fetchError } = await supabase
    .from("assets")
    .select("id, project_id, storage_key")
    .eq("id", assetId.data)
    .eq("user_id", sessionOrResponse.user.id)
    .is("deleted_at", null)
    .single();

  if (fetchError || !asset) return NextResponse.json({ error: "Asset not found." }, { status: 404 });

  const { error: updateError } = await supabase
    .from("assets")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", asset.id);

  if (!updateError) {
    const admin = getAdminDb();
    await admin.from("activity_logs").insert({
      user_id: sessionOrResponse.user.id,
      action: "asset.deleted",
      details: JSON.stringify({ projectId: asset.project_id, assetId: asset.id }),
    });

    try {
      await getStorage().delete(asset.storage_key);
    } catch (error) {
      console.error("Deleted asset storage cleanup failed", { assetId: asset.id, error });
    }
  }

  return NextResponse.json({ success: true });
}
