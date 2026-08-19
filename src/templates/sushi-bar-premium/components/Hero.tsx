"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-24 px-0">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={hero?.image}
          alt="Master sushi chef"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="sushi-container relative z-20 text-center px-6">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-wide drop-shadow-lg">
          {hero?.title}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
          {hero?.subtitle}
        </p>
        <a href="#reservations" className="sushi-btn sushi-btn-primary">
          {hero?.cta}
        </a>
      </div>
    </section>
  );
}
