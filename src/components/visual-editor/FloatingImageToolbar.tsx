"use client";

import { RotateCcw, Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useVisualEditorStore } from "@/store/visualEditorStore";

type AssetSummary = { id: string; originalName: string; url: string };
type ImageStyle = { objectFit?: string; objectPosition?: string };

type Props = {
  position: { top: number; left: number };
  visible: boolean;
  path: string;
  altPath?: string;
  style?: ImageStyle;
  resetValue?: string;
  onStyle?: (style: ImageStyle) => void;
  onReset?: () => void;
};

export default function FloatingImageToolbar({
  position,
  visible,
  path,
  altPath,
  style,
  resetValue,
  onStyle,
  onReset,
}: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [assets, setAssets] = useState<AssetSummary[]>([]);
  const projectId = useVisualEditorStore((state) => state.projectId);
  const updatePath = useVisualEditorStore((state) => state.updatePath);

  useEffect(() => {
    if (!visible || !projectId) return;
    let cancelled = false;
    void fetch(`/api/projects/${projectId}/assets`)
      .then((response) => response.ok ? response.json() : { assets: [] })
      .then((payload: { assets?: AssetSummary[] }) => {
        if (!cancelled) setAssets(payload.assets ?? []);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [projectId, visible]);

  if (!visible) return null;

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !projectId) return;

    setIsUploading(true);
    const body = new FormData();
    body.set("file", file);

    try {
      const response = await fetch(`/api/projects/${projectId}/assets`, {
        method: "POST",
        body,
      });
      const payload = await response.json();
      
      if (!response.ok || !payload.asset) {
        throw new Error(payload.error ?? "Upload failed.");
      }

      updatePath(path, payload.asset.url, `Update image: ${path}`);
    } catch (error) {
      console.error("Image upload failed", error);
      alert(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div
      className="ve-floating-toolbar"
      style={{ top: position.top, left: position.left }}
      role="toolbar"
      aria-label="Image options"
    >
      <label className="ve-floating-toolbar__btn cursor-pointer" aria-label="Upload Image" title="Upload Image">
        {isUploading ? <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" /> : <Upload size={14} />}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          className="sr-only"
          disabled={isUploading}
          onChange={handleUpload}
        />
      </label>
      
      <div className="ve-floating-toolbar__divider" />

      {assets.length > 0 ? (
        <select
          className="ve-floating-toolbar__select"
          aria-label="Choose uploaded asset"
          defaultValue=""
          onChange={(event) => {
            if (event.target.value) updatePath(path, event.target.value, `Choose image asset: ${path}`);
            event.target.value = "";
          }}
        >
          <option value="">Assets</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.url}>{asset.originalName}</option>
          ))}
        </select>
      ) : null}

      {onStyle ? (
        <>
          <select
            className="ve-floating-toolbar__select"
            aria-label="Image fit"
            value={style?.objectFit ?? ""}
            onChange={(event) => onStyle({ ...style, objectFit: event.target.value })}
          >
            <option value="">Fit</option>
            <option value="cover">Cover</option>
            <option value="contain">Contain</option>
            <option value="fill">Fill</option>
          </select>
          <select
            className="ve-floating-toolbar__select"
            aria-label="Focal point"
            value={style?.objectPosition ?? ""}
            onChange={(event) => onStyle({ ...style, objectPosition: event.target.value })}
          >
            <option value="">Focus</option>
            <option value="center center">Center</option>
            <option value="center top">Top</option>
            <option value="center bottom">Bottom</option>
            <option value="left center">Left</option>
            <option value="right center">Right</option>
          </select>
        </>
      ) : null}

      <div className="ve-floating-toolbar__divider" />
      
      <button 
        type="button" 
        onClick={() => {
          const url = prompt("Enter image URL:");
          if (url) {
            updatePath(path, url, `Update image URL: ${path}`);
          }
        }} 
        className="ve-floating-toolbar__btn" 
        aria-label="Use URL" 
        title="Use URL"
      >
        <ImageIcon size={14} />
      </button>

      <div className="ve-floating-toolbar__divider" />

      <button 
        type="button" 
        onClick={() => updatePath(path, "", `Remove image: ${path}`)} 
        className="ve-floating-toolbar__btn ve-floating-toolbar__btn--danger" 
        aria-label="Remove Image"
        title="Remove Image"
      >
        <Trash2 size={14} />
      </button>

      {altPath ? (
        <>
          <div className="ve-floating-toolbar__divider" />
          <button
            type="button"
            onClick={() => {
              const alt = window.prompt("Image alt text");
              if (alt !== null) updatePath(altPath, alt, `Edit alt text: ${altPath}`);
            }}
            className="ve-floating-toolbar__btn"
            aria-label="Edit alt text"
            title="Edit alt text"
          >
            Alt
          </button>
        </>
      ) : null}

      {resetValue && onReset ? (
        <>
          <div className="ve-floating-toolbar__divider" />
          <button type="button" onClick={onReset} className="ve-floating-toolbar__btn" aria-label="Reset image" title="Reset image">
            <RotateCcw size={14} />
          </button>
        </>
      ) : null}
    </div>
  );
}
