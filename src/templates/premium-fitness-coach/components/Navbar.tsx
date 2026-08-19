"use client";

import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";

export function Navbar() {
  const { brand, navLinks } = useTemplateData();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-8">
      <div className="fit-container px-6 flex items-center justify-between">
        <a href="#" className="font-display text-4xl text-white tracking-widest uppercase">
          {brand?.name}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-bold tracking-widest uppercase text-white hover:text-[var(--fit-accent)] transition-colors"
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
          <span className={`block w-8 h-[2px] bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-8 h-[2px] bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-8 h-[2px] bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 right-0 bg-[var(--fit-bg)] py-8 px-6 flex flex-col gap-6">
          {navLinks?.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-display text-white tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
