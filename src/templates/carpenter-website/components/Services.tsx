"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Hammer, Ruler, Drill, Table } from "lucide-react";

const icons = [Hammer, Ruler, Table, Drill];

export default function Services() {
  const data = useTemplateData();

  return (
    <section id="services" className="py-24 bg-[var(--color-accent)] relative z-10">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">{data.services.kicker}</span>
            <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)]">
            {data.services.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.services.items.map((service, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center rounded-sm relative overflow-hidden"
              >
                {/* Hover overlay border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--color-primary)] transition-colors duration-300 pointer-events-none"></div>
                
                <div className="w-20 h-20 bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-primary)] mb-6 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300 transform group-hover:-translate-y-2 rounded-tl-xl rounded-br-xl relative z-10">
                  <Icon size={36} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-lg font-serif font-bold text-[var(--color-secondary)] mb-4 group-hover:text-[var(--color-primary)] transition-colors">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                
                <a href="#" className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  Read More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
