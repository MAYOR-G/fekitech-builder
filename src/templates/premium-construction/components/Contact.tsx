import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const data = useTemplateData();

  return (
    <section className="py-24 bg-[var(--color-accent)] relative" id="contact">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-secondary)] mb-10">
            {data.contact.title}
          </h2>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm mr-6 shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Our Location</h4>
                <p className="text-gray-500 leading-relaxed whitespace-pre-line">{data.contact.address}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm mr-6 shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Phone Number</h4>
                <p className="text-gray-500 leading-relaxed">{data.contact.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm mr-6 shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Email Address</h4>
                <p className="text-gray-500 leading-relaxed">{data.contact.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-white flex items-center justify-center text-[var(--color-primary)] shadow-sm mr-6 shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[var(--color-secondary)] mb-1">Working Hours</h4>
                <p className="text-gray-500 leading-relaxed whitespace-pre-line">{data.contact.hours}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 md:p-12 shadow-xl"
        >
          <h3 className="text-2xl font-serif font-bold text-[var(--color-secondary)] mb-8">Send Us A Message</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full border-b-2 border-gray-200 py-3 px-0 bg-transparent focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full border-b-2 border-gray-200 py-3 px-0 bg-transparent focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>
            <div>
              <input 
                type="text" 
                placeholder="Phone Number" 
                className="w-full border-b-2 border-gray-200 py-3 px-0 bg-transparent focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400"
              />
            </div>
            <div>
              <textarea 
                placeholder="Message Details" 
                rows={4}
                className="w-full border-b-2 border-gray-200 py-3 px-0 bg-transparent focus:outline-none focus:border-[var(--color-primary)] transition-colors placeholder:text-gray-400 resize-none"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="bg-[var(--color-primary)] text-white w-full py-4 font-bold uppercase tracking-wider hover:bg-[var(--color-secondary)] transition-colors duration-300"
            >
              Submit Now
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
