import React from "react";
import { useTemplateData } from "../TemplateContext";
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react";

export default function Footer() {
  const { brand, social, footer, navigation, visit, colors } = useTemplateData();

  return (
    <footer className="pt-32 pb-12 rounded-t-[3rem]" style={{ backgroundColor: colors.secondary, color: colors.text }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="font-serif text-5xl md:text-6xl mb-8 font-medium">{visit.title}</h2>
          <p className="max-w-xl mx-auto font-light text-lg mb-10" style={{ color: `${colors.text}b3` }}>
            {visit.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href={visit.primaryHref}
              className="px-10 py-4 text-white text-[12px] font-medium uppercase tracking-[0.15em] transition-colors rounded-full"
              style={{ backgroundColor: colors.primary }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.text}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
            >
              {visit.primaryLabel}
            </a>
            <a
              href={visit.secondaryHref}
              className="px-10 py-4 bg-transparent border text-[12px] font-medium uppercase tracking-[0.15em] transition-colors rounded-full"
              style={{ borderColor: `${colors.text}33`, color: colors.text }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = colors.text}
              onMouseOut={(e) => e.currentTarget.style.borderColor = `${colors.text}33`}
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
                <span className="font-serif text-3xl font-medium tracking-wide">
                  {brand.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] mt-1" style={{ color: `${colors.text}80` }}>
                  {brand.tagline}
                </span>
              </div>
            )}
            <p className="font-light text-sm max-w-xs leading-relaxed" style={{ color: `${colors.text}b3` }}>
              {footer.note}
            </p>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Hours</h4>
            <ul className="space-y-3 font-light text-sm" style={{ color: `${colors.text}b3` }}>
              {visit.hours.map((h: any, i: number) => (
                <li key={i} className="flex justify-between max-w-[200px]">
                  <span>{h.day}</span>
                  <span className="font-medium" style={{ color: colors.text }}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Location</h4>
            <p className="font-light text-sm leading-relaxed mb-4" style={{ color: `${colors.text}b3` }}>
              {visit.areasLabel}<br />
              <span className="font-medium" style={{ color: colors.text }}>{visit.areas.join(", ")}</span><br />
              {brand.address}
            </p>
            <a href={`mailto:${brand.email}`} className="font-medium text-sm transition-colors block mb-2" style={{ color: colors.primary }} onMouseOver={(e) => e.currentTarget.style.color = colors.text} onMouseOut={(e) => e.currentTarget.style.color = colors.primary}>
              {brand.email}
            </a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="font-medium text-sm transition-colors" style={{ color: colors.primary }} onMouseOver={(e) => e.currentTarget.style.color = colors.text} onMouseOut={(e) => e.currentTarget.style.color = colors.primary}>
              {brand.phone}
            </a>
          </div>

          <div>
            <h4 className="font-serif text-xl mb-6">Navigation</h4>
            <ul className="space-y-3 font-light text-sm" style={{ color: `${colors.text}b3` }}>
              {navigation.links.map((link: any) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors" onMouseOver={(e) => e.currentTarget.style.color = colors.primary} onMouseOut={(e) => e.currentTarget.style.color = ''}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t text-xs" style={{ borderColor: `${colors.text}1a`, color: `${colors.text}b3` }}>
          <p>{footer.copyright}</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {[ 
              { icon: InstagramLogo, href: social.instagramHref },
              { icon: FacebookLogo, href: social.facebookHref },
              { icon: TiktokLogo, href: social.tiktokHref }
            ].map((socialItem, i) => (
              <a 
                key={i} 
                href={socialItem.href} 
                className="w-8 h-8 rounded-full border flex items-center justify-center transition-all"
                style={{ borderColor: `${colors.text}33` }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = colors.text;
                  e.currentTarget.style.borderColor = `${colors.text}33`;
                }}
              >
                <socialItem.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
