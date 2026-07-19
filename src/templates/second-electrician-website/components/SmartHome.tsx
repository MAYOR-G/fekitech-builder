"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';

const SmartHome = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="smart-systems" ref={containerRef} className="bg-electric-surface py-24 md:py-40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-electric-amber mb-6">
              Intelligent Environments
            </h3>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-electric-charcoal tracking-tighter mb-8 leading-[1.1]">
              Architecture meets <span className="text-electric-amber">automation.</span>
            </h2>
            
            <div className="space-y-6 text-electric-slate font-light text-lg mb-12">
              <p>
                Modern electrical work extends beyond copper wire. We integrate high-level automation systems that unify lighting, climate, security, and AV into a single, intuitive interface.
              </p>
              <p>
                From centralized Lutron panelized lighting to enterprise-grade networking, we build the nervous system for your property without compromising interior design.
              </p>
            </div>

            <ul className="space-y-6 mb-12">
              {[
                'Automated Lighting Control', 
                'Energy Monitoring & Storage', 
                'Networked Security Systems', 
                'Whole-Home Audio/Video'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-electric-charcoal font-medium">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-electric-amber"></div>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <button className="flex items-center gap-3 bg-electric-charcoal text-white px-8 py-4 font-bold uppercase tracking-widest text-sm hover:bg-electric-amber transition-colors duration-300">
              Consult a Specialist <ArrowRight size={20} weight="bold" />
            </button>
          </div>

          <div className="w-full lg:w-7/12 order-1 lg:order-2 h-[60vh] lg:h-[80vh] relative rounded-2xl overflow-hidden shadow-2xl shadow-electric-charcoal/5">
            <div className="absolute inset-0 overflow-hidden z-10">
              <motion.img 
                style={{ y: imgY }}
                src="/images/smart-home.png" 
                alt="Modern luxury smart home interior" 
                className="w-full h-[120%] object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SmartHome;
