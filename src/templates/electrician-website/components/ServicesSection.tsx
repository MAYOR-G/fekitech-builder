"use client";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  const { services } = useTemplateData();

  return (
    <section id="services" className="bg-white px-5 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Capabilities"
          title="Electrical services for homes and businesses."
          description="From emergency fault finding to complete panel upgrades, our licensed technicians deliver safe, compliant, and clearly documented work."
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                variants={itemVariants}
                key={service.title}
                className="group relative flex flex-col items-start justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-cobalt/20"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-cobalt transition-colors group-hover:bg-cobalt group-hover:text-white group-hover:border-transparent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:bg-amber/10 group-hover:text-amber">
                    {service.tag}
                  </span>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-display text-xl font-bold tracking-tight text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan to-cobalt opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
