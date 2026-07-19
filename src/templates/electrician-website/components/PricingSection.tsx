"use client";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function PricingSection() {
  const { pricingPlans } = useTemplateData();

  return (
    <section id="pricing" className="bg-mist px-5 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Clear Pricing"
          title="No surprises. Just honest, upfront estimates."
          description="Electrical safety shouldn't involve hidden fees. We provide clear pricing structures before any tools come out of the van."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-lg gap-8 lg:max-w-none lg:grid-cols-3">
          {pricingPlans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`flex flex-col justify-between rounded-3xl p-8 ring-1 transition-all hover:shadow-xl ${
                plan.highlighted
                  ? "bg-navy text-white ring-navy shadow-deep transform lg:-translate-y-4"
                  : "bg-white text-navy ring-slate-200 shadow-card"
              }`}
            >
              <div>
                <h3 className={`font-display text-xl font-bold ${plan.highlighted ? "text-cyan" : "text-navy"}`}>
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline text-4xl font-extrabold tracking-tight">
                  {plan.price}
                </div>
                <p className={`mt-4 text-sm leading-6 ${plan.highlighted ? "text-slate-300" : "text-slate-600"}`}>
                  {plan.description}
                </p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 ${plan.highlighted ? "text-amber" : "text-cobalt"}`} />
                      <span className={plan.highlighted ? "text-white" : "text-slate-700"}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <ButtonLink 
                  href="#contact" 
                  variant={plan.highlighted ? "yellow" : "secondary"} 
                  className="w-full justify-center"
                >
                  Request service
                </ButtonLink>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
