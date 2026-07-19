"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';
import { useTemplateData } from '../TemplateContext';


const Testimonials = () => {
  const siteContent = useTemplateData();
  return (
    <section className="py-24 bg-coffee-light border-y border-coffee-cream">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            className="font-serif text-3xl md:text-4xl text-coffee-dark mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Words from our Guests
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {siteContent.testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mb-6 shadow-md border border-coffee-cream">
                <TemplateImage 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-lg text-coffee-dark italic mb-6">&quot;{testimonial.quote}&quot;</p>
              <div>
                <h4 className="font-sans font-medium text-coffee-dark text-sm uppercase tracking-widest">{testimonial.name}</h4>
                <span className="font-sans font-light text-coffee-terracotta text-sm">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
