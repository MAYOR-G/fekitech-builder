"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Buy', href: '#' },
    { name: 'Rent', href: '#' },
    { name: 'Sell', href: '#' },
    { name: 'Landlords', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 h-20 flex items-center ${
          isScrolled ? 'bg-white shadow-md text-charcoal' : 'bg-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between w-full">
          <a href="#" className="font-serif text-2xl tracking-wide flex items-baseline">
            NORTHLANE<span className="text-gold">.</span>
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] font-medium uppercase tracking-widest relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <a
            href="#"
            className={`hidden md:inline-flex items-center justify-center px-6 py-2.5 text-[13px] font-medium uppercase tracking-cta transition-all duration-200 rounded-full ${
              isScrolled
                ? 'bg-gold text-white hover:bg-gold-hover hover:scale-105'
                : 'bg-gold text-white hover:bg-gold-hover hover:scale-105'
            }`}
          >
            Book Valuation
          </a>

          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal-navy flex flex-col"
          >
            <div className="flex items-center justify-between h-20 px-6">
              <a href="#" className="font-serif text-2xl tracking-wide text-white flex items-baseline">
                NORTHLANE<span className="text-gold">.</span>
              </a>
              <button
                className="p-2 -mr-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 bg-gold text-white px-8 py-4 text-sm font-medium uppercase tracking-cta rounded-full"
              >
                Book Valuation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
