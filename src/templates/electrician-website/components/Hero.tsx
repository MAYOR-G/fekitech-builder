"use client";
import { motion, AnimatePresence, Variants } from "motion/react";
import { useEffect, useState } from "react";
import { Zap, Clock3, PhoneCall } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const { brand, heroSlides } = useTemplateData();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 2500);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy pt-20">
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.img 
            key={activeIndex}
            src={heroSlides[activeIndex].image}
            alt={heroSlides[activeIndex].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl px-5 lg:px-8 py-20 flex flex-col justify-center"
      >
        <div className="max-w-3xl">
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
              <Zap className="h-4 w-4 text-white" aria-hidden="true" />
              Licensed Electrical Contractors
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">
              <Clock3 className="h-4 w-4 text-white" aria-hidden="true" />
              24/7 Emergency Dispatch
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Modern <span className="text-amber">Electrical Work</span>, Handled With Precision.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl leading-relaxed text-white max-w-2xl font-medium">
            {brand.name} helps homeowners and commercial teams solve faults, 
            upgrades, and complex rewiring with absolute transparency, careful testing, and documented safety checks.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4">
            <ButtonLink href="#contact" variant="yellow" className="text-base h-14 px-8">
              Book an inspection
            </ButtonLink>
            <ButtonLink href={`tel:${brand.emergencyPhone.replace(/\D/g, '')}`} variant="secondary" className="text-base h-14 px-8 group bg-white/10 hover:bg-white/20 border-white/20 backdrop-blur-md">
              <PhoneCall className="mr-2 h-5 w-5 text-cyan group-hover:text-white transition-colors" />
              {brand.emergencyPhone}
            </ButtonLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
