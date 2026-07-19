"use client";

import { use, useEffect, useState } from "react";
import Canvas from "@/components/editor/Canvas";
import Sidebar from "@/components/editor/Sidebar";
import { isEditorObject, useEditorStore } from "@/store/editorStore";

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: projectId } = use(params);
  const [templateId, setTemplateId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const saveStatus = useEditorStore((state) => state.saveStatus);

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
        useEditorStore.getState().setTemplateData(payload.project.editableData);
        useEditorStore.getState().setProjectId(projectId);
        useEditorStore.getState().setProjectName(payload.project.name);
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

  useEffect(() => {
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (saveStatus === "dirty" || saveStatus === "saving" || saveStatus === "error") event.preventDefault();
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [saveStatus]);

  if (isLoading) return <div className="flex flex-1 items-center justify-center bg-ft-gray-soft" role="status">Loading project…</div>;
  if (error || !templateId) {
    return (
      <div className="flex flex-1 items-center justify-center bg-ft-gray-soft p-6">
        <div className="max-w-md rounded-xl border border-red-200 bg-white p-6 text-center">
          <h1 className="text-lg font-semibold text-ft-ink">Editor unavailable</h1>
          <p className="mt-2 text-sm text-red-700" role="alert">{error || "The project could not be found."}</p>
          <button type="button" onClick={() => window.location.reload()} className="mt-4 min-h-11 rounded-lg bg-ft-primary px-4 py-2 font-semibold text-white">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <aside className="z-10 flex w-80 shrink-0 flex-col border-r border-ft-border bg-white shadow-sm">
        <Sidebar />
      </aside>
      <div className="relative flex flex-1 items-center justify-center overflow-auto bg-ft-gray-soft p-4 sm:p-8">
        <Canvas templateId={templateId} />
      </div>
    </>
  );
}
