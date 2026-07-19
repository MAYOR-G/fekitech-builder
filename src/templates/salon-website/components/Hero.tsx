"use client";
import { Star } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { ImageFrame } from "./ImageFrame";

import { useTemplateData } from "../TemplateContext";
export function Hero() {
  const { brand, heroStats } = useTemplateData();

  return (
    <section id="top" className="relative overflow-hidden bg-salon-soft px-5 pb-12 pt-32 lg:px-8 lg:pt-40 lg:pb-20">
      <div className="absolute inset-0 bg-beauty-lines bg-[length:78px_78px] opacity-40" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:min-h-[700px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-10 animate-riseIn">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose/22 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-rose shadow-insetLine">
            <Star className="h-3.5 w-3.5 fill-rose" aria-hidden="true" />
            Hair, nails, makeup and care
          </p>
          <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.96] text-plum sm:text-6xl xl:text-[5.75rem]">
            Beauty appointments with a softer kind of confidence.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-mink/76">
            {brand.name} creates polished hair, beauty, nail, makeup, bridal,
            and grooming experiences in a calm studio environment.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#booking">Book appointment</ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              View services
            </ButtonLink>
          </div>

          <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className="animate-riseIn rounded-[1rem] border border-plum/10 bg-pearl/76 p-4 shadow-insetLine"
                style={{ animationDelay: `${180 + index * 90}ms` }}
              >
                <p className="font-display text-4xl font-semibold text-rose">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-black uppercase tracking-[0.15em] text-mink/62">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 animate-riseIn" style={{ animationDelay: "130ms" }}>
          <div className="grid gap-4 sm:grid-cols-[0.78fr_1fr]">
            <div className="space-y-4 sm:pt-14">
              <ImageFrame
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=90"
                alt="Premium makeup and beauty styling"
                className="h-72 rounded-[1.75rem] shadow-card"
                imageClassName="transition duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="rounded-[1.4rem] bg-plum p-5 text-pearl shadow-plum">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-champagne">
                  Signature finish
                </p>
                <p className="mt-3 font-display text-3xl leading-tight">
                  Soft glam, glossy hair, and appointment notes that travel home.
                </p>
              </div>
            </div>
            <ImageFrame
              src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1100&q=90"
              alt="Elegant salon chair and hair styling station"
              className="min-h-[420px] rounded-[1.5rem] shadow-glow sm:min-h-[560px] sm:rounded-[2rem]"
              imageClassName="animate-slowZoom"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
