"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <TemplateImage 
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=80" 
          alt="Abstract Architecture" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-[40px] md:text-[56px] text-charcoal leading-[1.1] mb-6">
            Ready to Make Your Move?
          </h2>
          <p className="text-[16px] md:text-[18px] text-charcoal/70 leading-[1.6] mb-10 max-w-2xl mx-auto">
            Whether you&apos;re looking to buy your dream home, sell a prime asset, or entrust your portfolio to expert management, our team is ready to assist.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-charcoal text-white text-[13px] uppercase tracking-widest font-medium hover:bg-gold transition-colors duration-300">
              Request Valuation
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-charcoal text-charcoal text-[13px] uppercase tracking-widest font-medium hover:bg-charcoal hover:text-white transition-colors duration-300">
              Contact Office
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
