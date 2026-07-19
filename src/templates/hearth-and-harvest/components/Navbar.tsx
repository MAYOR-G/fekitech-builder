"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "MENU", href: "#menu" },
    { name: "RESERVATIONS", href: "#reservations" },
    { name: "LOCATIONS", href: "#locations" },
    { name: "STORY", href: "#story" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-heading tracking-widest text-foreground z-50">
          HEARTH & HARVEST
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm tracking-widest hover:text-brand-accent transition-colors duration-300 font-medium"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="#book"
            className="bg-brand-accent text-white px-6 py-2.5 tracking-wider text-sm font-medium hover:bg-brand-dark transition-colors duration-300"
          >
            BOOK A TABLE
          </Link>
          <button className="relative group p-2">
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-brand-accent transition-colors" />
            <span className="absolute top-0 right-0 bg-brand-accent text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              2
            </span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-3xl font-heading tracking-widest text-foreground hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1 + 0.2 }}
              className="pt-8 flex flex-col items-center space-y-6"
            >
              <Link
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-brand-accent text-white px-8 py-3 tracking-widest text-lg font-medium"
              >
                BOOK A TABLE
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
