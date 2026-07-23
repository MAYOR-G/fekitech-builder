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
      className="relative isolate overflow-hidden bg-coffee-light pt-24 text-coffee-dark"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-coffee-terracotta/10 blur-3xl" />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1500px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:gap-16 lg:px-12 lg:py-20 xl:px-20">
        <motion.div
          className="relative z-10 max-w-2xl"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-7 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.26em] text-coffee-terracotta">
            <span className="h-px w-10 bg-coffee-terracotta/60" />
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[9ch] font-serif text-5xl font-bold leading-[0.96] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {featuredSlide.headline}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-coffee-dark/72 sm:text-lg sm:leading-8">
            {featuredSlide.subtext}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primaryHref}
              className="group inline-flex min-h-12 items-center justify-center gap-2 bg-coffee-dark px-7 text-sm font-bold uppercase tracking-[0.1em] text-coffee-light transition hover:bg-coffee-brown"
            >
              {hero.primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={hero.secondaryHref}
              className="inline-flex min-h-12 items-center justify-center border border-coffee-dark/25 px-7 text-sm font-bold uppercase tracking-[0.1em] transition hover:border-coffee-dark hover:bg-white/55"
            >
              {hero.secondaryLabel}
            </a>
          </div>

          <div className="mt-11 grid gap-4 border-t border-coffee-brown/15 pt-6 text-sm text-coffee-dark/72 sm:grid-cols-2">
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

        <motion.div
          className="relative min-h-[500px] sm:min-h-[620px] lg:min-h-[700px]"
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-x-0 bottom-0 top-8 bg-coffee-brown" />
          <TemplateImage
            src={featuredSlide.image}
            alt={featuredSlide.imageAlt ?? "Barista preparing speciality coffee"}
            className="absolute bottom-8 left-5 right-0 top-0 h-[calc(100%-2rem)] w-[calc(100%-1.25rem)] object-cover object-center shadow-[0_24px_70px_rgba(46,34,25,0.18)] sm:left-8 sm:w-[calc(100%-2rem)]"
            loading="eager"
          />
          <div className="absolute bottom-0 left-0 bg-coffee-terracotta px-5 py-4 text-coffee-light shadow-[0_16px_40px_rgba(46,34,25,0.18)] sm:px-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em]">
              {hero.note}
            </p>
            <p className="mt-1 font-serif text-xl font-bold">Roasted weekly. Poured daily.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
