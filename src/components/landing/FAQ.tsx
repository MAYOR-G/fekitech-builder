"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const faqs = [
  { q: "What can I do on the free plan?", a: "You can create and preview one draft website. Publishing and image uploads require a publishing plan." },
  { q: "Do I need coding skills?", a: "No. The editor exposes the text, images, colors, and structured content that each template allows you to change." },
  { q: "Can I use my own domain name?", a: "Growth and Custom plans can connect a domain they already own after completing DNS ownership verification." },
  { q: "How do templates work?", a: "Choose a design that fits your business, preview it, then customize the text, images, pages, and colors before publishing." },
  { q: "Can I restore an earlier draft?", a: "Yes. Version limits depend on your plan, and restoring a version updates the draft without changing the currently published snapshot." },
  { q: "Are real payments active?", a: "No. Checkout is intentionally inactive during platform testing. Authorized test administrators can exercise plan limits without creating payment records." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 bg-white px-6">
      <div className="max-w-[720px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
          className="text-[clamp(36px,5vw,56px)] font-bold text-ft-ink tracking-[-0.01em] leading-[1.15] text-center mb-16"
        >
          Frequently asked questions
        </motion.h2>

        <div className="flex flex-col divide-y divide-ft-border-light">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: i * 0.03, ease }}
                className="relative"
              >
                {/* Gradient left border when active */}
                {isOpen && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                    style={{ background: "var(--gradient-brand)" }}
                  />
                )}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full text-left py-7 flex items-center justify-between gap-4 transition-colors ${
                    isOpen ? "pl-6" : "pl-0"
                  }`}
                >
                  <span
                    className={`font-semibold text-lg ${
                      isOpen ? "text-ft-primary" : "text-ft-ink"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-ft-primary" : "text-ft-muted"
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="min-h-0">
                    <p
                      className={`text-ft-body text-base leading-relaxed pb-7 ${
                        isOpen ? "pl-6" : "pl-0"
                      }`}
                    >
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
