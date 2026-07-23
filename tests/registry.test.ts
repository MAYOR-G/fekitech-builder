import { describe, expect, it } from "vitest";
import { canPlanUseTemplate } from "@/lib/plans";
import { isValidEditableData } from "@/lib/project-validation";
import { getAllTemplates, getTemplate } from "@/registry";

describe("production template registry", () => {
  it("contains every production template with valid default data", () => {
    const templates = getAllTemplates();
    expect(templates.slice(0, 15).map((template) => template.id)).toEqual([
      "premium-restaurant",
      "fast-food-chicken-tacos",
      "cake-bakery-premium",
      "pastries-snacks-premium",
      "catering-company-premium",
      "barber-website",
      "premium-coffee-website",
      "gym-website",
      "burger-dark-premium",
      "burger-light-clean",
      "pizza-dark-premium",
      "pizza-light-clean",
      "cleaning-agency-premium",
      "roofing-agency-premium",
      "plumbing-company-premium",
    ]);
    expect(templates.map((template) => template.id).sort()).toEqual([
      "barber-website",
      "burger-dark-premium",
      "burger-light-clean",
      "cake-bakery-premium",
      "cake-website",
      "catering-company-premium",
      "catering-website",
      "cleaning-agency-premium",
      "coffee-website",
      "dentist-website",
      "electrician-website",
      "fast-food-chicken-tacos",
      "gym-website",
      "ink-and-iron",
      "pastries-snacks-premium",
      "pizza-dark-premium",
      "pizza-light-clean",
      "plumbing-company-premium",
      "premium-coffee-website",
      "premium-restaurant",
      "restaurant-website",
      "roofing-agency-premium",
      "second-furniture-website",
      "second-plumber-website",
    ]);
    for (const template of templates) {
      expect(isValidEditableData(getTemplate(template.id)?.defaultData)).toBe(true);
    }
  });

  it("provides two catalogue screenshots for the requested business templates", () => {
    const previewTemplateIds = [
      "cake-website",
      "catering-website",
      "coffee-website",
      "dentist-website",
      "electrician-website",
      "ink-and-iron",
      "restaurant-website",
      "second-plumber-website",
    ];

    for (const templateId of previewTemplateIds) {
      expect(getTemplate(templateId)?.config.previewImages).toHaveLength(2);
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
