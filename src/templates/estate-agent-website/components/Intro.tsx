"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';

export default function Intro() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-2 md:order-1"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-none">
            <TemplateImage 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80" 
              alt="The Agency Team" 
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>

        <div className="order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-6 block">
              The Agency
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-[36px] md:text-[48px] text-charcoal mb-8 leading-[1.15]"
          >
            More Than Listings.<br />A Better Property Experience.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-charcoal/80 text-[16px] leading-[1.6]"
          >
            <p>
              We believe moving should be a moment of progress, not stress. Whether you&apos;re selling a family home or searching for your next London apartment, Northlane provides clarity and confidence at every step.
            </p>
            <p>
              Our approach is built on local knowledge, relentless presentation standards, and expert negotiation. We position properties to achieve the best possible outcome.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-8"
          >
            <div className="inline-flex items-center gap-4 bg-ivory py-3 px-5 rounded-full border border-gray-100">
              <span className="font-serif text-2xl text-gold">15+</span>
              <span className="text-[11px] uppercase tracking-widest font-medium">Years Experience</span>
            </div>
            
            <div>
              <p className="font-serif text-2xl italic text-charcoal">James Northlane</p>
              <p className="text-[12px] uppercase tracking-widest text-charcoal/50 mt-1">Founder & Director</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
