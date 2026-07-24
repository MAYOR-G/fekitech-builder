import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation, visit } = useTemplateData();

  return (
    <footer className="bg-[#111111] text-[#F9F9F9] pt-32 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        <div className="bg-[#FF2A00] border-4 border-[#FFE600] p-10 md:p-20 text-center mb-32 shadow-[12px_12px_0px_0px_#FFE600] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#111111] border-b-4 border-l-4 border-[#FFE600] flex items-center justify-center rotate-12 translate-x-10 -translate-y-10">
            <span className="text-[#FFE600] font-bold uppercase tracking-widest text-sm rotate-[-12deg]">Hungry?</span>
          </div>
          
          <h2 className="font-serif text-[4rem] md:text-[6rem] font-bold uppercase tracking-tighter mb-8 leading-none drop-shadow-[4px_4px_0_#111111] text-[#FFE600]">
            {visit.title}
          </h2>
          <p className="text-xl md:text-2xl font-bold mb-10 max-w-xl mx-auto bg-[#111111] p-4 text-[#F9F9F9]">
            {visit.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={visit.primaryHref}
              className="px-10 py-5 bg-[#FFE600] text-[#111111] text-xl font-bold uppercase tracking-widest border-4 border-[#111111] shadow-[8px_8px_0px_0px_#111111] hover:translate-y-2 hover:shadow-none transition-all"
            >
              {visit.primaryLabel}
            </a>
            {visit.secondaryLabel && (
              <a
                href={visit.secondaryHref}
                className="px-10 py-5 bg-[#111111] text-[#FFE600] text-xl font-bold uppercase tracking-widest border-4 border-[#FFE600] shadow-[8px_8px_0px_0px_#FFE600] hover:translate-y-2 hover:shadow-none transition-all"
              >
                {visit.secondaryLabel}
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-1">
            {brand.logo ? (
              <img src={brand.logo} alt={brand.name} className="h-16 w-auto mb-6 invert" />
            ) : (
              <div className="flex flex-col mb-6">
                <span className="font-serif text-5xl font-bold tracking-tight uppercase text-[#FFE600]">
                  {brand.name}
                </span>
                <span className="text-sm uppercase tracking-widest font-bold mt-2 bg-[#FF2A00] text-[#111111] inline-block px-2">
                  {brand.tagline}
                </span>
              </div>
            )}
            <p className="font-bold text-lg max-w-xs">
              {footer.note}
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-bold uppercase text-[#FFE600] mb-6 border-b-4 border-[#FF2A00] inline-block pb-1">Hours</h4>
            <ul className="space-y-4 font-bold text-lg">
              {visit.hours.map((h, i) => (
                <li key={i} className="flex justify-between max-w-[250px]">
                  <span>{h.day}</span>
                  <span className="text-[#FFE600]">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-bold uppercase text-[#FFE600] mb-6 border-b-4 border-[#FF2A00] inline-block pb-1">Location</h4>
            <p className="font-bold text-lg leading-relaxed mb-4">
              <span className="text-[#FF2A00]">{visit.areasLabel}</span><br />
              {visit.areas.join(", ")}<br /><br />
              {brand.address}
            </p>
            <a href={`mailto:${brand.email}`} className="text-[#FFE600] font-bold text-lg hover:text-[#FF2A00] transition-colors block mb-2 underline decoration-4 underline-offset-4">
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-[#FFE600] font-bold text-lg hover:text-[#FF2A00] transition-colors underline decoration-4 underline-offset-4">
              {brand.phone}
            </a>
          </div>

          <div>
            <h4 className="text-2xl font-bold uppercase text-[#FFE600] mb-6 border-b-4 border-[#FF2A00] inline-block pb-1">Links</h4>
            <ul className="space-y-4 font-bold text-lg">
              {navigation.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#FF2A00] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t-8 border-[#FF2A00] text-lg font-bold">
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <a href={social.instagramHref} className="bg-[#FFE600] text-[#111111] p-3 border-4 border-[#111111] hover:bg-[#FF2A00] hover:text-[#FFE600] hover:border-[#FFE600] transition-all">
              <InstagramLogo size={24} weight="bold" />
            </a>
            <a href={social.facebookHref} className="bg-[#FFE600] text-[#111111] p-3 border-4 border-[#111111] hover:bg-[#FF2A00] hover:text-[#FFE600] hover:border-[#FFE600] transition-all">
              <FacebookLogo size={24} weight="bold" />
            </a>
            <a href={social.tiktokHref} className="bg-[#FFE600] text-[#111111] p-3 border-4 border-[#111111] hover:bg-[#FF2A00] hover:text-[#FFE600] hover:border-[#FFE600] transition-all">
              <TiktokLogo size={24} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
