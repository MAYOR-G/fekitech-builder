"use client";

import { motion } from "motion/react";

export default function FloatingMockups() {
  return (
    <section className="relative w-full bg-white flex flex-col items-center overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      
      {/* The Text */}
      <div className="relative z-20 px-6 w-full flex justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1080px] text-balance text-center text-[clamp(28px,3.8vw,48px)] font-[560] leading-[1.12] tracking-[-0.01em] text-black"
        >
          Turn a strong template into a website that feels like yours.
          <span className="mx-auto mt-4 block max-w-[1080px] md:mt-6 text-[clamp(18px,2vw,24px)] text-gray-500 font-normal">
            Preview designs, customize your draft, and activate a plan when you are ready to publish.
          </span>
        </motion.h2>
      </div>

    </section>
  );
}
