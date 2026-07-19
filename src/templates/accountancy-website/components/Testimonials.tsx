"use client";
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Ledger & Co transformed our financial operations. Their proactive tax strategy alone saved us six figures in our first year of partnership.",
    author: "Marcus Sterling",
    title: "CEO, Sterling Tech Ventures"
  },
  {
    quote: "More than just accountants, they act as our external CFO. The clarity they brought to our cash flow forecasting has been invaluable for our expansion.",
    author: "Sarah Jenkins",
    title: "Founder, Luxe Retail Group"
  }
];

export default function Testimonials() {
  return (
    <section className="py-32 bg-forest-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="md:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-gold-500 text-xs uppercase tracking-widest font-bold mb-4">Client Success</div>
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Trusted by <br/>Industry Leaders</h2>
              <p className="text-white/70 font-light leading-relaxed">
                Our commitment to proactive advisory and precise execution has built lasting partnerships with some of the UK&apos;s most ambitious companies.
              </p>
            </motion.div>
          </div>

          <div className="md:w-2/3 grid md:grid-cols-2 gap-8">
            {testimonials.map((test, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-forest-800 p-10 relative"
              >
                <Quote className="text-gold-500 w-8 h-8 mb-6 opacity-50" />
                <p className="text-lg font-serif italic text-white/90 mb-8 leading-relaxed">
                  &quot;{test.quote}&quot;
                </p>
                <div>
                  <h4 className="font-bold text-white tracking-wide">{test.author}</h4>
                  <p className="text-gold-500 text-xs uppercase tracking-widest mt-1">{test.title}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
