"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    quote: "I’ve visited spas all over the world, but SANCTUM offers something entirely different. It’s not just a treatment; it’s a profound return to oneself.",
    author: "Elena R.",
    role: "Writer"
  },
  {
    quote: "The quietest place in the city. The moment you step through the doors, the noise of the outside world completely vanishes.",
    author: "Sarah M.",
    role: "Architect"
  },
  {
    quote: "Their holistic approach to wellness is unparalleled. The therapists have an intuitive touch that left me feeling completely renewed.",
    author: "David L.",
    role: "Designer"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Slow meditative fade every 6 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-forest py-32 md:py-48 overflow-hidden relative text-white">
      {/* Decorative Quotation Mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none">
        <span className="font-serif text-[300px] md:text-[500px] leading-none text-brand-sand">
          &rdquo;
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-brand-sand text-[13px] uppercase tracking-[0.12em] font-medium mb-16"
        >
          Words of Renewal
        </motion.span>

        <div className="h-[250px] md:h-[200px] flex items-center justify-center w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-serif text-[24px] md:text-[36px] leading-[1.4] text-white/90 mb-8 max-w-3xl">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              <div className="flex flex-col items-center gap-1">
                <span className="font-sans text-[14px] uppercase tracking-widest text-brand-sand font-medium">
                  {testimonials[currentIndex].author}
                </span>
                <span className="font-sans text-[13px] text-white/50">
                  {testimonials[currentIndex].role}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-4 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-12 h-12 flex items-center justify-center relative group"
              aria-label={`Go to testimonial ${i + 1}`}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-transparent group-hover:border-white/20 transition-colors" />
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex ? "bg-brand-sand scale-150" : "bg-white/30"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
