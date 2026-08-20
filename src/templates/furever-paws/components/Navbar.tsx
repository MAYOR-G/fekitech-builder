"use client";
import React, { useState } from "react";
import { useTemplateData } from "../TemplateContext";

export function Navbar() {
  const data = useTemplateData();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fp-navbar">
      <div className="fp-navbar-inner">
        <a href="#" className="fp-logo">
          <span className="fp-logo-paw">🐾</span>
          {data.brand.name}
        </a>

        <ul className={`fp-nav-links ${open ? "fp-open" : ""}`}>
          {data.navLinks.map((link, i) => (
            <li key={i}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href={data.hero.primaryCta.href} className="fp-nav-cta" onClick={() => setOpen(false)}>
              {data.hero.primaryCta.label}
            </a>
          </li>
        </ul>

        <button
          className="fp-mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
