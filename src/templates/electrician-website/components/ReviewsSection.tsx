"use client";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function ReviewsSection() {
  const { testimonials } = useTemplateData();

  return (
    <section id="reviews" className="bg-white px-5 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Reviews"
          title="Trusted by homeowners and businesses."
          description="Read what our clients have to say about our fast response times, professional service, and clean workmanship."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <motion.figure
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-mist p-8 shadow-sm"
            >
              <div className="flex gap-1 text-amber mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-lg leading-relaxed text-navy mb-8">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <figcaption className="flex items-center gap-4 border-t border-slate-200 pt-6 mt-auto">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cobalt/10 text-cobalt font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-navy">{testimonial.name}</div>
                  <div className="text-sm text-slate-500">{testimonial.title} • {testimonial.location}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
