import React from "react";
import { useTemplateData } from "../TemplateContext";
import { FacebookLogo, InstagramLogo, TwitterLogo } from "@phosphor-icons/react";

export default function Footer() {
  const data = useTemplateData();

  return (
    <footer className="bg-[#433b3a] text-white pt-20 pb-10 relative z-0">
      <div className="container mx-auto px-4 max-w-6xl text-center">
        
        <div className="flex justify-center items-center gap-4 mb-8">
          <a href={data.footer.social.facebook} aria-label="Facebook" className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-300">
            <FacebookLogo size={20} weight="fill" />
          </a>
          <a href={data.footer.social.instagram} aria-label="Instagram" className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-300">
            <InstagramLogo size={20} weight="fill" />
          </a>
          <a href={data.footer.social.twitter} aria-label="Twitter" className="w-10 h-10 rounded-full bg-[var(--color-secondary)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:scale-110 transition-all duration-300">
            <TwitterLogo size={20} weight="fill" />
          </a>
        </div>

        <p className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
          {data.footer.copyright}
        </p>
      </div>

      {/* Decorative wavy bottom border using a CSS pattern or simple svg */}
      <div className="absolute bottom-0 left-0 right-0 h-4 w-full overflow-hidden opacity-50 mix-blend-overlay">
        <svg viewBox="0 0 100 10" preserveAspectRatio="none" className="w-full h-full text-black" fill="currentColor">
          <path d="M0 10 V5 Q12.5 0 25 5 T50 5 T75 5 T100 5 V10 Z" />
        </svg>
      </div>
    </footer>
  );
}
