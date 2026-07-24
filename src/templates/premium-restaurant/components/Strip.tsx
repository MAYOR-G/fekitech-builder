"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Strip() {
  const { strip } = useTemplateData();

  return (
    <section className="py-8 bg-[#9B2C3F] border-y border-[#1A1814]/10 overflow-hidden">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex items-center gap-12 text-white font-serif italic text-2xl lg:text-3xl"
        >
          {strip.items.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              <span className="text-[#D5B55B] px-4">•</span>
            </React.Fragment>
          ))}
          {strip.items.map((item, idx) => (
            <React.Fragment key={`copy-${idx}`}>
              <span>{item}</span>
              <span className="text-[#D5B55B] px-4">•</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
