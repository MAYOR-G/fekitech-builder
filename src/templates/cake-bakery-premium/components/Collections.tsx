import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Collections() {
  const { products } = useTemplateData();

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto" id="menu">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24"
      >
        <h2 className="font-serif text-5xl md:text-6xl text-[#3D3A35] mb-6">
          {products.title}
        </h2>
        <p className="text-[#6D6A61] max-w-xl mx-auto font-light text-lg">
          {products.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
        {products.items.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group flex flex-col items-center text-center"
          >
            <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 relative bg-[#F3E8DF]">
              <div className="absolute inset-0 bg-[#3D3A35]/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
              <img
                src={item.image}
                alt={item.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-serif text-[#3D3A35] z-20 shadow-sm">
                {item.price}
              </div>
            </div>
            
            <h3 className="font-serif text-3xl text-[#3D3A35] mb-3 group-hover:text-[#E2A499] transition-colors">
              {item.name}
            </h3>
            <p className="text-[#6D6A61] font-light leading-relaxed max-w-sm">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
