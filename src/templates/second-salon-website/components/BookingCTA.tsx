"use client";
import { motion } from "motion/react";
import Link from "next/link";

export default function BookingCTA() {
  return (
    <section id="book" className="relative py-32 md:py-48 overflow-hidden bg-brand-mauve text-white">
      {/* Background Subtle Animated Elements */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-96 h-96 bg-brand-plum/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      />
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6">
            Ready for Your <br className="hidden md:block" />
            <span className="italic">Transformation?</span>
          </h2>
          <p className="font-sans text-lg md:text-xl text-white/90 mb-12 max-w-lg mx-auto">
            Book your appointment today and experience the pinnacle of beauty artistry.
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="#contact"
              className="bg-white text-brand-mauve px-10 py-5 rounded-full text-sm font-bold tracking-[0.15em] uppercase hover:bg-brand-cream transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              Secure Your Slot
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
