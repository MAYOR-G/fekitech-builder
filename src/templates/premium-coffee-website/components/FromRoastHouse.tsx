"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function FromRoastHouse() {
  const benefits = [
    "Roasted to order for maximum freshness",
    "Ethically sourced from direct-trade partners",
    "Carbon-neutral shipping",
    "Customizable delivery schedule"
  ];

  return (
    <section className="py-32 px-6 bg-brand-cream text-brand-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <TemplateImage src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=1000" alt="Coffee Delivery" className="w-full aspect-[4/5] object-cover" />
        </motion.div>
        
        <div className="w-full md:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl mb-8 leading-none"
          >
            FROM ROAST HOUSE TO YOUR HOUSE
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-80 mb-10"
          >
            Subscribe to our weekly or monthly deliveries and never run out of fresh coffee again.
          </motion.p>
          
          <ul className="space-y-4 mb-12">
            {benefits.map((benefit, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
                className="flex items-center gap-4 text-lg"
              >
                <div className="bg-brand-accent p-1 rounded-full text-white">
                  <Check size={16} />
                </div>
                {benefit}
              </motion.li>
            ))}
          </ul>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-brand-black text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-brand-accent transition-colors"
          >
            Explore Subscriptions
          </motion.button>
        </div>
      </div>
    </section>
  );
}