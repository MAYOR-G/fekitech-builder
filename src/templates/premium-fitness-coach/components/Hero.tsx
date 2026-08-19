"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative h-screen min-h-[700px] flex items-center px-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <img
          src={hero?.image}
          alt="High intensity workout"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="fit-container relative z-20 px-6 w-full">
        <div className="max-w-3xl">
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white mb-6 uppercase leading-[0.9]">
            {hero?.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--fit-text-muted)] max-w-xl mb-12 font-medium">
            {hero?.subtitle}
          </p>
          <a href="#apply" className="fit-btn">
            {hero?.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
