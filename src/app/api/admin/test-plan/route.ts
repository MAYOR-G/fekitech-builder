import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/api-auth";
import { enforceJsonRequest, enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { prisma } from "@/lib/db";
import { getPlan, PLAN_IDS } from "@/lib/plans";
import {
  getUserPlan,
  isAuthorizedPlanTester,
  isPlanTestModeEnabled,
} from "@/lib/subscriptions";

const requestSchema = z.object({
  planId: z.enum(PLAN_IDS),
});

async function authorize() {
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const authorized = await isAuthorizedPlanTester(
    sessionOrResponse.user.id,
    sessionOrResponse.user.email,
  );
  if (!authorized) {
    return NextResponse.json({ error: "Test plan access is not available." }, { status: 403 });
  }
  return sessionOrResponse;
}

export async function GET() {
  if (!isPlanTestModeEnabled()) {
    return NextResponse.json({ enabled: false }, { status: 404 });
  }

  const sessionOrResponse = await authorize();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;
  const plan = await getUserPlan(sessionOrResponse.user.id);

  return NextResponse.json({ enabled: true, planId: plan.id, source: plan.source });
}

export async function POST(request: NextRequest) {
  if (!isPlanTestModeEnabled()) {
    return NextResponse.json({ error: "Test plan mode is disabled." }, { status: 404 });
  }

  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const contentError = enforceJsonRequest(request, 8 * 1024);
  if (contentError) return contentError;

  const sessionOrResponse = await authorize();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const rateLimit = await enforceRateLimit({
    scope: "test-plan-change",
    identifier: sessionOrResponse.user.id,
    max: 20,
    windowSeconds: 60 * 60,
  });
  if (rateLimit) return rateLimit;

  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Select a valid test plan." }, { status: 400 });
  }

  const previous = await getUserPlan(sessionOrResponse.user.id);
  const periodEnd = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.subscription.upsert({
      where: { userId_source: { userId: sessionOrResponse.user.id, source: "test" } },
      create: {
        userId: sessionOrResponse.user.id,
        planId: parsed.data.planId,
        status: "active",
        source: "test",
        currentPeriodEnd: periodEnd,
      },
      update: {
        planId: parsed.data.planId,
        status: "active",
        currentPeriodEnd: periodEnd,
        provider: null,
        providerCustomerId: null,
        providerSubscriptionId: null,
      },
    }),
    prisma.activityLog.create({
      data: {
        userId: sessionOrResponse.user.id,
        action: "test_plan.changed",
        details: JSON.stringify({
          previousPlan: previous.id,
          nextPlan: parsed.data.planId,
          expiresAt: periodEnd.toISOString(),
        }),
      },
    }),
  ]);

  return NextResponse.json({
    plan: getPlan(parsed.data.planId),
    source: "test",
    expiresAt: periodEnd.toISOString(),
  });
}
