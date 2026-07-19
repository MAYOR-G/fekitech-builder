"use client";
import type { Testimonial } from "../data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {

  return (
    <figure className="h-full flex flex-col justify-between rounded-2xl border border-charcoal/5 bg-[#FAFAFA] p-8 shadow-sm">
      <blockquote className="font-display text-[26px] font-medium leading-[1.3] text-charcoal">
        &quot;{testimonial.quote}&quot;
      </blockquote>
      <figcaption className="mt-10 flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-amber text-sm font-bold text-white">
          {testimonial.initials}
        </span>
        <div>
          <span className="block font-sans text-[15px] font-semibold text-charcoal">
            {testimonial.name}
          </span>
          <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.1em] text-slate">
            {testimonial.title}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
