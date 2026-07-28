import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Menu() {
  const { products, colors } = useTemplateData();

  return (
    <section className="w-full min-h-screen flex flex-col md:flex-row" id="menu">
      <div 
        className="w-full md:w-[40%] p-12 md:p-24 flex items-center justify-center md:justify-start"
        style={{ backgroundColor: colors.secondary }}
      >
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-serif text-[8vw] md:text-[5vw] leading-[0.9] tracking-tighter text-[#3D2721] font-medium max-w-sm"
        >
          {products.title || "Fresh From Our Grill"}
        </motion.h2>
      </div>
      
      <div className="w-full md:w-[60%] relative p-8 md:p-16 flex items-center justify-center min-h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={products.items[0]?.image || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1999&auto=format&fit=crop"} 
            alt="Menu background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Menu Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 bg-white p-8 md:p-12 shadow-2xl max-w-md w-full"
        >
          <h3 className="font-serif text-3xl font-bold mb-8 text-[#3D2721] text-center">{products.subtitle}</h3>
          <div className="flex flex-col gap-4 mb-8">
            {products.items.slice(0, 5).map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-center text-[#3D2721]">
                <span className="font-serif text-lg">{item.name}</span>
                <span className="font-sans font-light text-sm opacity-80">{item.price}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href={products.buttonHref}
              className="inline-block px-8 py-3 rounded-full font-serif font-bold transition-transform hover:scale-105"
              style={{ backgroundColor: colors.text, color: colors.primary }}
            >
              {products.buttonLabel}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
