"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Pricing() {
  const data = useTemplateData();

  return (
    <section className="pt-32 pb-40 bg-[var(--color-secondary)] relative z-10">
      <div className="text-center mb-32">
        <div className="inline-block px-4 py-1 rounded border border-[var(--color-primary)] mb-6 bg-white/5 backdrop-blur-sm">
          <span className="font-semibold text-xs tracking-widest uppercase text-[var(--color-primary)]">Indulge Yourself</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">{data.pricing.title}</h2>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {data.pricing.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: "easeOut" }}
              className="relative mt-12 group"
            >
              {/* Scoop Graphic on top */}
              <div 
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] z-20 flex items-center justify-center transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500"
                style={{ backgroundColor: item.color }}
              >
                <div className="w-20 h-20 rounded-full bg-white/20 blur-sm absolute top-1 left-1"></div>
                <div className="w-24 h-6 absolute -bottom-2 bg-[var(--color-secondary)] mix-blend-overlay opacity-50 rounded-[50%] blur-sm"></div>
              </div>

              {/* Card Body */}
              <div className="bg-[#faf9f6] rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col h-full text-center border-b-8 border-r-4 border-black/10 group-hover:border-black/20 group-hover:-translate-y-4 transition-all duration-500">
                
                {/* Wavy Top colored area */}
                <div 
                  className="pt-20 pb-10 relative transition-colors duration-500"
                  style={{ backgroundColor: item.color }}
                >
                  <h3 className="text-3xl font-black text-[#2a2a2a] mb-2 relative z-10 uppercase tracking-tight">{item.name}</h3>
                  <div className="text-5xl font-black text-[#2a2a2a] relative z-10 flex items-start justify-center drop-shadow-sm">
                    <span className="text-2xl mt-1 opacity-70">{item.currency}</span>
                    <span>{item.price}</span>
                  </div>
                  {/* Wavy bottom shape of header */}
                  <svg className="absolute -bottom-1 left-0 w-full text-[#faf9f6]" viewBox="0 0 100 20" preserveAspectRatio="none" fill="currentColor">
                    <path d="M0 20 L0 10 Q25 20 50 10 T100 10 L100 20 Z" />
                  </svg>
                </div>

                {/* Features List */}
                <div className="p-10 flex-grow flex flex-col justify-between">
                  <ul className="space-y-5 mb-10">
                    {item.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-sm font-semibold text-gray-500 uppercase tracking-wider relative after:content-[''] after:block after:w-12 after:h-[1px] after:bg-gray-200 after:mx-auto after:mt-5 last:after:hidden">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <a 
                    href={item.buttonHref}
                    className="inline-block border-2 border-[#2a2a2a] text-[#2a2a2a] hover:bg-[#2a2a2a] hover:text-white font-bold py-4 px-8 rounded-full transition-colors duration-300 uppercase tracking-widest text-xs"
                  >
                    {item.buttonLabel}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
