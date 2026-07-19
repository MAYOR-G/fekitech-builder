import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { projectIdSchema } from "@/lib/project-validation";
import { getStorage } from "@/lib/storage";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ assetId: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const assetId = projectIdSchema.safeParse((await context.params).assetId);
  if (!assetId.success) return new NextResponse(null, { status: 404 });

  const asset = await prisma.asset.findFirst({
    where: { id: assetId.data, deletedAt: null },
    include: { project: { select: { userId: true, isPublished: true } } },
  });
  if (!asset) return new NextResponse(null, { status: 404 });

  let canRead = asset.project.isPublished;
  if (!canRead) {
    const session = await auth.api.getSession({ headers: request.headers });
    canRead = session?.user.id === asset.project.userId;
  }
  if (!canRead) return new NextResponse(null, { status: 404 });

  const object = await getStorage().get(asset.storageKey, asset.mimeType);
  if (!object) return new NextResponse(null, { status: 404 });

  return new NextResponse(new Uint8Array(object.body), {
    headers: {
      "Content-Type": object.contentType,
      "Content-Length": String(object.body.length),
      "Cache-Control": asset.project.isPublished ? "public, max-age=31536000, immutable" : "private, no-store",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
