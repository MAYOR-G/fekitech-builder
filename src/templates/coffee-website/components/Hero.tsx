"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTemplateData } from '../TemplateContext';


const Hero = () => {
  const siteContent = useTemplateData();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % siteContent.hero.slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [siteContent.hero.slides.length]);

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden bg-coffee-dark">
      <AnimatePresence mode="wait">
        {siteContent.hero.slides.map((slide, index) => (
          index === currentSlide && (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {/* Image */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center text-coffee-light">
                <motion.h1 
                  className="font-serif text-6xl md:text-8xl font-extrabold mb-6 tracking-tight drop-shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {slide.headline}
                </motion.h1>
                <motion.p 
                  className="max-w-2xl text-xl md:text-2xl font-medium mb-10 drop-shadow-md"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {slide.subtext}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  <a href="#menu" className="bg-coffee-light text-coffee-dark px-8 py-3 rounded-none font-medium hover:bg-coffee-cream transition-colors uppercase tracking-widest text-sm shadow-md">
                    Explore the Menu
                  </a>
                  <a href="#visit" className="border border-coffee-light text-coffee-light px-8 py-3 rounded-none font-medium hover:bg-coffee-light hover:text-coffee-dark transition-colors uppercase tracking-widest text-sm shadow-md">
                    Visit Our Coffee House
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
        {siteContent.hero.slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 transition-all duration-500 rounded-none ${
              index === currentSlide ? 'w-8 bg-coffee-light' : 'w-4 bg-coffee-light/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
