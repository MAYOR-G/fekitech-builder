"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function About() {
  const { about } = useTemplateData();

  return (
    <section id="philosophy" className="bg-[var(--fit-surface)]">
      <div className="fit-container px-6 grid md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div>
          <span className="inline-block text-[var(--fit-accent)] font-bold tracking-widest uppercase mb-4 text-sm">
            {about?.tagline}
          </span>
          <h2 className="text-5xl md:text-7xl text-white mb-8">
            {about?.title}
          </h2>
          <p className="text-[var(--fit-text-muted)] text-lg md:text-xl font-medium leading-relaxed">
            {about?.description}
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--fit-accent)] translate-x-4 translate-y-4 rounded-sm" />
          <img
            src={about?.image}
            alt="Personal Trainer"
            className="relative z-10 w-full h-auto object-cover rounded-sm grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
}
