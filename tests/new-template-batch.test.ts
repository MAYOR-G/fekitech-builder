import { describe, expect, it, vi } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getTemplate } from "@/registry";
import { useVisualEditorStore } from "@/store/visualEditorStore";

const templateIds = [
  "hawthorne-fields-academy", "the-rowan-house", "mercer-blythe-solicitors",
  "north-ledger-accountants", "wren-vow-events", "kindred-paws-vets",
  "field-stem-florist", "little-lanterns-nursery", "borough-motor-works",
  "wildmere-gardens", "tallow-and-sage", "nightjar-and-crown",
  "crumb-and-char", "forno-sixteen",
];

type BatchData = {
  brand?: { name?: string; logo?: string };
  theme?: { colors?: Record<string, string> };
  navigation?: { links?: unknown[] };
  gallery?: { images?: Array<{ src?: string; alt?: string }> };
  pages?: Record<string, unknown>;
  homeOrder?: string[];
};

describe("new premium UK template batch", () => {
  it("registers every template with its catalogue preview", () => {
    for (const id of templateIds) {
      const entry = getTemplate(id);
      expect(entry?.config.id).toBe(id);
      expect(entry?.config.image).toBe(`/templates/${id}.webp`);
      expect(existsSync(join(process.cwd(), "public", entry?.config.image ?? ""))).toBe(true);
    }
  });

  it("provides deep editable data and at least five local images per template", () => {
    for (const id of templateIds) {
      const data = JSON.parse(readFileSync(join(process.cwd(), "src/templates", id, "editable.json"), "utf8")) as BatchData;
      expect(data.brand?.name).toBeTruthy();
      expect(data.brand?.logo).toBe(`/templates/${id}/assets/logo.svg`);
      expect(Object.keys(data.theme?.colors ?? {}).length).toBeGreaterThanOrEqual(8);
      expect(data.navigation?.links?.length).toBeGreaterThanOrEqual(6);
      expect(Object.keys(data.pages ?? {}).length).toBeGreaterThanOrEqual(5);
      expect(data.gallery?.images?.length).toBeGreaterThanOrEqual(5);
      for (const item of data.gallery?.images ?? []) {
        expect(item.alt).toBeTruthy();
        expect(item.src?.startsWith(`/templates/${id}/assets/`)).toBe(true);
        expect(existsSync(join(process.cwd(), "public", item.src ?? ""))).toBe(true);
      }
    }
  });

  it("keeps the visible systems independently styled and composed", () => {
    const styleSources = templateIds.map((id) => readFileSync(join(process.cwd(), "src/templates", id, "styles.css"), "utf8"));
    expect(new Set(styleSources).size).toBe(templateIds.length);
    for (const [index, id] of templateIds.entries()) {
      expect(styleSources[index]).toContain(`[data-template-id="${id}"]`);
      expect(styleSources[index].length).toBeGreaterThan(900);
    }
    const orders = templateIds.map((id) => {
      const data = JSON.parse(readFileSync(join(process.cwd(), "src/templates", id, "editable.json"), "utf8")) as BatchData;
      return data.homeOrder?.join("|");
    });
    expect(new Set(orders).size).toBeGreaterThanOrEqual(10);
  });

  it("exposes editor bindings for branding, images, links, icons and text", () => {
    const renderer = readFileSync(join(process.cwd(), "src/templates/_uk-batch/BatchTemplate.tsx"), "utf8");
    expect(renderer).toContain('image("brand.logo", "brand.logoAlt")');
    expect(renderer).toContain('text("brand.name")');
    expect(renderer).toContain('link("navigation.ctaLabel", "navigation.ctaPage")');
    expect(renderer).toContain('data-editable-type": "icon"');
    expect(renderer).toContain('data-editable-type": "image"');
  });

  it("persists logo, business-name and colour edits through the editor save payload", async () => {
    const initial = getTemplate("hawthorne-fields-academy")?.defaultData;
    expect(initial).toBeTruthy();
    const store = useVisualEditorStore.getState();
    store.init("project-uk-batch", "Academy project", "hawthorne-fields-academy", initial as never);
    store.updatePath("brand.name", "Longer Hawthorne Fields Independent Academy");
    store.updatePath("brand.logo", "/api/assets/replacement-logo");
    store.updatePath("theme.colors.accent", "#0057B8");
    expect(useVisualEditorStore.getState().canUndo()).toBe(true);
    useVisualEditorStore.getState().undo();
    useVisualEditorStore.getState().redo();

    let savedBody = "";
    const fetchMock = vi.spyOn(globalThis, "fetch").mockImplementation(async (_input, init) => {
      savedBody = String(init?.body ?? "");
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
    });
    expect(await useVisualEditorStore.getState().saveNow()).toBe(true);
    const payload = JSON.parse(savedBody) as { editableData: Record<string, any> };
    expect(payload.editableData.brand.name).toBe("Longer Hawthorne Fields Independent Academy");
    expect(payload.editableData.brand.logo).toBe("/api/assets/replacement-logo");
    expect(payload.editableData.theme.colors.accent).toBe("#0057B8");

    useVisualEditorStore.getState().init("project-uk-batch", "Academy project", "hawthorne-fields-academy", payload.editableData);
    expect((useVisualEditorStore.getState().data.brand as Record<string, unknown>).name).toBe("Longer Hawthorne Fields Independent Academy");
    fetchMock.mockRestore();
  });
});
