"use client";
import type { Product } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {

  return (
    <article className="group h-full flex flex-col rounded-2xl border border-charcoal/5 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-charcoal/10 hover:shadow-card">
      <ImageFrame
        src={product.image}
        alt={product.name}
        className="h-72 rounded-[12px] sm:h-80"
        imageClassName="transition duration-700 group-hover:scale-105"
      >
        <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 font-mono text-[10px] font-extrabold uppercase tracking-[0.16em] text-charcoal">
          {product.badge}
        </span>
      </ImageFrame>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate">
                {product.category}
              </p>
              <h3 className="mt-2 font-display text-[28px] font-semibold leading-none text-charcoal">
                {product.name}
              </h3>
            </div>
            <p className="w-fit shrink-0 rounded-full bg-warm-white px-3.5 py-2 font-sans text-sm font-semibold text-charcoal">
              {product.price}
            </p>
          </div>
          <p className="mt-4 font-sans text-[15px] leading-[1.6] text-slate">
            {product.materials}
          </p>
        </div>
        <a
          href="#consultation"
          className="group/btn mt-8 inline-flex items-center gap-2 self-start rounded-full bg-charcoal px-6 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-all hover:bg-amber"
        >
          Request Quote
          <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}
