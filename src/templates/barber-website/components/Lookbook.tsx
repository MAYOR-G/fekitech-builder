"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';


export default function Lookbook() {
  const siteContent = useTemplateData();

  // Use first 4 styles for the grid
  const gallery = siteContent.styles.slice(0, 4);

  return (
    <section id="lookbook" className="py-24 px-6 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading mb-4 text-brand-cream">THE LOOKBOOK</h2>
          <p className="text-brand-cream/60 max-w-xl mx-auto">Curated styles from our latest sessions.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gallery.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <TemplateImage 
                src={item.image} 
                alt={item.name} 
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <span className="text-2xl font-heading uppercase tracking-widest text-brand-cream translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
