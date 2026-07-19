"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";
import { motion, AnimatePresence } from "motion/react";

import { useTemplateData } from "../TemplateContext";
const rotationDelay = 2500;

export function Hero() {
  const { heroBadges, heroSlides } = useTemplateData();

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, rotationDelay);

    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % heroSlides.length);
  };

  return (
    <section
      id="top"
      className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-ink"
    >
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="sync">
          <motion.img
            key={activeIndex}
            src={heroSlides[activeIndex].image}
            alt={heroSlides[activeIndex].alt}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Subtle, clean gradient overlay to ensure text readability without dulling the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto flex min-h-[calc(100vh-76px)] max-w-7xl items-center px-6 sm:px-8 lg:px-12 pt-8">
        <div className="w-full max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">
              Private dental care in Chicago
            </p>
            <h1 className="mt-4 font-display text-5xl font-medium leading-[1.05] text-white sm:text-6xl lg:text-7xl">
              Modern Dental Care For Confident Smiles
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
              Gentle treatments, advanced technology, and personalized care designed to make every visit calm, clear, and comfortable.
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="#appointment" className="w-full sm:w-auto bg-white text-ink hover:bg-white/90">
                Book an Appointment
              </ButtonLink>
              <ButtonLink
                href="#treatments"
                variant="secondary"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Explore Treatments
              </ButtonLink>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {heroBadges.map((badge, idx) => (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                  key={badge}
                  className="rounded-full border border-white/20 bg-black/20 backdrop-blur-md px-4 py-2 text-sm font-medium text-white shadow-sm"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation */}
      <div className="absolute bottom-8 right-8 flex items-center gap-3">
        <button
          type="button"
          onClick={goToPrevious}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none"
          aria-label="Show previous hero image"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2 mx-2">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all focus:outline-none",
                index === activeIndex ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Show ${slide.title}`}
              aria-current={index === activeIndex}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={goToNext}
          className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition hover:bg-white/20 focus:outline-none"
          aria-label="Show next hero image"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
