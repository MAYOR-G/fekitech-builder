"use client";

import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Footer() {
  const { brand, footer } = useTemplateData();

  return (
    <footer id="reservations" className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="sushi-container px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-6xl text-white mb-8">Join us at the counter</h2>
          <p className="text-gray-400 mb-10 font-light">
            Due to our limited seating, reservations are highly recommended. 
            We release our seats on the 1st of every month.
          </p>
          <a href={`mailto:${brand?.email}`} className="sushi-btn sushi-btn-primary">
            Request Reservation
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left mb-16 border-t border-white/10 pt-16">
          <div>
            <h4 className="text-sm font-sans tracking-[0.2em] uppercase text-[var(--sushi-accent)] mb-6">Location</h4>
            <address className="not-italic text-gray-400 font-light">
              {brand?.address}
            </address>
          </div>
          
          <div>
            <h4 className="text-sm font-sans tracking-[0.2em] uppercase text-[var(--sushi-accent)] mb-6">Contact & Hours</h4>
            <p className="text-gray-400 font-light mb-2">{brand?.phone}</p>
            <p className="text-gray-400 font-light">{brand?.hours}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-sans tracking-[0.2em] uppercase text-[var(--sushi-accent)] mb-6">Connect</h4>
            <ul className="space-y-2">
              {footer?.social?.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 font-light hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="text-center text-xs text-gray-600 font-light tracking-widest uppercase pt-8 border-t border-white/5">
          {footer?.text}
        </div>
      </div>
    </footer>
  );
}
