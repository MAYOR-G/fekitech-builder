"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Welcome() {
  const data = useTemplateData();

  return (
    <section className="fp-welcome" id="about">
      <div className="fp-welcome-inner">
        <div className="fp-welcome-images">
          <div className="fp-welcome-img">
            <img src={data.welcome.image1} alt="Pet wellness care" loading="lazy" />
          </div>
          <div className="fp-welcome-img">
            <img src={data.welcome.image2} alt="Pet enrichment play" loading="lazy" />
          </div>
        </div>
        <div className="fp-welcome-content">
          <h2>
            {data.welcome.title}{" "}
            <span className="fp-accent">{data.welcome.titleAccent}</span>
          </h2>
          <p>{data.welcome.description}</p>
          <div className="fp-feature-list">
            {data.welcome.features.map((feat, i) => (
              <div key={i} className="fp-feature-item">
                <div className="fp-feature-icon">✓</div>
                <div>
                  <h4>{feat.title}</h4>
                  <p>{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
