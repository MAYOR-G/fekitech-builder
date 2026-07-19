"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import EditableText from '@/components/editor/blocks/EditableText';
import { motion } from 'motion/react';


export default function About() {
  const siteContent = useTemplateData();

  return (
    <section className="py-24 md:py-32 px-6 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <TemplateImage
            src={siteContent?.about?.image}
            alt="Modern barber studio interior with a professional styling chair"
            decoding="async"
            className="w-full aspect-[4/5] object-cover rounded-sm shadow-2xl"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-8 leading-tight">
            <EditableText section="about" field="headline" value={siteContent?.about?.headline} as="span" />
          </h2>
          <p className="text-lg text-brand-cream/70 leading-relaxed font-light">
            <EditableText section="about" field="text" value={siteContent?.about?.text} as="span" />
          </p>
          <div className="mt-12">
            <TemplateImage src="/studio-signature.svg" alt="Studio founder signature" decoding="async" className="h-16 opacity-50 invert" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
