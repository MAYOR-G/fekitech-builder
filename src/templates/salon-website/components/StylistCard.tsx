"use client";
import type { Stylist } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type StylistCardProps = {
  stylist: Stylist;
};

export function StylistCard({ stylist }: StylistCardProps) {

  return (
    <article className="group overflow-hidden rounded-[1.25rem] border border-plum/10 bg-pearl shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <ImageFrame
        src={stylist.image}
        alt={stylist.name}
        className="h-80 bg-blush"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="p-6">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-rose">
          {stylist.role}
        </p>
        <h3 className="mt-2 font-display text-3xl font-semibold text-plum">
          {stylist.name}
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-mink/72">{stylist.note}</p>
      </div>
    </article>
  );
}
