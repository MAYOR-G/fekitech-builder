"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';
import { ArrowRight } from '@phosphor-icons/react';

const Services = () => {
  return (
    <section id="infrastructure" className="py-32 bg-white relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-20 max-w-4xl">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-electric-amber mb-6">
            Core Infrastructure
          </h3>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-electric-charcoal tracking-tighter mb-6">
            We don&apos;t just pull wire. We <span className="text-electric-amber">engineer</span> robust, scalable electrical systems designed for heavy loads and intelligent control.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Large Feature Card (Left, 60% width roughly 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 relative rounded-2xl overflow-hidden group cursor-pointer h-[500px] lg:h-auto"
          >
            <div className="absolute inset-0 z-0">
              <TemplateImage 
                src="/images/commercial.png" 
                alt="Commercial Infrastructure" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-electric-charcoal/90 via-electric-charcoal/40 to-transparent"></div>
            </div>
            
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 md:p-12">
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                Commercial Infrastructure
              </h3>
              <p className="text-white/80 font-light text-lg mb-8 max-w-md">
                High-capacity power distribution, custom panel builds, and lighting automation for industrial and retail spaces.
              </p>
              <div className="flex items-center gap-2 text-electric-amber font-bold uppercase tracking-widest text-sm">
                Explore Commercial <ArrowRight size={16} weight="bold" />
              </div>
            </div>
          </motion.div>

          {/* Stacked Cards (Right, 40% width roughly 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-electric-surface rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-electric-amber/5 transition-all duration-300 flex items-center p-4 gap-6"
            >
              <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                <TemplateImage 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                  alt="Residential Systems" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-electric-charcoal mb-2 group-hover:text-electric-amber transition-colors">Residential Systems</h3>
                <p className="text-electric-slate text-sm">Complete home rewiring, EV charging, and backup generator integration.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-electric-surface rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-electric-amber/5 transition-all duration-300 flex items-center p-4 gap-6"
            >
              <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                <TemplateImage 
                  src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=800" 
                  alt="Diagnostic & Repair" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-electric-charcoal mb-2 group-hover:text-electric-amber transition-colors">Diagnostic & Repair</h3>
                <p className="text-electric-slate text-sm">Thermal imaging fault detection and rapid-response hazard resolution.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-electric-surface rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-electric-amber/5 transition-all duration-300 flex items-center p-4 gap-6"
            >
              <div className="w-32 h-32 rounded-xl overflow-hidden shrink-0">
                <TemplateImage 
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800" 
                  alt="Smart Integration" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-electric-charcoal mb-2 group-hover:text-electric-amber transition-colors">Smart Integration</h3>
                <p className="text-electric-slate text-sm">Networked lighting, climate control, and security driven by centralized architecture.</p>
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
