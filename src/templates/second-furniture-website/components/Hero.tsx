"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTemplateData } from "../TemplateContext";

const Hero = () => {
  const content = useTemplateData();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, staggerChildren: 0.2 }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex flex-col md:flex-row overflow-hidden bg-[#F5F0E8] pt-[80px] md:pt-0">
      
      {/* Left Content - 40% */}
      <div className="w-full md:w-[40%] flex flex-col justify-center px-6 md:px-12 lg:px-16 xl:px-20 z-10 pt-[80px] md:pt-[100px] pb-12 md:pb-0">
        <motion.div 
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col w-full mx-auto md:mx-0"
        >
          {/* Label */}
          <motion.div variants={textVariants} className="flex items-center gap-4 mb-[24px]">
            <span className="font-mono text-[11px] md:text-[13px] uppercase tracking-[0.15em] text-[#8C857B]">
              Atelier Edition 04
            </span>
            <div className="h-[1px] w-[40px] bg-[#8C857B]/40"></div>
          </motion.div>
          
          {/* Headline */}
          <motion.h1 
            variants={textVariants}
            className="font-display text-[#1A1A1A] leading-[1.0] mb-[32px] flex flex-col"
          >
            <span className="font-bold text-[64px] md:text-[76px] lg:text-[90px] xl:text-[100px] relative inline-block self-start">
              {content.hero.title}
              {/* Animated underline */}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 h-[2px] md:h-[4px] bg-[#B45309] max-w-[80px] md:max-w-[120px]"
              />
            </span>
          </motion.h1>
          
          {/* Body */}
          <motion.p 
            variants={textVariants}
            className="font-sans text-[15px] md:text-[18px] lg:text-[20px] leading-[1.7] text-[#3D3D3D] max-w-[32ch] lg:max-w-[40ch] mb-[32px]"
          >
            {content.hero.subtitle}
          </motion.p>
          
          {/* CTA */}
          <motion.div variants={textVariants}>
            <a href="#collections" className="inline-flex flex-col items-start group">
              <div className="flex items-center gap-2 font-sans text-[13px] md:text-[15px] uppercase tracking-[0.1em] text-[#1A1A1A]">
                {content.hero.button}
                <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
              <div className="h-[1px] w-0 bg-[#B45309] transition-all duration-500 ease-out group-hover:w-full mt-1"></div>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Image - 60% */}
      <div className="w-full md:w-[60%] h-[60vh] md:h-[100dvh] relative overflow-hidden bg-[#F5F0E8]">
        {/* Fade gradient from left */}
        <div className="absolute inset-y-0 left-0 w-[60px] bg-gradient-to-r from-[#F5F0E8] to-transparent z-10 hidden md:block"></div>
        
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <motion.img 
            initial={{ scale: 1.0 }}
            animate={{ scale: 1.03 }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            src="https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=2000" 
            alt="Monumental walnut dining table in concrete space" 
            className="w-full h-full object-cover object-center filter contrast-110 sepia-[.1]"
          />
        </motion.div>
      </div>
      
    </section>
  );
};

export default Hero;
