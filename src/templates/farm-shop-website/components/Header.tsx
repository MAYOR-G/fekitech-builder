import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Header() {
  const data = useTemplateData();

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-6 px-8 md:px-16 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold font-sans tracking-tight text-[#1E201E]">{data.global?.businessName || "FreshMarket"}</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[#1E201E] font-medium text-sm">
          <a href="#" className="hover:text-[#548D4E] transition-colors">Home</a>
          <a href="#" className="hover:text-[#548D4E] transition-colors">Fruit & Veg</a>
          <a href="#" className="hover:text-[#548D4E] transition-colors">Meat & Fish</a>
        </nav>
      </div>

      <div className="hidden md:flex items-center gap-4 text-white">
        <a href={data.socials?.facebook || "#"} className="hover:text-white/80 transition-colors"><Facebook size={18} /></a>
        <a href={data.socials?.instagram || "#"} className="hover:text-white/80 transition-colors"><Instagram size={18} /></a>
        <a href={data.socials?.linkedin || "#"} className="hover:text-white/80 transition-colors"><Linkedin size={18} /></a>
        <a href={data.socials?.twitter || "#"} className="hover:text-white/80 transition-colors"><Twitter size={18} /></a>
      </div>
    </header>
  );
}
