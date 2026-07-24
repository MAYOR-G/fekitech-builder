import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function CTA() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[var(--color-secondary)] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">
            {data.cta.title}
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            {data.cta.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href={data.cta.buttonHref}
              className="bg-[var(--color-primary)] text-white px-8 py-4 font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors"
            >
              {data.cta.buttonLabel}
            </a>
            <a 
              href={data.cta.secondaryButtonHref}
              className="bg-white text-[var(--color-secondary)] px-8 py-4 font-semibold uppercase tracking-wider hover:bg-gray-100 transition-colors"
            >
              {data.cta.secondaryButtonLabel}
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group cursor-pointer"
        >
          <img 
            src={data.cta.videoImage} 
            alt="Video Thumbnail" 
            className="w-full aspect-[16/9] object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-500"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white flex items-center justify-center text-[var(--color-primary)] shadow-2xl transform transition-transform duration-300 group-hover:scale-110">
              <Play fill="currentColor" size={32} className="ml-2" />
            </div>
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-[var(--color-primary)] p-6 shadow-lg max-w-xs">
            <p className="text-white font-bold text-lg">Top-tier building tools & Premium Materials</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
