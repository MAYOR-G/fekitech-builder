"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getTemplate } from "@/registry";
import { isEditorObject, useVisualEditorStore, type EditorObject } from "@/store/visualEditorStore";
import { bindTemplateDom, stableHash } from "@/lib/editor-dom";
import FloatingTextToolbar from "./FloatingTextToolbar";
import FloatingImageToolbar from "./FloatingImageToolbar";
import FloatingIconToolbar from "./FloatingIconToolbar";
import type { CSSProperties } from "react";
import type { TypographyPairing } from "@/lib/typography";

/* ── Viewport width map ── */
const VIEWPORT_WIDTHS = { desktop: "100%", tablet: "768px", mobile: "375px" } as const;

type StyleMetadata = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  lineHeight?: string;
  letterSpacing?: string;
  color?: string;
  objectFit?: string;
  objectPosition?: string;
};

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

function getStyleMetadata(data: EditorObject, path: string): StyleMetadata {
  const styles = data._editor;
  if (!isEditorObject(styles) || !isEditorObject(styles.styles)) return {};
  const value = styles.styles[stableHash(path)];
  return isEditorObject(value) ? value as StyleMetadata : {};
}

export default function VisualCanvas({ templateId }: { templateId: string }) {
  const data = useVisualEditorStore((s) => s.data);
  const viewport = useVisualEditorStore((s) => s.viewport);
  const selection = useVisualEditorStore((s) => s.selection);
  const setSelection = useVisualEditorStore((s) => s.setSelection);
  const clearSelection = useVisualEditorStore((s) => s.clearSelection);
  const updatePath = useVisualEditorStore((s) => s.updatePath);
  const duplicateNearestArrayItem = useVisualEditorStore((s) => s.duplicateNearestArrayItem);
  const deleteNearestArrayItem = useVisualEditorStore((s) => s.deleteNearestArrayItem);
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
    bindTemplateDom(root, data, templateId, true);
  }, [data, TemplateComponent, templateId]);

  const selectedStyle = useMemo(() => {
    if (!selection?.path || !isEditorObject(data)) return {};
    return getStyleMetadata(data, selection.path);
  }, [data, selection]);

  const updateSelectedStyle = useCallback((partial: StyleMetadata) => {
    if (!selection?.path || !isEditorObject(data)) return;
    updatePath(`_editor.styles.${stableHash(selection.path)}`, { ...selectedStyle, ...partial }, `Style ${selection.path}`);
  }, [data, selectedStyle, selection, updatePath]);

  const isRepeatedElement = useMemo(() => Boolean(selection?.path.split(".").some((segment) => /^\d+$/.test(segment))), [selection]);

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
    const type = (el.dataset.editableType ?? "text") as "text" | "image" | "link" | "section" | "item" | "icon";
    const rect = el.getBoundingClientRect();
    const cRect = canvasRef.current?.getBoundingClientRect() ?? null;
    setCanvasRect(cRect);

    setSelection({
      path,
      type,
      rect,
      hrefPath: el.dataset.editableHrefPath,
      altPath: el.dataset.editableAltPath,
      resetValue: el.dataset.editableResetValue ?? el.dataset.editableOriginal,
      sectionId: type === "section" ? path : undefined,
    });

    if (type === "text" || type === "link" || type === "image" || type === "icon") {
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

    if (type === "text" || type === "link") {
      // Make the element contentEditable
      el.contentEditable = "true";
      el.focus();

      // Listen for blur to save
      const handleBlur = () => {
        const newText = (el!.textContent?.trim() ?? "").slice(0, 600);
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
          visible={editingPath !== null && (selection?.type === "text" || selection?.type === "link")}
          position={toolbarPos}
          style={selectedStyle}
          hrefPath={selection?.hrefPath}
          onFontSize={(value) => updateSelectedStyle({ fontSize: value })}
          onBold={() => updateSelectedStyle({ fontWeight: selectedStyle.fontWeight === "700" ? "400" : "700" })}
          onItalic={() => updateSelectedStyle({ fontStyle: selectedStyle.fontStyle === "italic" ? "normal" : "italic" })}
          onUnderline={() => updateSelectedStyle({ textDecoration: selectedStyle.textDecoration === "underline" ? "none" : "underline" })}
          onColor={(value) => updateSelectedStyle({ color: value })}
          onAlignLeft={() => updateSelectedStyle({ textAlign: "left" })}
          onAlignCenter={() => updateSelectedStyle({ textAlign: "center" })}
          onAlignRight={() => updateSelectedStyle({ textAlign: "right" })}
          onLineHeight={(value) => updateSelectedStyle({ lineHeight: value })}
          onLetterSpacing={(value) => updateSelectedStyle({ letterSpacing: value })}
          onLink={(href) => selection?.hrefPath && updatePath(selection.hrefPath, href, `Edit link: ${selection.hrefPath}`)}
          onDuplicate={isRepeatedElement && selection?.path ? () => duplicateNearestArrayItem(selection.path) : undefined}
          onDelete={selection?.path ? () => {
            if (isRepeatedElement) deleteNearestArrayItem(selection.path);
            else updatePath(selection.path, "", `Clear ${selection.path}`);
          } : undefined}
          onReset={selection?.path && selection.resetValue !== undefined ? () => updatePath(selection.path, selection.resetValue ?? "", `Reset ${selection.path}`) : undefined}
        />
        <FloatingImageToolbar
          visible={editingPath !== null && selection?.type === "image"}
          position={toolbarPos}
          path={editingPath ?? ""}
          altPath={selection?.altPath}
          style={selectedStyle}
          resetValue={selection?.resetValue}
          onStyle={(style) => updateSelectedStyle(style)}
          onReset={selection?.path && selection.resetValue !== undefined ? () => updatePath(selection.path, selection.resetValue ?? "", `Reset image: ${selection.path}`) : undefined}
        />
        <FloatingIconToolbar
          visible={editingPath !== null && selection?.type === "icon"}
          position={toolbarPos}
          style={selectedStyle}
          hrefPath={selection?.hrefPath}
          onStyle={(style) => updateSelectedStyle(style)}
          onLink={(href) => selection?.hrefPath && updatePath(selection.hrefPath, href, `Edit icon link: ${selection.hrefPath}`)}
          onReset={selection?.path ? () => updatePath(`_editor.styles.${stableHash(selection.path)}`, {}, `Reset icon: ${selection.path}`) : undefined}
          onDelete={selection?.path ? () => updatePath(`_editor.styles.${stableHash(selection.path)}`, { ...selectedStyle, fontSize: "0px", width: "0px", height: "0px" }, `Hide icon: ${selection.path}`) : undefined}
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
