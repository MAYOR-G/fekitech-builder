"use client";
import React, { useState, useEffect } from "react";
import { useTemplateData } from "../TemplateContext";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, MapPin, Mail, Clock } from "lucide-react";

export default function Header() {
  const data = useTemplateData();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Bar - Hidden on scroll or mobile */}
      <div className={`hidden lg:block w-full bg-[#1a1614] border-b border-white/10 transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
        <div className="container mx-auto px-4 md:px-8 h-full flex items-center justify-between text-xs text-gray-300">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors cursor-pointer">
              <MapPin size={14} className="text-[var(--color-primary)]" />
              <span>{data.brand.address}</span>
            </div>
            <div className="flex items-center gap-2 hover:text-[var(--color-primary)] transition-colors cursor-pointer">
              <Mail size={14} className="text-[var(--color-primary)]" />
              <span>{data.brand.email}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-[var(--color-primary)]" />
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex items-center gap-4 border-l border-white/20 pl-6">
              {data.footer.social.map((social, idx) => (
                <a key={idx} href={social.href} className="hover:text-[var(--color-primary)] transition-colors">
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`w-full transition-all duration-300 ${scrolled ? "bg-[var(--color-secondary)] py-4 shadow-xl" : "bg-black/20 py-6 backdrop-blur-sm"}`}>
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className={`w-12 h-12 flex items-center justify-center bg-[var(--color-primary)] transition-colors duration-300`}>
                 <span className="font-serif font-bold text-2xl text-white">{data.brand.logoText}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl uppercase tracking-widest text-white leading-none">
                  {data.brand.name}
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {data.navigation.links.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  className="text-white text-sm font-semibold uppercase tracking-wider hover:text-[var(--color-primary)] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-[var(--color-primary)] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Contact / CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#contact" className="bg-[var(--color-primary)] hover:bg-white hover:text-[var(--color-secondary)] text-white px-6 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-300">
                Get Appointment
              </a>
              <button className="text-white hover:text-[var(--color-primary)] transition-colors lg:hidden">
                <List size={28} />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-white hover:text-[var(--color-primary)] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <List size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 bg-[var(--color-secondary)] z-[60] flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-white hover:text-[var(--color-primary)] transition-colors p-2"
              >
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-grow flex flex-col justify-center px-12">
              <nav className="flex flex-col gap-6">
                {data.navigation.links.map((link, idx) => (
                  <motion.a 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.1) }}
                    key={idx} 
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-3xl font-serif hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 pt-8 border-t border-white/10"
              >
                <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Get in touch</p>
                <a href={`tel:${data.brand.phone}`} className="text-2xl text-white block hover:text-[var(--color-primary)] mb-4">{data.brand.phone}</a>
                <a href={`mailto:${data.brand.email}`} className="text-lg text-[var(--color-primary)] block hover:text-white transition-colors">{data.brand.email}</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
