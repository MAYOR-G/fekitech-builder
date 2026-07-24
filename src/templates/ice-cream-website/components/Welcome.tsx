"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Heart } from "@phosphor-icons/react";

export default function Welcome() {
  const data = useTemplateData();

  return (
    <section className="relative w-full py-32 md:py-40 bg-white overflow-hidden z-10">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side with Offset Layout */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto md:ml-0 md:mr-auto rounded-[2rem] overflow-hidden shadow-2xl z-10">
              <img 
                src={data.welcome.backgroundImage} 
                alt="Parlour background" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Background offset decorative block */}
            <div className="absolute top-12 left-12 w-full max-w-md aspect-[4/5] bg-[var(--color-primary)] opacity-20 rounded-[2rem] -z-10 hidden md:block"></div>
            
            {/* Floating element */}
            <motion.div 
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -right-4 md:-right-12 bg-white p-6 rounded-full shadow-2xl flex flex-col items-center justify-center w-40 h-40 border-8 border-[#faf9f6] z-20"
            >
              <Heart size={40} weight="fill" className="text-[var(--color-secondary)] mb-2" />
              <span className="text-xs font-black uppercase tracking-widest text-[#2a2a2a] text-center">Made<br/>With Love</span>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 text-center md:text-left pt-12 md:pt-0"
          >
            <div className="inline-block px-4 py-1 rounded border border-[var(--color-primary)] mb-6">
              <span className="font-semibold text-xs tracking-widest uppercase text-[var(--color-primary)]">About Us</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-[#2a2a2a] mb-8 leading-tight tracking-tight uppercase">
              {data.welcome.title}
            </h2>

            <p className="text-gray-500 text-lg md:text-xl mb-12 leading-relaxed font-light max-w-xl mx-auto md:mx-0">
              {data.welcome.description}
            </p>

            <a 
              href={data.welcome.buttonHref}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-[#2a2a2a] text-white font-bold uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <span className="absolute inset-0 w-full h-full bg-[var(--color-secondary)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
              <span className="relative z-10">{data.welcome.buttonLabel}</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
