"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';

const VideoBlock = () => {
  return (
    <section className="py-24 bg-gym-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden aspect-video group">
          <TemplateImage
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
            alt="Premium gym studio interior with strength training equipment"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <h3 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tighter text-white">Experience The Studio</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;
