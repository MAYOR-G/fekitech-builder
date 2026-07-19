"use client";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function SeasonalMenu() {
  return (
    <section className="bg-brand-dark py-24 md:py-32 px-6 md:px-12 text-brand-white border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-5xl md:text-7xl tracking-widest uppercase mb-6"
          >
            MEET THE SEASONAL MENU
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-brand-gray text-base max-w-xl mx-auto"
          >
            Limited-time dishes, crafted to highlight the freshest ingredients of each season.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 relative">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-[45%] flex flex-col items-center md:items-start"
          >
            <div className="relative w-full aspect-[4/5] mb-8">
              <Image
                src="/images/dish_biryani_1783066949423.png"
                alt="Winter Comfort Platter"
                fill sizes="100vw"
                className="object-cover"
              />
            </div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-heading text-2xl tracking-wider mb-2 uppercase"
            >
              WINTER COMFORT PLATTER
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="font-sans text-brand-gray text-sm mb-4 text-center md:text-left"
            >
              Red Wine, Thyme, Root Vegetables
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link href="#discover" className="text-brand-accent text-xs font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                DISCOVER <span>→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column (Offset) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full md:w-[45%] flex flex-col items-center md:items-start md:mt-32"
          >
            <div className="relative w-full aspect-[4/5] mb-8">
              <Image
                src="/images/dish_tacos_1783066965250.png"
                alt="Spring Garden Plate"
                fill sizes="100vw"
                className="object-cover"
              />
            </div>
            <motion.h3 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="font-heading text-2xl tracking-wider mb-2 uppercase"
            >
              SPRING GARDEN PLATE
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="font-sans text-brand-gray text-sm mb-4 text-center md:text-left"
            >
              Pea Purée, Mint, Asparagus
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              <Link href="#discover" className="text-brand-accent text-xs font-bold tracking-widest uppercase hover:text-white transition-colors flex items-center gap-2">
                DISCOVER <span>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
