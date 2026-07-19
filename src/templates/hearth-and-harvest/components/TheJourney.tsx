"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function TheJourney() {
  return (
    <section className="bg-brand-dark py-24 md:py-32 px-6 md:px-12 text-brand-white border-t border-white/5" id="story">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8">
        
        {/* Left Side: Outlined Text */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-start">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-heading text-6xl md:text-8xl lg:text-[140px] leading-none tracking-tighter"
            >
              THE
            </motion.h2>
            
            <div className="relative">
              <svg 
                viewBox="0 0 600 150" 
                className="w-full max-w-[600px] h-auto overflow-visible"
              >
                <motion.text
                  initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 }}
                  whileInView={{ strokeDashoffset: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  x="0" 
                  y="120" 
                  className="font-heading text-[140px] tracking-tighter fill-transparent stroke-brand-white stroke-[2px]"
                >
                  JOURNEY
                </motion.text>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Side: Text & Link */}
        <div className="w-full md:w-1/2 md:pl-16 flex flex-col items-start">
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-brand-gray text-base md:text-lg leading-relaxed max-w-md mb-8"
          >
            From the rolling farms of the Cotswolds to our open kitchen in the heart of London, every ingredient is treated with uncompromising respect.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="#story-full" className="text-brand-accent font-medium tracking-widest text-sm hover:text-white transition-colors flex items-center gap-2 uppercase">
              READ OUR STORY <span className="text-lg">→</span>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
