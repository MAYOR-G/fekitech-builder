"use client";
import { useTemplateData } from '../TemplateContext';
import EditableText from '@/components/editor/blocks/EditableText';
import { motion } from 'motion/react';


export default function CoffeeJourney() {
  const siteContent = useTemplateData();

  return (
    <section className="py-32 px-6 bg-brand-black overflow-hidden relative">
      {/* Decorative large circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-brand-cream/5 z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mb-12 md:mb-0"
        >
          <h2 className="text-6xl md:text-8xl lg:text-[9rem] leading-none text-brand-cream/10 text-stroke">
            THE<br/>JOURNEY
          </h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 md:pl-20"
        >
          <p className="text-2xl md:text-3xl leading-relaxed text-brand-cream font-body font-light">
            <EditableText section="journey" field="text" value={siteContent?.journey?.text} as="span" />
          </p>
          <button className="mt-12 border-b border-brand-accent text-brand-accent pb-1 uppercase tracking-widest font-bold hover:text-white hover:border-white transition-colors">
            Read Our Story
          </button>
        </motion.div>
      </div>
    </section>
  );
}
