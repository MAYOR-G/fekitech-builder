"use client";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Navbar() {
  const { brand, navLinks } = useTemplateData();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.72);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-pureWhite py-0 shadow-soft"
          : "bg-transparent py-2"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label={brand.name}>
          <span>
            <span className={cn(
              "block font-display text-2xl transition-colors duration-300",
              scrolled ? "text-onyx" : "text-alabaster"
            )}>
              {brand.name}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-[14px] uppercase tracking-wider font-semibold transition-colors duration-300",
                scrolled ? "text-charcoal/70 hover:text-charcoal" : "text-alabaster/80 hover:text-alabaster"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <ButtonLink href="#booking" variant={scrolled ? "primary" : "bronze"} className="min-h-11 px-5 text-sm uppercase tracking-wider">
            Book Your Stay
          </ButtonLink>
        </div>

        <button
          type="button"
          className={cn(
            "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
            scrolled
              ? "border-charcoal/20 bg-pureWhite text-charcoal hover:bg-charcoal/5"
              : "border-white/20 bg-white/10 text-alabaster hover:bg-white/15"
          )}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden border-t bg-pureWhite transition-all duration-300 lg:hidden",
          scrolled ? "border-charcoal/10" : "border-white/20",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="min-h-0">
          <div className="space-y-2 px-5 pb-5 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-full px-4 py-3 text-[15px] font-semibold text-charcoal/80 transition hover:bg-charcoal/5 hover:text-onyx"
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#booking" variant="bronze" className="mt-2 w-full">
              Book Your Stay
            </ButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
