"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function CTABanner() {
  const data = useTemplateData();

  return (
    <section className="fp-cta-banner" id="contact">
      <div className="fp-cta-banner-inner">
        <h2>{data.ctaBanner.title}</h2>
        <p>{data.ctaBanner.description}</p>
        <div>
          <a href={data.ctaBanner.primaryCta.href} className="fp-btn-white">
            {data.ctaBanner.primaryCta.label}
          </a>
          <a href={data.ctaBanner.secondaryCta.href} className="fp-btn-outline-white">
            {data.ctaBanner.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
