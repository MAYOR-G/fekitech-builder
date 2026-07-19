"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useTemplateData } from "../TemplateContext";

// Simple text scramble effect hook
const useScramble = (text: string, trigger: boolean) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, trigger]);

  return displayText || text;
};

const backgrounds = [
  "/images/hero_chef_plating_1783066890118.png",
  "/images/hero_bg_plating.png",
  "/images/hero_bg_grill.png",
  "/images/hero_bg_dining.png"
];

export default function Hero() {
  const content = useTemplateData();
  const [mounted, setMounted] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const titleParts = content.hero.title.toUpperCase().split(/\s+/);
  
  const homeText = useScramble(titleParts.slice(0, 2).join(" "), mounted);
  const ofText = useScramble(titleParts.slice(2, 4).join(" "), mounted);
  const foodText = useScramble(titleParts.slice(4).join(" "), mounted);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F0F0F]">
      {/* Background Image Slideshow with Ken Burns effect */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={backgrounds[bgIndex]}
            alt="Hero Background"
            fill sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-5xl mx-auto pt-20">
        <div className="relative flex flex-col items-center justify-center gap-1 md:gap-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tighter leading-none relative z-10"
          >
            {homeText}
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tighter leading-none relative z-10"
          >
            {ofText}
          </motion.h1>

          <div className="relative w-full flex justify-center items-center mt-[-10px] md:mt-[-20px]">
            <div className="relative">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-heading text-6xl md:text-8xl lg:text-[10rem] text-white tracking-tighter leading-none relative z-10"
              >
                {foodText}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                transition={{ duration: 1, delay: 0.8, type: "spring" }}
                className="absolute left-[-20%] md:left-[-10%] top-[-40%] md:top-[-50%] z-20 pointer-events-none drop-shadow-2xl"
              >
                <span className="font-script text-7xl md:text-9xl lg:text-[11rem] text-[#C84B31]">
                  better
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 text-gray-200 max-w-2xl mx-auto font-sans text-lg md:text-xl tracking-wide leading-relaxed drop-shadow-md"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-12 bg-[#C84B31] text-white px-10 py-5 font-bold tracking-[0.2em] text-sm hover:bg-white hover:text-[#0F0F0F] transition-all duration-300 rounded-sm shadow-xl"
        >
          {content.hero.button}
        </motion.button>
      </div>

      {/* Steam particle overlay effect placeholder */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-30"
           style={{
             backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
             filter: 'blur(20px)'
           }}
      />
    </section>
  );
}
