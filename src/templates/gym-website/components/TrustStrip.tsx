"use client";
import React from 'react';

const stats = [
  { value: '2.5K+', label: 'Active Members' },
  { value: '150+', label: 'Classes Weekly' },
  { value: '50+', label: 'Expert Trainers' },
  { value: '4.9/5', label: 'Average Rating' },
];

const TrustStrip = () => {
  return (
    <div className="bg-gym-accent text-gym-darker py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gym-darker/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-4xl md:text-5xl font-black font-display mb-2">{stat.value}</span>
              <span className="text-sm md:text-base font-bold uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustStrip;
