"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Lookbook", href: "#lookbook" },
    { name: "Transformations", href: "#transformations" },
    { name: "Team", href: "#team" },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center px-6 md:px-12",
          isScrolled
            ? "bg-white shadow-sm text-brand-charcoal"
            : "bg-transparent text-white"
        )}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl md:text-3xl tracking-widest uppercase font-semibold"
          >
            Lumière
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={clsx(
                      "text-sm uppercase tracking-widest font-medium relative group overflow-hidden"
                    )}
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current transform -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="#book"
              className="bg-brand-mauve text-white px-6 py-2.5 rounded-full text-sm font-semibold tracking-wider hover:bg-brand-plum transition-colors duration-300"
            >
              BOOK NOW
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-brand-plum text-white flex flex-col justify-center px-6"
          >
            <button
              className="absolute top-6 right-6 p-2"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col space-y-8 items-center text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl tracking-widest uppercase hover:text-brand-mauve transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 bg-white text-brand-plum px-8 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-brand-cream transition-colors"
              >
                BOOK NOW
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
