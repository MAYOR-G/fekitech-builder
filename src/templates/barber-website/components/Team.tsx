"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from '../TemplateContext';
import { motion } from 'motion/react';


export default function Team() {
  const siteContent = useTemplateData();

  return (
    <section id="team" className="py-24 px-6 bg-barber-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-barber-heading mb-4 text-barber-brand-cream">THE TEAM</h2>
          <div className="w-16 h-1 bg-barber-brand-accent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {siteContent.team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6 rounded-sm">
                <TemplateImage 
                  src={member.image} 
                  alt={`${member.name}, ${member.specialty}`} 
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-barber-heading uppercase text-barber-brand-cream">{member.name}</h3>
              <p className="text-barber-brand-accent font-bold tracking-widest text-sm uppercase mt-1 mb-3">{member.specialty}</p>
              <p className="text-barber-brand-cream/60 font-light">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
