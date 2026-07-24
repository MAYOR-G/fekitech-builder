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
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled ? "bg-[#F7F5F0]/95 backdrop-blur-md py-4 border-[#3C2A21]/10" : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 z-50">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-serif text-2xl tracking-tight text-[#3C2A21]">{brand.name}</span>
            )}
          </a>

          <nav className="hidden md:flex items-center gap-12">
            {navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.15em] font-medium text-[#3C2A21]/80 hover:text-[#556B2F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={navigation.ctaHref}
              className="px-8 py-3 bg-[#556B2F] text-[#F7F5F0] text-[13px] uppercase tracking-[0.15em] font-medium hover:bg-[#3C2A21] transition-colors"
            >
              {navigation.ctaLabel}
            </a>
          </div>

          <button className="md:hidden z-50 text-[#3C2A21]" onClick={() => setMenuOpen(true)}>
            <List size={28} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#3C2A21] text-[#F7F5F0] flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-serif text-2xl tracking-tight">{brand.name}</span>
              <button onClick={() => setMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-10">
              {navigation.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="font-serif text-4xl hover:text-[#556B2F] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                href={navigation.ctaHref}
                className="mt-8 px-10 py-4 bg-[#556B2F] text-white text-[13px] uppercase tracking-[0.15em] font-medium"
              >
                {navigation.ctaLabel}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
