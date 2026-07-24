import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Gallery() {
  const data = useTemplateData();
  const { gallery } = data;

  return (
    <section className="py-24 bg-[#FDFBF7] overflow-hidden">
      <div className="px-8 md:px-16 mb-12 text-center md:text-left max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-[#548D4E] uppercase mb-4 block">
            {gallery?.tagline}
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1E201E] leading-tight">
            {gallery?.headline}
          </h2>
        </div>
      </div>

      <div className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
        {gallery?.images?.map((img: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex-none w-[80vw] md:w-[400px] h-[500px] rounded-3xl overflow-hidden snap-center"
          >
            <img 
              src={img} 
              alt={`Gallery Image ${index + 1}`} 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
