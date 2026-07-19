"use client";
import { Lightning } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <footer className="bg-electric-charcoal pt-16 pb-8 border-t-4 border-electric-amber">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          
          <a href="#" className="font-display font-bold text-2xl tracking-tighter text-white flex items-center gap-2 mb-6 md:mb-0">
            <Lightning size={24} weight="fill" className="text-electric-amber" />
            VOLTEDGE
          </a>

          <div className="flex flex-wrap justify-center gap-8 font-mono text-xs tracking-widest uppercase text-white/70">
            <a href="#infrastructure" className="hover:text-electric-amber transition-colors">Infrastructure</a>
            <a href="#smart-systems" className="hover:text-electric-amber transition-colors">Smart Systems</a>
            <a href="#safety" className="hover:text-electric-amber transition-colors">Safety</a>
            <a href="#process" className="hover:text-electric-amber transition-colors">Process</a>
            <a href="#contact" className="hover:text-electric-amber transition-colors">Contact</a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/50 text-xs font-mono uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} VoltEdge Electrical Systems.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-electric-amber transition-colors">Privacy</a>
            <a href="#" className="hover:text-electric-amber transition-colors">Terms</a>
            <a href="#" className="hover:text-electric-amber transition-colors">License #EL-99201</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
