"use client";
import { Star } from "lucide-react";
import type { Testimonial } from "../data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {

  return (
    <article className="h-full rounded-[8px] border border-charcoal/10 bg-pureWhite p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-bronze/35">
      <div className="flex gap-1 text-bronze">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-bronze" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-6 text-[17px] font-medium leading-8 text-onyx">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="mt-7 flex items-center gap-3 border-t border-charcoal/10 pt-5">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-onyx text-sm font-bold text-bronze">
          {testimonial.initials}
        </span>
        <span>
          <span className="block font-bold text-onyx">
            {testimonial.name}
          </span>
          <span className="block text-sm font-semibold text-charcoal/70">
            {testimonial.title}
          </span>
        </span>
      </div>
    </article>
  );
}
