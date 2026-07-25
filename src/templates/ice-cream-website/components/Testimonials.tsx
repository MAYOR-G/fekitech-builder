"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Quotes, IceCream } from "@phosphor-icons/react";

export default function Testimonials() {
  const data = useTemplateData();

  return (
    <section className="py-32 bg-white relative z-20">
      <div className="text-center mb-24">
        <div className="inline-block px-4 py-1 rounded border border-[var(--color-primary)] mb-6">
          <span className="font-semibold text-xs tracking-widest uppercase text-[var(--color-primary)]">Happy Customers</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-[#2a2a2a] uppercase tracking-tight">{data.testimonials.title}</h2>
      </div>

      <motion.div 
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-20 z-0 text-[var(--color-secondary)] opacity-10 hidden lg:block pointer-events-none"
      >
        <IceCream size={350} weight="duotone" />
      </motion.div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {data.testimonials.items.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.2, ease: "easeOut" }}
              className={`flex flex-col p-10 bg-[#faf9f6] rounded-[2.5rem] border border-gray-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group ${idx === 1 ? 'md:mt-12' : ''}`}
            >
              <div className="absolute top-8 right-8 text-[var(--color-primary)] opacity-20 group-hover:scale-110 group-hover:opacity-40 transition-all duration-300">
                <Quotes size={56} weight="fill" />
              </div>
              
              <div className="flex gap-1 text-[var(--color-secondary)] mb-8">
                {[1,2,3,4,5].map(star => (
                  <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              <p className="text-[#2a2a2a] text-lg leading-relaxed relative z-10 flex-grow font-medium mb-10">
                &quot;{item.quote}&quot;
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#2a2a2a] tracking-wider uppercase text-xs mb-1">
                    {item.name}
                  </h4>
                  <span className="text-gray-400 text-xs">Customer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
