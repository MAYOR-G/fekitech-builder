"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";

export function FAQ() {
  const data = useTemplateData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="fp-faq" id="faq">
      <div className="fp-faq-inner">
        <h2 className="fp-section-title">{data.faq.sectionTitle}</h2>
        {data.faq.items.map((item, i) => (
          <div key={i} className="fp-faq-item">
            <button className="fp-faq-question" onClick={() => toggle(i)}>
              <span>{item.question}</span>
              <span className="fp-faq-toggle" style={{
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0)",
              }}>+</span>
            </button>
            <div className={`fp-faq-answer ${openIndex === i ? "fp-open" : ""}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
