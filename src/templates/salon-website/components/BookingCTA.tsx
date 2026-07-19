"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function BookingCTA() {
  const { contactCards } = useTemplateData();

  return (
    <section id="booking" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-plum-depth text-pearl shadow-plum">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.88fr_1.12fr] lg:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-champagne">
              Book appointment
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.02] sm:text-5xl">
              Choose the service, arrive calm, leave beautifully finished.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-pearl/72">
              Call, email, or connect a booking system so clients can reserve a
              stylist, request bridal availability, or schedule a consultation.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="tel:+12125550136" variant="secondary">
                Call the studio
              </ButtonLink>
              <ButtonLink href="mailto:hello@lumierebeautystudio.com" variant="light">
                Email for availability
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[1rem] border border-white/12 bg-white/[0.08] p-5 shadow-insetLine transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]"
                >
                  <Icon className="h-5 w-5 text-champagne" aria-hidden="true" />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-champagne">
                    {card.title}
                  </p>
                  <p className="mt-2 text-[15px] font-bold leading-7 text-pearl/76">
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
