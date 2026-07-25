import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative w-full overflow-hidden bg-[#F7F4EE] pt-32 pb-16" id="top">
      {/* Content */}
      <div className="w-full mx-auto px-4 md:px-8 flex flex-col items-center text-center">
        {/* Text Content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18.5vw] sm:text-[16vw] md:text-[13.5vw] lg:text-[12vw] xl:text-[11vw] text-[#421a22] font-normal tracking-tight leading-[1] mb-6 md:mb-8 w-full whitespace-nowrap"
          style={{ fontFamily: "'Baguet Script', cursive" }}
        >
          Restaurant & Bar
        </motion.h1>

        {/* Image Container with Badge */}
        <div className="w-full relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] overflow-hidden"
          >
            {/* Jagged Star Badge */}
            <div className="absolute top-6 left-6 md:top-12 md:left-12 z-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white flex items-center justify-center rotate-[-15deg]"
                 style={{ clipPath: "polygon(50% 0%, 61% 16%, 80% 10%, 82% 29%, 100% 38%, 91% 56%, 100% 75%, 82% 80%, 79% 100%, 61% 91%, 50% 100%, 39% 91%, 21% 100%, 18% 80%, 0% 75%, 9% 56%, 0% 38%, 18% 29%, 20% 10%, 39% 16%)" }}
            >
              <span className="font-serif text-[#421a22] text-sm sm:text-base md:text-xl font-medium tracking-wide">
                Est. 2055
              </span>
            </div>

            <motion.img
              style={{ y }}
              src={hero.image}
              alt={hero.imageAlt}
              className="w-full h-[120%] object-cover object-center absolute -top-[10%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
