"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Hero() {
  const data = useTemplateData();

  return (
    <section className="fp-hero">
      <div className="fp-hero-inner">
        <p className="fp-hero-tagline">{data.hero.tagline}</p>
        <h1 className="fp-hero-title">
          <span className="fp-accent">{data.hero.title}</span>
        </h1>
        <p className="fp-hero-desc">{data.hero.description}</p>
        <div className="fp-hero-buttons">
          <a href={data.hero.primaryCta.href} className="fp-btn-primary">
            {data.hero.primaryCta.label}
          </a>
          <a href={data.hero.secondaryCta.href} className="fp-btn-secondary">
            {data.hero.secondaryCta.label}
          </a>
        </div>
      </div>
      <div className="fp-hero-image">
        <img
          src={data.hero.image}
          alt="Happy dogs at Furever Paws"
          loading="eager"
        />
      </div>
    </section>
  );
}
