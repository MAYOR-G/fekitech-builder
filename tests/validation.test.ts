import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { enforceSameOrigin } from "@/lib/api-security";
import { normalizeCustomDomain } from "@/lib/domains";
import { isValidEditableData } from "@/lib/project-validation";
import { isPlanTestModeEnabled } from "@/lib/subscriptions";
import { slugifySubdomain, validateSubdomain } from "@/lib/subdomains";
import { bindTemplateContent, isCompatibleTemplateData, mergeTemplateData } from "@/lib/template-data";
import { runtimeStyleOptions, templateRuntimeCss, templateVariables } from "@/lib/template-runtime-style";

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

  it("accepts visual-editor typography, style, link, image, and icon metadata", () => {
    const defaults = { hero: { title: "Original", visible: true } };
    expect(isCompatibleTemplateData(defaults, {
      typography: {
        id: "syne-plus-jakarta-sans",
        name: "Syne + Plus Jakarta Sans",
        category: "Library",
        displayFont: "Syne",
        headingFont: "Syne",
        bodyFont: "Plus Jakarta Sans",
        navFont: "Plus Jakarta Sans",
        buttonFont: "Plus Jakarta Sans",
        scale: 1.25,
        headingWeight: 700,
        bodyWeight: 400,
        lineHeight: 1.6,
        letterSpacing: "0em",
        googleImport: "Syne:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800",
      },
      colors: {
        pageBackground: "#ffffff",
        sectionAlt: "#f5f5f5",
        cardBackground: "#ffffff",
        headingText: "#111827",
        bodyText: "#1f2937",
        mutedText: "#6b7280",
        primary: "#123abc",
        secondary: "#edf2ff",
        background: "#ffffff",
        surface: "#f8fafc",
        card: "#ffffff",
        text: "#1f2937",
        textPrimary: "#111827",
        textSecondary: "#6b7280",
        accent: "#123abc",
        accentSecondary: "#456def",
        buttonBg: "#123abc",
        buttonText: "#ffffff",
        secondaryButtonBg: "#ffffff",
        secondaryButtonBorder: "#d1d5db",
        secondaryButtonText: "#123abc",
        link: "#123abc",
        border: "#d1d5db",
        icon: "#123abc",
        formBackground: "#ffffff",
        formText: "#111827",
        formPlaceholder: "#6b7280",
        formBorder: "#d1d5db",
        headerBg: "#ffffff",
        headerText: "#111827",
        footerBg: "#111827",
        footerText: "#ffffff",
        footerMuted: "#94a3b8",
        success: "#16a34a",
        warning: "#d97706",
        error: "#dc2626",
      },
      _editor: {
        styles: {
          abc123: {
            fontFamily: "\"Syne\", sans-serif",
            fontSize: "42px",
            fontWeight: "700",
            fontStyle: "italic",
            textDecoration: "underline",
            textAlign: "center",
            lineHeight: "1.2",
            letterSpacing: "1px",
            color: "#123abc",
            objectFit: "cover",
            objectPosition: "50% 50%",
            width: "42px",
            height: "42px",
          },
        },
        content: { txt: { text: "Edited" } },
        links: { cta: { href: "/about", target: "_blank" } },
        images: { hero: { src: "/uploads/hero.jpg", alt: "Hero" } },
        icons: { mark: { name: "Briefcase" } },
      },
    })).toBe(true);
    expect(isCompatibleTemplateData(defaults, { typography: null })).toBe(true);
  });

  it("does not apply shared palette CSS to untouched original template data", () => {
    const defaults = {
      colors: {
        primary: "#ff7a1a",
        background: "#101010",
        text: "#ffffff",
      },
    };

    const originalOptions = runtimeStyleOptions(defaults, defaults);
    expect(originalOptions.palette).toBe(false);
    expect(templateRuntimeCss("[data-template-runtime=\"sample\"]", originalOptions)).toBe("");
    expect(templateVariables(defaults, { includeRootColors: originalOptions.palette })).not.toHaveProperty("backgroundColor");

    const legacyNormalized = {
      colors: {
        primary: "#ff7a1a",
        accent: "#ff7a1a",
        secondary: "#eef2ff",
        background: "#101010",
        text: "#ffffff",
        buttonText: "#ffffff",
      },
    };
    expect(runtimeStyleOptions(legacyNormalized, defaults).palette).toBe(false);

    const customized = {
      colors: {
        primary: "#3146d3",
        background: "#ffffff",
        text: "#111827",
      },
    };
    const customizedOptions = runtimeStyleOptions(customized, defaults);
    expect(customizedOptions.palette).toBe(true);
    expect(templateRuntimeCss("[data-template-runtime=\"sample\"]", customizedOptions)).toContain("--template-button-bg");
    expect(templateVariables(customized, { includeRootColors: customizedOptions.palette })).toHaveProperty("backgroundColor", "#ffffff");

    const typographyDefaults = {
      typography: {
        id: "original",
        name: "Original",
        category: "Original",
        displayFont: "Georgia",
        headingFont: "Georgia",
        bodyFont: "Arial",
        navFont: "Arial",
        buttonFont: "Arial",
        scale: 1,
        headingWeight: 700,
        bodyWeight: 400,
        lineHeight: 1.6,
        letterSpacing: "0em",
      },
    };
    expect(runtimeStyleOptions(typographyDefaults, typographyDefaults).typography).toBe(false);
  });

  it("cannot enable plan testing in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("APP_ENV", "staging");
    vi.stubEnv("PLAN_TEST_MODE_ENABLED", "true");
    expect(isPlanTestModeEnabled()).toBe(false);
  });
});
