"use client";
import { motion } from "motion/react";
import Image from "next/image";

const stages = [
  {
    num: "01",
    title: "Arrive",
    desc: "Leave the world at the door. Herbal tea. Soft robes. Silence.",
  },
  {
    num: "02",
    title: "Release",
    desc: "Expert hands. Warm stones. Oils pressed from plants. Tension dissolves.",
  },
  {
    num: "03",
    title: "Renew",
    desc: "Emergence. Lighter. Clearer. More yourself than when you arrived.",
  },
];

export default function Experience() {
  return (
    <section className="bg-brand-white py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-brand-sage text-[13px] uppercase tracking-[0.12em] font-medium mb-6"
          >
            The Experience
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em]"
          >
            More Than a Treatment.<br className="hidden md:block" /> A Journey.
          </motion.h2>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative aspect-[3/4] md:aspect-[4/5] lg:aspect-square overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1.05 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/experience.png" // Spa path or stone details
                alt="Atmospheric spa detail"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </motion.div>

          {/* Stages */}
          <div className="w-full lg:w-1/2 flex flex-col gap-16 lg:gap-20">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                <div className="font-serif text-[60px] md:text-[80px] leading-[0.8] text-brand-sand/80 font-light">
                  {stage.num}
                </div>
                <div className="flex flex-col mt-2">
                  <h3 className="font-serif text-[28px] md:text-[32px] text-brand-charcoal mb-4">
                    {stage.title}
                  </h3>
                  <p className="font-sans text-[15px] md:text-[17px] text-brand-charcoal/80 leading-[1.7] max-w-sm">
                    {stage.desc}
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
