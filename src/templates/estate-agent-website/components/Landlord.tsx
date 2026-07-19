"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';

export default function Landlord() {
  const services = [
    'Tenant Finding & Vetting',
    'Rent Collection & Arrears',
    'Full Management & Maintenance',
    'Legal & Compliance Support'
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-6 block">
              Landlord Services
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-[36px] md:text-[48px] text-charcoal mb-8 leading-[1.15]"
          >
            Hands-off Investment.<br />Seamless Tenancies.
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-charcoal/80 text-[16px] leading-[1.6] mb-12"
          >
            Protect your asset and maximize your yield with our comprehensive landlord services. From finding the perfect corporate tenant to handling maintenance emergencies, we manage every detail so you don&apos;t have to.
          </motion.p>

          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                className="flex items-center gap-6"
              >
                <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-[13px] font-serif text-gold shrink-0 bg-white shadow-sm">
                  {index + 1}
                </div>
                <strong className="text-[15px] text-charcoal font-medium">{service}</strong>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden rounded-none bg-gray-100">
            <TemplateImage 
              src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1000&q=80" 
              alt="Landlord Property Management" 
              className="w-full h-full object-cover" 
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
