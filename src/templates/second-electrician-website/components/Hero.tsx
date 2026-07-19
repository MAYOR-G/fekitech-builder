"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTemplateData } from "../TemplateContext";

const images = [
  "/images/hero.png",
  "/images/hero-2.png",
  "/images/hero-3.png"
];

const Hero = () => {
  const content = useTemplateData();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-end bg-white overflow-hidden">
      
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.img
            key={currentImg}
            src={images[currentImg]}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 3.5, ease: "linear" } }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="VoltEdge Premium Infrastructure"
          />
        </AnimatePresence>
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/60 lg:via-white/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-80 lg:hidden"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex items-center pt-32 pb-16">
        <div className="w-full lg:w-3/4 xl:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-[96px] tracking-tighter text-electric-charcoal leading-[0.95] mb-8 uppercase">
              {content.hero.title}
            </h1>
            
            <p className="text-electric-slate text-lg max-w-[55ch] mb-12">
              {content.hero.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#infrastructure" className="bg-electric-amber text-electric-charcoal px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-electric-charcoal hover:text-white transition-colors text-center relative overflow-hidden group">
                <span className="relative z-10">{content.hero.button}</span>
                <div className="absolute inset-0 bg-electric-charcoal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">{content.hero.button}</span>
              </a>
              <a href="#contact" className="bg-white border-2 border-electric-charcoal text-electric-charcoal px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-electric-charcoal hover:text-white transition-all text-center relative overflow-hidden group">
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Request Dispatch</span>
                <div className="absolute inset-0 bg-electric-charcoal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-20 bg-white border-t border-electric-stone/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-electric-stone/10 border-x border-electric-stone/10">
            {[
              { num: "100%", label: "Safety Record" },
              { num: "30 Min", label: "Response" },
              { num: "1,200+", label: "Installations" },
              { num: "NICEIC", label: "Certified" },
            ].map((stat, i) => (
              <div key={i} className="p-6 md:p-8 text-center flex flex-col justify-center bg-white hover:bg-electric-surface transition-colors">
                <span className="font-mono text-electric-amber font-bold text-2xl md:text-3xl mb-1">{stat.num}</span>
                <span className="font-sans text-electric-slate text-xs uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
