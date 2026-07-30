"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type NorthlineData = typeof editableData;

function Action({
  href,
  label,
  tone = "accent",
}: {
  href: string;
  label: string;
  tone?: "accent" | "dark" | "light";
}) {
  return (
    <a className={`nl-action nl-action-${tone}`} href={href}>
      <span>{label}</span>
      <ArrowRight aria-hidden="true" weight="bold" />
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "nl-section-heading is-centered" : "nl-section-heading"} data-nl-reveal>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  );
}

export default function NorthlineGroomingTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as NorthlineData;
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const themeStyle = useMemo(
    () =>
      ({
        "--nl-page": content.theme.colors.page,
        "--nl-surface": content.theme.colors.surface,
        "--nl-ink": content.theme.colors.ink,
        "--nl-muted": content.theme.colors.muted,
        "--nl-accent": content.theme.colors.accent,
        "--nl-accent-soft": content.theme.colors.accentSoft,
        "--nl-light": content.theme.colors.light,
        "--nl-line": content.theme.colors.line,
        "--nl-heading-font": content.theme.typography.heading,
        "--nl-body-font": content.theme.typography.body,
      }) as CSSProperties,
    [content.theme],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-nl-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [content]);

  return (
    <div
      ref={rootRef}
      data-template-id="northline-grooming"
      className="northline-grooming"
      style={themeStyle}
    >
      <a className="nl-skip" href="#northline-content">Skip to content</a>

      <header className="nl-header">
        <div className="nl-container nl-nav">
          <a className="nl-logo" href="#northline-content" aria-label={`${content.brand.name} home`}>
            {content.brand.name}<span>{content.brand.mark}</span>
          </a>
          <nav className={menuOpen ? "nl-links is-open" : "nl-links"} aria-label="Primary navigation">
            {content.navigation.links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="nl-header-book" href={content.navigation.buttonHref}>
            {content.navigation.buttonLabel}
          </a>
          <button
            className="nl-menu"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="northline-content">
        <section className="nl-container nl-hero">
          <div className="nl-hero-copy" data-nl-reveal>
            <p className="nl-eyebrow">{content.hero.eyebrow}</p>
            <h1>{content.hero.title}</h1>
            <p className="nl-hero-description">{content.hero.description}</p>
            <div className="nl-actions">
              <Action href={content.hero.primaryHref} label={content.hero.primaryLabel} />
              <Action href={content.hero.secondaryHref} label={content.hero.secondaryLabel} tone="dark" />
            </div>
          </div>
          <div className="nl-hero-image" data-nl-reveal>
            <TemplateImage
              src={content.hero.image}
              alt={content.hero.imageAlt}
              width={1600}
              height={1067}
              priority
              loading="eager"
            />
            <span>{content.hero.imageNote}</span>
          </div>
        </section>

        <section className="nl-proof" aria-label="Studio standards">
          <div className="nl-container nl-proof-grid">
            {content.proof.map((item) => <p key={item}>{item}</p>)}
          </div>
        </section>

        <section className="nl-section nl-container nl-about" id="philosophy">
          <div className="nl-about-image" data-nl-reveal>
            <TemplateImage src={content.about.image} alt={content.about.imageAlt} width={1400} height={933} loading="lazy" />
          </div>
          <div className="nl-about-copy" data-nl-reveal>
            <p className="nl-eyebrow">{content.about.eyebrow}</p>
            <h2>{content.about.title}</h2>
            {content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <Action href={content.about.buttonHref} label={content.about.buttonLabel} tone="dark" />
          </div>
        </section>

        <section className="nl-services" id="services">
          <div className="nl-container">
            <div className="nl-services-heading" data-nl-reveal>
              <div>
                <p className="nl-eyebrow">{content.services.eyebrow}</p>
                <h2>{content.services.title}</h2>
              </div>
              <p>{content.services.description}</p>
            </div>
            <div className="nl-service-list">
              {content.services.items.map((service, index) => (
                <article className="nl-service-row" key={service.title} data-nl-reveal style={{ "--nl-order": index } as CSSProperties}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                  <strong>{service.price}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="nl-section nl-container" id="lookbook">
          <SectionHeading eyebrow={content.lookbook.eyebrow} title={content.lookbook.title} centered />
          <div className="nl-lookbook">
            {content.lookbook.images.map((image, index) => (
              <div className={`nl-lookbook-item nl-lookbook-item-${index + 1}`} key={image.src} data-nl-reveal>
                <TemplateImage src={image.src} alt={image.alt} width={1200} height={900} loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        <section className="nl-section nl-team-section" id="team">
          <div className="nl-container">
            <SectionHeading eyebrow={content.team.eyebrow} title={content.team.title} />
            <div className="nl-team-grid">
              {content.team.items.map((member) => (
                <article className="nl-team-card" key={member.name} data-nl-reveal>
                  <TemplateImage src={member.image} alt={member.imageAlt} width={900} height={1125} loading="lazy" />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="nl-section nl-container">
          <SectionHeading eyebrow={content.packages.eyebrow} title={content.packages.title} centered />
          <div className="nl-package-grid">
            {content.packages.items.map((item) => (
              <article className={item.featured ? "nl-package is-featured" : "nl-package"} key={item.name} data-nl-reveal>
                <h3>{item.name}</h3>
                <div className="nl-price"><strong>{item.price}</strong><span>{item.period}</span></div>
                <ul>
                  {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <Action href={item.buttonHref} label={item.buttonLabel} tone={item.featured ? "light" : "dark"} />
              </article>
            ))}
          </div>
        </section>

        <section className="nl-section nl-reviews">
          <div className="nl-container">
            <SectionHeading eyebrow={content.testimonials.eyebrow} title={content.testimonials.title} />
            <div className="nl-review-grid">
              {content.testimonials.items.map((item) => (
                <blockquote key={item.name} data-nl-reveal>
                  <p>“{item.quote}”</p>
                  <footer>{item.name}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="nl-section nl-container nl-faq" id="faq">
          <SectionHeading eyebrow={content.faq.eyebrow} title={content.faq.title} />
          <div>
            {content.faq.items.map((item, index) => (
              <details key={item.question} data-nl-reveal open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="nl-cta" id="book">
          <div className="nl-container" data-nl-reveal>
            <p className="nl-eyebrow">{content.cta.eyebrow}</p>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.description}</p>
            <Action href={content.cta.buttonHref} label={content.cta.buttonLabel} />
          </div>
        </section>
      </main>

      <footer className="nl-footer">
        <div className="nl-container">
          <div className="nl-footer-grid">
            <div>
              <a className="nl-logo" href="#northline-content">{content.brand.name}<span>{content.brand.mark}</span></a>
              <p>{content.footer.description}</p>
            </div>
            <div>
              <h2>Visit</h2>
              <p>{content.brand.address}</p>
              {content.footer.hours.map((item) => <p key={item}>{item}</p>)}
            </div>
            <div>
              <h2>Contact</h2>
              <a href={content.brand.phoneHref}>{content.brand.phone}</a>
              <a href={content.brand.emailHref}>{content.brand.email}</a>
              {content.footer.socialLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
            </div>
          </div>
          <div className="nl-footer-bottom">
            <p>{content.footer.copyright}</p>
            <div>{content.footer.legalLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
