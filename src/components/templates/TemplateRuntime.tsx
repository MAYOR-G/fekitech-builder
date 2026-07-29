"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { bindTemplateDom } from "@/lib/editor-dom";
import { isEditorObject, type EditorObject } from "@/store/visualEditorStore";
import type { CSSProperties } from "react";

function isHex(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value);
}

function colorValueFrom(colors: unknown, keys: string[], fallback: string) {
  if (!isEditorObject(colors)) return fallback;
  for (const key of keys) {
    const value = colors[key];
    if (isHex(value)) return value;
  }
  return fallback;
}

function templateVariables(data: EditorObject): CSSProperties & Record<`--${string}`, string> {
  const colors = data.colors;
  return {
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
  };
}

export function TemplateRuntime({
  children,
  data,
  templateId,
  editable = false,
}: {
  children: ReactNode;
  data: EditorObject;
  templateId: string;
  editable?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !isEditorObject(data)) return;
    bindTemplateDom(ref.current, data, templateId, editable);
  }, [data, editable, templateId]);

  return (
    <div ref={ref} data-template-runtime={templateId} style={templateVariables(data)}>
      {children}
    </div>
  );
}
