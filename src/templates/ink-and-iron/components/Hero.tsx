"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
import { useTemplateData } from "../TemplateContext";

const inkParticles = Array.from({ length: 20 }, (_, index) => ({
  size: 2 + ((index * 7) % 6),
  left: (index * 37) % 100,
  top: (index * 61) % 100,
  rise: 100 + ((index * 29) % 100),
  duration: 5 + ((index * 13) % 5),
  delay: (index * 17) % 5,
}));

export default function Hero() {
  const content = useTemplateData();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg }}
      >
        <Image
          src="/images/hero.png"
          alt="Tattoo artist doing linework"
          fill
          priority
          className="object-cover object-center opacity-70"
          sizes="100vw"
        />
        {/* Radial vignette overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-[#0A0A0A]" />
      </motion.div>

      {/* Floating Ink Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {inkParticles.map((particle, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-[#141414]"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -particle.rise],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
                delay: particle.delay,
              }}
            />
          ))}
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex flex-col items-center text-center mt-12"
        style={{ y: yText, opacity: opacityText }}
      >
        <div className="overflow-hidden mb-2">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#C9A84C] font-semibold tracking-[0.3em] text-xs uppercase"
          >
            A Premium UK Studio
          </motion.p>
        </div>

        <h1 className="font-display text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.85] tracking-tight text-white mb-8 text-balance-hero">
          <motion.span
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="block"
          >
            {content.hero.title}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-[#F5F5F5]/70 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <button className="group relative w-full sm:w-auto bg-[#C9A84C] text-[#141414] px-8 py-4 font-bold tracking-widest text-xs uppercase overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              {content.hero.button}
            </span>
            <div className="absolute inset-0 h-full w-full bg-[#8B2635] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
          </button>
          
          <button className="group relative w-full sm:w-auto border border-white/20 bg-transparent text-white px-8 py-4 font-bold tracking-widest text-xs uppercase overflow-hidden hover:border-white/50 transition-colors">
            <span className="relative z-10 group-hover:text-[#141414] transition-colors duration-300">
              Explore Portfolio
            </span>
            <div className="absolute inset-0 h-full w-full bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.76,0,0.24,1]" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
