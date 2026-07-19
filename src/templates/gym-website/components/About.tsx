"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import React from 'react';
import { motion } from 'motion/react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-gym-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden relative z-10">
              <TemplateImage 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop" 
                alt="Gym member exercising" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gym-accent rounded-full blur-3xl opacity-20 z-0"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-gym-accent font-bold tracking-widest uppercase mb-4 text-sm">Welcome to Forge</h2>
            <h3 className="text-4xl md:text-5xl font-black font-display mb-6 leading-tight">
              MORE THAN A GYM.<br />IT&apos;S A LIFESTYLE.
            </h3>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              At Forge, we believe that fitness is the foundation of a confident, energized life. We are a premium fitness studio offering expert coaching, state-of-the-art equipment, and a supportive community.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Whether you&apos;re taking your first step toward health or you&apos;re an elite athlete looking to optimize performance, our programs are structured to help you build strength that lasts.
            </p>
            
            <div className="flex flex-col gap-4">
              {['State-of-the-art facility', 'Elite personal trainers', 'Results-driven approach'].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gym-accent rounded-full"></div>
                  <span className="font-semibold text-white">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
