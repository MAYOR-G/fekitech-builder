"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { motion } from 'motion/react';
import { Phone, EnvelopeSimple } from '@phosphor-icons/react';

const Contact = () => {
  return (
    <section id="contact" className="bg-white py-32 border-t border-electric-stone/20 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Text */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-display font-bold text-5xl md:text-6xl text-electric-charcoal tracking-tighter mb-6 leading-[1.1]">
                Request Dispatch
              </h2>
              <p className="text-electric-slate text-lg max-w-md mb-12">
                Our teams are standing by for emergency industrial repair, residential rewiring, and smart home consultations.
              </p>
              
              <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-electric-amber">
                    <Phone size={28} weight="fill" />
                  </div>
                  <div>
                    <span className="block text-electric-stone text-xs font-mono uppercase tracking-widest mb-1">24/7 Operations Center</span>
                    <span className="block text-electric-charcoal text-2xl font-mono font-bold">1-800-VOLT-EDGE</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-electric-amber">
                    <EnvelopeSimple size={28} weight="fill" />
                  </div>
                  <div>
                    <span className="block text-electric-stone text-xs font-mono uppercase tracking-widest mb-1">Engineering Bids</span>
                    <span className="block text-electric-charcoal text-xl font-mono font-bold">bids@voltedge.tech</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-electric-surface p-4 rounded-xl border border-electric-stone/10 max-w-sm">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-electric-stone/20">
                  <TemplateImage 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" 
                    alt="Lead Engineer" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="block text-electric-charcoal font-bold text-sm">Marcus Vance</span>
                  <span className="block text-electric-slate text-xs">Chief Engineering Officer</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Right Form */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-white border border-electric-stone/20 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden"
            >
              {/* Subtle top amber accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-electric-amber"></div>

              <form className="flex flex-col gap-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input type="text" id="name" placeholder=" " className="block w-full bg-transparent border-b-2 border-electric-stone/20 py-3 text-electric-charcoal focus:outline-none focus:border-electric-amber transition-colors peer" />
                    <label htmlFor="name" className="absolute left-0 top-3 text-electric-stone text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electric-amber peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-electric-stone pointer-events-none">
                      Facility / Name
                    </label>
                  </div>
                  <div className="relative group">
                    <input type="tel" id="phone" placeholder=" " className="block w-full bg-transparent border-b-2 border-electric-stone/20 py-3 text-electric-charcoal focus:outline-none focus:border-electric-amber transition-colors peer" />
                    <label htmlFor="phone" className="absolute left-0 top-3 text-electric-stone text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electric-amber peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-electric-stone pointer-events-none">
                      Contact Number
                    </label>
                  </div>
                </div>
                
                <div className="relative group mt-4">
                  <select id="type" className="block w-full bg-transparent border-b-2 border-electric-stone/20 py-3 text-electric-charcoal focus:outline-none focus:border-electric-amber transition-colors appearance-none cursor-pointer peer">
                    <option value="" disabled selected hidden></option>
                    <option>Commercial Infrastructure</option>
                    <option>Residential Rewiring</option>
                    <option>Smart Home Integration</option>
                    <option>Emergency Repair</option>
                  </select>
                  <label htmlFor="type" className="absolute left-0 top-3 text-electric-stone text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electric-amber peer-valid:-top-4 peer-valid:text-xs pointer-events-none">
                    Project Classification
                  </label>
                  <div className="absolute right-0 top-4 text-electric-stone pointer-events-none">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>

                <div className="relative group mt-4">
                  <textarea id="details" placeholder=" " rows={4} className="block w-full bg-transparent border-b-2 border-electric-stone/20 py-3 text-electric-charcoal focus:outline-none focus:border-electric-amber transition-colors resize-none peer"></textarea>
                  <label htmlFor="details" className="absolute left-0 top-3 text-electric-stone text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-electric-amber peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:text-electric-stone pointer-events-none">
                    System Requirements
                  </label>
                </div>

                <button type="button" className="w-full bg-electric-amber text-electric-charcoal py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-electric-charcoal hover:text-white transition-colors mt-6">
                  Initialize Request
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
