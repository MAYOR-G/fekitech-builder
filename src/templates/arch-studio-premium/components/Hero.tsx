"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="pt-32 pb-0 md:pt-40 px-0">
      <div className="arch-container px-6 grid md:grid-cols-2 gap-12 items-end mb-12">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6">
            {hero?.title}
          </h1>
        </div>
        <div className="max-w-md pb-4 md:ml-auto flex flex-col items-start md:items-end text-left md:text-right">
          <p className="text-lg text-[var(--arch-text-muted)] mb-8">
            {hero?.subtitle}
          </p>
          <a href="#projects" className="arch-btn">
            {hero?.cta}
          </a>
        </div>
      </div>
      <div className="w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src={hero?.image}
          alt="Modern interior"
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
        />
      </div>
    </section>
  );
}
