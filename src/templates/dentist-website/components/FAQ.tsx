"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function FAQ() {
  const { faqs } = useTemplateData();

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-porcelain px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Questions patients usually ask before booking."
            description="Use this section for practical clinic policy, expectations, and treatment planning answers."
          />
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            const contentId = `faq-panel-${index}`;
            return (
              <Reveal key={item.question} delay={index * 60}>
                <article className="rounded-[1.25rem] border border-ink/8 bg-white shadow-card">
                  <button
                    type="button"
                    className="flex min-h-16 w-full items-center justify-between gap-5 px-5 py-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-ocean/18 sm:px-6"
                    onClick={() => setOpenIndex(open ? -1 : index)}
                    aria-expanded={open}
                    aria-controls={contentId}
                  >
                    <span className="font-display text-2xl font-semibold leading-tight text-ink">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-ocean transition-transform duration-300",
                        open && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  <div
                    id={contentId}
                    className={cn(
                      "grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out",
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="min-h-0">
                      <p className="px-5 pb-5 text-base leading-8 text-graphite/70 sm:px-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
