"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Footer() {
  const { brand, footer } = useTemplateData();

  return (
    <footer id="apply" className="bg-[var(--fit-accent)] text-black pt-24 pb-12">
      <div className="fit-container px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-6xl md:text-8xl mb-8 uppercase leading-[0.9]">
            Take the first step towards excellence
          </h2>
          <a href={`mailto:${brand?.email}`} className="inline-block bg-black text-white font-sans font-bold text-lg uppercase tracking-widest px-10 py-5 hover:bg-gray-900 transition-colors rounded-sm">
            Apply Now
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 border-t border-black/20 pt-16 font-medium">
          <div>
            <h4 className="text-sm font-sans font-bold tracking-widest uppercase mb-4 text-black/50">Contact</h4>
            <p>{brand?.email}</p>
            <p>{brand?.phone}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-sans font-bold tracking-widest uppercase mb-4 text-black/50">Location</h4>
            <address className="not-italic">
              {brand?.address}
            </address>
          </div>
          
          <div>
            <h4 className="text-sm font-sans font-bold tracking-widest uppercase mb-4 text-black/50">Follow</h4>
            <ul className="flex gap-6">
              {footer?.social?.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:opacity-60 transition-opacity font-bold">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-20 text-sm font-bold tracking-widest uppercase text-black/40 text-center">
          © {new Date().getFullYear()} {footer?.text} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
