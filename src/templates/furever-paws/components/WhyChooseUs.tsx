"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function WhyChooseUs() {
  const data = useTemplateData();

  return (
    <section className="fp-why" id="about">
      <div className="fp-why-inner">
        <h2 className="fp-section-title">
          Why <span className="fp-paw">🐾</span> Choose Us
        </h2>
        <div className="fp-why-grid">
          {data.whyChooseUs.items.map((item, i) => (
            <div key={i} className="fp-why-card">
              <img
                src={item.image}
                alt={item.title}
                className="fp-why-card-image"
                loading="lazy"
              />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
