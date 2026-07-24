"use client";
import React from 'react';
import { useTemplateData } from '../TemplateContext';
import { Check } from 'lucide-react';

const Quality = () => {
  const { quality } = useTemplateData();

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-2 h-2 bg-[#f15b26]"></div>
            <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">{quality.tagline}</span>
          </div>
          <h2 className="text-4xl font-extrabold text-[#1a1a1a] leading-tight">
            {quality.title}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center bg-[#f9f8f6] p-12 lg:p-16">
          
          {/* Left Side: Image with floating box */}
          <div className="lg:w-1/2 relative pl-8 lg:pl-16">
            {/* The image */}
            <div className="bg-gray-200 h-[500px] w-full relative">
              <img 
                src={quality.image} 
                alt="Worker" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#f9f8f6]/10 mix-blend-overlay"></div>
            </div>
            
            {/* Floating Dark Box */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 bg-[#212529] text-white p-10 text-center w-48 shadow-2xl">
              <h3 className="text-5xl font-black mb-2">{quality.projectsDone}</h3>
              <p className="text-[10px] font-bold tracking-widest text-gray-300 uppercase">PROJECT DONE</p>
            </div>
            
            {/* Decorative dot */}
            <div className="absolute bottom-24 right-8 w-4 h-4 rounded-full bg-[#f15b26] opacity-60 shadow-lg"></div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-extrabold text-[#1a1a1a] mb-6 tracking-wide">
              {quality.contentTitle}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-12">
              {quality.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-center">
              <div className="w-full sm:w-2/5 h-32 relative">
                <img 
                  src={quality.subImage} 
                  alt="Construction work" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full sm:w-3/5">
                <ul className="space-y-4">
                  {quality.checks.map((check, idx) => (
                    <li key={idx} className="flex items-center space-x-3 text-sm font-bold text-gray-600">
                      <Check size={18} className="text-[#f15b26]" strokeWidth={3} />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Quality;
