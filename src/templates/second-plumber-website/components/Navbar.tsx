"use client";
import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-plumber-bg/90 backdrop-blur-md border-plumber-slate/10 py-4' 
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-display font-bold text-2xl tracking-tight text-plumber-text group-hover:opacity-80 transition-opacity">
            ClearFlow
          </span>
          <div className="w-2 h-2 rounded-full bg-plumber-copper mt-1.5" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Services', 'Process', 'Standards', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-plumber-charcoal hover:text-plumber-copper transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="hidden md:block bg-plumber-copper/10 text-plumber-copper border border-plumber-copper/20 hover:bg-plumber-copper hover:text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:-translate-y-0.5">
          Book Technical Survey
        </button>

        <button className="md:hidden text-plumber-charcoal p-2">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
