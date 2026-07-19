"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";

import { motion } from "motion/react";
import Link from "next/link";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const features = [
  {
    label: "Easy visual editor",
    headline: "Start with a great design. Make it yours.",
    body: "Update the text, images, colors, and structured content provided by your template. No coding needed.",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop",
    bg: "bg-ft-sun/70",
  },
  {
    label: "Preview before publishing",
    headline: "See your site before it goes live",
    body: "Open a template, check the layout, and make changes before publishing.",
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
    bg: "bg-ft-sky",
  },
  {
    label: "Version history",
    headline: "Save important versions as you work",
    body: "Create a restore point before a major change and return to an earlier draft when your plan supports it.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    bg: "bg-ft-leaf/80",
  },
];

export default function Features() {
  return (
    <section className="py-28 bg-white px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-28">
        {features.map((feature, i) => {
          const isReversed = i % 2 !== 0;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
              className={`grid grid-cols-1 ${
                isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
              } lg:grid-cols-[0.78fr_1.22fr] items-center gap-12 lg:gap-20`}
            >
              {/* Text Side — 40% */}
              <div className={`w-full flex flex-col gap-5 ${isReversed ? "lg:order-2" : ""}`}>
                <span className="text-base font-bold text-ft-primary">
                  {feature.label}
                </span>
                <h3 className="text-[clamp(36px,4.5vw,56px)] font-[800] tracking-[-0.01em] text-ft-ink leading-[1.08] text-balance">
                  {feature.headline}
                </h3>
                <p className="text-ft-body text-lg leading-relaxed max-w-lg mt-2">
                  {feature.body}
                </p>
                <Link href="/signup" className="btn-gradient w-fit mt-4 text-base font-semibold !py-3.5 !px-8">
                  Start building
                </Link>
              </div>

              {/* Image Side — 60% */}
              <div className={`w-full relative ${isReversed ? "lg:order-1" : ""}`}>
                <div className={`rounded-[30px] ${feature.bg} p-5 md:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]`}>
                <div className="website-frame rounded-[22px]">
                  <div className="browser-bar">
                    <div className="browser-dot" />
                    <div className="browser-dot" />
                    <div className="browser-dot" />
                    <div className="ml-3 h-3 flex-1 rounded-full bg-ft-border-light" />
                  </div>
                  <TemplateImage
                    src={feature.img}
                    alt={feature.headline}
                    className="w-full aspect-[16/10] object-cover"
                    loading="lazy"
                  />
                </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
