"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const data = useTemplateData();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-32 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}>
      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center px-6 py-12 md:px-16 md:py-20 max-w-5xl w-full relative flex flex-col items-center"
        >
          {/* Elegant decorative element */}
          <div className="flex items-center gap-4 mb-8">
             <div className="w-16 md:w-24 h-[2px] bg-white/60"></div>
             <svg className="w-8 h-8 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
             </svg>
             <div className="w-16 md:w-24 h-[2px] bg-white/60"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-none mb-6 drop-shadow-lg tracking-tight font-black">
            {data.hero.title}
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            {data.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
            <a href={data.navigation.ctaHref} className="bg-[var(--color-primary)] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#3d3d3d] transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
              {data.navigation.ctaLabel}
            </a>
            <a href={data.hero.buttonHref} className="bg-white/10 backdrop-blur-sm text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors duration-300 border border-white/30 flex items-center gap-3">
              {data.hero.buttonLabel}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </a>
          </div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white/80 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50"></div>
      </motion.div>
    </section>
  );
}
