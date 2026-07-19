"use client";
import type { TrustPoint } from "../data/siteContent";

type TrustBadgeProps = {
  item: TrustPoint;
};

export function TrustBadge({ item }: TrustBadgeProps) {

  const Icon = item.icon;

  return (
    <article className="group relative overflow-hidden rounded-[1.25rem] border border-white/12 bg-white/[0.08] p-5 shadow-insetLine backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-cyan/28 hover:bg-white/[0.12]">
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />
      <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-safety text-navy">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="relative mt-5 font-display text-xl font-extrabold tracking-[-0.04em] text-white">
        {item.title}
      </h3>
      <p className="relative mt-2 text-sm leading-6 text-white/66">{item.description}</p>
    </article>
  );
}
