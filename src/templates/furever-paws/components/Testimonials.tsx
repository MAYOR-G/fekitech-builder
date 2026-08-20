"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Testimonials() {
  const data = useTemplateData();

  return (
    <section className="fp-testimonials" id="reviews">
      <div className="fp-testimonials-inner">
        <h2 className="fp-section-title">
          {data.testimonials.title}{" "}
          <span className="fp-accent">{data.testimonials.titleAccent}</span>
        </h2>
        <div className="fp-testimonials-grid">
          {data.testimonials.items.map((item, i) => (
            <div key={i} className="fp-testimonial-card">
              <div className="fp-stars">
                {"★".repeat(item.rating)}
              </div>
              <p>&ldquo;{item.text}&rdquo;</p>
              <div className="fp-testimonial-author">
                <img
                  src={item.image}
                  alt={item.name}
                  className="fp-testimonial-avatar"
                  loading="lazy"
                />
                <span className="fp-testimonial-name">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
