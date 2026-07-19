"use client";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import Image from "next/image";

// A simple Before/After slider component
const BeforeAfter = ({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const position = Math.max(0, Math.min((x / width) * 100, 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-sm cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <Image
        src={afterImage}
        alt="After"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
        draggable={false}
      />

      {/* Before Image (Foreground, clipped) */}
      <div
        className="absolute inset-0 z-10"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          draggable={false}
        />
      </div>

      {/* Slider Line & Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 w-0.5 bg-white flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center absolute -ml-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 absolute">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20 bg-black/50 text-white text-xs px-2 py-1 uppercase tracking-widest pointer-events-none">
        Before
      </div>
      <div className="absolute bottom-4 right-4 z-20 bg-black/50 text-white text-xs px-2 py-1 uppercase tracking-widest pointer-events-none">
        After
      </div>
    </div>
  );
};

export default function Transformations() {
  const transformations = [
    {
      before: "/images/before_hair_1782739088786.png",
      after: "/images/after_hair_1782739099086.png",
    },
    {
      before: "/images/before_nails_1782739116693.png",
      after: "/images/after_nails_1782739127519.png",
    },
  ];

  return (
    <section id="transformations" className="bg-brand-plum py-32 md:py-48 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="text-brand-mauve text-sm uppercase tracking-[0.1em] font-semibold mb-6 block">
            Transformations
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            The LUMIÈRE <span className="italic">Effect.</span>
          </h2>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {transformations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <BeforeAfter beforeImage={item.before} afterImage={item.after} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
