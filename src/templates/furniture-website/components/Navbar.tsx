"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.1);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "border-b border-charcoal/5 bg-white/95 py-2 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="font-display text-[18px] font-medium text-[#1A1A1A]">
            Oak & Ivory Living
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[#2D2A26] transition-colors hover:text-amber"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href="#consultation"
            className="group flex items-center gap-2 rounded-full border border-charcoal bg-white px-5 py-2 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal transition-all hover:bg-charcoal hover:text-white"
          >
            Book a Consultation
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/10 bg-white/50 text-charcoal backdrop-blur-md transition hover:bg-white/80 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-charcoal/5 bg-white/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="space-y-2 px-6 pb-6 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal transition hover:bg-charcoal/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#consultation"
              onClick={() => setOpen(false)}
              className="group mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-charcoal bg-white px-5 py-3 font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-charcoal transition-all hover:bg-charcoal hover:text-white"
            >
              Book a Consultation
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
