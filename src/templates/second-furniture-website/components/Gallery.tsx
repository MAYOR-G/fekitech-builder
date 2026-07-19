"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

const images = [
  { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000", alt: "Sofa detail", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=1000", alt: "Dining table", aspect: "aspect-square" },
  { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1000", alt: "Lounge chair", aspect: "aspect-[4/3]" },
  { src: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&q=80&w=1000", alt: "Lighting detail", aspect: "aspect-[3/4]" },
  { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1000", alt: "Bedroom setup", aspect: "aspect-video" },
];

const Gallery = () => {
  return (
    <section className="py-32 bg-furniture-bg">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="text-center mb-24">
          <h2 className="font-display text-4xl md:text-5xl text-furniture-text">In Situ</h2>
          <p className="text-furniture-text/60 mt-4 uppercase tracking-widest text-sm">Selected Residences</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.2 }}
              className="break-inside-avoid relative group overflow-hidden"
            >
              <TemplateImage 
                src={img.src} 
                alt={img.alt} 
                className="w-full object-cover filter grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-furniture-bg/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;
