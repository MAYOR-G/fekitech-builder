"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Portfolio() {
  const { portfolio } = useTemplateData();

  return (
    <section id="projects" className="bg-[#fcfcfc]">
      <div className="arch-container">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-5xl">{portfolio?.title}</h2>
          <a href="#" className="hidden md:inline-flex text-sm uppercase tracking-widest font-medium hover:text-[var(--arch-text-muted)] transition-colors">
            View All Projects
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {portfolio?.items?.map((item, index) => (
            <div 
              key={index} 
              className={`group cursor-pointer ${index === 1 ? 'md:mt-32' : ''} ${index === 2 ? 'md:-mt-16' : ''}`}
            >
              <div className="overflow-hidden mb-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex justify-between items-start">
                <h3 className="text-2xl">{item.name}</h3>
                <span className="text-sm text-[var(--arch-text-muted)]">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
