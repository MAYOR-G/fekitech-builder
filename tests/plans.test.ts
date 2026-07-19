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
    expect(PLANS.starter.monthlyPriceMinor).toBe(900);
    expect(PLANS.starter.entitlements.maxPublishedProjects).toBe(1);
    expect(PLANS.starter.entitlements.canUploadImages).toBe(true);
    expect(PLANS.professional.name).toBe("Growth");
    expect(PLANS.professional.monthlyPriceMinor).toBe(1900);
    expect(PLANS.professional.entitlements.maxPublishedProjects).toBe(3);
    expect(PLANS.professional.entitlements.canUseCustomDomain).toBe(true);
    expect(PLANS.agency.name).toBe("Custom");
    expect(PLANS.agency.monthlyPriceMinor).toBe(3000);
  });

  it("defaults unknown stored plan values to free", () => {
    expect(normalizePlanId("professional")).toBe("professional");
    expect(normalizePlanId("enterprise")).toBe("free");
    expect(normalizePlanId(null)).toBe("free");
  });

  it("enforces template tiers on the server configuration", () => {
    expect(getTemplateMinimumPlan("estate-agent-website")).toBe("professional");
    expect(canPlanUseTemplate("starter", "estate-agent-website")).toBe(false);
    expect(canPlanUseTemplate("professional", "estate-agent-website")).toBe(true);
    expect(canPlanUseTemplate("professional", "unknown-template")).toBe(false);
    expect(canPlanUseTemplate("professional", "agency")).toBe(false);
    expect(canPlanUseTemplate("agency", "agency")).toBe(true);
  });
});
