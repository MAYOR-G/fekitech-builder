import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { databaseJsonObject, projectIdSchema } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-duplicate",
    identifier: sessionOrResponse.user.id,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;
  const plan = await getUserPlan(sessionOrResponse.user.id);

  try {
    const project = await prisma.$transaction(async (transaction) => {
      const source = await transaction.project.findFirst({
        where: { id: id.data, userId: sessionOrResponse.user.id },
      });
      if (!source) throw new DuplicateError("Project not found.", 404);
      const count = await transaction.project.count({ where: { userId: sessionOrResponse.user.id } });
      if (count >= plan.definition.entitlements.maxProjects) {
        throw new DuplicateError(`Your ${plan.definition.name} plan project limit has been reached.`, 403);
      }
      const duplicate = await transaction.project.create({
        data: {
          userId: source.userId,
          name: `${source.name} copy`.slice(0, 120),
          templateId: source.templateId,
          editableData: databaseJsonObject(source.editableData),
          dataVersion: source.dataVersion,
        },
      });
      await transaction.activityLog.create({
        data: {
          userId: source.userId,
          action: "project.duplicated",
          details: JSON.stringify({ sourceProjectId: source.id, projectId: duplicate.id }),
        },
      });
      return duplicate;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof DuplicateError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") {
      return NextResponse.json({ error: "Project capacity changed. Please retry." }, { status: 409 });
    }
    console.error("POST project duplicate error", error);
    return NextResponse.json({ error: "Unable to duplicate the project." }, { status: 500 });
  }
}

class DuplicateError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
