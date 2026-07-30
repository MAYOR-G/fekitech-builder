"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type VerdantData = typeof editableData;

function Button({ href, label, tone = "green" }: { href: string; label: string; tone?: "green" | "outline" | "light" }) {
  return (
    <a className={`vh-button vh-button-${tone}`} href={href}>
      {label}<ArrowRight aria-hidden="true" weight="bold" />
    </a>
  );
}

function Heading({ eyebrow, title, align = "left" }: { eyebrow: string; title: string; align?: "left" | "center" }) {
  return (
    <div className={`vh-heading vh-heading-${align}`} data-vh-reveal>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

export default function VerdantHouseGroomingTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as VerdantData;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const themeStyle = useMemo(() => ({
    "--vh-page": content.theme.colors.page,
    "--vh-surface": content.theme.colors.surface,
    "--vh-ink": content.theme.colors.ink,
    "--vh-muted": content.theme.colors.muted,
    "--vh-accent": content.theme.colors.accent,
    "--vh-champagne": content.theme.colors.champagne,
    "--vh-white": content.theme.colors.white,
    "--vh-line": content.theme.colors.line,
    "--vh-heading-font": content.theme.typography.heading,
    "--vh-body-font": content.theme.typography.body
  }) as CSSProperties, [content.theme]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = [...root.querySelectorAll<HTMLElement>("[data-vh-reveal]")];
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content]);

  return (
    <div ref={rootRef} data-template-id="verdant-house-grooming" className="verdant-house-grooming" style={themeStyle}>
      <a className="vh-skip" href="#verdant-content">Skip to content</a>
      <header className="vh-header">
        <div className="vh-container vh-nav">
          <a className="vh-logo" href="#verdant-content">{content.brand.name}</a>
          <nav className={menuOpen ? "vh-nav-links is-open" : "vh-nav-links"} aria-label="Primary navigation">
            {content.navigation.links.map((link) => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          </nav>
          <a className="vh-header-button" href={content.navigation.buttonHref}>{content.navigation.buttonLabel}</a>
          <button className="vh-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="verdant-content">
        <section className="vh-hero">
          <div className="vh-container vh-hero-grid">
            <div className="vh-hero-copy" data-vh-reveal>
              <p className="vh-eyebrow">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="vh-hero-description">{content.hero.description}</p>
              <div className="vh-actions">
                <Button href={content.hero.primaryHref} label={content.hero.primaryLabel} />
                <Button href={content.hero.secondaryHref} label={content.hero.secondaryLabel} tone="outline" />
              </div>
            </div>
            <div className="vh-hero-image" data-vh-reveal>
              <TemplateImage src={content.hero.image} alt={content.hero.imageAlt} width={1000} height={1498} priority loading="eager" />
              <span>{content.hero.imageNote}</span>
            </div>
          </div>
        </section>

        <section className="vh-promise" aria-label="Studio promises">
          <div className="vh-container vh-promise-grid">
            {content.promise.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>

        <section className="vh-section vh-container vh-about" id="about">
          <div className="vh-about-images" data-vh-reveal>
            <TemplateImage className="vh-about-main" src={content.about.mainImage} alt={content.about.mainImageAlt} width={1400} height={933} loading="lazy" />
            <TemplateImage className="vh-about-detail" src={content.about.detailImage} alt={content.about.detailImageAlt} width={1000} height={667} loading="lazy" />
          </div>
          <div className="vh-about-copy" data-vh-reveal>
            <p className="vh-eyebrow">{content.about.eyebrow}</p>
            <h2>{content.about.title}</h2>
            {content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <Button href={content.about.buttonHref} label={content.about.buttonLabel} tone="outline" />
          </div>
        </section>

        <section className="vh-section vh-services" id="services">
          <div className="vh-container">
            <Heading eyebrow={content.services.eyebrow} title={content.services.title} align="center" />
            <div className="vh-service-list">
              {content.services.items.map((item) => (
                <article className="vh-service-row" key={item.title} data-vh-reveal>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                  <strong>{item.price}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vh-section vh-container" id="lookbook">
          <Heading eyebrow={content.lookbook.eyebrow} title={content.lookbook.title} align="center" />
          <div className="vh-lookbook">
            {content.lookbook.images.map((image) => (
              <div key={image.src} data-vh-reveal><TemplateImage src={image.src} alt={image.alt} width={1200} height={1500} loading="lazy" /></div>
            ))}
          </div>
        </section>

        <section className="vh-studio">
          <TemplateImage src={content.studio.image} alt={content.studio.imageAlt} width={1400} height={933} loading="lazy" />
          <div className="vh-studio-copy" data-vh-reveal>
            <p className="vh-eyebrow">{content.studio.eyebrow}</p>
            <h2>{content.studio.title}</h2>
            <p>{content.studio.description}</p>
          </div>
        </section>

        <section className="vh-section vh-container" id="team">
          <Heading eyebrow={content.team.eyebrow} title={content.team.title} align="center" />
          <div className="vh-team-grid">
            {content.team.items.map((member) => (
              <article key={member.name} data-vh-reveal>
                <TemplateImage src={member.image} alt={member.imageAlt} width={900} height={1200} loading="lazy" />
                <h3>{member.name}</h3><p>{member.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="vh-section vh-packages">
          <div className="vh-container">
            <Heading eyebrow={content.packages.eyebrow} title={content.packages.title} align="center" />
            <div className="vh-package-grid">
              {content.packages.items.map((item) => (
                <article className={item.featured ? "vh-package is-featured" : "vh-package"} key={item.name} data-vh-reveal>
                  <h3>{item.name}</h3><strong>{item.price}</strong>
                  <ul>{item.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
                  <Button href={item.buttonHref} label={item.buttonLabel} tone={item.featured ? "light" : "outline"} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vh-section vh-container">
          <Heading eyebrow={content.testimonials.eyebrow} title={content.testimonials.title} align="center" />
          <div className="vh-testimonial-grid">
            {content.testimonials.items.map((item) => <blockquote key={item.name} data-vh-reveal><p>“{item.quote}”</p><footer>{item.name}</footer></blockquote>)}
          </div>
        </section>

        <section className="vh-section vh-container vh-faq" id="faq">
          <Heading eyebrow={content.faq.eyebrow} title={content.faq.title} align="center" />
          <div>
            {content.faq.items.map((item, index) => <details key={item.question} open={index === 0} data-vh-reveal><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </section>

        <section className="vh-section vh-cta" id="book">
          <div className="vh-container" data-vh-reveal>
            <p className="vh-eyebrow">{content.cta.eyebrow}</p>
            <h2>{content.cta.title}</h2>
            <Button href={content.cta.buttonHref} label={content.cta.buttonLabel} />
          </div>
        </section>
      </main>

      <footer className="vh-footer">
        <div className="vh-container">
          <div className="vh-footer-grid">
            <div><a className="vh-logo" href="#verdant-content">{content.brand.name}</a><p>{content.brand.description}</p></div>
            <div><h2>Visit</h2><p>{content.brand.address}</p></div>
            <div><h2>Contact</h2><a href={content.brand.emailHref}>{content.brand.email}</a><a href={content.brand.phoneHref}>{content.brand.phone}</a>{content.footer.socialLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}</div>
            <div><h2>Hours</h2>{content.footer.hours.map((item) => <p key={item}>{item}</p>)}</div>
          </div>
          <div className="vh-footer-bottom"><p>{content.footer.copyright}</p><div>{content.footer.legalLinks.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}</div></div>
        </div>
      </footer>
    </div>
  );
}
