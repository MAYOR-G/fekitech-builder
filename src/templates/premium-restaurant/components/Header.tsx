import React, { useState, useEffect } from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, User } from "@phosphor-icons/react";

export default function Header() {
  const { brand, navigation } = useTemplateData();
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          scrolled ? "bg-[#F7F4EE]/95 backdrop-blur-md py-4 border-b border-[#E5E0D8]" : "bg-transparent py-8"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
            ) : (
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-semibold tracking-[0.2em] text-[#2C2A26] uppercase">
                  LAWRENCE
                </span>
              </div>
            )}
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-[#421a22] hover:text-[#8D2E45] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-[#8D2E45] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a href="#login" className="flex items-center gap-2 text-[#421a22] hover:text-[#8D2E45] transition-colors">
              <User size={20} weight="bold" />
              <span className="text-[13px] font-medium">Log In</span>
            </a>
            <a
              href={navigation.ctaHref}
              className="px-6 py-2.5 bg-transparent border border-[#421a22] text-[#421a22] text-[13px] font-medium hover:bg-[#421a22] hover:text-white transition-colors"
            >
              Online order
            </a>
          </div>

          <button
            className="md:hidden text-[#421a22]"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-serif text-xl font-semibold">{brand.name}</span>
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
                  className="font-serif text-3xl text-[#2C2A26] hover:text-[#9B2C3F] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={navigation.ctaHref}
                className="mt-8 px-10 py-4 bg-[#9B2C3F] text-white text-[12px] font-bold uppercase tracking-[0.2em]"
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
