import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { databaseJsonObject, projectIdSchema } from "@/lib/project-validation";

type RouteContext = { params: Promise<{ id: string; versionId: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const params = await context.params;
  const id = projectIdSchema.safeParse(params.id);
  const versionId = projectIdSchema.safeParse(params.versionId);
  if (!id.success || !versionId.success) {
    return NextResponse.json({ error: "Version not found." }, { status: 404 });
  }

  const rateLimit = await enforceRateLimit({
    scope: "version-restore",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const version = await prisma.templateVersion.findFirst({
    where: {
      id: versionId.data,
      projectId: id.data,
      project: { userId: sessionOrResponse.user.id },
    },
  });
  if (!version) return NextResponse.json({ error: "Version not found." }, { status: 404 });

  const project = await prisma.project.update({
    where: { id: id.data },
    data: { editableData: databaseJsonObject(version.editableData), dataVersion: version.dataVersion },
    select: { id: true, editableData: true, dataVersion: true, updatedAt: true },
  });
  await prisma.activityLog.create({
    data: {
      userId: sessionOrResponse.user.id,
      action: "project.version_restored",
      details: JSON.stringify({ projectId: id.data, versionId: version.id }),
    },
  });

  return NextResponse.json({ project });
}
