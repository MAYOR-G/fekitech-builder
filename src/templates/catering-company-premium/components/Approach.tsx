import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Approach() {
  const { feature, process } = useTemplateData();

  return (
    <section className="py-32 bg-[#3C2A21] text-[#F7F5F0]" id="approach">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Feature */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 w-full aspect-[4/5] relative rounded-[2rem] overflow-hidden lg:order-2"
          >
            <img 
              src={feature.image} 
              alt={feature.imageAlt} 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 lg:order-1"
          >
            <span className="text-[#556B2F] text-[11px] font-bold uppercase tracking-[0.3em] mb-8 block">
              {feature.note}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-[1.1]">
              {feature.title}
            </h2>
            <p className="text-[#F7F5F0]/70 text-lg leading-relaxed mb-10 max-w-lg">
              {feature.description}
            </p>
            <a
              href={feature.buttonHref}
              className="inline-block px-10 py-4 bg-[#556B2F] text-[#F7F5F0] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#F7F5F0] hover:text-[#3C2A21] transition-colors"
            >
              {feature.buttonLabel}
            </a>
          </motion.div>
        </div>

        {/* Process */}
        <div className="pt-20 border-t border-[#F7F5F0]/10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">{process.title}</h2>
            <p className="text-[#F7F5F0]/70 max-w-2xl mx-auto text-lg leading-relaxed">
              {process.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-[#556B2F]/30" />
            
            {process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative z-10 text-center"
              >
                <div className="w-14 h-14 mx-auto bg-[#556B2F] rounded-full flex items-center justify-center font-serif text-xl mb-8 border-4 border-[#3C2A21]">
                  {index + 1}
                </div>
                <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                <p className="text-[#F7F5F0]/70 text-sm leading-relaxed">
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
