import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative min-h-screen w-full pt-32 pb-20 flex items-center" id="top">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 z-10"
        >
          <div className="inline-block bg-[#E5B53A] text-[#111111] px-4 py-1 font-bold text-xs uppercase tracking-widest mb-8">
            {hero.note}
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] font-bold uppercase leading-[0.85] tracking-tighter mb-8">
            {hero.title}
          </h1>
          <p className="text-xl font-medium text-[#555555] mb-10 max-w-md">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={hero.primaryHref}
              className="px-10 py-5 bg-[#111111] text-[#F9F9F9] text-sm font-bold uppercase tracking-widest hover:bg-[#E5B53A] hover:text-[#111111] transition-colors text-center"
            >
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a
                href={hero.secondaryHref}
                className="px-10 py-5 border-2 border-[#111111] text-[#111111] text-sm font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-[#F9F9F9] transition-colors text-center"
              >
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] w-full"
        >
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-10 -left-10 bg-[#111111] text-[#F9F9F9] p-8 w-40 h-40 hidden lg:flex items-center justify-center text-center rounded-full animate-[spin_20s_linear_infinite]">
            <span className="font-bold text-sm uppercase tracking-widest">
              {hero.badge}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
