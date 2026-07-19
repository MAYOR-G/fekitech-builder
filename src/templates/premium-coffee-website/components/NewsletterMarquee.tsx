"use client";
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterMarquee() {
  return (
    <section className="bg-brand-accent text-white overflow-hidden py-24">
      <div className="max-w-4xl mx-auto px-6 text-center mb-24">
        <h2 className="text-5xl md:text-7xl mb-6">ALL THE LATEST BREWS</h2>
        <p className="text-lg mb-12 opacity-90">Join our newsletter for fresh roasts, brew guides, and exclusive offers.</p>
        <form className="flex border-b border-white/50 focus-within:border-white pb-2 max-w-md mx-auto transition-colors">
          <input 
            type="email" 
            placeholder="ENTER YOUR EMAIL" 
            className="bg-transparent border-none outline-none flex-grow placeholder-white/50 text-white font-body uppercase tracking-widest"
          />
          <button type="submit" className="hover:translate-x-2 transition-transform">
            <ArrowRight size={24} />
          </button>
        </form>
      </div>

      <div className="w-full flex whitespace-nowrap opacity-50 text-4xl md:text-6xl font-heading uppercase tracking-widest pointer-events-none">
        <motion.div
          animate={{ x: [0, -1035] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="flex gap-8"
        >
          <span>FRESH ROASTS WEEKLY • SPECIALTY COFFEE • EXPERT BARISTAS • </span>
          <span>FRESH ROASTS WEEKLY • SPECIALTY COFFEE • EXPERT BARISTAS • </span>
          <span>FRESH ROASTS WEEKLY • SPECIALTY COFFEE • EXPERT BARISTAS • </span>
        </motion.div>
      </div>
    </section>
  );
}
