import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Gallery() {
  const { gallery } = useTemplateData();
  const allImages = [...gallery.rowOne, ...gallery.rowTwo];

  return (
    <section className="py-20 bg-[#FF2A00] overflow-hidden border-y-8 border-[#111111]" id="gallery">
      <div className="flex gap-4 px-4 w-max animate-[marquee_20s_linear_infinite] hover:[animation-play-state:paused]">
        {allImages.concat(allImages).map((img, i) => (
          <div key={i} className="relative w-[250px] md:w-[350px] aspect-square border-4 border-[#111111] bg-[#FFE600] group flex-shrink-0 shadow-[8px_8px_0px_0px_#111111] overflow-hidden hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#111111] transition-all">
            <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#111111]/80">
              <span className="font-serif text-[#FFE600] text-3xl font-bold uppercase text-center px-4 rotate-[-10deg]">
                {img.caption}
              </span>
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 8px)); }
        }
      `}} />
    </section>
  );
}
