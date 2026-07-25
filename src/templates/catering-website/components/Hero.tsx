"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { Check, Sparkles } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <TemplateImage
          src={hero.image}
          alt={hero.imageAlt}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 py-24 sm:px-8 lg:px-12 xl:px-20">
        <div className="mx-auto flex max-w-3xl animate-rise flex-col items-center text-center">
          <p className="mb-7 inline-flex items-center gap-2 text-[0.8rem] font-black uppercase tracking-[0.26em] text-white">
            <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {hero.title}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/90 sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <ButtonLink
              href={hero.primaryHref}
              className="flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-white px-8 text-[0.85rem] font-bold uppercase tracking-[0.1em] text-olive hover:bg-gold hover:text-white transition-colors"
            >
              {hero.primaryLabel}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryHref}
              variant="secondary"
              className="flex min-h-[3.5rem] items-center justify-center rounded-full border-white text-white px-8 text-[0.85rem] font-bold uppercase tracking-[0.1em] hover:bg-white/10"
            >
              {hero.secondaryLabel}
            </ButtonLink>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-white/20 pt-8 text-sm font-bold text-white/90">
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gold" aria-hidden="true" />
              Bespoke menus
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-gold" aria-hidden="true" />
              London &amp; South East
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
