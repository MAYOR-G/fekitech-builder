import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Testimonials() {
  const { testimonials, colors } = useTemplateData();

  const cardColors = [
    { bg: colors.background, text: colors.text },
    { bg: colors.secondary, text: colors.text },
    { bg: colors.text, text: colors.secondary },
  ];

  return (
    <section className="w-full flex flex-col md:flex-row" style={{ backgroundColor: colors.primary }}>
      <div className="w-full md:w-1/2 p-12 md:p-24 flex items-start">
        <h2 
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter sticky top-32"
          style={{ color: colors.text }}
        >
          {testimonials.title.split(' ').map((word: string, i: number) => (
            <React.Fragment key={i}>
              {word}
              <br />
            </React.Fragment>
          ))}
        </h2>
      </div>

      <div className="w-full md:w-1/2 flex flex-col">
        {testimonials.items.map((item: any, i: number) => {
          const colorConfig = cardColors[i % cardColors.length];
          return (
            <div 
              key={i}
              className="p-12 md:p-20 rounded-tl-[3rem]"
              style={{ backgroundColor: colorConfig.bg, color: colorConfig.text }}
            >
              <p className="font-serif text-3xl md:text-4xl italic font-light leading-snug mb-8">
                "{item.quote}"
              </p>
              <p className="font-sans text-sm tracking-wider uppercase font-semibold">
                {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
