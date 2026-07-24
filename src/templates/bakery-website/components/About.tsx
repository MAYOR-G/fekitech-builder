"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function About() {
  const data = useTemplateData();

  return (
    <section id="about" className="relative w-full py-32 md:py-48 flex items-center justify-center overflow-hidden z-10 bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${data.about.backgroundImage})` }}>
      {/* Dark/Colored overlay for better text readability */}
      <div className="absolute inset-0 bg-[var(--color-primary)]/80 mix-blend-multiply z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Small decorative icon/logo above title */}
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 text-[var(--color-primary)]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-wide drop-shadow-md">
            {data.about.title}
          </h2>

          <p className="text-white/90 text-lg md:text-xl mb-4 font-medium italic">
            {data.about.subtitle}
          </p>

          <p className="text-white/80 text-base md:text-lg mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            {data.about.description}
          </p>

          <a 
            href={data.about.buttonHref}
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-transparent text-white font-bold uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-300 border-2 border-white hover:bg-white hover:text-[var(--color-primary)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              {data.about.buttonLabel}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
