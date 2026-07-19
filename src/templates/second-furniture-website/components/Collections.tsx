"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const collections = [
  {
    title: "Living",
    subtitle: "Low-profile seating & media architecture",
    img: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Dining",
    subtitle: "Monumental tables & sculpted seating",
    img: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Bedroom",
    subtitle: "Timber frames & integrated storage",
    img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=2000"
  },
  {
    title: "Atelier",
    subtitle: "Desks & architectural shelving",
    img: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=2000"
  }
];

const Collections = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section id="collections" ref={targetRef} className="relative h-[300vh] bg-furniture-walnut">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-6 md:px-24">
          
          {/* Intro Card */}
          <div className="w-[85vw] md:w-[40vw] h-[70vh] flex flex-col justify-center flex-shrink-0">
            <span className="text-furniture-ochre text-sm tracking-[0.2em] uppercase mb-8 block font-medium">The Collections</span>
            <h2 className="font-display text-5xl md:text-7xl text-furniture-bg mb-8">
              Curated for<br/><span className="italic text-furniture-bg/80">Architecture.</span>
            </h2>
            <p className="text-furniture-bg/60 text-lg max-w-md">
              Each piece is designed not to fill space, but to define it. Explore our collections categorized by the rhythms of daily living.
            </p>
          </div>

          {/* Collection Cards */}
          {collections.map((item, index) => (
            <div 
              key={index} 
              className="w-[85vw] md:w-[70vw] h-[70vh] relative flex-shrink-0 group overflow-hidden"
            >
              <TemplateImage 
                src={item.img} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-furniture-walnut/90 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 p-12 w-full flex justify-between items-end">
                <div>
                  <h3 className="font-display text-4xl md:text-6xl text-furniture-bg mb-4">{item.title}</h3>
                  <p className="text-furniture-bg/70 text-lg tracking-wide">{item.subtitle}</p>
                </div>
                <div className="w-16 h-16 rounded-full border border-furniture-bg/30 flex items-center justify-center text-furniture-bg backdrop-blur-sm group-hover:bg-furniture-ochre group-hover:border-furniture-ochre group-hover:text-furniture-walnut transition-all duration-300">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default Collections;
