"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Packages() {
  const { packages } = useTemplateData();

  return (
    <section className="py-24 bg-[#E5E0D8]" id="packages">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <span className="text-[#9B2C3F] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
            Private Events
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A26] leading-tight mb-6">
            {packages.title}
          </h2>
          <p className="text-[#6D6A61] font-light text-lg">
            {packages.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.items.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#F9F8F6] p-10 md:p-12 border border-[#D5B55B]/20 flex flex-col items-center text-center group hover:border-[#D5B55B] transition-colors duration-500"
            >
              <h3 className="font-serif text-2xl text-[#2C2A26] mb-3">{pkg.name}</h3>
              <p className="text-[#6D6A61] text-sm font-light mb-6 flex-grow">{pkg.description}</p>
              
              <div className="text-[#9B2C3F] font-serif text-xl mb-2">{pkg.price}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#8E8B82] mb-8">{pkg.note}</div>
              
              <ul className="text-left w-full space-y-3 mb-10 border-t border-[#E5E0D8] pt-8">
                {pkg.features.map((feature, fIdx) => (
                  <li key={fIdx} className="text-sm text-[#2C2A26] flex items-start gap-3">
                    <span className="text-[#D5B55B] mt-1">•</span>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={pkg.buttonHref}
                className="w-full py-4 border border-[#2C2A26] text-[#2C2A26] text-[11px] font-bold uppercase tracking-[0.2em] group-hover:bg-[#2C2A26] group-hover:text-white transition-colors duration-500"
              >
                {pkg.buttonLabel}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
