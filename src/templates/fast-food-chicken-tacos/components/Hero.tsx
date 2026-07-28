import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero: typedHero, colors } = useTemplateData();
  const hero = typedHero as any;

  const headlineParts = hero.headline ? hero.headline.split(' & ') : ['Cluck', 'Yard'];

  return (
    <section className="relative w-full pt-40 pb-24 px-6 md:px-12 flex flex-col" id="top" style={{ backgroundColor: colors.background }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-12">
        <h1 className="font-serif text-[12vw] leading-[0.9] tracking-tighter text-[#3D2721] font-medium">
          {headlineParts[0]} 
          {headlineParts.length > 1 && (
            <>
              &<br />{headlineParts[1]}
            </>
          )}
        </h1>
        
        <div className="md:max-w-sm text-[#3D2721] flex flex-col items-start pb-4">
          <h2 className="font-serif text-3xl font-bold mb-4">{hero.subheadline}</h2>
          <p className="font-sans text-lg mb-8 opacity-80 leading-relaxed">
            {hero.description}
          </p>
          <a
            href={hero.ctaLink}
            className="inline-block px-10 py-4 rounded-full font-serif font-bold text-lg transition-transform hover:scale-105"
            style={{ backgroundColor: colors.primary, color: colors.text }}
          >
            {hero.cta}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {hero.images?.map((img: string, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            className="w-full aspect-[4/5] overflow-hidden rounded-2xl"
          >
            <img src={img} alt="Hero image" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
