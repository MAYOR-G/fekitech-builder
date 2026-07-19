"use client";
import { ImageFrame } from "./ImageFrame";

import { useTemplateData } from "../TemplateContext";
export function ConsultationCTA() {
  const { brand } = useTemplateData();

  return (
    <section id="consultation" className="px-6 py-24 lg:px-8 bg-warm-white">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-white shadow-sm border border-charcoal/5">
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <ImageFrame
            src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85"
            alt="Furniture consultation setting"
            className="min-h-[340px] rounded-none"
            imageClassName="opacity-100"
          />
          <div className="flex flex-col justify-center p-8 text-charcoal sm:p-12 lg:p-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate">
              Custom orders and consultation
            </p>
            <h2 className="mt-4 font-display text-[40px] font-bold leading-[1.1] sm:text-5xl text-charcoal">
              Bring measurements, inspiration, and a room that needs direction.
            </h2>
            <p className="mt-6 max-w-2xl font-sans text-[16px] leading-[1.7] text-[#3D3D3D]">
              We will help translate your preferred mood into furniture sizes,
              fabrics, finishes, delivery timelines, and a clear quotation for
              your home, rental property, or hospitality project.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <a 
                href={`tel:${brand.phone.replace(/\s/g, "")}`} 
                className="group flex items-center justify-center gap-2 rounded-full bg-amber px-8 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-white transition-all hover:bg-[#92400E] active:scale-[0.98]"
              >
                Call {brand.phone}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a 
                href={`mailto:${brand.email}`} 
                className="group flex items-center justify-center gap-2 rounded-full border border-charcoal bg-white px-8 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal transition-all hover:bg-charcoal hover:text-white"
              >
                Email showroom team
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
