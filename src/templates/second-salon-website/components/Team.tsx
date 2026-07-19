"use client";
import { motion } from "motion/react";
import Image from "next/image";

const teamMembers = [
  {
    name: "Sarah Chen",
    title: "Lead Colorist",
    specialty: "Balayage & lived-in color",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mia Rodriguez",
    title: "Senior Stylist",
    specialty: "Precision cuts & extensions",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Emma Davis",
    title: "Makeup Artist",
    specialty: "Bridal & editorial glamour",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chloe Kim",
    title: "Nail Specialist",
    specialty: "Intricate art & gel extensions",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function Team() {
  return (
    <section id="team" className="bg-white py-32 md:py-48">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-brand-mauve text-sm uppercase tracking-[0.1em] font-semibold mb-6 block">
            The Artists
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1]">
            Meet Your <span className="italic">Makers.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="group cursor-pointer flex flex-col items-center text-center"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Text */}
              <h3 className="font-serif text-2xl text-brand-charcoal mb-1">
                {member.name}
              </h3>
              <p className="text-brand-mauve text-xs uppercase tracking-widest font-semibold mb-3">
                {member.title}
              </p>
              <p className="text-brand-gray text-sm">
                {member.specialty}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
