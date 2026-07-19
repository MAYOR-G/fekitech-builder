"use client";
import { Star } from "lucide-react";
import type { Testimonial } from "../data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {

  return (
    <article className="h-full rounded-[1.2rem] border border-white/12 bg-white/[0.08] p-6 shadow-insetLine transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
      <div className="flex gap-1 text-champagne">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} className="h-4 w-4 fill-champagne" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-6 text-[17px] font-semibold leading-8 text-white">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-champagne text-sm font-black text-plum">
          {testimonial.initials}
        </span>
        <span>
          <span className="block font-extrabold text-white">
            {testimonial.name}
          </span>
          <span className="block text-sm font-semibold text-white/70">
            {testimonial.title}
          </span>
        </span>
      </div>
    </article>
  );
}
