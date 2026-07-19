"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';
import { useTemplateData } from "../TemplateContext";

export default function Hero() {
  const content = useTemplateData();

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <TemplateImage 
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Financial Advisory Meeting" 
          className="w-full h-full object-cover" 
        />
        {/* Adjusted overlays for a warmer, less imposing feel */}
        <div className="absolute inset-0 bg-forest-900/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 via-forest-900/40 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-gold-500"></span>
            Strategic Financial Advisory
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl text-white mb-8 leading-[1.1]"
          >
            {content.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-lg md:text-xl text-white/90 font-light mb-12 max-w-xl leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <a href="#contact" className="bg-gold-500 text-forest-900 px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white transition-colors text-center shadow-2xl">
              {content.hero.button}
            </a>
            <a href="#expertise" className="border border-white/30 text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-white/10 transition-colors text-center backdrop-blur-sm">
              Explore Expertise
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
