"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Services() {
  const data = useTemplateData();

  return (
    <section className="fp-services" id="services">
      <div className="fp-services-inner">
        <h2 className="fp-section-title">
          {data.services.title}
        </h2>
        <p className="fp-section-subtitle">{data.services.subtitle}</p>
        <div className="fp-services-grid">
          {data.services.items.map((item, i) => (
            <div key={i} className="fp-service-card">
              <div className="fp-service-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
