"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getTemplate } from "@/registry";
import { useVisualEditorStore } from "@/store/visualEditorStore";
import { EditorContext } from "@/components/editor/blocks/EditableText";
import FloatingTextToolbar from "./FloatingTextToolbar";
import type { CSSProperties } from "react";

/* ── Viewport width map ── */
const VIEWPORT_WIDTHS = { desktop: "100%", tablet: "768px", mobile: "375px" } as const;

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
  const colorValue = (key: string, fallback: string) => {
    if (!colors || typeof colors !== "object" || Array.isArray(colors)) return fallback;
    const v = (colors as Record<string, unknown>)[key];
    return typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v) ? v : fallback;
  };

  const templateStyles: CSSProperties & Record<`--${string}`, string> = {
    backgroundColor: colorValue("background", "#ffffff"),
    color: colorValue("text", "#111827"),
    "--template-primary": colorValue("primary", "#3146d3"),
    "--color-primary": colorValue("primary", "#3146d3"),
    "--color-brand-primary": colorValue("primary", "#3146d3"),
    "--template-background": colorValue("background", "#ffffff"),
    "--template-text": colorValue("text", "#111827"),
  };

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

    setSelection({ path, type, rect });

    if (type === "text") {
      setEditingPath(path);
      // Position toolbar above the element
      if (cRect) {
        setToolbarPos({
          top: rect.top - cRect.top - 48,
          left: rect.left - cRect.left + rect.width / 2,
        });
      }

      // Make the element contentEditable
      el.contentEditable = "true";
      el.focus();

      // Listen for blur to save
      const handleBlur = () => {
        const newText = el!.textContent?.trim() ?? "";
        el!.contentEditable = "false";
        updatePath(path, newText, `Edit text: ${path}`);
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

        {/* Floating text toolbar */}
        <FloatingTextToolbar
          visible={editingPath !== null}
          position={toolbarPos}
        />

        {/* Template content */}
        <div className="ve-canvas__content" style={templateStyles}>
          <EditorContext.Provider value={true}>
            <TemplateComponent data={data} />
          </EditorContext.Provider>
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
