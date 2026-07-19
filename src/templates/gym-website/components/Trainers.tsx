"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';

const trainers = [
  {
    name: "Marcus Cole",
    specialty: "Strength & Conditioning",
    experience: "8+ Years Experience",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=1974&auto=format&fit=crop"
  },
  {
    name: "Elena Rodriguez",
    specialty: "Mobility & Recovery",
    experience: "6+ Years Experience",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "David Chen",
    specialty: "Athletic Performance",
    experience: "10+ Years Experience",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop"
  }
];

const Trainers = () => {
  return (
    <section id="trainers" className="py-24 bg-gym-darker">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Expert Coaching</h2>
            <h3 className="text-4xl md:text-5xl font-black font-display uppercase">Meet Your Trainers</h3>
          </div>
          <button className="text-white font-bold hover:text-gym-accent transition-colors flex items-center gap-2 uppercase tracking-wider text-sm">
            View All Trainers
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((trainer, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <TemplateImage 
                src={trainer.image} 
                alt={trainer.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-gym-accent font-bold text-sm tracking-wider uppercase mb-1">{trainer.specialty}</span>
                <h4 className="text-3xl font-black font-display text-white mb-1">{trainer.name}</h4>
                <p className="text-gray-300 text-sm mb-6">{trainer.experience}</p>
                
                <button className="bg-white text-gym-darker font-bold py-3 rounded-full uppercase tracking-wider text-sm hover:bg-gym-accent transition-colors opacity-0 group-hover:opacity-100 duration-300">
                  Book Session
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trainers;
