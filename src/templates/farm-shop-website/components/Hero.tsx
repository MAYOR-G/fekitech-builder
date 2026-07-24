import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const data = useTemplateData();
  const { hero } = data;

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row overflow-hidden bg-[#FDFBF7]">
      {/* Decorative circle */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] md:w-[45vw] md:h-[45vw] rounded-full bg-[#EAF5E1] opacity-70 blur-3xl mix-blend-multiply pointer-events-none" />
      
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-10 lg:px-24 pt-32 pb-16 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-[#548D4E] uppercase mb-6 block">
            {hero?.tagline}
          </span>
          <h1 className="text-5xl md:text-5xl lg:text-7xl font-serif font-medium text-[#1E201E] leading-[1.1] mb-6">
            {hero?.headline}
          </h1>
          <p className="text-[#5C5C5C] text-lg md:text-base lg:text-lg mb-10 leading-relaxed font-sans max-w-md">
            {hero?.subheadline}
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-6 lg:px-8 py-3 lg:py-4 bg-[#1E201E] text-white rounded-full font-medium hover:bg-[#333] transition-colors text-sm lg:text-base">
              {hero?.primaryCTA}
            </button>
            <button className="px-6 lg:px-8 py-3 lg:py-4 bg-[#EBE7DF] text-[#1E201E] rounded-full font-medium hover:bg-[#E2CD88] transition-colors text-sm lg:text-base">
              {hero?.secondaryCTA}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen relative">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full h-full absolute inset-0"
        >
          <img 
            src={hero?.image} 
            alt="Fresh Market Produce" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Decorative circle on image */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-[#E2CD88] z-20" />
      </div>
    </section>
  );
}
