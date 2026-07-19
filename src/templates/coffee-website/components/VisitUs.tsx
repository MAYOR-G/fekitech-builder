"use client";
import EditableText from '@/components/editor/blocks/EditableText';
import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useTemplateData } from '../TemplateContext';


const VisitUs = () => {
  const siteContent = useTemplateData();
  return (
    <section id="visit" className="py-24 bg-coffee-dark text-coffee-light">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-12">Visit Our Coffee House</h2>
            
            <div className="space-y-8 font-sans font-light">
              <div className="flex items-start gap-4">
                <MapPin className="text-coffee-terracotta shrink-0 mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium text-lg mb-1">Location</h4>
                  <p className="text-coffee-light/80"><EditableText section="visit" field="address" value={siteContent?.visit?.address} as="span" /></p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-coffee-terracotta shrink-0 mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium text-lg mb-1">Hours</h4>
                  <ul className="text-coffee-light/80 space-y-1">
                    {siteContent.visit.hours.map((h, i) => (
                      <li key={i} className="flex justify-between w-48">
                        <span>{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-coffee-terracotta shrink-0 mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium text-lg mb-1">Contact</h4>
                  <p className="text-coffee-light/80"><EditableText section="visit" field="phone" value={siteContent?.visit?.phone} as="span" /></p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="text-coffee-terracotta shrink-0 mt-1" size={24} strokeWidth={1.5} />
                <div>
                  <h4 className="font-medium text-lg mb-1">Email</h4>
                  <p className="text-coffee-light/80"><EditableText section="visit" field="email" value={siteContent?.visit?.email} as="span" /></p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="aspect-[4/3] bg-coffee-brown relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Interactive Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0191124855215!2d-122.40130982361661!3d37.78915151121081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858062ec7e5cf5%3A0x6b44c61db23f58!2sBlue%20Bottle%20Coffee!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 opacity-90"
              title="Interactive Map"
            ></iframe>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default VisitUs;
