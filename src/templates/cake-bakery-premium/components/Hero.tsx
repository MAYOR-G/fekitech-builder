import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative min-h-[90vh] w-full pt-32 pb-16 flex items-center justify-center overflow-hidden" id="top">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F3E8DF] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-xl"
        >
          <span className="text-[#E2A499] text-[11px] font-medium uppercase tracking-[0.25em] mb-6 block">
            {hero.note}
          </span>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#3D3A35] font-medium leading-[0.95] mb-8">
            {hero.title.split(' ').map((word, i) => (
              <span key={i} className={i % 2 !== 0 ? "italic text-[#B89B95]" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-[#6D6A61] text-lg font-light mb-12 leading-relaxed max-w-md">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={hero.primaryHref}
              className="px-10 py-4 bg-[#3D3A35] text-white text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-[#E2A499] transition-colors rounded-full text-center"
            >
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a
                href={hero.secondaryHref}
                className="px-10 py-4 bg-transparent text-[#3D3A35] text-[12px] font-medium uppercase tracking-[0.15em] hover:text-[#E2A499] transition-colors relative after:content-[''] after:absolute after:bottom-3 after:left-10 after:right-10 after:h-[1px] after:bg-current text-center"
              >
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[600px] lg:h-[750px] w-full"
        >
          <div className="absolute inset-4 rounded-[2rem] border border-[#E2A499]/30 -rotate-3 transition-transform duration-700 hover:rotate-0" />
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10"
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-full shadow-xl z-20 w-32 h-32 flex items-center justify-center text-center">
            <span className="font-serif text-sm font-semibold tracking-wide text-[#3D3A35]">
              {hero.badge}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
