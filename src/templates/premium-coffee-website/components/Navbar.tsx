"use client";
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-heading font-bold tracking-widest text-brand-cream">
          ROAST & ORIGIN
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-brand-accent transition-colors">Shop</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Wholesale</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Locations</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Story</a>
        </nav>
        
        <div className="flex items-center space-x-6">
          <button className="hidden md:block bg-brand-accent text-white px-6 py-2 uppercase text-xs font-bold tracking-wider hover:bg-white hover:text-brand-black transition-colors">
            Subscribe
          </button>
          <button className="hover:text-brand-accent transition-colors">
            <ShoppingCart size={20} />
          </button>
          <button className="md:hidden hover:text-brand-accent transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-brand-charcoal py-8 px-6 flex flex-col space-y-6 md:hidden"
        >
          <a href="#" className="text-xl font-heading hover:text-brand-accent">Shop</a>
          <a href="#" className="text-xl font-heading hover:text-brand-accent">Wholesale</a>
          <a href="#" className="text-xl font-heading hover:text-brand-accent">Locations</a>
          <a href="#" className="text-xl font-heading hover:text-brand-accent">Story</a>
          <button className="bg-brand-accent text-white px-6 py-3 uppercase text-sm font-bold tracking-wider mt-4">
            Subscribe
          </button>
        </motion.div>
      )}
    </header>
  );
}
