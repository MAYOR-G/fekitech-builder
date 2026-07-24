"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { MagnifyingGlassPlus } from "@phosphor-icons/react";

export default function Gallery() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-white relative z-20">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 text-[var(--color-text)] mb-4">
          <svg className="w-16 h-2 text-[var(--color-secondary)]" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 0 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--color-primary)]">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="currentColor"/>
            <circle cx="12" cy="12" r="4.5" fill="currentColor"/>
          </svg>
          <svg className="w-16 h-2 text-[var(--color-secondary)]" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 10 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-[#3d3d3d] mb-4 tracking-wide">{data.gallery.title}</h2>
      </div>

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {data.gallery.images.map((image, idx) => {
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="rounded-xl overflow-hidden relative group aspect-square shadow-sm"
              >
                <img 
                  src={image} 
                  alt={`Creation ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[var(--color-primary)] scale-50 group-hover:scale-100 transition-all duration-300 delay-100">
                    <MagnifyingGlassPlus size={20} weight="bold" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
