"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function EventInquiry() {
  const { brand } = useTemplateData();

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-cream lg:py-40">
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8 text-center">
        <p className="mb-6 inline-block text-xs font-black uppercase tracking-[0.28em] text-gold">
          Start Planning
        </p>
        <h2 className="mx-auto max-w-4xl font-display text-5xl font-medium leading-[1.04] text-cream sm:text-7xl">
          Let us craft the perfect menu for your next occasion.
        </h2>
        <p className="font-body mx-auto mt-8 max-w-2xl text-lg leading-[1.75] text-cream/80">
          We are currently accepting bookings for weddings, corporate galas, and private dining events for this season and beyond.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <ButtonLink 
            href="#contact" 
            variant="gold" 
            className="w-full px-10 py-5 text-lg shadow-2xl shadow-gold/20 sm:w-auto"
          >
            Inquire About Your Date
          </ButtonLink>
          <a href={`mailto:${brand.email}`} className="text-lg font-medium text-cream hover:text-gold transition-colors duration-300 underline underline-offset-8 decoration-gold/50 hover:decoration-gold">
            {brand.email}
          </a>
        </div>
      </div>
    </section>
  );
}
