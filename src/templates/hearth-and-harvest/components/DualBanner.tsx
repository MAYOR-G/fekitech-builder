"use client";
import { motion } from "motion/react";
import Image from "next/image";

export default function DualBanner() {
  return (
    <section className="w-full flex flex-col md:flex-row h-[60vh] md:h-[70vh]">
      
      {/* Left Banner */}
      <div className="relative w-full md:w-1/2 h-full group overflow-hidden cursor-pointer">
        <Image
          src="/images/location_interior_1783067183003.png"
          alt="Our Story"
          fill sizes="100vw"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-script text-5xl md:text-7xl text-white tracking-wide"
          >
            Our Story
          </motion.h3>
        </div>
      </div>

      {/* Right Banner */}
      <div className="relative w-full md:w-1/2 h-full group overflow-hidden cursor-pointer">
        <Image
          src="/images/dish_biryani_1783066949423.png"
          alt="Subscriptions"
          fill sizes="100vw"
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-script text-5xl md:text-7xl text-white tracking-wide"
          >
            Subscriptions
          </motion.h3>
        </div>
      </div>
      
    </section>
  );
}
