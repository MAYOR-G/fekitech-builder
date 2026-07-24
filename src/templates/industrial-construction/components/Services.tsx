"use client";
import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { ArrowUpRight, Home, Building2, Hammer, Settings } from 'lucide-react';

const icons = [Home, Building2, Hammer, Settings];

const Services = () => {
  const { services } = useTemplateData();

  return (
    <section className="bg-[#f9f8f6]" id="services">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-8 py-24 flex justify-between items-end">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-[#f15b26]"></div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{services.tagline}</span>
          </div>
          <h2 className="text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            {services.title}
          </h2>
        </div>
        
        <div className="flex items-center mb-4">
          <button className="bg-[#f15b26] text-white font-bold text-sm px-8 py-4 hover:bg-[#d94b1b] transition-colors flex items-center">
            {services.buttonLabel}
          </button>
          <div className="bg-white text-[#f15b26] p-4 flex items-center justify-center border border-gray-100 shadow-sm">
            <ArrowUpRight size={20} className="stroke-[3]" />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col md:flex-row w-full h-[600px]">
        {services.items.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div 
              key={index} 
              className="flex-1 relative group overflow-hidden cursor-pointer border-r border-white/10 last:border-0"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              
              {/* Base Overlay */}
              <div className="absolute inset-0 bg-[#212529]/70 transition-opacity duration-500 group-hover:opacity-0" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-between py-16 px-8 text-center z-10">
                <div className="w-20 h-20 bg-[#f15b26] flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-4">
                  <Icon size={32} className="text-white" strokeWidth={1.5} />
                </div>
                
                <div className="transition-transform duration-500 group-hover:-translate-y-8 flex flex-col items-center">
                  <h3 className="text-3xl font-bold text-white leading-tight mb-4 group-hover:mb-2">{item.title}</h3>
                  <div className="h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:h-32 group-hover:opacity-100 flex flex-col items-center">
                    <p className="text-white/90 text-sm leading-relaxed">{item.description}</p>
                    <div className="mt-6 w-10 h-10 rounded-full bg-[#f15b26] flex items-center justify-center">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;
