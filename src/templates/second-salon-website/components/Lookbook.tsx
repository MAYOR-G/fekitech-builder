"use client";
import { motion } from "motion/react";
import Image from "next/image";

const lookbookItems = [
  {
    category: "Bridal",
    image: "https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspect: "aspect-square",
  },
  {
    category: "Color",
    image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspect: "aspect-square",
  },
  {
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspect: "aspect-square",
  },
  {
    category: "Styling",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspect: "aspect-square",
  },
  {
    category: "Nails",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspect: "aspect-square",
  },
  {
    category: "Extensions",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    aspect: "aspect-square",
  },
];

export default function Lookbook() {
  return (
    <section id="lookbook" className="bg-white py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-brand-mauve text-sm uppercase tracking-[0.1em] font-semibold mb-6 block">
            The Lookbook
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1]">
            Styles That <span className="italic">Speak.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-2 md:gap-4 max-w-5xl mx-auto">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${item.colSpan} ${item.rowSpan} ${item.aspect}`}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Image
                  src={item.image}
                  alt={item.category}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-sans text-lg font-medium tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
