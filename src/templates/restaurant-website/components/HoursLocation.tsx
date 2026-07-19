"use client";
import { Clock3, MapPin } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function HoursLocation() {
  const { brand, hours } = useTemplateData();

  return (
    <section
      id="hours"
      className="page-panel section-divider bg-warm-paper px-5 py-20 text-coal lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.25rem] border border-coal/10 bg-coal p-6 text-cream shadow-panel sm:p-8">
          <MapPin className="h-8 w-8 text-ember" aria-hidden="true" />
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Find the dining room.
          </h2>
          <p className="mt-5 text-lg leading-8 text-cream/68">
            {brand.address}. Find city-specific directions, parking notes,
            reservation platform links, and neighborhood cues before arrival.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#reservation">Reserve now</ButtonLink>
            <ButtonLink href="tel:+13125550198" variant="outline">
              Call the host stand
            </ButtonLink>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-coal/10 bg-bone p-6 shadow-card sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-flame/10 text-flame">
              <Clock3 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-flame">
                Opening hours
              </p>
              <p className="mt-1 text-sm font-bold text-graphite/62">
                Updated weekly for dinner service and private dining.
              </p>
            </div>
          </div>
          <div className="mt-7 divide-y divide-coal/10">
            {hours.map((item) => (
              <div
                key={item.day}
                className="flex flex-col gap-2 rounded-xl px-0 py-4 transition duration-300 hover:bg-coal/[0.035] sm:flex-row sm:items-center sm:justify-between"
              >
                <p className="font-extrabold text-coal">{item.day}</p>
                <p className="font-semibold text-graphite/72">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
