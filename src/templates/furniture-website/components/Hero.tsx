"use client";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { motion, Variants } from "motion/react";
import { CheckCircle, MapPin, Package, Phone, ShieldCheck } from "lucide-react";

import { useTemplateData } from "../TemplateContext";
const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.15, duration: 0.8, ease: "easeOut" }
  })
};

const assuranceItems = [
  { label: "Secure quote process", icon: ShieldCheck },
  { label: "Quality-checked finishes", icon: CheckCircle },
  { label: "Packed for delivery", icon: Package },
  { label: "Private showroom visits", icon: MapPin },
  { label: "Phone consultation", icon: Phone },
];

export function Hero() {
  const { heroSlides } = useTemplateData();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <section id="top" className="relative h-[100svh] min-h-[720px] overflow-hidden bg-white px-6 pb-8 pt-32 lg:px-8">
      {heroSlides.map((slide, index) => (
        <motion.img
          key={slide.title}
          src={slide.image}
          alt={slide.title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1400ms]"
          )}
          style={{ opacity: index === activeIndex ? 1 : 0 }}
          initial={{ scale: 1.0 }}
          animate={{ scale: index === activeIndex ? 1.04 : 1.0 }}
          transition={{ duration: 20, ease: "linear" }}
        />
      ))}
      
      {/* Dark wood gradient overlay for white text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a0c] via-[#4A3018]/40 to-transparent h-full w-full pointer-events-none" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-between">
        <div className="pt-12 md:pt-20">
          <motion.div 
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mb-6 font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-white/90"
          >
            PREMIUM SHOWROOM — BESPOKE STUDIO
          </motion.div>
          
          <h1 className="max-w-[14ch] font-display text-[80px] font-bold leading-[1.0] tracking-[-0.02em] text-white sm:text-[100px] lg:text-[120px] drop-shadow-md">
            <motion.div custom={1} initial="hidden" animate="visible" variants={textVariants}>Furniture That</motion.div>
            <motion.div custom={2} initial="hidden" animate="visible" variants={textVariants} className="text-amber">Completes</motion.div>
            <motion.div custom={3} initial="hidden" animate="visible" variants={textVariants}>Your Room.</motion.div>
          </h1>
          
          <motion.p 
            custom={4}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-8 max-w-[45ch] font-sans text-[18px] leading-[1.8] text-white/90 font-medium"
          >
            Custom pieces, handpicked materials, and white-glove placement for homes that need more than furniture.
          </motion.p>
          
          <motion.div 
            custom={5}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mt-12 flex flex-col gap-4 sm:flex-row"
          >
            <a 
              href="#consultation" 
              className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-[14px] font-bold uppercase tracking-[0.08em] text-[#4A3018] transition-all hover:bg-ivory active:scale-[0.98]"
            >
              Book Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a 
              href="#collections" 
              className="group flex items-center justify-center gap-2 rounded-full border-2 border-white/30 bg-transparent px-8 py-4 font-sans text-[14px] font-bold uppercase tracking-[0.08em] text-white transition-all hover:border-white hover:bg-white/10"
            >
              View Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>
        </div>

        <div className="mt-12 flex flex-col gap-8 pb-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <motion.div custom={6} initial="hidden" animate="visible" variants={textVariants} className="flex flex-col">
              <span className="font-display text-5xl font-bold text-white">12+</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">Curated Room Sets</span>
            </motion.div>
            <div className="hidden h-12 w-px bg-white/20 sm:block"></div>
            <motion.div custom={7} initial="hidden" animate="visible" variants={textVariants} className="flex flex-col">
              <span className="font-display text-5xl font-bold text-white">48 hr</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">Design Quote Turnaround</span>
            </motion.div>
            <div className="hidden h-12 w-px bg-white/20 sm:block"></div>
            <motion.div custom={8} initial="hidden" animate="visible" variants={textVariants} className="flex flex-col">
              <span className="font-display text-5xl font-bold text-white">4.9/5</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-white/70">Client Experience Rating</span>
            </motion.div>
          </div>
          
          <motion.div custom={9} initial="hidden" animate="visible" variants={textVariants} className="flex flex-wrap gap-4">
            {assuranceItems.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 font-sans text-[13px] text-white/90"
                >
                  <Icon className="h-4 w-4 text-amber" />
                  {item.label}
                </span>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
