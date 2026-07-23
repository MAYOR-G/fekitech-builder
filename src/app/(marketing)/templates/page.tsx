"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { TemplateCatalogCard } from "@/components/templates/TemplateCatalogCard";
import { getAllTemplates } from "@/registry";

const templates = getAllTemplates();



export default function TemplatesPage() {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [creatingId, setCreatingId] = useState<string | null>(null);
  const filtered = useMemo(
    () => templates.filter((template) => template.name.toLowerCase().includes(search.trim().toLowerCase())),
    [search],
  );

  return (
    <div className="min-h-screen bg-white text-ft-ink">
      <header className="border-b border-ft-border bg-white/90 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between text-sm">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 font-semibold text-ft-body hover:text-ft-primary">
            <ArrowLeft aria-hidden="true" size={16} /> Back
          </Link>
          <span className="flex items-center gap-2 font-bold"><LogoMark className="!h-8 !w-8" /> FekiTech Builder</span>
          <span className="w-14" />
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-5 pb-24 pt-12 sm:pt-16">
        <div className="mb-8">
          <h1 className="text-balance text-4xl font-[720] leading-[1.02] tracking-[-0.04em] sm:text-5xl">Choose a starting point for your website</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-ft-body">Browse complete designs, open a full preview, and customize any template included with your plan.</p>
        </div>

        <div className="mb-10 flex min-h-12 items-center rounded-xl border border-ft-border bg-white px-4 shadow-[0_8px_24px_rgba(22,31,72,0.05)] transition-shadow focus-within:border-ft-primary focus-within:shadow-[0_0_0_4px_rgba(0,185,235,0.12)]">
          <Search aria-hidden="true" className="mr-3 shrink-0 text-ft-body" size={17} />
          <label htmlFor="template-search" className="sr-only">Search templates</label>
          <input id="template-search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search templates" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ft-body" />
        </div>

        {message ? <p role="status" className="mb-6 rounded-lg bg-ft-surface-alt p-3 text-sm text-ft-body">{message}</p> : null}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-ft-border p-8 text-center">
            <h2 className="font-semibold">No matching templates</h2>
            <p className="mt-2 text-sm text-ft-body">Try a broader search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((template) => {
              return (
                <TemplateCatalogCard
                  key={template.id}
                  template={template}
                  creating={creatingId === template.id}
                  onStart={async () => {
                          setCreatingId(template.id);
                          setMessage("");
                          try {
                            const response = await fetch("/api/projects", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ templateId: template.id }),
                            });
                            const payload = (await response.json()) as { project?: { id: string }; error?: string };
                            if (response.status === 401) {
                              window.location.assign(`/login?redirect=${encodeURIComponent("/templates")}`);
                              return;
                            }
                            if (!response.ok || !payload.project) throw new Error(payload.error ?? "Unable to create the project.");
                            window.location.assign(`/editor/${payload.project.id}`);
                          } catch (error) {
                            setMessage(error instanceof Error ? error.message : "Unable to create the project.");
                          } finally {
                            setCreatingId(null);
                          }
                  }}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
