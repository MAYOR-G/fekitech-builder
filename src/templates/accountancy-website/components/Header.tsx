"use client";
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-forest-900/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5' 
          : 'bg-transparent py-6 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="font-serif text-2xl font-bold tracking-wide text-white">
          LEDGER <span className="text-gold-500">&</span> CO.
        </div>
        
        <nav className="hidden md:flex space-x-8 text-white/90 text-xs font-medium uppercase tracking-widest">
          <a href="#expertise" className="hover:text-gold-500 transition-colors">Expertise</a>
          <a href="#industries" className="hover:text-gold-500 transition-colors">Industries</a>
          <a href="#firm" className="hover:text-gold-500 transition-colors">The Firm</a>
          <a href="#contact" className="hover:text-gold-500 transition-colors">Contact</a>
        </nav>
        
        <a href="#contact" className="hidden md:inline-flex bg-gold-500 text-forest-900 px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white transition-colors">
          Partner With Us
        </a>

        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-forest-900 border-b border-white/10 shadow-2xl">
          <div className="flex flex-col p-6 space-y-6 text-sm font-medium uppercase tracking-widest text-white/90">
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">Expertise</a>
            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">Industries</a>
            <a href="#firm" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">The Firm</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-gold-500 transition-colors">Contact</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="bg-gold-500 text-forest-900 px-8 py-4 text-center hover:bg-white transition-colors">
              Partner With Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
