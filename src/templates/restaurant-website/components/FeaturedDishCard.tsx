"use client";
import type { FeaturedDish } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type FeaturedDishCardProps = {
  dish: FeaturedDish;
};

export function FeaturedDishCard({ dish }: FeaturedDishCardProps) {

  return (
    <article className="group h-full overflow-hidden rounded-[1.15rem] border border-coal/10 bg-bone shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-ember">
      <ImageFrame
        src={dish.image}
        alt={dish.name}
        className="h-64 bg-graphite"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="rounded-full bg-flame/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.16em] text-flame">
            {dish.category}
          </span>
          <span className="font-display text-3xl font-semibold text-coal">
            {dish.price}
          </span>
        </div>
        <h3 className="font-display text-3xl font-semibold leading-[1.02] text-coal">
          {dish.name}
        </h3>
        <p className="mt-3 text-[15px] leading-7 text-graphite/72">
          {dish.description}
        </p>
      </div>
    </article>
  );
}
