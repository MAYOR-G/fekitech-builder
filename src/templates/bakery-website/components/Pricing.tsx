"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Pricing() {
  const data = useTemplateData();

  const colors = ["var(--color-primary)", "var(--color-primary)", "var(--color-secondary)", "var(--color-primary)"];

  return (
    <section id="pricing" className="pt-24 pb-32 bg-white relative z-10">
      <div className="text-center mb-24">
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
        <h2 className="text-4xl md:text-5xl font-serif text-[#3d3d3d] mb-4 tracking-wide">{data.pricing.title}</h2>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.pricing.items.map((item, idx) => {
            const cardColor = colors[idx % colors.length];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className="relative mt-16 group"
              >
                {/* Donut / Cake Graphic on top */}
                <div 
                  className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 z-20 flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 rounded-full"
                >
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full mix-blend-multiply drop-shadow-xl" />
                  {/* Optional Featured Badge */}
                  {item.featured && (
                    <div className="absolute -right-2 top-8 bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-xs uppercase px-3 py-1 rounded-full shadow-md rotate-12">
                      Best
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.1)] relative z-10 flex flex-col h-full text-center group-hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500">
                  
                  {/* Colored dripping header area */}
                  <div 
                    className="pt-24 pb-6 relative z-20 transition-colors duration-500"
                    style={{ backgroundColor: cardColor }}
                  >
                    <h3 className="text-2xl font-serif text-white mb-2 relative z-10">{item.name}</h3>
                    
                    {/* SVG dripping shape */}
                    <svg className="absolute top-[99%] left-0 w-full h-8" style={{ color: cardColor }} viewBox="0 0 100 20" preserveAspectRatio="none" fill="currentColor">
                      <path d="M0 0 L0 10 Q25 25 50 10 T100 10 L100 0 Z" />
                    </svg>
                  </div>

                  <div className="pt-8 pb-4 bg-white relative z-10">
                     <div className="text-5xl font-black text-[#3d3d3d] flex items-start justify-center">
                        <span className="text-4xl mt-1">{item.price}</span>
                        <span className="text-2xl mt-1">{item.currency}</span>
                      </div>
                      <div className="inline-block mt-4 text-xs font-bold uppercase px-4 py-1 rounded-full text-white tracking-widest" style={{ backgroundColor: cardColor }}>
                         For {item.name.includes("Cake") && !item.name.includes("Small") ? "1 Cake" : item.name.includes("Cupcake") ? "2 Cakes" : item.name.includes("Macaron") ? "5 Cakes" : "10 Cakes"}
                      </div>
                  </div>

                  {/* Features List */}
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <ul className="space-y-4 mb-8">
                      {item.features.map((feature, fIdx) => (
                        <li key={fIdx} className="text-sm text-gray-500 relative after:content-[''] after:block after:w-full after:h-[1px] after:bg-gray-100 after:mt-4 last:after:hidden">
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    <a 
                      href={item.buttonHref}
                      className="inline-block border border-[#3d3d3d] text-[#3d3d3d] hover:bg-[#3d3d3d] hover:text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 uppercase tracking-widest text-xs"
                    >
                      {item.buttonLabel}
                    </a>
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
