"use client";

import { useEffect, useState } from "react";
import { useEditorStore, type EditorObject } from "@/store/editorStore";

type Version = {
  id: string;
  versionName: string;
  isPublishSnapshot: boolean;
  createdAt: string;
};

export function VersionPanel() {
  const projectId = useEditorStore((state) => state.projectId);
  const saveNow = useEditorStore((state) => state.saveNow);
  const setTemplateData = useEditorStore((state) => state.setTemplateData);
  const [versions, setVersions] = useState<Version[]>([]);
  const [message, setMessage] = useState("");
  const [isWorking, setIsWorking] = useState(false);

  async function loadVersions() {
    if (!projectId) return;
    const response = await fetch(`/api/projects/${projectId}/versions`);
    if (!response.ok) {
      setMessage("Unable to load version history.");
      return;
    }
    const payload = (await response.json()) as { versions: Version[] };
    setVersions(payload.versions);
  }

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();

    void fetch(`/api/projects/${projectId}/versions`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load version history.");
        return (await response.json()) as { versions: Version[] };
      })
      .then((payload) => setVersions(payload.versions))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setMessage("Unable to load version history.");
      });

    return () => controller.abort();
  }, [projectId]);

  return (
    <div className="space-y-4">
      <button
        type="button"
        disabled={isWorking}
        className="min-h-11 w-full rounded-lg bg-ft-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
        onClick={async () => {
          if (!projectId) return;
          setIsWorking(true);
          setMessage("");
          if (!(await saveNow())) {
            setMessage("Save the current changes before creating a version.");
            setIsWorking(false);
            return;
          }
          const response = await fetch(`/api/projects/${projectId}/versions`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ versionName: `Manual version ${new Date().toLocaleString()}` }),
          });
          const payload = (await response.json()) as { error?: string };
          setMessage(response.ok ? "Version created." : payload.error ?? "Unable to create the version.");
          if (response.ok) await loadVersions();
          setIsWorking(false);
        }}
      >
        Create version
      </button>
      {message ? <p role="status" className="rounded-lg bg-gray-50 p-3 text-sm text-ft-body">{message}</p> : null}
      {versions.length === 0 ? <p className="text-sm text-ft-body">No saved versions yet.</p> : null}
      <ul className="space-y-3">
        {versions.map((version) => (
          <li key={version.id} className="rounded-lg border border-gray-200 p-3">
            <p className="text-sm font-semibold text-ft-ink">{version.versionName}</p>
            <p className="mt-1 text-xs text-ft-body">{new Date(version.createdAt).toLocaleString()}{version.isPublishSnapshot ? " · Published" : ""}</p>
            <button
              type="button"
              disabled={isWorking}
              className="mt-2 text-sm font-semibold text-ft-primary hover:underline disabled:opacity-50"
              onClick={async () => {
                if (!projectId) return;
                setIsWorking(true);
                const response = await fetch(`/api/projects/${projectId}/versions/${version.id}/restore`, { method: "POST" });
                const payload = (await response.json()) as { project?: { editableData: EditorObject }; error?: string };
                if (response.ok && payload.project) {
                  setTemplateData(payload.project.editableData);
                  setMessage("Version restored to the draft. The published site was not changed.");
                } else setMessage(payload.error ?? "Unable to restore the version.");
                setIsWorking(false);
              }}
            >
              Restore to draft
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
