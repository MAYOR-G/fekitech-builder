import React, { useState, useEffect } from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

export default function Header() {
  const { brand, navigation, colors } = useTemplateData();
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
        className="fixed left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex justify-center"
        style={{ top: scrolled ? '1rem' : '0' }}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-lg rounded-full py-3 px-8 w-[95%] max-w-5xl"
              : "bg-transparent py-8 w-full max-w-[1400px] px-6 md:px-12"
          }`}
        >
          
          {/* Left Nav (Desktop) */}
          <nav className="hidden md:flex flex-1 items-center gap-8">
            {navigation.links.slice(0, 2).map((link: any) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[12px] font-bold tracking-widest uppercase transition-colors ${
                  scrolled ? "text-[#5A564F]" : "text-white/80 hover:text-white"
                }`}
                style={scrolled ? {} : {}}
                onMouseOver={(e) => { if (scrolled) e.currentTarget.style.color = colors.primary; }}
                onMouseOut={(e) => { if (scrolled) e.currentTarget.style.color = ''; }}
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
                <span className={`font-serif text-3xl font-bold tracking-wide transition-colors ${
                  scrolled ? "" : "text-white"
                }`}
                style={scrolled ? { color: colors.text } : {}}
                >
                  {brand.name}
                </span>
                <span className={`text-[9px] uppercase tracking-[0.25em] mt-1 transition-colors ${
                  scrolled ? "" : "text-white/60"
                }`}
                style={scrolled ? { color: `${colors.text}80` } : {}}
                >
                  {brand.tagline}
                </span>
              </div>
            )}
          </a>

          {/* Right Nav (Desktop) */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            {navigation.links.slice(2).map((link: any) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[12px] font-bold tracking-widest uppercase transition-colors ${
                  scrolled ? "text-[#5A564F]" : "text-white/80 hover:text-white"
                }`}
                onMouseOver={(e) => { if (scrolled) e.currentTarget.style.color = colors.primary; }}
                onMouseOut={(e) => { if (scrolled) e.currentTarget.style.color = ''; }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={navigation.ctaHref}
              className={`px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors rounded-full ${
                scrolled
                  ? "text-white"
                  : "bg-white text-[#3D3A35] hover:bg-white/90"
              }`}
              style={scrolled ? { backgroundColor: colors.primary } : {}}
              onMouseOver={(e) => { if (scrolled) e.currentTarget.style.backgroundColor = colors.text; }}
              onMouseOut={(e) => { if (scrolled) e.currentTarget.style.backgroundColor = colors.primary; }}
            >
              {navigation.ctaLabel}
            </a>
          </div>

          <button
            className={`md:hidden ${scrolled ? "" : "text-white"}`}
            style={scrolled ? { color: colors.text } : {}}
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
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-serif text-2xl" style={{ color: colors.text }}>{brand.name}</span>
              <button style={{ color: colors.text }} onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navigation.links.map((link: any) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-3xl transition-colors"
                  style={{ color: colors.text }}
                  onMouseOver={(e) => e.currentTarget.style.color = colors.primary}
                  onMouseOut={(e) => e.currentTarget.style.color = colors.text}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={navigation.ctaHref}
                className="mt-8 px-10 py-4 text-white text-[12px] font-medium uppercase tracking-widest rounded-full"
                style={{ backgroundColor: colors.primary }}
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
