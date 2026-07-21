import { describe, expect, it } from "vitest";
import { canPlanUseTemplate } from "@/lib/plans";
import { isValidEditableData } from "@/lib/project-validation";
import { getAllTemplates, getTemplate } from "@/registry";

describe("production template registry", () => {
  it("contains every production template with valid default data", () => {
    const templates = getAllTemplates();
    expect(templates.map((template) => template.id).sort()).toEqual([
      "barber-website",
      "cake-website",
      "catering-website",
      "coffee-website",
      "dentist-website",
      "electrician-website",
      "gym-website",
      "ink-and-iron",
      "premium-coffee-website",
      "restaurant-website",
      "second-furniture-website",
      "second-plumber-website",
    ]);
    for (const template of templates) {
      expect(isValidEditableData(getTemplate(template.id)?.defaultData)).toBe(true);
    }
  });

  it("offers a validated entitlement boundary at every paid tier", () => {
    expect(canPlanUseTemplate("free", "catering-website")).toBe(false);
    expect(canPlanUseTemplate("business", "catering-website")).toBe(true);
    expect(canPlanUseTemplate("business", "second-plumber-website")).toBe(true);
    expect(canPlanUseTemplate("business", "premium-coffee-website")).toBe(false);
    expect(canPlanUseTemplate("pro", "premium-coffee-website")).toBe(true);
    expect(canPlanUseTemplate("pro", "unknown-template")).toBe(false);
    expect(canPlanUseTemplate("agency", "unknown-template")).toBe(true);
  });
});
