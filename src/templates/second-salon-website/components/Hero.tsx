"use client";
import { motion, Variants } from "motion/react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTemplateData } from "../TemplateContext";

export default function Hero() {
  const content = useTemplateData();
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Background Image with Ken Burns effect */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hair_styling_1782739078773.png')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/10" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl md:text-7xl lg:text-[120px] leading-[1.1] tracking-tight mb-6"
          >
            {content.hero.title}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="font-sans text-lg md:text-xl text-white/90 max-w-lg mb-10 font-light"
          >
            {content.hero.subtitle}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Link
              href="#book"
              className="bg-brand-mauve text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wider hover:bg-brand-plum transition-all duration-300 w-full sm:w-auto text-center"
            >
              {content.hero.button}
            </Link>
            <Link
              href="#services"
              className="bg-transparent border border-white text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wider hover:bg-white hover:text-brand-charcoal transition-all duration-300 w-full sm:w-auto text-center"
            >
              EXPLORE SERVICES
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
      >
        <span className="text-white/60 text-xs uppercase tracking-widest mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
