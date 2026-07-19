"use client";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-plum text-white pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Left Column */}
          <div className="space-y-6">
            <Link href="/" className="font-serif text-3xl tracking-widest uppercase inline-block">
              Lumière
            </Link>
            <p className="text-white/80 max-w-xs text-sm leading-relaxed">
              Premium hair, makeup, and nail artistry for the modern woman. Where beauty becomes art.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-mauve transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Add more icons like TikTok/Pinterest if needed, using simple SVG or Lucide alternatives if exact not available */}
              <a href="#" className="hover:text-brand-mauve transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Center Column */}
          <div className="space-y-6">
            <h4 className="font-sans font-medium uppercase tracking-widest text-sm text-brand-mauve">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Services", "Lookbook", "Team", "Contact", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <h4 className="font-sans font-medium uppercase tracking-widest text-sm text-brand-mauve">
              Visit Us
            </h4>
            <ul className="space-y-4 text-sm text-white/80">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 shrink-0 text-brand-mauve" />
                <span>
                  123 Luxury Avenue, Suite 400<br />
                  Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 shrink-0 text-brand-mauve" />
                <span>+1 (310) 555-0199</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 shrink-0 text-brand-mauve" />
                <span>hello@lumieresalon.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-xs tracking-wider">
            &copy; {new Date().getFullYear()} LUMIÈRE SALON. ALL RIGHTS RESERVED.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors group text-xs uppercase tracking-widest"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
