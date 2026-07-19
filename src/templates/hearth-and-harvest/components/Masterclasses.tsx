"use client";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export default function Masterclasses() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, 20]);

  return (
    <section ref={containerRef} className="bg-brand-dark py-24 md:py-32 px-6 md:px-12 text-brand-white border-t border-white/5 overflow-hidden">
      <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Collage */}
        <div className="w-full lg:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
          <motion.div style={{ y: y1 }} className="absolute z-10 w-[50%] aspect-square left-0 top-[10%]">
             <Image src="/images/hero_chef_plating_1783066890118.png" alt="Chef action 1" fill sizes="100vw" className="object-cover rounded-sm shadow-2xl" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute z-20 w-[60%] aspect-square right-0 top-[25%] border-8 border-brand-dark">
             <Image src="/images/catering_event_1783067260865.png" alt="Chef action 2" fill sizes="100vw" className="object-cover rounded-sm shadow-2xl" />
          </motion.div>
          <motion.div style={{ y: y3 }} className="absolute z-30 w-[45%] aspect-square left-[20%] bottom-[5%] border-8 border-brand-dark">
             <Image src="/images/dish_roast_chicken_1783066899369.png" alt="Chef action 3" fill sizes="100vw" className="object-cover rounded-sm shadow-2xl" />
          </motion.div>
        </div>

        {/* Right: Text */}
        <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-12 z-40 relative">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-7xl leading-none tracking-tighter mb-8 uppercase"
          >
            COOKING<br />MASTERCLASSES
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-brand-gray text-base md:text-lg leading-relaxed mb-10 max-w-md"
          >
            Learn the art of cooking from our head chef and culinary team. From basic knife skills to advanced plating techniques.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-2 border-white px-8 py-4 font-medium tracking-widest text-sm hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 uppercase"
          >
            BOOK A CLASS
          </motion.button>
        </div>
        
      </div>
    </section>
  );
}
