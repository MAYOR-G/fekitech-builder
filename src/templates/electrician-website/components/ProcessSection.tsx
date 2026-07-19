"use client";
import { motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function ProcessSection() {
  const { processSteps } = useTemplateData();

  return (
    <section id="process" className="bg-navy px-5 py-24 sm:py-32 lg:px-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-circuit-hero opacity-80" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />
      <div className="absolute -left-40 top-1/4 h-[40rem] w-[40rem] rounded-full bg-cobalt/10 blur-[120px]" />
      
      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="How we work"
          title="A clear, documented process for every call."
          description="We remove the guesswork from electrical repairs. From the first call to the final safety check, you'll know exactly what's happening and what it costs."
          tone="light"
          align="center"
        />

        <div className="mx-auto mt-16 max-w-4xl sm:mt-24">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute bottom-0 left-[2.25rem] top-0 hidden w-px bg-white/10 md:block" />

            <div className="flex flex-col gap-12 md:gap-16">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-10"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan shadow-[0_0_30px_rgba(0,229,255,0.15)] md:h-18 md:w-18 z-10">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div className="flex-1 md:pt-3">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-white">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="mt-3 text-lg leading-relaxed text-slate-300">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
