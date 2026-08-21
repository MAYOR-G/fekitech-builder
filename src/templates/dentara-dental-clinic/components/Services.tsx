"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export function Services() {
  const data = useTemplateData();

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="dentara-container">
        {/* Main Royal Blue Section Card */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#0454ff] p-6 sm:p-10 lg:p-14 text-white shadow-xl">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-xs font-bold tracking-widest uppercase mb-4">
                <span data-editable-path="services.badge" data-editable-type="text">
                  {data.services.badge}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-heading"
                data-editable-path="services.title"
                data-editable-type="text"
              >
                {data.services.title}
              </h2>
              <p
                className="text-base sm:text-lg text-white/85 leading-relaxed"
                data-editable-path="services.description"
                data-editable-type="text"
              >
                {data.services.description}
              </p>
            </div>

            <a
              href={data.services.cta.href}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0454ff] hover:bg-[#f5f8fb] font-semibold text-sm transition-all self-start lg:self-auto shadow-md"
              data-editable-path="services.cta.label"
              data-editable-type="link"
              data-editable-href-path="services.cta.href"
            >
              <span>{data.services.cta.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* 6 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.services.items.map((service, idx) => (
              <div
                key={idx}
                className="dentara-service-card bg-white text-[#0f0f0f] p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Service Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-5 bg-[#f5f8fb] aspect-[4/3] group">
                    <img
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      data-editable-path={`services.items.${idx}.image`}
                      data-editable-type="image"
                      data-editable-alt-path={`services.items.${idx}.imageAlt`}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3
                    className="text-xl font-bold text-[#0f0f0f] tracking-tight mb-2.5 font-heading"
                    data-editable-path={`services.items.${idx}.title`}
                    data-editable-type="text"
                  >
                    {service.title}
                  </h3>
                  <p
                    className="text-sm text-[#6d6d6d] leading-relaxed mb-6"
                    data-editable-path={`services.items.${idx}.description`}
                    data-editable-type="text"
                  >
                    {service.description}
                  </p>
                </div>

                {/* Card CTA Button */}
                <a
                  href={service.buttonHref}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0454ff] hover:text-[#0043d4] transition-colors pt-2 border-t border-[#e2e8f0]"
                  data-editable-path={`services.items.${idx}.buttonLabel`}
                  data-editable-type="link"
                  data-editable-href-path={`services.items.${idx}.buttonHref`}
                >
                  <span>{service.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
