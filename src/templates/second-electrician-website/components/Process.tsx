"use client";
import { motion } from 'motion/react';

const steps = [
  { num: "01", title: "Diagnostic Audit", desc: "Comprehensive load testing and thermal imaging of existing infrastructure." },
  { num: "02", title: "System Engineering", desc: "Designing load-balanced circuits and specifying industrial-grade components." },
  { num: "03", title: "Execution", desc: "Precision installation with strict adherence to the National Electrical Code." },
  { num: "04", title: "Certification", desc: "Final load tests, municipal inspections, and system handover." }
];

const Process = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-2xl">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-electric-amber mb-6">
              Deployment Protocol
            </h3>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-electric-charcoal tracking-tighter mb-6">
              A systematic approach to power infrastructure.
            </h2>
            <p className="text-electric-slate font-light text-lg">
              No guesswork, just engineered solutions executed with military precision.
            </p>
          </div>
        </div>

        <div className="relative pt-12">
          {/* Horizontal Line connecting steps (Desktop) */}
          <div className="hidden md:block absolute top-[72px] left-0 w-full h-[2px] bg-electric-surface"></div>
          
          {/* SVG Animated Stroke */}
          <svg className="hidden md:block absolute top-[72px] left-0 w-full h-[2px] overflow-visible z-0" preserveAspectRatio="none">
            <motion.line 
              x1="0" y1="0" x2="100%" y2="0" 
              stroke="#F59E0B" /* electric-amber */
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative"
              >
                {/* Node */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-electric-amber flex items-center justify-center font-mono text-electric-charcoal font-bold text-sm mb-8 z-10 relative shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  {step.num}
                </div>
                
                <h3 className="font-display font-bold text-2xl text-electric-charcoal tracking-tight mb-4">
                  {step.title}
                </h3>
                <p className="text-electric-slate text-sm leading-relaxed pr-4">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
