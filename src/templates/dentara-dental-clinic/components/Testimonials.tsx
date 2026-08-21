"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Star, Quote } from "lucide-react";

export function Testimonials() {
  const data = useTemplateData();

  return (
    <section id="reviews" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="dentara-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="dentara-badge mb-4">
            <span data-editable-path="testimonials.badge" data-editable-type="text">
              {data.testimonials.badge}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
            data-editable-path="testimonials.title"
            data-editable-type="text"
          >
            {data.testimonials.title}
          </h2>
          <p
            className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed"
            data-editable-path="testimonials.subtitle"
            data-editable-type="text"
          >
            {data.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.testimonials.items.map((item, idx) => (
            <div
              key={idx}
              className="dentara-card p-6 sm:p-8 flex flex-col justify-between bg-[#f5f8fb] hover:bg-white transition-colors"
            >
              <div>
                {/* Top Row: Stars & Procedure Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating || 5)].map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 fill-[#f4c300] text-[#f4c300]"
                      />
                    ))}
                  </div>

                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#e2e8f0] text-[#0454ff]"
                    data-editable-path={`testimonials.items.${idx}.procedure`}
                    data-editable-type="text"
                  >
                    {item.procedure}
                  </span>
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-[#e0e7fe] absolute -top-3 -left-2 -z-0 opacity-70" />
                  <p
                    className="text-base text-[#2f2f2f] leading-relaxed italic relative z-10"
                    data-editable-path={`testimonials.items.${idx}.quote`}
                    data-editable-type="text"
                  >
                    {item.quote}
                  </p>
                </div>
              </div>

              {/* Author Row */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#e2e8f0]">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#e2e8f0]"
                  data-editable-path={`testimonials.items.${idx}.avatar`}
                  data-editable-type="image"
                />
                <div className="flex flex-col">
                  <span
                    className="text-sm font-bold text-[#0f0f0f]"
                    data-editable-path={`testimonials.items.${idx}.author`}
                    data-editable-type="text"
                  >
                    {item.author}
                  </span>
                  <span
                    className="text-xs text-[#6d6d6d]"
                    data-editable-path={`testimonials.items.${idx}.role`}
                    data-editable-type="text"
                  >
                    {item.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
