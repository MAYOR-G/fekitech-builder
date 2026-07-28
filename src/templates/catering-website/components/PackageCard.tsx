"use client";
import { Check, Star } from "lucide-react";
import type { Package } from "../data/siteContent";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

type PackageCardProps = {
  item: Package;
};

export function PackageCard({ item }: PackageCardProps) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-lg border border-catering-co-oat bg-white p-10 text-catering-co-charcoal transition duration-500 hover:-translate-y-1",
        item.highlighted
          ? "border-t-[3px] border-t-gold shadow-[0_22px_60px_rgba(197,160,89,0.16)]"
          : "shadow-[0_14px_34px_rgba(17,17,17,0.04)]"
      )}
    >
      {item.highlighted && (
        <span className="absolute -top-4 left-10 inline-flex items-center gap-1.5 rounded-md bg-catering-co-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-catering-co-charcoal">
          <Star className="h-3.5 w-3.5 fill-catering-co-charcoal" aria-hidden="true" />
          Chef&apos;s Recommendation
        </span>
      )}
      <p
        className={cn(
          "text-[11px] font-bold uppercase tracking-[0.2em]",
          item.highlighted ? "text-catering-co-gold" : "text-catering-co-olive"
        )}
      >
        {item.eyebrow}
      </p>
      <h3 className="mt-4 font-catering-co-display text-4xl font-medium">
        {item.name}
      </h3>
      <p
        className={cn(
          "mt-4 text-base leading-relaxed",
          "text-catering-co-ink"
        )}
      >
        {item.description}
      </p>
      
      <div className="mt-8 flex flex-col justify-between gap-4 border-t border-catering-co-oat pt-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold opacity-70 uppercase tracking-widest">Starting at</p>
          <p className="mt-1 font-catering-co-display text-5xl font-bold text-catering-co-gold">{item.price}</p>
        </div>
        <p className="border border-catering-co-oat bg-catering-co-linen px-4 py-2 text-sm font-semibold uppercase tracking-wider text-catering-co-ink">
          {item.guestRange}
        </p>
      </div>

      <ul className="mt-8 flex-1 space-y-4">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-4 text-base leading-relaxed">
            <Check
              className={cn(
                "mt-1 h-5 w-5 shrink-0",
                "text-catering-co-charcoal"
              )}
              aria-hidden="true"
            />
            <span className="text-catering-co-ink">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href="#contact"
        variant={item.highlighted ? "gold" : "secondary"}
        className={cn(
          "mt-10 w-full py-4 text-center",
          item.highlighted ? "bg-catering-co-gold text-catering-co-charcoal hover:bg-[#B8954F]" : "border-catering-co-oat text-catering-co-charcoal hover:border-catering-co-gold hover:bg-catering-co-linen"
        )}
      >
        Request This Package
      </ButtonLink>
    </article>
  );
}
