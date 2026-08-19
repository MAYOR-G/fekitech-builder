"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Menu() {
  const { menu } = useTemplateData();

  return (
    <section id="menu" className="bg-[#111111]">
      <div className="sushi-container px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            {menu?.title}
          </h2>
          <div className="w-16 h-px bg-[var(--sushi-accent)] mx-auto" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {menu?.items?.map((item, index) => (
            <div key={index} className="group">
              <div className="aspect-[4/3] overflow-hidden mb-8 rounded-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="flex justify-between items-end mb-4 border-b border-white/10 pb-4">
                <h3 className="text-2xl text-white font-serif">{item.title}</h3>
                <span className="text-xl text-[var(--sushi-accent)] font-serif">{item.price}</span>
              </div>
              <p className="text-[var(--sushi-text-muted)] font-light">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
