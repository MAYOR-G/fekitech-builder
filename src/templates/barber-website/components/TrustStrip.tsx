"use client";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';


export default function TrustStrip() {
  const siteContent = useTemplateData();

  return (
    <section className="bg-brand-black py-12 px-6 border-b border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {siteContent.trust.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center md:text-left"
            >
              <h3 className="text-brand-accent font-heading text-lg md:text-xl tracking-wider mb-2 uppercase">{item.title}</h3>
              <p className="text-brand-cream/60 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
