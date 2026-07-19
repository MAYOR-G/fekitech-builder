"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useTemplateData } from "../TemplateContext";

export default function Hero() {
  const content = useTemplateData();
  const words = content.hero.title.split(/\s+/);

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Background with ultra-slow zoom */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.06 }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero.png" // Atmospheric spa image
          alt="Atmospheric steam rising from a stone pool"
          fill sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,45,35,0.7)] via-transparent to-[rgba(45,60,50,0.1)]" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-4xl mx-auto text-center mt-12">
        
        {/* Staggered Headline */}
        <h1 className="font-serif text-white font-light text-[72px] md:text-[90px] lg:text-[110px] leading-[1.05] tracking-[-0.02em] flex flex-col items-center mb-8">
          {words.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {word}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          className="font-sans text-[17px] text-white/75 mb-12 max-w-md mx-auto"
        >
          {content.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#treatments"
            className="px-8 py-3 rounded-full bg-brand-sage text-white text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300 hover:brightness-95 hover:shadow-sm w-full sm:w-auto"
          >
            {content.hero.button}
          </a>
          <a
            href="#retreats"
            className="px-8 py-3 rounded-full border border-white text-white text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300 hover:bg-white hover:text-brand-charcoal w-full sm:w-auto"
          >
            Book Your Escape
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <span className="text-white/60 text-[10px] uppercase tracking-widest font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="absolute left-0 w-full h-full bg-brand-sand"
          />
        </div>
      </motion.div>
    </section>
  );
}
