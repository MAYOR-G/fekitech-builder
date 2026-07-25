import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Gallery() {
  const { gallery, colors } = useTemplateData();
  const allImages = [...gallery.rowOne, ...gallery.rowTwo].slice(0, 4);

  return (
    <section className="w-full flex flex-col md:flex-row" id="gallery">
      {allImages.map((img: any, i: number) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.8 }}
          className="relative w-full md:w-1/4 aspect-square md:aspect-[4/5] overflow-hidden group"
        >
          <img 
            src={img.image} 
            alt={img.imageAlt} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          {i === 0 && (
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 px-6 py-2 rounded-r-full font-serif font-bold text-lg"
              style={{ backgroundColor: colors.primary, color: colors.text }}
            >
              Fresh
            </div>
          )}
        </motion.div>
      ))}
    </section>
  );
}
