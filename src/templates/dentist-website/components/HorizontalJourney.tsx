"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from "motion/react";
import { CheckCircle2, ClipboardList, Stethoscope, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    title: "Initial Consultation",
    description: "We discuss your goals, take digital scans, and outline your personalized treatment plan.",
    icon: Stethoscope,
  },
  {
    title: "Treatment Planning",
    description: "Our team designs your smile with precision, showing you a digital preview of the final results.",
    icon: ClipboardList,
  },
  {
    title: "The Procedure",
    description: "Experience comfortable, state-of-the-art care in our relaxing clinic environment.",
    icon: Sparkles,
  },
  {
    title: "Aftercare & Results",
    description: "We provide comprehensive aftercare instructions to ensure your new smile lasts a lifetime.",
    icon: CheckCircle2,
  },
];

export function HorizontalJourney() {
  return (
    <section className="relative py-24 sm:py-32 border-t border-slate-100 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <TemplateImage 
          src="/images/dentist_patient_bg_1781688652799.png" 
          alt="Dentist and patient in a modern clinic"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 lg:p-12 shadow-sm border border-white/50">
          <SectionHeader 
            eyebrow="The Patient Experience" 
            title="Your journey to a confident smile." 
            description="From the moment you walk in, we ensure a transparent, comfortable, and predictable process."
          />
        </div>

        <div className="mt-20 relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-100 lg:left-1/2 lg:-translate-x-px"></div>

          <div className="relative space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-start lg:items-center gap-8 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`hidden lg:block w-1/2 ${isEven ? "text-left pl-12" : "text-right pr-12"}`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50">
                      <h3 className="font-display text-2xl font-extrabold text-navy">{step.title}</h3>
                      <p className="mt-3 text-lg text-slate-900 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Center Dot */}
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white border-[6px] border-slate-50 shadow-xl transition-transform hover:scale-110">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white shadow-inner">
                      <step.icon className="h-6 w-6" strokeWidth={2.5} />
                    </div>
                  </div>

                  <div className={`lg:w-1/2 ${isEven ? "lg:pr-12" : "lg:pl-12"}`}>
                    <div className="lg:hidden bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-white/50">
                      <h3 className="font-display text-xl font-extrabold text-navy">{step.title}</h3>
                      <p className="mt-2 text-slate-900 font-medium leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
