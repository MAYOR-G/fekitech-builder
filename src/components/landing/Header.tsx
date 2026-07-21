"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/ui/LogoMark";
import { GradientButton } from "@/components/ui/GradientButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/templates", label: "Templates" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/support", label: "Support" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <>
      <div
        className={`sticky top-0 z-50 flex justify-center px-3 py-2.5 sm:px-6 pointer-events-none transition-all duration-300 ${
          scrolled ? "bg-white/72 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <header
          className={`pointer-events-auto flex w-full max-w-[1240px] items-center justify-between rounded-2xl border px-4 transition-all duration-300 sm:px-6 lg:rounded-full ${
            scrolled
              ? "border-ft-border/70 bg-white/95 py-2.5 shadow-[0_12px_34px_rgba(17,24,39,0.12)] backdrop-blur-xl"
              : "border-white/80 bg-white/88 py-3 shadow-[0_8px_24px_rgba(17,24,39,0.06)] backdrop-blur-xl"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-2.5 rounded-xl pr-2"
            aria-label="FekiTech Builder home"
            onClick={() => setMobileOpen(false)}
          >
            <LogoMark className="transition-transform duration-200 group-hover:-translate-y-0.5" />
            <span className="text-base font-bold tracking-[-0.02em] text-ft-ink sm:text-lg">
              FekiTech <span className="font-medium text-ft-body">Builder</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-ft-surface-cool text-ft-primary"
                    : "text-ft-body hover:bg-ft-surface-alt hover:text-ft-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-ft-body hover:text-ft-ink transition-colors"
            >
              Log in
            </Link>
            <GradientButton href="/signup" className="text-sm !py-2.5 !px-5">
              Start building
            </GradientButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl transition-colors hover:bg-ft-surface-alt lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-ft-ink" />
            ) : (
              <Menu className="w-5 h-5 text-ft-ink" />
            )}
          </button>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div id="mobile-navigation" className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white/96 pb-8 pt-24 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-1 px-6" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`min-h-14 border-b border-ft-border-light py-4 text-center text-xl font-semibold transition-colors ${
                  pathname === link.href
                    ? "text-ft-primary"
                    : "text-ft-ink hover:text-ft-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="min-h-12 rounded-xl border border-ft-border py-3 text-center text-base font-semibold text-ft-body transition-colors hover:border-ft-primary hover:text-ft-primary"
              >
                Log in
              </Link>
              <GradientButton
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="min-h-12 text-center text-base"
              >
                Start building
              </GradientButton>
            </div>
            
            {/* Added Cancel Button in the menu as requested */}
            <div className="mt-auto pt-8">
              <button 
                onClick={() => setMobileOpen(false)}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ft-surface-alt text-ft-ink transition-colors hover:bg-ft-border"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
