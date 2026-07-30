"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, List, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type HarborwellData = typeof editableData;

export default function HarborwellHomeHealthTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as HarborwellData;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const themeStyle = useMemo(
    () =>
      ({
        "--hw-lime": content.theme.colors.lime,
        "--hw-green": content.theme.colors.green,
        "--hw-green-dark": content.theme.colors.greenDark,
        "--hw-cream": content.theme.colors.cream,
        "--hw-white": content.theme.colors.white,
        "--hw-ink": content.theme.colors.ink,
        "--hw-line": content.theme.colors.line,
        "--hw-heading": content.theme.typography.heading,
        "--hw-body": content.theme.typography.body,
      }) as CSSProperties,
    [content.theme],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-hw-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -7% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [content]);

  return (
    <div ref={rootRef} className="harborwell-home-health" data-template-id="harborwell-home-health" style={themeStyle}>
      <a className="hw-skip" href="#hw-main">Skip to content</a>
      <header className="hw-header">
        <div className="hw-shell hw-nav">
          <a className="hw-logo" href="#hw-top"><strong>{content.brand.name}</strong><span>{content.brand.descriptor}</span></a>
          <nav className={menuOpen ? "hw-links is-open" : "hw-links"} aria-label="Primary navigation">
            {content.navigation.links.map((link) => <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          </nav>
          <a className="hw-button is-dark" href={content.navigation.buttonHref}>{content.navigation.buttonLabel}<ArrowRight aria-hidden="true" /></a>
          <button className="hw-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="hw-main">
        <section className="hw-hero" id="hw-top">
          <div className="hw-shell hw-hero-top">
            <p className="hw-eyebrow">{content.hero.eyebrow}</p>
            <div className="hw-hero-title-row">
              <h1>{content.hero.title}</h1>
              <div>
                <p>{content.hero.description}</p>
                <a className="hw-button is-dark" href={content.hero.buttonHref}>{content.hero.buttonLabel}<ArrowDown aria-hidden="true" /></a>
              </div>
            </div>
          </div>
          <div className="hw-shell hw-hero-image">
            <TemplateImage src={content.hero.image} alt={content.hero.imageAlt} width={1920} height={892} priority loading="eager" />
            <span>{content.brand.tagline}</span>
          </div>
        </section>

        <section className="hw-section hw-about" id="hw-about">
          <div className="hw-shell hw-about-grid">
            <figure data-hw-reveal><TemplateImage src={content.about.image} alt={content.about.imageAlt} width={754} height={762} loading="lazy" /></figure>
            <div data-hw-reveal>
              <p className="hw-eyebrow">{content.about.eyebrow}</p>
              <h2>{content.about.title}</h2>
              <p>{content.about.description}</p>
              <a className="hw-text-link" href={content.about.buttonHref}>{content.about.buttonLabel}<ArrowRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hw-shell hw-stats">
            {content.about.stats.map((stat) => <div key={stat.label} data-hw-reveal><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </section>

        <section className="hw-section hw-services" id="hw-services">
          <div className="hw-shell">
            <div className="hw-section-heading is-light" data-hw-reveal>
              <p className="hw-eyebrow">{content.services.eyebrow}</p><h2>{content.services.title}</h2><p>{content.services.description}</p>
            </div>
            <div className="hw-service-grid">
              {content.services.items.map((service) => (
                <article key={service.number} data-hw-reveal>
                  <span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p>
                  <a href={service.linkHref}>{service.linkLabel}<ArrowRight aria-hidden="true" /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="hw-section hw-focus">
          <div className="hw-shell">
            <div className="hw-section-heading" data-hw-reveal><p className="hw-eyebrow">{content.focus.eyebrow}</p><h2>{content.focus.title}</h2></div>
            <div className="hw-focus-grid">
              {content.focus.items.map((item, index) => <article key={item.title} data-hw-reveal><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="hw-section hw-approach" id="hw-approach">
          <div className="hw-shell">
            <div className="hw-section-heading" data-hw-reveal>
              <p className="hw-eyebrow">{content.approach.eyebrow}</p><h2>{content.approach.title}</h2>
            </div>
            <div className="hw-approach-grid">
              {content.approach.steps.map((step) => <article key={step.number} data-hw-reveal><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="hw-image-band">
          <TemplateImage src={content.imageBand.image} alt={content.imageBand.imageAlt} width={1920} height={892} loading="lazy" />
          <blockquote data-hw-reveal>{content.imageBand.quote}</blockquote>
        </section>

        <section className="hw-section hw-stories" id="hw-stories">
          <div className="hw-shell">
            <div className="hw-section-heading is-light" data-hw-reveal><p className="hw-eyebrow">{content.stories.eyebrow}</p><h2>{content.stories.title}</h2><p>{content.stories.description}</p></div>
            <div className="hw-story-grid">
              {content.stories.items.map((item) => <blockquote key={item.name} data-hw-reveal><p>“{item.quote}”</p><footer><strong>{item.name}</strong><span>{item.relationship}</span></footer></blockquote>)}
            </div>
          </div>
        </section>

        <section className="hw-partners">
          <div className="hw-shell">
            <p className="hw-eyebrow">{content.partners.eyebrow}</p><h2>{content.partners.title}</h2>
            <div>{content.partners.items.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        </section>

        <section className="hw-contact" id="hw-contact">
          <div className="hw-shell hw-contact-grid">
            <div data-hw-reveal>
              <p className="hw-eyebrow">{content.contact.eyebrow}</p><h2>{content.contact.title}</h2><p>{content.contact.description}</p>
              <address><a href={content.brand.phoneHref}>{content.brand.phone}</a><a href={content.brand.emailHref}>{content.brand.email}</a><span>{content.brand.address}</span></address>
            </div>
            <form data-hw-reveal onSubmit={(event) => event.preventDefault()}>
              <h3>{content.contact.formTitle}</h3>
              <label>{content.contact.fields.name}<input type="text" name="name" /></label>
              <label>{content.contact.fields.email}<input type="email" name="email" /></label>
              <label>{content.contact.fields.phone}<input type="tel" name="phone" /></label>
              <label>{content.contact.fields.message}<textarea name="message" rows={4} /></label>
              <button type="submit">{content.contact.buttonLabel}<ArrowRight aria-hidden="true" /></button>
            </form>
          </div>
        </section>
      </main>

      <footer className="hw-footer">
        <div className="hw-shell">
          <div className="hw-footer-top">
            <a className="hw-logo is-light" href="#hw-top"><strong>{content.brand.name}</strong><span>{content.brand.descriptor}</span></a>
            <div>{content.footer.socialLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div>
          </div>
          <div className="hw-footer-bottom"><span>{content.footer.copyright}</span><div>{content.footer.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</div></div>
        </div>
      </footer>
    </div>
  );
}
