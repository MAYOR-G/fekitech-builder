"use client";
import { useTemplateData } from '../TemplateContext';
import EditableText from '@/components/editor/blocks/EditableText';
import { motion } from 'motion/react';


export default function BaristaSchool() {
  const siteContent = useTemplateData();

  return (
    <section className="py-40 px-6 bg-brand-black">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
        <div className="w-full lg:w-7/12 relative mt-16 lg:mt-0">
          <motion.img 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src={siteContent?.barista?.image1} 
            alt="Barista Training" 
            className="w-full aspect-[4/3] object-cover"
          />
          <motion.img 
            initial={{ opacity: 0, x: 50, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            src={siteContent?.barista?.image2} 
            alt="Latte Art" 
            className="absolute -top-16 -right-8 md:-right-16 w-1/2 aspect-square object-cover border-8 border-brand-black shadow-2xl"
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-5/12 lg:pl-12"
        >
          <h2 className="text-5xl md:text-7xl mb-8 leading-tight"><EditableText section="barista" field="title" value={siteContent?.barista?.title} as="span" /></h2>
          <p className="text-lg text-brand-cream/80 mb-12"><EditableText section="barista" field="text" value={siteContent?.barista?.text} as="span" /></p>
          <button className="border border-brand-cream text-brand-cream px-8 py-4 uppercase font-bold tracking-widest hover:bg-brand-cream hover:text-brand-black transition-colors duration-300">
            Book a Class
          </button>
        </motion.div>
      </div>
    </section>
  );
}
