import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="relative min-h-[90vh] w-full pt-40 pb-20 overflow-hidden" id="top">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#111111] -skew-x-12 translate-x-32 hidden lg:block border-l-8 border-[#FFE600]" />
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 w-full relative z-10 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          >
            <div className="inline-block bg-[#111111] text-[#FFE600] px-4 py-2 font-bold text-sm uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_0px_#FFE600] mb-8 rotate-[-2deg]">
              {hero.note}
            </div>
            <h1 className="font-serif text-[5rem] md:text-[7rem] lg:text-[8rem] text-[#FFE600] lg:text-[#111111] font-bold uppercase leading-[0.8] mb-8 drop-shadow-[4px_4px_0_#111111] lg:drop-shadow-[4px_4px_0_#FFE600]">
              {hero.title}
            </h1>
            <p className="text-white lg:text-[#111111] text-xl md:text-2xl font-bold mb-10 max-w-md bg-[#111111] lg:bg-transparent p-4 lg:p-0 border-4 border-[#111111] lg:border-none shadow-[8px_8px_0px_0px_#FFE600] lg:shadow-none">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href={hero.primaryHref}
                className="px-10 py-5 bg-[#FFE600] text-[#111111] text-xl font-bold uppercase tracking-widest border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] hover:translate-y-2 hover:shadow-none transition-all text-center"
              >
                {hero.primaryLabel}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/3] w-full max-w-[600px] mx-auto">
              <img
                src={hero.image}
                alt={hero.imageAlt}
                className="w-full h-full object-cover border-8 border-[#111111] shadow-[16px_16px_0px_0px_#FFE600] z-10 relative bg-[#111111]"
              />
              <div className="absolute -bottom-10 -left-10 bg-[#FF2A00] text-[#FFE600] p-6 border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] rounded-full z-20 w-40 h-40 flex items-center justify-center text-center rotate-[-15deg] hover:rotate-0 transition-transform">
                <span className="font-serif text-2xl font-bold uppercase leading-tight">
                  {hero.badge}
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
