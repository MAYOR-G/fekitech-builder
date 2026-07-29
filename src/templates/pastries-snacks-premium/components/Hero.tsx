import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { hero } = useTemplateData();

  return (
    <section className="gf-hero" id="top">
      <div className="gf-hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="gf-hero-copy"
        >
          <div className="gf-kicker">{hero.note}</div>
          <h1>{hero.title}</h1>
          <p>{hero.description}</p>
          
          <div className="gf-hero-actions">
            <a href={hero.primaryHref}>
              {hero.primaryLabel}
            </a>
            {hero.secondaryLabel && (
              <a href={hero.secondaryHref}>
                {hero.secondaryLabel}
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="gf-hero-media"
        >
          <img
            src={hero.image}
            alt={hero.imageAlt}
          />
          <div className="gf-badge">
            <span>{hero.badge}</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
