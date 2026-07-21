"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export function PreviewBar({ templateId, templateName }: { templateId: string; templateName: string }) {
  const router = useRouter();
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
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
    <div className="flex h-screen flex-col bg-ft-ink font-sans">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between bg-ft-ink px-4 md:px-6 text-white border-b border-white/10">
        <div className="flex flex-1 items-center gap-4">
          <a href="/templates" className="flex items-center gap-2 text-sm font-semibold hover:text-white/80 transition">
            <span>←</span> <span className="hidden sm:inline">Back to Templates</span>
          </a>
          <span className="hidden sm:inline text-sm text-white/40">|</span>
          <span className="hidden md:inline text-sm font-medium">Previewing: <span className="opacity-70">{templateName}</span></span>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2 bg-white/5 p-1 rounded-lg">
          <button onClick={() => setDevice("desktop")} className={`p-1.5 rounded-md transition ${device === 'desktop' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>
            <Monitor size={18} />
          </button>
          <button onClick={() => setDevice("tablet")} className={`p-1.5 rounded-md transition ${device === 'tablet' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>
            <Tablet size={18} />
          </button>
          <button onClick={() => setDevice("mobile")} className={`p-1.5 rounded-md transition ${device === 'mobile' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'}`}>
            <Smartphone size={18} />
          </button>
        </div>

        <div className="flex flex-1 justify-end">
          <button 
            onClick={handleUseTemplate}
            className="rounded-full bg-ft-primary px-4 py-1.5 text-sm font-bold text-white transition hover:bg-ft-primary/90"
          >
            Use this template
          </button>
        </div>
      </div>
      
      {/* Preview Container */}
      <div className={`flex-1 flex justify-center items-start overflow-hidden bg-ft-ink ${device === 'desktop' ? 'p-0' : 'p-0 sm:p-4 md:p-8'}`}>
        <div 
          className={`relative bg-white w-full h-full overflow-hidden transition-all duration-300 ease-in-out ${
            device === 'desktop' ? 'max-w-full rounded-none shadow-none' : 
            device === 'tablet' ? 'max-w-[768px] sm:aspect-[3/4] sm:h-auto sm:max-h-[1024px] rounded-2xl shadow-2xl ring-8 ring-white/10' : 
            'max-w-[375px] sm:aspect-[9/16] sm:h-auto sm:max-h-[812px] rounded-[2.5rem] shadow-2xl ring-8 ring-white/10'
          }`}
        >
           <iframe 
             src={`/preview/${templateId}?frame=1`} 
             className="w-full h-full border-none"
             title={`${templateName} Preview`}
           />
        </div>
      </div>
    </div>
  );
}
