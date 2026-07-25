"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0">
        <TemplateImage
          src={hero.image}
          alt={hero.imageAlt}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 xl:px-20">
        <div className="mx-auto flex max-w-3xl animate-rise flex-col items-center text-center">
          <p className="mb-7 flex items-center gap-3 text-[0.8rem] font-black uppercase tracking-[0.26em] text-white">
            <span className="h-px w-10 bg-white/60" />
            {hero.eyebrow}
            <span className="h-px w-10 bg-white/60" />
          </p>

          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
            {hero.title}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/90 sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href={hero.primaryHref}
              className="flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-white px-8 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-ganache hover:bg-rose hover:text-white transition-colors"
            >
              {hero.primaryLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryHref}
              variant="secondary"
              className="flex min-h-[3.5rem] items-center justify-center rounded-full border-white text-white px-8 text-[0.85rem] font-bold uppercase tracking-[0.1em] hover:bg-white/10"
            >
              {hero.secondaryLabel}
            </ButtonLink>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-8 text-xs font-bold uppercase tracking-[0.13em] text-white/80">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white" aria-hidden="true" />
              Bristol &amp; the South West
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-4 w-4 fill-white text-white" aria-hidden="true" />
              Made to order
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
