"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    title: 'Homes For Sale',
    subtitle: 'Browse our latest listings',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Apartments To Rent',
    subtitle: 'Find your perfect rental',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Luxury Properties',
    subtitle: 'Exclusive high-end homes',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Landlord Services',
    subtitle: 'Full property management',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'New Developments',
    subtitle: 'Modern homes & investments',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Book Valuation',
    subtitle: 'Get your free property valuation',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Services() {
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
    <section className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-4 block">
              Find Your Path
            </span>
            <h2 className="font-serif text-[36px] md:text-[48px] text-charcoal leading-[1.15]">
              How Can We Help You?
            </h2>
          </motion.div>
          
          <div className="hidden md:flex gap-3">
            <button 
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                prevBtnEnabled 
                  ? 'border-charcoal/20 text-charcoal hover:bg-gold hover:border-gold hover:text-white' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                nextBtnEnabled 
                  ? 'border-charcoal/20 text-charcoal hover:bg-gold hover:border-gold hover:text-white' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
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
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_28%] min-w-0"
              >
                <a href="#" className="group relative block aspect-[4/3] overflow-hidden rounded-none bg-charcoal-navy">
                  <TemplateImage 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-navy/90 via-charcoal-navy/20 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="font-serif text-[22px] text-white mb-2">{service.title}</h3>
                    <p className="text-[13px] text-white/80 font-medium">{service.subtitle}</p>
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
