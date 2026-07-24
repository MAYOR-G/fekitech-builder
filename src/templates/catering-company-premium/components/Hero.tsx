import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden" id="top">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2 flex flex-col items-start pt-10"
          >
            <span className="text-[#556B2F] text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
              {hero.note}
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-[#3C2A21] mb-8">
              {hero.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 || i === 4 ? "italic text-[#556B2F]" : ""}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-[#3C2A21]/70 text-lg leading-relaxed max-w-md mb-12">
              {hero.description}
            </p>
            <div className="flex items-center gap-6">
              <a
                href={hero.primaryHref}
                className="px-10 py-4 bg-[#3C2A21] text-[#F7F5F0] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#556B2F] transition-colors"
              >
                {hero.primaryLabel}
              </a>
              {hero.secondaryLabel && (
                <a
                  href={hero.secondaryHref}
                  className="text-[12px] uppercase tracking-[0.2em] font-medium text-[#3C2A21] hover:text-[#556B2F] transition-colors pb-1 border-b border-[#3C2A21]"
                >
                  {hero.secondaryLabel}
                </a>
              )}
            </div>
          </motion.div>

          <div className="lg:w-1/2 relative w-full h-[600px] lg:h-[800px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 z-10"
            >
              <img
                src={hero.image}
                alt={hero.imageAlt}
                className="w-full h-full object-cover rounded-tl-[100px] rounded-br-[100px]"
              />
            </motion.div>
            
            {/* Organic shape accents */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#E3E0D6] rounded-full blur-3xl opacity-60 z-0" />
            <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#DCE2CB] rounded-full blur-3xl opacity-60 z-0" />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1/4 -left-12 z-20 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl max-w-[200px]"
            >
              <p className="font-serif text-[#3C2A21] text-lg leading-snug">
                {hero.badge}
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
