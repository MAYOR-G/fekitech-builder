import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Gallery() {
  const { gallery } = useTemplateData();

  return (
    <section className="py-32 bg-[#F9F9F9] text-[#111111] overflow-hidden" id="gallery">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <div className="inline-block bg-[#111111] text-[#E5B53A] px-4 py-1 font-bold text-xs uppercase tracking-widest mb-6">
            Gallery
          </div>
          <h2 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 leading-[0.9]">
            {gallery.title}
          </h2>
        </div>
        <p className="text-[#555555] text-xl font-medium max-w-sm text-right">
          {gallery.description}
        </p>
      </div>

      <div className="px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[...gallery.rowOne, ...gallery.rowTwo].map((img, i) => (
            <div key={i} className="relative aspect-[16/9] bg-[#111111] overflow-hidden group">
              <img src={img.image} alt={img.imageAlt} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
              <div className="absolute bottom-6 left-6 bg-[#E5B53A] text-[#111111] px-4 py-2 font-bold uppercase text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {img.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
