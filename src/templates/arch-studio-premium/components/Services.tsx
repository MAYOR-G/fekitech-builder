"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Services() {
  const { services } = useTemplateData();

  return (
    <section id="expertise">
      <div className="arch-container">
        <h2 className="text-4xl md:text-5xl mb-16 text-center max-w-2xl mx-auto">
          {services?.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {services?.items?.map((item, index) => (
            <div key={index} className="group">
              <div className="aspect-[3/4] overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl mb-4">{item.title}</h3>
              <p className="text-[var(--arch-text-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
