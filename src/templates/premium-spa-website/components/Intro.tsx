"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function Intro() {
  return (
    <section id="about" className="bg-brand-white py-32 md:py-48 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Column - Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start z-10">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-brand-sage text-[13px] uppercase tracking-[0.12em] font-medium mb-6"
          >
            The Sanctuary
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em] mb-8"
          >
            Where Time Slows Down.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="font-sans text-[15px] md:text-[17px] text-brand-charcoal/80 leading-[1.7] max-w-md mb-10"
          >
            Nestled in quiet greenery, SANCTUM is a place to step out of the noise and into yourself. Every treatment is a ritual. Every visit, a reset.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            href="#story"
            className="group flex items-center gap-2 text-brand-sage text-[13px] uppercase tracking-[0.06em] font-medium transition-colors"
          >
            Discover Our Story
            <span className="transition-transform duration-250 ease-out group-hover:translate-x-1">→</span>
          </motion.a>
        </div>

        {/* Right Column - Image */}
        <div className="w-full md:w-1/2 relative">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden"
          >
            <Image
              src="/images/intro.png" // Bright airy spa interior
              alt="Calm, sunlit spa interior with natural materials"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
