import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';
import { Box, TrendingUp, Settings } from 'lucide-react';

const iconMap: Record<string, any> = {
  Box: Box,
  TrendingUp: TrendingUp,
  Settings: Settings
};

export default function Features() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[var(--color-accent)] relative overflow-hidden" id="features">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.features.items.map((feature: any, index: number) => {
            const IconComponent = iconMap[feature.icon] || Box;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-12 text-center shadow-sm hover:shadow-xl transition-shadow duration-300 border-b-4 border-transparent hover:border-[var(--color-primary)]"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-[var(--color-primary)]">
                  <IconComponent size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[var(--color-secondary)] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
