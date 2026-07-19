"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-charcoal/95 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="font-heading font-bold text-2xl tracking-widest text-brand-cream">
            THE STUDIO.
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase">
            <a href="#services" className="hover:text-brand-accent transition-colors">Services</a>
            <a href="#lookbook" className="hover:text-brand-accent transition-colors">Lookbook</a>
            <a href="#team" className="hover:text-brand-accent transition-colors">Team</a>
            <a href="#booking" className="bg-brand-accent text-brand-black px-6 py-2.5 font-bold hover:bg-brand-cream transition-colors">Book Now</a>
          </div>

          <button className="md:hidden text-brand-cream" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-charcoal flex flex-col justify-center items-center"
          >
            <button className="absolute top-6 right-6 text-brand-cream" onClick={() => setMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-8 text-2xl font-heading tracking-widest uppercase">
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">Services</a>
              <a href="#lookbook" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">Lookbook</a>
              <a href="#team" onClick={() => setMobileMenuOpen(false)} className="hover:text-brand-accent transition-colors">Team</a>
              <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="bg-brand-accent text-brand-black px-8 py-4 font-bold mt-8">Book Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
