import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation } = useTemplateData();

  return (
    <footer className="bg-[#1A1814] text-white pt-24 pb-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-4">
            <a href="#top" className="inline-block mb-6">
              {brand.logo ? (
                <img src={brand.logo} alt={brand.name} className="h-12 w-auto object-contain brightness-0 invert" />
              ) : (
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-medium tracking-tight text-white">
                    {brand.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D5B55B] font-semibold mt-1">
                    {brand.tagline}
                  </span>
                </div>
              )}
            </a>
            <p className="text-[#A3A099] text-sm leading-relaxed max-w-xs">
              {footer.note}
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B55B] mb-6">Navigation</h4>
              <ul className="space-y-4">
                {navigation.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[#E5E0D8] hover:text-white transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B55B] mb-6">Contact</h4>
              <ul className="space-y-4 text-sm text-[#E5E0D8]">
                <li><a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="hover:text-white transition-colors">{brand.phone}</a></li>
                <li><a href={`mailto:${brand.email}`} className="hover:text-white transition-colors">{brand.email}</a></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D5B55B] mb-6">Location</h4>
            <p className="text-[#E5E0D8] text-sm leading-relaxed mb-8">
              {brand.address}
            </p>
            <div className="flex items-center gap-4">
              <a href={social.instagramHref} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1814] transition-all">
                <InstagramLogo size={18} />
              </a>
              <a href={social.facebookHref} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1814] transition-all">
                <FacebookLogo size={18} />
              </a>
              <a href={social.tiktokHref} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1A1814] transition-all">
                <TiktokLogo size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-[11px] text-[#A3A099]">
          <p>{footer.copyright}</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
