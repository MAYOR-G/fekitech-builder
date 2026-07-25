import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Philosophy() {
  const { feature, story } = useTemplateData();

  return (
    <section className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-[#F9F8F6]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Left Side: Images */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-[85%] aspect-[3/4] overflow-hidden"
          >
            { }
            <img src={feature.image} alt={feature.imageAlt} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-[-10%] right-0 w-[55%] aspect-square border-[10px] border-[#F9F8F6] overflow-hidden shadow-2xl"
          >
            { }
            <img src={story.image} alt={story.imageAlt} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Right Side: Copy */}
        <div className="lg:pl-10 mt-16 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-[#9B2C3F] text-[10px] font-bold uppercase tracking-[0.3em] block mb-6">
              {feature.note}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2C2A26] leading-[1.2] md:leading-[1.1] mb-8">
              {feature.title}
            </h2>
            <p className="text-[#6D6A61] text-lg font-light leading-relaxed mb-10">
              {feature.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="border-l border-[#D5B55B] pl-8 mb-12"
          >
            <blockquote className="font-serif text-2xl italic text-[#2C2A26] mb-4">
              &quot;{story.quote}&quot;
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-8 pt-8 border-t border-[#E5E0D8]"
          >
            {feature.facts.slice(0, 2).map((fact, i) => (
              <div key={i}>
                <span className="block font-serif text-4xl text-[#2C2A26] mb-2">{fact.value}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E8B82]">{fact.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
