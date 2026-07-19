"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const programs = [
  {
    title: "Strength & Conditioning",
    desc: "Build functional strength and improve your overall athletic capacity.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "HIIT & Cardio",
    desc: "High-intensity intervals designed to burn fat and increase endurance.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Personal Training",
    desc: "1-on-1 coaching tailored specifically to your goals and current level.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Mobility & Recovery",
    desc: "Enhance flexibility, prevent injuries, and accelerate muscle recovery.",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Online Coaching",
    desc: "Expert guidance, custom programming, and accountability from anywhere.",
    image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1887&auto=format&fit=crop"
  }
];

const PinnedHorizontalScroll = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} id="programs" className="relative h-[300vh] bg-gym-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-6 w-full mb-12">
          <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Programs</h2>
          <h3 className="text-4xl md:text-6xl font-black font-display uppercase">Choose Your Path</h3>
        </div>

        <motion.div style={{ x }} className="flex gap-8 px-6 w-max">
          {programs.map((program, idx) => (
            <div 
              key={idx} 
              className="w-[80vw] md:w-[600px] h-[500px] rounded-3xl overflow-hidden relative group cursor-pointer"
            >
              <TemplateImage 
                src={program.image} 
                alt={program.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h4 className="text-3xl font-black font-display uppercase mb-3 text-white group-hover:text-gym-accent transition-colors">
                  {program.title}
                </h4>
                <p className="text-gray-300 mb-6 text-lg">
                  {program.desc}
                </p>
                <div className="flex items-center gap-2 text-white font-bold uppercase tracking-wider text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore Program <ArrowRight className="w-4 h-4 text-gym-accent" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default PinnedHorizontalScroll;
