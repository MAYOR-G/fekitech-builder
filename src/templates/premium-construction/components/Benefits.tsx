import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Benefits() {
  const data = useTemplateData();

  return (
    <section className="bg-[var(--color-primary)] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {data.benefits.map((benefit: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col"
            >
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">{benefit.title}</h3>
              <p className="text-white/80 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
