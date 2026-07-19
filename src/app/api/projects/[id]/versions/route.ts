import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { createVersionSchema, databaseJsonObject, projectIdSchema } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string }> };

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

  const plan = await getUserPlan(sessionOrResponse.user.id);
  const versions = await prisma.templateVersion.findMany({
    where: { projectId: project.id },
    orderBy: { createdAt: "desc" },
    take: plan.definition.entitlements.maxVersionsPerProject,
    select: {
      id: true,
      versionName: true,
      isPublishSnapshot: true,
      createdAt: true,
      publishedAt: true,
    },
  });
  return NextResponse.json({ versions, limit: plan.definition.entitlements.maxVersionsPerProject });
}

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 16 * 1024);
  if (contentError) return contentError;

  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  const parsed = createVersionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Provide a version name." }, { status: 400 });

  const rateLimit = await enforceRateLimit({
    scope: "version-create",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const plan = await getUserPlan(sessionOrResponse.user.id);
  try {
    const version = await prisma.$transaction(async (transaction) => {
      const project = await transaction.project.findFirst({
        where: { id: id.data, userId: sessionOrResponse.user.id },
      });
      if (!project) throw new VersionError("Project not found.", 404);

      const count = await transaction.templateVersion.count({
        where: { projectId: project.id, isPublishSnapshot: false },
      });
      if (count >= plan.definition.entitlements.maxVersionsPerProject) {
        throw new VersionError(
          `Your ${plan.definition.name} plan supports ${plan.definition.entitlements.maxVersionsPerProject} versions per project.`,
          403,
        );
      }

      const created = await transaction.templateVersion.create({
        data: {
          projectId: project.id,
          versionName: parsed.data.versionName,
          editableData: databaseJsonObject(project.editableData),
          dataVersion: project.dataVersion,
        },
        select: { id: true, versionName: true, createdAt: true, isPublishSnapshot: true },
      });
      await transaction.activityLog.create({
        data: {
          userId: sessionOrResponse.user.id,
          action: "project.version_created",
          details: JSON.stringify({ projectId: project.id, versionId: created.id }),
        },
      });
      return created;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    return NextResponse.json({ version }, { status: 201 });
  } catch (error) {
    if (error instanceof VersionError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") {
      return NextResponse.json({ error: "Version capacity changed. Please retry." }, { status: 409 });
    }
    console.error("POST project version error", error);
    return NextResponse.json({ error: "Unable to create the version." }, { status: 500 });
  }
}

class VersionError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
