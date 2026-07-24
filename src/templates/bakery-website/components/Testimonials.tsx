"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Testimonials() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[var(--color-secondary)] relative z-20 overflow-hidden text-center">
      <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.2 }}></div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 text-white mb-4">
            <svg className="w-16 h-2 text-white/50" viewBox="0 0 40 10" fill="currentColor">
              <path d="M0 5 Q10 0 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 19.5c-4.14 0-7.5-3.36-7.5-7.5S7.86 4.5 12 4.5s7.5 3.36 7.5 7.5-3.36 7.5-7.5 7.5z" fill="currentColor"/>
              <circle cx="12" cy="12" r="4.5" fill="currentColor"/>
            </svg>
            <svg className="w-16 h-2 text-white/50" viewBox="0 0 40 10" fill="currentColor">
              <path d="M0 5 Q10 10 20 5 T40 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4 tracking-wide">{data.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.testimonials.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg mb-6 relative">
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-1 text-white mb-6 justify-center">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-4 h-4 fill-current drop-shadow-sm" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              <p className="text-white text-base leading-relaxed italic mb-6">
                &quot;{item.quote}&quot;
              </p>
              
              <h4 className="font-serif text-white text-xl">
                - {item.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
