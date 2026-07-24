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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#111111] text-[#F9F9F9] py-4" : "bg-transparent text-[#111111] py-8"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 z-50">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className={`h-8 w-auto transition-all ${scrolled ? "invert" : ""}`} />
            ) : (
              <span className="font-serif text-3xl font-bold tracking-tighter uppercase">
                {brand.name}
              </span>
            )}
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold tracking-wide uppercase hover:text-[#E5B53A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a
              href={navigation.ctaHref}
              className={`px-8 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                scrolled 
                  ? "bg-[#E5B53A] text-[#111111] hover:bg-[#F9F9F9]" 
                  : "bg-[#111111] text-[#F9F9F9] hover:bg-[#E5B53A] hover:text-[#111111]"
              }`}
            >
              {navigation.ctaLabel}
            </a>
          </div>

          <button
            className="md:hidden z-50"
            onClick={() => setMenuOpen(true)}
          >
            <List size={32} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-[#111111] text-[#F9F9F9] flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <span className="font-serif text-2xl font-bold uppercase">{brand.name}</span>
              <button onClick={() => setMenuOpen(false)}>
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 flex flex-col px-12 justify-center gap-6">
              {navigation.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="font-serif text-5xl font-bold uppercase hover:text-[#E5B53A] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href={navigation.ctaHref}
                className="mt-8 px-10 py-4 bg-[#E5B53A] text-[#111111] text-sm font-bold uppercase tracking-widest self-start"
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
