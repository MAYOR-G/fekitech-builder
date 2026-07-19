"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { useTemplateData } from "../TemplateContext";

const Hero = () => {
  const content = useTemplateData();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gym-darker">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {/* Using a high-quality Unsplash image as placeholder */}
        <TemplateImage 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym interior with barbell" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-20">
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-black font-display leading-[0.9] tracking-tighter uppercase mb-6"
          >
            {content.hero.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-gray-300 font-medium mb-10 max-w-2xl leading-relaxed"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4"
          >
            <button className="bg-gym-accent text-gym-darker font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-gym-accentHover transition-colors group">
              {content.hero.button}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="glass-panel text-white font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white/10 transition-colors">
              <Play className="w-5 h-5 fill-current" />
              Watch Studio Tour
            </button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest font-bold text-gray-400">Scroll</span>
        <div className="w-[2px] h-12 bg-white/20 overflow-hidden">
          <motion.div 
            animate={{ y: [-48, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-gym-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
