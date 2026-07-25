import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Menu() {
  const { products } = useTemplateData();

  return (
    <section className="py-32 bg-[#111111] text-[#F9F9F9]" id="menu">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4">
              {products.title}
            </h2>
            <p className="text-[#A0A0A0] text-xl font-medium max-w-lg">
              {products.description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border border-[#333333] hover:border-[#E5B53A] transition-colors p-8 flex flex-col"
            >
              <div className="w-full aspect-square mb-8 overflow-hidden bg-[#222222]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-3xl font-bold uppercase tracking-tight">
                  {item.name}
                </h3>
                <span className="bg-[#E5B53A] text-[#111111] font-bold px-3 py-1 text-sm">
                  {item.price}
                </span>
              </div>
              <p className="text-[#A0A0A0] font-medium leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
