"use client";
import type { GalleryItem } from "../data/siteContent";
import { cn } from "../lib/utils";
import { ImageFrame } from "./ImageFrame";

type GalleryCardProps = {
  item: GalleryItem;
  variant?: "tall" | "wide" | "standard";
};

export function GalleryCard({ item, variant = "standard" }: GalleryCardProps) {

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-[1rem] bg-coal shadow-panel",
        variant === "tall" && "min-h-[380px] sm:min-h-[560px]",
        variant === "wide" && "min-h-[260px] sm:min-h-[270px]",
        variant === "standard" && "min-h-[260px] sm:min-h-[270px]"
      )}
    >
      <ImageFrame
        src={item.image}
        alt={item.title}
        className="absolute inset-0 h-full w-full"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coal/86 via-coal/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
        <p className="mb-3 inline-flex rounded-full bg-ember px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-coal">
          {item.label}
        </p>
        <h3 className="font-display text-3xl font-semibold">{item.title}</h3>
      </div>
    </article>
  );
}
