import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Philosophy() {
  const { feature, process } = useTemplateData();

  return (
    <section className="py-32 bg-[#FFE600] text-[#111111] overflow-hidden" id="philosophy">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Feature */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-32 relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2 z-10"
          >
            <div className="inline-block bg-[#111111] text-[#FFE600] px-4 py-2 font-bold text-sm uppercase tracking-widest border-2 border-[#111111] shadow-[4px_4px_0px_0px_#FF2A00] mb-8 rotate-[2deg]">
              {feature.note}
            </div>
            <h2 className="font-serif text-[4rem] md:text-[6rem] lg:text-[7rem] font-bold uppercase leading-[0.85] mb-8 drop-shadow-[4px_4px_0_#111111]">
              {feature.title}
            </h2>
            <p className="text-2xl font-bold mb-10 p-6 bg-[#F9F9F9] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] max-w-lg">
              {feature.description}
            </p>
            <a
              href={feature.buttonHref}
              className="inline-block px-10 py-5 bg-[#FF2A00] text-[#FFE600] text-xl font-bold uppercase tracking-widest border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] hover:translate-y-2 hover:shadow-none transition-all"
            >
              {feature.buttonLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:w-1/2 w-full aspect-square md:aspect-video lg:aspect-square relative overflow-hidden group border-8 border-[#111111] shadow-[16px_16px_0px_0px_#FF2A00]"
          >
            <img 
              src={feature.image} 
              alt={feature.imageAlt} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            />
          </motion.div>
        </div>

        {/* Process */}
        <div className="mt-32">
          <div className="text-center mb-20">
            <h2 className="font-serif text-[4rem] md:text-[6rem] font-bold uppercase drop-shadow-[4px_4px_0_#FF2A00] mb-6">
              {process.title}
            </h2>
            <p className="text-2xl font-bold inline-block bg-[#111111] text-[#FFE600] p-4 border-2 border-[#111111] shadow-[6px_6px_0px_0px_#FF2A00]">
              {process.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F9F9F9] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] p-8 flex flex-col hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#FF2A00] transition-all relative"
              >
                <div className="absolute -top-6 -right-6 bg-[#FF2A00] text-[#FFE600] w-16 h-16 border-4 border-[#111111] shadow-[4px_4px_0px_0px_#111111] rounded-full flex items-center justify-center font-serif text-3xl font-bold rotate-[10deg]">
                  {index + 1}
                </div>
                <h3 className="font-serif text-4xl font-bold uppercase mb-4 leading-none pr-8">
                  {step.title}
                </h3>
                <p className="font-bold text-lg border-t-4 border-[#111111] pt-4 mt-auto">
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
