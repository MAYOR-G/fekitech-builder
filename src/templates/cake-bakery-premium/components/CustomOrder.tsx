import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function CustomOrder() {
  const { feature, process, packages } = useTemplateData();

  return (
    <section className="bg-[#3D3A35] text-white py-32 rounded-t-[3rem] overflow-hidden" id="process">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="rounded-[2rem] overflow-hidden aspect-[4/3] lg:order-2"
          >
            <img src={feature.image} alt={feature.imageAlt} className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:order-1"
          >
            <span className="text-[#E2A499] text-[10px] font-bold uppercase tracking-[0.3em] block mb-6">
              {feature.note}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              {feature.title}
            </h2>
            <p className="text-[#B89B95] text-lg font-light leading-relaxed mb-10 max-w-lg">
              {feature.description}
            </p>
            <a
              href={feature.buttonHref}
              className="inline-block px-10 py-4 bg-[#E2A499] text-white text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-[#D48F82] transition-colors rounded-full"
            >
              {feature.buttonLabel}
            </a>
          </motion.div>
        </div>

        {/* Process Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">{process.title}</h2>
            <p className="text-[#B89B95] font-light text-lg">{process.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-[28px] left-[12%] right-[12%] h-[1px] bg-[#E2A499]/30" />
            
            {process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#E2A499] text-[#3D3A35] flex items-center justify-center font-serif text-2xl font-semibold mb-6">
                  {index + 1}
                </div>
                <h3 className="font-serif text-2xl mb-3">{step.title}</h3>
                <p className="text-[#B89B95] font-light text-sm max-w-[250px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Packages Section */}
        <div id="packages">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl mb-4">{packages.title}</h2>
            <p className="text-[#B89B95] font-light text-lg">{packages.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.items.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`rounded-[2rem] p-10 flex flex-col h-full ${
                  idx === 1 ? "bg-[#E2A499] text-[#3D3A35]" : "bg-[#4A4742] text-white"
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-4 block ${idx === 1 ? "text-[#3D3A35]" : "text-[#E2A499]"}`}>
                  {pkg.note}
                </span>
                <h3 className="font-serif text-3xl mb-2">{pkg.name}</h3>
                <div className="font-serif text-2xl mb-6 opacity-90">{pkg.price}</div>
                <p className={`font-light mb-8 flex-grow ${idx === 1 ? "text-[#3D3A35]/80" : "text-[#B89B95]"}`}>
                  {pkg.description}
                </p>
                
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className={`mt-1 text-[10px] ${idx === 1 ? "text-[#3D3A35]" : "text-[#E2A499]"}`}>✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href={pkg.buttonHref}
                  className={`mt-auto block text-center px-6 py-4 rounded-full text-[11px] font-bold uppercase tracking-widest transition-colors ${
                    idx === 1 
                      ? "bg-[#3D3A35] text-white hover:bg-[#2A2825]" 
                      : "bg-[#3D3A35] text-white border border-[#E2A499]/30 hover:border-[#E2A499]"
                  }`}
                >
                  {pkg.buttonLabel}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
