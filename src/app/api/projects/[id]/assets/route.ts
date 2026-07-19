import { randomUUID } from "node:crypto";
import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";
import { getStorage } from "@/lib/storage";
import { getUserPlan } from "@/lib/subscriptions";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

class AssetQuotaError extends Error {}

export async function GET(_request: NextRequest, context: RouteContext) {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const assets = await prisma.asset.findMany({
    where: { projectId: project.id, userId: sessionOrResponse.user.id, deletedAt: null },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      originalName: true,
      mimeType: true,
      byteSize: true,
      width: true,
      height: true,
      createdAt: true,
    },
  });
  return NextResponse.json({
    assets: assets.map((asset) => ({ ...asset, url: `/api/public/assets/${asset.id}` })),
  });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const plan = await getUserPlan(sessionOrResponse.user.id);
  if (!plan.definition.entitlements.canUploadImages) {
    return NextResponse.json({ error: "Image uploads require a Starter plan or higher." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  const requestLimit = plan.definition.entitlements.maxAssetBytes + 256 * 1024;
  if (!Number.isFinite(contentLength) || contentLength <= 0 || contentLength > requestLimit) {
    return NextResponse.json({ error: "The upload exceeds your plan's file-size limit." }, { status: 413 });
  }

  const rateLimit = await enforceRateLimit({
    scope: "asset-upload",
    identifier: sessionOrResponse.user.id,
    max: 30,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File) || file.size === 0 || file.size > plan.definition.entitlements.maxAssetBytes) {
    return NextResponse.json({ error: "Choose an image within your plan's file-size limit." }, { status: 400 });
  }

  let output: Buffer;
  let width: number;
  let height: number;
  try {
    const source = Buffer.from(await file.arrayBuffer());
    const image = sharp(source, { animated: true, limitInputPixels: 40_000_000, failOn: "warning" }).rotate();
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height || !["jpeg", "png", "webp", "gif", "avif"].includes(metadata.format ?? "")) {
      return NextResponse.json({ error: "Only valid JPEG, PNG, WebP, GIF, and AVIF images are accepted." }, { status: 415 });
    }
    const result = await image
      .resize({ width: 4096, height: 4096, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 84, effort: 4 })
      .toBuffer({ resolveWithObject: true });
    output = result.data;
    width = result.info.width;
    height = result.info.height;
  } catch {
    return NextResponse.json({ error: "The image could not be safely processed." }, { status: 415 });
  }

  const assetId = randomUUID();
  const storageKey = `${sessionOrResponse.user.id}/${project.id}/${assetId}.webp`;
  const storage = getStorage();
  await storage.put(storageKey, output, "image/webp");

  try {
    const asset = await prisma.$transaction(async (transaction) => {
      const [usage, projectAssetCount] = await Promise.all([
        transaction.asset.aggregate({
          where: { userId: sessionOrResponse.user.id, deletedAt: null },
          _sum: { byteSize: true },
        }),
        transaction.asset.count({ where: { projectId: project.id, deletedAt: null } }),
      ]);
      if (projectAssetCount >= plan.definition.entitlements.maxAssetsPerProject) {
        throw new AssetQuotaError("This project has reached its asset limit.");
      }
      if ((usage._sum.byteSize ?? 0) + output.length > plan.definition.entitlements.maxStorageBytes) {
        throw new AssetQuotaError("Your account has reached its storage limit.");
      }

      const created = await transaction.asset.create({
        data: {
          id: assetId,
          userId: sessionOrResponse.user.id,
          projectId: project.id,
          storageKey,
          originalName: file.name.slice(0, 255) || "image",
          mimeType: "image/webp",
          byteSize: output.length,
          width,
          height,
        },
        select: { id: true, originalName: true, mimeType: true, byteSize: true, width: true, height: true, createdAt: true },
      });
      await transaction.activityLog.create({
        data: {
          userId: sessionOrResponse.user.id,
          action: "asset.uploaded",
          details: JSON.stringify({ projectId: project.id, assetId: created.id, byteSize: created.byteSize }),
        },
      });
      return created;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    return NextResponse.json({ asset: { ...asset, url: `/api/public/assets/${asset.id}` } }, { status: 201 });
  } catch (error) {
    await storage.delete(storageKey);
    if (error instanceof AssetQuotaError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") {
      return NextResponse.json({ error: "The upload conflicted with another request. Try again." }, { status: 409 });
    }
    console.error("POST project asset failed", error);
    return NextResponse.json({ error: "Unable to save the image." }, { status: 500 });
  }
}
