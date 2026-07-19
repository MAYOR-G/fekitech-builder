"use client";
import type { Category } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {

  const Icon = category.icon;

  return (
    <article className="group flex flex-col items-center text-center">
      <div className="w-full relative overflow-hidden rounded-sm mb-4 border border-chocolate/10 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-xl">
        <ImageFrame
          src={category.image}
          alt={`${category.title} by Velvet Crumb Cakes`}
          className="h-72 w-full"
          imageClassName="transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        >
          <div className="absolute inset-0 bg-ganache/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-4 left-1/2 -translate-x-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-rose backdrop-blur-sm border border-white/40 shadow-sm opacity-0 -translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <Icon className="h-4 w-4" />
          </div>
        </ImageFrame>
      </div>
      <h3 className="font-display text-2xl font-normal leading-tight text-ganache mb-2 relative inline-block">
        {category.title}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-ganache/40 transition-all duration-500 group-hover:w-full" />
      </h3>
      <p className="text-[0.95rem] leading-[1.65] tracking-wide text-[#2D2D2D] max-w-[16rem]">
        {category.description}
      </p>
    </article>
  );
}
