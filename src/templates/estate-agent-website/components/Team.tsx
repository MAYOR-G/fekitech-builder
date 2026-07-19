"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';

const team = [
  {
    name: 'Eleanor Vance',
    role: 'Director of Sales',
    phone: '+44 (0) 20 7123 4567',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'James Stirling',
    role: 'Head of Lettings',
    phone: '+44 (0) 20 7123 4568',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Sophia Chen',
    role: 'Senior Property Consultant',
    phone: '+44 (0) 20 7123 4569',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80'
  },
  {
    name: 'Marcus Thorne',
    role: 'Investment Specialist',
    phone: '+44 (0) 20 7123 4570',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80'
  }
];

export default function Team() {
  return (
    <section className="py-24 md:py-32 bg-ivory">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-[13px] uppercase tracking-widest text-gold font-medium mb-4 block">
            Our People
          </span>
          <h2 className="font-serif text-[36px] md:text-[48px] text-charcoal leading-[1.15] max-w-2xl mx-auto">
            Expertise You Can Trust.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-none mb-6 bg-white mx-auto w-full max-w-[280px]">
                <TemplateImage 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a href={`mailto:contact@northlane.co.uk`} className="w-10 h-10 rounded-full bg-white text-charcoal flex items-center justify-center hover:bg-gold hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300 delay-75">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </a>
                </div>
              </div>
              <h3 className="font-serif text-[22px] text-charcoal mb-1">{member.name}</h3>
              <p className="text-[13px] text-gray-500 uppercase tracking-wide mb-2">{member.role}</p>
              <a href={`tel:${member.phone.replace(/[^0-9+]/g, '')}`} className="text-[14px] text-charcoal/80 hover:text-gold transition-colors">
                {member.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
