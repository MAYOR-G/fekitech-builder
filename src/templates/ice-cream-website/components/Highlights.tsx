"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { IceCream } from "@phosphor-icons/react";

export default function Highlights() {
  const data = useTemplateData();

  return (
    <section className="py-32 bg-white relative z-20 overflow-hidden">

      <div className="text-center mb-24 relative z-10">
        <h2 className="font-pacifico text-4xl md:text-6xl text-[var(--color-secondary)] mb-6">Signature Flavours</h2>
        <div className="flex items-center justify-center gap-4 text-[var(--color-text)] mb-2">
          <svg className="w-24 h-6 text-gray-200" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 0 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <IceCream size={24} weight="fill" className="text-[var(--color-primary)]" />
          <svg className="w-24 h-6 text-gray-200" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 10 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 lg:gap-16">
          {data.highlights.items.map((item, idx) => {
            const blobShapes = [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "70% 30% 30% 70% / 60% 40% 60% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ];
            const blobShape = blobShapes[idx % blobShapes.length];

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.2, ease: "easeOut" }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative w-56 h-56 md:w-64 md:h-64 mb-10">
                  {/* Organic colored background blob */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30 + idx * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-white shadow-2xl opacity-80"
                    style={{ borderRadius: blobShape }}
                  ></motion.div>
                  
                  {/* The Image inside the blob */}
                  <div 
                    className="absolute inset-3 overflow-hidden"
                    style={{ borderRadius: blobShape }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-out mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Floating decorative elements */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx }}
                    className="absolute -right-4 -bottom-4 w-12 h-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center shadow-lg text-white"
                  >
                    <IceCream size={20} weight="duotone" />
                  </motion.div>
                </div>
                
                <h3 className="text-2xl font-black text-[#2a2a2a] mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-500 mb-8 text-base leading-relaxed max-w-sm">{item.description}</p>
                <a 
                  href={item.buttonHref}
                  className="group relative inline-flex items-center justify-center px-8 py-3 font-bold text-[#2a2a2a] uppercase tracking-widest text-xs transition-all duration-300"
                >
                  <span className="absolute inset-0 w-full h-full border-b-2 border-[var(--color-primary)] opacity-50 group-hover:opacity-100 transition-opacity"></span>
                  <span className="relative flex items-center gap-2 group-hover:-translate-y-1 transition-transform">
                    {item.buttonLabel}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
