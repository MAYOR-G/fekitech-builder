"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function CTA() {
  const { contactCards } = useTemplateData();

  return (
    <section id="contact" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-charcoal-olive text-cream shadow-lift">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                Consultation and booking
              </p>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
                Tell us the guest count, date, and atmosphere. We will shape the food around it.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/72">
                Start with a consultation, guest count, venue details, and
                preferred service style so the catering plan feels calm from
                the first message.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="mailto:events@savorytable.co" variant="gold">
                Email the events team
              </ButtonLink>
              <ButtonLink href="tel:+12125550148" variant="light">
                Call +1 212 555 0148
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-[1.1rem] border border-white/12 bg-white/[0.08] p-5 shadow-insetLine"
                >
                  <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
                  <p className="mt-4 text-[15px] font-bold leading-7 text-cream/80">
                    {card.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
