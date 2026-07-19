"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#F5F0E8]/90 backdrop-blur-md py-6 border-b border-black/5' 
          : 'bg-transparent py-8 md:py-12'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="#" className="font-display font-medium text-[20px] text-[#1A1A1A]">
            Walnut & Form
          </a>
        </div>

        {/* Middle: Links */}
        <div className="hidden md:flex items-center justify-center gap-10">
          {['Collections', 'Craft', 'Materials', 'Atelier'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="font-sans text-[13px] uppercase tracking-[0.08em] text-[#2D2A26] relative group flex flex-col items-center"
            >
              {item}
              <span className="absolute -bottom-3 w-[4px] h-[4px] rounded-full bg-[#B45309] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          ))}
        </div>

        {/* Right: Atelier Access & Mobile Menu */}
        <div className="flex items-center justify-end gap-6">
          <a href="#access" className="hidden md:inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#2D2A26] group">
            Atelier Access
            <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          
          <button 
            className="md:hidden text-[#1A1A1A] p-2 z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 h-4 relative flex flex-col justify-between">
              <span className={`block h-[1px] w-full bg-current transition-transform duration-300 ${menuOpen ? 'translate-y-[7.5px] rotate-45' : ''}`}></span>
              <span className={`block h-[1px] w-full bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-[1px] w-full bg-current transition-transform duration-300 ${menuOpen ? '-translate-y-[7.5px] -rotate-45' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-[#F5F0E8] z-40 flex flex-col items-center justify-center gap-8"
            >
              {['Collections', 'Craft', 'Materials', 'Atelier', 'Atelier Access'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl text-[#1A1A1A] hover:text-[#B45309] transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
