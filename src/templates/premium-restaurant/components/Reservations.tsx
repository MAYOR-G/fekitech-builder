import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Reservations() {
  const { visit } = useTemplateData();

  return (
    <section className="bg-[#F9F8F6] py-32 border-t border-[#E5E0D8]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <span className="text-[#9B2C3F] text-[10px] font-bold uppercase tracking-[0.3em] block mb-4">
            {visit.note}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A26] mb-6">
            {visit.title}
          </h2>
          <p className="text-[#6D6A61] max-w-xl mx-auto font-light text-lg">
            {visit.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="p-12 bg-white border border-[#E5E0D8] shadow-sm"
          >
            <h3 className="font-serif text-3xl text-[#2C2A26] mb-8 border-b border-[#E5E0D8] pb-4">
              Opening Hours
            </h3>
            <ul className="space-y-4">
              {visit.hours.map((h, i) => (
                <li key={i} className="flex justify-between text-[#6D6A61]">
                  <span>{h.day}</span>
                  <span className="font-medium text-[#2C2A26]">{h.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="p-12 bg-white border border-[#E5E0D8] shadow-sm"
          >
            <h3 className="font-serif text-3xl text-[#2C2A26] mb-8 border-b border-[#E5E0D8] pb-4">
              Location
            </h3>
            <p className="text-[#6D6A61] mb-8 leading-relaxed">
              {visit.areasLabel}<br />
              <span className="font-medium text-[#2C2A26] block mt-2">{visit.areas.join(", ")}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={visit.primaryHref}
                className="px-8 py-4 bg-[#9B2C3F] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#1A1814] transition-colors text-center"
              >
                {visit.primaryLabel}
              </a>
              <a
                href={visit.secondaryHref}
                className="px-8 py-4 bg-transparent border border-[#2C2A26] text-[#2C2A26] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#2C2A26] hover:text-white transition-colors text-center"
              >
                {visit.secondaryLabel}
              </a>
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  );
}
