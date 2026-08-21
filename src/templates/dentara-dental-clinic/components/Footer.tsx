"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook, Twitter } from "lucide-react";

export function Footer() {
  const data = useTemplateData();

  return (
    <footer className="bg-[#052927] text-white pt-16 pb-12 border-t border-[#0b3d3a]">
      <div className="dentara-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#home" className="flex items-center gap-3 mb-6 text-decoration-none group">
              <div className="w-10 h-10 rounded-xl bg-[#0454ff] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 3.5 1.5 7 3 11 1 2.5 2 3 3 3s2-.5 3-3c1.5-4 3-7.5 3-11 0-3.5-2.5-6-6-6z" />
                  <path d="M9 9c1 1.5 2 2 3 2s2-.5 3-2" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span
                  className="text-xl font-bold text-white tracking-tight font-heading leading-tight"
                  data-editable-path="brand.name"
                  data-editable-type="text"
                >
                  {data.brand.name}
                </span>
                <span
                  className="text-xs text-[#dbeae9]/70 font-medium tracking-wide uppercase"
                  data-editable-path="brand.tagline"
                  data-editable-type="text"
                >
                  {data.brand.tagline}
                </span>
              </div>
            </a>

            <p
              className="text-sm text-[#dbeae9]/80 leading-relaxed mb-6 max-w-sm"
              data-editable-path="footer.description"
              data-editable-type="text"
            >
              {data.footer.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0454ff] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0454ff] flex items-center justify-center text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0454ff] flex items-center justify-center text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#social"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#0454ff] flex items-center justify-center text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 sm:col-span-1">
            <h4
              className="text-sm font-bold text-white uppercase tracking-wider mb-5 font-heading"
              data-editable-path="footer.quickLinksTitle"
              data-editable-type="text"
            >
              {data.footer.quickLinksTitle}
            </h4>
            <ul className="space-y-3">
              {data.footer.quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm text-[#dbeae9]/75 hover:text-white transition-colors"
                    data-editable-path={`footer.quickLinks.${idx}.label`}
                    data-editable-type="link"
                    data-editable-href-path={`footer.quickLinks.${idx}.href`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments Column */}
          <div className="lg:col-span-3 sm:col-span-1">
            <h4
              className="text-sm font-bold text-white uppercase tracking-wider mb-5 font-heading"
              data-editable-path="footer.treatmentsTitle"
              data-editable-type="text"
            >
              {data.footer.treatmentsTitle}
            </h4>
            <ul className="space-y-3">
              {data.footer.treatments.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="text-sm text-[#dbeae9]/75 hover:text-white transition-colors"
                    data-editable-path={`footer.treatments.${idx}.label`}
                    data-editable-type="link"
                    data-editable-href-path={`footer.treatments.${idx}.href`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Clinic Column */}
          <div className="lg:col-span-3">
            <h4
              className="text-sm font-bold text-white uppercase tracking-wider mb-5 font-heading"
              data-editable-path="footer.contactTitle"
              data-editable-type="text"
            >
              {data.footer.contactTitle}
            </h4>
            <ul className="space-y-3.5 text-sm text-[#dbeae9]/85">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0454ff] flex-shrink-0 mt-0.5" />
                <span
                  data-editable-path="brand.address"
                  data-editable-type="text"
                >
                  {data.brand.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#0454ff] flex-shrink-0" />
                <a
                  href={data.brand.phoneHref}
                  className="hover:text-white transition-colors"
                  data-editable-path="brand.phone"
                  data-editable-type="link"
                  data-editable-href-path="brand.phoneHref"
                >
                  {data.brand.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0454ff] flex-shrink-0" />
                <a
                  href={data.brand.emailHref}
                  className="hover:text-white transition-colors truncate"
                  data-editable-path="brand.email"
                  data-editable-type="link"
                  data-editable-href-path="brand.emailHref"
                >
                  {data.brand.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#dbeae9]/60">
          <p
            data-editable-path="footer.copyright"
            data-editable-type="text"
          >
            {data.footer.copyright}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#privacy"
              className="hover:text-white transition-colors"
              data-editable-path="footer.privacy"
              data-editable-type="text"
            >
              {data.footer.privacy}
            </a>
            <a
              href="#terms"
              className="hover:text-white transition-colors"
              data-editable-path="footer.terms"
              data-editable-type="text"
            >
              {data.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
