import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function CallToAction() {
  const data = useTemplateData();
  const { callToAction } = data;

  return (
    <section className="py-32 px-8 md:px-16 bg-[#E2CD88] text-center relative overflow-hidden">
      {/* Decorative large faint circle in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-black/5 pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <h2 className="text-5xl md:text-7xl font-serif font-medium text-[#1E201E] leading-tight mb-6">
          {callToAction?.headline}
        </h2>
        <p className="text-[#1E201E]/80 font-sans text-xl mb-10">
          {callToAction?.subheadline}
        </p>
        <button className="px-10 py-5 bg-[#1E201E] text-white rounded-full font-medium hover:bg-[#333] transition-colors">
          {callToAction?.button}
        </button>
      </motion.div>
    </section>
  );
}
