"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function Results() {
  const { resultCases } = useTemplateData();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((previous) => (previous + 1) % resultCases.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [resultCases.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % resultCases.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + resultCases.length) % resultCases.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  const activeCase = resultCases[currentIndex];

  return (
    <section id="results" className="bg-white px-5 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Smile results"
          title="Tasteful transformations with realistic expectations."
          description="Browse approved patient cases and simulated planning examples. We focus on conservative care and natural aesthetics without making unrealistic guarantees."
          align="center"
        />

        <div className="mt-16 relative mx-auto max-w-5xl">
          {/* Carousel Container */}
          <div className="relative h-[600px] w-full overflow-hidden rounded-[2rem] bg-porcelain shadow-2xl border border-slate-100">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.4 }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <div className="flex flex-col md:flex-row h-full">
                  
                  {/* Images Area */}
                  <div className="w-full md:w-2/3 h-1/2 md:h-full relative flex">
                    <div className="w-1/2 h-full relative border-r-4 border-white">
                      <TemplateImage
                        src={activeCase.beforeImage}
                        alt="Before treatment"
                        className="w-full h-full object-cover"
                        style={{ filter: "brightness(0.9) contrast(0.85) sepia(0.3) hue-rotate(-5deg)" }}
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest text-ink shadow-sm">
                        BEFORE
                      </div>
                    </div>
                    <div className="w-1/2 h-full relative">
                      <TemplateImage
                        src={activeCase.afterImage}
                        alt="After treatment"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-ocean/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold tracking-widest text-white shadow-sm">
                        AFTER
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="w-full md:w-1/3 h-1/2 md:h-full bg-white p-8 md:p-12 flex flex-col justify-center">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-ocean mb-3">
                      {activeCase.treatment}
                    </p>
                    <h3 className="font-display text-3xl font-bold leading-tight text-ink mb-4">
                      {activeCase.title}
                    </h3>
                    <div className="h-px w-12 bg-slate-200 mb-4" />
                    <p className="text-slate-600 leading-relaxed text-sm">
                      Typical timeline shown for context: <span className="font-semibold text-ink">{activeCase.timeline}</span>. Final
                      recommendations depend on clinical examination and baseline oral health.
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute bottom-6 md:bottom-12 right-6 md:right-[calc(33.333%-1.5rem)] flex gap-2 z-10 transform translate-x-full pr-8">
              <button
                onClick={prevSlide}
                className="h-12 w-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-ink hover:bg-slate-50 hover:scale-105 transition-all"
                aria-label="Previous case"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="h-12 w-12 rounded-full bg-ocean shadow-md flex items-center justify-center text-white hover:bg-ocean-dark hover:scale-105 transition-all"
                aria-label="Next case"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-mist px-4 py-2 text-sm font-medium text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              Results vary by patient.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
