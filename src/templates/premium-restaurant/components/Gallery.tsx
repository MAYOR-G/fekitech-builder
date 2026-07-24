import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Gallery() {
  const { gallery } = useTemplateData();
  const allImages = [...gallery.rowOne, ...gallery.rowTwo];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="py-32 bg-white" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <span className="text-[#9B2C3F] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
              Atmosphere
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A26] leading-tight">
              {gallery.title}
            </h2>
          </div>
          <p className="text-[#6D6A61] font-light max-w-sm text-lg">
            {gallery.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 h-auto md:h-[800px] overflow-hidden">
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-10">
            {allImages.slice(0, 2).map((img, i) => (
              <div key={i} className="relative group overflow-hidden w-full h-[400px]">
                <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white font-serif text-lg">{img.caption}</span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-10 mt-12 md:mt-0">
            <div className="relative group overflow-hidden w-full h-[500px]">
              <img src={allImages[2].image} alt={allImages[2].imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-serif text-lg">{allImages[2].caption}</span>
              </div>
            </div>
            <div className="relative group overflow-hidden w-full h-[350px]">
              <img src={allImages[3].image} alt={allImages[3].imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-serif text-lg">{allImages[3].caption}</span>
              </div>
            </div>
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-10 md:-mt-12 hidden md:flex">
            {allImages.slice(4, 6).map((img, i) => (
              <div key={i} className="relative group overflow-hidden w-full h-[450px]">
                <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <span className="text-white font-serif text-lg">{img.caption}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
