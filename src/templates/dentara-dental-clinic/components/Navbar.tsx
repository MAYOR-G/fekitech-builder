"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";
import { Menu, X, Phone, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const data = useTemplateData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e2e8f0]">
      <div className="dentara-container">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 text-decoration-none group">
            <div className="w-10 h-10 rounded-xl bg-[#0454ff] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7 3 11 1 2.5 2 3 3 3s2-.5 3-3c1.5-4 3-7.5 3-11 0-3.5-2.5-6-6-6z" />
                <path d="M9 9c1 1.5 2 2 3 2s2-.5 3-2" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl font-bold text-[#0f0f0f] tracking-tight font-heading leading-tight"
                data-editable-path="brand.name"
                data-editable-type="text"
              >
                {data.brand.name}
              </span>
              <span
                className="text-xs text-[#6d6d6d] font-medium tracking-wide uppercase"
                data-editable-path="brand.tagline"
                data-editable-type="text"
              >
                {data.brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {data.navigation.links.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#2f2f2f] hover:text-[#0454ff] transition-colors"
                data-editable-path={`navigation.links.${idx}.label`}
                data-editable-type="link"
                data-editable-href-path={`navigation.links.${idx}.href`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTA & Phone */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={data.brand.phoneHref}
              className="hidden xl:flex items-center gap-2 text-sm font-semibold text-[#0f0f0f] hover:text-[#0454ff] transition-colors"
              data-editable-path="brand.phone"
              data-editable-type="link"
              data-editable-href-path="brand.phoneHref"
            >
              <div className="w-8 h-8 rounded-full bg-[#f5f7ff] text-[#0454ff] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <span>{data.brand.phone}</span>
            </a>

            <a
              href={data.navigation.button.href}
              className="dentara-btn-primary text-sm py-3 px-6"
              data-editable-path="navigation.button.label"
              data-editable-type="link"
              data-editable-href-path="navigation.button.href"
            >
              <span>{data.navigation.button.label}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg text-[#0f0f0f] hover:bg-[#f5f8fb] transition-colors focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#e2e8f0] bg-white">
            <nav className="flex flex-col gap-3">
              {data.navigation.links.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-base font-semibold text-[#2f2f2f] hover:text-[#0454ff] hover:bg-[#f5f7ff] rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  data-editable-path={`navigation.links.${idx}.label`}
                  data-editable-type="link"
                  data-editable-href-path={`navigation.links.${idx}.href`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#e2e8f0] flex flex-col gap-3">
                <a
                  href={data.brand.phoneHref}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-[#0f0f0f]"
                  data-editable-path="brand.phone"
                  data-editable-type="link"
                  data-editable-href-path="brand.phoneHref"
                >
                  <Phone className="w-4 h-4 text-[#0454ff]" />
                  <span>{data.brand.phone}</span>
                </a>
                <a
                  href={data.navigation.button.href}
                  className="dentara-btn-primary w-full text-center py-3"
                  onClick={() => setMobileMenuOpen(false)}
                  data-editable-path="navigation.button.label"
                  data-editable-type="link"
                  data-editable-href-path="navigation.button.href"
                >
                  {data.navigation.button.label}
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
