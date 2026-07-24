import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Categories() {
  const data = useTemplateData();
  const { categories } = data;

  return (
    <section className="py-24 px-8 md:px-16 bg-[#E2CD88] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[#548D4E] uppercase mb-4 block">
          {categories?.tagline}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1E201E] leading-tight mb-4">
          {categories?.headline}
        </h2>
        <p className="text-[#1E201E]/80 font-sans">
          {categories?.subheadline}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        {categories?.items?.map((item: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute bottom-0 left-0 w-full p-8 z-20">
              <h3 className="text-2xl font-serif text-white font-medium">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <button className="px-8 py-4 bg-[#1E201E] text-white rounded-full font-medium hover:bg-[#333] transition-colors">
          {categories?.primaryCTA}
        </button>
        <button className="px-8 py-4 bg-[#FDFBF7] text-[#1E201E] rounded-full font-medium hover:bg-white transition-colors">
          {categories?.secondaryCTA}
        </button>
      </motion.div>
    </section>
  );
}
