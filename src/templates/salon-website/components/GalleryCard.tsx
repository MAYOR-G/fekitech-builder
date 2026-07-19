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
        "group relative h-full overflow-hidden rounded-[1.35rem] bg-plum shadow-card",
        featured ? "min-h-[420px] sm:min-h-[520px]" : "min-h-[280px] sm:min-h-[320px]"
      )}
    >
      <ImageFrame
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-plum/84 via-plum/12 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-pearl">
        <p className="mb-3 inline-flex rounded-full bg-champagne px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-plum">
          {item.label}
        </p>
        <h3 className="font-display text-3xl font-semibold">{item.title}</h3>
      </div>
    </article>
  );
}
