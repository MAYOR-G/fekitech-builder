"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Open Gym",
    price: "$89",
    period: "/mo",
    desc: "Full access to our state-of-the-art facility during operating hours.",
    features: [
      "Access to all equipment",
      "Locker room & showers",
      "1 Goal setting session",
      "Free WiFi"
    ],
    recommended: false
  },
  {
    name: "Unlimited Classes",
    price: "$149",
    period: "/mo",
    desc: "Perfect for those who thrive in a structured, high-energy environment.",
    features: [
      "Everything in Open Gym",
      "Unlimited group classes",
      "Priority class booking",
      "Monthly body composition scan",
      "10% off merchandise"
    ],
    recommended: true
  },
  {
    name: "Personal Coaching",
    price: "$399",
    period: "/mo",
    desc: "The ultimate package for guaranteed progress and accountability.",
    features: [
      "Everything in Unlimited",
      "4 Personal training sessions/mo",
      "Custom nutrition guidelines",
      "Direct messaging with coach",
      "Quarterly strategy review"
    ],
    recommended: false
  }
];

const Pricing = () => {
  return (
    <section className="py-24 bg-gym-charcoal relative z-30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Memberships</h2>
          <h3 className="text-4xl md:text-5xl font-black font-display uppercase">Invest In Your Health</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-3xl p-8 border ${plan.recommended ? 'bg-gym-darker border-gym-accent' : 'bg-gym-dark border-white/10'} flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gym-accent text-gym-darker font-bold uppercase tracking-wider text-xs px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <h4 className="text-2xl font-black font-display uppercase mb-2">{plan.name}</h4>
              <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
              
              <div className="mb-8 flex items-baseline gap-1">
                <span className="text-5xl font-black font-display">{plan.price}</span>
                <span className="text-gray-400 font-medium">{plan.period}</span>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className={`w-5 h-5 shrink-0 ${plan.recommended ? 'text-gym-accent' : 'text-gray-500'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-colors ${plan.recommended ? 'bg-gym-accent text-gym-darker hover:bg-gym-accentHover' : 'bg-white/5 text-white hover:bg-white/10'}`}>
                Select Plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
