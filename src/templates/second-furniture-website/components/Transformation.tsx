"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Transformation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const clipPath = useTransform(scrollYProgress, [0, 0.5], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="atelier" ref={containerRef} className="relative h-[250vh] bg-furniture-bg">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
          <h2 className="font-display text-[15vw] leading-none text-furniture-text/5 text-center whitespace-nowrap">
            THE ATELIER
          </h2>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 text-center max-w-3xl px-6">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-furniture-ochre mb-8 block">Bespoke Commissions</span>
          <h3 className="font-display text-4xl md:text-6xl text-furniture-text mb-8">
            Furniture as <br/>Site-Specific Sculpture.
          </h3>
          <p className="text-furniture-text/70 text-lg md:text-xl font-light mb-12">
            For architectural projects requiring a tailored approach, our atelier collaborates directly with architects and private clients to develop custom scale, materials, and forms.
          </p>
          <button className="bg-furniture-text text-furniture-bg px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-furniture-ochre hover:text-white transition-colors">
            Inquire About Custom
          </button>
        </div>

        {/* Rising Curtain Image Reveal */}
        <motion.div 
          style={{ clipPath }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <motion.img 
            style={{ y }}
            src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=2000" 
            alt="Atelier workspace" 
            className="w-full h-[140%] object-cover object-center absolute -top-[20%]"
          />
          <div className="absolute inset-0 bg-furniture-walnut/40 mix-blend-multiply"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-auto">
            <h3 className="font-display text-6xl md:text-8xl mb-8">The Atelier</h3>
            <p className="text-white/80 max-w-xl text-center text-xl font-light px-6">
              Where raw timber meets architectural intent.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Transformation;
