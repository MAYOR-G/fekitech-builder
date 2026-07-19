"use client";
import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function Testimonials() {
  const { testimonials } = useTemplateData();

  const items = [...testimonials, ...testimonials];

  return (
    <section className="overflow-hidden bg-pearl px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeader
            eyebrow="Patient words"
            title="Trust built through clarity, kindness, and consistent care."
            description="A clean marquee keeps testimonials visible without turning them into a noisy slider."
            align="center"
          />
        </Reveal>
      </div>

      <div className="mt-12 overflow-hidden">
        <div className="testimonial-track flex w-max gap-5 motion-safe:animate-marquee">
          {items.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="w-[min(86vw,390px)] shrink-0 rounded-[1.5rem] border border-ink/8 bg-white p-6 shadow-card"
            >
              <div className="flex items-center gap-1 text-champagne">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-ink">
                  {testimonial.rating}
                </span>
              </div>
              <p className="mt-6 text-lg leading-8 text-ink">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="mt-7 border-t border-ink/8 pt-5">
                <p className="font-semibold text-ink">{testimonial.name}</p>
                <p className="mt-1 text-sm text-graphite/64">
                  {testimonial.treatment}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
