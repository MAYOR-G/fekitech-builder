import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { canPlanUseTemplate } from "@/lib/plans";
import { isValidEditableData } from "@/lib/project-validation";
import { getAllTemplates, getTemplate } from "@/registry";

function readTemplateFiles(dir: string, extension: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return readTemplateFiles(path, extension);
    return entry.isFile() && path.endsWith(extension) ? [path] : [];
  });
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(collectStrings);
  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }
  return [];
}

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
      "ink-and-iron",
      "alder-slate-roofing",
      "burger-dark-premium",
      "crownline-roofworks",
      "ice-cream-website",
      "noir-house-design",
      "northcrest-roofing",
      "second-furniture-website",
      "second-plumber-website",
      "velvet-scoop",
      "fast-food-chicken-tacos",
      "catering-company-premium",
      "coffee-website",
      "forgepoint-construction",
      "pastries-snacks-premium",
      "pizza-light-clean",
      "premium-restaurant",
      "blueforge-plumbing",
      "northline-grooming",
      "verdant-house-grooming",
      "brightnest-cleaning",
      "ash-bridle-barbers",
      "lacquer-form-nail-atelier",
      "harborwell-home-health",
      "infusion-london",
      "digital-designer-portfolio",
      "software-engineer-portfolio",
      "london-pizza-shop",
      "moss-marrow-cafe",
      "blush-crumb-bakehouse",
      "aurea-objects-shop",
      "velour-studio-salon",
      "harrow-vale-estates",
      "ember-grace-church",
      "linden-path-therapy"
    ]);
    expect(templates.map((template) => template.id).sort()).toEqual([
      "alder-slate-roofing",
      "ash-bridle-barbers",
      "aurea-objects-shop",
      "bakery-website",
      "barber-website",
      "blueforge-plumbing",
      "blush-crumb-bakehouse",
      "brightnest-cleaning",
      "burger-dark-premium",
      "burger-light-clean",
      "cake-bakery-premium",
      "cake-website",
      "carpenter-website",
      "catering-company-premium",
      "cleaning-agency-premium",
      "coffee-website",
      "crownline-roofworks",
      "dentist-website",
      "digital-designer-portfolio",
      "electrician-website",
      "ember-grace-church",
      "farm-shop-website",
      "fast-food-chicken-tacos",
      "forgepoint-construction",
      "gym-website",
      "harborwell-home-health",
      "harrow-vale-estates",
      "ice-cream-website",
      "industrial-construction",
      "infusion-london",
      "ink-and-iron",
      "lacquer-form-nail-atelier",
      "linden-path-therapy",
      "london-pizza-shop",
      "lumen-house-design",
      "moss-marrow-cafe",
      "noir-house-design",
      "northcrest-roofing",
      "northline-grooming",
      "pastries-snacks-premium",
      "pizza-light-clean",
      "premium-coffee-website",
      "premium-construction",
      "premium-restaurant",
      "roofing-agency-premium",
      "second-furniture-website",
      "second-plumber-website",
      "software-engineer-portfolio",
      "velour-studio-salon",
      "velvet-scoop",
      "verdant-house-grooming"
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
      "alder-slate-roofing",
      "burger-dark-premium",
      "crownline-roofworks",
      "ice-cream-website",
      "noir-house-design",
      "northcrest-roofing",
      "second-furniture-website",
      "second-plumber-website",
      "velvet-scoop",
      "fast-food-chicken-tacos",
      "infusion-london",
      "moss-marrow-cafe",
      "blush-crumb-bakehouse",
      "aurea-objects-shop",
      "velour-studio-salon",
      "harrow-vale-estates",
      "ember-grace-church",
      "linden-path-therapy"
    ];

    for (const templateId of previewTemplateIds) {
      expect(getTemplate(templateId)?.config.image).toBeTruthy();
    }
  });

  it("offers a validated entitlement boundary at every paid tier", () => {
    expect(canPlanUseTemplate("free", "catering-company-premium")).toBe(false);
    expect(canPlanUseTemplate("business", "catering-company-premium")).toBe(true);
    expect(canPlanUseTemplate("business", "second-plumber-website")).toBe(true);
    expect(canPlanUseTemplate("business", "premium-coffee-website")).toBe(false);
    expect(canPlanUseTemplate("pro", "premium-coffee-website")).toBe(true);
    expect(canPlanUseTemplate("pro", "unknown-template")).toBe(false);
    expect(canPlanUseTemplate("agency", "unknown-template")).toBe(true);
  });

  it("keeps template styles isolated from the builder shell", () => {
    const templateRoot = join(process.cwd(), "src/templates");
    const cssFiles = readTemplateFiles(templateRoot, ".css");
    const tsxFiles = readTemplateFiles(templateRoot, ".tsx");
    const filesWithBareImport = cssFiles.filter((file) =>
      readFileSync(file, "utf8").split(/\r?\n/).some((line) => line.trim() === "@import")
    );

    expect(filesWithBareImport).toEqual([]);
    expect(tsxFiles.filter((file) => readFileSync(file, "utf8").includes("template-wrapper"))).toEqual([]);
    expect(tsxFiles.filter((file) => readFileSync(file, "utf8").includes("document.documentElement"))).toEqual([]);

    for (const templateId of ["alder-slate-roofing", "crownline-roofworks", "northcrest-roofing"]) {
      const component = readFileSync(join(templateRoot, templateId, "template.tsx"), "utf8");
      expect(component).not.toContain('import "./styles.css"');
    }

    const redesignedTemplateIds = [
      "burger-dark-premium",
      "pizza-light-clean",
      "ice-cream-website",
      "second-furniture-website",
      "second-plumber-website",
      "blueforge-plumbing",
      "northline-grooming",
      "verdant-house-grooming",
      "brightnest-cleaning",
      "ash-bridle-barbers",
      "lacquer-form-nail-atelier",
      "harborwell-home-health",
      "infusion-london",
      "moss-marrow-cafe",
      "blush-crumb-bakehouse",
      "aurea-objects-shop",
      "velour-studio-salon",
      "harrow-vale-estates",
      "ember-grace-church",
      "linden-path-therapy"
    ];

    for (const templateId of redesignedTemplateIds) {
      const sourceFiles = readTemplateFiles(join(templateRoot, templateId), ".tsx");
      const source = sourceFiles.map((file) => readFileSync(file, "utf8")).join("\n");
      expect(source).not.toContain("../_premium-");
      expect(source).not.toContain("template-wrapper");

      const editablePath = join(templateRoot, templateId, "editable.json");
      const editableData = JSON.parse(readFileSync(editablePath, "utf8")) as unknown;
      const imagePaths = collectStrings(editableData).filter((value) =>
        value.startsWith(`/templates/${templateId}/assets/`)
      );

      expect(imagePaths.length).toBeGreaterThan(0);
      for (const imagePath of imagePaths) {
        expect(existsSync(join(process.cwd(), "public", imagePath))).toBe(true);
      }

      const remoteImages = collectStrings(editableData).filter((value) =>
        /^https?:\/\/.+\.(avif|gif|jpe?g|png|webp)(\?.*)?$/i.test(value)
      );
      expect(remoteImages).toEqual([]);
    }

    const coffeeSource = readTemplateFiles(join(templateRoot, "premium-coffee-website"), ".tsx")
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");
    const barberSource = readTemplateFiles(join(templateRoot, "barber-website"), ".tsx")
      .map((file) => readFileSync(file, "utf8"))
      .join("\n");

    expect(coffeeSource).toContain("premium-coffee-template");
    expect(coffeeSource).not.toMatch(/\b(?:bg|text|border|font)-brand-/);
    expect(barberSource).toContain("classic-barber-template");
    expect(barberSource).not.toMatch(/\b(?:bg|text|border|font)-brand-/);

    const legacyTokenPrefixes = {
      "cake-website": "sweet-cake",
      "coffee-website": "artisan-coffee",
      "dentist-website": "bright-dental",
      "electrician-website": "spark-electric",
      "gym-website": "iron-gym",
      "ink-and-iron": "ink-iron",
      "premium-coffee-website": "coffee-brand",
      "barber-website": "barber-brand",
    };

    for (const [templateId, prefix] of Object.entries(legacyTokenPrefixes)) {
      const templateSource = readTemplateFiles(join(templateRoot, templateId), ".tsx")
        .map((file) => readFileSync(file, "utf8"))
        .join("\n");
      const cssSource = readTemplateFiles(join(templateRoot, templateId), ".css")
        .map((file) => readFileSync(file, "utf8"))
        .join("\n");
      const colorTokens = [...cssSource.matchAll(/--color-([a-z0-9-]+):/g)].map((match) => match[1]);

      for (const token of colorTokens) {
        expect(token.startsWith(prefix)).toBe(true);
      }

      expect(templateSource).not.toMatch(/\bfont-(display|heading|body|sans|serif|accent)\b/);
    }

    const requiredTemplateUtilities = [
      ["premium-coffee-website", ".bg-coffee-brand-accent"],
      ["premium-coffee-website", ".text-coffee-brand-accent"],
      ["barber-website", ".bg-barber-brand-accent"],
      ["barber-website", ".text-barber-brand-accent"],
      ["gym-website", ".bg-iron-gym-gym-accent"],
      ["gym-website", ".text-iron-gym-gym-accent"],
      ["gym-website", ".hover\\:bg-iron-gym-gym-accentHover:hover"],
      ["electrician-website", ".bg-spark-electric-safety"],
      ["electrician-website", ".text-spark-electric-safety"],
      ["electrician-website", ".text-spark-electric-navy"],
      ["coffee-website", ".text-artisan-coffee-coffee-terracotta"],
      ["dentist-website", ".bg-bright-dental-ocean"],
    ];

    for (const [templateId, utility] of requiredTemplateUtilities) {
      const cssSource = readTemplateFiles(join(templateRoot, templateId), ".css")
        .map((file) => readFileSync(file, "utf8"))
        .join("\n");

      expect(cssSource).toContain("GENERATED TEMPLATE TOKEN FALLBACKS START");
      expect(cssSource).toContain(utility);
    }
  });
});
