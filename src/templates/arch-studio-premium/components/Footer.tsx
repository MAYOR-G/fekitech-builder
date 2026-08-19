"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Footer() {
  const { brand, footer } = useTemplateData();

  return (
    <footer id="contact" className="bg-[var(--arch-accent)] text-white pt-24 pb-12">
      <div className="arch-container px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="lg:col-span-2">
            <h2 className="text-4xl md:text-6xl mb-8 font-serif leading-tight">
              Ready to start<br />your project?
            </h2>
            <a href={`mailto:${brand?.email}`} className="text-xl md:text-2xl hover:opacity-80 transition-opacity">
              {brand?.email}
            </a>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Studio</h4>
            <address className="not-italic text-lg text-gray-200 mb-4">
              {brand?.address}
            </address>
            <p className="text-lg text-gray-200">
              {brand?.phone}
            </p>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-400 mb-6">Social</h4>
            <ul className="space-y-4">
              {footer?.social?.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-lg text-gray-200 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>{footer?.text}</p>
          <p>© {new Date().getFullYear()} {brand?.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
