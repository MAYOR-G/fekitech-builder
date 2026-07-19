import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
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

  const asset = await prisma.asset.findFirst({
    where: { id: assetId.data, userId: sessionOrResponse.user.id, deletedAt: null },
  });
  if (!asset) return NextResponse.json({ error: "Asset not found." }, { status: 404 });

  await prisma.$transaction([
    prisma.asset.update({ where: { id: asset.id }, data: { deletedAt: new Date() } }),
    prisma.activityLog.create({
      data: {
        userId: sessionOrResponse.user.id,
        action: "asset.deleted",
        details: JSON.stringify({ projectId: asset.projectId, assetId: asset.id }),
      },
    }),
  ]);
  try {
    await getStorage().delete(asset.storageKey);
  } catch (error) {
    console.error("Deleted asset storage cleanup failed", { assetId: asset.id, error });
  }
  return NextResponse.json({ success: true });
}
