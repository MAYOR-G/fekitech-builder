"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo } from "react";
import { getAllTemplates } from "@/registry";
import { TemplateImage } from "@/components/templates/TemplateImage";

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const featuredTemplateIds = [
  "gym-website",
  "barber-website",
  "premium-coffee-website",
  "second-furniture-website",
] as const;

export default function TemplatesShowcase() {
  const templates = useMemo(() => {
    const templateCatalog = getAllTemplates();

    return featuredTemplateIds.flatMap((templateId) => {
      const template = templateCatalog.find((item) => item.id === templateId);

      return template
        ? [
            {
              id: template.id,
              name: template.name,
              image: template.image,
            },
          ]
        : [];
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-ft-primary px-4 py-24 text-white sm:px-6 md:py-28">
      <div className="absolute inset-0 opacity-[0.11] texture-wash" />
      <div className="absolute -left-24 top-16 h-56 w-96 rounded-[999px] bg-white/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1880px]">
        <div className="mx-auto mb-14 flex max-w-[1280px] flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-[800px]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="text-[clamp(38px,5vw,64px)] font-[800] leading-[1.05] tracking-[-0.01em] text-white mb-6 text-balance"
            >
              Or start with a professionally designed template
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="text-xl text-white/80 leading-relaxed max-w-[660px]"
            >
              Browse {getAllTemplates().length} available starting points, preview each design, and check its plan before creating a project.
            </motion.p>
          </div>
          <Link href="/templates" className="btn-ghost flex-shrink-0 whitespace-nowrap text-base px-8 py-3.5">
            Get started
          </Link>
        </div>

        {/* Template Cards */}
        <div
          aria-label="Featured website templates"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {templates.map((tpl, i) => (
            <Link
              key={tpl.id}
              href={`/preview/${tpl.id}`}
              className="group relative block min-w-0 cursor-pointer overflow-hidden rounded-[24px] bg-white shadow-lg transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className="w-full h-full"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ft-surface-cool">
                  <TemplateImage src={tpl.image} alt={`${tpl.name} template preview`} width={900} height={1200} sizes="(max-width: 639px) 84vw, (max-width: 1023px) 48vw, 25vw" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]" loading="lazy" />
                  <div className="absolute inset-0 bg-ft-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-ft-ink shadow-[0_14px_34px_rgba(17,24,39,0.18)] hover:scale-105 transition-transform duration-300">
                      Preview
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Link */}
        <div className="mt-14 text-center">
          <Link
            href="/templates"
            className="text-white/78 font-semibold hover:text-white transition-colors inline-flex items-center gap-2 group/link"
          >
            Browse all templates{" "}
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
