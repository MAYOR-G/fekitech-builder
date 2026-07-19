"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import clsx from "clsx";

const services = [
  {
    title: "Hair Design",
    description: "Cuts, color, extensions & treatments",
    image: "/images/hair_styling_1782739078773.png",
  },
  {
    title: "Makeup Artistry",
    description: "Bridal, editorial & occasion",
    image: "/images/editorial_lookbook_1782739064981.png",
  },
  {
    title: "Nail Couture",
    description: "Manicures, art & enhancements",
    image: "/images/nail_contour_1782739032965.png",
  },
  {
    title: "Bridal Packages",
    description: "Your day, perfected",
    image: "/images/bridal_package_1782739041971.png",
  },
  {
    title: "Lash & Brow",
    description: "Extensions, lifts & shaping",
    image: "/images/lash_brow_1782739053510.png",
  },
  {
    title: "Skin Prep",
    description: "Facials & consultations",
    image: "https://images.unsplash.com/photo-1595475884562-073c188448eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="bg-brand-cream py-32 md:py-48 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-8">
        
        {/* Left Column - List */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <span className="text-brand-mauve text-sm uppercase tracking-[0.1em] font-semibold mb-6 block">
              Our Services
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1]">
              Crafted for <span className="italic">You.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className="group border-b border-brand-charcoal/10 py-6 md:py-8 cursor-pointer flex flex-col justify-center relative"
              >
                {/* Desktop hover background highlight */}
                <div 
                  className={clsx(
                    "absolute inset-0 bg-white/40 -mx-6 px-6 md:-mx-12 md:px-12 opacity-0 transition-opacity duration-300 pointer-events-none z-0",
                    activeIndex === index ? "lg:opacity-100" : ""
                  )} 
                />
                
                <div className="relative z-10">
                  <h3 
                    className={clsx(
                      "font-serif text-2xl md:text-3xl lg:text-4xl transition-colors duration-300 mb-2",
                      activeIndex === index ? "text-brand-plum italic" : "text-brand-charcoal"
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="text-brand-gray text-sm md:text-base font-medium uppercase tracking-wider">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Sticky Image Reveal */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto hidden lg:block">
          <div className="sticky top-32 w-full aspect-[4/5] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Inline Images (Shows below each item or at bottom, here we just show the active one below the list on mobile) */}
        <div className="w-full lg:hidden h-[400px] relative overflow-hidden mt-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={services[activeIndex].image}
                  alt={services[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
