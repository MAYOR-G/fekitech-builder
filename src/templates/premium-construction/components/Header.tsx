import React, { useState, useEffect } from 'react';
import { useTemplateData } from '../TemplateContext';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const data = useTemplateData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center pl-8 md:pl-0">
          <span className="text-3xl font-bold text-[var(--color-primary)] font-serif uppercase tracking-wider">
            {data.brand.logoText}
          </span>
        </div>

        <nav className="hidden lg:flex space-x-8">
          {data.navigation.links.map((link: any, index: number) => (
            <button
              key={index}
              onClick={() => setActivePage(link.label)}
              className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                activePage === link.label ? 'text-[var(--color-primary)]' : 'text-gray-800 hover:text-[var(--color-primary)]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center">
          <div className="bg-[var(--color-primary)] text-white px-8 py-3 flex space-x-8">
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Support 24/7:</span>
              <span>{data.brand.phone}</span>
            </div>
            <div className="flex flex-col text-sm">
              <span className="font-semibold">Email Us:</span>
              <span>{data.brand.email}</span>
            </div>
          </div>
        </div>

        <button 
          className="lg:hidden pr-8 md:pr-0 text-gray-800 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-4">
          {data.navigation.links.map((link: any, index: number) => (
            <button
              key={index}
              onClick={() => {
                setActivePage(link.label);
                setIsMobileMenuOpen(false);
              }}
              className={`text-left text-sm font-semibold uppercase tracking-wide py-2 border-b border-gray-100 ${
                activePage === link.label ? 'text-[var(--color-primary)]' : 'text-gray-800'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="bg-[var(--color-primary)] text-white p-4 rounded mt-4">
            <div className="mb-2">
              <span className="font-semibold block">Support 24/7:</span>
              <span>{data.brand.phone}</span>
            </div>
            <div>
              <span className="font-semibold block">Email Us:</span>
              <span>{data.brand.email}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
