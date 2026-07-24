import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Banner() {
  const data = useTemplateData();

  return (
    <section className="relative py-32 bg-[var(--color-secondary)] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={data.banner.backgroundImage} 
          alt="Banner Background" 
          className="w-full h-full object-cover filter brightness-50 opacity-50"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center text-white">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight max-w-4xl mx-auto"
        >
          {data.banner.title}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          {data.banner.subtitle}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a 
            href={data.banner.buttonHref}
            className="inline-block bg-[var(--color-primary)] text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-[var(--color-primary)] transition-colors duration-300 shadow-xl"
          >
            {data.banner.buttonLabel}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
