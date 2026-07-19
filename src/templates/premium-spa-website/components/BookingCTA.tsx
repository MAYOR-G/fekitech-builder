"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function BookingCTA() {
  return (
    <section id="book" className="relative pt-48 pb-32 md:pt-64 md:pb-48 overflow-hidden bg-brand-sage scroll-mt-24">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/booking.png" // Darker, moody spa pool image
          alt="Atmospheric dark water"
          fill sizes="100vw"
          className="object-cover object-center opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-brand-sage/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-brand-sand text-[13px] uppercase tracking-[0.12em] font-medium mb-6"
        >
          Your Retreat Awaits
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="font-serif text-[40px] md:text-[56px] text-white leading-[1.1] tracking-[-0.01em] mb-8"
        >
          Ready to Step Out <br className="hidden md:block" /> of the Noise?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="font-sans text-[15px] md:text-[17px] text-white/80 leading-[1.7] max-w-md mx-auto mb-12"
        >
          Our spaces are limited to ensure complete tranquility for every guest. Reserve your treatment early.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        >
          <a
            href="#"
            className="inline-block px-10 py-4 bg-brand-sand text-brand-charcoal text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300 hover:bg-white"
          >
            Book Your Treatment
          </a>
        </motion.div>

      </div>
    </section>
  );
}
