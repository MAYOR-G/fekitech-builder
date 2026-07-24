"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Star, Coffee, Heart, Storefront } from "@phosphor-icons/react";

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Bread": return <Storefront size={24} weight="fill" />;
    case "Croissant": return <Coffee size={24} weight="fill" />;
    case "Cookie": return <Star size={24} weight="fill" />;
    case "Cake":
    default:
      return <Heart size={24} weight="fill" />;
  }
};

export default function Specialties() {
  const data = useTemplateData();

  return (
    <section id="specialties" className="py-24 bg-[#ffffff] relative z-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-secondary) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="text-center mb-20 relative z-10">
        <div className="flex items-center justify-center gap-4 text-[var(--color-text)] mb-4">
          <svg className="w-16 h-2 text-[var(--color-secondary)]" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 0 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <Star size={28} weight="duotone" className="text-[var(--color-primary)]" />
          <svg className="w-16 h-2 text-[var(--color-secondary)]" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 10 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-[#3d3d3d] mb-4 tracking-wide">{data.specialties.title}</h2>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {data.specialties.items.map((item, idx) => {
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center text-center group"
              >
                {/* Wavy/Scalloped Border Effect via SVG and layering */}
                <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                  {/* Decorative outer ring simulating the wavy border */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 text-[var(--color-primary)] opacity-20"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                      <path d="M 50 0 C 58 0 62 5 70 8 C 78 11 85 8 90 15 C 95 22 92 29 95 37 C 98 45 102 52 98 59 C 94 66 90 69 85 76 C 80 83 75 88 67 92 C 59 96 52 100 44 98 C 36 96 29 92 22 88 C 15 84 9 79 5 72 C 1 65 0 58 2 50 C 4 42 0 35 4 28 C 8 21 14 16 21 11 C 28 6 35 2 43 0 Z" />
                    </svg>
                  </motion.div>
                  
                  {/* Inner shape */}
                  <div className="absolute inset-2 bg-white rounded-full border-2 border-dashed border-[var(--color-primary)] z-10"></div>
                  
                  {/* The Image inside the circle */}
                  <div className="absolute inset-4 rounded-full overflow-hidden z-20 bg-[var(--color-secondary)]">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Icon badge */}
                  <div className="absolute -bottom-2 z-30 bg-white p-2 rounded-full shadow-md text-[var(--color-primary)] border border-gray-100 group-hover:-translate-y-2 transition-transform duration-300">
                    {getIcon(item.icon)}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-serif text-[#3d3d3d] mb-3">{item.title}</h3>
                <p className="text-gray-500 mb-0 text-sm leading-relaxed max-w-[200px]">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
