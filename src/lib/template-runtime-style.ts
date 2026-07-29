import type { CSSProperties } from "react";
import { fontStack, googleFontsHref, type TypographyPairing } from "@/lib/typography";
import { isEditorObject, type EditorObject } from "@/store/visualEditorStore";

function isHex(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
}

export function colorValueFrom(colors: unknown, keys: string[], fallback: string) {
  if (!isEditorObject(colors)) return fallback;
  for (const key of keys) {
    const value = colors[key];
    if (isHex(value)) return value;
  }
  return fallback;
}

export function typographyFrom(data: EditorObject): TypographyPairing | undefined {
  const value = data.typography;
  return isEditorObject(value) ? value as unknown as TypographyPairing : undefined;
}

export function templateVariables(data: EditorObject): CSSProperties & Record<`--${string}`, string> {
  const colors = data.colors;
  const typography = typographyFrom(data);
  const headingStack = fontStack(typography?.headingFont ?? "inherit", "serif");
  const displayStack = fontStack(typography?.displayFont ?? typography?.headingFont ?? "inherit", "serif");
  const bodyStack = fontStack(typography?.bodyFont ?? "inherit");
  const navStack = fontStack(typography?.navFont ?? typography?.bodyFont ?? "inherit");
  const buttonStack = fontStack(typography?.buttonFont ?? typography?.bodyFont ?? "inherit");

  return {
    backgroundColor: colorValueFrom(colors, ["pageBackground", "background"], "#ffffff"),
    color: colorValueFrom(colors, ["bodyText", "text", "textPrimary"], "#111827"),
    "--template-primary": colorValueFrom(colors, ["primary", "accent"], "#3146d3"),
    "--template-secondary": colorValueFrom(colors, ["secondary", "accentSecondary", "sectionAlt"], "#eef2ff"),
    "--template-accent": colorValueFrom(colors, ["accent", "primary"], "#3146d3"),
    "--template-background": colorValueFrom(colors, ["pageBackground", "background"], "#ffffff"),
    "--template-surface": colorValueFrom(colors, ["surface", "sectionAlt"], "#f8fafc"),
    "--template-card": colorValueFrom(colors, ["card", "cardBackground"], "#ffffff"),
    "--template-heading": colorValueFrom(colors, ["headingText", "textPrimary", "text"], "#111827"),
    "--template-text": colorValueFrom(colors, ["bodyText", "text", "textPrimary"], "#111827"),
    "--template-muted": colorValueFrom(colors, ["mutedText", "textSecondary"], "#64748b"),
    "--template-button-bg": colorValueFrom(colors, ["buttonBg", "accent", "primary"], "#3146d3"),
    "--template-button-text": colorValueFrom(colors, ["buttonText"], "#ffffff"),
    "--template-secondary-button-bg": colorValueFrom(colors, ["secondaryButtonBg", "card"], "#ffffff"),
    "--template-secondary-button-border": colorValueFrom(colors, ["secondaryButtonBorder", "border"], "#e5e7eb"),
    "--template-secondary-button-text": colorValueFrom(colors, ["secondaryButtonText", "accent"], "#3146d3"),
    "--template-link": colorValueFrom(colors, ["link", "accent", "primary"], "#3146d3"),
    "--template-border": colorValueFrom(colors, ["border"], "#e5e7eb"),
    "--template-icon": colorValueFrom(colors, ["icon", "accent", "primary"], "#3146d3"),
    "--template-form-bg": colorValueFrom(colors, ["formBackground", "card"], "#ffffff"),
    "--template-form-text": colorValueFrom(colors, ["formText", "textPrimary"], "#111827"),
    "--template-form-placeholder": colorValueFrom(colors, ["formPlaceholder", "textSecondary"], "#64748b"),
    "--template-form-border": colorValueFrom(colors, ["formBorder", "border"], "#e5e7eb"),
    "--template-header-bg": colorValueFrom(colors, ["headerBg", "background"], "#ffffff"),
    "--template-header-text": colorValueFrom(colors, ["headerText", "textPrimary"], "#111827"),
    "--template-footer-bg": colorValueFrom(colors, ["footerBg", "footerBackground", "textPrimary"], "#111827"),
    "--template-footer-text": colorValueFrom(colors, ["footerText", "buttonText"], "#ffffff"),
    "--template-footer-muted": colorValueFrom(colors, ["footerMuted", "textSecondary"], "#94a3b8"),
    "--template-success": colorValueFrom(colors, ["success"], "#16A34A"),
    "--template-warning": colorValueFrom(colors, ["warning"], "#D97706"),
    "--template-error": colorValueFrom(colors, ["error"], "#DC2626"),
    "--color-primary": colorValueFrom(colors, ["primary", "accent"], "#3146d3"),
    "--color-secondary": colorValueFrom(colors, ["secondary", "accentSecondary", "sectionAlt"], "#eef2ff"),
    "--color-accent": colorValueFrom(colors, ["accent", "primary"], "#3146d3"),
    "--color-bg": colorValueFrom(colors, ["pageBackground", "background"], "#ffffff"),
    "--color-background": colorValueFrom(colors, ["pageBackground", "background"], "#ffffff"),
    "--color-surface": colorValueFrom(colors, ["surface", "sectionAlt"], "#f8fafc"),
    "--color-card": colorValueFrom(colors, ["card", "cardBackground"], "#ffffff"),
    "--color-text": colorValueFrom(colors, ["bodyText", "text", "textPrimary"], "#111827"),
    "--color-muted": colorValueFrom(colors, ["mutedText", "textSecondary"], "#64748b"),
    "--color-border": colorValueFrom(colors, ["border"], "#e5e7eb"),
    "--font-display": displayStack,
    "--font-heading": headingStack,
    "--font-body": bodyStack,
    "--font-nav": navStack,
    "--font-button": buttonStack,
    "--template-heading-weight": String(typography?.headingWeight ?? 700),
    "--template-body-weight": String(typography?.bodyWeight ?? 400),
    "--template-line-height": String(typography?.lineHeight ?? 1.6),
    "--template-letter-spacing": typography?.letterSpacing ?? "0em",
  };
}

export function templateRuntimeCss(scope = "[data-template-runtime]") {
  return `
${scope} {
  background: var(--template-background);
  color: var(--template-text);
  font-family: var(--font-body);
}
${scope} section,
${scope} main,
${scope} article {
  background-color: var(--template-background);
  color: var(--template-text);
}
${scope} section:nth-of-type(even) {
  background-color: var(--template-surface);
}
${scope} header,
${scope} nav {
  background-color: var(--template-header-bg);
  color: var(--template-header-text);
}
${scope} footer {
  background-color: var(--template-footer-bg);
  color: var(--template-footer-text);
}
${scope} footer p,
${scope} footer span,
${scope} footer li,
${scope} footer a {
  color: var(--template-footer-text);
}
${scope} [class*="card"],
${scope} [class*="box"],
${scope} [class*="panel"],
${scope} [class*="tile"],
${scope} form {
  background-color: var(--template-card);
  border-color: var(--template-border);
}
${scope} h1,
${scope} h2,
${scope} h3,
${scope} h4,
${scope} h5,
${scope} h6,
${scope} .font-heading,
${scope} .font-serif {
  color: var(--template-heading);
  font-family: var(--font-heading) !important;
  font-weight: var(--template-heading-weight);
  letter-spacing: var(--template-letter-spacing);
}
${scope} h1,
${scope} .display,
${scope} .hero-title {
  font-family: var(--font-display) !important;
}
${scope} p,
${scope} li,
${scope} blockquote,
${scope} label,
${scope} input,
${scope} textarea,
${scope} select,
${scope} small,
${scope} span {
  font-family: var(--font-body);
}
${scope} p,
${scope} li,
${scope} blockquote {
  line-height: var(--template-line-height);
}
${scope} nav,
${scope} nav a,
${scope} header a,
${scope} [role="navigation"],
${scope} [role="navigation"] a {
  font-family: var(--font-nav) !important;
}
${scope} button,
${scope} .btn,
${scope} a[class*="btn"],
${scope} a[class*="button"],
${scope} [role="button"] {
  font-family: var(--font-button) !important;
}
${scope} a {
  color: var(--template-link);
}
${scope} button,
${scope} .btn,
${scope} a[class*="btn"],
${scope} a[class*="button"],
${scope} [role="button"] {
  background-color: var(--template-button-bg);
  border-color: var(--template-button-bg);
  color: var(--template-button-text);
}
${scope} button[variant="outline"],
${scope} .btn-outline,
${scope} a[class*="outline"] {
  background-color: var(--template-secondary-button-bg);
  border-color: var(--template-secondary-button-border);
  color: var(--template-secondary-button-text);
}
${scope} svg,
${scope} i,
${scope} [class*="icon"],
${scope} [class*="fa-"] {
  color: var(--template-icon);
}
${scope} input,
${scope} textarea,
${scope} select {
  background: var(--template-form-bg);
  color: var(--template-form-text);
  border-color: var(--template-form-border);
}
${scope} input::placeholder,
${scope} textarea::placeholder {
  color: var(--template-form-placeholder);
}
`;
}

export function useTypographyFontHref(data: EditorObject) {
  return googleFontsHref(typographyFrom(data));
}
