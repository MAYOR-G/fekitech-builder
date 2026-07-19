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
        "group relative overflow-hidden rounded-[8px] bg-onyx shadow-card",
        featured ? "min-h-[420px] sm:min-h-[560px] lg:col-span-2" : "min-h-[280px] sm:min-h-[300px]"
      )}
    >
      <ImageFrame
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-onyx/82 via-onyx/8 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-pureWhite">
        <p className="mb-3 inline-flex rounded-[4px] bg-bronze px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-pureWhite">
          {item.label}
        </p>
        <h3 className="font-display text-3xl">{item.title}</h3>
      </div>
    </article>
  );
}
