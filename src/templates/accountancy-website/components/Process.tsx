"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

const steps = [
  {
    num: "01",
    title: "Deep Financial Audit",
    subtitle: "Discover",
    desc: "We review your current setup, identify immediate tax inefficiencies, and map out a strategic blueprint for your financial goals.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "02",
    title: "Digital Migration",
    subtitle: "Streamline",
    desc: "Migration to modern cloud software, automating your bookkeeping and payroll entirely for flawless, real-time visibility.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    num: "03",
    title: "Ongoing Advisory",
    subtitle: "Support",
    desc: "Continuous proactive advice, board attendance, and real-time dashboard monitoring to keep your business scaling securely.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Process() {
  return (
    <section className="py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold-600 text-xs uppercase tracking-widest font-bold mb-4"
          >
            The Process
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-forest-900 mb-6"
          >
            Precision at <br/>Every Step
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 font-light"
          >
            A seamless onboarding process designed to bring total clarity to your finances without disrupting operations.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="flex flex-col bg-white border border-charcoal/5 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <TemplateImage 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-gold-500 font-serif text-4xl">{step.num}.</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-forest-900 pt-1">{step.subtitle}</span>
                </div>
                <h3 className="text-2xl font-serif text-forest-900 mb-4">{step.title}</h3>
                <p className="text-charcoal/70 font-light text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
