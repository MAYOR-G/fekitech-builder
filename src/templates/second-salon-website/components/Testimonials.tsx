"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const testimonials = [
  {
    quote: "I've never felt more beautiful. The attention to detail and the luxurious atmosphere make every visit to Lumière a transformative experience.",
    name: "Eleanor Vance",
    service: "Balayage & Styling",
  },
  {
    quote: "My bridal makeup was flawless and lasted through tears, dancing, and heat. The team truly listens and elevates your natural features.",
    name: "Sophia Martinez",
    service: "Bridal Package",
  },
  {
    quote: "The only place I trust with my nails. It's not just a manicure; it's artistry. The level of care here is unmatched anywhere else.",
    name: "Olivia Chen",
    service: "Nail Couture",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-cream py-32 md:py-48 overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        
        {/* Large Decorative Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[120px] md:text-[180px] leading-none font-serif text-brand-mauve/20 absolute top-10 md:top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none"
        >
          &ldquo;
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mb-16 md:mb-24 mt-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-brand-charcoal">
            Words from Our <span className="italic">Clients.</span>
          </h2>
        </motion.div>

        {/* Carousel Content */}
        <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <p className="font-serif text-2xl md:text-4xl text-brand-charcoal leading-relaxed max-w-4xl mb-8">
                &quot;{testimonials[currentIndex].quote}&quot;
              </p>
              <div className="flex flex-col items-center">
                <span className="font-sans font-semibold text-sm uppercase tracking-widest text-brand-charcoal mb-1">
                  {testimonials[currentIndex].name}
                </span>
                <span className="font-sans text-xs uppercase tracking-wider text-brand-mauve">
                  {testimonials[currentIndex].service}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-3 mt-12 relative z-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-brand-mauve w-6" : "bg-brand-charcoal/20 hover:bg-brand-charcoal/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
