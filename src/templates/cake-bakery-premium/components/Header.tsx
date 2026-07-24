import React, { useState, useEffect } from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

export default function Header() {
  const { brand, navigation } = useTemplateData();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          scrolled ? "bg-[#FBF8F1]/90 backdrop-blur-xl py-4 shadow-sm" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex flex-1 items-center gap-8">
            {navigation.links.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-medium tracking-widest text-[#5A564F] hover:text-[#E2A499] uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Logo (Center) */}
          <a href="#top" className="flex-1 flex justify-center items-center">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-14 w-auto object-contain" />
            ) : (
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl font-medium tracking-wide text-[#3D3A35]">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E8B82] mt-1">
                  {brand.tagline}
                </span>
              </div>
            )}
          </a>

          {/* Right Nav (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            {navigation.links.slice(2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] font-medium tracking-widest text-[#5A564F] hover:text-[#E2A499] uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={navigation.ctaHref}
              className="px-6 py-2.5 bg-[#E2A499] text-white text-[11px] font-medium uppercase tracking-widest hover:bg-[#D48F82] transition-colors rounded-full"
            >
              {navigation.ctaLabel}
            </a>
          </div>

          <button
            className="md:hidden text-[#3D3A35]"
            onClick={() => setMenuOpen(true)}
          >
            <List size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-[#FBF8F1] flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-serif text-2xl">{brand.name}</span>
              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navigation.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl text-[#3D3A35] hover:text-[#E2A499] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={navigation.ctaHref}
                className="mt-8 px-10 py-4 bg-[#E2A499] text-white text-[12px] font-medium uppercase tracking-widest rounded-full"
              >
                {navigation.ctaLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
