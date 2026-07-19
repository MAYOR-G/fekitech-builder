"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useTemplateData } from "../TemplateContext";

const Hero = () => {
  const content = useTemplateData();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-[100dvh] pt-24 md:pt-0 flex flex-col md:flex-row items-center overflow-hidden bg-plumber-bg">
      {/* Left Content */}
      <div className="w-full md:w-[55%] px-6 md:px-12 lg:px-20 z-10 py-12 md:py-0">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
            <span className="h-[1px] w-8 bg-plumber-copper"></span>
            <span className="font-mono text-sm tracking-wider uppercase text-plumber-copper font-medium">
              Precision Engineering
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-plumber-charcoal leading-[1.05] mb-8"
          >
            {content.hero.title}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-plumber-slate leading-relaxed max-w-[55ch] mb-10 text-balance"
          >
            {content.hero.subtitle}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button className="bg-plumber-copper text-white px-8 py-4 text-base font-medium transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-plumber-copper/20 flex items-center justify-center gap-2 group">
              {content.hero.button}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="border border-plumber-charcoal/20 text-plumber-charcoal hover:border-plumber-charcoal hover:bg-plumber-charcoal hover:text-white px-8 py-4 text-base font-medium transition-all duration-300">
              Emergency Response
            </button>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-16 flex items-center gap-8 font-mono text-sm text-plumber-slate">
            <div>
              <span className="block text-2xl font-display font-bold text-plumber-charcoal mb-1">100%</span>
              Code Compliant
            </div>
            <div className="w-[1px] h-10 bg-plumber-slate/20"></div>
            <div>
              <span className="block text-2xl font-display font-bold text-plumber-charcoal mb-1">24/7</span>
              Emergency Dispatch
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-[45%] h-[50vh] md:h-[100dvh] relative overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 w-full h-full"
        >
          <TemplateImage 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" 
            alt="Pristine copper pipework installation" 
            className="w-full h-full object-cover object-center filter contrast-125 saturate-50"
          />
          {/* Subtle gradient overlay for text readability on smaller screens if they stack */}
          <div className="absolute inset-0 bg-gradient-to-t from-plumber-bg via-transparent to-transparent md:hidden"></div>
          {/* Edge gradient to blend split screen slightly on desktop */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-plumber-bg to-transparent hidden md:block"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
