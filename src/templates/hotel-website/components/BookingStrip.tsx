"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function BookingStrip() {
  const { bookingFields } = useTemplateData();

  return (
    <section id="booking" className="relative z-20 -mt-8 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[1.35rem] border border-espresso/10 bg-pearl p-4 shadow-deep">
        <div className="grid gap-3 lg:grid-cols-[repeat(4,1fr)_auto] lg:items-center">
          {bookingFields.map((field) => {
            const Icon = field.icon;
            return (
              <div
                key={field.label}
                className="rounded-[1rem] border border-espresso/10 bg-alabaster px-4 py-3"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-stone">
                  {field.label}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <Icon className="h-4 w-4 text-champagne" aria-hidden="true" />
                  <p className="font-semibold text-espresso">{field.value}</p>
                </div>
              </div>
            );
          })}
          <ButtonLink href="#rooms" className="h-full min-h-[64px]">
            Check Availability
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
