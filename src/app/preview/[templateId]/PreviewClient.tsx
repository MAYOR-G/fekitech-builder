"use client";
import React from "react";
import { useRouter } from "next/navigation";

export function PreviewBar({ templateId, templateName }: { templateId: string; templateName: string }) {
  const router = useRouter();
  
  const handleUseTemplate = async () => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId })
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/editor/${data.project.id}`);
      } else if (res.status === 401) {
        window.location.href = `/login?redirect=/templates`;
      } else {
        alert("Failed to create project");
      }
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between bg-ft-ink px-6 text-white shadow-md">
      <div className="flex items-center gap-4">
        <a href="/templates" className="text-sm font-semibold hover:text-white/80 transition">
          ← Back to Templates
        </a>
        <span className="text-sm text-white/40">|</span>
        <span className="text-sm font-medium">Previewing: <span className="opacity-70">{templateName}</span></span>
      </div>
      <div>
        <button 
          onClick={handleUseTemplate}
          className="rounded-full bg-ft-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-ft-primary/90"
        >
          Use this template
        </button>
      </div>
    </div>
  );
}
