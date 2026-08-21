"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { ArrowRight, Star, Award } from "lucide-react";

export function Hero() {
  const data = useTemplateData();

  return (
    <section id="home" className="py-6 sm:py-8 lg:py-10">
      <div className="dentara-container">
        {/* Main Hero Card Container matching reference */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#e0e7fe]/50 via-[#f5f8fb] to-[#ffffff] border border-[#e0e7fe] p-6 sm:p-10 lg:px-12 xl:px-14 lg:pt-12 xl:pt-14 lg:pb-0 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-end">
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-6 flex flex-col items-start z-10 lg:pb-10 xl:pb-12">
              {/* Badge */}
              <div className="dentara-badge mb-6">
                <span className="text-[#f4c300]">★</span>
                <span data-editable-path="hero.badge" data-editable-type="text">
                  {data.hero.badge}
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-extrabold text-[#0f0f0f] tracking-tight leading-[1.1] mb-6 font-heading"
                data-editable-path="hero.title"
                data-editable-type="text"
              >
                {data.hero.title}
              </h1>

              {/* Subtitle / Description */}
              <p
                className="text-lg sm:text-xl text-[#2f2f2f] leading-relaxed mb-8 max-w-xl font-normal"
                data-editable-path="hero.subtitle"
                data-editable-type="text"
              >
                {data.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <a
                  href={data.hero.primaryCta.href}
                  className="dentara-btn-primary w-full sm:w-auto py-4 px-8 text-base"
                  data-editable-path="hero.primaryCta.label"
                  data-editable-type="link"
                  data-editable-href-path="hero.primaryCta.href"
                >
                  <span>{data.hero.primaryCta.label}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <a
                  href={data.hero.secondaryCta.href}
                  className="dentara-btn-secondary w-full sm:w-auto py-4 px-8 text-base bg-white"
                  data-editable-path="hero.secondaryCta.label"
                  data-editable-type="link"
                  data-editable-href-path="hero.secondaryCta.href"
                >
                  <span>{data.hero.secondaryCta.label}</span>
                </a>
              </div>

              {/* Floating Review & Experience Stat Pill */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-white/90 backdrop-blur-sm border border-[#e0e7fe] rounded-2xl p-4 sm:p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#0454ff]/10 text-[#0454ff] flex items-center justify-center font-bold">
                    <Star className="w-5 h-5 fill-[#f4c300] text-[#f4c300]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span
                        className="text-lg font-bold text-[#0f0f0f]"
                        data-editable-path="hero.ratingScore"
                        data-editable-type="text"
                      >
                        {data.hero.ratingScore}
                      </span>
                      <span className="text-xs text-[#f4c300]">★★★★★</span>
                    </div>
                    <span
                      className="text-xs text-[#6d6d6d] font-medium"
                      data-editable-path="hero.ratingLabel"
                      data-editable-type="text"
                    >
                      {data.hero.ratingLabel}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-10 bg-[#e2e8f0]" />

                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#052927]/10 text-[#052927] flex items-center justify-center font-bold">
                    <Award className="w-5 h-5 text-[#052927]" />
                  </div>
                  <div>
                    <span
                      className="text-lg font-bold text-[#0f0f0f] block"
                      data-editable-path="hero.statYears"
                      data-editable-type="text"
                    >
                      {data.hero.statYears}
                    </span>
                    <span
                      className="text-xs text-[#6d6d6d] font-medium"
                      data-editable-path="hero.statLabel"
                      data-editable-type="text"
                    >
                      {data.hero.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Dentist Cutout Image Column - prominent transparent placement */}
            <div className="lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end items-end self-end z-10 -mt-4 lg:mt-0">
              {/* Soft ambient glow behind cutout */}
              <div className="absolute bottom-0 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-4 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-gradient-to-t from-[#0454ff]/20 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full max-w-[500px] sm:max-w-[580px] lg:max-w-[640px] xl:max-w-[700px] flex justify-center lg:justify-end items-end">
                <img
                  src={data.hero.image}
                  alt={data.hero.imageAlt}
                  className="w-full max-h-[580px] sm:max-h-[660px] lg:max-h-[740px] xl:max-h-[820px] object-contain object-bottom select-none drop-shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
                  data-editable-path="hero.image"
                  data-editable-type="image"
                  data-editable-alt-path="hero.imageAlt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
