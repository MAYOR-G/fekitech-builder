import React, { useState } from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';

export default function Team() {
  const data = useTemplateData();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white" id="team">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)] max-w-2xl"
          >
            {data.team.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Accordion list */}
          <div className="space-y-4">
            {data.team.items.map((member: any, index: number) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button 
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex justify-between items-center py-4 text-left focus:outline-none group"
                >
                  <span className={`text-2xl font-bold font-serif transition-colors ${
                    expandedIndex === index ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)] group-hover:text-[var(--color-primary)]'
                  }`}>
                    {member.name}
                  </span>
                  <span className={`transition-transform duration-300 ${
                    expandedIndex === index ? 'text-[var(--color-primary)] rotate-180' : 'text-gray-400'
                  }`}>
                    {expandedIndex === index ? <Minus size={24} /> : <Plus size={24} />}
                  </span>
                </button>
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-500 font-medium pb-4">{member.role}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Testimonial Block */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-accent)] p-12 relative flex flex-col justify-center"
          >
            <div className="flex text-[var(--color-primary)] mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <p className="text-2xl font-serif italic text-[var(--color-secondary)] leading-relaxed mb-8">
              "{data.team.testimonial.quote}"
            </p>
            <div className="flex items-center">
              <img 
                src={data.team.testimonial.image} 
                alt={data.team.testimonial.author} 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-bold text-[var(--color-secondary)] text-lg">{data.team.testimonial.author}</h4>
                <p className="text-sm text-gray-500">{data.team.testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
