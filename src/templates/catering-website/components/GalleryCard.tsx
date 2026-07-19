"use client";
import type { GalleryItem } from "../data/siteContent";
import { cn } from "../lib/utils";
import { ImageFrame } from "./ImageFrame";

type GalleryCardProps = {
  item: GalleryItem;
  featured?: boolean;
};

export function GalleryCard({ item, featured = false }: GalleryCardProps) {
  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-md bg-charcoal",
        featured ? "sm:row-span-2 lg:col-span-2" : ""
      )}
    >
      <ImageFrame
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full bg-linen"
        imageClassName="transition-transform duration-[2s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 text-cream transition-transform duration-500 group-hover:translate-y-0 sm:p-8">
        <p className="mb-3 inline-flex rounded-md border border-gold/30 bg-charcoal/35 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold backdrop-blur-md">
          {item.occasion}
        </p>
        <h3 className="font-display text-3xl font-medium leading-tight">
          {item.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/82 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
          {item.notes}
        </p>
      </div>
    </article>
  );
}
