"use client";
import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { ArrowUpRight, Headphones, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const { hero } = useTemplateData();

  return (
    <section className="relative min-h-[85vh] flex">
      {/* Left Dark Section */}
      <div className="w-[45%] bg-[#212529] text-white flex flex-col justify-center px-16 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl font-extrabold leading-[1.1] mb-10 tracking-tighter"
        >
          {hero.title}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center"
        >
          <button className="bg-[#f15b26] text-white font-bold text-sm px-8 py-4 hover:bg-[#d94b1b] transition-colors flex items-center">
            {hero.buttonLabel}
          </button>
          <div className="bg-white text-[#f15b26] p-4 flex items-center justify-center">
            <ArrowUpRight size={20} className="stroke-[3]" />
          </div>
        </motion.div>

        {/* Bottom Left Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-12 flex items-center space-x-12"
        >
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Simple circular text approximation */}
            <svg className="absolute w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <path id="circlePath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none" />
              <text fontSize="10" fill="white" letterSpacing="2">
                <textPath href="#circlePath" startOffset="0%">
                  • {hero.experience.text} • {hero.experience.text}
                </textPath>
              </text>
            </svg>
            <span className="text-3xl font-bold text-[#f15b26]">{hero.experience.years}</span>
          </div>

          <div className="border-l border-gray-600 pl-8">
            <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase tracking-wider">{hero.efficiency.label}</p>
            <div className="flex items-center space-x-4">
              <div className="border border-white/20 p-3 rounded">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <span className="text-4xl font-extrabold">{hero.efficiency.value}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Image Section */}
      <div className="w-[55%] relative">
        <div className="absolute inset-0 bg-black/10 z-10" />
        <img 
          src={hero.image} 
          alt="Construction worker" 
          className="w-full h-full object-cover"
        />

        {/* Floating Contact Box */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-0 right-16 bg-white flex z-20 shadow-xl"
        >
          {/* Emergency */}
          <div className="flex items-center p-8 border-r border-gray-100">
            <div className="w-12 h-12 bg-red-50 text-[#f15b26] rounded-full flex items-center justify-center mr-4 relative">
              <Headphones size={24} />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f15b26] rounded-full border-2 border-white"></div>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">{hero.contactBox.emergency.label}</p>
              <p className="text-xl font-bold text-gray-900">{hero.contactBox.emergency.value}</p>
            </div>
          </div>

          {/* Mail */}
          <div className="flex items-center p-8">
            <div className="w-12 h-12 bg-red-50 text-[#f15b26] rounded-full flex items-center justify-center mr-4">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">{hero.contactBox.mail.label}</p>
              <p className="text-xl font-bold text-gray-900">{hero.contactBox.mail.value}</p>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative slant overlay - gives the angled edge effect on the dark section */}
      <div 
        className="absolute left-[45%] top-0 bottom-0 w-[5%] bg-[#212529] z-10"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      ></div>
    </section>
  );
};

export default Hero;
