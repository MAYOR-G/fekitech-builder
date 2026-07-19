"use client";
import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Northlane achieved a sale price 10% above what two other agents quoted. The photography was stunning, and they managed the viewings with complete discretion.",
    name: "SARAH JENKINS",
    role: "Seller in Kensington"
  },
  {
    quote: "As an overseas landlord, I need an agency I can trust implicitly. Northlane handles everything flawlessly. I never worry about void periods or maintenance issues anymore.",
    name: "MICHAEL CHEN",
    role: "Landlord Portfolio"
  },
  {
    quote: "They understood exactly what we were looking for. No wasted viewings, just high-quality properties. We secured our dream townhouse within three weeks.",
    name: "THE ROBERTS FAMILY",
    role: "Buyers in Richmond"
  },
  {
    quote: "Professional, responsive, and incredibly knowledgeable about the local market. They made the entire letting process smooth and stress-free.",
    name: "DAVID LLOYD",
    role: "Tenant in Canary Wharf"
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true
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
    <section className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-4 block">
            Client Experiences
          </span>
          <h2 className="font-serif text-[36px] md:text-[48px] text-charcoal leading-[1.15]">
            What Our Clients Say.
          </h2>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, index) => (
                <div key={index} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6">
                  <div className="bg-white p-10 h-full border border-gray-100 rounded-none hover:shadow-lg transition-shadow duration-300">
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-[15px] text-charcoal leading-[1.6] mb-8 font-normal">
                      &quot;{t.quote}&quot;
                    </p>
                    <div>
                      <strong className="block text-[14px] font-bold text-charcoal mb-1">
                        {t.name}
                      </strong>
                      <span className="text-[12px] text-gray-500 uppercase tracking-wide">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mt-12">
            <button 
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                prevBtnEnabled 
                  ? 'border-gray-200 text-charcoal hover:bg-gold hover:border-gold hover:text-white' 
                  : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                nextBtnEnabled 
                  ? 'border-gray-200 text-charcoal hover:bg-gold hover:border-gold hover:text-white' 
                  : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
