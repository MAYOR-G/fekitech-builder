"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Gallery() {
  const data = useTemplateData();

  return (
    <section className="fp-gallery">
      <div className="fp-gallery-inner">
        <h2 className="fp-section-title">
          {data.gallery.title}{" "}
          <span className="fp-accent">{data.gallery.subtitle}</span>
        </h2>
        <div className="fp-gallery-grid">
          {data.gallery.images.map((src, i) => (
            <div key={i} className="fp-gallery-item">
              <img
                src={src}
                alt={`Happy pet ${i + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
