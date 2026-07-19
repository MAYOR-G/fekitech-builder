"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    category: 'Market Update',
    title: 'London Property Market Outlook Q4',
    excerpt: 'An analysis of prime central London property trends, showing sustained demand from international buyers.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    date: 'Oct 12, 2026'
  },
  {
    category: 'Investment',
    title: 'Top High-Yield Areas for 2027',
    excerpt: 'Discover the emerging London neighbourhoods offering the best rental yields and capital appreciation potential.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    date: 'Oct 05, 2026'
  },
  {
    category: 'Lifestyle',
    title: 'The Rise of Turnkey Properties',
    excerpt: 'Why buyers are increasingly paying a premium for fully renovated, design-led homes ready for immediate occupation.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    date: 'Sep 28, 2026'
  }
];

export default function Insights() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-4 block">
              Market Intelligence
            </span>
            <h2 className="font-serif text-[36px] md:text-[48px] text-charcoal leading-[1.15]">
              Insights & Advice.
            </h2>
          </motion.div>
          
          <motion.a 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#" 
            className="inline-flex items-center text-[13px] uppercase tracking-widest text-charcoal font-medium hover:text-gold transition-colors pb-2 border-b border-charcoal hover:border-gold"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-none mb-6 bg-ivory">
                <TemplateImage 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[12px] uppercase tracking-wider text-gold font-medium">
                  {article.category}
                </span>
                <span className="text-[12px] text-gray-500">
                  {article.date}
                </span>
              </div>
              <h3 className="font-serif text-[22px] text-charcoal mb-3 group-hover:text-gold transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-[15px] text-charcoal/70 leading-[1.6]">
                {article.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
