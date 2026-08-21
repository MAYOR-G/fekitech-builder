"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import {
  ClipboardList,
  Cpu,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Clock,
} from "lucide-react";

export function Features() {
  const data = useTemplateData();

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case "clipboard":
        return <ClipboardList className="w-6 h-6 text-[#0454ff]" />;
      case "cpu":
        return <Cpu className="w-6 h-6 text-[#0454ff]" />;
      case "heart":
        return <HeartHandshake className="w-6 h-6 text-[#0454ff]" />;
      case "shield-check":
        return <ShieldCheck className="w-6 h-6 text-[#0454ff]" />;
      case "sparkle":
        return <Sparkles className="w-6 h-6 text-[#0454ff]" />;
      case "clock":
      default:
        return <Clock className="w-6 h-6 text-[#0454ff]" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-[#f5f8fb]">
      <div className="dentara-container">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-16">
          <div className="dentara-badge mb-4">
            <span data-editable-path="features.badge" data-editable-type="text">
              {data.features.badge}
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
            data-editable-path="features.title"
            data-editable-type="text"
          >
            {data.features.title}
          </h2>
          <p
            className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed"
            data-editable-path="features.subtitle"
            data-editable-type="text"
          >
            {data.features.subtitle}
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.features.items.map((item, idx) => (
            <div
              key={idx}
              className="dentara-card p-6 sm:p-8 flex flex-col items-start bg-white shadow-xs"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#f5f7ff] border border-[#e0e7fe] flex items-center justify-center mb-6">
                {getFeatureIcon(item.icon)}
              </div>
              <h3
                className="text-xl font-bold text-[#0f0f0f] tracking-tight mb-3 font-heading"
                data-editable-path={`features.items.${idx}.title`}
                data-editable-type="text"
              >
                {item.title}
              </h3>
              <p
                className="text-sm sm:text-base text-[#6d6d6d] leading-relaxed"
                data-editable-path={`features.items.${idx}.description`}
                data-editable-type="text"
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
