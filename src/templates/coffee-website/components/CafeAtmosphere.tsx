"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { useTemplateData } from '../TemplateContext';


const CafeAtmosphere = () => {
  const siteContent = useTemplateData();
  return (
    <section className="py-24 bg-coffee-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-coffee-dark mb-4">The Atmosphere</h2>
            <p className="font-sans font-light text-coffee-dark/80 max-w-md text-lg">
              A space designed for connection, quiet moments, and the enjoyment of craft coffee.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <button className="text-coffee-terracotta border-b border-coffee-terracotta pb-1 font-sans uppercase tracking-widest text-sm hover:text-coffee-dark hover:border-coffee-dark transition-colors">
              Follow our journey
            </button>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            className="md:w-3/5 aspect-[4/3] md:aspect-auto md:h-[600px] overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <TemplateImage 
              src={siteContent.atmosphere.images[0]} 
              alt="Cafe interior" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
          
          <motion.div 
            className="md:w-2/5 aspect-[4/5] md:aspect-auto md:h-[600px] overflow-hidden md:mt-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TemplateImage 
              src={siteContent.atmosphere.images[1]} 
              alt="Cafe details" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CafeAtmosphere;
