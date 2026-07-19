"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function BookingCTA() {
  const { contactCards } = useTemplateData();

  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] bg-onyx text-pureWhite shadow-deep">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-bronze">
              Book direct
            </p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
              Plan the stay, choose the room, and arrive with everything handled.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-pureWhite/70">
              Connect guests to availability, room inquiries, event requests, or
              concierge support with a focused booking pathway.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#booking" variant="bronze">
                Check availability
              </ButtonLink>
              <ButtonLink href="tel:+12125550142" variant="light">
                Call reservations
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[8px] border border-white/10 bg-white/5 p-5 shadow-insetLine transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                >
                  <Icon className="h-5 w-5 text-bronze" aria-hidden="true" />
                  <p className="mt-4 text-xs font-bold uppercase tracking-[0.18em] text-bronze">
                    {card.title}
                  </p>
                  <p className="mt-2 text-[15px] font-semibold leading-7 text-pureWhite/80">
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
