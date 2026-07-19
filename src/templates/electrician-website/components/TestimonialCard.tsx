"use client";
import { Star } from "lucide-react";
import type { Testimonial } from "../data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {

  return (
    <article className="h-full rounded-[1rem] border border-line bg-white p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-cobalt/30">
      <div className="flex gap-1 text-safety">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-safety" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-5 text-[17px] font-semibold leading-8 text-ink">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="mt-7 flex items-center gap-3 border-t border-line pt-5">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-cobalt text-sm font-black text-white">
          {testimonial.initials}
        </span>
        <span>
          <span className="block font-extrabold text-navy">
            {testimonial.name}
          </span>
          <span className="block text-sm font-semibold text-steel/62">
            {testimonial.title} - {testimonial.location}
          </span>
        </span>
      </div>
    </article>
  );
}
