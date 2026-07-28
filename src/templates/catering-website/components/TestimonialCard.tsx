"use client";
import type { Testimonial } from "../data/siteContent";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="relative flex h-full flex-col justify-between border-l-2 border-catering-co-gold bg-catering-co-linen p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-card sm:p-10">
      <span className="font-catering-co-display text-7xl leading-none text-catering-co-gold" aria-hidden="true">
        &quot;
      </span>
      <p className="relative z-10 mt-2 text-lg font-medium leading-[1.75] text-catering-co-ink sm:text-xl">
        {testimonial.quote}
      </p>
      <div className="mt-10 flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-sm font-bold uppercase tracking-widest text-catering-co-charcoal ring-1 ring-catering-co-oat">
          {testimonial.initials}
        </span>
        <div>
          <span className="block text-sm font-bold uppercase tracking-wider text-catering-co-charcoal">
            {testimonial.name}
          </span>
          <span className="mt-1 block text-sm text-catering-co-olive">
            {testimonial.title} - {testimonial.location}
          </span>
        </div>
      </div>
    </article>
  );
}
