import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Collections() {
  const { products, colors } = useTemplateData();

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-white" id="menu">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h2 className="font-serif text-5xl md:text-6xl text-[#3D3A35] mb-6 font-medium">
          {products.title}
        </h2>
        <p className="text-[#6D6A61] max-w-xl mx-auto font-light text-lg">
          {products.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
        {products.items.map((item: any, index: number) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-full aspect-[4/5] rounded-[1rem] overflow-hidden mb-10 relative" style={{ backgroundColor: colors.secondary }}>
              <Image
                src={item.image}
                alt={item.imageAlt || item.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full font-serif text-[13px] tracking-wide text-[#3D3A35] z-20 shadow-sm border border-black/5">
                {item.price}
              </div>
            </div>
            
            <h3 className="font-serif text-3xl text-[#3D3A35] mb-4 transition-colors" style={{ '--hover-color': colors.primary } as any}>
              <span className="hover:text-[var(--hover-color)] transition-colors">{item.name}</span>
            </h3>
            <p className="text-[#6D6A61] font-light leading-relaxed max-w-sm text-base">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
