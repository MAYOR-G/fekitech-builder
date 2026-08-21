"use client";
import React, { useState, useRef } from "react";
import { useTemplateData } from "../TemplateContext";
import { ArrowRight, MoveHorizontal } from "lucide-react";

export function ResultsSlider() {
  const data = useTemplateData();
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="results" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="dentara-container">
        {/* Dark Emerald Container Card matching reference */}
        <div className="rounded-[28px] sm:rounded-[36px] bg-[#052927] p-6 sm:p-10 lg:p-14 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#dbeae9] text-xs font-bold tracking-widest uppercase mb-6">
                <span data-editable-path="results.badge" data-editable-type="text">
                  {data.results.badge}
                </span>
              </div>

              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6 font-heading"
                data-editable-path="results.title"
                data-editable-type="text"
              >
                {data.results.title}
              </h2>

              <p
                className="text-base sm:text-lg text-[#dbeae9]/85 leading-relaxed mb-8"
                data-editable-path="results.description"
                data-editable-type="text"
              >
                {data.results.description}
              </p>

              <a
                href={data.results.cta.href}
                className="dentara-btn-primary py-4 px-8 text-base shadow-lg"
                data-editable-path="results.cta.label"
                data-editable-type="link"
                data-editable-href-path="results.cta.href"
              >
                <span>{data.results.cta.label}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Right Interactive Before / After Image Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                ref={containerRef}
                className="dentara-comparison-slider relative w-full max-w-[540px] aspect-[16/9] sm:aspect-[4/3] rounded-[24px] overflow-hidden border border-white/20 shadow-2xl cursor-ew-resize select-none bg-black"
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
              >
                {/* Full Image */}
                <img
                  src={data.results.image}
                  alt={data.results.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  data-editable-path="results.image"
                  data-editable-type="image"
                  data-editable-alt-path="results.imageAlt"
                />

                {/* Before Label Badge */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase border border-white/20 pointer-events-none z-20">
                  <span data-editable-path="results.beforeLabel" data-editable-type="text">
                    {data.results.beforeLabel}
                  </span>
                </div>

                {/* After Label Badge */}
                <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#0454ff]/80 backdrop-blur-md text-white text-xs font-bold tracking-wide uppercase border border-white/20 pointer-events-none z-20">
                  <span data-editable-path="results.afterLabel" data-editable-type="text">
                    {data.results.afterLabel}
                  </span>
                </div>

                {/* Interactive Slider Divider Line */}
                <div
                  className="dentara-slider-handle"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="dentara-slider-button">
                    <MoveHorizontal className="w-5 h-5 text-[#0454ff]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
