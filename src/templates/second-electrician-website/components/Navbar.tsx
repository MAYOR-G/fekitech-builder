"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightning, List, X } from '@phosphor-icons/react';

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md py-4 border-b border-electric-stone/10 shadow-sm' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className={`font-display font-bold text-2xl tracking-tighter flex items-center gap-2 ${scrolled ? 'text-electric-charcoal' : 'text-white'}`}>
          <Lightning size={24} weight="fill" className="text-electric-amber" />
          VOLTEDGE
        </a>

        <div className={`hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase ${scrolled ? 'text-electric-slate' : 'text-white/90'}`}>
          {['Infrastructure', 'Smart Systems', 'Safety', 'Process', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`hover:text-electric-amber transition-colors ${scrolled ? 'hover:text-electric-amber' : 'hover:text-white'}`}
            >
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-electric-amber text-electric-text px-6 py-3 rounded-full font-bold hover:bg-electric-charcoal hover:text-white transition-colors">
            Book Survey
          </a>
        </div>

        <button 
          className={`md:hidden p-2 z-50 relative ${scrolled || menuOpen ? 'text-electric-charcoal' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <List size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8"
            >
              {['Infrastructure', 'Smart Systems', 'Safety', 'Process', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display font-bold text-3xl uppercase tracking-tighter text-electric-charcoal hover:text-electric-amber transition-colors"
                >
                  {item}
                </a>
              ))}
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)}
                className="mt-8 bg-electric-amber text-electric-text px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm"
              >
                Book Survey
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
