"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getAllTemplates } from "@/registry";
import { TemplateImage } from "@/components/templates/TemplateImage";

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const featuredTemplateIds = [
  "burger-dark-premium",
  "pizza-light-clean",
  "cake-bakery-premium",
  "pastries-snacks-premium",
  "gym-website",
  "premium-coffee-website",
  "plumbing-company-premium",
  "second-furniture-website",
] as const;

export default function TemplatesShowcase() {
  const [creatingId, setCreatingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const templates = useMemo(() => {
    const templateCatalog = getAllTemplates();

    return featuredTemplateIds.flatMap((templateId) => {
      const template = templateCatalog.find((item) => item.id === templateId);
      return template ? [template] : [];
    });
  }, []);

  const createFromTemplate = async (templateId: string) => {
    setCreatingId(templateId);
    setMessage("");
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId }),
      });
      const payload = (await response.json()) as {
        project?: { id: string };
        error?: string;
      };

      if (response.status === 401) {
        window.location.assign(`/login?redirect=${encodeURIComponent("/")}`);
        return;
      }
      if (!response.ok || !payload.project) {
        throw new Error(payload.error ?? "Unable to create the project.");
      }
      window.location.assign(`/editor/${payload.project.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create the project.");
    } finally {
      setCreatingId(null);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-ft-ink sm:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ft-border" />

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="mx-auto mb-12 flex max-w-[1280px] flex-col justify-between gap-7 md:mb-14 md:flex-row md:items-end">
          <div className="max-w-[800px]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="mb-5 text-balance text-[clamp(38px,5vw,64px)] font-[800] leading-[1.02] tracking-[-0.035em] text-ft-ink"
            >
              It all starts with a professional design
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="max-w-[660px] text-lg leading-relaxed text-ft-body"
            >
              Choose a proven starting point, preview the complete site, and customize it for your business.
            </motion.p>
          </div>
          <Link
            href="/templates"
            className="inline-flex min-h-12 flex-shrink-0 items-center justify-center rounded-full border border-ft-border px-7 text-sm font-semibold text-ft-ink transition hover:border-ft-primary hover:text-ft-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/20"
          >
            Browse all templates
          </Link>
        </div>

        <div className="-mx-4 px-4 sm:-mx-6 sm:px-6 pb-12 pt-4">
          <div
            aria-label="Featured website templates"
            className="grid grid-cols-1 gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4"
          >
            {templates.map((template, index) => (
              <motion.article
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease }}
                className="group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-ft-surface-cool shadow-[0_8px_20px_rgba(22,31,72,0.08)]">
                  <TemplateImage
                    src={template.image}
                    alt={`${template.name} template preview`}
                    width={1440}
                    height={1000}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                    className="h-full w-full object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.025]"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-3 bottom-3 flex gap-2 rounded-lg bg-white p-2 shadow-md md:translate-y-[calc(100%+1rem)] md:transition-transform md:duration-300 md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
                    <Link
                      href={`/preview/${template.id}`}
                      className="inline-flex min-h-10 flex-1 items-center justify-center rounded-md border border-ft-border px-2 text-xs font-semibold text-ft-ink transition hover:border-ft-primary hover:text-ft-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/20"
                    >
                      Preview
                    </Link>
                    <button
                      type="button"
                      onClick={() => void createFromTemplate(template.id)}
                      disabled={creatingId === template.id}
                      className="min-h-10 flex-1 rounded-md bg-ft-primary px-2 text-xs font-semibold text-white transition hover:bg-ft-primary-deep focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ft-primary/25 disabled:cursor-wait disabled:opacity-50"
                    >
                      {creatingId === template.id ? "Creating…" : "Use template"}
                    </button>
                  </div>
                </div>
                <h3 className="mt-3 px-1 text-sm font-semibold text-ft-ink">{template.name}</h3>
              </motion.article>
            ))}
          </div>
        </div>
        {message ? (
          <p role="status" className="mt-6 text-center text-sm font-medium text-ft-body">
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
