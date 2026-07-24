"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { IceCream, Heart } from "@phosphor-icons/react";

export default function Gallery() {
  const data = useTemplateData();

  return (
    <section className="py-32 bg-[#faf9f6] relative z-20">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-4 text-[var(--color-text)] mb-4">
          <svg className="w-16 h-4 text-gray-200" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 0 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          <IceCream size={24} weight="fill" className="text-[var(--color-primary)]" />
          <svg className="w-16 h-4 text-gray-200" viewBox="0 0 40 10" fill="currentColor">
            <path d="M0 5 Q10 10 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        </div>
        <h2 className="font-pacifico text-4xl md:text-5xl text-[#2a2a2a]">{data.gallery.title}</h2>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[600px]">
          {data.gallery.images.map((image, idx) => {
            // Create a bento box layout for 4 items
            let spanClass = "";
            if (idx === 0) spanClass = "md:col-span-2 md:row-span-2";
            else if (idx === 1) spanClass = "md:col-span-2 md:row-span-1";
            else if (idx === 2) spanClass = "md:col-span-1 md:row-span-1";
            else if (idx === 3) spanClass = "md:col-span-1 md:row-span-1";
            else spanClass = "md:col-span-1 md:row-span-1"; // Fallback

            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                className={`rounded-[2rem] overflow-hidden relative group aspect-square md:aspect-auto ${spanClass}`}
              >
                <img 
                  src={image} 
                  alt={`Creation ${idx + 1}`} 
                  className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
                />
                {/* Premium gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Action Button on Hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 ease-out shadow-xl">
                  <Heart size={24} weight="fill" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
