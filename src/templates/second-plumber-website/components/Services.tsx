"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#F2F2EE] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-plumber-charcoal leading-tight mb-6">
              Infrastructure <br/><span className="text-plumber-copper">Solutions.</span>
            </h2>
            <p className="text-plumber-slate text-lg max-w-[45ch]">
              We deploy advanced diagnostics and precision engineering to resolve complex water system failures before they escalate.
            </p>
          </div>
          <button className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-plumber-charcoal hover:text-plumber-copper transition-colors group">
            View All Services
            <span className="w-8 h-[1px] bg-currentColor group-hover:w-12 transition-all duration-300"></span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Feature - Left 60% */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[60%] h-[500px] lg:h-[700px] group relative overflow-hidden bg-plumber-charcoal"
          >
            <TemplateImage 
              src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&q=80&w=1200" 
              alt="Thermal imaging diagnostics" 
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-plumber-charcoal/90 via-plumber-charcoal/20 to-transparent"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-mono text-plumber-copper text-sm mb-4 block">01 / DIAGNOSTICS</span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Acoustic Leak Detection</h3>
                  <p className="text-white/70 max-w-md text-balance">
                    Non-invasive thermal and acoustic imaging locates sub-surface water egress with pinpoint accuracy, eliminating destructive exploratory work.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-plumber-copper group-hover:border-plumber-copper transition-colors duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - 40% */}
          <div className="w-full lg:w-[40%] flex flex-col gap-6 h-[700px]">
            
            {/* Top Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 group relative overflow-hidden bg-plumber-slate"
            >
              <TemplateImage 
                src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=800" 
                alt="High pressure hydro-jetting" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plumber-charcoal/90 via-transparent to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="font-mono text-plumber-copper text-xs mb-3 block">02 / CLEARING</span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Hydro-Jet Infrastructure Clearing</h3>
                <p className="text-white/70 text-sm line-clamp-2">4,000 PSI commercial-grade water jetting to restore main line flow capacity and descale cast iron systems.</p>
              </div>
            </motion.div>

            {/* Bottom Card */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 group relative overflow-hidden bg-plumber-charcoal"
            >
              <TemplateImage 
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=800" 
                alt="Architectural bathroom installation" 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-plumber-charcoal/90 via-transparent to-transparent"></div>
              
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="font-mono text-plumber-copper text-xs mb-3 block">03 / INSTALLATION</span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Architectural Fixture Install</h3>
                <p className="text-white/70 text-sm line-clamp-2">Precision rough-in and finish work for luxury residential and high-traffic commercial environments.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
