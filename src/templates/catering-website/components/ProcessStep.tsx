"use client";
import type { ProcessStep as ProcessStepType } from "../data/siteContent";

type ProcessStepProps = {
  step: ProcessStepType;
  index: number;
};

export function ProcessStep({ step, index }: ProcessStepProps) {
  const Icon = step.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative border-t border-catering-co-oat pt-8 transition duration-300 hover:-translate-y-1">
      <div className="absolute right-0 top-6 font-catering-co-display text-5xl font-medium leading-none text-catering-co-oat transition-colors duration-500 group-hover:text-catering-co-gold/30">
        {number}
      </div>
      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-catering-co-oat bg-white text-catering-co-gold shadow-sm transition-colors duration-300 group-hover:border-catering-co-gold group-hover:text-catering-co-charcoal">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-catering-co-display text-3xl font-semibold leading-tight text-catering-co-charcoal">
        {step.title}
      </h3>
      <p className="mt-4 text-base leading-[1.7] text-catering-co-ink">
        {step.description}
      </p>
    </article>
  );
}
