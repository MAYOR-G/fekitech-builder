import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation, visit } = useTemplateData();

  return (
    <footer className="bg-[#F3E8DF] text-[#3D3A35] pt-32 pb-12 rounded-t-[3rem]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-6xl mb-8">{visit.title}</h2>
          <p className="text-[#6D6A61] max-w-xl mx-auto font-light text-lg mb-10">
            {visit.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={visit.primaryHref}
              className="px-10 py-4 bg-[#E2A499] text-white text-[12px] font-medium uppercase tracking-[0.15em] hover:bg-[#3D3A35] transition-colors rounded-full"
            >
              {visit.primaryLabel}
            </a>
            <a
              href={visit.secondaryHref}
              className="px-10 py-4 bg-transparent text-[#3D3A35] border border-[#3D3A35]/20 text-[12px] font-medium uppercase tracking-[0.15em] hover:border-[#3D3A35] transition-colors rounded-full"
            >
              {visit.secondaryLabel}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-14 w-auto object-contain mb-6" />
            ) : (
              <div className="flex flex-col mb-6">
                <span className="font-serif text-3xl font-medium tracking-wide text-[#3D3A35]">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E8B82] mt-1">
                  {brand.tagline}
                </span>
              </div>
            )}
            <p className="text-[#6D6A61] font-light text-sm max-w-xs leading-relaxed">
              {footer.note}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Hours</h4>
            <ul className="space-y-3 font-light text-[#6D6A61] text-sm">
              {visit.hours.map((h, i) => (
                <li key={i} className="flex justify-between max-w-[200px]">
                  <span>{h.day}</span>
                  <span className="font-medium text-[#3D3A35]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Location</h4>
            <p className="font-light text-[#6D6A61] text-sm leading-relaxed mb-4">
              {visit.areasLabel}<br />
              <span className="font-medium text-[#3D3A35]">{visit.areas.join(", ")}</span><br />
              {brand.address}
            </p>
            <a href={`mailto:${brand.email}`} className="text-[#E2A499] font-medium text-sm hover:text-[#3D3A35] transition-colors block mb-2">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-[#E2A499] font-medium text-sm hover:text-[#3D3A35] transition-colors">
              {brand.phone}
            </a>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Navigation</h4>
            <ul className="space-y-3 font-light text-[#6D6A61] text-sm">
              {navigation.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#E2A499] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#3D3A35]/10 text-xs text-[#6D6A61]">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href={social.instagramHref} className="w-8 h-8 rounded-full border border-[#3D3A35]/20 flex items-center justify-center hover:bg-[#E2A499] hover:text-white hover:border-transparent transition-all">
              <InstagramLogo size={16} />
            </a>
            <a href={social.facebookHref} className="w-8 h-8 rounded-full border border-[#3D3A35]/20 flex items-center justify-center hover:bg-[#E2A499] hover:text-white hover:border-transparent transition-all">
              <FacebookLogo size={16} />
            </a>
            <a href={social.tiktokHref} className="w-8 h-8 rounded-full border border-[#3D3A35]/20 flex items-center justify-center hover:bg-[#E2A499] hover:text-white hover:border-transparent transition-all">
              <TiktokLogo size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
