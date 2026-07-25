import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" id="top">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#3C2A21]/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 lg:px-12 pt-32 pb-20 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-[#F7F5F0] text-[11px] font-bold uppercase tracking-[0.3em] mb-8 bg-[#556B2F] px-5 py-2 rounded-full">
            {hero.note}
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] tracking-tight text-white mb-8 drop-shadow-sm">
            {hero.title.split(' ').map((word, i) => (
              <span key={i} className={i === 1 || i === 4 ? "italic font-light opacity-90 text-[#F7F5F0]" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-2xl mb-12 drop-shadow-sm">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={hero.primaryHref}
              className="px-10 py-5 bg-[#F7F5F0] text-[#3C2A21] text-[12px] uppercase tracking-[0.2em] font-bold hover:bg-[#556B2F] hover:text-white transition-colors"
            >
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a
                href={hero.secondaryHref}
                className="text-[12px] uppercase tracking-[0.2em] font-medium text-white hover:text-[#E3E0D6] transition-colors pb-1 border-b border-white hover:border-[#E3E0D6]"
              >
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
