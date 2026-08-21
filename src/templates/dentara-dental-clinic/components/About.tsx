"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { CheckCircle2, ArrowRight } from "lucide-react";

export function About() {
  const data = useTemplateData();

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="dentara-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="dentara-badge mb-4">
            <span data-editable-path="about.badge" data-editable-type="text">
              {data.about.badge}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
            data-editable-path="about.title"
            data-editable-type="text"
          >
            {data.about.title}
          </h2>
          <p
            className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed"
            data-editable-path="about.description"
            data-editable-type="text"
          >
            {data.about.description}
          </p>
        </div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Clinic Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-[28px] overflow-hidden border border-[#e0e7fe] shadow-sm group">
              <img
                src={data.about.image}
                alt={data.about.imageAlt}
                className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-103 transition-transform duration-500"
                data-editable-path="about.image"
                data-editable-type="image"
                data-editable-alt-path="about.imageAlt"
              />
            </div>
          </div>

          {/* Right Text & Checklist */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h3
              className="text-2xl sm:text-3xl font-bold text-[#0f0f0f] tracking-tight mb-6 font-heading"
              data-editable-path="about.heading"
              data-editable-type="text"
            >
              {data.about.heading}
            </h3>

            <div className="space-y-4 mb-8 w-full">
              {data.about.points.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f5f8fb] border border-[#e2e8f0]/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#0454ff] flex-shrink-0 mt-0.5" />
                  <span
                    className="text-base font-medium text-[#2f2f2f]"
                    data-editable-path={`about.points.${idx}.text`}
                    data-editable-type="text"
                  >
                    {point.text}
                  </span>
                </div>
              ))}
            </div>

            <a
              href={data.about.cta.href}
              className="dentara-btn-primary py-3.5 px-7"
              data-editable-path="about.cta.label"
              data-editable-type="link"
              data-editable-href-path="about.cta.href"
            >
              <span>{data.about.cta.label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
