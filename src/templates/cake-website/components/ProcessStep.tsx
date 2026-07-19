"use client";
import type { ProcessStep as ProcessStepType } from "../data/siteContent";

type ProcessStepProps = {
  step: ProcessStepType;
  index: number;
};

export function ProcessStep({ step, index }: ProcessStepProps) {

  const Icon = step.icon;

  return (
    <article className="group flex flex-col items-center text-center px-5 py-8 relative border border-chocolate/10 bg-white shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-card">
      <div className="mb-6 relative">
        <span className="absolute -top-3 -right-3 font-display text-4xl text-rose/10 transition-colors duration-500 group-hover:text-rose/20">
          0{index + 1}
        </span>
        <div className="grid h-20 w-20 place-items-center rounded-full bg-[#FFFBF7] border border-chocolate/10 text-rose shadow-sm transition-transform duration-500 group-hover:scale-110">
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <h3 className="font-display text-[1.7rem] font-semibold leading-tight text-ganache mb-3">
        {step.title}
      </h3>
      <p className="text-[0.95rem] leading-[1.75] tracking-wide text-[#2D2D2D] max-w-xs mx-auto">
        {step.description}
      </p>
      
      {/* Decorative connecting line for desktop (handled in parent or via pseudo element if needed, but keeping it simple here) */}
      <div className="mt-8 w-[1px] h-12 bg-chocolate/10 xl:hidden last:hidden" />
    </article>
  );
}
