"use client";
import type { Feature } from "../data/siteContent";

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <article className="border-t border-white/20 pt-8 transition duration-300 hover:-translate-y-1">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-3xl font-medium text-cream">
        {feature.title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-cream/70">
        {feature.description}
      </p>
    </article>
  );
}
