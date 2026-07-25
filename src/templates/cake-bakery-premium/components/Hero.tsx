import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const { hero, colors } = useTemplateData();

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden" id="top">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image}
          alt={hero.imageAlt || "Hero background"}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 w-full flex flex-col items-center text-center relative z-10 mt-16">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full flex flex-col items-center"
        >
          <span className="text-white/80 text-[11px] font-medium uppercase tracking-[0.3em] mb-6 block">
            {hero.note}
          </span>
          <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white font-medium leading-[0.95] mb-8 drop-shadow-lg">
            {hero.title.split(' ').map((word: string, i: number) => (
              <span key={i} className={i % 2 !== 0 ? "italic text-white/90" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light mb-12 leading-relaxed max-w-2xl drop-shadow-md">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href={hero.primaryHref}
              className="px-10 py-4 text-[12px] font-medium uppercase tracking-[0.15em] transition-colors rounded-full text-center"
              style={{ backgroundColor: colors.secondary, color: colors.text }}
            >
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a
                href={hero.secondaryHref}
                className="px-10 py-4 bg-transparent text-white text-[12px] font-medium uppercase tracking-[0.15em] hover:text-white/70 transition-colors relative after:content-[''] after:absolute after:bottom-3 after:left-10 after:right-10 after:h-[1px] after:bg-current text-center"
              >
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="absolute -bottom-24 right-4 md:right-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-full shadow-2xl z-20 w-32 h-32 flex items-center justify-center text-center hidden md:flex"
        >
          <span className="font-serif text-sm font-semibold tracking-wide text-white">
            {hero.badge}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
