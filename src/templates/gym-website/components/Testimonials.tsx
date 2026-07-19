"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah J.",
    goal: "Strength Building",
    text: "Forge completely changed my perspective on fitness. The coaches actually care about your form and progress, not just making you sweat. I've never felt stronger."
  },
  {
    name: "Michael T.",
    goal: "Weight Management",
    text: "The community here is unmatched. It's the first time in my life I actually look forward to going to the gym. The Unlimited classes keep me accountable."
  },
  {
    name: "Priya R.",
    goal: "Athletic Performance",
    text: "As a former athlete, I was looking for a place that challenged me safely. The programming at Forge is top-tier. Highly recommend the Personal Coaching."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gym-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm text-center">Success Stories</h2>
        <h3 className="text-4xl md:text-5xl font-black font-display uppercase text-center mb-16">Don&apos;t Just Take Our Word</h3>

        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="min-w-[320px] md:min-w-[400px] bg-gym-dark rounded-3xl p-8 snap-center border border-white/5 relative"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
              <div className="mb-6 text-gym-accent font-bold text-sm tracking-wider uppercase">{test.goal}</div>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">&quot;{test.text}&quot;</p>
              <div className="font-display font-bold text-xl">{test.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
