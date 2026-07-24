"use client";
import React, { useEffect } from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

export default function Testimonials() {
  const data = useTemplateData();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });

  useEffect(() => {
    if (emblaApi) {
      // Optional: Add auto-scroll if desired
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="pt-48 pb-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm">{data.testimonials.kicker}</span>
            <span className="w-12 h-0.5 bg-[var(--color-primary)]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)]">
            {data.testimonials.title}
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing px-4 py-8" ref={emblaRef}>
            <div className="flex gap-8">
              {data.testimonials.items.map((testimonial, idx) => (
                <div key={idx} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
                    className="bg-gray-50 h-full p-8 border-t-4 border-[var(--color-primary)] relative group hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  >
                    <div className="absolute top-6 right-6 text-gray-200 group-hover:text-[var(--color-primary)]/20 transition-colors duration-300">
                      <Quote size={48} />
                    </div>
                    
                    <div className="flex gap-1 mb-6 text-[var(--color-primary)]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    
                    <p className="text-gray-600 italic leading-relaxed mb-8 relative z-10 flex-grow text-base">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-[var(--color-secondary)] rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shrink-0">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-secondary)] text-lg leading-tight">{testimonial.author}</h4>
                        <p className="text-xs text-[var(--color-primary)] uppercase tracking-wider mt-1">{testimonial.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-10">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
