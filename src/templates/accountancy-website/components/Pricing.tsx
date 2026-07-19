"use client";
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
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
            Investment
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-forest-900 mb-6"
          >
            Transparent Retainers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-charcoal/70 font-light"
          >
            Fixed monthly fees tailored to your scale. No surprise bills, just consistent value.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Corporate Plan */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 border border-charcoal/5 hover:shadow-2xl transition-shadow duration-500 relative flex flex-col"
          >
            <h3 className="text-2xl font-serif text-forest-900 mb-2">Corporate Growth</h3>
            <p className="text-charcoal/50 text-sm font-light mb-8">For established businesses looking to scale efficiently.</p>
            <div className="text-4xl font-serif text-forest-900 mb-10">From £350<span className="text-sm font-sans text-charcoal/40 font-light">/month</span></div>
            
            <ul className="space-y-4 text-sm text-charcoal/70 font-light mb-12 flex-grow">
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Monthly Bookkeeping & Reconciliations</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Quarterly VAT Returns & Filing</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Comprehensive Annual Accounts</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Director&apos;s Self Assessment</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Quarterly Tax Strategy Review</li>
            </ul>
            <a href="#contact" className="block w-full py-4 border border-forest-900 text-forest-900 text-center text-xs uppercase tracking-widest font-bold hover:bg-forest-900 hover:text-white transition-colors">
              Select Plan
            </a>
          </motion.div>
          
          {/* Advisory Plan */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-forest-900 text-white p-12 shadow-2xl relative flex flex-col"
          >
            <div className="absolute top-0 right-0 p-8">
              <svg className="w-8 h-8 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">Virtual CFO</h3>
            <p className="text-white/60 text-sm font-light mb-8">Complete financial leadership and strategic oversight.</p>
            <div className="text-4xl font-serif text-white mb-10">Custom <span className="text-sm font-sans text-white/40 font-light">Retainer</span></div>
            
            <ul className="space-y-4 text-sm text-white/80 font-light mb-12 flex-grow">
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> <strong>Everything in Corporate Growth</strong></li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Monthly Management Accounts</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Detailed Cash Flow Forecasting</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> Board Meeting Attendance</li>
              <li className="flex gap-4 items-start"><Check className="text-gold-500 w-5 h-5 shrink-0" /> M&A and Fundraising Support</li>
            </ul>
            <a href="#contact" className="block w-full py-4 bg-gold-500 text-forest-900 text-center text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors">
              Request Proposal
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
