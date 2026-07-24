import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Gallery() {
  const { gallery } = useTemplateData();
  const allImages = [...gallery.rowOne, ...gallery.rowTwo];

  return (
    <section className="py-32 bg-[#FBF8F1] overflow-hidden" id="gallery">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center mb-20">
        <span className="text-[#E2A499] text-[11px] font-medium uppercase tracking-[0.25em] mb-4 block">
          Lookbook
        </span>
        <h2 className="font-serif text-5xl md:text-6xl text-[#3D3A35] mb-6">
          {gallery.title}
        </h2>
        <p className="text-[#6D6A61] max-w-xl mx-auto font-light text-lg">
          {gallery.description}
        </p>
      </div>

      <div className="flex gap-6 px-6 md:px-12 w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        {allImages.concat(allImages).map((img, i) => (
          <div key={i} className="relative w-[300px] md:w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden group flex-shrink-0">
            <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[#3D3A35]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-full py-3 px-6 text-center transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <span className="font-serif text-[#3D3A35] text-lg">{img.caption}</span>
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
