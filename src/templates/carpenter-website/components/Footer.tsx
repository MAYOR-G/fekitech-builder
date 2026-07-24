"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const data = useTemplateData();

  return (
    <footer id="contact" className="bg-[#1a1513] text-gray-300 pt-24 pb-8 relative overflow-hidden">
      {/* Decorative large logo in background */}
      <div className="absolute top-0 right-0 text-[20rem] font-black text-white/[0.02] pointer-events-none -translate-y-1/4 translate-x-1/4 leading-none">
        {data.brand.logoText}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center bg-[var(--color-primary)]">
                 <span className="font-serif font-bold text-lg text-white">{data.brand.logoText}</span>
              </div>
              <span className="font-bold text-xl uppercase tracking-widest text-white leading-none">
                {data.brand.name.split('&')[0]}<span className="text-[var(--color-primary)]">&</span>{data.brand.name.split('&')[1]}
              </span>
            </a>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {data.footer.description}
            </p>
            <div className="flex gap-4">
              {data.footer.social.map((social, idx) => (
                <a key={idx} href={social.href} className="w-10 h-10 border border-white/10 flex items-center justify-center rounded hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-colors duration-300">
                  {social.platform.charAt(0)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--color-primary)]">
              Quick Links
            </h4>
            <ul className="space-y-4">
              {data.navigation.links.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                    <ArrowRight size={14} /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--color-primary)]">
              Get In Touch
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <MapPin className="text-[var(--color-primary)] shrink-0 mt-1" size={20} />
                <span className="text-gray-400 leading-relaxed">{data.brand.address}</span>
              </li>
              <li className="flex gap-4 items-center">
                <Phone className="text-[var(--color-primary)] shrink-0" size={20} />
                <a href={`tel:${data.brand.phone}`} className="text-gray-400 hover:text-white transition-colors">{data.brand.phone}</a>
              </li>
              <li className="flex gap-4 items-center">
                <Mail className="text-[var(--color-primary)] shrink-0" size={20} />
                <a href={`mailto:${data.brand.email}`} className="text-gray-400 hover:text-white transition-colors">{data.brand.email}</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6 relative pb-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-0.5 after:bg-[var(--color-primary)]">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to get the latest updates and offers.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className="bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary)] w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-[var(--color-primary)] text-white px-4 py-3 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[var(--color-secondary)] transition-colors w-full flex items-center justify-center gap-2"
              >
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">{data.footer.copyright}</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
