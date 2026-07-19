"use client";
import { motion } from 'motion/react';

const stats = [
  { value: "£45M+", label: "Client Wealth Managed" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "£12M", label: "Tax Saved Since 2020" },
  { value: "250+", label: "Corporate Clients" }
];

export default function Results() {
  return (
    <section className="py-24 bg-gold-500 text-forest-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col"
            >
              <div className="font-serif text-5xl md:text-6xl font-bold mb-3">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest font-bold opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
