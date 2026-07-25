import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Experience() {
  const { gallery } = useTemplateData();

  return (
    <section className="py-32 bg-white" id="gallery">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center mb-24">
        <span className="text-[#556B2F] text-[11px] font-bold uppercase tracking-[0.3em] mb-6 block">
          Experiences
        </span>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3C2A21] mb-6">
          {gallery.title}
        </h2>
        <p className="text-[#3C2A21]/70 max-w-2xl mx-auto text-lg leading-relaxed">
          {gallery.description}
        </p>
      </div>

      <div className="px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...gallery.rowOne, ...gallery.rowTwo].map((img, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
            >
              <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-[#3C2A21]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                <span className="font-serif text-white text-2xl tracking-tight">{img.caption}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
