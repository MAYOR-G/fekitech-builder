import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Menu() {
  const { products } = useTemplateData();

  return (
    <section className="py-32 bg-[#1A1814] text-white overflow-hidden relative">
      {/* Decorative large text */}
      <div className="absolute top-10 right-[-10%] text-[#2C2A26] font-serif text-[20vw] leading-none opacity-50 whitespace-nowrap pointer-events-none select-none">
        A la Carte
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#D5B55B] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
            Seasonal
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            {products.title}
          </h2>
          <p className="text-[#A3A099] max-w-xl mx-auto font-light text-lg">
            {products.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-x-24 md:gap-y-32">
          {products.items.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`flex flex-col ${!isEven ? "md:mt-32" : ""}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden mb-8 group">
                  <div className="absolute inset-0 bg-black/20 z-10 transition-colors duration-500 group-hover:bg-transparent" />
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-0 left-0 bg-[#9B2C3F] text-white px-4 py-2 font-serif italic text-lg z-20">
                    {item.price}
                  </div>
                </div>
                
                <div className="flex items-start justify-between gap-6 border-b border-[#2C2A26] pb-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl mb-3 text-[#E5E0D8]">
                      {item.name}
                    </h3>
                    <p className="text-[#8E8B82] font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[#D5B55B] font-serif text-xl italic opacity-50 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
