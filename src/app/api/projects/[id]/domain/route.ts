import { resolveTxt } from "node:dns/promises";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import {
  createDomainVerificationToken,
  hashDomainVerificationToken,
  normalizeCustomDomain,
} from "@/lib/domains";
import { projectIdSchema } from "@/lib/project-validation";
import {
  canUseCustomDomain,
  isAuthorizedPlanTester,
  isPlanTestModeEnabled,
} from "@/lib/subscriptions";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };
const domainSchema = z.object({ domain: z.string().trim().min(1).max(253) }).strict();
const verificationSchema = z.object({ bypassDns: z.boolean().optional().default(false) }).strict();

export async function POST(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 8 * 1024);
  if (contentError) return contentError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const rateLimit = await enforceRateLimit({
    scope: "domain-configure",
    identifier: sessionOrResponse.user.id,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const id = projectIdSchema.safeParse((await context.params).id);
  const parsed = domainSchema.safeParse(await request.json().catch(() => null));
  if (!id.success || !parsed.success) return NextResponse.json({ error: "Invalid domain request." }, { status: 400 });
  if (!(await canUseCustomDomain(sessionOrResponse.user.id))) {
    return NextResponse.json({ error: "Custom domains require a Growth plan or a supported custom service." }, { status: 403 });
  }

  const domain = normalizeCustomDomain(parsed.data.domain);
  if (!domain.valid) return NextResponse.json({ error: domain.error }, { status: 400 });
  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
    select: { id: true },
  });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const token = createDomainVerificationToken();
  try {
    await prisma.$transaction([
      prisma.project.update({
        where: { id: project.id },
        data: {
          customDomain: domain.value,
          customDomainVerifiedAt: null,
          customDomainVerificationTokenHash: hashDomainVerificationToken(token),
        },
      }),
      prisma.activityLog.create({
        data: {
          userId: sessionOrResponse.user.id,
          action: "domain.configured",
          details: JSON.stringify({ projectId: project.id, domain: domain.value }),
        },
      }),
    ]);
  } catch {
    return NextResponse.json({ error: "That domain is already connected to another project." }, { status: 409 });
  }

  return NextResponse.json({
    domain: domain.value,
    verified: false,
    dnsRecord: { type: "TXT", name: `_fekitech.${domain.value}`, value: token },
  });
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 4 * 1024);
  if (contentError) return contentError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const id = projectIdSchema.safeParse((await context.params).id);
  const parsed = verificationSchema.safeParse(await request.json().catch(() => ({})));
  if (!id.success || !parsed.success) return NextResponse.json({ error: "Invalid verification request." }, { status: 400 });

  const rateLimit = await enforceRateLimit({
    scope: "domain-verify",
    identifier: `${sessionOrResponse.user.id}:${id.data}`,
    max: 10,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
  });
  if (!project?.customDomain || !project.customDomainVerificationTokenHash) {
    return NextResponse.json({ error: "Configure a custom domain first." }, { status: 400 });
  }

  let verified = false;
  if (parsed.data.bypassDns) {
    const bypassAllowed =
      process.env.DOMAIN_VERIFICATION_BYPASS_ENABLED === "true" &&
      isPlanTestModeEnabled() &&
      await isAuthorizedPlanTester(sessionOrResponse.user.id, sessionOrResponse.user.email);
    if (!bypassAllowed) return NextResponse.json({ error: "DNS bypass is not available." }, { status: 403 });
    verified = true;
  } else {
    try {
      const records = (await resolveTxt(`_fekitech.${project.customDomain}`)).map((parts) => parts.join(""));
      verified = records.some(
        (token) => hashDomainVerificationToken(token) === project.customDomainVerificationTokenHash,
      );
    } catch {
      verified = false;
    }
  }

  if (!verified) {
    return NextResponse.json({ error: "The expected TXT verification record was not found." }, { status: 409 });
  }

  await prisma.$transaction([
    prisma.project.update({
      where: { id: project.id },
      data: { customDomainVerifiedAt: new Date(), customDomainVerificationTokenHash: null },
    }),
    prisma.activityLog.create({
      data: {
        userId: sessionOrResponse.user.id,
        action: "domain.verified",
        details: JSON.stringify({ projectId: project.id, domain: project.customDomain }),
      },
    }),
  ]);
  return NextResponse.json({ domain: project.customDomain, verified: true });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const rateLimit = await enforceRateLimit({
    scope: "domain-disconnect",
    identifier: sessionOrResponse.user.id,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;
  const id = projectIdSchema.safeParse((await context.params).id);
  if (!id.success) return NextResponse.json({ error: "Project not found." }, { status: 404 });

  const project = await prisma.project.findFirst({
    where: { id: id.data, userId: sessionOrResponse.user.id },
    select: { id: true, customDomain: true },
  });
  if (!project) return NextResponse.json({ error: "Project not found." }, { status: 404 });
  await prisma.$transaction([
    prisma.project.update({
      where: { id: project.id },
      data: {
        customDomain: null,
        customDomainVerifiedAt: null,
        customDomainVerificationTokenHash: null,
      },
    }),
    prisma.activityLog.create({
      data: {
        userId: sessionOrResponse.user.id,
        action: "domain.disconnected",
        details: JSON.stringify({ projectId: project.id, domain: project.customDomain }),
      },
    }),
  ]);
  return NextResponse.json({ success: true });
}
