"use client";
import { useTemplateData } from '../TemplateContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';


export default function ServicesList() {
  const siteContent = useTemplateData();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-brand-cream">OUR SERVICES</h2>
          <div className="w-16 h-1 bg-brand-accent"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {siteContent.services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="py-8 border-b border-white/10 flex justify-between items-center cursor-pointer group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-heading uppercase group-hover:text-brand-accent transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-brand-cream/60 mt-2 font-light">{service.description}</p>
                </div>
                <div className="text-xl font-heading text-brand-cream/40 group-hover:text-brand-cream transition-colors duration-300">
                  {service.price}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Desktop Hover Preview Image */}
          <div className="hidden lg:block w-1/2 relative h-[600px] sticky top-32">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null ? (
                <motion.img
                  key={hoveredIndex}
                  src={siteContent.services[hoveredIndex].image}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover rounded-sm"
                  alt={`${siteContent.services[hoveredIndex].name} service preview`}
                  decoding="async"
                />
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-brand-charcoal flex items-center justify-center rounded-sm border border-white/5"
                >
                  <p className="text-brand-cream/30 font-heading tracking-widest uppercase text-lg">Hover to preview</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
