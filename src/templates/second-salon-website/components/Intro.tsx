"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function Intro() {
  return (
    <section id="about" className="bg-white py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px]"
          >
            <div className="absolute inset-0 bg-brand-cream/50 translate-x-4 translate-y-4 md:translate-x-8 md:translate-y-8 z-0" />
            <div className="relative z-10 w-full h-full">
              <Image
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Stylist working in a premium salon"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <span className="text-brand-mauve text-sm uppercase tracking-[0.1em] font-semibold mb-6">
              The Experience
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1] mb-8">
              More Than a Salon.<br />
              <span className="italic">A Sanctuary.</span>
            </h2>
            <p className="text-brand-gray text-lg leading-relaxed mb-10 max-w-lg">
              Every visit is a curated experience. From the moment you step in, our artists craft a look that is uniquely yours, blending high-fashion expertise with deeply personal care. Leave the noise of the world outside.
            </p>
            <div className="mt-4">
              <span className="font-serif text-3xl italic text-brand-charcoal/80 block">
                Lumière
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
