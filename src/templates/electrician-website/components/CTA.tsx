"use client";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function CTA() {
  const { contactCards } = useTemplateData();

  return (
    <section id="contact" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.4rem] bg-circuit-hero text-white shadow-deep">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-safety">
              Book service
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.05em] sm:text-5xl">
              Need safe electrical work? Get a clear visit window and estimate.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Speak with the service team, confirm the best visit window, and
              get a clear estimate before repair or installation work begins.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="tel:+13125550119" variant="yellow">
                Call emergency support
              </ButtonLink>
              <ButtonLink href="mailto:service@voltedgeelectrical.com" variant="secondary">
                Email service team
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[1rem] border border-white/12 bg-white/[0.08] p-5 shadow-insetLine transition duration-300 hover:-translate-y-1 hover:border-cyan/32"
                >
                  <Icon className="h-5 w-5 text-safety" aria-hidden="true" />
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-cyan">
                    {card.title}
                  </p>
                  <p className="mt-2 text-[15px] font-bold leading-7 text-white/78">
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
