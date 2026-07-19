"use client";

import { useEditorStore, type EditorObject } from "@/store/editorStore";

const COLOR_FIELDS = [
  { key: "primary", label: "Primary color", fallback: "#3146D3" },
  { key: "background", label: "Background", fallback: "#FFFFFF" },
  { key: "text", label: "Text color", fallback: "#111827" },
] as const;

export default function ThemeEditor() {
  const data = useEditorStore((state) => state.data);
  const updatePath = useEditorStore((state) => state.updatePath);
  const colors = data.colors && typeof data.colors === "object" && !Array.isArray(data.colors)
    ? data.colors as EditorObject
    : {};

  return (
    <div className="space-y-4">
      <p className="text-sm text-ft-body">Theme colors apply through shared template color variables. Template-specific color fields remain available under Content.</p>
      {COLOR_FIELDS.map((field) => {
        const candidate = colors[field.key];
        const current = typeof candidate === "string" && /^#[0-9a-f]{6}$/i.test(candidate)
          ? candidate
          : field.fallback;
        return (
          <div key={field.key} className="flex min-h-11 items-center justify-between gap-3">
            <label htmlFor={`theme-${field.key}`} className="text-sm font-medium text-ft-ink">{field.label}</label>
            <div className="flex items-center gap-2">
              <input id={`theme-${field.key}`} type="color" value={current} onChange={(event) => updatePath(["colors", field.key], event.target.value)} className="h-10 w-12 cursor-pointer rounded-md border border-gray-300 bg-white p-1" />
              <span className="w-16 text-xs uppercase text-ft-body">{current}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
