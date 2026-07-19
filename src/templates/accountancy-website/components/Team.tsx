"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

const team = [
  {
    name: "James Ledger, FCA",
    role: "Managing Partner",
    desc: "Former Big-4 Director with 20+ years of experience in corporate restructuring and M&A tax strategy.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Eleanor Vance, CTA",
    role: "Head of Tax Advisory",
    desc: "Specialist in private wealth preservation, estate planning, and international tax structuring.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "David Chen, ACCA",
    role: "Director of Cloud Accounting",
    desc: "Leading our digital transformation team, ensuring seamless integrations and real-time financial reporting.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

export default function Team() {
  return (
    <section id="firm" className="py-32 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4"
          >
            The Firm
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-forest-900 mb-6"
          >
            Leadership & Expertise
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 font-light"
          >
            A dedicated team of chartered accountants and tax advisors committed to your financial success.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group text-center"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                <TemplateImage 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
              <h3 className="font-serif text-2xl text-forest-900 mb-1">{member.name}</h3>
              <p className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4">{member.role}</p>
              <p className="text-charcoal/70 font-light text-sm leading-relaxed max-w-xs mx-auto">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
