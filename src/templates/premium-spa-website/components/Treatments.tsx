"use client";
import { motion } from "motion/react";
import Image from "next/image";

const treatments = [
  {
    title: "The Deep Tissue Release",
    category: "MASSAGE",
    description: "Therapeutic pressure to melt tension.",
    details: "60/90 min · From £95",
    image: "/images/treatments/massage.png",
  },
  {
    title: "The Botanical Facial",
    category: "FACIAL",
    description: "Plant-based serums for radiant skin.",
    details: "60 min · From £85",
    image: "/images/treatments/facial.png",
  },
  {
    title: "The Hot Stone Ritual",
    category: "RITUAL",
    description: "Warm basalt stones for deep calm.",
    details: "90 min · From £120",
    image: "/images/treatments/ritual.png",
  },
  {
    title: "The Herbal Compress",
    category: "THERAPY",
    description: "Thai-inspired heated herbal pouches.",
    details: "75 min · From £110",
    image: "/images/treatments/herbal.png",
  },
  {
    title: "The Aromatherapy Journey",
    category: "WELLNESS",
    description: "Custom oil blends for balance.",
    details: "60 min · From £90",
    image: "/images/treatments/herbal.png",
  },
  {
    title: "The Full Retreat",
    category: "EXPERIENCE",
    description: "A half-day of treatments and stillness.",
    details: "3 hrs · From £250",
    image: "/images/treatments/massage.png",
  },
];

export default function Treatments() {
  return (
    <section id="treatments" className="bg-brand-linen py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-brand-sage text-[13px] uppercase tracking-[0.12em] font-medium mb-6"
          >
            The Treatments
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em]"
          >
            Crafted for Renewal.
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {treatments.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.12, ease: "easeOut" }}
              className="group cursor-pointer flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-brand-stone transition-all duration-400 ease-out group-hover:-translate-y-[6px] group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow">
                <span className="text-brand-sage text-[11px] uppercase tracking-[0.12em] font-medium mb-3">
                  {item.category}
                </span>
                <h3 className="font-serif text-[24px] text-brand-charcoal mb-2 transition-colors duration-300 group-hover:text-brand-sage">
                  {item.title}
                </h3>
                <p className="font-sans text-[15px] text-brand-charcoal/80 mb-4 flex-grow">
                  {item.description}
                </p>
                <div className="mt-auto pt-4 border-t border-brand-sand/30">
                  <span className="font-sans text-[14px] text-brand-muted">
                    {item.details}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
