"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function About() {
  const { about } = useTemplateData();

  return (
    <section id="studio" className="bg-[#fcfcfc]">
      <div className="arch-container grid md:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={about?.image}
            alt="Studio"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-xl">
          <span className="block text-sm uppercase tracking-widest text-[var(--arch-text-muted)] mb-6">
            {about?.tagline}
          </span>
          <h2 className="text-4xl md:text-5xl mb-8">
            {about?.title}
          </h2>
          <p className="text-lg text-[var(--arch-text-muted)]">
            {about?.description}
          </p>
        </div>
      </div>
    </section>
  );
}
