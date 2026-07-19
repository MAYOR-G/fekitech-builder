"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useCallback, useState, useRef, useEffect } from 'react';


const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [handleMove, isDragging]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  }, [handleMove, isDragging]);

  const stopDragging = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopDragging);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', stopDragging);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopDragging);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', stopDragging);
    };
  }, [isDragging, onMouseMove, onTouchMove, stopDragging]);

  return (
    <section className="py-24 bg-plumber-charcoal text-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">The Impact of Engineering</h2>
        <p className="text-plumber-slate max-w-2xl mx-auto">Transitioning from high-risk deterioration to certified, life-long infrastructure.</p>
      </div>

      <div className="w-full max-w-[1600px] mx-auto h-[60vh] md:h-[80vh] relative select-none" ref={containerRef}>
        
        {/* BEFORE IMAGE (Bottom Layer) */}
        <div className="absolute inset-0 w-full h-full bg-plumber-charcoal">
          <TemplateImage 
            src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&q=80&w=2000" 
            alt="Deterioration - corroded pipes" 
            className="absolute inset-0 w-full h-full object-cover filter contrast-125 brightness-50 sepia-[.3]"
            draggable="false"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute top-8 left-8 md:top-12 md:left-12 font-mono text-sm tracking-widest text-white/50 z-10">
            DETERIORATION
          </div>
        </div>

        {/* AFTER IMAGE (Top Layer, Clipped) */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <TemplateImage 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" 
            alt="Precision - pristine copper" 
            className="absolute inset-0 w-full h-full object-cover filter contrast-125"
            draggable="false"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
          <div className="absolute top-8 left-8 md:top-12 md:left-12 font-mono text-sm tracking-widest text-white z-10">
            PRECISION
          </div>
        </div>

        {/* SLIDER HANDLE */}
        <div 
          className="absolute top-0 bottom-0 w-12 -ml-6 cursor-ew-resize flex items-center justify-center z-20 group"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onTouchStart={() => {
            setIsDragging(true);
          }}
        >
          <div className="w-[2px] h-full bg-plumber-copper group-hover:w-[4px] transition-all"></div>
          <div className="absolute w-12 h-12 rounded-full bg-plumber-copper shadow-lg flex items-center justify-center text-white transform group-hover:scale-110 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l6-6-6-6" className="opacity-0" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center rotate-180">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BeforeAfter;
