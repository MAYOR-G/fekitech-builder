"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';

const StickyBackground = () => {
  return (
    <section className="relative z-0 h-[120svh]">
      {/* Sticky Background */}
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="absolute inset-0 bg-gym-darker/60 z-10"></div>
        <TemplateImage 
          src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym interior" 
          className="w-full h-full object-cover"
        />
        
        {/* Content overlaid on sticky background */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter mb-6 text-white text-shadow">
            Dedication <br />
            <span className="text-gym-accent">Over Motivation.</span>
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl font-medium text-shadow">
            Motivation gets you to the door. Consistency builds the foundation. Our coaches and community are here to keep you accountable every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StickyBackground;
