"use client";
import type { Service } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <article className="group overflow-hidden rounded-md border border-oat bg-white transition duration-500 hover:-translate-y-1 hover:shadow-card">
      <ImageFrame
        src={service.image}
        alt={service.title}
        className="aspect-[4/3] w-full bg-linen"
        imageClassName="transition duration-[1.5s] ease-out group-hover:scale-105"
      />
      <div className="p-7">
        <div className="mb-4 flex items-center justify-between gap-4 border-b border-oat pb-4">
          <span className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-gold" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-olive">
              {service.detail}
            </span>
          </span>
        </div>
        <h3 className="font-display text-3xl font-semibold leading-tight text-charcoal">
          {service.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-base leading-[1.65] text-ink">
          {service.description}
        </p>
      </div>
    </article>
  );
}
