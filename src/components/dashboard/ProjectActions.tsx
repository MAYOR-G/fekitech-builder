"use client";

import { Copy, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ProjectActions({ projectId, projectName }: { projectId: string; projectName: string }) {
  const router = useRouter();
  const [isBusy, setIsBusy] = useState(false);

  async function requestJson(path: string, init: RequestInit) {
    setIsBusy(true);
    try {
      const response = await fetch(path, init);
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Action failed.");
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Action failed.");
      setIsBusy(false);
    }
  }

  function rename() {
    const name = window.prompt("Project name", projectName);
    if (!name || name === projectName) return;
    void requestJson(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
  }

  function duplicate() {
    void requestJson(`/api/projects/${projectId}/duplicate`, { method: "POST" });
  }

  function remove() {
    if (!window.confirm(`Delete "${projectName}"? This removes it from your active project limit.`)) return;
    void requestJson(`/api/projects/${projectId}`, { method: "DELETE" });
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <button type="button" onClick={rename} disabled={isBusy} className="min-h-11 rounded-xl border border-ft-border px-2 text-ft-body transition-colors hover:bg-ft-surface-alt" aria-label="Rename project" title="Rename">
        <Pencil aria-hidden="true" size={16} className="mx-auto" />
      </button>
      <button type="button" onClick={duplicate} disabled={isBusy} className="min-h-11 rounded-xl border border-ft-border px-2 text-ft-body transition-colors hover:bg-ft-surface-alt" aria-label="Duplicate project" title="Duplicate">
        <Copy aria-hidden="true" size={16} className="mx-auto" />
      </button>
      <button type="button" onClick={remove} disabled={isBusy} className="min-h-11 rounded-xl border border-red-100 px-2 text-red-700 transition-colors hover:bg-red-50" aria-label="Delete project" title="Delete">
        <Trash2 aria-hidden="true" size={16} className="mx-auto" />
      </button>
    </div>
  );
}
