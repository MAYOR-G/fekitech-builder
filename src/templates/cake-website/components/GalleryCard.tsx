"use client";
import type { GalleryItem } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type GalleryCardProps = {
  item: GalleryItem;
};

export function GalleryCard({ item }: GalleryCardProps) {

  return (
    <article className="group cursor-pointer">
      <div className="relative overflow-hidden bg-chantilly h-full w-full aspect-[4/3]">
        <ImageFrame
          src={item.image}
          alt={item.title}
          className="h-full w-full"
          imageClassName="transition-transform duration-[2s] ease-out group-hover:scale-105"
        >
          {/* Elegant overlay on hover */}
          <div className="absolute inset-0 bg-ganache/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
          
          <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out z-10">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/80 mb-2">
              {item.occasion}
            </p>
            <h3 className="font-display text-2xl font-normal leading-tight text-white">
              {item.title}
            </h3>
            <div className="mt-4 w-8 h-[1px] bg-white/40 group-hover:w-16 transition-all duration-700 ease-out delay-100" />
          </div>
        </ImageFrame>
      </div>
    </article>
  );
}
