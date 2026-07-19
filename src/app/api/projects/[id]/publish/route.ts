import { randomBytes } from "node:crypto";
import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { canPlanUseTemplate } from "@/lib/plans";
import { databaseJsonObject, projectIdSchema } from "@/lib/project-validation";
import { canPublishProject } from "@/lib/subscriptions";
import { slugifySubdomain } from "@/lib/subdomains";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-publish",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const existing = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
  });
  if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const access = await canPublishProject(sessionOrResponse.user.id, existing.isPublished);
  if (!access.allowed) return NextResponse.json({ error: access.reason }, { status: 403 });
  if (!canPlanUseTemplate(access.plan.id, existing.templateId)) {
    return NextResponse.json({ error: "Your current plan does not include this template." }, { status: 403 });
  }

  try {
    const updated = await prisma.$transaction(async (transaction) => {
      const project = await transaction.project.findFirst({
        where: { id: existing.id, userId: sessionOrResponse.user.id },
      });
      if (!project) throw new PublishError("Project not found.", 404);

      const publishedCount = await transaction.project.count({
        where: { userId: project.userId, isPublished: true, id: { not: project.id } },
      });
      if (publishedCount >= access.plan.definition.entitlements.maxPublishedProjects) {
        throw new PublishError("Your published website limit has been reached.", 403);
      }

      const subdomain = project.subdomain ?? await allocateSubdomain(transaction, project.name, project.id, project.userId);
      if (project.subdomain) {
        const reservation = await transaction.subdomainReservation.findUnique({ where: { subdomain } });
        if (reservation && reservation.projectId !== project.id) {
          throw new PublishError("The selected subdomain is no longer available.", 409);
        }
        if (!reservation) {
          await transaction.subdomainReservation.create({
            data: { subdomain, projectId: project.id, userId: project.userId },
          });
        }
      }

      const publishedAt = new Date();
      const version = await transaction.templateVersion.create({
        data: {
          projectId: project.id,
          versionName: `Published ${publishedAt.toISOString()}`,
          editableData: databaseJsonObject(project.editableData),
          dataVersion: project.dataVersion,
          isPublishSnapshot: true,
          publishedAt,
        },
      });

      await transaction.activityLog.create({
        data: {
          userId: project.userId,
          action: "project.published",
          details: JSON.stringify({ projectId: project.id, versionId: version.id, subdomain }),
        },
      });

      return transaction.project.update({
        where: { id: project.id },
        data: {
          isPublished: true,
          publishedAt,
          subdomain,
          publishedVersionId: version.id,
        },
      });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

    const rootDomain = process.env.ROOT_DOMAIN ?? "localhost:3000";
    const protocol = rootDomain.startsWith("localhost") || rootDomain.startsWith("127.0.0.1") ? "http" : "https";
    return NextResponse.json({ project: updated, url: `${protocol}://${updated.subdomain}.${rootDomain}` });
  } catch (error) {
    if (error instanceof PublishError) return NextResponse.json({ error: error.message }, { status: error.status });
    if (error instanceof Prisma.PrismaClientKnownRequestError && ["P2002", "P2034"].includes(error.code)) {
      return NextResponse.json({ error: "Publishing conflicted with another request. Please retry." }, { status: 409 });
    }
    console.error("POST project publish error", error);
    return NextResponse.json({ error: "Unable to publish the project." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  await prisma.$transaction([
    prisma.project.update({
      where: { id: project.id },
      data: { isPublished: false, publishedVersionId: null },
    }),
    prisma.activityLog.create({
      data: {
        userId: sessionOrResponse.user.id,
        action: "project.unpublished",
        details: JSON.stringify({ projectId: project.id }),
      },
    }),
  ]);
  return NextResponse.json({ success: true });
}

async function allocateSubdomain(
  transaction: Prisma.TransactionClient,
  projectName: string,
  projectId: string,
  userId: string,
): Promise<string> {
  const base = slugifySubdomain(projectName);
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const suffix = attempt === 0 ? "" : `-${randomBytes(3).toString("hex")}`;
    const candidate = `${base.slice(0, 63 - suffix.length)}${suffix}`;
    const inserted = await transaction.$queryRaw<Array<{ subdomain: string }>>`
      INSERT INTO "subdomain_reservation" ("subdomain", "userId", "projectId", "reservedAt")
      VALUES (${candidate}, ${userId}, ${projectId}, NOW())
      ON CONFLICT ("subdomain") DO NOTHING
      RETURNING "subdomain"
    `;
    if (inserted[0]) return candidate;
  }
  throw new PublishError("Unable to allocate a subdomain. Please choose one manually.", 409);
}

class PublishError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}
