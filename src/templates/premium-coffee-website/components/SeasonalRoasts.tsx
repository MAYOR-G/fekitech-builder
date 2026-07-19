"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

export default function SeasonalRoasts() {
  return (
    <section className="py-32 px-6 bg-brand-charcoal text-brand-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl mb-6"
        >
          MEET THE SEASONAL ROASTS
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg opacity-80 mb-20"
        >
          Limited edition small batches, roasted to highlight the unique characteristics of each harvest.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto text-left">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] bg-brand-black overflow-hidden mb-8 relative">
              <TemplateImage src="https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=800" alt="Winter Blend" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
            <h3 className="text-3xl mb-2">Winter Solstice Blend</h3>
            <p className="opacity-60 mb-4 uppercase tracking-widest text-sm">Plum, Dark Chocolate, Molasses</p>
            <span className="text-brand-accent uppercase tracking-widest font-bold">Discover &rarr;</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group cursor-pointer md:mt-24"
          >
            <div className="aspect-[4/5] bg-brand-black overflow-hidden mb-8 relative">
              <TemplateImage src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=800" alt="Spring Blend" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
            <h3 className="text-3xl mb-2">Spring Equinox Reserve</h3>
            <p className="opacity-60 mb-4 uppercase tracking-widest text-sm">Jasmine, White Peach, Honey</p>
            <span className="text-brand-accent uppercase tracking-widest font-bold">Discover &rarr;</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}