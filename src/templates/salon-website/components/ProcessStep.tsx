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
    <article className="relative rounded-[1.15rem] border border-plum/10 bg-pearl p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-rose/34">
      <div className="absolute right-5 top-4 font-display text-6xl font-semibold leading-none text-rose/[0.12]">
        {number}
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-plum text-champagne">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-semibold text-plum">
        {step.title}
      </h3>
      <p className="mt-3 text-[15px] leading-7 text-mink/72">
        {step.description}
      </p>
    </article>
  );
}
