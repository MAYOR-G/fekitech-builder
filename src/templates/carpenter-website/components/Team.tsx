"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Team() {
  const data = useTemplateData();
  
  if (!data.team) return null;

  return (
    <section id="team" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">{data.team.kicker}</span>
            <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)]">
            {data.team.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.team.items.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative overflow-hidden bg-white"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <a href="#" className="w-10 h-10 bg-[var(--color-primary)] flex items-center justify-center text-white rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75 hover:bg-white hover:text-[var(--color-primary)]">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[var(--color-primary)] flex items-center justify-center text-white rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150 hover:bg-white hover:text-[var(--color-primary)]">
                    <Instagram size={18} />
                  </a>
                  <a href="#" className="w-10 h-10 bg-[var(--color-primary)] flex items-center justify-center text-white rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 hover:bg-white hover:text-[var(--color-primary)]">
                    <Linkedin size={18} />
                  </a>
                </div>
              </div>
              <div className="p-6 text-center border-b-4 border-transparent group-hover:border-[var(--color-primary)] transition-colors duration-300">
                <h3 className="text-2xl font-bold font-serif text-[var(--color-secondary)] mb-1">{member.name}</h3>
                <p className="text-[var(--color-primary)] uppercase tracking-wider text-xs font-bold">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
