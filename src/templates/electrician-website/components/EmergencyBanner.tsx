"use client";
import { PhoneCall, Siren } from "lucide-react";

import { useTemplateData } from "../TemplateContext";
export function EmergencyBanner() {
  const { brand, emergencyHighlights } = useTemplateData();

  return (
    <section className="bg-safety px-2 sm:px-5 py-5 text-navy lg:px-8">
      <div className="mx-auto flex w-full flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy text-safety">
            <Siren className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-base md:text-lg font-extrabold tracking-[-0.02em] m-0">
              Urgent electrical issue? Get a licensed technician on the line.
            </p>
            <div className="flex flex-wrap gap-2">
              {emergencyHighlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-navy/12 bg-white/35 px-3 py-1 text-xs font-black uppercase tracking-[0.1em] text-navy/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <a
          href="tel:+13125550119"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-navy px-5 text-[15px] font-extrabold text-white transition hover:-translate-y-0.5 whitespace-nowrap shrink-0"
        >
          <PhoneCall className="h-4 w-4" />
          {brand.emergencyPhone}
        </a>
      </div>
    </section>
  );
}
