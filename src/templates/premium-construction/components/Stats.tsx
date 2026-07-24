import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Stats() {
  const data = useTemplateData();

  return (
    <section className="py-20 bg-[var(--color-secondary)] text-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-700/50">
          {data.stats.map((stat: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`pt-8 md:pt-0 ${index !== 0 ? 'md:pl-8' : ''}`}
            >
              <div className="text-5xl font-serif font-bold text-[var(--color-primary)] mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
