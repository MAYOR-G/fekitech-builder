"use client";

import { RotateCcw, Save, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useVisualEditorStore } from "@/store/visualEditorStore";

type VersionSummary = {
  id: string;
  versionName: string;
  isPublishSnapshot: boolean;
  createdAt: string;
  publishedAt?: string | null;
};

export default function HistoryPanel({ onClose }: { onClose: () => void }) {
  const projectId = useVisualEditorStore((s) => s.projectId);
  const saveNow = useVisualEditorStore((s) => s.saveNow);
  const [versions, setVersions] = useState<VersionSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");

  const loadVersions = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${projectId}/versions`);
      const payload = (await response.json()) as { versions?: VersionSummary[]; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Unable to load versions.");
      setVersions(payload.versions ?? []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load versions.");
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    queueMicrotask(() => void loadVersions());
  }, [loadVersions]);

  async function createVersion() {
    if (!projectId) return;
    const versionName = window.prompt("Version name", `Manual save ${new Date().toLocaleString()}`);
    if (!versionName) return;
    setIsBusy(true);
    setError("");
    try {
      const saved = await saveNow();
      if (!saved) throw new Error("Save the current draft before creating a version.");
      const response = await fetch(`/api/projects/${projectId}/versions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ versionName }),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Unable to create version.");
      await loadVersions();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create version.");
    } finally {
      setIsBusy(false);
    }
  }

  async function restoreVersion(version: VersionSummary) {
    if (!projectId) return;
    if (!window.confirm(`Restore "${version.versionName}"? Current unsaved edits will be replaced.`)) return;
    setIsBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/projects/${projectId}/versions/${version.id}/restore`, { method: "POST" });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Unable to restore version.");
      window.location.reload();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to restore version.");
      setIsBusy(false);
    }
  }

  return (
    <div className="ve-panel">
      <div className="ve-panel__header">
        <h2 className="ve-panel__title">History</h2>
        <button type="button" onClick={onClose} className="ve-toolbar__btn" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      <div className="ve-panel__body space-y-4">
        <button type="button" onClick={createVersion} disabled={isBusy} className="ve-panel__primary-action">
          <Save size={14} />
          Save version
        </button>

        {error ? <p className="text-xs text-red-400" role="alert">{error}</p> : null}
        {isLoading ? <div className="ve-loading-spinner" /> : null}

        <div className="space-y-2">
          {versions.map((version) => (
            <div key={version.id} className="ve-history-item">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#E8E8F0]">{version.versionName}</p>
                <p className="text-xs text-[#8B8B9E]">
                  {new Date(version.createdAt).toLocaleString()}
                  {version.isPublishSnapshot ? " · Published" : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => void restoreVersion(version)}
                disabled={isBusy}
                className="ve-floating-toolbar__btn"
                aria-label={`Restore ${version.versionName}`}
                title="Restore"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          ))}
        </div>

        {!isLoading && versions.length === 0 ? (
          <p className="text-xs text-[#8B8B9E]">No saved versions yet.</p>
        ) : null}
      </div>
    </div>
  );
}
