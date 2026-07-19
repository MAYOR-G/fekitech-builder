import { describe, expect, it } from "vitest";
import { canPlanUseTemplate } from "@/lib/plans";
import { isValidEditableData } from "@/lib/project-validation";
import { getAllTemplates, getTemplate } from "@/registry";

describe("production template registry", () => {
  it("contains every production template with valid default data", () => {
    const templates = getAllTemplates();
    expect(templates.map((template) => template.id).sort()).toEqual([
      "accountancy-website",
      "agency",
      "barber-website",
      "blackwood-barbers",
      "cake-website",
      "catering-website",
      "coffee-website",
      "dentist-website",
      "electrician-website",
      "estate-agent-website",
      "furniture-website",
      "gym-website",
      "hearth-and-harvest",
      "hotel-website",
      "ink-and-iron",
      "oak-and-ivory-barbers",
      "plumber-website",
      "premium-coffee-website",
      "premium-lash-technician-website",
      "premium-nail-technician-website",
      "premium-spa-website",
      "restaurant-website",
      "salon-website",
      "second-electrician-website",
      "second-furniture-website",
      "second-plumber-website",
      "second-salon-website",
    ]);
    for (const template of templates) {
      expect(isValidEditableData(getTemplate(template.id)?.defaultData)).toBe(true);
    }
  });

  it("offers a validated entitlement boundary at every paid tier", () => {
    expect(canPlanUseTemplate("free", "catering-website")).toBe(false);
    expect(canPlanUseTemplate("starter", "catering-website")).toBe(true);
    expect(canPlanUseTemplate("starter", "plumber-website")).toBe(true);
    expect(canPlanUseTemplate("starter", "premium-coffee-website")).toBe(false);
    expect(canPlanUseTemplate("professional", "premium-coffee-website")).toBe(true);
    expect(canPlanUseTemplate("professional", "agency")).toBe(false);
    expect(canPlanUseTemplate("agency", "agency")).toBe(true);
  });
});
