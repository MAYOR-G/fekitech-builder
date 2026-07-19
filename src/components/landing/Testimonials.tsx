"use client";

import Link from "next/link";
import { motion } from "motion/react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const testimonials = [
  {
    quote:
      "I chose a service template, replaced the text and photos, and had a website I was comfortable sharing with customers. The whole process stayed clear from the first preview to the final draft.",
    name: "Nadia Bello",
    business: "Founder, Bello Home Services",
    initials: "NB",
    color: "bg-[#F4E8FF]",
  },
  {
    quote:
      "FekiTech Builder keeps client projects practical. I can choose a strong starting point, make focused changes, and show each customer a polished preview without writing code.",
    name: "Samuel Okoro",
    business: "Independent brand designer",
    initials: "SO",
    color: "bg-ft-cyan-soft",
  },
  {
    quote:
      "Our social page could not explain the business properly. Now customers have one professional place to see our services, opening hours, and the best way to contact us.",
    name: "Teni Adebayo",
    business: "Owner, Northline Barbers",
    initials: "TA",
    color: "bg-[#FFF0C8]",
  },
] as const;

export default function Testimonials() {
  return (
    <section id="customer-stories" className="relative z-10 -mt-10 rounded-t-[48px] bg-white px-5 pb-28 pt-24 sm:-mt-14 sm:rounded-t-[64px] sm:px-6 sm:pt-28 lg:-mt-16 lg:rounded-t-[80px] lg:pb-36 lg:pt-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.8fr)] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.14em] text-ft-primary">
              Customer stories
            </p>
            <h2 className="max-w-[820px] text-balance text-[clamp(46px,5.5vw,78px)] font-[800] leading-[1.02] tracking-[-0.04em] text-ft-ink">
              Trusted by 2,000+ business owners
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            className="max-w-[560px] lg:justify-self-end"
          >
            <p className="text-lg leading-8 text-ft-body sm:text-xl">
              FekiTech Builder helps service businesses, independent professionals, and growing teams create a credible home online.
            </p>
            <Link href="/signup" className="btn-primary mt-8 inline-flex px-8 py-3.5">
              Start building
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease }}
              className={`${testimonial.color} flex min-h-[430px] flex-col rounded-[28px] p-8 sm:p-10 lg:min-h-[470px] xl:p-12`}
            >
              <span aria-hidden="true" className="text-[72px] font-[800] leading-[0.7] text-ft-ink/30">
                “
              </span>
              <blockquote className="mt-8 text-xl leading-[1.55] text-ft-ink sm:text-2xl sm:leading-[1.5]">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-4 pt-10">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-white/80 text-sm font-bold text-ft-ink shadow-[0_8px_24px_rgba(33,42,62,0.08)]">
                  {testimonial.initials}
                </span>
                <span>
                  <span className="block font-bold text-ft-ink">{testimonial.name}</span>
                  <span className="mt-0.5 block text-sm leading-5 text-ft-body">{testimonial.business}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
