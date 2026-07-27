"use client";

import { useState } from "react";
import { useTemplateData } from "../TemplateContext";

type HeaderProps = {
  currentPage: string;
  onNavigate: (page: string) => void;
};

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { brand, navigation, footer } = useTemplateData();
  const [open, setOpen] = useState(false);
  const logoText = typeof brand.logoText === "string" && brand.logoText.trim() ? brand.logoText : brand.name;

  return (
    <header className="vs-header">
      <div className="vs-topbar">
        <p>{brand.topBar}</p>
        <div className="vs-social-mini" aria-label="Social links">
          {footer.social.map((link) => (
            <a key={link.label} href={link.href} aria-label={link.label}>
              {link.label === "Instagram" ? "ig" : link.label.charAt(0).toLowerCase()}
            </a>
          ))}
        </div>
      </div>
      <div className="vs-nav-shell">
        <nav className="vs-nav" aria-label="Main navigation">
          <div className="vs-nav-links" data-open={open}>
            {navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={currentPage === link.page ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setOpen(false);
                  onNavigate(link.page);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            className="vs-logo"
            href="#/"
            aria-label={`${brand.name} homepage`}
            onClick={(event) => {
              event.preventDefault();
              setOpen(false);
              onNavigate("home");
            }}
          >
            <span>{logoText}</span>
          </a>

          <div className="vs-login">
            <span aria-hidden="true" className="vs-login-dot" />
            <a href="#login">{navigation.loginLabel}</a>
          </div>

          <button
            className="vs-menu-button"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>
    </header>
  );
}
