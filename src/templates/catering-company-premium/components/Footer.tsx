import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation, visit } = useTemplateData();

  return (
    <footer className="bg-[#DCE2CB] text-[#3C2A21] pt-32 pb-12 rounded-t-[3rem]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">{visit.title}</h2>
          <p className="text-[#3C2A21]/70 max-w-xl mx-auto text-lg mb-10 leading-relaxed">
            {visit.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={visit.primaryHref}
              className="px-10 py-4 bg-[#556B2F] text-[#F7F5F0] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#3C2A21] transition-colors rounded-full"
            >
              {visit.primaryLabel}
            </a>
            {visit.secondaryLabel && (
              <a
                href={visit.secondaryHref}
                className="px-10 py-4 bg-transparent border border-[#3C2A21] text-[#3C2A21] text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[#3C2A21] hover:text-[#F7F5F0] transition-colors rounded-full"
              >
                {visit.secondaryLabel}
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-14 w-auto object-contain mb-6" />
            ) : (
              <div className="flex flex-col mb-6">
                <span className="font-serif text-3xl tracking-tight text-[#3C2A21]">
                  {brand.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#556B2F] mt-2">
                  {brand.tagline}
                </span>
              </div>
            )}
            <p className="text-[#3C2A21]/70 text-sm max-w-xs leading-relaxed">
              {footer.note}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-[#556B2F] mb-6">Availability</h4>
            <ul className="space-y-3 text-[#3C2A21]/80 text-sm">
              {visit.hours.map((h, i) => (
                <li key={i} className="flex justify-between max-w-[200px]">
                  <span>{h.day}</span>
                  <span className="font-medium text-[#3C2A21]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-[#556B2F] mb-6">Contact</h4>
            <p className="text-[#3C2A21]/80 text-sm leading-relaxed mb-4">
              <span className="opacity-70">{visit.areasLabel}</span><br />
              <span className="font-medium text-[#3C2A21]">{visit.areas.join(", ")}</span><br /><br />
              {brand.address}
            </p>
            <a href={`mailto:${brand.email}`} className="text-[#556B2F] font-medium text-sm hover:text-[#3C2A21] transition-colors block mb-2">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-[#556B2F] font-medium text-sm hover:text-[#3C2A21] transition-colors">
              {brand.phone}
            </a>
          </div>

          <div>
            <h4 className="font-bold text-[11px] uppercase tracking-[0.2em] text-[#556B2F] mb-6">Navigation</h4>
            <ul className="space-y-3 text-[#3C2A21]/80 text-sm">
              {navigation.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#556B2F] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#3C2A21]/10 text-xs text-[#3C2A21]/60">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href={social.instagramHref} className="hover:text-[#556B2F] transition-colors">
              <InstagramLogo size={20} />
            </a>
            <a href={social.facebookHref} className="hover:text-[#556B2F] transition-colors">
              <FacebookLogo size={20} />
            </a>
            <a href={social.tiktokHref} className="hover:text-[#556B2F] transition-colors">
              <TiktokLogo size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
