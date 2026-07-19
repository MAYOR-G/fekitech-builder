"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion, Variants } from "motion/react";
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
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function StickyStory() {
  const { storyCards } = useTemplateData();

  return (
    <section className="bg-porcelain px-5 py-24 sm:py-32 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
          
          {/* Left: Image Pane */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[600px] lg:h-[800px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <TemplateImage
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80"
              alt="Bright modern dental clinic interior highlighting advanced technology."
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            {/* Subtle overlay gradient to frame the image perfectly */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            
            {/* Floating Badge */}
            <div className="absolute bottom-8 left-8 right-8 md:right-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white">
              <p className="text-sm font-bold uppercase tracking-widest text-ocean mb-1">Clinic Environment</p>
              <p className="font-display text-xl font-bold text-ink">Designed for comfort & safety.</p>
            </div>
          </motion.div>

          {/* Right: Content Pane */}
          <div className="flex flex-col justify-center">
            <SectionHeader
              eyebrow="Calm, Technology, Hygiene"
              title="The details you notice before you know what to ask."
              description="We’ve built an environment that prioritizes your peace of mind. Our clinical protocols and advanced technology work silently in the background, ensuring an elevated experience."
            />

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="mt-12 flex flex-col gap-8"
            >
              {storyCards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.div variants={itemVariants} key={card.title} className="group flex gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-ocean transition-all duration-300 group-hover:scale-110 group-hover:bg-ocean group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-slate-600 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
