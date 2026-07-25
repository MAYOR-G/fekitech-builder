import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Services() {
  const { packages, products } = useTemplateData();

  return (
    <section className="py-32 bg-white" id="services">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Packages */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <span className="text-[#556B2F] text-[11px] font-bold uppercase tracking-[0.3em] mb-6 block">
              Our Services
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#3C2A21] mb-6">
              {packages.title}
            </h2>
            <p className="text-[#3C2A21]/70 max-w-2xl mx-auto text-lg leading-relaxed">
              {packages.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.items.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`p-10 rounded-2xl flex flex-col ${
                  idx === 1 ? "bg-[#3C2A21] text-[#F7F5F0]" : "bg-[#E3E0D6] text-[#3C2A21]"
                }`}
              >
                <h3 className="font-serif text-3xl mb-4">{pkg.name}</h3>
                <div className="text-xl font-medium mb-6 opacity-90">{pkg.price}</div>
                <p className="opacity-80 leading-relaxed mb-8 flex-1">
                  {pkg.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="mt-1 opacity-60">✧</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={pkg.buttonHref}
                  className={`block text-center py-4 text-[12px] uppercase tracking-[0.2em] font-medium transition-colors ${
                    idx === 1 
                      ? "bg-[#556B2F] text-[#F7F5F0] hover:bg-[#F7F5F0] hover:text-[#3C2A21]" 
                      : "bg-[#3C2A21] text-[#F7F5F0] hover:bg-[#556B2F]"
                  }`}
                >
                  {pkg.buttonLabel}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sample Menu (Products) */}
        <div id="menu" className="pt-20 border-t border-[#3C2A21]/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="font-serif text-4xl md:text-5xl text-[#3C2A21] mb-6">
                {products.title}
              </h2>
              <p className="text-[#3C2A21]/70 text-lg leading-relaxed">
                {products.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {products.items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-6 group"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden shrink-0 bg-[#E3E0D6]">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-baseline mb-2 border-b border-[#3C2A21]/10 pb-2">
                    <h3 className="font-serif text-2xl text-[#3C2A21] group-hover:text-[#556B2F] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-medium text-[#556B2F] shrink-0 ml-4">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-[#3C2A21]/70 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
