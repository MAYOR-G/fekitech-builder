import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Search, Phone } from "lucide-react";

export function Navbar() {
  const data = useTemplateData();

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        {/* Logo icon placeholder */}
        <div className="w-6 h-6 rounded-sm bg-[#c95d3c] flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <a href="#" className="text-xl font-bold tracking-tight text-gray-900">
          {data.brand.name}
        </a>
      </div>

      <div className="hidden md:flex items-center space-x-8">
        {data.navLinks.map((link, idx) => (
          <a key={idx} href={link.href} className="text-sm font-medium text-gray-700 hover:text-black">
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-700 hover:text-black">
          <Phone className="w-5 h-5" />
        </button>
        <button className="text-gray-700 hover:text-black">
          <Search className="w-5 h-5" />
        </button>
        <a
          href={data.hero.primaryCta.href}
          className="hidden md:inline-flex bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          {data.hero.primaryCta.label}
        </a>
      </div>
    </nav>
  );
}
