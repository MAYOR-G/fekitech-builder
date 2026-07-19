"use client";

import { useEditorStore } from "@/store/editorStore";
import { getTemplate } from "@/registry";
import { EditorContext } from "./blocks/EditableText";
import type { CSSProperties } from "react";

export default function Canvas({ templateId }: { templateId: string }) {
  const { data, viewport } = useEditorStore();
  const template = getTemplate(templateId);
  const config = template?.config;
  const TemplateComponent = template?.component;
  const colors = data.colors;
  const colorValue = (key: string, fallback: string) => {
    if (!colors || typeof colors !== "object" || Array.isArray(colors)) return fallback;
    const value = colors[key];
    return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
  };
  const templateStyles: CSSProperties & Record<`--${string}`, string> = {
    backgroundColor: colorValue("background", "#ffffff"),
    color: colorValue("text", "#111827"),
    "--template-primary": colorValue("primary", "#3146d3"),
    "--color-primary": colorValue("primary", "#3146d3"),
    "--color-brand-primary": colorValue("primary", "#3146d3"),
    "--template-background": colorValue("background", "#ffffff"),
    "--template-text": colorValue("text", "#111827"),
  };

  const getViewportStyles = () => {
    switch (viewport) {
      case "mobile":
        return "w-[375px] h-[812px]";
      case "tablet":
        return "w-[768px] h-[1024px]";
      default:
        return "w-full max-w-[1200px] min-h-[800px]";
    }
  };

  if (!config) return <div className="p-8 text-center text-red-500">Template not found.</div>;
  if (!data || Object.keys(data).length === 0)
    return <div className="p-8 text-center text-gray-500">Loading template data...</div>;
  if (!TemplateComponent)
    return (
      <div className="flex h-[800px] w-full items-center justify-center bg-gray-50">
        <div className="text-gray-400">Loading template…</div>
      </div>
    );

  return (
    <div
      className={`${getViewportStyles()} bg-white shadow-2xl rounded-lg overflow-hidden flex flex-col border border-gray-200 transition-all duration-300`}
    >
      {/* Browser Mockup Header */}
      <div className="h-12 bg-gray-100 border-b border-gray-200 flex items-center px-4 gap-2 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-white text-xs text-gray-500 px-4 py-1 rounded border border-gray-200 w-64 text-center truncate">
            {templateId}.fekitech.site
          </div>
        </div>
      </div>

      {/* Rendered Template */}
      <div className="flex-1 overflow-y-auto bg-gray-50" style={templateStyles}>
        <EditorContext.Provider value={true}>
          <TemplateComponent data={data} />
        </EditorContext.Provider>
      </div>
    </div>
  );
}
