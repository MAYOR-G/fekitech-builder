import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { enforceRateLimit, enforceSameOrigin } from "@/lib/api-security";
import { z } from "zod";

const testPlanSchema = z.object({
  planId: z.string().min(1),
  status: z.enum(["active", "past_due", "canceled"]).optional().default("active"),
});

/**
 * ONLY ALLOWED IN DEVELOPMENT MODE
 * Used for testing the subscription boundary locally.
 */
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const originError = enforceSameOrigin(request);
  if (originError) return originError;
  const sessionOrResponse = await requireAuth();
  if (sessionOrResponse instanceof NextResponse) return sessionOrResponse;

  const rateLimit = await enforceRateLimit({
    scope: "admin-test-plan",
    identifier: sessionOrResponse.user.id,
    max: 10,
    windowSeconds: 60,
  });
  if (rateLimit) return rateLimit;

  const parsed = testPlanSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan parameters." }, { status: 400 });
  }

  const admin = getAdminDb();
  
  // Upsert the testing subscription
  const { error } = await admin
    .from("subscriptions")
    .upsert({
      user_id: sessionOrResponse.user.id,
      plan_id: parsed.data.planId,
      status: parsed.data.status,
      current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: "user_id"
    });

  if (error) {
    console.error("Test plan assignment failed:", error);
    return NextResponse.json({ error: "Failed to assign plan." }, { status: 500 });
  }

  return NextResponse.json({ success: true, plan: parsed.data.planId, status: parsed.data.status });
}
