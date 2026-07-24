import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Menu() {
  const { products } = useTemplateData();

  return (
    <section className="py-32 bg-[#111111] text-[#F9F9F9] border-y-8 border-[#FFE600]" id="menu">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-6xl md:text-[6rem] font-bold uppercase tracking-tighter mb-6 text-[#FFE600] drop-shadow-[4px_4px_0_#FF2A00]">
            {products.title}
          </h2>
          <p className="text-xl md:text-2xl font-bold max-w-2xl mx-auto border-4 border-[#FF2A00] p-4 inline-block bg-[#111111] shadow-[8px_8px_0px_0px_#FFE600]">
            {products.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F9F9F9] text-[#111111] border-4 border-[#111111] shadow-[12px_12px_0px_0px_#FFE600] p-6 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#FF2A00] transition-all flex flex-col"
            >
              <div className="w-full aspect-square border-4 border-[#111111] mb-6 overflow-hidden bg-[#FFE600]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                />
              </div>
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-serif text-4xl font-bold uppercase leading-none">
                  {item.name}
                </h3>
                <span className="bg-[#FF2A00] text-[#FFE600] font-bold text-2xl px-3 py-1 border-2 border-[#111111] rotate-[-5deg]">
                  {item.price}
                </span>
              </div>
              <p className="font-bold text-lg mt-auto pt-4 border-t-4 border-[#111111]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
