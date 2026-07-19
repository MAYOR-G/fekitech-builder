"use client";
import type { Testimonial } from "../data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {

  return (
    <figure className="relative bg-white px-8 py-10 rounded-sm border border-chocolate/10 shadow-[0_14px_38px_rgba(35,23,21,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-card">
      <div className="absolute top-8 left-8 text-6xl text-rose/20 font-display leading-none">
        &quot;
      </div>
      <blockquote className="relative z-10 font-display text-2xl font-normal leading-snug text-ganache mt-8 mb-10 text-center italic">
        {testimonial.quote}
      </blockquote>
      <figcaption className="flex flex-col items-center">
        <span className="block font-bold uppercase tracking-[0.2em] text-[0.7rem] text-ganache mb-1">
          {testimonial.name}
        </span>
        <span className="block text-[0.85rem] text-[#2D2D2D]/80 tracking-wide">
          {testimonial.title}
        </span>
      </figcaption>
    </figure>
  );
}
