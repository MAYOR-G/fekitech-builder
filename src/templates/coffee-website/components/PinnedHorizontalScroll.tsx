"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTemplateData } from '../TemplateContext';
import { useMeasuredHorizontalScroll } from '@/lib/pinned-scroll';


const PinnedHorizontalScroll = () => {
  const siteContent = useTemplateData();
  const targetRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const { distance, sectionHeight, reducedMotion } = useMeasuredHorizontalScroll({
    sectionRef: targetRef,
    viewportRef,
    trackRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={targetRef}
      style={sectionHeight ? { height: `${sectionHeight}px` } : undefined}
      className={`relative bg-coffee-dark text-coffee-light ${
        reducedMotion ? "py-20" : "min-h-svh"
      }`}
      id="journey"
    >
      <div
        ref={viewportRef}
        className={
          reducedMotion
            ? "relative overflow-hidden"
            : "sticky top-0 flex h-svh items-center overflow-hidden"
        }
      >
        
        {/* Intro Text floating on the left */}
        <div className="absolute top-16 left-6 md:left-16 z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-coffee-light">From Bean<br/>To Cup.</h2>
          <div className="h-px w-16 bg-coffee-terracotta mt-4" />
        </div>

        <motion.div
          ref={trackRef}
          style={reducedMotion ? undefined : { x }}
          className={
            reducedMotion
              ? "grid gap-8 px-6 pb-8 pt-32 md:grid-cols-2 md:px-16"
              : "flex h-full w-max items-center gap-8 px-6 pb-16 pt-32 md:px-16"
          }
        >
          {siteContent.journey.map((step, index) => (
            <div 
              key={index}
              className={`group relative flex flex-col ${
                reducedMotion
                  ? "h-[32rem] w-full"
                  : "h-[60vh] w-[85vw] shrink-0 md:h-[70vh] md:w-[60vw] lg:w-[45vw]"
              }`}
            >
              <div className="relative w-full h-full overflow-hidden shadow-2xl bg-coffee-brown/20">
                <TemplateImage 
                  src={step.image} 
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/90 via-coffee-dark/20 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="font-serif text-3xl mb-3 text-coffee-light">{step.title}</h3>
                  <p className="font-sans font-light text-coffee-light/80 text-lg max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty spacer at the end for smooth exit */}
          {!reducedMotion ? <div className="w-[10vw] shrink-0" /> : null}
        </motion.div>
        
      </div>
    </section>
  );
};

export default PinnedHorizontalScroll;
