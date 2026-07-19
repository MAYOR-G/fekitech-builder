"use client";
import { motion } from "motion/react";
import clsx from "clsx";

const tiers = [
  {
    name: "Essential",
    price: "£95",
    description: "For a quick reset of body and mind.",
    features: [
      "60-Minute Custom Massage",
      "Aromatherapy Enhancement",
      "Access to Relaxation Lounge",
      "Herbal Tea Selection"
    ],
    highlight: false,
  },
  {
    name: "Renewal",
    price: "£165",
    description: "Our signature holistic treatment experience.",
    features: [
      "90-Minute Signature Massage",
      "Mini Botanical Facial",
      "Full Access to Thermal Suites",
      "Guided Meditation Audio",
      "Complimentary Spa Gift"
    ],
    highlight: true,
  },
  {
    name: "Sanctuary",
    price: "£280",
    description: "The ultimate half-day wellness journey.",
    features: [
      "120-Minute Ritual Massage",
      "Full Botanical Facial",
      "Private Suite Access",
      "Nutritious Organic Lunch",
      "Take-Home Skincare Set"
    ],
    highlight: false,
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-brand-white py-32 md:py-48 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-brand-sage text-[13px] uppercase tracking-[0.12em] font-medium mb-6"
          >
            Invest in Yourself
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="font-serif text-[40px] md:text-[56px] text-brand-charcoal leading-[1.1] tracking-[-0.01em]"
          >
            Simple, Transparent Pricing.
          </motion.h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className={clsx(
                "relative flex flex-col p-8 md:p-10 border transition-all duration-300 group",
                tier.highlight 
                  ? "bg-brand-forest border-brand-forest text-white md:-my-4 shadow-xl" 
                  : "bg-transparent border-brand-stone hover:border-brand-sage/50"
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-sand text-brand-charcoal px-4 py-1 rounded-full text-[10px] uppercase tracking-widest font-medium">
                  Most Popular
                </div>
              )}
              
              <h3 className={clsx(
                "font-serif text-[28px] mb-2",
                tier.highlight ? "text-white" : "text-brand-charcoal"
              )}>
                {tier.name}
              </h3>
              
              <div className="flex items-baseline gap-1 mb-4">
                <span className={clsx(
                  "font-serif text-[48px] leading-none",
                  tier.highlight ? "text-white" : "text-brand-charcoal"
                )}>
                  {tier.price}
                </span>
                <span className={clsx(
                  "font-sans text-[13px] tracking-wide",
                  tier.highlight ? "text-white/70" : "text-brand-charcoal/60"
                )}>
                  / person
                </span>
              </div>
              
              <p className={clsx(
                "font-sans text-[14px] leading-[1.6] mb-8 pb-8 border-b",
                tier.highlight ? "text-white/80 border-white/20" : "text-brand-charcoal/80 border-brand-stone"
              )}>
                {tier.description}
              </p>
              
              <ul className="flex flex-col gap-4 flex-grow mb-10">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className={clsx("w-5 h-5 flex-shrink-0 mt-0.5", tier.highlight ? "text-brand-sand" : "text-brand-sage")} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={clsx(
                      "font-sans text-[14px] leading-[1.5]",
                      tier.highlight ? "text-white/90" : "text-brand-charcoal/90"
                    )}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a
                href="#book"
                className={clsx(
                  "w-full py-4 text-center text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300 rounded-sm mt-auto",
                  tier.highlight
                    ? "bg-brand-sand text-brand-charcoal hover:bg-white"
                    : "bg-transparent border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white"
                )}
              >
                Select {tier.name}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
