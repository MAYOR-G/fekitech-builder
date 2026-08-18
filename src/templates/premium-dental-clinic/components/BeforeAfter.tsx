import React from "react";
import { useTemplateData } from "../TemplateContext";

export function BeforeAfter() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[#f9f8f6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight">
            {data.beforeAfter.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-0">
          {data.beforeAfter.items.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                {/* Simulated split image with CSS */}
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 h-full overflow-hidden relative">
                    <img
                      src={item.beforeImage}
                      alt="Before"
                      className="absolute inset-0 w-[200%] h-full object-cover max-w-none grayscale-[0.2] contrast-[0.9]"
                    />
                  </div>
                  <div className="w-1/2 h-full overflow-hidden relative">
                    <img
                      src={item.afterImage}
                      alt="After"
                      className="absolute inset-0 -left-[100%] w-[200%] h-full object-cover max-w-none brightness-110 contrast-125"
                    />
                  </div>
                </div>

                {/* Vertical slider line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-black -translate-x-1/2">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-black"></div>
                </div>
              </div>
              <p className="text-center mt-4 font-medium text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
