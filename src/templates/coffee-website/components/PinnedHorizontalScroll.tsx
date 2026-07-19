"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTemplateData } from '../TemplateContext';


const PinnedHorizontalScroll = () => {
  const siteContent = useTemplateData();
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section 
      ref={targetRef} 
      className="relative h-[400vh] bg-coffee-dark text-coffee-light"
      id="journey"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Intro Text floating on the left */}
        <div className="absolute top-16 left-6 md:left-16 z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-coffee-light">From Bean<br/>To Cup.</h2>
          <div className="h-px w-16 bg-coffee-terracotta mt-4" />
        </div>

        <motion.div 
          style={{ x }} 
          className="flex gap-8 px-6 md:px-16 pt-32 pb-16 h-full items-center"
        >
          {siteContent.journey.map((step, index) => (
            <div 
              key={index}
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] md:h-[70vh] shrink-0 flex flex-col group"
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
          <div className="w-[10vw] shrink-0" />
        </motion.div>
        
      </div>
    </section>
  );
};

export default PinnedHorizontalScroll;
