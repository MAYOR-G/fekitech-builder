"use client";

import { motion } from "motion/react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function HeroVideo() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden w-full bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="relative w-full overflow-hidden flex justify-center items-center h-[30vh] md:h-[40vh]"
      >
        <video
          src="/animo-ticker-loop-720p.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center pointer-events-none block"
        />
      </motion.div>
    </section>
  );
}
