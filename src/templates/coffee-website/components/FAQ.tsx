"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useTemplateData } from '../TemplateContext';


const FAQ = () => {
  const siteContent = useTemplateData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-coffee-cream">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            className="font-serif text-3xl md:text-4xl text-coffee-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {siteContent.faq.map((item, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                className="border-b border-coffee-brown/20 pb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button 
                  className="flex justify-between items-center w-full text-left py-4 focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <h3 className={`font-sans text-lg transition-colors ${isOpen ? 'text-coffee-terracotta' : 'text-coffee-dark'}`}>
                    {item.question}
                  </h3>
                  <div className="text-coffee-dark shrink-0 ml-4">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-light text-coffee-dark/80 pb-6 pt-2 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
