import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1A1814]" id="top">
      {/* Background Image Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <span className="text-[#D5B55B] text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
            {hero.note}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-white font-medium tracking-tight leading-[1.1] md:leading-[1.05] mb-8 drop-shadow-lg">
            {hero.title}
          </h1>
          <p className="text-[#E5E0D8] text-base md:text-xl font-light max-w-xl mx-auto mb-12 leading-relaxed">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <a
              href={hero.primaryHref}
              className="w-full sm:w-auto px-10 py-4 bg-[#9B2C3F] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#1A1814] transition-colors duration-500 text-center"
            >
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a
                href={hero.secondaryHref}
                className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/30 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-colors duration-500 text-center"
              >
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#D5B55B]"
          />
        </div>
      </motion.div>
    </section>
  );
}
