import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function About() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about">
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-y-0 left-0 w-1/3 opacity-5 hidden md:block">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-[var(--color-secondary)]">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img 
            src={data.about.image} 
            alt="About Us" 
            className="w-full h-[600px] object-cover rounded shadow-2xl"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <div className="bg-[var(--color-accent)] p-8 md:p-12 mb-8 relative">
            {/* Background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.03] text-8xl font-black uppercase text-[var(--color-secondary)] whitespace-nowrap">
              {data.brand.logoText}
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-serif font-bold text-[var(--color-secondary)] mb-6 relative z-10"
            >
              {data.about.title}
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 leading-relaxed relative z-10"
            >
              {data.about.description}
            </motion.p>
          </div>

          <div className="space-y-4 mb-10 pl-4 md:pl-12">
            {data.about.items.map((item: string, index: number) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                className="flex items-center text-lg font-semibold text-[var(--color-secondary)] pb-4 border-b border-gray-100 last:border-0"
              >
                <span className="text-[var(--color-primary)] mr-4">{index + 1}.</span>
                {item}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="pl-4 md:pl-12"
          >
            <a 
              href={data.about.buttonHref}
              className="inline-block bg-[var(--color-primary)] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors"
            >
              {data.about.buttonLabel}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
