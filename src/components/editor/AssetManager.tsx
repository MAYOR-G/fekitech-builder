"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Trash2, Upload } from "lucide-react";
import { useEditorStore, type EditorValue } from "@/store/editorStore";

type Asset = {
  id: string;
  originalName: string;
  url: string;
  width: number | null;
  height: number | null;
};

type ImageField = { path: Array<string | number>; label: string };

function imageFields(value: EditorValue, path: Array<string | number> = [], result: ImageField[] = []): ImageField[] {
  if (path.length > 12) return result;
  if (typeof value === "string") {
    const key = String(path.at(-1) ?? "");
    if (/image|photo|logo|avatar|background|src|url/i.test(key)) {
      result.push({ path, label: path.map(String).join(" · ") });
    }
  } else if (Array.isArray(value)) {
    value.forEach((entry, index) => imageFields(entry, [...path, index], result));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) => imageFields(entry, [...path, key], result));
  }
  return result;
}

export function AssetManager() {
  const projectId = useEditorStore((state) => state.projectId);
  const data = useEditorStore((state) => state.data);
  const updatePath = useEditorStore((state) => state.updatePath);
  const fields = useMemo(() => imageFields(data), [data]);
  const [selectedPath, setSelectedPath] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    void fetch(`/api/projects/${projectId}/assets`)
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load images.");
        return response.json() as Promise<{ assets: Asset[] }>;
      })
      .then((payload) => setAssets(payload.assets))
      .catch((error: Error) => setMessage(error.message));
  }, [projectId]);

  function applyAsset(url: string) {
    const field = fields.find((candidate) => JSON.stringify(candidate.path) === selectedPath);
    if (!field) {
      setMessage("Select an image field before applying an upload.");
      return;
    }
    updatePath(field.path, url);
    setMessage("Image applied. Autosave is in progress.");
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="asset-target" className="mb-1.5 block text-xs font-medium text-ft-body">Apply uploads to</label>
        <select
          id="asset-target"
          value={selectedPath}
          onChange={(event) => setSelectedPath(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm"
        >
          <option value="">Select an image field</option>
          {fields.map((field) => {
            const value = JSON.stringify(field.path);
            return <option key={value} value={value}>{field.label}</option>;
          })}
        </select>
      </div>

      <label className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-ft-primary px-4 py-2 text-sm font-semibold text-white hover:bg-ft-primary-deep">
        <Upload aria-hidden="true" size={17} />
        {isUploading ? "Uploading…" : "Upload image"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="sr-only"
          disabled={isUploading || !projectId}
          onChange={async (event) => {
            const file = event.target.files?.[0];
            if (!file || !projectId) return;
            setIsUploading(true);
            setMessage("");
            const body = new FormData();
            body.set("file", file);
            try {
              const response = await fetch(`/api/projects/${projectId}/assets`, { method: "POST", body });
              const payload = (await response.json()) as { asset?: Asset; error?: string };
              if (!response.ok || !payload.asset) throw new Error(payload.error ?? "Upload failed.");
              setAssets((current) => [payload.asset as Asset, ...current]);
              if (selectedPath) applyAsset(payload.asset.url);
              else setMessage("Upload complete. Select a field and choose Use image.");
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Upload failed.");
            } finally {
              setIsUploading(false);
              event.target.value = "";
            }
          }}
        />
      </label>

      {message ? <p className="rounded-lg bg-gray-50 p-3 text-sm text-ft-body" role="status">{message}</p> : null}
      {assets.length === 0 ? <p className="text-sm text-ft-body">No uploaded images yet.</p> : null}
      <ul className="space-y-3">
        {assets.map((asset) => (
          <li key={asset.id} className="flex items-center gap-3 rounded-lg border border-gray-200 p-2">
            <Image src={asset.url} alt="" width={64} height={64} unoptimized className="h-16 w-16 rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-ft-body">{asset.originalName}</p>
              <button type="button" onClick={() => applyAsset(asset.url)} className="mt-1 text-sm font-semibold text-ft-primary hover:underline">Use image</button>
            </div>
            <button
              type="button"
              aria-label={`Delete ${asset.originalName}`}
              className="min-h-11 min-w-11 rounded-lg text-red-700 hover:bg-red-50"
              onClick={async () => {
                const response = await fetch(`/api/assets/${asset.id}`, { method: "DELETE" });
                if (response.ok) setAssets((current) => current.filter((candidate) => candidate.id !== asset.id));
                else setMessage("The image could not be deleted.");
              }}
            >
              <Trash2 aria-hidden="true" className="mx-auto" size={17} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
