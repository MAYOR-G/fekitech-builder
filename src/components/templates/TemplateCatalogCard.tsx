"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { TemplateConfig } from "@/registry";
import { getTemplateMinimumPlan, PLANS } from "@/lib/plans";
import { TemplateImage } from "./TemplateImage";

type TemplateCatalogCardProps = {
  template: TemplateConfig;
  creating: boolean;
  onStart: () => Promise<void>;
};

export function TemplateCatalogCard({
  template,
  creating,
  onStart,
}: TemplateCatalogCardProps) {
  const images =
    template.previewImages && template.previewImages.length > 0
      ? template.previewImages
      : [template.image];
  const minimumPlan = getTemplateMinimumPlan(template.id);
  const [activeImage, setActiveImage] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const showPrevious = () => {
    setActiveImage((current) => (current - 1 + images.length) % images.length);
    setMobileOpen(true);
  };

  const showNext = () => {
    setActiveImage((current) => (current + 1) % images.length);
    setMobileOpen(true);
  };

  return (
    <article className="group relative flex flex-col gap-4">
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-ft-surface-cool shadow-[0_8px_22px_rgba(22,31,72,0.08)] transition duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] md:group-hover:-translate-y-1 md:group-hover:shadow-[0_14px_28px_rgba(22,31,72,0.13)]"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${template.name} screenshots`}
      >
        <TemplateImage
          key={images[activeImage]}
          src={images[activeImage]}
          alt={`${template.name} screenshot ${activeImage + 1} of ${images.length}`}
          width={1440}
          height={1000}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />

        <button
          type="button"
          className="absolute inset-0 z-10 md:hidden"
          aria-expanded={mobileOpen}
          aria-label={`${mobileOpen ? "Hide" : "Show"} actions for ${template.name}`}
          onClick={() => setMobileOpen((open) => !open)}
        />

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-3 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/94 text-ft-ink shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/30"
              aria-label={`Previous ${template.name} screenshot`}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 top-1/2 z-30 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/94 text-ft-ink shadow-md transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/30"
              aria-label={`Next ${template.name} screenshot`}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="absolute inset-x-0 top-3 z-30 flex justify-center" aria-label="Choose screenshot">
              <div className="flex rounded-full bg-ft-ink/64 px-2 py-1.5">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => {
                      setActiveImage(index);
                      setMobileOpen(true);
                    }}
                    className="grid h-7 w-7 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label={`Show screenshot ${index + 1}`}
                    aria-current={activeImage === index ? "true" : undefined}
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all ${
                        activeImage === index ? "w-4 bg-white" : "w-1.5 bg-white/55"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div
          className={`absolute inset-0 z-20 bg-ft-ink/12 transition-opacity duration-200 ${
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          } md:pointer-events-none md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100`}
        />

        <div
          className={`absolute bottom-3 left-3 right-3 z-40 flex flex-col gap-2 rounded-xl bg-white p-3 shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] sm:flex-row ${
            mobileOpen ? "translate-y-0" : "translate-y-[calc(100%+1rem)]"
          } md:translate-y-[calc(100%+1rem)] md:group-hover:translate-y-0 md:group-focus-within:translate-y-0`}
        >
          <Link
            href={`/preview/${template.id}`}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-ft-border bg-white px-3 text-sm font-semibold text-ft-ink transition hover:border-ft-primary hover:text-ft-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/20"
          >
            Preview
          </Link>
          <button
            type="button"
            disabled={creating}
            onClick={onStart}
            className="min-h-11 flex-1 rounded-lg bg-ft-primary px-3 text-sm font-semibold text-white transition hover:bg-ft-primary-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/25 disabled:cursor-wait disabled:opacity-50"
          >
            {creating ? "Creating…" : "Use template"}
          </button>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-1">
        <div>
          <h2 className="text-base font-semibold text-ft-ink">{template.name}</h2>
          <p className="mt-1 text-xs text-ft-body">
            {minimumPlan === "free" ? "Free to customize" : `${PLANS[minimumPlan].name} plan`}
          </p>
        </div>
        {images.length > 1 ? (
          <p className="font-mono text-xs tabular-nums text-ft-body" aria-live="polite">
            {activeImage + 1}/{images.length}
          </p>
        ) : null}
      </div>
    </article>
  );
}
