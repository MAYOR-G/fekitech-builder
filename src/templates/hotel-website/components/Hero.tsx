"use client";
import { useEffect, useState } from "react";
import { ButtonLink } from "./ButtonLink";
import { ImageFrame } from "./ImageFrame";
import { cn } from "../lib/utils";

import { useTemplateData } from "../TemplateContext";
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90",
    alt: "Cinematic boutique hotel with pool and warm hospitality",
  },
  {
    src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1800&q=90",
    alt: "Boutique hotel arrival with bright poolside architecture",
  },
  {
    src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1800&q=90",
    alt: "Elegant suite bedroom with calm hospitality styling",
  },
];

export function Hero() {
  const { brand } = useTemplateData();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroImages.length);
    }, 5400);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative h-[100svh] min-h-[720px] overflow-hidden bg-onyx">
      {heroImages.map((image, index) => (
        <ImageFrame
          key={image.src}
          src={image.src}
          alt={image.alt}
          loading={index === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 h-full w-full opacity-0 transition duration-[1400ms]",
            index === activeIndex && "opacity-100"
          )}
          imageClassName={cn("scale-105 opacity-90", index === activeIndex && "animate-heroDrift")}
        />
      ))}
      <div className="absolute inset-0 bg-hero-gradient" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 lg:px-8">
        <div className="max-w-5xl animate-riseIn">
          <h1 className="font-display text-5xl leading-[1.05] text-alabaster sm:text-7xl lg:text-[5.5rem] lg:leading-[1.02]">
            A quieter kind of luxury for considered stays.
          </h1>
          <p className="mt-8 max-w-3xl text-xl font-light leading-relaxed text-alabaster/90 sm:text-2xl">
            {brand.name} brings calm rooms, warm dining, thoughtful rituals,
            and polished service to travelers who want the whole stay to feel
            quietly handled.
          </p>
          <div className="mt-12">
            <ButtonLink href="#booking" variant="bronze" className="px-8 py-4 text-sm tracking-widest uppercase font-semibold">
              Book Your Stay
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
