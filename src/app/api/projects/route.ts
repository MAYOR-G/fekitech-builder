import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { createProjectSchema, isValidEditableData } from "@/lib/project-validation";
import { getUserPlan } from "@/lib/subscriptions";
import { canPlanUseTemplate } from "@/lib/plans";
import { getTemplate } from "@/registry";

export async function GET() {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const projects = await prisma.project.findMany({
    where: { userId: sessionOrResponse.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true,
      name: true,
      templateId: true,
      subdomain: true,
      customDomain: true,
      customDomainVerifiedAt: true,
      isPublished: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json({ projects });
}

export async function POST(request: NextRequest) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 16 * 1024);
  if (contentError) return contentError;

  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const rateLimit = await enforceRateLimit({
    scope: "project-create",
    identifier: sessionOrResponse.user.id,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const parsed = createProjectSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Provide a valid template and project name." }, { status: 400 });
  }

  const template = getTemplate(parsed.data.templateId);
  if (!template || !isValidEditableData(template.defaultData)) {
    return NextResponse.json({ error: "That template is unavailable." }, { status: 404 });
  }

  const userPlan = await getUserPlan(sessionOrResponse.user.id);
  if (!canPlanUseTemplate(userPlan.id, parsed.data.templateId)) {
    return NextResponse.json(
      { error: `The ${template.config.name} template is not included in your ${userPlan.definition.name} plan.` },
      { status: 403 },
    );
  }

  try {
    const project = await prisma.$transaction(async (transaction) => {
      const current = await transaction.project.count({ where: { userId: sessionOrResponse.user.id } });
      if (current >= userPlan.definition.entitlements.maxProjects) {
        throw new ProjectLimitError(userPlan.definition.entitlements.maxProjects);
      }

      const created = await transaction.project.create({
        data: {
          name: parsed.data.name ?? `My ${template.config.name} Website`,
          userId: sessionOrResponse.user.id,
          templateId: parsed.data.templateId,
          editableData: template.defaultData,
        },
      });
      await transaction.activityLog.create({
        data: {
          userId: sessionOrResponse.user.id,
          action: "project.created",
          details: JSON.stringify({ projectId: created.id, templateId: created.templateId }),
        },
      });
      return created;
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof ProjectLimitError) {
      return NextResponse.json(
        { error: `Your plan supports up to ${error.limit} projects.` },
        { status: 403 },
      );
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034") {
      return NextResponse.json({ error: "Project capacity changed. Please retry." }, { status: 409 });
    }
    console.error("POST /api/projects error", error);
    return NextResponse.json({ error: "Unable to create the project." }, { status: 500 });
  }
}

class ProjectLimitError extends Error {
  constructor(readonly limit: number) {
    super("Project limit reached");
  }
}
