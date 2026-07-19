"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';

import { ArrowRightLeft } from 'lucide-react';

export default function Transformations() {
  const siteContent = useTemplateData();

  return (
    <section className="py-24 px-6 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-brand-cream">TRANSFORMATIONS</h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto">Hover to reveal the process.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {siteContent.transformations.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative aspect-video overflow-hidden rounded-sm group cursor-ew-resize"
            >
              {/* Before Image (Always at bottom) */}
              <TemplateImage 
                src={item.before} 
                alt={`Before ${item.label}`} 
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-brand-black/80 backdrop-blur-sm text-brand-cream px-3 py-1 text-xs uppercase font-bold tracking-widest">
                Before
              </div>
              
              {/* After Image (Revealed on hover) */}
              <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out">
                <TemplateImage 
                  src={item.after} 
                  alt={`After ${item.label}`} 
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-brand-accent text-brand-black px-3 py-1 text-xs uppercase font-bold tracking-widest z-10">
                  After
                </div>
              </div>

              {/* Center icon indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                <div className="bg-brand-black/50 backdrop-blur-md p-3 rounded-full text-brand-cream border border-white/10">
                  <ArrowRightLeft size={24} />
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="bg-brand-black/80 backdrop-blur-sm text-brand-cream px-4 py-2 text-sm uppercase tracking-widest inline-block shadow-xl">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
