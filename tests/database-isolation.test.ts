import { randomUUID } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/db";

const databaseAvailable = /^postgres(?:ql)?:\/\//.test(process.env.DATABASE_URL ?? "");
const runId = randomUUID();
const ownerId = `owner-${runId}`;
const strangerId = `stranger-${runId}`;
const projectId = `project-${runId}`;

describe.skipIf(!databaseAvailable)("database tenant isolation and immutable snapshots", () => {
  beforeAll(async () => {
    await prisma.$connect();
    await prisma.user.createMany({
      data: [
        { id: ownerId, name: "Owner", email: `${ownerId}@example.test` },
        { id: strangerId, name: "Stranger", email: `${strangerId}@example.test` },
      ],
    });
    await prisma.project.create({
      data: {
        id: projectId,
        userId: ownerId,
        name: "Isolation test",
        templateId: "barber-website",
        editableData: { hero: { title: "Draft one" } },
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { id: { in: [ownerId, strangerId] } } });
    await prisma.$disconnect();
  });

  it("returns a project only when the authenticated owner is part of the query", async () => {
    const ownerProject = await prisma.project.findFirst({ where: { id: projectId, userId: ownerId } });
    const leakedProject = await prisma.project.findFirst({ where: { id: projectId, userId: strangerId } });
    expect(ownerProject?.id).toBe(projectId);
    expect(leakedProject).toBeNull();
  });

  it("does not expose an unpublished project through the public query", async () => {
    const publicProject = await prisma.project.findFirst({
      where: { id: projectId, isPublished: true, publishedVersionId: { not: null } },
    });
    expect(publicProject).toBeNull();
  });

  it("keeps a version snapshot unchanged after the draft changes", async () => {
    const version = await prisma.templateVersion.create({
      data: {
        projectId,
        versionName: "Snapshot",
        editableData: { hero: { title: "Draft one" } },
      },
    });
    await prisma.project.update({
      where: { id: projectId },
      data: { editableData: { hero: { title: "Draft two" } } },
    });
    const snapshot = await prisma.templateVersion.findUniqueOrThrow({ where: { id: version.id } });
    expect(snapshot.editableData).toEqual({ hero: { title: "Draft one" } });
  });
});
