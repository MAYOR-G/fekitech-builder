"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { useTemplateData } from "../TemplateContext";

export default function Hero() {
  const content = useTemplateData();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <TemplateImage
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="Warm aspirational family home at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center mt-12 md:mt-0 flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
            className="font-serif text-[40px] leading-[1.1] md:text-[64px] lg:text-[80px] text-white tracking-tight"
          >
            {content.hero.title}
          </motion.h1>
        </div>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="text-[17px] text-white/80 font-normal max-w-2xl mx-auto mt-6 mb-10 leading-[1.6]"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <a href="#" className="w-full sm:w-auto bg-gold text-white px-8 py-4 text-[13px] uppercase tracking-cta font-medium hover:bg-gold-hover hover:scale-[1.03] transition-all duration-200 rounded-full shadow-lg">
            {content.hero.button}
          </a>
          <a href="#" className="w-full sm:w-auto bg-transparent border border-white text-white px-8 py-4 text-[13px] uppercase tracking-cta font-medium hover:bg-white hover:text-charcoal transition-all duration-200 rounded-full">
            View Properties
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
          className="mt-16 flex flex-wrap items-center justify-center space-x-3 text-[11px] md:text-[13px] uppercase tracking-widest text-white/90 font-medium"
        >
          <span>Property Sales</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span>Lettings</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span>Free Valuation</span>
          <span className="w-1 h-1 rounded-full bg-gold hidden sm:block"></span>
          <span className="hidden sm:block">Landlord Management</span>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-[10px] uppercase tracking-widest text-white/50 mb-2">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gold"
        />
      </motion.div>
    </section>
  );
}
