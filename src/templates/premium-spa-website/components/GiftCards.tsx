"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function GiftCards() {
  return (
    <section id="gifts" className="bg-brand-white">
      <div className="flex flex-col lg:flex-row">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-24 md:py-32 lg:py-48 px-6 md:px-12 xl:px-24">
          <div className="max-w-md flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-brand-sage text-[13px] uppercase tracking-[0.12em] font-medium mb-6"
            >
              Share the Peace
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em] mb-6"
            >
              Give the Gift of Stillness.
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="font-sans text-[15px] leading-[1.7] text-brand-charcoal/80 mb-10"
            >
              Whether it’s a specific treatment, a full-day retreat, or a monetary value, a SANCTUM gift card is an invitation to pause and breathe.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a
                href="#buy-digital"
                className="px-8 py-3 rounded-full bg-brand-charcoal text-white text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300 hover:brightness-110 hover:shadow-sm text-center"
              >
                Digital Card
              </a>
              <a
                href="#buy-physical"
                className="px-8 py-3 rounded-full border border-brand-charcoal text-brand-charcoal text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300 hover:bg-brand-charcoal hover:text-white text-center"
              >
                Physical Card
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-0">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/giftcard.png"
              alt="Beautifully packaged physical gift card"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
