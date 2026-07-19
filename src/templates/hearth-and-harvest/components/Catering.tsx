"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Catering() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={containerRef} className="bg-brand-dark py-24 md:py-32 px-6 md:px-12 text-brand-white overflow-hidden">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Text */}
        <div className="w-full lg:w-5/12 flex flex-col items-start z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl leading-[0.9] tracking-tighter mb-8 uppercase"
          >
            CATERING, EVENTS,
            <br />
            <span className="text-brand-accent">DONE PROPERLY</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-brand-gray text-base md:text-lg leading-relaxed mb-10 max-w-md"
          >
            Partner with us to bring exceptional dining to your wedding, corporate event, or private party. We provide not just food, but an experience.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-2 border-white px-8 py-4 font-medium tracking-widest text-sm hover:bg-white hover:text-brand-dark transition-all duration-300 uppercase"
          >
            ENQUIRE NOW
          </motion.button>
        </div>

        {/* Right: Overlapping Images */}
        <div className="w-full lg:w-7/12 relative h-[500px] md:h-[600px] mt-12 lg:mt-0">
          {/* Main large image */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute right-0 top-0 w-[80%] md:w-[70%] h-[400px] md:h-[500px] z-0"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/catering_event_1783067260865.png"
                alt="Banquet table event"
                fill sizes="100vw"
                className="object-cover grayscale-[20%]"
              />
            </div>
          </motion.div>
          
          {/* Smaller overlapping image */}
          <motion.div
            style={{ y: y2 }}
            className="absolute left-0 bottom-0 w-[60%] md:w-[50%] h-[300px] md:h-[400px] z-10 shadow-2xl border-8 border-brand-dark"
          >
            <div className="relative w-full h-full">
              <Image
                src="/images/hero_chef_plating_1783066890118.png"
                alt="Chef plating"
                fill sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
