"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { IceCream, Brandy, Moped } from "@phosphor-icons/react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "ice-cream": return <IceCream size={48} weight="duotone" className="text-white group-hover:text-[var(--color-primary)] transition-colors" />;
    case "drinks": return <Brandy size={48} weight="duotone" className="text-white group-hover:text-[var(--color-primary)] transition-colors" />;
    case "delivery": return <Moped size={48} weight="duotone" className="text-white group-hover:text-[var(--color-primary)] transition-colors" />;
    default: return <IceCream size={48} weight="duotone" />;
  }
};

export default function Services() {
  const data = useTemplateData();

  return (
    <section className="relative w-full py-32 bg-[var(--color-secondary)] overflow-hidden z-10">
      <div className="absolute inset-0 z-0">
        <img 
          src={data.services.backgroundImage} 
          alt="Services background" 
          className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-secondary)] via-transparent to-[var(--color-secondary)] opacity-90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20">
          <div className="text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1 rounded border border-[var(--color-primary)] mb-6 bg-white/5 backdrop-blur-sm"
            >
              <span className="font-semibold text-xs tracking-widest uppercase text-[var(--color-primary)]">What We Offer</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase"
            >
              {data.services.title}
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {data.services.items.map((item, idx) => {
            const blobShapes = [
              "30% 70% 70% 30% / 30% 30% 70% 70%",
              "70% 30% 30% 70% / 60% 40% 60% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ];
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="flex flex-col bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="mb-8 relative w-20 h-20 flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20 + idx * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[var(--color-primary)] opacity-20"
                    style={{ borderRadius: blobShapes[idx % blobShapes.length] }}
                  ></motion.div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300 text-[var(--color-primary)]">
                    {getIcon(item.icon)}
                  </div>
                </div>
                <h3 className="font-pacifico text-3xl text-white mb-4 tracking-wide">{item.title}</h3>
                <p className="text-gray-300 mb-10 text-base leading-relaxed flex-grow">{item.description}</p>
                <a 
                  href={item.buttonHref}
                  className="inline-flex items-center gap-2 text-[var(--color-primary)] font-bold uppercase tracking-widest text-xs hover:text-white transition-colors group/btn mt-auto"
                >
                  {item.buttonLabel}
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
