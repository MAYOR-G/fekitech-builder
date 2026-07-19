"use client";
import { Reveal } from "./Reveal";

import { useTemplateData } from "../TemplateContext";
export function TrustStrip() {
  const { trustStats } = useTemplateData();

  return (
    <section aria-label="Practice trust signals" className="px-5 py-10 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-3 rounded-[1.5rem] border border-ink/8 bg-white/82 p-3 shadow-card backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
        {trustStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={index * 70}>
              <div className="h-full rounded-[1rem] border border-ink/7 bg-porcelain/80 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-4xl font-semibold text-ink">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm font-bold uppercase tracking-[0.16em] text-ocean">
                      {stat.label}
                    </p>
                  </div>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mint/70 text-ocean">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-graphite/68">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
