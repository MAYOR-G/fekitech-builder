"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { ShieldCheck, HardHat, CheckCircle2, Home } from "lucide-react";

const icons = [ShieldCheck, HardHat, Home, CheckCircle2];

export default function WhyUs() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[var(--color-secondary)] text-white relative">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Content Left */}
          <div className="w-full lg:w-3/5">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
              <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">{data.whyUs.kicker}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-16 leading-tight max-w-2xl">
              {data.whyUs.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {data.whyUs.features.map((feature, idx) => {
                const Icon = icons[idx % icons.length];
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="text-[var(--color-primary)] shrink-0">
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          
          {/* Image Right with overlapping stats below */}
          <div className="w-full lg:w-2/5 relative mt-8 lg:mt-0">
             <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative z-10 rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-2xl"
             >
               <img src={data.whyUs.image} alt="Carpentry working" className="w-full h-auto object-cover aspect-[3/4]" />
             </motion.div>
             <div className="absolute -inset-4 border-2 border-[var(--color-primary)]/30 rounded-tl-[116px] rounded-br-[116px] -z-10 hidden md:block"></div>
          </div>

        </div>
      </div>

      {/* Stats overlapping banner at the bottom */}
      <div className="container mx-auto px-4 mt-24">
        <div className="bg-[var(--color-accent)] rounded-lg shadow-xl p-8 md:p-12 relative z-20 flex flex-col md:flex-row justify-around items-center gap-8 -mb-40">
          {data.whyUs.stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <span className="text-5xl font-black text-[var(--color-primary)]">{stat.value}</span>
              <span className="text-[var(--color-secondary)] font-bold uppercase tracking-widest text-xs w-24 leading-relaxed">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
