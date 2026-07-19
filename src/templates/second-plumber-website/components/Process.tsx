"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { MotionValue } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "Acoustic Diagnosis",
    desc: "Deployment of thermal and acoustic imaging to map infrastructure without invasive demolition.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "02",
    title: "Engineering Proposal",
    desc: "Detailed CAD schematics and transparent cost modeling for the proposed infrastructure upgrade.",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "03",
    title: "Precision Install",
    desc: "Execution by certified technicians using premium copper and cross-linked polyethylene systems.",
    img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800"
  },
  {
    num: "04",
    title: "System Certification",
    desc: "Rigorous pressure testing and municipal code certification before final handover.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
  }
];

type ProcessStepData = (typeof steps)[number];

const ProcessStep = ({ step, i, progress }: { step: ProcessStepData, i: number, progress: MotionValue<number> }) => {
  const isFirst = i === 0;
  // 4 steps = 3 transitions. phase = 0.333. slideDuration = 0.15.
  const phase = 1 / 3;
  const slideDuration = 0.15;
  
  const startSlide = isFirst ? 0 : (i - 1) * phase;
  const endSlide = startSlide + slideDuration;

  const startScale = i * phase;
  const endScale = startScale + slideDuration;

  // First card is always fully slid in. Others slide from 100% (bottom) to 0%.
  const y = useTransform(
    progress, 
    [startSlide, endSlide], 
    [isFirst ? '0%' : '100%', '0%']
  );
  
  const opacity = useTransform(
    progress, 
    [startSlide, startSlide + 0.05], 
    [isFirst ? 1 : 0, 1]
  );

  const scale = useTransform(
    progress, 
    [startScale, endScale], 
    [1, i === 3 ? 1 : 0.95]
  );

  return (
    <motion.div 
      style={{ y, opacity, scale }}
      className="absolute inset-0 bg-[#FAFAF8] rounded-2xl overflow-hidden shadow-2xl border border-plumber-charcoal/5 origin-top"
    >
      <div className="absolute -right-4 -top-10 font-mono text-[180px] md:text-[240px] font-bold text-plumber-copper/10 leading-none pointer-events-none select-none z-0">
        {step.num}
      </div>
      
      <div className="flex flex-col md:flex-row h-full z-10 relative">
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <span className="font-mono text-plumber-copper font-medium mb-4 block">STEP {step.num}</span>
          <h3 className="font-display text-3xl md:text-5xl font-bold text-plumber-charcoal mb-6">{step.title}</h3>
          <p className="text-plumber-slate text-lg leading-relaxed">{step.desc}</p>
        </div>
        <div className="w-full md:w-1/2 h-64 md:h-full bg-plumber-charcoal relative">
          <TemplateImage src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover filter grayscale mix-blend-luminosity opacity-80" />
          <div className="absolute inset-0 bg-plumber-copper/20 mix-blend-multiply"></div>
        </div>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="bg-plumber-charcoal relative h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-center overflow-hidden">
        
        {/* Left fixed content */}
        <div className="w-full lg:w-1/3 p-8 lg:p-20 text-white z-20">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">The<br/>Process.</h2>
          <p className="text-white/60 text-lg">A systematic approach to infrastructure replacement, ensuring zero downtime and total compliance.</p>
        </div>

        {/* Right scrolling cards */}
        <div className="w-full lg:w-2/3 h-[60vh] lg:h-[80vh] relative px-4 lg:px-20 z-10 perspective-1000">
          {steps.map((step, i) => (
            <ProcessStep key={i} step={step} i={i} progress={scrollYProgress} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Process;
