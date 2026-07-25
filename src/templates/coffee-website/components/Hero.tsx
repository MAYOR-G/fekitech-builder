"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { useTemplateData } from "../TemplateContext";

export default function Hero() {
  const { hero, visit } = useTemplateData();
  const featuredSlide = hero.slides[0];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <TemplateImage
          src={featuredSlide.image}
          alt={featuredSlide.imageAlt ?? "Hero background"}
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 xl:px-20">
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center text-white"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-7 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-coffee-terracotta">
            <span className="h-px w-10 bg-coffee-terracotta/60" />
            {hero.eyebrow}
            <span className="h-px w-10 bg-coffee-terracotta/60" />
          </p>
          <h1 className="font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {featuredSlide.headline}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/90 sm:text-lg">
            {featuredSlide.subtext}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={hero.primaryHref}
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-coffee-terracotta px-8 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:bg-coffee-brown"
            >
              {hero.primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondaryHref}
              className="inline-flex min-h-12 items-center justify-center border border-white/30 px-8 text-sm font-bold uppercase tracking-[0.1em] transition hover:border-white hover:bg-white/10"
            >
              {hero.secondaryLabel}
            </a>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-coffee-terracotta" aria-hidden="true" />
              Northern Quarter, Manchester
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-coffee-terracotta" aria-hidden="true" />
              {visit.hours[0].time}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
