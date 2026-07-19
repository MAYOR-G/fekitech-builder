"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { cn } from "../lib/utils";

import { useTemplateData } from "../TemplateContext";
export function FAQ() {
  const { faqs } = useTemplateData();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white px-5 py-28 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          eyebrow="Common Questions"
          title="Frequently Asked Questions"
          align="center"
          className="mb-16"
        />
        
        <div className="border-t border-oat">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <article 
                key={index} 
                className={cn(
                  "border-b border-oat bg-white transition-all duration-300",
                  isOpen ? "pb-6" : ""
                )}
              >
                <button
                  className="flex w-full items-center justify-between py-6 text-left focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                >
                  <h3 className="pr-8 font-display text-2xl font-medium text-charcoal">
                    {faq.question}
                  </h3>
                  <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-charcoal transition-transform duration-300", isOpen && "rotate-180 text-gold")}>
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>
                <div 
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="max-w-3xl pb-2 text-base leading-[1.8] text-ink sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
