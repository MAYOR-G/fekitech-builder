"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Programs() {
  const { programs } = useTemplateData();

  return (
    <section id="programs" className="bg-[var(--fit-bg)]">
      <div className="fit-container px-6">
        <h2 className="text-6xl md:text-8xl text-center mb-20">{programs?.title}</h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {programs?.items?.map((item, index) => (
            <div key={index} className="group relative overflow-hidden bg-[var(--fit-surface)] rounded-sm">
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-8 md:p-12 absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
                <h3 className="text-4xl md:text-5xl text-white mb-2">{item.title}</h3>
                <p className="text-[var(--fit-text-muted)] font-medium text-lg max-w-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
