"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const data = useTemplateData();
  const [openIdx, setOpenIdx] = useState<number>(0);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Title side */}
        <div className="lg:col-span-1">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight max-w-sm">
            {data.faqs.title}
          </h2>
        </div>

        {/* Accordion side */}
        <div className="lg:col-span-2 space-y-4">
          {data.faqs.items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-gray-100 rounded-2xl bg-[#f9f8f6] overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between text-left p-6 focus:outline-none"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-8">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 px-6 pb-6">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
