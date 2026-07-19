import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { enforceSameOrigin } from "@/lib/api-security";
import { normalizeCustomDomain } from "@/lib/domains";
import { isValidEditableData } from "@/lib/project-validation";
import { isPlanTestModeEnabled } from "@/lib/subscriptions";
import { slugifySubdomain, validateSubdomain } from "@/lib/subdomains";
import { bindTemplateContent, isCompatibleTemplateData, mergeTemplateData } from "@/lib/template-data";

afterEach(() => vi.unstubAllEnvs());

describe("hostname and mutation validation", () => {
  it("rejects reserved and malformed subdomains", () => {
    expect(validateSubdomain("admin").valid).toBe(false);
    expect(validateSubdomain("bad_name").valid).toBe(false);
    expect(validateSubdomain("client-site")).toEqual({ valid: true, value: "client-site" });
    expect(slugifySubdomain(" Café Déjà Vu ")).toBe("cafe-deja-vu");
  });

  it("normalizes IDN domains and blocks builder-owned hosts", () => {
    vi.stubEnv("ROOT_DOMAIN", "builder.example.com");
    expect(normalizeCustomDomain("BÜCHER.example")).toEqual({ valid: true, value: "xn--bcher-kva.example" });
    expect(normalizeCustomDomain("shop.builder.example.com").valid).toBe(false);
    expect(normalizeCustomDomain("127.0.0.1").valid).toBe(false);
  });

  it("rejects cross-origin and malformed Origin headers without throwing", () => {
    const valid = new NextRequest("https://builder.example.com/api/projects", {
      method: "POST",
      headers: { origin: "https://builder.example.com", host: "builder.example.com" },
    });
    const foreign = new NextRequest("https://builder.example.com/api/projects", {
      method: "POST",
      headers: { origin: "https://attacker.example", host: "builder.example.com" },
    });
    const malformed = new NextRequest("https://builder.example.com/api/projects", {
      method: "POST",
      headers: { origin: "not a URL", host: "builder.example.com" },
    });
    expect(enforceSameOrigin(valid)).toBeNull();
    expect(enforceSameOrigin(foreign)?.status).toBe(403);
    expect(enforceSameOrigin(malformed)?.status).toBe(403);
  });
});

describe("editable data and test-mode safety", () => {
  it("deep-merges valid template overrides without mutating defaults", () => {
    const defaults = { hero: { title: "Original", button: "Start" }, enabled: true };
    const merged = mergeTemplateData(defaults, { hero: { title: "Changed" } });
    expect(merged).toEqual({ hero: { title: "Changed", button: "Start" }, enabled: true });
    expect(defaults.hero.title).toBe("Original");
  });

  it("binds editable values while preserving runtime-only template fields", () => {
    function Icon() {
      return null;
    }
    const ForwardRefIcon = { $$typeof: Symbol.for("react.forward_ref"), render: () => null };
    const defaults = {
      cards: [{ title: "Original", icon: Icon }, { title: "Forward ref", icon: ForwardRefIcon }],
      hero: { title: "Before", image: "/before.jpg" },
    };

    const bound = bindTemplateContent(defaults, {
      cards: [{ title: "Changed", icon: "Icon" }, { title: "Updated", icon: "Star" }],
      hero: { title: "After", image: "/after.jpg" },
    });

    expect(bound.cards[0].title).toBe("Changed");
    expect(bound.cards[0].icon).toBe(Icon);
    expect(bound.cards[1].icon).toBe(ForwardRefIcon);
    expect(bound.hero).toEqual({ title: "After", image: "/after.jpg" });
  });

  it("rejects excessive nesting, invalid values, and oversized strings", () => {
    let nested: Record<string, unknown> = { value: "ok" };
    for (let index = 0; index < 14; index += 1) nested = { child: nested };
    expect(isValidEditableData(nested)).toBe(false);
    expect(isValidEditableData({ callback: () => undefined })).toBe(false);
    expect(isValidEditableData({ text: "x".repeat(20_001) })).toBe(false);
  });

  it("rejects type changes and unknown template fields", () => {
    const defaults = { hero: { title: "Original", visible: true } };
    expect(isCompatibleTemplateData(defaults, { hero: { title: "Changed", visible: false } })).toBe(true);
    expect(isCompatibleTemplateData(defaults, { hero: { title: 42 } })).toBe(false);
    expect(isCompatibleTemplateData(defaults, { privateScript: "alert(1)" })).toBe(false);
    expect(isCompatibleTemplateData(defaults, { colors: { primary: "#123abc" } })).toBe(true);
  });

  it("cannot enable plan testing in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("APP_ENV", "staging");
    vi.stubEnv("PLAN_TEST_MODE_ENABLED", "true");
    expect(isPlanTestModeEnabled()).toBe(false);
  });
});
