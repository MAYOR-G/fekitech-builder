"use client";
import type { Collection } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type CollectionCardProps = {
  collection: Collection;
};

export function CollectionCard({ collection }: CollectionCardProps) {

  const Icon = collection.icon;

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-charcoal/10 bg-white shadow-insetGlow transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <ImageFrame
        src={collection.image}
        alt={`${collection.title} furniture collection`}
        className="h-[320px] sm:h-72 md:h-80"
        imageClassName="transition duration-700 group-hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/48 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-full bg-white text-charcoal shadow-soft">
          <Icon className="h-5 w-5" />
        </div>
      </ImageFrame>
      <div className="p-6">
        <h3 className="font-display text-3xl font-semibold text-charcoal">
          {collection.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-charcoal/64">
          {collection.description}
        </p>
      </div>
    </article>
  );
}
