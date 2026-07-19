"use client";

import { useState } from "react";
import { Clock3, FileImage, Layers, Palette } from "lucide-react";
import { AssetManager } from "./AssetManager";
import { ContentEditor } from "./ContentEditor";
import ThemeEditor from "./ThemeEditor";
import { VersionPanel } from "./VersionPanel";
import { useEditorStore } from "@/store/editorStore";
import { LogoMark } from "@/components/ui/LogoMark";

type Tab = "content" | "theme" | "assets" | "versions";

const TABS = [
  { id: "content" as const, label: "Content", icon: Layers },
  { id: "theme" as const, label: "Theme", icon: Palette },
  { id: "assets" as const, label: "Images", icon: FileImage },
  { id: "versions" as const, label: "Versions", icon: Clock3 },
];

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [publishMessage, setPublishMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const projectId = useEditorStore((state) => state.projectId);
  const saveStatus = useEditorStore((state) => state.saveStatus);
  const saveNow = useEditorStore((state) => state.saveNow);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-gray-200 bg-ft-dark p-4 text-white">
        <LogoMark className="!h-8 !w-8" />
        <div className="min-w-0"><p className="font-heading font-bold">FekiTech Editor</p>
        <p className="mt-0.5 text-xs text-gray-200" aria-live="polite">
          {saveStatus === "error" ? "Save failed" : saveStatus === "saving" ? "Saving changes…" : saveStatus === "dirty" ? "Unsaved changes" : "Draft saved"}
        </p></div>
      </div>

      <div className="grid grid-cols-4 border-b border-gray-200" role="tablist" aria-label="Editor panels">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-14 flex-col items-center justify-center gap-1 border-b-2 px-1 text-[11px] font-medium transition-colors ${activeTab === tab.id ? "border-ft-primary text-ft-primary" : "border-transparent text-ft-body hover:text-ft-ink"}`}
            >
              <Icon aria-hidden="true" size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-4" role="tabpanel">
        {activeTab === "content" ? <ContentEditor /> : null}
        {activeTab === "theme" ? <ThemeEditor /> : null}
        {activeTab === "assets" ? <AssetManager /> : null}
        {activeTab === "versions" ? <VersionPanel /> : null}
      </div>

      <div className="border-t border-gray-200 p-4">
        {publishMessage ? (
          <div role="status" className={`mb-3 rounded-lg p-3 text-sm ${publishMessage.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-700"}`}>
            {publishMessage.text}
          </div>
        ) : null}
        <button
          type="button"
          disabled={isPublishing || !projectId}
          onClick={async () => {
            if (!projectId) return;
            setIsPublishing(true);
            setPublishMessage(null);
            if (!(await saveNow())) {
              setPublishMessage({ type: "error", text: "Fix the save error before publishing." });
              setIsPublishing(false);
              return;
            }
            try {
              const response = await fetch(`/api/projects/${projectId}/publish`, { method: "POST" });
              const payload = (await response.json()) as { url?: string; error?: string };
              if (!response.ok || !payload.url) throw new Error(payload.error ?? "Publishing failed.");
              setPublishMessage({ type: "success", text: `Published successfully: ${payload.url}` });
            } catch (error) {
              setPublishMessage({ type: "error", text: error instanceof Error ? error.message : "Publishing failed." });
            } finally {
              setIsPublishing(false);
            }
          }}
          className="min-h-11 w-full rounded-lg bg-ft-primary px-4 py-2 font-bold text-white transition-colors hover:bg-ft-primary-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPublishing ? "Publishing…" : "Publish site"}
        </button>
      </div>
    </div>
  );
}
