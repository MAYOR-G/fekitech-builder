import React from "react";
import { useTemplateData } from "../TemplateContext";
import { FacebookLogo, InstagramLogo, TwitterLogo, MapPin, Phone, EnvelopeSimple } from "@phosphor-icons/react";

export default function Footer() {
  const data = useTemplateData();

  return (
    <footer className="bg-[#433b3a] text-white pt-24 pb-12 relative z-0">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-pacifico text-3xl text-[var(--color-primary)] mb-4">{data.brand.name}</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {data.hero.subtitle}
            </p>
            <div className="flex justify-center md:justify-start items-center gap-3">
              <a href={data.footer.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-[#433b3a] hover:-translate-y-1 transition-all duration-300">
                <FacebookLogo size={20} weight="fill" />
              </a>
              <a href={data.footer.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-[#433b3a] hover:-translate-y-1 transition-all duration-300">
                <InstagramLogo size={20} weight="fill" />
              </a>
              <a href={data.footer.social.twitter} aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-[#433b3a] hover:-translate-y-1 transition-all duration-300">
                <TwitterLogo size={20} weight="fill" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-6">Explore</h4>
            <ul className="space-y-3">
              {data.navigation.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-300 hover:text-[var(--color-secondary)] transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin size={20} className="text-[var(--color-secondary)] shrink-0 mt-0.5" />
                <span>{data.brand.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <Phone size={20} className="text-[var(--color-secondary)] shrink-0" />
                <span>{data.brand.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <EnvelopeSimple size={20} className="text-[var(--color-secondary)] shrink-0" />
                <span>{data.brand.email}</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-6">Opening Hours</h4>
            <ul className="space-y-3 w-full max-w-[200px]">
              <li className="flex justify-between text-sm text-gray-300 border-b border-white/10 pb-2">
                <span>Mon - Fri</span>
                <span>10am - 8pm</span>
              </li>
              <li className="flex justify-between text-sm text-gray-300 border-b border-white/10 pb-2">
                <span>Saturday</span>
                <span>11am - 9pm</span>
              </li>
              <li className="flex justify-between text-sm text-gray-300 pb-2">
                <span>Sunday</span>
                <span>11am - 7pm</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="text-center pt-8 border-t border-white/10 relative z-10">
          <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
            {data.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
