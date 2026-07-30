"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Drop, List, MapPin, Scissors, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type AshBridleData = typeof editableData;

export default function AshBridleBarbersTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as AshBridleData;
  const [activeService, setActiveService] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const themeStyle = useMemo(
    () =>
      ({
        "--ab-page": content.theme.colors.page,
        "--ab-surface": content.theme.colors.surface,
        "--ab-ink": content.theme.colors.ink,
        "--ab-accent": content.theme.colors.accent,
        "--ab-light": content.theme.colors.light,
        "--ab-line": content.theme.colors.line,
        "--ab-heading": content.theme.typography.heading,
        "--ab-body": content.theme.typography.body,
      }) as CSSProperties,
    [content.theme],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-ab-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
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
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content]);

  return (
    <div ref={rootRef} className="ash-bridle-barbers" data-template-id="ash-bridle-barbers" style={themeStyle}>
      <a className="ab-skip" href="#ab-content">Skip to content</a>

      <nav className="ab-floating-nav" aria-label="Primary navigation">
        <a className="ab-mark" href="#ab-content" aria-label={`${content.brand.name} home`}>{content.brand.mark}</a>
        <div className={menuOpen ? "ab-nav-links is-open" : "ab-nav-links"}>
          {content.navigation.links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </div>
        <a className="ab-book-link" href={content.navigation.buttonHref}>{content.navigation.buttonLabel}</a>
        <button
          className="ab-menu"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </nav>

      <main id="ab-content">
        <section className="ab-hero">
          <div className="ab-shell ab-hero-grid">
            <div className="ab-hero-copy">
              <h1>
                <span>{content.hero.titleLineOne}</span>
                <span className="ab-hero-accent">
                  <em>{content.hero.titleLineTwo}</em>
                  <span className="ab-detail-image">
                    <TemplateImage src={content.hero.detailImage} alt={content.hero.detailImageAlt} width={360} height={220} priority />
                  </span>
                </span>
              </h1>
              <p data-ab-reveal>{content.hero.description}</p>
              <a className="ab-pill-button" href={content.hero.buttonHref} data-ab-reveal>
                {content.hero.buttonLabel}<ArrowRight aria-hidden="true" weight="bold" />
              </a>
            </div>
            <div className="ab-hero-image">
              <TemplateImage src={content.hero.image} alt={content.hero.imageAlt} width={1000} height={1400} priority loading="eager" />
              <span aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="ab-philosophy" id="ab-philosophy">
          <div className="ab-philosophy-inner">
            <p className="ab-eyebrow" data-ab-reveal>{content.philosophy.eyebrow}</p>
            <p className="ab-philosophy-statement" data-ab-reveal>{content.philosophy.statement}</p>
          </div>
        </section>

        <section className="ab-services" id="ab-services">
          <div className="ab-shell">
            <div className="ab-section-intro" data-ab-reveal>
              <div>
                <p className="ab-eyebrow">{content.services.eyebrow}</p>
                <h2>{content.services.title}</h2>
              </div>
              <p>{content.services.description}</p>
            </div>

            <div className="ab-service-panels">
              {content.services.items.map((service, index) => {
                const active = activeService === index;
                return (
                  <article className={active ? "ab-service is-active" : "ab-service"} key={service.title}>
                    <button
                      type="button"
                      aria-expanded={active}
                      onClick={() => setActiveService(index)}
                      aria-label={`Show ${service.title}`}
                    >
                      {active && (
                        <span className="ab-service-image" aria-hidden="true">
                          <TemplateImage src={service.image} alt="" width={900} height={1200} loading="lazy" />
                        </span>
                      )}
                      <span className="ab-service-shade" aria-hidden="true" />
                      <span className="ab-service-icon">
                        {service.icon === "drop" ? <Drop aria-hidden="true" /> : <Scissors aria-hidden="true" />}
                      </span>
                      <span className="ab-service-copy">
                        <span className="ab-service-title-row">
                          <strong>{service.title}</strong>
                          <b>{service.price}</b>
                        </span>
                        <span className="ab-service-description">{service.description}</span>
                      </span>
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="ab-lookbook" id="ab-lookbook">
          <div className="ab-lookbook-shell">
            <h2 data-ab-reveal>{content.lookbook.title}</h2>
            <div className="ab-bento">
              {content.lookbook.images.map((image, index) => (
                <figure className={`ab-tile ab-tile-${index + 1}`} key={image.src} data-ab-reveal>
                  <TemplateImage src={image.src} alt={image.alt} width={1200} height={900} loading="lazy" />
                </figure>
              ))}
              <blockquote className="ab-bento-quote" data-ab-reveal>{content.lookbook.quote}</blockquote>
            </div>
          </div>
        </section>
      </main>

      <footer className="ab-footer" id="ab-book">
        <div className="ab-shell">
          <div className="ab-booking-grid">
            <div data-ab-reveal>
              <h2>{content.booking.title}<br /><em>{content.booking.titleAccent}</em></h2>
              <p>{content.booking.description}</p>
              <a className="ab-pill-button is-light" href={content.booking.buttonHref}>
                {content.booking.buttonLabel}<ArrowRight aria-hidden="true" weight="bold" />
              </a>
            </div>
            <div className="ab-location-card" data-ab-reveal>
              <div className="ab-address">
                <MapPin aria-hidden="true" />
                <div>
                  <h3>{content.brand.studioLabel}</h3>
                  <p>{content.brand.addressLines.map((line) => <span key={line}>{line}</span>)}</p>
                  <a href={content.brand.phoneHref}>{content.brand.phone}</a>
                  <a href={content.brand.emailHref}>{content.brand.email}</a>
                </div>
              </div>
              <div className="ab-hours">
                {content.booking.hours.map((row) => (
                  <p key={row.days}><span>{row.days}</span><strong>{row.time}</strong></p>
                ))}
              </div>
            </div>
          </div>
          <div className="ab-footer-bottom">
            <span>{content.footer.copyright}</span>
            <div>{content.footer.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
