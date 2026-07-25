import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

export default function Header() {
  const { brand, navigation, colors } = useTemplateData();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-7xl py-4 px-6 md:px-10 rounded-full flex items-center justify-between shadow-sm transition-all"
        style={{ backgroundColor: colors.primary, color: colors.text }}
      >
        <a href="#top" className="flex items-center gap-2 z-50">
          {brand.logo ? (
            <img src={brand.logo} alt={brand.name} className="h-8 w-auto" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#3D2721] flex items-center justify-center text-[#FFB5F2] font-serif font-bold">
              {brand.name.charAt(0)}
            </div>
          )}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navigation.links.slice(0, 3).map((link: any) => (
            <a
              key={link.label}
              href={link.href}
              className="font-serif text-lg hover:opacity-70 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden z-50 p-2"
          onClick={() => setMenuOpen(true)}
        >
          <List size={28} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col p-6"
            style={{ backgroundColor: colors.primary, color: colors.text }}
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-serif text-2xl font-bold">{brand.name}</span>
              <button onClick={() => setMenuOpen(false)} className="p-2">
                <X size={28} />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center gap-8">
              {navigation.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="font-serif text-4xl font-bold"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
