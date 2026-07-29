import React from "react";
import { useTemplateData } from "../TemplateContext";
import { motion } from "framer-motion";

export default function Philosophy() {
  const { feature, process } = useTemplateData();

  return (
    <section className="gf-philosophy" id="philosophy">
      <div className="gf-wrap">
        <div className="gf-feature">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="gf-feature-copy"
          >
            <span>{feature.note}</span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            <a
              href={feature.buttonHref}
            >
              {feature.buttonLabel}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="gf-feature-image"
          >
            <img 
              src={feature.image} 
              alt={feature.imageAlt} 
            />
          </motion.div>
        </div>

        <div className="gf-process">
          <div className="gf-process-head">
            <h2>{process.title}</h2>
            <p>{process.description}</p>
          </div>

          <div className="gf-process-grid">
            {process.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="gf-step"
              >
                <div>0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
