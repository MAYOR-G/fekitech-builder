"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const navLinks = [
  { name: "Treatments", href: "#treatments" },
  { name: "Retreats", href: "#retreats" },
  { name: "Wellness", href: "#journal" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#footer" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-colors duration-400 h-[76px] flex items-center",
          isScrolled ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="z-50">
            <span
              className={clsx(
                "font-serif text-2xl tracking-wide transition-colors duration-400",
                isScrolled && !mobileMenuOpen ? "text-brand-charcoal" : "text-white"
              )}
            >
              SANCTUM
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm uppercase tracking-[0.12em] font-medium relative group overflow-hidden transition-colors duration-400",
                  isScrolled ? "text-brand-charcoal hover:text-brand-sage" : "text-white/90 hover:text-white"
                )}
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-brand-sage transition-all duration-300 ease-out group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </nav>

          {/* CTA / Hamburger */}
          <div className="flex items-center gap-4 z-50">
            <Link
              href="#book"
              className={clsx(
                "hidden lg:inline-block px-6 py-3 rounded-full text-[13px] uppercase tracking-[0.06em] font-medium transition-all duration-300",
                "bg-brand-sage text-white hover:brightness-95 hover:shadow-sm"
              )}
            >
              Book a Treatment
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className={clsx("w-6 h-6", isScrolled ? "text-brand-charcoal" : "text-white")} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-forest flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif text-white hover:text-brand-sand transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-4"
              >
                <Link
                  href="#book"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-block px-8 py-3 rounded-full bg-brand-sage text-white text-[13px] uppercase tracking-[0.06em] font-medium"
                >
                  Book a Treatment
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
