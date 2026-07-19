"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const neighborhoods = [
  {
    name: 'Kensington',
    subtitle: 'Elegant & Historic',
    properties: '24 Properties',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Canary Wharf',
    subtitle: 'Modern & Dynamic',
    properties: '18 Properties',
    image: 'https://images.unsplash.com/photo-1529655683823-1bb3a11e4fdb?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Shoreditch',
    subtitle: 'Trendy & Creative',
    properties: '31 Properties',
    image: 'https://images.unsplash.com/photo-1555660855-3c139dc62a1a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Richmond',
    subtitle: 'Green & Family-friendly',
    properties: '15 Properties',
    image: 'https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Chelsea',
    subtitle: 'Prestigious & Stylish',
    properties: '22 Properties',
    image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Notting Hill',
    subtitle: 'Colourful & Cultural',
    properties: '19 Properties',
    image: 'https://images.unsplash.com/photo-1505051508008-923feaf002aa?auto=format&fit=crop&w=600&q=80',
  },
];

export default function Neighborhoods() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 md:py-32 bg-charcoal-navy overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-4 block">
              Local Expertise
            </span>
            <h2 className="font-serif text-[36px] md:text-[48px] text-white leading-[1.15]">
              Explore Our Prime London Neighbourhoods.
            </h2>
          </motion.div>
          
          <div className="hidden md:flex gap-3">
            <button 
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                prevBtnEnabled 
                  ? 'border-white/20 text-white hover:bg-gold hover:border-gold' 
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                nextBtnEnabled 
                  ? 'border-white/20 text-white hover:bg-gold hover:border-gold' 
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto pl-6 md:pl-12 lg:pl-0 lg:ml-[max(0px,calc((100vw-80rem)/2))]">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6 pb-8">
            {neighborhoods.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_80%] sm:flex-[0_0_40%] md:flex-[0_0_30%] lg:flex-[0_0_22%] min-w-0"
              >
                <a href="#" className="group relative block aspect-[4/5] overflow-hidden rounded-none bg-charcoal">
                  <TemplateImage 
                    src={area.image} 
                    alt={area.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-navy/90 via-charcoal-navy/20 to-transparent transition-opacity duration-300 group-hover:opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-serif text-[24px] text-white mb-1 group-hover:text-gold transition-colors">{area.name}</h3>
                    <p className="text-[13px] text-white/70 mb-2">{area.subtitle}</p>
                    <p className="text-[12px] text-gold font-medium">{area.properties}</p>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
