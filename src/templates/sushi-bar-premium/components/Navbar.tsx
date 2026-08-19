"use client";

import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";

export function Navbar() {
  const { brand, navLinks } = useTemplateData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent border-b border-white/10">
      <div className="sushi-container px-6 flex items-center justify-between h-24">
        <a href="#" className="font-serif text-3xl tracking-[0.2em] text-white">
          {brand?.name}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-xs font-light tracking-[0.15em] uppercase text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-[1px] bg-white transition-transform ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block w-6 h-[1px] bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[1px] bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 right-0 bg-[var(--sushi-bg)] border-b border-[var(--sushi-border)] py-8 px-6 flex flex-col gap-8 items-center text-center">
          {navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xl font-serif text-white tracking-widest"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
