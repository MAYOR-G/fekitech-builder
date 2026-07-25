"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Testimonials() {
  const { testimonials } = useTemplateData();

  return (
    <section className="py-24 bg-[#1A1814] text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[#D5B55B] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
            Guestbook
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
            {testimonials.title}
          </h2>
          <p className="text-[#E5E0D8] font-light text-lg max-w-2xl mx-auto">
            {testimonials.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="text-[#9B2C3F] font-serif text-6xl leading-none mb-4">&quot;</div>
              <p className="text-[#E5E0D8] text-lg font-light leading-relaxed mb-8 flex-grow">
                {item.quote}
              </p>
              <div className="text-[#D5B55B] text-[11px] font-bold uppercase tracking-[0.2em] mb-1">
                {item.name}
              </div>
              <div className="text-white/50 text-xs italic">
                {item.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
