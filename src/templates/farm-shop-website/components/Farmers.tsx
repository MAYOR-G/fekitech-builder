import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Farmers() {
  const data = useTemplateData();
  const { farmers } = data;

  return (
    <section className="py-24 px-8 md:px-16 bg-[#F3EAD3] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[#548D4E] uppercase mb-4 block">
          {farmers?.tagline}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-medium text-[#1E201E] leading-tight mb-4">
          {farmers?.headline}
        </h2>
        <p className="text-[#1E201E]/80 font-sans">
          {farmers?.subheadline}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {farmers?.members?.map((member: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mb-6 border-4 border-[#FDFBF7]">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-serif font-medium text-[#1E201E] mb-2">{member.name}</h3>
            <p className="font-sans text-[#548D4E] font-medium tracking-wide text-sm uppercase">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
