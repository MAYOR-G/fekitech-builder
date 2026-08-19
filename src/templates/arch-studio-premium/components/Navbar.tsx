"use client";

import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";

export function Navbar() {
  const { brand, navLinks } = useTemplateData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--arch-border)]">
      <div className="arch-container px-6 flex items-center justify-between h-24">
        <a href="#" className="font-serif text-2xl tracking-widest uppercase text-[var(--arch-text)]">
          {brand?.name}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-medium tracking-wide uppercase text-[var(--arch-text-muted)] hover:text-[var(--arch-text)] transition-colors"
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
          <span className={`block w-6 h-px bg-black transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-black transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 right-0 bg-white border-b border-[var(--arch-border)] py-6 px-6 flex flex-col gap-6">
          {navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-[var(--arch-text)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
