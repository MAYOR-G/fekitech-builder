import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const data = useTemplateData();

  return (
    <section className="relative min-h-[95vh] flex items-center pt-32 pb-24 overflow-hidden bg-[#faf9f6]">
      {/* Abstract Background blobs */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] rounded-full bg-[var(--color-secondary)] opacity-15 blur-3xl" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left pt-12 lg:pt-0"
        >
          <div className="inline-block px-6 py-2 rounded-full border border-[var(--color-secondary)] bg-white/50 backdrop-blur-sm mb-6">
            <span className="font-semibold text-sm tracking-widest uppercase text-[var(--color-secondary)]">{data.hero.kicker}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-[#2a2a2a] leading-[1.05] mb-8 tracking-tighter uppercase font-nunito">
            {data.hero.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
            {data.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
            <a href={data.navigation.ctaHref} className="bg-[#2a2a2a] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[var(--color-primary)] hover:text-[#2a2a2a] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              {data.navigation.ctaLabel}
            </a>
            <a href="#menu" className="text-[#2a2a2a] px-8 py-5 font-bold text-lg hover:text-[var(--color-secondary)] transition-colors duration-300 flex items-center gap-2 group">
              View Our Menu
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="flex-1 w-full max-w-xl lg:max-w-none relative mt-12 lg:mt-0"
        >
          {/* Main Hero Image with organic border radius */}
          <div className="relative aspect-[4/5] w-full max-w-lg mx-auto">
            {/* Spinning decorative background blobs */}
            <div className="absolute inset-0 bg-[var(--color-secondary)] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] scale-[1.08] opacity-20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-0 bg-[var(--color-primary)] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] scale-[1.05] opacity-30 animate-[spin_15s_linear_infinite_reverse]" />
            
            <img 
              src={data.hero.backgroundImage} 
              alt={data.hero.title}
              className="absolute inset-0 w-full h-full object-cover rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-2xl z-10"
              style={{ objectPosition: 'center' }}
            />
            
            {/* Floating badge */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-full shadow-2xl flex flex-col items-center justify-center w-36 h-36 border-4 border-white z-20"
            >
              <span className="font-pacifico text-4xl text-[var(--color-secondary)] leading-none">100%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Natural</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
