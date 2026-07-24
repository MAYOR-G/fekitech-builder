import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';

export default function Pricing() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)] max-w-2xl mx-auto"
          >
            {data.pricing.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {data.pricing.plans.map((plan: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`p-10 ${plan.isPopular ? 'bg-[var(--color-primary)] text-white shadow-2xl transform md:-translate-y-4' : 'bg-[var(--color-accent)] text-[var(--color-secondary)]'}`}
            >
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={plan.isPopular ? 'text-white/80 mb-8' : 'text-gray-500 mb-8'}>{plan.description}</p>
              
              <div className="text-5xl font-bold font-serif mb-8">
                {plan.price}<span className="text-lg font-normal text-opacity-70">/M</span>
              </div>

              <ul className="space-y-4 mb-10 text-sm">
                {plan.features.map((feature: string, fIndex: number) => (
                  <li key={fIndex} className="flex items-start">
                    <span className="mr-3 mt-1 text-lg leading-none">+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 font-bold uppercase tracking-wider transition-colors ${
                plan.isPopular 
                  ? 'bg-white text-[var(--color-primary)] hover:bg-gray-100' 
                  : 'bg-white text-[var(--color-secondary)] border border-gray-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
              }`}>
                Buy Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
