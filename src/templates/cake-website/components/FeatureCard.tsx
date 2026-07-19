"use client";
import type { Feature } from "../data/siteContent";

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {

  const Icon = feature.icon;

  return (
    <article className="group relative border-l border-cream/20 pl-6 py-2 transition-all duration-300 hover:border-blush">
      <div className="absolute -left-[1px] top-4 h-0 w-[2px] bg-blush transition-all duration-500 group-hover:h-12" />
      <div className="flex items-center gap-4 mb-4">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-blush border border-white/10 group-hover:bg-white/10 transition-colors duration-300">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-display text-2xl font-normal leading-tight text-cream">
          {feature.title}
        </h3>
      </div>
      <p className="text-[0.95rem] leading-[1.8] tracking-wide text-cream/70 max-w-sm">
        {feature.description}
      </p>
    </article>
  );
}
