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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-artisan-coffee-coffee-dark pt-20 text-white"
    >
      <TemplateImage
        src={featuredSlide.image}
        alt={featuredSlide.imageAlt ?? "Bright coffee shop counter"}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(44,36,32,0.82)_0%,rgba(44,36,32,0.58)_44%,rgba(44,36,32,0.16)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-artisan-coffee-coffee-dark to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] items-center px-5 py-24 sm:px-8 lg:px-12 xl:px-20">
        <motion.div
          className="flex max-w-3xl flex-col items-start text-left text-white"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-7 flex items-center gap-3 rounded-full bg-artisan-coffee-coffee-light/14 px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-artisan-coffee-coffee-light backdrop-blur">
            <span className="h-px w-10 bg-artisan-coffee-coffee-terracotta" />
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[11ch] font-artisan-coffee-serif text-5xl font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-[5.9rem]">
            {featuredSlide.headline}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/84 sm:text-lg">
            {featuredSlide.subtext}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={hero.primaryHref}
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-artisan-coffee-coffee-terracotta px-8 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:bg-artisan-coffee-coffee-brown"
            >
              {hero.primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondaryHref}
              className="inline-flex min-h-12 items-center justify-center border border-white/32 bg-white/8 px-8 text-sm font-bold uppercase tracking-[0.1em] text-white transition hover:border-artisan-coffee-coffee-terracotta hover:bg-white/18"
            >
              {hero.secondaryLabel}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/22 pt-7 text-sm text-white/78">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-artisan-coffee-coffee-terracotta" aria-hidden="true" />
              Northern Quarter, Manchester
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-artisan-coffee-coffee-terracotta" aria-hidden="true" />
              {visit.hours[0].time}
            </p>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-6 right-6 z-10 hidden rounded-2xl bg-artisan-coffee-coffee-light px-5 py-4 text-sm font-bold text-artisan-coffee-coffee-dark shadow-sm lg:block">
        {hero.note}
      </div>
    </section>
  );
}
