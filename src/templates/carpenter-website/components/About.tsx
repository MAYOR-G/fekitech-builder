"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function About() {
  const data = useTemplateData();

  return (
    <section id="about" className="py-24 bg-[var(--color-secondary)] text-white relative border-t-4 border-[var(--color-primary)]">
      {/* Decorative texture or watermark could go here */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)] opacity-5 rounded-bl-full pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
              <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">{data.about.kicker}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
              {data.about.title}
            </h2>
            
            <div className="space-y-6 text-gray-300 font-light leading-relaxed">
              {data.about.description.split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--color-primary)]">
                <img src={data.about.image} alt={data.about.signature} className="w-full h-full object-cover grayscale" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-white">{data.about.signature}</p>
                <p className="text-[var(--color-primary)] text-sm tracking-widest uppercase">{data.about.role}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10 group overflow-hidden">
               <img 
                 src={data.about.image} 
                 alt="Carpenter working" 
                 className="w-full h-auto aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
               />
               {/* Frame overlay */}
               <div className="absolute inset-6 border border-white/20 pointer-events-none transition-all duration-500 group-hover:inset-4 group-hover:border-[var(--color-primary)]/50"></div>
            </div>
            
            {/* Year badge */}
            <div className="absolute -bottom-8 -left-8 bg-[var(--color-primary)] text-white p-8 z-20 shadow-2xl hidden md:block">
              <span className="block text-5xl font-serif font-bold mb-1">2005</span>
              <span className="block text-xs tracking-widest uppercase font-semibold">Since Year</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
