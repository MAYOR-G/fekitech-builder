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
    <article className="group relative h-full overflow-hidden rounded-[1.25rem] border border-line/80 bg-white p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-cobalt/30 hover:shadow-blue">
      <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-cobalt/0 via-cobalt/30 to-cobalt/0 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="absolute right-5 top-4 font-display text-5xl font-extrabold tracking-[-0.06em] text-cobalt/[0.08] transition duration-300 group-hover:text-cobalt/[0.13]">
        {number}
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white shadow-insetLine transition duration-300 group-hover:bg-cobalt">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-xl font-extrabold tracking-[-0.04em] text-navy">
        {step.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-steel/72">{step.description}</p>
    </article>
  );
}
