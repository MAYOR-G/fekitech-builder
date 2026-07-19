"use client";
import { Check } from "lucide-react";
import type { PricingPlan } from "../data/siteContent";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

type PricingCardProps = {
  plan: PricingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[1.45rem] border p-6 shadow-card transition duration-300 hover:-translate-y-1.5",
        plan.highlighted
          ? "border-cobalt/28 bg-circuit-hero text-white shadow-glow"
          : "border-line/80 bg-white/95 text-navy hover:border-cobalt/24 hover:shadow-blue"
      )}
    >
      <div
        className={cn(
          "absolute -right-16 -top-16 h-40 w-40 rounded-full blur-2xl",
          plan.highlighted ? "bg-cyan/20" : "bg-cobalt/10"
        )}
      />
      {plan.highlighted ? (
        <span className="relative mb-5 inline-flex w-fit rounded-full bg-safety px-3 py-1 text-[11px] font-black uppercase tracking-[0.14em] text-navy">
          Popular inspection
        </span>
      ) : null}
      <h3 className="relative font-display text-3xl font-extrabold tracking-[-0.05em]">
        {plan.name}
      </h3>
      <p
        className={cn(
          "relative mt-4 text-[15px] leading-7",
          plan.highlighted ? "text-white/68" : "text-steel/72"
        )}
      >
        {plan.description}
      </p>
      <div className="relative mt-6 border-t border-current/12 pt-5">
        <p className="text-sm font-black uppercase tracking-[0.14em] opacity-62">
          Starting from
        </p>
        <p
          className={cn(
            "mt-2 font-display text-4xl font-extrabold tracking-[-0.06em]",
            plan.highlighted ? "text-safety" : "text-cobalt"
          )}
        >
          {plan.price}
        </p>
      </div>
      <ul className="relative mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm font-semibold leading-6">
            <Check
              className={cn(
                "mt-0.5 h-5 w-5 shrink-0",
                plan.highlighted ? "text-safety" : "text-cobalt"
              )}
              aria-hidden="true"
            />
            <span className={plan.highlighted ? "text-white/76" : "text-steel/78"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <ButtonLink
        href="#contact"
        variant={plan.highlighted ? "yellow" : "secondary"}
        className="mt-7 w-full"
      >
        Request estimate
      </ButtonLink>
    </article>
  );
}
