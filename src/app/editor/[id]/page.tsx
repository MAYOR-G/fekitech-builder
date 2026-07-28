"use client";

import { use, useEffect, useState } from "react";
import { isEditorObject, useVisualEditorStore } from "@/store/visualEditorStore";
import VisualEditorToolbar from "@/components/visual-editor/VisualEditorToolbar";
import VisualCanvas from "@/components/visual-editor/VisualCanvas";
import DesignPanel from "@/components/visual-editor/DesignPanel";
import BlocksPanel from "@/components/visual-editor/BlocksPanel";
import "@/components/visual-editor/visual-editor.css";

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = use(params);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const saveStatus = useVisualEditorStore((s) => s.saveStatus);
  const activePanel = useVisualEditorStore((s) => s.activePanel);
  const setActivePanel = useVisualEditorStore((s) => s.setActivePanel);

  /* ── Load project ── */
  useEffect(() => {
    const controller = new AbortController();
    void fetch(`/api/projects/${projectId}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = (await response.json()) as {
          project?: { editableData: unknown; templateId: string; name: string };
          error?: string;
        };
        if (!response.ok || !payload.project) throw new Error(payload.error ?? "Unable to load the project.");
        if (!isEditorObject(payload.project.editableData)) throw new Error("The project data is invalid.");
        useVisualEditorStore.getState().init(
          projectId,
          payload.project.name,
          payload.project.templateId,
          payload.project.editableData,
        );
        setTemplateId(payload.project.templateId);
      })
      .catch((caught: unknown) => {
        if (!(caught instanceof DOMException && caught.name === "AbortError")) {
          setError(caught instanceof Error ? caught.message : "Unable to load the project.");
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [projectId]);

  /* ── Warn on unsaved exit ── */
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (saveStatus === "dirty" || saveStatus === "saving" || saveStatus === "error") e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveStatus]);

  /* ── Loading state ── */
  if (isLoading) {
    return (
      <div className="flex h-screen flex-col bg-[#0E0E14]">
        <div className="h-[52px] bg-[#111118] border-b border-white/[0.06]" />
        <div className="flex flex-1 items-center justify-center">
          <div className="ve-loading-spinner" />
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error || !templateId) {
    return (
      <div className="flex h-screen flex-col bg-[#0E0E14]">
        <div className="h-[52px] bg-[#111118] border-b border-white/[0.06]" />
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="max-w-md rounded-xl bg-[#14141C] border border-white/[0.08] p-8 text-center">
            <h1 className="text-lg font-semibold text-white">Editor unavailable</h1>
            <p className="mt-3 text-sm text-red-400" role="alert">
              {error || "The project could not be found."}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 min-h-11 rounded-lg bg-[#6C5CE7] px-6 py-2 font-semibold text-white hover:bg-[#5A4BD1]"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0E0E14]">
      <VisualEditorToolbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Side panel */}
        {activePanel === "design" && (
          <DesignPanel onClose={() => setActivePanel(null)} />
        )}
        {activePanel === "blocks" && (
          <BlocksPanel onClose={() => setActivePanel(null)} />
        )}

        {/* Canvas */}
        <VisualCanvas templateId={templateId} />
      </div>
    </div>
  );
}
