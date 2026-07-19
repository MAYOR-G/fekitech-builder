"use client";
import type { Feature } from "../data/siteContent";

type FeatureCardProps = {
  feature: Feature;
};

export function FeatureCard({ feature }: FeatureCardProps) {

  const Icon = feature.icon;

  return (
    <article className="rounded-[1.5rem] border border-charcoal/10 bg-white/55 p-6 shadow-insetGlow transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-bone text-walnut">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-6 font-display text-3xl font-semibold leading-none text-charcoal">
        {feature.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-charcoal/64">
        {feature.description}
      </p>
    </article>
  );
}
