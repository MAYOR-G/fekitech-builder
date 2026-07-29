"use client";

import { Copy, Home, Plus, Trash2, X } from "lucide-react";
import { useMemo } from "react";
import { isEditorObject, useVisualEditorStore, type EditorObject } from "@/store/visualEditorStore";

type PageItem = {
  id: string;
  title: string;
  navLabel: string;
  slug: string;
  hidden?: boolean;
  home?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

const DEFAULT_HOME: PageItem = {
  id: "home",
  title: "Home",
  navLabel: "Home",
  slug: "",
  home: true,
  hidden: false,
  seoTitle: "",
  seoDescription: "",
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function readPages(data: EditorObject): PageItem[] {
  const editor = data._editor;
  if (!isEditorObject(editor) || !isEditorObject(editor.pages) || !Array.isArray(editor.pages.items)) return [DEFAULT_HOME];
  const pages = editor.pages.items.filter(isEditorObject).map((page) => ({
    id: typeof page.id === "string" ? page.id : crypto.randomUUID(),
    title: typeof page.title === "string" ? page.title : "Untitled",
    navLabel: typeof page.navLabel === "string" ? page.navLabel : "Untitled",
    slug: typeof page.slug === "string" ? page.slug : "",
    hidden: page.hidden === true,
    home: page.home === true,
    seoTitle: typeof page.seoTitle === "string" ? page.seoTitle : "",
    seoDescription: typeof page.seoDescription === "string" ? page.seoDescription : "",
  }));
  return pages.length ? pages : [DEFAULT_HOME];
}

export default function PagesPanel({ onClose }: { onClose: () => void }) {
  const data = useVisualEditorStore((s) => s.data);
  const updatePath = useVisualEditorStore((s) => s.updatePath);
  const pages = useMemo(() => readPages(data), [data]);

  function writePages(next: PageItem[], label: string) {
    const normalized = next.map((page, index) => ({
      id: page.id,
      title: page.title,
      navLabel: page.navLabel,
      slug: page.slug,
      hidden: page.hidden === true,
      home: index === 0 || page.home === true,
      seoTitle: page.seoTitle ?? "",
      seoDescription: page.seoDescription ?? "",
    }));
    updatePath("_editor.pages.items", normalized, label);
  }

  function updatePage(index: number, patch: Partial<PageItem>) {
    const next = pages.map((page, pageIndex) => {
      if (pageIndex !== index) return page;
      const patched = { ...page, ...patch };
      if (patch.title && !patch.navLabel) patched.navLabel = patch.title;
      return patched;
    });
    writePages(next, `Update page: ${pages[index]?.title ?? "page"}`);
  }

  function addPage() {
    const base = "New Page";
    const slug = slugify(base);
    writePages([...pages, { id: crypto.randomUUID(), title: base, navLabel: base, slug, hidden: false }], "Add page");
  }

  function duplicatePage(index: number) {
    const source = pages[index];
    if (!source) return;
    const slug = slugify(`${source.slug || source.title}-copy`);
    writePages([...pages.slice(0, index + 1), { ...source, id: crypto.randomUUID(), title: `${source.title} copy`, navLabel: `${source.navLabel} copy`, slug, home: false }, ...pages.slice(index + 1)], "Duplicate page");
  }

  function deletePage(index: number) {
    if (index === 0 || pages.length <= 1) return;
    if (!window.confirm(`Delete "${pages[index].title}"?`)) return;
    writePages(pages.filter((_, pageIndex) => pageIndex !== index), "Delete page");
  }

  function setHome(index: number) {
    const target = pages[index];
    if (!target) return;
    writePages([target, ...pages.filter((_, pageIndex) => pageIndex !== index)].map((page, pageIndex) => ({ ...page, home: pageIndex === 0, slug: pageIndex === 0 ? "" : slugify(page.slug || page.title) })), "Set homepage");
  }

  return (
    <div className="ve-panel">
      <div className="ve-panel__header">
        <h2 className="ve-panel__title">Pages</h2>
        <button type="button" onClick={onClose} className="ve-toolbar__btn" aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <div className="ve-panel__body space-y-4">
        <button type="button" onClick={addPage} className="ve-panel__primary-action">
          <Plus size={14} /> Add page
        </button>
        {pages.map((page, index) => (
          <div key={page.id} className="ve-page-card">
            <div className="flex items-center justify-between gap-2">
              <strong className="text-sm text-[#E8E8F0]">{page.home ? "Homepage" : `Page ${index + 1}`}</strong>
              <div className="flex gap-1">
                {index > 0 ? <button type="button" onClick={() => setHome(index)} className="ve-floating-toolbar__btn" aria-label="Set homepage"><Home size={13} /></button> : null}
                <button type="button" onClick={() => duplicatePage(index)} className="ve-floating-toolbar__btn" aria-label="Duplicate page"><Copy size={13} /></button>
                {index > 0 ? <button type="button" onClick={() => deletePage(index)} className="ve-floating-toolbar__btn ve-floating-toolbar__btn--danger" aria-label="Delete page"><Trash2 size={13} /></button> : null}
              </div>
            </div>
            <label className="ve-field-label">Title<input value={page.title} onChange={(event) => updatePage(index, { title: event.target.value.slice(0, 80) })} /></label>
            <label className="ve-field-label">Navigation<input value={page.navLabel} onChange={(event) => updatePage(index, { navLabel: event.target.value.slice(0, 40) })} /></label>
            <label className="ve-field-label">Slug<input value={page.slug} disabled={index === 0} onChange={(event) => updatePage(index, { slug: slugify(event.target.value) })} /></label>
            <label className="ve-field-label">SEO title<input value={page.seoTitle ?? ""} onChange={(event) => updatePage(index, { seoTitle: event.target.value.slice(0, 70) })} /></label>
            <label className="ve-field-label">SEO description<textarea value={page.seoDescription ?? ""} onChange={(event) => updatePage(index, { seoDescription: event.target.value.slice(0, 160) })} /></label>
            <label className="ve-check-row"><input type="checkbox" checked={page.hidden === true} disabled={index === 0} onChange={(event) => updatePage(index, { hidden: event.target.checked })} /> Hide from navigation</label>
          </div>
        ))}
      </div>
    </div>
  );
}
