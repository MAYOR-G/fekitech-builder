"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { ArrowRight, Star } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Hero() {
  const { brand, contactHighlights } = useTemplateData();

  return (
    <section id="top" className="relative min-h-screen bg-cream flex flex-col">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/45 to-transparent z-10 pointer-events-none" />
      
      <div className="flex-1 grid lg:grid-cols-2 relative z-0">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16 xl:px-24">
          <div className="max-w-2xl animate-rise">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-[1px] w-8 bg-rose/40" />
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.35em] text-rose/90">
                Studio & Patisserie
              </p>
            </div>
            
            <h1 className="font-display text-5xl font-normal leading-[1.05] tracking-tight text-ganache sm:text-6xl xl:text-[5.5rem]">
              Celebrations, <br />
              <span className="italic text-chocolate/80">composed.</span>
            </h1>
            
            <p className="mt-8 text-[1.05rem] leading-[1.85] tracking-wide text-chocolate/75 max-w-xl">
              {brand.name} creates sculpted wedding cakes, elegant birthday
              centrepieces, and dessert curations with careful flavour
              planning, beautiful finishing, and calm order guidance.
            </p>
            
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="#order" className="group flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase font-bold bg-ganache text-cream hover:bg-chocolate transition-all duration-300">
                Request a Custom Cake
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="#gallery" variant="secondary" className="px-8 py-4 text-sm tracking-[0.1em] uppercase font-bold border-chocolate/20 text-ganache hover:border-chocolate/40 hover:bg-white/50 transition-all duration-300">
                View Gallery
              </ButtonLink>
            </div>
            
            <div className="mt-20 pt-10 border-t border-chocolate/10 flex flex-wrap gap-x-8 gap-y-4">
              {contactHighlights.slice(0, 3).map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-white/60 shadow-sm border border-chocolate/5">
                      <Icon className="h-3.5 w-3.5 text-rose" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.15em] text-ganache/80">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Image / Editorial Frame */}
        <div className="relative hidden lg:block overflow-hidden bg-chantilly">
          <div className="absolute inset-0 bg-ganache-depth opacity-5 mix-blend-multiply pointer-events-none z-10" />
          
          <TemplateImage
            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=1400&q=90"
            alt="Beautifully crafted wedding cake"
            className="absolute inset-0 w-full h-full object-cover object-center animate-rise scale-105"
            style={{ animationDuration: '2s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          />

          <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md px-6 py-5 rounded-sm shadow-2xl border border-white/20 max-w-xs animate-rise" style={{ animationDelay: '600ms' }}>
            <div className="flex text-champagne mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="font-display text-lg leading-snug text-ganache mb-2">
              &quot;The finish was flawless, and the flavour was entirely unforgettable.&quot;
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-chocolate/60">
              — Isabelle M., Bride
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
