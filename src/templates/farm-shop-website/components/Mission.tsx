import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Mission() {
  const data = useTemplateData();
  const { mission } = data;

  return (
    <section className="py-24 px-8 md:px-16 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative circle */}
      <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-64 h-64 rounded-full bg-[#E2CD88] opacity-50 z-0 pointer-events-none" />
      <div className="absolute top-1/4 right-[20%] w-32 h-32 rounded-full bg-[#EAF5E1] opacity-70 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
        
        {/* Image side */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden">
            <img 
              src={mission?.image} 
              alt="Farm Mission" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Text side */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-[#548D4E] uppercase mb-4 block">
            {mission?.tagline}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1E201E] leading-tight mb-6">
            {mission?.headline}
          </h2>
          <p className="text-[#5C5C5C] font-sans text-lg mb-12 leading-relaxed">
            {mission?.description}
          </p>

          <div className="space-y-8 mb-12">
            {mission?.points?.map((point: any, index: number) => (
              <div key={index}>
                <h3 className="text-xl font-serif font-medium text-[#1E201E] mb-2">
                  {point.number} / {point.title}
                </h3>
                <p className="text-[#5C5C5C] font-sans text-sm leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-4 bg-[#1E201E] text-white rounded-full font-medium hover:bg-[#333] transition-colors">
              {mission?.primaryCTA}
            </button>
            <button className="px-8 py-4 bg-[#EBE7DF] text-[#1E201E] rounded-full font-medium hover:bg-[#E2CD88] transition-colors">
              {mission?.secondaryCTA}
            </button>
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
