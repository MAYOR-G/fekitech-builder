"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-brand-accent pt-24 md:pt-32 pb-12 overflow-hidden flex flex-col">
      <div className="container mx-auto px-6 text-center text-white mb-20 flex-grow">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-7xl tracking-widest uppercase mb-4"
        >
          ALL THE LATEST FLAVOURS
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-sans text-sm md:text-base font-medium mb-10 opacity-90"
        >
          Join our newsletter for fresh recipes, chef&apos;s tips, and exclusive offers.
        </motion.p>
        
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-md mx-auto relative"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-transparent border-b-2 border-white/50 py-3 pl-2 pr-12 text-white placeholder:text-white/60 focus:outline-none focus:border-white transition-colors"
            required
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-brand-dark transition-colors">
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.form>
      </div>

      {/* Infinite Marquee */}
      <div className="w-full relative mt-auto border-t border-white/20 pt-8 pb-4">
        <div className="w-[200%] flex overflow-hidden whitespace-nowrap">
          {/* Double the content for smooth infinite scrolling */}
          <div className="animate-marquee flex gap-4 min-w-full">
            <span className="font-heading text-xl tracking-[0.2em] uppercase px-4 text-white/90">
              FRESH ROASTS WEEKLY • SPECIALTY COFFEE • EXPERT BARISTAS • FAMILY RECIPES • SEASONAL MENUS • 
            </span>
            <span className="font-heading text-xl tracking-[0.2em] uppercase px-4 text-white/90">
              FRESH ROASTS WEEKLY • SPECIALTY COFFEE • EXPERT BARISTAS • FAMILY RECIPES • SEASONAL MENUS • 
            </span>
            <span className="font-heading text-xl tracking-[0.2em] uppercase px-4 text-white/90">
              FRESH ROASTS WEEKLY • SPECIALTY COFFEE • EXPERT BARISTAS • FAMILY RECIPES • SEASONAL MENUS • 
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
