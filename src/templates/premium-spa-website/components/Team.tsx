"use client";
import { motion } from "motion/react";
import Image from "next/image";

const team = [
  {
    name: "Dr. Amara Lin",
    role: "Lead Holistic Therapist",
    image: "/images/team-1.png",
    description: "Specializing in ancient eastern modalities and energy healing."
  },
  {
    name: "Julian Brooks",
    role: "Master Massage Therapist",
    image: "/images/team-2.png",
    description: "Expert in deep tissue release and structural integration."
  },
  {
    name: "Sophie Chen",
    role: "Botanical Esthetician",
    image: "/images/team-3.png",
    description: "Crafting bespoke skincare rituals using organic botanicals."
  }
];

export default function Team() {
  return (
    <section id="team" className="bg-brand-linen py-32 md:py-48 overflow-hidden">
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
            Our Practitioners
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em]"
          >
            Guided by Experts.
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
              className="flex flex-col group cursor-default"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-8 bg-brand-stone">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90 grayscale-[20%]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-serif text-[26px] text-brand-charcoal mb-2">
                {member.name}
              </h3>
              <span className="font-sans text-[12px] uppercase tracking-[0.12em] text-brand-sage font-medium mb-4">
                {member.role}
              </span>
              <p className="font-sans text-[15px] leading-[1.6] text-brand-charcoal/70">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
