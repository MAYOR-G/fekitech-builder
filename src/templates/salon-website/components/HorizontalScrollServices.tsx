"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { ServiceCard } from "./ServiceCard";

import { useTemplateData } from "../TemplateContext";
export function HorizontalScrollServices() {
  const { services } = useTemplateData();

  const targetRef = useRef<HTMLDivElement>(null);

  // Track the vertical scroll progress of this container
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate the horizontal translation.
  // At progress 0, it's 0.
  // At progress 1, it translates left by 100% of its own width, 
  // but we add back 100vw so the right edge aligns with the screen edge.
  // We also add a small padding offset so it doesn't flush entirely to the edge.
  const xTransform = useTransform(scrollYProgress, (pos) => {
    return `calc(-${pos * 100}% + ${pos * 100}vw)`;
  });

  // Subtly scale the cards as the user scrolls
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section ref={targetRef} id="services" className="relative h-[400vh] bg-white">
      <div className="sticky top-0 flex flex-col h-screen overflow-hidden pt-24 lg:pt-32">
        
        {/* Header container positioned normally so it pushes the slider down */}
        <div className="px-5 lg:px-8 z-10 mx-auto max-w-7xl w-full shrink-0">
          <Reveal>
            <SectionHeader
              eyebrow="Signature services"
              title="A complete beauty studio for hair, nails, makeup, bridal, and care."
              description="Clear service cards help clients compare everyday styling, beauty treatments, bridal work, nails, makeup, and consultation options."
            />
          </Reveal>
        </div>

        {/* The horizontal track */}
        <div className="flex-1 flex items-center">
          <motion.div 
            style={{ x: xTransform }} 
            className="flex gap-5 px-5 lg:px-8 w-max"
          >
          {services.map((service) => (
            <motion.div 
              key={service.title} 
              style={{ scale }}
              className="origin-center"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
          <div className="w-[10px] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
