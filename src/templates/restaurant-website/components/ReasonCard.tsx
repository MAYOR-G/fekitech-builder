"use client";
import type { Reason } from "../data/siteContent";

type ReasonCardProps = {
  reason: Reason;
};

export function ReasonCard({ reason }: ReasonCardProps) {

  const Icon = reason.icon;

  return (
    <article className="rounded-[1.1rem] border border-coal/10 bg-bone p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-flame/20 hover:shadow-ember">
      <span className="grid h-12 w-12 place-items-center rounded-full border border-basil/12 bg-basil/10 text-basil">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-2xl font-semibold text-coal">
        {reason.title}
      </h3>
      <p className="mt-3 text-[15px] leading-7 text-graphite/72">
        {reason.description}
      </p>
    </article>
  );
}
