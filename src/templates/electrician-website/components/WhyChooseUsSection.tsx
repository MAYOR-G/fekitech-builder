"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion, Variants } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function WhyChooseUsSection() {
  const { trustPoints } = useTemplateData();

  return (
    <section id="why" className="overflow-hidden bg-slate-50 px-5 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1">
            <SectionHeader
              eyebrow="Why choose us"
              title="Built on safety, speed, and clear communication."
              description="Electrical issues don't wait for convenient times. We focus on rapid dispatch, accurate diagnosis, and fixing the problem safely the first time."
            />
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="mt-12 flex flex-col gap-8"
            >
              {trustPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <motion.div variants={itemVariants} key={point.title} className="group flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-cobalt transition-colors group-hover:bg-cobalt group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-navy">
                        {point.title}
                      </h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative"
          >
            {/* Image Container */}
            <div className="relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl">
              <TemplateImage 
                src="/images/electrician_why_us_1781688513049.png" 
                alt="Electrician working on an industrial panel" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 -left-6 md:bottom-12 md:-left-12 bg-white rounded-2xl p-6 shadow-xl border border-slate-100 max-w-xs">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-12 w-12 rounded-full bg-amber/20 text-amber flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-navy">Fully Licensed</p>
                  <p className="text-sm text-slate-500">Insured & Bonded</p>
                </div>
              </div>
              <p className="text-sm text-slate-600">All work is performed to strict national safety codes and comes with a workmanship guarantee.</p>
            </div>
            
            {/* Background Decorative Element */}
            <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 bg-cyan/20 rounded-full blur-[80px]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
