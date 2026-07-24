import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Storytelling() {
  const data = useTemplateData();
  const { storytelling } = data;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={storytelling?.image} 
          alt="Fresh produce" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-serif font-medium text-white max-w-4xl leading-tight"
        >
          {storytelling?.headline}
        </motion.h2>
      </div>
    </section>
  );
}
