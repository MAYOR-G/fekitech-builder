import React from "react";
import { useTemplateData } from "../TemplateContext";
import { List, MagnifyingGlass, ShoppingCart } from "@phosphor-icons/react";

export default function Header() {
  const data = useTemplateData();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 text-white p-4 md:px-8 py-6 flex items-center justify-between">
      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wider uppercase">
        {data.navigation.links.slice(0, 3).map((link, idx) => (
          <a key={idx} href={link.href} className="hover:text-[var(--color-primary)] transition-colors duration-300">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center justify-center">
        {/* Brand/Logo */}
        <div className="bg-white rounded-full p-4 shadow-lg border-[3px] border-[var(--color-primary)] flex items-center justify-center w-24 h-24 md:w-32 md:h-32 -mt-4 md:-mt-8 z-50 relative group">
          <div className="absolute inset-0 rounded-full border border-dashed border-[var(--color-secondary)] m-1 opacity-50 group-hover:rotate-180 transition-transform duration-1000"></div>
          {data.brand.logo ? (
            <img src={data.brand.logo} alt={data.brand.name} className="w-full h-full object-contain relative z-10" />
          ) : (
            <div className="text-center relative z-10 leading-tight">
              <span className="font-pacifico text-2xl md:text-3xl text-[var(--color-text)] block">{data.brand.name.split(" ")[0]}</span>
              <span className="font-nunito text-[0.6rem] md:text-xs text-[var(--color-secondary)] uppercase tracking-widest font-bold">
                {data.brand.name.split(" ").slice(1).join(" ")}
              </span>
            </div>
          )}
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-6 text-sm font-semibold tracking-wider uppercase">
        {data.navigation.links.slice(3).map((link, idx) => (
          <a key={idx} href={link.href} className="hover:text-[var(--color-primary)] transition-colors duration-300">
            {link.label}
          </a>
        ))}
        <button aria-label="Search" className="hover:text-[var(--color-primary)] transition-colors">
          <MagnifyingGlass size={20} weight="bold" />
        </button>
        <button aria-label="Cart" className="hover:text-[var(--color-primary)] transition-colors">
          <ShoppingCart size={20} weight="bold" />
        </button>
      </nav>

      <button className="md:hidden text-white hover:text-[var(--color-primary)]">
        <List size={28} weight="bold" />
      </button>
    </header>
  );
}
