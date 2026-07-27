import { describe, expect, it } from "vitest";
import { canPlanUseTemplate } from "@/lib/plans";
import { isValidEditableData } from "@/lib/project-validation";
import { getAllTemplates, getTemplate } from "@/registry";

describe("production template registry", () => {
  it("contains every production template with valid default data", () => {
    const templates = getAllTemplates();
    expect(templates.map((template) => template.id)).toEqual([
      "cake-bakery-premium",
      "gym-website",
      "premium-coffee-website",
      "industrial-construction",
      "cleaning-agency-premium",
      "burger-light-clean",
      "premium-construction",
      "carpenter-website",
      "roofing-agency-premium",
      "bakery-website",
      "lumen-house-design",
      "barber-website",
      "cake-website",
      "dentist-website",
      "electrician-website",
      "farm-shop-website",
      "ink-and-iron"
    ]);
    expect(templates.map((template) => template.id).sort()).toEqual([
      "bakery-website",
      "barber-website",
      "burger-light-clean",
      "cake-bakery-premium",
      "cake-website",
      "carpenter-website",
      "cleaning-agency-premium",
      "dentist-website",
      "electrician-website",
      "farm-shop-website",
      "gym-website",
      "industrial-construction",
      "ink-and-iron",
      "lumen-house-design",
      "premium-coffee-website",
      "premium-construction",
      "roofing-agency-premium"
    ]);
    for (const template of templates) {
      expect(isValidEditableData(getTemplate(template.id)?.defaultData)).toBe(true);
    }
  });

  it("provides a catalogue screenshot for the requested business templates", () => {
    const previewTemplateIds = [
      "cake-bakery-premium",
      "gym-website",
      "premium-coffee-website",
      "industrial-construction",
      "cleaning-agency-premium",
      "burger-light-clean",
      "premium-construction",
      "carpenter-website",
      "roofing-agency-premium",
      "bakery-website",
      "lumen-house-design",
      "barber-website",
      "cake-website",
      "dentist-website",
      "electrician-website",
      "farm-shop-website",
      "ink-and-iron",
    ];

    for (const templateId of previewTemplateIds) {
      expect(getTemplate(templateId)?.config.image).toBeTruthy();
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
