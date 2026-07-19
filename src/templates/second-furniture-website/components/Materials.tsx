"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

const materials = [
  {
    name: "American Black Walnut",
    desc: "Deep, chocolate hues with complex, sweeping grain patterns. Sourced from the Ohio River Valley.",
    img: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "White Oak",
    desc: "Pale, dense, and highly resilient. Quarter-sawn for distinctive ray flake patterns.",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Italian Travertine",
    desc: "Unfilled porous stone from Tivoli. Used for cool, textural contrast against warm timber.",
    img: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Patinated Brass",
    desc: "Solid brass hardware, hand-aged to create a living finish that evolves with use.",
    img: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?auto=format&fit=crop&q=80&w=800"
  }
];

const Materials = () => {
  return (
    <section id="materials" className="py-32 bg-furniture-bg">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-2xl">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-furniture-ochre mb-6 block">Raw Elements</span>
            <h2 className="font-display text-5xl md:text-7xl text-furniture-text mb-8">
              Materials that <br/><span className="italic">Age Gracefully.</span>
            </h2>
            <p className="text-furniture-text/70 text-lg">
              We design for generations. That requires materials capable of absorbing life—woods that deepen in color, brass that patinas, and stone that wears smooth. We reject synthetic finishes in favor of natural oils that allow the material to breathe.
            </p>
          </div>
          <button className="border-b border-furniture-text pb-2 text-sm uppercase tracking-widest font-medium hover:text-furniture-ochre hover:border-furniture-ochre transition-colors whitespace-nowrap">
            Order Material Samples
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {materials.map((mat, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                <TemplateImage 
                  src={mat.img} 
                  alt={mat.name} 
                  className="w-full h-full object-cover filter grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-furniture-bg/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <h3 className="font-display text-2xl text-furniture-text mb-3">{mat.name}</h3>
              <p className="text-furniture-text/60 text-sm leading-relaxed">{mat.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Materials;
