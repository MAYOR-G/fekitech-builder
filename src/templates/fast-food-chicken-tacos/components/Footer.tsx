import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Footer() {
  const { brand, social, footer, navigation, visit, colors } = useTemplateData();

  return (
    <footer className="w-full pt-24 pb-12 px-6 md:px-12 flex flex-col" style={{ backgroundColor: colors.secondary, color: colors.text }}>
      <div className="max-w-4xl mb-24">
        <h2 className="font-serif text-[10vw] md:text-[6vw] leading-[0.9] tracking-tighter font-medium mb-8">
          {footer.title ? footer.title.split(' ').map((word: string, i: number) => (
            <React.Fragment key={i}>
              {word}
              {i === 1 ? <br /> : " "}
            </React.Fragment>
          )) : "Join The Neighborhood"}
        </h2>
        <p className="font-sans text-xl md:text-2xl font-light italic opacity-90 max-w-2xl mb-12">
          {footer.description}
        </p>

        <form className="max-w-md flex flex-col gap-4">
          <label className="text-sm font-semibold uppercase tracking-widest opacity-80">Email *</label>
          <div className="flex gap-2">
            <input 
              type="email" 
              className="flex-1 bg-transparent border-b border-[#3D2721] pb-2 focus:outline-none placeholder:text-[#3D2721]/50 text-lg"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" id="newsletter" className="accent-[#3D2721]" />
            <label htmlFor="newsletter" className="text-sm opacity-80 cursor-pointer">Yes, subscribe to newsletter *</label>
          </div>
          <button 
            type="button"
            className="mt-4 self-start px-8 py-3 rounded-full font-serif font-bold transition-transform hover:scale-105"
            style={{ backgroundColor: colors.text, color: colors.primary }}
          >
            {footer.buttonLabel}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm pt-12 border-t border-[#3D2721]/20">
        <div>
          <ul className="flex flex-col gap-4">
            {navigation.links.slice(0, 3).map((link: any) => (
              <li key={link.label}><a href={link.href} className="hover:opacity-70 transition-opacity">{link.label}</a></li>
            ))}
          </ul>
          <div className="flex gap-4 mt-8">
            <a href={social.facebookHref} className="hover:opacity-70 transition-opacity"><span className="font-bold">Facebook</span></a>
            <a href={social.instagramHref} className="hover:opacity-70 transition-opacity"><span className="font-bold">Instagram</span></a>
            <a href={social.tiktokHref} className="hover:opacity-70 transition-opacity"><span className="font-bold">Tiktok</span></a>
          </div>
        </div>

        <div>
          <p className="mb-1">{brand.address}</p>
        </div>

        <div>
          <p className="mb-1"><a href={`mailto:${brand.email}`} className="hover:opacity-70">{brand.email}</a></p>
          <p><a href={`tel:${brand.phone}`} className="hover:opacity-70">{brand.phone}</a></p>
        </div>

        <div>
          <p className="mb-1 opacity-80">Privacy Policy</p>
          <p className="mb-1 opacity-80">Terms & Conditions</p>
          <p className="mb-8 opacity-80">Accessibility Statement</p>
          <p className="opacity-60">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
