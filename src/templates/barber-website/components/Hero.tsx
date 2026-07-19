"use client";
import { useTemplateData } from '../TemplateContext';
import EditableText from '@/components/editor/blocks/EditableText';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';


export default function Hero() {
  const siteContent = useTemplateData();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % siteContent.hero.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [siteContent.hero.images.length]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-brand-black z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={siteContent.hero.images[currentImageIndex]}
            alt="Premium barber and hair studio"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-brand-charcoal/20 z-10" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-brand-cream leading-tight mb-6">
            <EditableText section="hero" field="headline" value={siteContent?.hero?.headline} as="span" />
          </h1>
          <p className="text-lg md:text-xl text-brand-cream/80 max-w-2xl mx-auto font-light mb-10">
            <EditableText section="hero" field="subtext" value={siteContent?.hero?.subtext} as="span" />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#booking" className="bg-brand-accent text-brand-black px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-brand-cream transition-colors w-full sm:w-auto">
              <EditableText section="hero" field="cta" value={siteContent?.hero?.cta} as="span" />
            </a>
            <a href="#services" className="border border-brand-cream/30 text-brand-cream px-8 py-4 uppercase font-bold tracking-widest text-sm hover:bg-brand-cream/10 transition-colors w-full sm:w-auto">
              <EditableText section="hero" field="secondaryCta" value={siteContent?.hero?.secondaryCta} as="span" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
