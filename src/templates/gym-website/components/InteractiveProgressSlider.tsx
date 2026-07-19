"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

const InteractiveProgressSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const clientX = "touches" in event
      ? event.touches.item(0)?.clientX
      : event.clientX;
    if (clientX === undefined) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleDragStart = () => {
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
  };

  return (
    <section className="py-24 bg-gym-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Real Results</h2>
          <h3 className="text-4xl md:text-5xl font-black font-display uppercase mb-6">Progress Takes Consistency</h3>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            We focus on improving strength, posture, and confidence. See how structured training and expert coaching transform our members&apos; capabilities.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none"
          ref={containerRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          {/* After image (background) */}
          <TemplateImage 
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop" 
            alt="Strong athlete maintaining great posture and muscle tone" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 bg-gym-dark/80 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm z-10 border border-white/10">
            Current Capacity
          </div>

          {/* Before image (clip path) */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <TemplateImage 
              src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" 
              alt="Person starting their fitness journey" 
              className="absolute inset-0 w-full h-full object-cover pointer-events-none grayscale opacity-80"
            />
            <div className="absolute top-4 left-4 bg-gym-dark/80 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm z-10 border border-white/10">
              Starting Point
            </div>
          </div>

          {/* Slider handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none">
              <div className="flex gap-1">
                <div className="w-[2px] h-4 bg-gym-darker rounded-full"></div>
                <div className="w-[2px] h-4 bg-gym-darker rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center text-sm text-gray-500 mt-8">
          * Progress varies by person and depends on consistency, coaching, and lifestyle factors.
        </p>
      </div>
    </section>
  );
};

export default InteractiveProgressSlider;
