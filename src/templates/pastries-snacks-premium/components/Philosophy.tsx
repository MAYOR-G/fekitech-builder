import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Philosophy() {
  const { feature, process } = useTemplateData();

  return (
    <section className="py-32 bg-[#E5B53A] text-[#111111]" id="philosophy">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Feature / Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-[#111111] text-[#F9F9F9] px-4 py-1 font-bold text-xs uppercase tracking-widest mb-8">
              {feature.note}
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
              {feature.title}
            </h2>
            <p className="text-xl font-medium mb-10 max-w-md opacity-90">
              {feature.description}
            </p>
            <a
              href={feature.buttonHref}
              className="inline-block px-10 py-5 bg-[#111111] text-[#F9F9F9] text-sm font-bold uppercase tracking-widest hover:bg-[#F9F9F9] hover:text-[#111111] transition-colors"
            >
              {feature.buttonLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="aspect-square bg-[#111111] overflow-hidden"
          >
            <img 
              src={feature.image} 
              alt={feature.imageAlt} 
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 hover:scale-105" 
            />
          </motion.div>
        </div>

        {/* Process */}
        <div className="border-t-4 border-[#111111] pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="font-serif text-4xl md:text-6xl font-bold uppercase tracking-tighter max-w-xl leading-[0.9]">
              {process.title}
            </h2>
            <p className="text-xl font-medium max-w-sm opacity-90 text-right">
              {process.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#111111] text-[#F9F9F9] p-8"
              >
                <div className="text-5xl font-serif font-bold text-[#E5B53A] mb-6">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-[#A0A0A0] font-medium leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
