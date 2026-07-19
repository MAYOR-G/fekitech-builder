"use client";
import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-coffee-light pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-coffee-light/20 pb-16">
          
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl mb-6">Coffee Crafted.</h2>
            <p className="font-light text-coffee-light/70 max-w-sm leading-relaxed mb-8">
              A premium coffee experience focused on quality, community, and the simple pleasure of a well-made cup.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-coffee-light/30 flex items-center justify-center hover:bg-coffee-light hover:text-coffee-dark transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram size={18} strokeWidth={1.5} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-coffee-light/30 flex items-center justify-center hover:bg-coffee-light hover:text-coffee-dark transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-widest text-sm mb-6 text-coffee-terracotta">Explore</h4>
            <ul className="space-y-4 font-light text-coffee-light/80">
              <li><a href="#about" className="hover:text-coffee-light transition-colors">Our Story</a></li>
              <li><a href="#menu" className="hover:text-coffee-light transition-colors">Menu</a></li>
              <li><a href="#journey" className="hover:text-coffee-light transition-colors">The Journey</a></li>
              <li><a href="#visit" className="hover:text-coffee-light transition-colors">Locations</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-widest text-sm mb-6 text-coffee-terracotta">Newsletter</h4>
            <p className="font-light text-coffee-light/70 mb-4 text-sm">Join our newsletter for updates on new single-origin drops.</p>
            <form className="flex border-b border-coffee-light/50 focus-within:border-coffee-light transition-colors pb-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent w-full focus:outline-none text-coffee-light placeholder-coffee-light/40 font-light"
              />
              <button type="submit" className="uppercase tracking-widest text-xs font-medium hover:text-coffee-terracotta transition-colors">
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-light text-coffee-light/50">
          <p>&copy; {new Date().getFullYear()} Coffee Crafted. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-coffee-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-coffee-light transition-colors">Terms of Service</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
