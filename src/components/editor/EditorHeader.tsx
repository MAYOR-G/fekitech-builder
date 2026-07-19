"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Monitor, Smartphone, Tablet } from "lucide-react";
import { useEditorStore } from "@/store/editorStore";
import { LogoMark } from "@/components/ui/LogoMark";

const VIEWPORTS = [
  { id: "desktop" as const, label: "Desktop preview", icon: Monitor },
  { id: "tablet" as const, label: "Tablet preview", icon: Tablet },
  { id: "mobile" as const, label: "Mobile preview", icon: Smartphone },
];

export default function EditorHeader() {
  const { projectId, projectName, saveStatus, saveError, viewport, setViewport, saveNow } = useEditorStore();
  const statusText = saveStatus === "error"
    ? saveError ?? "Save failed"
    : saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "dirty"
        ? "Unsaved changes"
        : "Draft saved";

  return (
    <header className="z-20 flex min-h-14 shrink-0 items-center justify-between gap-3 border-b border-ft-border bg-white px-3 sm:px-4">
      <div className="flex min-w-0 items-center gap-3">
        <Link href="/dashboard" aria-label="Back to dashboard" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-ft-body transition-colors hover:bg-ft-surface-alt hover:text-ft-ink">
          <ArrowLeft aria-hidden="true" size={18} />
        </Link>
        <LogoMark className="hidden !h-8 !w-8 sm:block" />
        <span className="truncate text-sm font-medium text-ft-ink">{projectName}</span>
      </div>

      <div className="hidden items-center rounded-lg border border-ft-border bg-ft-surface-alt p-1 md:flex" role="group" aria-label="Preview size">
        {VIEWPORTS.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              aria-label={option.label}
              aria-pressed={viewport === option.id}
              onClick={() => setViewport(option.id)}
              className={`flex min-h-9 min-w-9 items-center justify-center rounded-md transition-colors ${viewport === option.id ? "bg-white text-ft-ink shadow-sm" : "text-ft-body hover:text-ft-ink"}`}
            >
              <Icon aria-hidden="true" size={16} />
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className={`hidden text-xs sm:inline ${saveStatus === "error" ? "text-red-700" : "text-ft-body"}`} aria-live="polite">{statusText}</span>
        {projectId ? (
          <Link
            href={`/preview/project/${projectId}`}
            target="_blank"
            onClick={(event) => {
              if (saveStatus === "dirty" || saveStatus === "error") {
                event.preventDefault();
                void saveNow().then((saved) => {
                  if (saved) window.open(`/preview/project/${projectId}`, "_blank", "noopener,noreferrer");
                });
              }
            }}
            className="flex min-h-11 items-center gap-2 rounded-lg border border-ft-border px-3 text-sm font-semibold text-ft-ink hover:bg-ft-surface-alt"
          >
            <ExternalLink aria-hidden="true" size={16} />
            <span className="hidden sm:inline">Preview</span>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
