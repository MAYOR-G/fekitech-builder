import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Gallery() {
  const { gallery, colors } = useTemplateData();
  const allImages = [...gallery.rowOne, ...gallery.rowTwo];

  return (
    <section className="py-32 bg-white overflow-hidden" id="gallery">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-20">
        <span className="text-[11px] font-medium uppercase tracking-[0.3em] mb-4 block" style={{ color: colors.primary }}>
          Lookbook
        </span>
        <h2 className="font-serif text-5xl md:text-6xl mb-6 font-medium" style={{ color: colors.text }}>
          {gallery.title}
        </h2>
        <p className="text-[#6D6A61] max-w-xl mx-auto font-light text-lg">
          {gallery.description}
        </p>
      </div>

      <div className="flex gap-6 px-6 md:px-12 w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {allImages.concat(allImages).map((img: any, i: number) => (
          <div key={i} className="relative w-[300px] md:w-[400px] aspect-[4/5] rounded-[1rem] overflow-hidden group flex-shrink-0">
            <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-full py-3 px-6 text-center transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="font-serif text-lg" style={{ color: colors.text }}>{img.caption}</span>
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
      `}} />
    </section>
  );
}
