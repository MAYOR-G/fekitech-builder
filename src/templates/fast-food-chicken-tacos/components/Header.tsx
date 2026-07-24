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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          scrolled ? "translate-y-0" : "translate-y-4"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <div className="bg-[#FFE600] border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] flex items-center justify-between p-4">
            
            <a href="#top" className="flex items-center gap-2 z-50">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="h-10 w-auto" />
              ) : (
                <span className="font-serif text-3xl font-bold tracking-tight uppercase leading-none mt-1">
                  {brand.name}
                </span>
              )}
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navigation.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-bold uppercase tracking-wider text-sm hover:text-[#FF2A00] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <a
                href={navigation.ctaHref}
                className="px-6 py-2 bg-[#FF2A00] text-[#FFE600] font-bold uppercase tracking-wider border-2 border-[#111111] hover:bg-[#111111] transition-colors"
              >
                {navigation.ctaLabel}
              </a>
            </div>

            <button
              className="md:hidden z-50 bg-[#111111] text-[#FFE600] p-1 border-2 border-[#111111]"
              onClick={() => setMenuOpen(true)}
            >
              <List size={24} weight="bold" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] p-4 flex"
          >
            <div className="bg-[#FFE600] w-full h-full border-4 border-[#111111] shadow-[12px_12px_0px_0px_#111111] flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="font-serif text-4xl font-bold uppercase">{brand.name}</span>
                <button onClick={() => setMenuOpen(false)} className="bg-[#111111] text-[#FFE600] p-2 border-2 border-[#111111]">
                  <X size={32} weight="bold" />
                </button>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center gap-8">
                {navigation.links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="font-serif text-6xl font-bold uppercase hover:text-[#FF2A00] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  href={navigation.ctaHref}
                  className="mt-8 px-12 py-4 bg-[#FF2A00] text-[#FFE600] text-xl font-bold uppercase border-4 border-[#111111] shadow-[6px_6px_0px_0px_#111111]"
                >
                  {navigation.ctaLabel}
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
