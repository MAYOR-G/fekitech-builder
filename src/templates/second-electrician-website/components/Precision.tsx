"use client";
import { motion } from 'motion/react';
import { Warning, CheckCircle } from '@phosphor-icons/react';

const Precision = () => {
  return (
    <section id="precision" className="py-24 md:py-32 bg-electric-charcoal overflow-hidden relative">
      
      {/* Background Graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-electric-amber mb-6">
            Clinical Safety Protocol
          </h3>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tighter mb-6">
            Zero-Tolerance <span className="text-electric-amber">Standard</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto font-light text-lg">
            In electrical engineering, there is no margin for error. We adhere to strict diagnostic and installation protocols to eliminate catastrophic hazards before they manifest.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
          
          {/* Risk Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2 bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-2xl relative"
          >
            <div className="flex items-center gap-3 mb-10">
              <Warning size={24} className="text-red-500" weight="fill" />
              <h3 className="font-mono text-red-400 font-bold uppercase tracking-widest text-sm">Critical Hazards</h3>
            </div>
            
            <ul className="space-y-8">
              {[
                { title: "Overloaded Circuits", desc: "Outdated panels struggling with modern appliance loads, risking thermal runaway." },
                { title: "Improper Grounding", desc: "Code violations leaving sensitive electronics and human occupants vulnerable to surges." },
                { title: "Degraded Insulation", desc: "Aging wiring causing arc faults—the leading cause of electrical fires." }
              ].map((item, i) => (
                <li key={i} className="pl-6 relative">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <div className="absolute left-[3px] top-[14px] bottom-[-20px] w-px bg-slate-800 last:bg-transparent"></div>
                  <h4 className="text-white font-bold mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Precision Column */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2 bg-electric-amber p-8 md:p-12 rounded-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-3 mb-10 relative z-10">
              <CheckCircle size={24} className="text-electric-charcoal" weight="fill" />
              <h3 className="font-mono text-electric-charcoal font-bold uppercase tracking-widest text-sm">The VoltEdge Standard</h3>
            </div>
            
            <ul className="space-y-8 relative z-10">
              {[
                { title: "Thermal Imaging Scans", desc: "Identifying invisible hotspots in panels before they result in component failure." },
                { title: "Load Calculation", desc: "Engineering exact power distribution maps to guarantee stable, continuous operation." },
                { title: "Code Compliance Plus", desc: "We don't just meet the National Electrical Code; we exceed it for future-proof reliability." }
              ].map((item, i) => (
                <li key={i} className="pl-6 relative">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-electric-charcoal"></div>
                  <div className="absolute left-[3px] top-[14px] bottom-[-20px] w-px bg-black/10 last:bg-transparent"></div>
                  <h4 className="text-electric-charcoal font-bold mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-electric-charcoal/80 text-sm leading-relaxed">{item.desc}</p>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Precision;
