"use client";
import { ButtonLink } from "./ButtonLink";
import { ImageFrame } from "./ImageFrame";

import { useTemplateData } from "../TemplateContext";
export function CTA() {
  const { brand } = useTemplateData();

  return (
    <section id="order" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-ganache-depth shadow-soft">
        <div className="grid gap-0 lg:grid-cols-[0.92fr_1.08fr]">
          <ImageFrame
            src="https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&w=1200&q=88"
            alt="Cake consultation and dessert table details"
            className="min-h-[360px] rounded-none"
            imageClassName="opacity-92"
          />
          <div className="p-8 text-cream sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.26em] text-blush">
              Orders and consultations
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Bring the date, the mood, and a table worth gathering around.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/80">
              Share your occasion details and we will guide cake size, flavours,
              finish, packaging, and delivery timing with a polished proposal.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={`tel:${brand.phone.replace(/\s/g, "")}`} variant="light">
                Call {brand.phone}
              </ButtonLink>
              <ButtonLink href={`mailto:${brand.email}`} variant="light">
                Email the studio
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
