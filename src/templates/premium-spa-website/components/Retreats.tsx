"use client";
import { motion } from "motion/react";
import Image from "next/image";

const retreats = [
  {
    title: "Half-Day Escape",
    duration: "3.5 Hours",
    price: "From £250",
    description: "A perfect reset. Includes a 60-minute massage, a bespoke botanical facial, and exclusive access to our thermal suites and relaxation lounges.",
    image: "/images/retreat-half.png", // We will provide these images later
  },
  {
    title: "Full-Day Sanctuary",
    duration: "6.5 Hours",
    price: "From £420",
    description: "Total immersion. Features our signature hot stone ritual, deep tissue release, guided meditation, and a nourishing organic lunch.",
    image: "/images/retreat-full.png",
  }
];

export default function Retreats() {
  return (
    <section id="retreats" className="bg-brand-linen py-32 md:py-48 overflow-hidden">
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
            Immersive Journeys
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em]"
          >
            The Retreats.
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          {retreats.map((retreat, index) => (
            <motion.div
              key={retreat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className="w-full md:w-1/2 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden mb-8 bg-brand-stone">
                <Image
                  src={retreat.image}
                  alt={retreat.title}
                  fill
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col">
                <div className="flex justify-between items-baseline mb-4 border-b border-brand-sand/50 pb-4">
                  <h3 className="font-serif text-[28px] md:text-[32px] text-brand-charcoal group-hover:text-brand-sage transition-colors duration-300">
                    {retreat.title}
                  </h3>
                  <div className="text-right">
                    <span className="block font-sans text-[13px] uppercase tracking-widest text-brand-muted mb-1">
                      {retreat.duration}
                    </span>
                    <span className="block font-sans text-[15px] text-brand-charcoal">
                      {retreat.price}
                    </span>
                  </div>
                </div>
                <p className="font-sans text-[15px] leading-[1.7] text-brand-charcoal/80 mb-8">
                  {retreat.description}
                </p>
                <a
                  href="#book"
                  className="inline-block self-start text-[13px] uppercase tracking-[0.06em] font-medium text-brand-charcoal border-b border-brand-charcoal pb-1 transition-all duration-300 hover:text-brand-sage hover:border-brand-sage"
                >
                  Reserve Your Retreat
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
