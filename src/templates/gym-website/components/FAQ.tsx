"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Do I need to be fit to start?",
    answer: "Absolutely not. Our programs and coaches are equipped to scale workouts to any fitness level. We all start somewhere, and our goal is to help you progress safely."
  },
  {
    question: "What is the cancellation policy?",
    answer: "We offer flexible month-to-month memberships. You can cancel or pause your membership at any time with a 14-day notice before your next billing cycle."
  },
  {
    question: "Are nutrition plans included?",
    answer: "Basic nutritional guidance is included in our classes. For customized meal plans and macro tracking, we recommend our Personal Coaching membership."
  },
  {
    question: "How big are the group classes?",
    answer: "To ensure quality coaching and adequate space, our classes are capped at 15 members. This allows the coach to provide individual attention to everyone."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gym-darker">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Common Questions</h2>
          <h3 className="text-4xl md:text-5xl font-black font-display uppercase">FAQ</h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border border-white/10 rounded-2xl overflow-hidden bg-gym-charcoal transition-colors hover:border-white/20"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-bold text-lg">{faq.question}</span>
                {openIndex === idx ? (
                  <Minus className="w-5 h-5 text-gym-accent shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
