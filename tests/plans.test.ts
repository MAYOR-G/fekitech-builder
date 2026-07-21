import { describe, expect, it } from "vitest";
import {
  PLAN_IDS,
  PLANS,
  canPlanUseTemplate,
  getTemplateMinimumPlan,
  normalizePlanId,
} from "@/lib/plans";

describe("canonical plan configuration", () => {
  it("defines every plan once with progressively larger entitlements", () => {
    expect(Object.keys(PLANS)).toEqual(PLAN_IDS);
    const limits = PLAN_IDS.map((id) => PLANS[id].entitlements.maxProjects);
    expect(limits).toEqual([...limits].sort((left, right) => left - right));
    expect(PLANS.free.entitlements.canPublish).toBe(false);
    expect(PLANS.business.monthlyPriceMinor).toBe(1500);
    expect(PLANS.business.entitlements.maxPublishedProjects).toBe(1);
    expect(PLANS.business.entitlements.canUploadImages).toBe(true);
    expect(PLANS.pro.name).toBe("Pro");
    expect(PLANS.pro.monthlyPriceMinor).toBe(3900);
    expect(PLANS.pro.entitlements.maxPublishedProjects).toBe(3);
    expect(PLANS.pro.entitlements.canUseCustomDomain).toBe(true);
    expect(PLANS.agency.name).toBe("Agency");
    expect(PLANS.agency.monthlyPriceMinor).toBe(9900);
  });

  it("defaults unknown stored plan values to free", () => {
    expect(normalizePlanId("pro")).toBe("pro");
    expect(normalizePlanId("enterprise")).toBe("free");
    expect(normalizePlanId(null)).toBe("free");
  });

  it("enforces template tiers on the server configuration", () => {
    expect(getTemplateMinimumPlan("premium-coffee-website")).toBe("pro");
    expect(canPlanUseTemplate("business", "premium-coffee-website")).toBe(false);
    expect(canPlanUseTemplate("pro", "premium-coffee-website")).toBe(true);
    expect(canPlanUseTemplate("pro", "unknown-template")).toBe(false);
    expect(canPlanUseTemplate("pro", "agency")).toBe(false);
    expect(canPlanUseTemplate("agency", "agency")).toBe(true);
  });
});
