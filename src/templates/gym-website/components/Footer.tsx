"use client";
import React from 'react';
import { ArrowRight, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gym-darker pt-24 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-display font-black text-4xl tracking-tighter text-white mb-6">
              FORGE<span className="text-gym-accent">.</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              A premium fitness studio dedicated to helping you build strength that lasts. Expert coaching, superior facility.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-accent hover:text-gym-darker transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-accent hover:text-gym-darker transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gym-accent hover:text-gym-darker transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-400 hover:text-gym-accent transition-colors">About Us</a></li>
              <li><a href="#programs" className="text-gray-400 hover:text-gym-accent transition-colors">Programs</a></li>
              <li><a href="#trainers" className="text-gray-400 hover:text-gym-accent transition-colors">Trainers</a></li>
              <li><a href="#schedule" className="text-gray-400 hover:text-gym-accent transition-colors">Schedule</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for fitness tips and studio updates.</p>
            <div className="flex bg-white/5 rounded-full p-1 border border-white/10 focus-within:border-gym-accent transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none text-white px-4 py-2 w-full text-sm"
              />
              <button className="bg-gym-accent text-gym-darker rounded-full p-2 hover:bg-gym-accentHover transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-sm text-gray-500">
          <p>&copy; 2026 Forge Fitness Studio. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
