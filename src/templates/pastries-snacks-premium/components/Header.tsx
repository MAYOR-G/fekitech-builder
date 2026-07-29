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
        className={scrolled ? "gf-header is-scrolled" : "gf-header"}
      >
        <div className="gf-header-inner">
          <a href="#top" className="gf-logo">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} />
            ) : (
              <span>{brand.name}</span>
            )}
          </a>

          <nav className="gf-nav">
            {navigation.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="gf-header-cta">
            <a
              href={navigation.ctaHref}
            >
              {navigation.ctaLabel}
            </a>
          </div>

          <button
            className="gf-mobile-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            type="button"
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
            className="gf-mobile-menu"
          >
            <div className="gf-mobile-top">
              <span>{brand.name}</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" type="button">
                <X size={32} />
              </button>
            </div>
            <div className="gf-mobile-links">
              {navigation.links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                href={navigation.ctaHref}
                className="gf-mobile-cta"
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
