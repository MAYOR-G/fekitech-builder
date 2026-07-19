"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

const sectors = [
  {
    title: "Technology & Startups",
    desc: "R&D tax credits, EIS structuring, and scalable financial models for high-growth tech ventures.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "Property & Real Estate",
    desc: "Section 24 guidance, SPV incorporations, and capital allowances for property developers and investors.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "E-Commerce & Retail",
    desc: "Multi-channel sales reconciliation, inventory accounting, and international VAT thresholds.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4">Sectors</div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest-900">
              Specialist Industry<br/>Knowledge
            </h2>
          </motion.div>
          <motion.a 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            href="#" 
            className="text-xs uppercase tracking-widest font-bold text-forest-900 hover:text-gold-500 transition-colors pb-2 border-b border-forest-900 hover:border-gold-500"
          >
            View All Sectors
          </motion.a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                <TemplateImage 
                  src={sector.image} 
                  alt={sector.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-forest-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <h3 className="font-serif text-2xl text-forest-900 mb-3 group-hover:text-gold-600 transition-colors">
                {sector.title}
              </h3>
              <p className="text-charcoal/70 font-light text-sm leading-relaxed max-w-sm">
                {sector.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
