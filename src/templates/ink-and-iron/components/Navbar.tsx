"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Droplet } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "SERVICES", href: "#services" },
  { name: "PORTFOLIO", href: "#portfolio" },
  { name: "ARTISTS", href: "#artists" },
  { name: "AFTERCARE", href: "#aftercare" },
];

export default function Navbar() {
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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-2xl tracking-widest text-white flex items-center gap-1">
              INK <span className="text-[#C9A84C]">&</span> IRON
              <Droplet className="w-4 h-4 text-[#C9A84C] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-semibold tracking-[0.2em] text-[#F5F5F5]/70 hover:text-[#C9A84C] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#C9A84C] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA & Wait Time */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B2635] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B2635]"></span>
              </span>
              <span className="text-[10px] tracking-widest text-[#F5F5F5]/60 uppercase">
                Wait Time: 15m
              </span>
            </div>
            <Link
              href="#book"
              className="bg-[#C9A84C] text-[#141414] px-6 py-3 text-xs font-bold tracking-widest hover:bg-white transition-colors duration-300"
            >
              BOOK NOW
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl tracking-widest hover:text-[#C9A84C] transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8B2635] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B2635]"></span>
                </span>
                <span className="text-xs tracking-widest text-[#F5F5F5]/60 uppercase">
                  Walk-ins available
                </span>
              </div>
              <Link
                href="#book"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-[#C9A84C] text-[#141414] px-8 py-4 text-sm font-bold tracking-widest"
              >
                BOOK NOW
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
