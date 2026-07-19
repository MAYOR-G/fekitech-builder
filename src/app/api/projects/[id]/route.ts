import { Prisma } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { isValidEditableData, projectIdSchema, updateProjectSchema } from "@/lib/project-validation";
import { isSubdomainAvailable, validateSubdomain } from "@/lib/subdomains";
import { getStorage } from "@/lib/storage";
import { isCompatibleTemplateData, isTemplateData } from "@/lib/template-data";
import { getTemplate } from "@/registry";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, context: RouteContext) {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
  });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  return NextResponse.json({ project });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request);
  if (contentError) return contentError;

  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-update",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 120,
    windowSeconds: 60,
  });
  if (rateLimit) return rateLimit;

  const parsed = updateProjectSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "The project update is invalid or too large." }, { status: 400 });
  }
  const editableData = parsed.data.editableData;
  if (editableData !== undefined && (!isValidEditableData(editableData) || !isTemplateData(editableData))) {
    return NextResponse.json({ error: "The project update is invalid or too large." }, { status: 400 });
  }

  const existing = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
  });
  if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  if (editableData !== undefined) {
    const template = getTemplate(existing.templateId);
    if (!template || !isCompatibleTemplateData(template.defaultData, editableData)) {
      return NextResponse.json({ error: "The project data does not match this template." }, { status: 400 });
    }
  }

  let nextSubdomain: string | null | undefined;
  if (parsed.data.subdomain !== undefined) {
    if (parsed.data.subdomain === null || parsed.data.subdomain === "") {
      nextSubdomain = null;
    } else {
      const validation = validateSubdomain(parsed.data.subdomain);
      if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });
      if (!(await isSubdomainAvailable(validation.value, existing.id))) {
        return NextResponse.json({ error: "That subdomain is already reserved." }, { status: 409 });
      }
      nextSubdomain = validation.value;
    }
  }

  try {
    const project = await prisma.$transaction(async (transaction) => {
      if (nextSubdomain !== undefined && nextSubdomain !== existing.subdomain) {
        if (existing.subdomain) {
          await transaction.subdomainReservation.upsert({
            where: { subdomain: existing.subdomain },
            create: { subdomain: existing.subdomain, userId: existing.userId, projectId: existing.id, releasedAt: new Date() },
            update: { releasedAt: new Date() },
          });
        }
        if (nextSubdomain) {
          await transaction.subdomainReservation.create({
            data: { subdomain: nextSubdomain, userId: existing.userId, projectId: existing.id },
          });
        }
      }

      return transaction.project.update({
        where: { id: existing.id },
        data: {
          name: parsed.data.name,
          editableData,
          subdomain: nextSubdomain,
        },
      });
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    return NextResponse.json({ project });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && ["P2002", "P2034"].includes(error.code)) {
      return NextResponse.json({ error: "That hostname was reserved by another request." }, { status: 409 });
    }
    console.error("PATCH /api/projects/[id] error", error);
    return NextResponse.json({ error: "Unable to save the project." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const rateLimit = await enforceRateLimit({
    scope: "project-delete",
    identifier: sessionOrResponse.user.id,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const existing = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
    select: {
      id: true,
      userId: true,
      subdomain: true,
      assets: { where: { deletedAt: null }, select: { storageKey: true } },
    },
  });
  if (!existing) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  await prisma.$transaction(async (transaction) => {
    if (existing.subdomain) {
      await transaction.subdomainReservation.upsert({
        where: { subdomain: existing.subdomain },
        create: { subdomain: existing.subdomain, userId: existing.userId, releasedAt: new Date() },
        update: { projectId: null, releasedAt: new Date() },
      });
    }
    await transaction.project.delete({ where: { id: existing.id } });
    await transaction.activityLog.create({
      data: {
        userId: existing.userId,
        action: "project.deleted",
        details: JSON.stringify({ projectId: existing.id }),
      },
    });
  });

  if (existing.assets.length > 0) {
    const storage = getStorage();
    const cleanup = await Promise.allSettled(existing.assets.map((asset) => storage.delete(asset.storageKey)));
    if (cleanup.some((result) => result.status === "rejected")) {
      console.error("Some project assets could not be removed from storage", { projectId: existing.id });
    }
  }

  return NextResponse.json({ success: true });
}
