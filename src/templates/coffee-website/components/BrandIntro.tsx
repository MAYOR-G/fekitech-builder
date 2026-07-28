"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Flame, Globe, Coffee, Sofa } from 'lucide-react';
import { useTemplateData } from '../TemplateContext';


const IconMap: Record<string, React.ElementType> = {
  Flame,
  Globe,
  Coffee,
  Sofa
};

const BrandIntro = () => {
  const siteContent = useTemplateData();
  return (
    <section className="py-12 bg-artisan-coffee-coffee-cream text-artisan-coffee-coffee-dark border-b border-artisan-coffee-coffee-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-artisan-coffee-coffee-brown/20">
          {siteContent.brandIntro.features.map((feature, index) => {
            const Icon = IconMap[feature.icon];
            return (
              <motion.div 
                key={index}
                className={`flex flex-col items-center justify-center text-center ${index > 1 ? 'pt-8 md:pt-0' : ''} ${index % 2 !== 0 && index < 2 ? 'pt-0' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="mb-4 text-artisan-coffee-coffee-terracotta">
                  {Icon && <Icon size={32} strokeWidth={1.5} />}
                </div>
                <h3 className="font-artisan-coffee-sans font-medium text-sm tracking-widest uppercase text-artisan-coffee-coffee-dark/80">
                  {feature.title}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandIntro;
