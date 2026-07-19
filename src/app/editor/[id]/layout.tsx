import { ReactNode } from "react";
import EditorHeader from "@/components/editor/EditorHeader";

export default function EditorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-ft-gray-soft">
      <EditorHeader />
      {/* Main Editor Area */}
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
