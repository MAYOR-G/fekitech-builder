"use client";
import type { Product } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {

  const imagePosition =
    product.name === "Pearl Wedding Tiers" ? "object-[center_38%]" : "";

  return (
    <article className="group flex flex-col h-full bg-white transition duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative p-3 pb-0">
        <ImageFrame
          src={product.image}
          alt={product.name}
          className="h-80 rounded-t-sm rounded-b-none"
          imageClassName={`transition-transform duration-[1.5s] ease-out group-hover:scale-105 ${imagePosition}`}
        >
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ganache shadow-sm border border-white/40">
            {product.badge}
          </span>
        </ImageFrame>
      </div>
      <div className="flex flex-col flex-1 p-8 text-center bg-white border-b border-l border-r border-chocolate/5">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-rose/80 mb-3">
          {product.category}
        </p>
        <h3 className="font-display text-3xl font-normal leading-tight text-ganache mb-4">
          {product.name}
        </h3>
        <p className="flex-1 text-[0.95rem] leading-[1.8] tracking-wide text-[#2D2D2D] mb-6 max-w-sm mx-auto">
          {product.description}
        </p>
        <div className="mt-auto flex flex-col items-center gap-4">
          <p className="text-xl font-black text-ganache">
            {product.price}
          </p>
          <a
            href="#order"
            className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-ganache border-b border-ganache/30 pb-1 hover:border-ganache transition-colors"
          >
            Request this style
          </a>
        </div>
      </div>
    </article>
  );
}
