"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getTemplate } from "@/registry";
import { isEditorObject, useVisualEditorStore, type EditorObject, type EditorValue } from "@/store/visualEditorStore";
import FloatingTextToolbar from "./FloatingTextToolbar";
import FloatingImageToolbar from "./FloatingImageToolbar";
import type { CSSProperties } from "react";
import type { TypographyPairing } from "@/lib/typography";

/* ── Viewport width map ── */
const VIEWPORT_WIDTHS = { desktop: "100%", tablet: "768px", mobile: "375px" } as const;
const TEXT_SELECTOR = "h1,h2,h3,h4,h5,h6,p,span,strong,small,li,blockquote,figcaption,button,a";
const SECTION_SELECTOR = "section,header,footer,main,[role='region']";

type StyleMetadata = {
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  letterSpacing?: string;
};

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

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

function flattenEditableStrings(value: EditorValue, prefix = "", acc: Array<{ path: string; value: string }> = []) {
  if (typeof value === "string") {
    if (prefix && !prefix.startsWith("_editor.") && !prefix.startsWith("colors.") && !prefix.startsWith("typography.")) {
      acc.push({ path: prefix, value });
    }
    return acc;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => flattenEditableStrings(entry, prefix ? `${prefix}.${index}` : String(index), acc));
    return acc;
  }
  if (isEditorObject(value)) {
    Object.entries(value).forEach(([key, entry]) => flattenEditableStrings(entry, prefix ? `${prefix}.${key}` : key, acc));
  }
  return acc;
}

function preferTextPath(path: string): boolean {
  return !/(href|url|link|image|logo|photo|src|alt|icon)$/i.test(path);
}

function preferImagePath(path: string): boolean {
  return /(image|logo|photo|src)$/i.test(path);
}

function preferHrefPath(path: string): boolean {
  return /(href|url|link)$/i.test(path);
}

function normalizeUrl(value: string): string {
  try {
    const url = new URL(value, window.location.origin);
    const encodedImageUrl = url.searchParams.get("url");
    if (encodedImageUrl) return decodeURIComponent(encodedImageUrl);
    return url.pathname + url.search + url.hash;
  } catch {
    return value;
  }
}

function buildUniqueMap(entries: Array<{ path: string; value: string }>, predicate: (path: string) => boolean) {
  const map = new Map<string, string | null>();
  for (const entry of entries) {
    if (!predicate(entry.path)) continue;
    const key = normalizeText(entry.value);
    if (!key) continue;
    map.set(key, map.has(key) ? null : entry.path);
  }
  return map;
}

function getStyleMetadata(data: EditorObject, path: string): StyleMetadata {
  const styles = data._editor;
  if (!isEditorObject(styles) || !isEditorObject(styles.styles)) return {};
  const value = styles.styles[path];
  return isEditorObject(value) ? value as StyleMetadata : {};
}

function applyElementStyle(element: HTMLElement, style: StyleMetadata) {
  if (style.fontSize) element.style.fontSize = style.fontSize;
  if (style.fontWeight) element.style.fontWeight = style.fontWeight;
  if (style.fontStyle) element.style.fontStyle = style.fontStyle;
  if (style.textAlign) element.style.textAlign = style.textAlign;
  if (style.letterSpacing) element.style.letterSpacing = style.letterSpacing;
}

function annotateCanvas(root: HTMLElement, data: EditorObject) {
  const entries = flattenEditableStrings(data);
  const textMap = buildUniqueMap(entries, preferTextPath);
  const urlMap = buildUniqueMap(entries, (path) => preferImagePath(path) || preferHrefPath(path));
  const altMap = new Map(entries.filter((entry) => /alt$/i.test(entry.path)).map((entry) => [normalizeText(entry.value), entry.path]));

  root.querySelectorAll<HTMLElement>("[data-editable-path]").forEach((element) => {
    applyElementStyle(element, getStyleMetadata(data, element.dataset.editablePath ?? ""));
  });

  root.querySelectorAll<HTMLElement>(TEXT_SELECTOR).forEach((element) => {
    if (!element.dataset.editablePath) {
      const text = normalizeText(element.innerText || element.textContent || "");
      const path = textMap.get(text);
      if (path) {
        element.dataset.editablePath = path;
        element.dataset.editableType = element.tagName === "A" ? "link" : "text";
      }
    }

    const anchor = element instanceof HTMLAnchorElement ? element : element.closest("a");
    if (anchor?.getAttribute("href")) {
      const hrefPath = urlMap.get(normalizeUrl(anchor.getAttribute("href") ?? "")) ?? urlMap.get(anchor.getAttribute("href") ?? "");
      if (hrefPath) element.dataset.editableHrefPath = hrefPath;
    }

    if (element.dataset.editablePath) {
      applyElementStyle(element, getStyleMetadata(data, element.dataset.editablePath));
    }
  });

  root.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
    if (!image.dataset.editablePath) {
      const candidates = [image.currentSrc, image.src, image.getAttribute("src") ?? ""].map(normalizeUrl);
      const path = candidates.map((candidate) => urlMap.get(candidate)).find(Boolean);
      if (path) {
        image.dataset.editablePath = path;
        image.dataset.editableType = "image";
      }
    }
    if (!image.dataset.editableAltPath && image.alt) {
      const altPath = altMap.get(normalizeText(image.alt));
      if (altPath) image.dataset.editableAltPath = altPath;
    }
  });

  root.querySelectorAll<HTMLElement>(SECTION_SELECTOR).forEach((section) => {
    if (section.dataset.editableType === "section") return;
    const editable = section.querySelector<HTMLElement>("[data-editable-path]");
    const path = editable?.dataset.editablePath?.split(".")[0];
    if (path && data[path] !== undefined) {
      section.dataset.editablePath = path;
      section.dataset.editableType = "section";
    }
  });
}

export default function VisualCanvas({ templateId }: { templateId: string }) {
  const data = useVisualEditorStore((s) => s.data);
  const viewport = useVisualEditorStore((s) => s.viewport);
  const selection = useVisualEditorStore((s) => s.selection);
  const setSelection = useVisualEditorStore((s) => s.setSelection);
  const clearSelection = useVisualEditorStore((s) => s.clearSelection);
  const updatePath = useVisualEditorStore((s) => s.updatePath);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
  const [canvasRect, setCanvasRect] = useState<DOMRect | null>(null);

  const template = getTemplate(templateId);
  const TemplateComponent = template?.component;

  /* ── Color variable injection ── */
  const colors = data.colors;

  /* ── Typography injection ── */
  const typography = data.typography as TypographyPairing | undefined;

  useEffect(() => {
    if (!typography) return;
    const linkId = "ve-google-font";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = `https://fonts.googleapis.com/css2?family=${typography.googleImport}&display=swap`;
  }, [typography]);

  const templateStyles: CSSProperties & Record<`--${string}`, string> = {
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
    "--template-link": colorValueFrom(colors, ["link", "accent", "primary"], "#3146d3"),
    "--template-border": colorValueFrom(colors, ["border"], "#e5e7eb"),
    "--template-icon": colorValueFrom(colors, ["icon", "accent", "primary"], "#3146d3"),
    "--template-footer-bg": colorValueFrom(colors, ["footerBg", "footerBackground", "textPrimary"], "#111827"),
    "--template-footer-text": colorValueFrom(colors, ["footerText", "buttonText"], "#ffffff"),
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
    ...(typography
      ? {
          "--font-display": `"${typography.displayFont}", sans-serif`,
          "--font-heading": `"${typography.headingFont}", sans-serif`,
          "--font-body": `"${typography.bodyFont}", sans-serif`,
          "--font-nav": `"${typography.navFont}", sans-serif`,
          "--font-button": `"${typography.buttonFont}", sans-serif`,
        }
      : {}),
  };

  useEffect(() => {
    const root = canvasRef.current?.querySelector<HTMLElement>(".ve-canvas__content");
    if (!root || !isEditorObject(data)) return;
    annotateCanvas(root, data);
  }, [data, TemplateComponent]);

  const selectedStyle = useMemo(() => {
    if (!selection?.path || !isEditorObject(data)) return {};
    return getStyleMetadata(data, selection.path);
  }, [data, selection]);

  const updateSelectedStyle = useCallback((partial: StyleMetadata) => {
    if (!selection?.path || !isEditorObject(data)) return;
    updatePath(`_editor.styles.${selection.path}`, { ...selectedStyle, ...partial }, `Style ${selection.path}`);
  }, [data, selectedStyle, selection, updatePath]);

  /* ── Click handler: detect editable elements ── */
  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    // Walk up to find an element with data-editable-path
    let el: HTMLElement | null = target;
    while (el && !el.dataset.editablePath && el !== canvasRef.current) {
      el = el.parentElement;
    }

    if (!el || !el.dataset.editablePath) {
      clearSelection();
      setEditingPath(null);
      return;
    }

    const path = el.dataset.editablePath;
    const type = (el.dataset.editableType ?? "text") as "text" | "image" | "link" | "section" | "item";
    const rect = el.getBoundingClientRect();
    const cRect = canvasRef.current?.getBoundingClientRect() ?? null;
    setCanvasRect(cRect);

    setSelection({
      path,
      type,
      rect,
      hrefPath: el.dataset.editableHrefPath,
      altPath: el.dataset.editableAltPath,
      sectionId: type === "section" ? path : undefined,
    });

    if (type === "text" || type === "image") {
      setEditingPath(path);
      // Position toolbar above the element
      if (cRect) {
        let left = rect.left - cRect.left + rect.width / 2;
        const halfToolbarWidth = 100; // Approximate half width of toolbar
        if (left < halfToolbarWidth) left = halfToolbarWidth;
        if (left > cRect.width - halfToolbarWidth) left = cRect.width - halfToolbarWidth;

        let top = rect.top - cRect.top - 48;
        if (top < 10) top = rect.top - cRect.top + rect.height + 10; // Position below if too close to top

        setToolbarPos({ top, left });
      }
    }

    if (type === "text") {
      // Make the element contentEditable
      el.contentEditable = "true";
      el.focus();

      // Listen for blur to save
      const handleBlur = () => {
        const newText = el!.textContent?.trim() ?? "";
        el!.contentEditable = "false";
        if (newText) updatePath(path, newText, `Edit text: ${path}`);
        setEditingPath(null);
        el!.removeEventListener("blur", handleBlur);
      };
      el.addEventListener("blur", handleBlur);
    }

    e.stopPropagation();
  }, [clearSelection, setSelection, updatePath]);

  /* ── Keyboard shortcuts ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          useVisualEditorStore.getState().redo();
        } else {
          useVisualEditorStore.getState().undo();
        }
      }
      if (e.key === "Escape") {
        clearSelection();
        setEditingPath(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [clearSelection]);

  if (!TemplateComponent) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-[#8B8B9E]">Template not found.</p>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="ve-loading-spinner" />
      </div>
    );
  }

  const canvasWidth = VIEWPORT_WIDTHS[viewport];
  const isNarrow = viewport !== "desktop";

  return (
    <div className="ve-canvas-wrapper">
      <div
        ref={canvasRef}
        className={`ve-canvas ${isNarrow ? "ve-canvas--narrow" : ""}`}
        style={{ maxWidth: canvasWidth }}
        onClick={handleCanvasClick}
      >
        {/* Selection outline */}
        {selection?.rect && canvasRect && (
          <SelectionOutline
            rect={selection.rect}
            canvasRect={canvasRect}
            type={selection.type ?? "text"}
            path={selection.path}
          />
        )}

        {/* Floating toolbars */}
        <FloatingTextToolbar
          visible={editingPath !== null && selection?.type === "text"}
          position={toolbarPos}
          style={selectedStyle}
          hrefPath={selection?.hrefPath}
          onFontSize={(value) => updateSelectedStyle({ fontSize: value })}
          onBold={() => updateSelectedStyle({ fontWeight: selectedStyle.fontWeight === "700" ? "400" : "700" })}
          onItalic={() => updateSelectedStyle({ fontStyle: selectedStyle.fontStyle === "italic" ? "normal" : "italic" })}
          onAlignLeft={() => updateSelectedStyle({ textAlign: "left" })}
          onAlignCenter={() => updateSelectedStyle({ textAlign: "center" })}
          onAlignRight={() => updateSelectedStyle({ textAlign: "right" })}
          onLetterSpacing={(value) => updateSelectedStyle({ letterSpacing: value })}
          onLink={(href) => selection?.hrefPath && updatePath(selection.hrefPath, href, `Edit link: ${selection.hrefPath}`)}
        />
        <FloatingImageToolbar
          visible={editingPath !== null && selection?.type === "image"}
          position={toolbarPos}
          path={editingPath ?? ""}
          altPath={selection?.altPath}
        />

        {/* Template content */}
        <div className="ve-canvas__content" style={templateStyles}>
          <TemplateComponent data={data} />
        </div>
      </div>
    </div>
  );
}

/* ── Selection overlay ── */
function SelectionOutline({
  rect,
  canvasRect,
  type,
  path,
}: {
  rect: DOMRect;
  canvasRect: DOMRect;
  type: string;
  path: string;
}) {
  const top = rect.top - canvasRect.top;
  const left = rect.left - canvasRect.left;
  const label = path.split(".").pop() ?? "Element";

  return (
    <div
      className="ve-selection-outline"
      style={{
        top,
        left,
        width: rect.width,
        height: rect.height,
      }}
    >
      <span className="ve-selection-outline__label">
        {type === "image" ? "📷" : "✏️"} {label}
      </span>
    </div>
  );
}
