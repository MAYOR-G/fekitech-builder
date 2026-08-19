"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function About() {
  const { about } = useTemplateData();

  return (
    <section id="experience" className="bg-[#0a0a0a]">
      <div className="sushi-container px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div className="order-2 md:order-1 max-w-lg mx-auto text-center md:text-left">
          <h2 className="text-4xl md:text-5xl text-white mb-8">
            {about?.title}
          </h2>
          <p className="text-[var(--sushi-text-muted)] text-lg mb-8 font-light">
            {about?.description}
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img
            src={about?.image}
            alt="Sushi preparation"
            className="w-full h-auto object-cover rounded-sm border border-white/5 shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
