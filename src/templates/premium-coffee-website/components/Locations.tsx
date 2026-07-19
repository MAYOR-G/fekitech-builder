"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';


export default function Locations() {
  const siteContent = useTemplateData();

  return (
    <section className="py-32 px-6 bg-brand-cream text-brand-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl mb-20 text-center">LOCATIONS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.locations.map((loc, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden aspect-square"
            >
              <TemplateImage 
                src={loc.image} 
                alt={loc.city} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-brand-black/80 to-transparent">
                <h3 className="text-3xl text-white group-hover:text-brand-accent transition-colors">{loc.city}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
