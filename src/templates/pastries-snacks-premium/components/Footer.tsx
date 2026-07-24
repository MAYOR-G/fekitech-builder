import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation, visit, packages } = useTemplateData();

  return (
    <footer className="bg-[#111111] text-[#F9F9F9] pt-32">
      {/* Packages Section integrated into top of footer for this template */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-32 border-b border-[#333333] pb-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="inline-block bg-[#E5B53A] text-[#111111] px-4 py-1 font-bold text-xs uppercase tracking-widest mb-6">
              Packages
            </div>
            <h2 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 leading-[0.9]">
              {packages.title}
            </h2>
          </div>
          <p className="text-[#A0A0A0] text-xl font-medium max-w-sm text-right">
            {packages.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.items.map((pkg, idx) => (
            <div key={pkg.name} className={`p-10 border ${idx === 1 ? 'border-[#E5B53A] bg-[#E5B53A] text-[#111111]' : 'border-[#333333] hover:border-[#E5B53A] transition-colors'}`}>
              <h3 className="font-serif text-3xl font-bold uppercase tracking-tighter mb-2">{pkg.name}</h3>
              <div className="text-2xl font-bold mb-6">{pkg.price}</div>
              <p className={`font-medium mb-8 ${idx === 1 ? 'text-[#111111]/80' : 'text-[#A0A0A0]'}`}>{pkg.description}</p>
              
              <ul className="space-y-4 mb-10">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <span className="mt-1">●</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              
              <a href={pkg.buttonHref} className={`block w-full py-4 text-center text-sm font-bold uppercase tracking-widest transition-colors ${idx === 1 ? 'bg-[#111111] text-[#F9F9F9] hover:bg-[#F9F9F9] hover:text-[#111111]' : 'bg-[#E5B53A] text-[#111111] hover:bg-[#F9F9F9]'}`}>
                {pkg.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-5">
            <h2 className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.9]">
              {visit.title}
            </h2>
            <p className="text-[#A0A0A0] text-xl font-medium mb-10 max-w-md">
              {visit.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={visit.primaryHref} className="px-10 py-5 bg-[#E5B53A] text-[#111111] text-sm font-bold uppercase tracking-widest hover:bg-[#F9F9F9] transition-colors text-center">
                {visit.primaryLabel}
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-bold uppercase tracking-widest text-[#E5B53A] mb-6 text-sm">Hours</h4>
            <ul className="space-y-3 font-medium text-[#F9F9F9] text-sm">
              {visit.hours.map((h, i) => (
                <li key={i} className="flex justify-between border-b border-[#333333] pb-2">
                  <span className="text-[#A0A0A0]">{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-bold uppercase tracking-widest text-[#E5B53A] mb-6 text-sm">Location</h4>
            <p className="font-medium text-[#F9F9F9] text-sm leading-relaxed mb-6">
              <span className="text-[#A0A0A0]">{visit.areasLabel}</span><br />
              {visit.areas.join(", ")}<br /><br />
              {brand.address}
            </p>
            <a href={`mailto:${brand.email}`} className="text-[#E5B53A] font-bold text-sm hover:text-[#F9F9F9] transition-colors block mb-2 uppercase tracking-wide">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-[#E5B53A] font-bold text-sm hover:text-[#F9F9F9] transition-colors uppercase tracking-wide">
              {brand.phone}
            </a>
          </div>

        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#333333] text-sm font-medium text-[#A0A0A0]">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-6 w-auto invert opacity-50" />
            ) : (
              <span className="font-serif font-bold tracking-tighter uppercase text-[#F9F9F9]">{brand.name}</span>
            )}
            <span className="hidden md:inline-block">/</span>
            <p>{footer.copyright}</p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href={social.instagramHref} className="hover:text-[#E5B53A] transition-colors flex items-center gap-2 uppercase tracking-widest text-xs">
              <InstagramLogo size={20} /> Instagram
            </a>
            <a href={social.facebookHref} className="hover:text-[#E5B53A] transition-colors flex items-center gap-2 uppercase tracking-widest text-xs">
              <FacebookLogo size={20} /> Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
