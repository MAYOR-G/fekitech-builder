"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { TemplateCatalogCard } from "@/components/templates/TemplateCatalogCard";
import { getAllTemplates } from "@/registry";

const templates = getAllTemplates();

const ITEMS_PER_PAGE = 27;

export default function TemplatesPage() {
  const urlParams = useSearchParams();
  const initialPage = Number(urlParams.get("page"));
  const [search, setSearch] = useState(urlParams.get("q") ?? "");
  const [message, setMessage] = useState("");
  const [creatingId, setCreatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(Number.isInteger(initialPage) && initialPage > 0 ? initialPage : 1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter((template) => {
      const nameMatch = template.name.toLowerCase().includes(q);
      const categoryMatch = template.category ? template.category.toLowerCase().includes(q) : false;
      const idMatch = template.id.toLowerCase().includes(q);
      return nameMatch || categoryMatch || idMatch;
    });
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const safeCurrentPage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedTemplates = filtered.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );
  const returnPath = `/templates?page=${safeCurrentPage}${search.trim() ? `&q=${encodeURIComponent(search.trim())}` : ""}`;

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const nextPath = `/templates?page=${safeCurrentPage}${search.trim() ? `&q=${encodeURIComponent(search.trim())}` : ""}`;
    if (window.location.pathname + window.location.search !== nextPath) {
      window.history.replaceState(null, "", nextPath);
    }
  }, [safeCurrentPage, search]);

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
          <input id="template-search" value={search} onChange={(event) => { setSearch(event.target.value); setCurrentPage(1); }} placeholder="Search templates" className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ft-body" />
        </div>

        {message ? <p role="status" className="mb-6 rounded-lg bg-ft-surface-alt p-3 text-sm text-ft-body">{message}</p> : null}
        
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-ft-border p-8 text-center">
            <h2 className="font-semibold">No matching templates</h2>
            <p className="mt-2 text-sm text-ft-body">Try a broader search term.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedTemplates.map((template) => {
                return (
                  <TemplateCatalogCard
                    key={template.id}
                    template={template}
                    creating={creatingId === template.id}
                    previewHref={`/preview/${template.id}?from=${encodeURIComponent(returnPath)}`}
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
                                window.location.assign(`/login?redirect=${encodeURIComponent(`/dashboard/create?templateId=${template.id}`)}`);
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
            
            {/* Pagination Controls */}
            <div className="mt-16 flex items-center justify-between border-t border-ft-border pt-6">
              <div className="text-sm text-ft-body">
                Showing <span className="font-semibold text-ft-ink">{(safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-semibold text-ft-ink">{Math.min(safeCurrentPage * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="font-semibold text-ft-ink">{filtered.length}</span> templates
              </div>
              
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => goToPage(Math.max(1, safeCurrentPage - 1))}
                    disabled={safeCurrentPage === 1}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-ft-border px-4 text-sm font-medium transition-colors hover:bg-ft-surface-alt disabled:pointer-events-none disabled:opacity-50"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  {/* Page numbers */}
                  <div className="hidden md:flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i + 1)}
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          safeCurrentPage === i + 1
                            ? "bg-ft-primary text-white"
                            : "hover:bg-ft-surface-alt text-ft-ink"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => goToPage(Math.min(totalPages, safeCurrentPage + 1))}
                    disabled={safeCurrentPage === totalPages}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-ft-border px-4 text-sm font-medium transition-colors hover:bg-ft-surface-alt disabled:pointer-events-none disabled:opacity-50"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
