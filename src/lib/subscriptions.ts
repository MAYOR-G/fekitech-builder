import { prisma } from "@/lib/db";
import {
  canPlanUseTemplate,
  getPlan,
  normalizePlanId,
  type PlanDefinition,
  type PlanId,
} from "@/lib/plans";

const ACTIVE_STATUS = "active";
const TEST_SOURCE = "test";

export type UserPlan = {
  id: PlanId;
  definition: PlanDefinition;
  source: "free" | "test" | "payment" | "manual";
  periodEnd: Date | null;
};

function isCurrent(periodEnd: Date | null): boolean {
  return periodEnd === null || periodEnd >= new Date();
}

export function isPlanTestModeEnabled(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  if (process.env.PLAN_TEST_MODE_ENABLED !== "true") return false;
  return ["development", "test", "staging"].includes(process.env.APP_ENV ?? "development");
}

export function getPlanTestAdminEmails(): Set<string> {
  return new Set(
    (process.env.PLAN_TEST_ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}

export async function isAuthorizedPlanTester(userId: string, email: string): Promise<boolean> {
  if (!isPlanTestModeEnabled()) return false;
  if (!getPlanTestAdminEmails().has(email.toLowerCase())) return false;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  return user?.role === "admin";
}

export async function getUserPlan(userId: string): Promise<UserPlan> {
  const subscriptions = await prisma.subscription.findMany({
    where: { userId, status: ACTIVE_STATUS },
    orderBy: { updatedAt: "desc" },
  });

  const usable = subscriptions.filter((subscription) => isCurrent(subscription.currentPeriodEnd));
  const active = isPlanTestModeEnabled()
    ? usable.find((subscription) => subscription.source === TEST_SOURCE) ??
      usable.find((subscription) => subscription.source !== TEST_SOURCE)
    : usable.find((subscription) => subscription.source !== TEST_SOURCE);

  const planId = normalizePlanId(active?.planId);
  return {
    id: planId,
    definition: getPlan(planId),
    source: active ? (active.source as UserPlan["source"]) : "free",
    periodEnd: active?.currentPeriodEnd ?? null,
  };
}

export async function getUserTier(userId: string): Promise<PlanId> {
  return (await getUserPlan(userId)).id;
}

export async function canCreateProject(userId: string): Promise<{
  allowed: boolean;
  limit: number;
  current: number;
  plan: PlanId;
}> {
  const userPlan = await getUserPlan(userId);
  const current = await prisma.project.count({ where: { userId } });
  const limit = userPlan.definition.entitlements.maxProjects;

  return { allowed: current < limit, limit, current, plan: userPlan.id };
}

export async function canPublishProject(userId: string, alreadyPublished = false): Promise<{
  allowed: boolean;
  reason?: string;
  plan: UserPlan;
}> {
  const plan = await getUserPlan(userId);
  if (!plan.definition.entitlements.canPublish) {
    return { allowed: false, reason: "Publishing requires a Starter plan or higher.", plan };
  }

  const publishedCount = await prisma.project.count({ where: { userId, isPublished: true } });
  if (!alreadyPublished && publishedCount >= plan.definition.entitlements.maxPublishedProjects) {
    return {
      allowed: false,
      reason: `Your ${plan.definition.name} plan supports ${plan.definition.entitlements.maxPublishedProjects} published websites.`,
      plan,
    };
  }

  return { allowed: true, plan };
}

export async function canUseCustomDomain(userId: string): Promise<boolean> {
  return (await getUserPlan(userId)).definition.entitlements.canUseCustomDomain;
}

export async function canUseTemplate(userId: string, templateId: string): Promise<boolean> {
  return canPlanUseTemplate((await getUserPlan(userId)).id, templateId);
}
