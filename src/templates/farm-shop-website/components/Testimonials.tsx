import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const data = useTemplateData();
  const { testimonials } = data;

  return (
    <section className="py-24 px-8 md:px-16 bg-[#2C211B] text-[#FDFBF7] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <span className="text-xs font-bold tracking-[0.2em] text-[#E2CD88] uppercase mb-4 block">
          {testimonials?.tagline}
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
          {testimonials?.headline}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials?.reviews?.map((review: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="bg-white/5 rounded-3xl p-10 flex flex-col items-center text-center border border-white/10"
          >
            <Quote size={40} className="text-[#E2CD88] mb-6 opacity-80" strokeWidth={1} />
            <p className="font-sans text-lg mb-8 leading-relaxed italic opacity-90">
              "{review.quote}"
            </p>
            <div className="mt-auto">
              <p className="font-serif font-medium text-xl">{review.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
