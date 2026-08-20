"use client";
import React from "react";
import { useTemplateData } from "../TemplateContext";

export function Footer() {
  const data = useTemplateData();
  const half = Math.ceil(data.footer.links.length / 2);
  const col1 = data.footer.links.slice(0, half);
  const col2 = data.footer.links.slice(half);

  return (
    <footer className="fp-footer">
      <div className="fp-footer-inner">
        <div className="fp-footer-brand">{data.footer.brandName}</div>

        <div className="fp-footer-grid">
          <div>
            <p className="fp-footer-desc">{data.footer.description}</p>
          </div>
          <div className="fp-footer-links">
            <h4>Quick Links</h4>
            <ul>
              {col1.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="fp-footer-links">
            <h4>More</h4>
            <ul>
              {col2.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fp-footer-bottom">
          <span className="fp-footer-copyright">{data.footer.copyright}</span>
          <div className="fp-footer-socials">
            {data.footer.socials.instagram && (
              <a href={data.footer.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                📷
              </a>
            )}
            {data.footer.socials.facebook && (
              <a href={data.footer.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                📘
              </a>
            )}
            {data.footer.socials.twitter && (
              <a href={data.footer.socials.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                🐦
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
