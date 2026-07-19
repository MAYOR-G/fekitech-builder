"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import EditableText from '@/components/editor/blocks/EditableText';
import { useTemplateData } from '../TemplateContext';
import React from 'react';
import { motion } from 'motion/react';


const StorytellingAbout = () => {
  const siteContent = useTemplateData();

  return (
    <section id="about" className="py-24 bg-coffee-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-coffee-dark mb-4"><EditableText section="about" field="headline" value={siteContent?.about?.headline} as="span" /></h2>
            <h3 className="font-sans text-coffee-terracotta tracking-widest uppercase text-sm mb-8"><EditableText section="about" field="subheadline" value={siteContent?.about?.subheadline} as="span" /></h3>
            
            <div className="space-y-6 text-coffee-dark/80 font-light leading-relaxed">
              <p className="text-lg"><EditableText section="about" field="text1" value={siteContent?.about?.text1} as="span" /></p>
              <p className="text-lg"><EditableText section="about" field="text2" value={siteContent?.about?.text2} as="span" /></p>
            </div>
            
            <motion.div 
              className="mt-12 w-full aspect-[21/9] overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <TemplateImage 
                src={siteContent?.about?.secondaryImage}
                alt="Coffee Beans" 
                className="w-full h-full object-cover" 
              />
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="aspect-[4/5] w-full relative overflow-hidden shadow-2xl">
              <motion.div
                className="absolute inset-0 bg-coffee-cream z-10"
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                style={{ originY: 1 }}
              />
              <TemplateImage 
                src={siteContent?.about?.image}
                alt="Barista preparing coffee" 
                className="object-cover w-full h-full"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-coffee-cream -z-10" />
            <div className="absolute -top-8 -right-8 w-32 h-32 border border-coffee-terracotta/30 -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default StorytellingAbout;
