"use client";

import Link from "next/link";
import {
  ArrowLeft, ChevronDown, ExternalLink, Monitor, Redo2,
  Smartphone, Tablet, Undo2, Palette, Save,
  Blocks, History, PanelTop,
} from "lucide-react";
import { useVisualEditorStore, type Viewport, type PanelId } from "@/store/visualEditorStore";

const VIEWPORTS: { id: Viewport; label: string; icon: typeof Monitor }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

const PANELS: { id: PanelId; label: string; icon: typeof Palette }[] = [
  { id: "design", label: "Design", icon: Palette },
  { id: "blocks", label: "Blocks", icon: Blocks },
  { id: "pages", label: "Pages", icon: PanelTop },
  { id: "history", label: "History", icon: History },
];

export default function VisualEditorToolbar() {
  const projectId = useVisualEditorStore((s) => s.projectId);
  const projectName = useVisualEditorStore((s) => s.projectName);
  const viewport = useVisualEditorStore((s) => s.viewport);
  const setViewport = useVisualEditorStore((s) => s.setViewport);
  const saveStatus = useVisualEditorStore((s) => s.saveStatus);
  const saveError = useVisualEditorStore((s) => s.saveError);
  const saveNow = useVisualEditorStore((s) => s.saveNow);
  const activePanel = useVisualEditorStore((s) => s.activePanel);
  const setActivePanel = useVisualEditorStore((s) => s.setActivePanel);
  const undo = useVisualEditorStore((s) => s.undo);
  const redo = useVisualEditorStore((s) => s.redo);
  const past = useVisualEditorStore((s) => s.past);
  const future = useVisualEditorStore((s) => s.future);

  const statusLabel =
    saveStatus === "error" ? (saveError ?? "Save failed")
    : saveStatus === "saving" ? "Saving…"
    : saveStatus === "dirty" ? "Unsaved changes"
    : "Saved";

  const statusDot =
    saveStatus === "error" ? "bg-red-500"
    : saveStatus === "saving" ? "bg-amber-400 animate-pulse"
    : saveStatus === "dirty" ? "bg-amber-400"
    : "bg-emerald-500";

  return (
    <header className="ve-toolbar">
      {/* ── Left: Back + Project Name ── */}
      <div className="ve-toolbar__left">
        <Link
          href="/dashboard"
          aria-label="Back to dashboard"
          className="ve-toolbar__btn"
        >
          <ArrowLeft size={16} />
        </Link>

        <div className="ve-toolbar__divider" />

        <span className="ve-toolbar__project-name" title={projectName}>
          {projectName}
        </span>
      </div>

      {/* ── Center: Panels + Viewport ── */}
      <div className="ve-toolbar__center">
        {PANELS.map((panel) => {
          const Icon = panel.icon;
          const isActive = activePanel === panel.id;
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => setActivePanel(panel.id)}
              className={`ve-toolbar__panel-btn ${isActive ? "ve-toolbar__panel-btn--active" : ""}`}
              aria-pressed={isActive}
            >
              <Icon size={15} />
              <span>{panel.label}</span>
              <ChevronDown size={12} className={`transition-transform ${isActive ? "rotate-180" : ""}`} />
            </button>
          );
        })}

        <div className="ve-toolbar__divider" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={undo}
          disabled={past.length === 0}
          className="ve-toolbar__btn"
          aria-label="Undo"
          title="Undo"
        >
          <Undo2 size={15} />
        </button>
        <button
          type="button"
          onClick={redo}
          disabled={future.length === 0}
          className="ve-toolbar__btn"
          aria-label="Redo"
          title="Redo"
        >
          <Redo2 size={15} />
        </button>

        <div className="ve-toolbar__divider" />

        {/* Viewport */}
        <div className="ve-toolbar__viewport-group" role="group" aria-label="Preview size">
          {VIEWPORTS.map((v) => {
            const Icon = v.icon;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setViewport(v.id)}
                aria-label={v.label}
                aria-pressed={viewport === v.id}
                className={`ve-toolbar__viewport-btn ${viewport === v.id ? "ve-toolbar__viewport-btn--active" : ""}`}
              >
                <Icon size={15} />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Right: Save + Preview + Publish ── */}
      <div className="ve-toolbar__right">
        {/* Save status */}
        <button
          type="button"
          onClick={() => saveStatus === "error" || saveStatus === "dirty" ? void saveNow() : undefined}
          className="ve-toolbar__save-status"
          aria-live="polite"
          title={statusLabel}
        >
          <span className={`ve-toolbar__status-dot ${statusDot}`} />
          <span className="hidden sm:inline">{statusLabel}</span>
        </button>

        <div className="ve-toolbar__divider" />

        {/* Preview */}
        {projectId ? (
          <Link
            href={`/preview/project/${projectId}`}
            target="_blank"
            onClick={(e) => {
              if (saveStatus === "dirty" || saveStatus === "error") {
                e.preventDefault();
                void saveNow().then((ok) => {
                  if (ok) window.open(`/preview/project/${projectId}`, "_blank", "noopener,noreferrer");
                });
              }
            }}
            className="ve-toolbar__btn"
            aria-label="Preview"
            title="Preview in new tab"
          >
            <ExternalLink size={15} />
            <span className="hidden lg:inline">Preview</span>
          </Link>
        ) : null}

        {/* Publish */}
        <button
          type="button"
          className="ve-toolbar__publish-btn"
          onClick={async () => {
            if (!projectId) return;
            if (saveStatus === "dirty" || saveStatus === "error") {
              const saved = await saveNow();
              if (!saved) return;
            }
            try {
              const res = await fetch(`/api/projects/${projectId}/publish`, { method: "POST" });
              const payload = (await res.json()) as { url?: string; error?: string };
              if (!res.ok || !payload.url) throw new Error(payload.error ?? "Publishing failed.");
              window.open(payload.url, "_blank", "noopener,noreferrer");
            } catch {
              /* handled by save status */
            }
          }}
        >
          <Save size={15} />
          <span>Publish</span>
        </button>
      </div>
    </header>
  );
}
