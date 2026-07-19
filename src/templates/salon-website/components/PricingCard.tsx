"use client";
import { Check } from "lucide-react";
import type { PricingPackage } from "../data/siteContent";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

type PricingCardProps = {
  item: PricingPackage;
};

export function PricingCard({ item }: PricingCardProps) {

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-[1.25rem] border p-6 shadow-card transition duration-300 hover:-translate-y-1",
        item.highlighted
          ? "border-rose/36 bg-plum text-pearl shadow-plum"
          : "border-plum/10 bg-pearl text-plum"
      )}
    >
      {item.highlighted ? (
        <span className="mb-5 inline-flex w-fit rounded-full bg-champagne px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-plum">
          Most requested
        </span>
      ) : null}
      <h3 className="font-display text-3xl font-semibold">{item.name}</h3>
      <p
        className={cn(
          "mt-4 text-[15px] leading-7",
          item.highlighted ? "text-pearl/70" : "text-mink/72"
        )}
      >
        {item.description}
      </p>
      <p
        className={cn(
          "mt-6 border-t border-current/12 pt-5 font-display text-5xl font-semibold",
          item.highlighted ? "text-champagne" : "text-rose"
        )}
      >
        {item.price}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {item.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm font-semibold leading-6">
            <Check
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                item.highlighted ? "text-champagne" : "text-rose"
              )}
            />
            <span className={item.highlighted ? "text-pearl/76" : "text-mink/78"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href="#booking"
        variant={item.highlighted ? "secondary" : "primary"}
        className="mt-7 w-full"
      >
        Book this package
      </ButtonLink>
    </article>
  );
}
