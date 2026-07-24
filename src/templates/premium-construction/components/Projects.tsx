import React, { useState } from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Projects() {
  const data = useTemplateData();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(1); // Default middle one expanded

  return (
    <section className="py-24 bg-white" id="projects">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)]"
        >
          {data.portfolio.title}
        </motion.h2>
      </div>

      <div className="w-full h-[600px] flex overflow-hidden">
        {data.portfolio.items.map((project: any, index: number) => {
          const isActive = hoveredIndex === index;
          return (
            <div
              key={index}
              className="relative h-full transition-all duration-700 ease-in-out cursor-pointer group"
              style={{ flex: isActive ? '3' : '1' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(1)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-100 transition-all duration-700"
              />
              
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-[var(--color-secondary)]/90 via-transparent to-transparent transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              />

              <div 
                className={`absolute bottom-0 left-0 p-10 transform transition-all duration-500 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <p className="text-[var(--color-primary)] font-semibold uppercase tracking-widest text-sm mb-2">
                  {project.category}
                </p>
                <h3 className="text-3xl font-serif font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
