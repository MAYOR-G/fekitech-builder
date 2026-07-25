import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Philosophy() {
  const { feature, colors } = useTemplateData();

  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-end p-6 md:p-12 lg:p-24" id="philosophy">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={feature.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop"} 
          alt="Restaurant interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content Box */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative z-10 p-10 md:p-16 max-w-lg w-full"
        style={{ backgroundColor: colors.primary, color: colors.text }}
      >
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {feature.title || "A Legacy, Built Fresh"}
        </h2>
        <p className="font-sans mb-8 text-lg opacity-90 leading-relaxed">
          {feature.description}
        </p>
        <a
          href={feature.buttonHref}
          className="inline-block px-8 py-3 rounded-full font-serif font-bold transition-transform hover:scale-105"
          style={{ backgroundColor: colors.text, color: colors.primary }}
        >
          {feature.buttonLabel || "Explore"}
        </a>
      </motion.div>
    </section>
  );
}
