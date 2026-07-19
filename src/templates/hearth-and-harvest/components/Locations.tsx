"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const locations = [
  { name: "LONDON", type: "Cozy Brick-Walled Bistro", image: "/images/location_interior_1783067183003.png" },
  { name: "MANCHESTER", type: "Industrial-Chic Dining Hall", image: "/images/location_interior_1783067183003.png" },
  { name: "BIRMINGHAM", type: "Warm Family-Style Kitchen", image: "/images/location_interior_1783067183003.png" },
  { name: "LEEDS", type: "Modern Rustic Eatery", image: "/images/location_interior_1783067183003.png" },
];

export default function Locations() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-brand-light py-24 px-6 md:px-12 text-brand-dark" id="locations">
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-5xl md:text-7xl tracking-widest text-center mb-16 uppercase"
        >
          LOCATIONS
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <Image
                src={loc.image}
                alt={loc.name}
                fill sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  animate={{ y: hoveredIdx === idx ? -10 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white font-heading text-3xl tracking-wider uppercase mb-1 drop-shadow-md">
                    {loc.name}
                  </h3>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${hoveredIdx === idx ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-white/80 font-sans text-xs mb-3">{loc.type}</p>
                    <button className="text-brand-accent text-xs tracking-widest uppercase font-bold hover:text-white transition-colors flex items-center gap-1">
                      VIEW DETAILS <span>→</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
