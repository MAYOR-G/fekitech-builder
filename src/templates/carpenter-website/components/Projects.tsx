"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Projects() {
  const data = useTemplateData();

  return (
    <section id="projects" className="py-24 bg-[var(--color-secondary)]">
      <div className="container mx-auto px-4 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
              <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">{data.projects.kicker}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              {data.projects.title}
            </h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-white border-b border-[var(--color-primary)] pb-1 hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest text-xs font-bold w-max">
            View All Projects <Plus size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.projects.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1 }}
              className="relative overflow-hidden group aspect-[4/5]"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-2 block">{item.category}</span>
                <h3 className="text-2xl font-serif text-white font-bold">{item.title}</h3>
              </div>
              
              <div className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                <Plus size={20} />
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
