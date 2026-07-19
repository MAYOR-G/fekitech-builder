"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { readTemplateTextGroup } from "@/lib/template-data";
import { Sparkles } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { brand } = useTemplateData();

  const content = useTemplateData();
  const hero = readTemplateTextGroup(content, "hero", { subtitle: brand.description });
  return (
    <section
      id="top"
      className="relative flex min-h-[80vh] w-full items-end overflow-hidden bg-charcoal text-cream lg:min-h-screen"
    >
      <TemplateImage
        src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2200&q=90"
        alt="Professional kitchen with marble prep stations and chefs plating dishes"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,20,20,0.6),transparent_60%)]" />
      <div className="absolute inset-0 bg-charcoal/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-36 lg:px-8 lg:pb-24">
        <div className="max-w-4xl animate-rise">
          <p className="mb-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-gold">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Fine catering studio
          </p>

          <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-[-0.015em] text-cream sm:text-7xl lg:text-[6.8rem]">
            {hero.title}
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-[1.75] text-cream/90 sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href="#contact" variant="gold" className="px-8">
              {hero.button}
            </ButtonLink>
            <ButtonLink
              href="#services"
              variant="light"
              className="border-cream/55 bg-transparent px-8 text-cream hover:border-gold hover:bg-white/10"
            >
              Explore Services
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
