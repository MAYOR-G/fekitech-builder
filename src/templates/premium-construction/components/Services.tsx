import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export default function Services() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[var(--color-accent)] relative overflow-hidden" id="services">
      {/* Watermark text */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-5">
        <h2 className="text-[12rem] font-black font-sans uppercase whitespace-nowrap text-[var(--color-secondary)]">
          {data.services.watermark}
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 pt-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)]"
          >
            {data.services.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.services.items.map((service: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden bg-white shadow-lg"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay box on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="bg-white p-6 w-full transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <a href="#" className="inline-block border border-gray-200 px-6 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors">
                      More Details
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between border-t border-gray-100 group-hover:bg-[var(--color-primary)] transition-colors duration-300">
                <h3 className="text-xl font-bold font-serif text-[var(--color-secondary)] group-hover:text-white transition-colors duration-300">
                  <span className="text-[var(--color-primary)] group-hover:text-white/80 mr-2 text-sm">
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  {service.title}
                </h3>
                <span className="text-[var(--color-primary)] group-hover:text-white transition-colors duration-300">
                  <Plus size={24} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
