"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'motion/react';

const craftSteps = [
  {
    title: "Timber Selection",
    desc: "We source our American Black Walnut exclusively from sustainable mills. Each slab is hand-selected for grain character, ensuring every piece holds a unique architectural narrative.",
    img: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Precision Joinery",
    desc: "Abandoning mechanical fasteners, we rely on traditional Japanese and Danish joinery techniques. The integrity of the form relies on the wood itself.",
    img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=1000"
  },
  {
    title: "Hand Finishing",
    desc: "Multiple layers of natural hardwax oil are hand-rubbed into the grain, building a deep, tactile luster that protects while allowing the timber to breathe.",
    img: "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&q=80&w=1000"
  }
];

const Craft = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveIndex(0);
    else if (latest < 0.66) setActiveIndex(1);
    else setActiveIndex(2);
  });

  return (
    <section id="craft" ref={containerRef} className="relative bg-[#FFFFFF] pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-32">
          
          {/* Left Text Content */}
          <div className="w-full md:w-1/2 pt-24 md:pt-48 pb-24 md:pb-48">
            <h2 className="font-display text-4xl md:text-5xl lg:text-7xl text-furniture-text mb-24">
              The Architecture <br/><span className="italic">of Craft.</span>
            </h2>
            
            <div className="space-y-48">
              {craftSteps.map((step, index) => (
                <div key={index} className={`transition-opacity duration-700 ${activeIndex === index ? 'opacity-100' : 'opacity-20'}`}>
                  <span className="font-mono text-xs tracking-widest text-furniture-ochre mb-6 block">0{index + 1}</span>
                  <h3 className="font-display text-3xl md:text-4xl text-furniture-text mb-6">{step.title}</h3>
                  <p className="text-furniture-text/70 text-lg leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sticky Image */}
          <div className="w-full md:w-1/2 hidden md:block">
            <div className="sticky top-24 h-[80vh] w-full mt-24">
              {craftSteps.map((step, index) => (
                <TemplateImage 
                  key={index}
                  src={step.img} 
                  alt={step.title} 
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    activeIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Craft;
