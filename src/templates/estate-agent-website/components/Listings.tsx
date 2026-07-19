"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const listings = [
  {
    id: 1,
    title: 'Kensington Townhouse',
    price: '£1,250,000',
    location: 'Victoria Road, Kensington W8',
    details: '4 BED · 3 BATH · GARDEN',
    status: 'FOR SALE',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Riverside Penthouse',
    price: '£3,500,000',
    location: 'Canary Wharf, E14',
    details: '3 BED · 3 BATH · BALCONY',
    status: 'FOR SALE',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Classic Mews House',
    price: '£1,850,000',
    location: 'Notting Hill, W11',
    details: '2 BED · 2 BATH · GARAGE',
    status: 'FOR SALE',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Canary Wharf Apartment',
    price: '£850,000',
    location: 'Canary Wharf, E14',
    details: '2 BED · 2 BATH · CONCIERGE',
    status: 'TO LET',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Listings() {
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
              Exclusive Listings
            </span>
            <h2 className="font-serif text-[36px] md:text-[48px] text-white leading-[1.15]">
              A Curated Selection of Finest Properties.
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

      <div className="max-w-[1400px] mx-auto pl-6 md:pl-12 lg:pl-0 lg:ml-[max(0px,calc((100vw-80rem)/2))] mb-16">
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-8 pb-8 pt-4 px-4 -mx-4">
            {listings.map((listing, index) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_35%] lg:flex-[0_0_30%] min-w-0"
              >
                <div className="group cursor-pointer">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-none mb-6 bg-charcoal shadow-lg transition-all duration-400 group-hover:-translate-y-1.5 group-hover:shadow-2xl">
                    <TemplateImage 
                      src={listing.image} 
                      alt={listing.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest rounded-full ${
                        listing.status === 'FOR SALE' ? 'bg-gold text-white' : 'bg-success text-white'
                      }`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-[20px] text-white mb-2 group-hover:text-gold transition-colors">{listing.title}</h3>
                    <p className="font-sans font-semibold text-[20px] text-white mb-2">{listing.price}</p>
                    <p className="text-[13px] text-white/70 mb-4">{listing.location}</p>
                    <p className="text-[12px] text-white/60 font-medium tracking-wide">{listing.details}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <a href="#" className="inline-block border border-gold text-gold px-8 py-3 text-[13px] uppercase tracking-cta font-medium hover:bg-gold hover:text-white transition-all duration-300 rounded-full">
          View All Properties
        </a>
      </div>
    </section>
  );
}
