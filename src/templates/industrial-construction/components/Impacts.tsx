"use client";
import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { ArrowUpRight, Settings, Banknote } from 'lucide-react';

const Impacts = () => {
  const { impacts } = useTemplateData();

  return (
    <section className="bg-[#f9f8f6] py-24 relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-16 relative z-10">
        
        {/* Left Side: Orange Box + Image */}
        <div className="lg:w-1/2 relative min-h-[500px]">
          <div className="bg-[#f15b26] p-16 pb-32 text-white relative z-10 w-4/5 h-[400px]">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-2 h-2 bg-white"></div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">{impacts.tagline}</span>
            </div>
            
            <h2 className="text-4xl font-extrabold leading-tight mb-12">
              {impacts.orangeBoxTitle}
            </h2>
            
            <div className="flex items-center">
              <span className="text-sm font-bold tracking-wider mr-4 cursor-pointer hover:underline">{impacts.buttonLabel}</span>
              <div className="bg-white text-[#f15b26] p-3">
                <ArrowUpRight size={18} className="stroke-[3]" />
              </div>
            </div>
          </div>
          
          {/* Overlapping Image */}
          <div className="absolute right-0 bottom-0 w-3/5 h-80 z-20 shadow-2xl border-8 border-[#f9f8f6]">
            <img 
              src={impacts.image} 
              alt="Industrial Building" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Text & Stats */}
        <div className="lg:w-1/2 pt-12 lg:pl-12 flex flex-col justify-center">
          <h3 className="text-4xl font-extrabold text-[#1a1a1a] leading-tight mb-16 max-w-lg">
            {impacts.rightTitle}
          </h3>

          <div className="flex flex-col sm:flex-row gap-12">
            {impacts.stats.map((stat, idx) => (
              <div key={idx} className="flex-1">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">
                  {stat.label}
                </p>
                <div className="flex items-end space-x-4">
                  {idx === 0 ? (
                    <Settings size={40} className="text-[#f15b26]" strokeWidth={1.5} />
                  ) : (
                    <Banknote size={40} className="text-[#f15b26]" strokeWidth={1.5} />
                  )}
                  <span className="text-5xl font-extrabold text-[#1a1a1a]">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute left-[30%] bottom-10 w-4 h-4 rounded-full bg-[#f15b26] opacity-30"></div>
      
      {/* Fake text overlay for "RECENT PROJECTS" from the screenshot */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.03] select-none flex justify-center">
        <h2 className="text-[200px] font-black whitespace-nowrap leading-none tracking-tighter">RECENT PROJECTS</h2>
      </div>
    </section>
  );
};

export default Impacts;
