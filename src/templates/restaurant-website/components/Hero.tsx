"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { Clock3, MapPin, Star } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section id="top" className="relative min-h-svh overflow-hidden bg-coal text-cream">
      <TemplateImage
        src={hero.image}
        alt={hero.imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,15,0.92)_0%,rgba(17,17,15,0.73)_42%,rgba(17,17,15,0.24)_78%,rgba(17,17,15,0.42)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,15,0.32)_0%,transparent_48%,rgba(17,17,15,0.88)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-32 pt-32 lg:px-8">
        <div className="max-w-3xl animate-heroIn">
          <p className="mb-6 flex items-center gap-3 text-[0.7rem] font-black uppercase tracking-[0.24em] text-ember">
            <span className="h-px w-10 bg-ember/70" />
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[10ch] font-display text-5xl font-semibold leading-[0.96] tracking-[-0.035em] text-cream sm:text-6xl md:text-7xl xl:text-[5.8rem]">
            {hero.title}
          </h1>
          <p className="mt-7 max-w-xl text-base font-medium leading-7 text-cream/78 sm:text-lg sm:leading-8">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={hero.primaryHref}>{hero.primaryLabel}</ButtonLink>
            <ButtonLink href={hero.secondaryHref} variant="outline">
              {hero.secondaryLabel}
            </ButtonLink>
          </div>
        </div>

        <div className="absolute bottom-0 left-5 right-5 grid gap-4 border-t border-cream/18 py-6 text-sm text-cream/76 sm:grid-cols-3 lg:left-8 lg:right-8">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-ember" aria-hidden="true" />
            12 Stonegate, York
          </p>
          <p className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-ember" aria-hidden="true" />
            Dinner Tuesday–Saturday
          </p>
          <p className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-ember text-ember" aria-hidden="true" />
            Sunday lunch 12–4pm
          </p>
        </div>
      </div>
    </section>
  );
}
