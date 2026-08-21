"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { UserCheck, ShieldCheck, Sparkles } from "lucide-react";

export function Experience() {
  const data = useTemplateData();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "user":
        return <UserCheck className="w-6 h-6 text-[#0454ff]" />;
      case "shield":
        return <ShieldCheck className="w-6 h-6 text-[#0454ff]" />;
      case "sparkles":
      default:
        return <Sparkles className="w-6 h-6 text-[#0454ff]" />;
    }
  };

  return (
    <section id="why-us" className="py-12 sm:py-16 lg:py-24 bg-[#f5f8fb]">
      <div className="dentara-container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="dentara-badge mb-4">
            <span data-editable-path="experience.badge" data-editable-type="text">
              {data.experience.badge}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
            data-editable-path="experience.title"
            data-editable-type="text"
          >
            {data.experience.title}
          </h2>
          <p
            className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed"
            data-editable-path="experience.subtitle"
            data-editable-type="text"
          >
            {data.experience.subtitle}
          </p>
        </div>

        {/* 3 Top Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {data.experience.items.map((item, idx) => (
            <div
              key={idx}
              className="dentara-card p-6 sm:p-8 flex flex-col items-start bg-white"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f5f7ff] border border-[#e0e7fe] flex items-center justify-center mb-6">
                {getIcon(item.icon)}
              </div>
              <h3
                className="text-xl font-bold text-[#0f0f0f] tracking-tight mb-3 font-heading"
                data-editable-path={`experience.items.${idx}.title`}
                data-editable-type="text"
              >
                {item.title}
              </h3>
              <p
                className="text-sm sm:text-base text-[#6d6d6d] leading-relaxed"
                data-editable-path={`experience.items.${idx}.description`}
                data-editable-type="text"
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Wide Panoramic Digital X-Ray / Scanning Banner */}
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#e0e7fe] shadow-sm group">
          <img
            src={data.experience.bannerImage}
            alt={data.experience.bannerImageAlt}
            className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
            data-editable-path="experience.bannerImage"
            data-editable-type="image"
            data-editable-alt-path="experience.bannerImageAlt"
          />
        </div>
      </div>
    </section>
  );
}
