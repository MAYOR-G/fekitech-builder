"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Camera, Users, Briefcase } from 'lucide-react';

const differences = [
  {
    icon: <Camera className="w-6 h-6 text-gold" />,
    title: 'Premium Marketing',
    description: 'Professional photography, floorplans, and lifestyle-led copy that builds desire.',
  },
  {
    icon: <Users className="w-6 h-6 text-gold" />,
    title: 'Proactive Matching',
    description: 'Pre-market access to our blackbook of qualified buyers and international relocation agents.',
  },
  {
    icon: <Briefcase className="w-6 h-6 text-gold" />,
    title: 'Stronger Offers, Smooth Completion',
    description: 'Expert negotiation to maximize your price, followed by dedicated sales progression support.',
  }
];

export default function Difference() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-4 block">
            Why Northlane
          </span>
          <h2 className="font-serif text-[36px] md:text-[48px] text-charcoal leading-[1.15]">
            The Northlane Difference.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {differences.map((diff, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="mb-6 w-12 h-12 bg-ivory rounded-full flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-300">
                {diff.icon}
              </div>
              <h3 className="font-serif text-[22px] text-charcoal mb-4">
                {diff.title}
              </h3>
              <p className="text-[15px] text-charcoal/70 leading-[1.6] mb-8">
                {diff.description}
              </p>
              <div className="w-12 h-[1px] bg-gold/30 group-hover:w-full transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
