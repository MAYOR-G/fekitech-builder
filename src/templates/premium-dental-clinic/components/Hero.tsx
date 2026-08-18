import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Play, Calendar } from "lucide-react";

export function Hero() {
  const data = useTemplateData();

  return (
    <section className="relative w-full pt-[76px]">
      <div className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image */}
        <img
          src={data.hero.image}
          alt="Dental Patient Smiling"
          className="absolute inset-0 w-full h-full object-cover object-[70%_20%]"
        />
        {/* Dark overlay on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#695d4d] via-[#695d4d]/90 to-transparent w-full md:w-[70%]"></div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 text-white/90 text-sm font-medium mb-4 uppercase tracking-wider">
              <span>★</span>
              <span>{data.hero.badge}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-6">
              {data.hero.title}
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              {data.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href={data.hero.primaryCta.href}
                className="bg-[#222222] hover:bg-black text-white px-8 py-4 rounded-full font-medium transition-colors inline-flex items-center justify-center w-full sm:w-auto"
              >
                {data.hero.primaryCta.label}
              </a>
              {/* Optional secondary buttons seen on the bottom right of the hero in the screenshot */}
            </div>
          </div>
        </div>

        {/* Floating actions in the bottom right corner (approximate from screenshot) */}
        <div className="absolute bottom-8 right-8 hidden md:flex space-x-4">
          <button className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center space-x-2 transition">
            <Play className="w-4 h-4" />
            <span className="text-sm font-medium">Watch video</span>
          </button>
          <button className="bg-black/40 hover:bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center space-x-2 transition">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Book consult</span>
          </button>
        </div>
      </div>
      
      {/* Logos banner below hero */}
      <div className="w-full bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6 opacity-60 grayscale">
          <span className="text-lg font-bold font-serif">AstraZeneca</span>
          <span className="text-lg font-bold font-serif">Johnson & Johnson</span>
          <span className="text-lg font-bold font-serif">Pfizer</span>
          <span className="text-lg font-bold font-serif">Bupa</span>
          <span className="text-lg font-bold font-serif">NHS</span>
        </div>
      </div>
    </section>
  );
}
