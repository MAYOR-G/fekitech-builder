import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const data = useTemplateData();
  const { global, contact, socials, hero } = data;

  return (
    <footer className="bg-[#050505] text-[#FDFBF7] py-24 px-8 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-24">
        
        {/* Left Side */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl font-bold font-sans tracking-tight text-white">{global?.businessName || "FreshMarket"}</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed">
            {hero?.subheadline}
          </p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 text-sm text-white/80">
          <p>{contact?.address}</p>
          <p>{contact?.phone}</p>
          <p>{contact?.email}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <nav className="flex flex-wrap items-center gap-6 text-sm font-medium text-white/80">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">Testimonials</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="#" className="hover:text-white transition-colors">Blog</a>
        </nav>

      </div>

      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
        <p>© 2026 {global?.businessName || "FreshMarket"}</p>
        
        <div className="flex items-center gap-4 text-white/60">
          <a href={socials?.facebook || "#"} className="hover:text-white transition-colors"><Facebook size={16} /></a>
          <a href={socials?.instagram || "#"} className="hover:text-white transition-colors"><Instagram size={16} /></a>
          <a href={socials?.linkedin || "#"} className="hover:text-white transition-colors"><Linkedin size={16} /></a>
          <a href={socials?.twitter || "#"} className="hover:text-white transition-colors"><Twitter size={16} /></a>
        </div>
      </div>
    </footer>
  );
}
