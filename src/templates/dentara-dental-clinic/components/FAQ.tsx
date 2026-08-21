"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";
import { Plus, Minus, ArrowRight, MessageSquare } from "lucide-react";

export function FAQ() {
  const data = useTemplateData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-24 bg-[#f5f8fb]">
      <div className="dentara-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column Header & Contact Prompt */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            <div className="dentara-badge mb-4">
              <span data-editable-path="faq.badge" data-editable-type="text">
                {data.faq.badge}
              </span>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f0f0f] tracking-tight leading-tight mb-4 font-heading"
              data-editable-path="faq.title"
              data-editable-type="text"
            >
              {data.faq.title}
            </h2>

            <p
              className="text-base sm:text-lg text-[#6d6d6d] leading-relaxed mb-8"
              data-editable-path="faq.subtitle"
              data-editable-type="text"
            >
              {data.faq.subtitle}
            </p>

            {/* Prompt Box */}
            <div className="w-full p-6 rounded-2xl bg-white border border-[#e0e7fe] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#0454ff]/10 text-[#0454ff] flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <p
                className="text-sm font-medium text-[#2f2f2f] mb-4 leading-relaxed"
                data-editable-path="faq.contactPrompt"
                data-editable-type="text"
              >
                {data.faq.contactPrompt}
              </p>
              <a
                href={data.faq.contactCta.href}
                className="dentara-btn-primary w-full text-sm py-3 text-center justify-center"
                data-editable-path="faq.contactCta.label"
                data-editable-type="link"
                data-editable-href-path="faq.contactCta.href"
              >
                <span>{data.faq.contactCta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column Accordion */}
          <div className="lg:col-span-7 space-y-4">
            {data.faq.items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 bg-white ${
                    isOpen
                      ? "border-[#0454ff]/40 shadow-sm"
                      : "border-[#e2e8f0] hover:border-[#cbd5e1]"
                  }`}
                >
                  <button
                    type="button"
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 focus:outline-none"
                    onClick={() => toggleFAQ(idx)}
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-base sm:text-lg font-bold font-heading leading-snug ${
                        isOpen ? "text-[#0454ff]" : "text-[#0f0f0f]"
                      }`}
                      data-editable-path={`faq.items.${idx}.question`}
                      data-editable-type="text"
                    >
                      {item.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#0454ff] text-white"
                          : "bg-[#f5f8fb] text-[#2f2f2f]"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[#6d6d6d] text-sm sm:text-base leading-relaxed border-t border-[#f1f5f9]">
                      <p
                        data-editable-path={`faq.items.${idx}.answer`}
                        data-editable-type="text"
                      >
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
