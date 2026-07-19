"use client";
import type { Amenity } from "../data/siteContent";

type AmenityCardProps = {
  amenity: Amenity;
};

export function AmenityCard({ amenity }: AmenityCardProps) {

  const Icon = amenity.icon;

  return (
    <article className="rounded-[8px] border border-charcoal/10 bg-pureWhite p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-bronze/35">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-onyx text-bronze">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-2xl text-onyx">
        {amenity.title}
      </h3>
      <p className="mt-2 text-[15px] leading-7 text-charcoal/80">{amenity.description}</p>
    </article>
  );
}
