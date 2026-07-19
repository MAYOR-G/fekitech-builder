"use client";
import { Menu, Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
        scrolled 
          ? "border-plum/10 bg-pearl/86 backdrop-blur-xl py-2" 
          : "border-transparent bg-transparent py-4"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span className="grid h-11 w-11 place-items-center rounded-full bg-plum text-champagne shadow-card">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold text-plum">
              {brand.name}
            </span>
            <span className="hidden text-[11px] font-black uppercase tracking-[0.22em] text-rose sm:block">
              Salon and beauty studio
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-extrabold text-mink/72 transition hover:text-plum"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="#booking" className="min-h-11 px-5">
            Book Appointment
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-plum/12 bg-pearl text-plum transition hover:border-rose/36 lg:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t border-plum/10 bg-pearl transition-all duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="space-y-2 px-5 pb-5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-3 text-[15px] font-extrabold text-mink/76 transition hover:bg-veil hover:text-plum"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#booking" className="mt-2 w-full">
              Book Appointment
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
