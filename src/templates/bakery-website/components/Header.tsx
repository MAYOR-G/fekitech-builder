"use client";
import React, { useState, useEffect } from "react";
import { useTemplateData } from "../TemplateContext";
import { List, MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";

export default function Header() {
  const data = useTemplateData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'} flex items-center justify-between`}>
      {/* Decorative wavy top border could be here, but let's keep it clean */}
      
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-[#3d3d3d] flex-1 justify-end pr-12">
          {data.navigation.links.slice(0, 3).map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-[var(--color-primary)] transition-colors duration-300 relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-center relative z-50">
          {/* Brand/Logo */}
          <div className={`bg-white rounded-full p-4 shadow-sm border-2 border-dashed border-[var(--color-primary)] flex items-center justify-center transition-all duration-300 ${scrolled ? 'w-20 h-20' : 'w-28 h-28 md:w-32 md:h-32 -mb-16 shadow-lg'}`}>
            {data.brand.logo ? (
              <img src={data.brand.logo} alt={data.brand.name} className="w-full h-full object-contain relative z-10" />
            ) : (
              <div className="text-center relative z-10 leading-tight flex flex-col items-center justify-center">
                <span className="font-serif text-xl md:text-2xl text-[#3d3d3d] block font-black" style={{ lineHeight: 1 }}>{data.brand.name.split(" ")[0]}</span>
                <span className="font-sans text-[0.6rem] md:text-xs text-[var(--color-secondary)] uppercase tracking-widest font-bold mt-1">
                  {data.brand.name.split(" ").slice(1).join(" ")}
                </span>
              </div>
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-[#3d3d3d] flex-1 justify-start pl-12">
          {data.navigation.links.slice(3).map((link, idx) => (
            <a key={idx} href={link.href} className="hover:text-[var(--color-primary)] transition-colors duration-300 relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-primary)] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <button aria-label="Search" className="hover:text-[var(--color-primary)] transition-colors">
              <MagnifyingGlass size={20} weight="bold" />
            </button>
            <button aria-label="Cart" className="hover:text-[var(--color-primary)] transition-colors">
              <ShoppingCart size={20} weight="bold" />
            </button>
          </div>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#3d3d3d] hover:text-[var(--color-primary)] ml-auto pr-4 relative z-50">
          <List size={28} weight="bold" />
        </button>

      </div>
      
      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#3a2d2a] text-white z-40 transition-transform duration-500 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col items-center justify-center`}>
        <nav className="flex flex-col items-center gap-8 text-xl font-serif">
          {data.navigation.links.map((link, idx) => (
            <a key={idx} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-[var(--color-primary)] transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
