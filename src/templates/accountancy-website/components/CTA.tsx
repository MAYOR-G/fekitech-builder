"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section id="contact" className="relative py-40 bg-forest-900 text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Using a bright, clean office background for a less "dark corporate" feel, but heavily overlaid to ensure text pops */}
        <TemplateImage 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Office Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay grayscale" 
        />
        <div className="absolute inset-0 bg-forest-900/80"></div>
      </div>
      
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight"
        >
          Elevate Your <br/>Financial Position.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/80 font-light mb-12"
        >
          Schedule a private consultation to discuss your corporate strategy.
        </motion.p>
        <motion.a 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          href="mailto:hello@ledgerco.uk" 
          className="inline-block bg-gold-500 text-forest-900 px-12 py-5 text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors shadow-2xl"
        >
          Book Consultation
        </motion.a>
      </div>
    </section>
  );
}
