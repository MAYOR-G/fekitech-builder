"use client";
import { Plus } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";

const faqs = [
  {
    question: "How far in advance should I order?",
    answer: "For wedding cakes, we recommend booking 4-6 months in advance. For celebration cakes and dessert boxes, a minimum of 2 weeks is requested, though we can occasionally accommodate shorter notice depending on studio capacity."
  },
  {
    question: "Do you offer tasting boxes?",
    answer: "Yes, we offer curated tasting boxes for wedding and large event clients. These include our signature sponge and buttercream pairings, allowing you to select your menu at home before finalizing the design."
  },
  {
    question: "Can you accommodate dietary requirements?",
    answer: "We offer selected gluten-free and vegan options. However, please note that all our cakes are baked in a studio that handles nuts, dairy, and gluten, so we cannot guarantee a completely allergen-free environment."
  },
  {
    question: "How does delivery work?",
    answer: "We provide careful, climate-controlled delivery and setup for all wedding cakes and large tier cakes. Celebration cakes and dessert boxes can be collected from our studio or delivered via courier within our standard radius."
  }
];

export function FAQ() {
  return (
    <section className="bg-white px-5 py-24 lg:px-8 border-t border-chocolate/5">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <SectionHeader
            eyebrow="Common Questions"
            title="Details & Logistics."
            description="Clear answers regarding our ordering timeline, tastings, and delivery."
            align="center"
          />
        </Reveal>
        
        <div className="mt-16 space-y-2">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 50}>
              <details className="group border-b border-chocolate/10 bg-white">
                <summary className="flex cursor-pointer items-center justify-between py-6 px-4 font-display text-xl text-ganache marker:content-none hover:bg-[#FFFBF7] transition-colors">
                  <span className="pr-6">{faq.question}</span>
                  <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-chantilly text-rose transition-transform duration-300 group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <div className="overflow-hidden bg-white/20 px-4 pb-6 pt-0 transition-all">
                  <p className="text-[0.95rem] leading-[1.8] tracking-wide text-[#2D2D2D]">
                    {faq.answer}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
