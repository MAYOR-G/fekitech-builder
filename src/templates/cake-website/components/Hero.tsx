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
      className="relative isolate overflow-hidden bg-[#fffaf6] pt-24 lg:min-h-[min(920px,100svh)] lg:pt-0"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-[#edd7d0]/45 blur-3xl" />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1500px] items-stretch lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative z-10 flex items-center px-5 py-14 sm:px-8 lg:px-12 lg:py-32 xl:px-20">
          <div className="max-w-2xl animate-rise">
            <p className="mb-7 flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.26em] text-rose">
              <span className="h-px w-10 bg-rose/55" />
              {hero.eyebrow}
            </p>

            <h1 className="max-w-[10ch] font-display text-5xl font-semibold leading-[0.96] tracking-[-0.035em] text-ganache sm:text-6xl lg:text-7xl xl:text-[5.6rem]">
              {hero.title}
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-chocolate/76 sm:text-lg sm:leading-8">
              {hero.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={hero.primaryHref}
                className="group flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-bold uppercase tracking-[0.1em]"
              >
                {hero.primaryLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={hero.secondaryHref}
                variant="secondary"
                className="min-h-12 px-7 text-sm font-bold uppercase tracking-[0.1em]"
              >
                {hero.secondaryLabel}
              </ButtonLink>
            </div>

            <div className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-chocolate/12 pt-6 text-xs font-bold uppercase tracking-[0.13em] text-chocolate/68">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rose" aria-hidden="true" />
                Bristol &amp; the South West
              </span>
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-champagne text-champagne" aria-hidden="true" />
                Made to order
              </span>
            </div>
          </div>
        </div>

        <div className="relative min-h-[520px] overflow-hidden sm:min-h-[640px] lg:min-h-full">
          <TemplateImage
            src={hero.image}
            alt={hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(51,23,26,0.18)_100%)]" />
          <div className="absolute bottom-6 left-5 right-5 border border-white/55 bg-white/88 px-5 py-4 shadow-[0_18px_50px_rgba(65,35,31,0.14)] backdrop-blur sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs">
            <p className="text-[0.65rem] font-black uppercase tracking-[0.22em] text-rose">
              {hero.note}
            </p>
            <p className="mt-2 font-display text-xl font-semibold leading-snug text-ganache">
              Designed with care. Finished by hand.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
