"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { Check, Sparkles } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section id="top" className="relative overflow-hidden bg-[#fbfaf6] pt-24">
      <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1500px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16 lg:px-12 lg:py-20 xl:px-20">
        <div className="relative z-10 max-w-2xl animate-rise">
          <p className="mb-7 inline-flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[0.26em] text-olive">
            <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[10ch] font-display text-5xl font-medium leading-[0.96] tracking-[-0.035em] text-charcoal sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-ink/76 sm:text-lg sm:leading-8">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={hero.primaryHref} className="min-h-12 px-7">
              {hero.primaryLabel}
            </ButtonLink>
            <ButtonLink href={hero.secondaryHref} variant="secondary" className="min-h-12 px-7">
              {hero.secondaryLabel}
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-3 border-t border-oat pt-6 text-sm font-bold text-ink/72 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-olive" aria-hidden="true" />
              Bespoke menus
            </p>
            <p className="flex items-center gap-2">
              <Check className="h-4 w-4 text-olive" aria-hidden="true" />
              London &amp; South East
            </p>
          </div>
        </div>

        <div className="relative min-h-[500px] animate-rise sm:min-h-[620px] lg:min-h-[700px]">
          <div className="absolute inset-x-5 bottom-0 top-7 bg-olive sm:left-12 sm:right-0" />
          <TemplateImage
            src={hero.image}
            alt={hero.imageAlt}
            className="absolute bottom-7 left-0 right-5 top-0 h-[calc(100%-1.75rem)] w-[calc(100%-1.25rem)] object-cover object-center shadow-[0_24px_70px_rgba(30,36,27,0.16)] sm:right-12 sm:w-[calc(100%-3rem)]"
            loading="eager"
          />
          <div className="absolute bottom-0 right-0 max-w-[18rem] border-l-4 border-gold bg-white px-5 py-4 shadow-[0_18px_50px_rgba(30,36,27,0.14)]">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-olive">
              {hero.note}
            </p>
            <p className="mt-2 font-display text-xl font-semibold leading-snug text-charcoal">
              Beautifully planned. Impeccably served.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
