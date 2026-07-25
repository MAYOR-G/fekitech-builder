import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const data = useTemplateData();
  const { hero } = data;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1E201E]">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src={hero?.image} 
            alt="Fresh Market Produce" 
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Darkening Overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply z-10" />
        {/* Subtle green tint overlay */}
        <div className="absolute inset-0 bg-[#548D4E]/20 z-10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-10 lg:px-24 relative z-20 w-full pt-32 pb-16">
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-sm md:text-base font-bold tracking-[0.2em] text-[#EAF5E1] uppercase mb-6 block drop-shadow-md">
              {hero?.tagline}
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-6 drop-shadow-lg">
              {hero?.headline}
            </h1>
            <p className="text-gray-100 text-lg md:text-xl lg:text-2xl mb-10 leading-relaxed font-sans max-w-lg drop-shadow-md">
              {hero?.subheadline}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 lg:px-8 py-3 lg:py-4 bg-[#548D4E] text-white rounded-full font-medium hover:bg-[#3d6938] transition-colors text-sm lg:text-base shadow-lg hover:shadow-xl">
                {hero?.primaryCTA}
              </button>
              <button className="px-6 lg:px-8 py-3 lg:py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-colors text-sm lg:text-base shadow-lg hover:shadow-xl">
                {hero?.secondaryCTA}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
