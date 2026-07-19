"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function ReservationCTA() {
  const { contactCards } = useTemplateData();

  return (
    <section id="reservation" className="page-panel section-divider px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.35rem] border border-cream/12 bg-ember-panel text-cream shadow-glow">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-ember">
              Reservations
            </p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.98] sm:text-6xl">
              Save a table for dinner, drinks, or something worth celebrating.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/68">
              Connect guests to reservations, private dining inquiries, phone
              bookings, or a preferred table-management system.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="mailto:reservations@emberandsage.com">
                Request a reservation
              </ButtonLink>
              <ButtonLink href="tel:+13125550198" variant="outline">
                Call +1 312 555 0198
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-[1rem] border border-cream/12 bg-cream/[0.06] p-5 shadow-insetLine transition duration-300 hover:-translate-y-1 hover:border-ember/32"
                >
                  <Icon className="h-5 w-5 text-ember" aria-hidden="true" />
                  <p className="mt-4 text-[15px] font-bold leading-7 text-cream/76">
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
