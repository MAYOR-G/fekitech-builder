"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const data = useTemplateData();

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img 
          src={data.hero.backgroundImage} 
          alt="Carpenter working" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl bg-white p-10 md:p-16 border-l-8 border-[var(--color-primary)]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {data.hero.kicker && (
              <h3 className="text-[var(--color-primary)] font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-4">
                <span className="w-12 h-[2px] bg-[var(--color-primary)]"></span>
                {data.hero.kicker}
              </h3>
            )}
            
            <h1 className="text-4xl md:text-6xl font-serif text-[var(--color-secondary)] font-bold leading-tight mb-6">
              {data.hero.title}
            </h1>

            <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed mb-10">
              {data.hero.subtitle}
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <a 
                href={data.hero.buttonHref} 
                className="bg-[var(--color-secondary)] text-white px-8 py-4 flex items-center gap-3 uppercase tracking-widest text-sm font-bold hover:bg-[var(--color-primary)] transition-colors duration-300 group rounded-sm"
              >
                {data.hero.buttonLabel}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Social Links sidebar (Desktop only) */}
      <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-8 items-center">
        <span className="text-white text-xs uppercase tracking-[0.3em] font-semibold whitespace-nowrap rotate-90 origin-center mb-8">
          Follow Us
        </span>
        <div className="w-px h-16 bg-white/30"></div>
        {data.footer.social.map((social, idx) => (
          <a key={idx} href={social.href} className="text-white hover:text-[var(--color-primary)] transition-colors transform hover:scale-110">
            {social.platform.substring(0,2).toUpperCase()}
          </a>
        ))}
      </div>
    </section>
  );
}
