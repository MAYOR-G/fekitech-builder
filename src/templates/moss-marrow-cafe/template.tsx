"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useEffect, useMemo, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type MossMarrowData = typeof editableData;
type PageId = "home" | "about" | "menu" | "contact" | "privacy" | "accessibility";

const pageTitles: Record<PageId, string> = {
  home: "Home",
  about: "Our Story",
  menu: "Menu",
  contact: "Contact",
  privacy: "Privacy Policy",
  accessibility: "Accessibility Statement",
};

function ArrowMark() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

export default function MossMarrowCafeTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as MossMarrowData;
  const [page, setPage] = useState<PageId>("home");

  useEffect(() => {
    const root = document.querySelector('[data-template-id="moss-marrow-cafe"]');
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-mmc-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const navigate = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = (target.replace("#", "") || "home") as PageId;
    if (["about", "menu", "contact", "privacy", "accessibility"].includes(next)) {
      setPage(next);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }
    setPage("home");
    window.requestAnimationFrame(() => {
      document.getElementById(next)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const headerStyle = useMemo(() => ({
    "--mmc-header-bg": "var(--template-header-bg)",
    "--mmc-header-text": "var(--template-header-text)",
  }) as React.CSSProperties, []);

  return (
    <div data-template-id="moss-marrow-cafe" className="moss-marrow-cafe" style={headerStyle}>
      <header className="mmc-header">
        <button className="mmc-wordmark" type="button" onClick={(event) => navigate("home", event)}>
          <span className="mmc-logo-lockup" data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</span>
          <span className="mmc-logo-sub" data-editable-path="brand.descriptor" data-editable-type="text">{content.brand.descriptor}</span>
        </button>
        <div className="mmc-header-meta">
          <p><span data-editable-path="brand.addressLine1" data-editable-type="text">{content.brand.addressLine1}</span><br /><span data-editable-path="brand.addressLine2" data-editable-type="text">{content.brand.addressLine2}</span></p>
          <p><span data-editable-path="header.hoursPrimary" data-editable-type="text">{content.header.hoursPrimary}</span><br /><span data-editable-path="header.hoursSecondary" data-editable-type="text">{content.header.hoursSecondary}</span></p>
        </div>
        <nav className="mmc-nav" aria-label="Main navigation">
          {content.header.nav.map((link, index) => (
            <a
              href={`#${link.href}`}
              key={`${link.label}-${index}`}
              onClick={(event) => navigate(link.href, event)}
              data-editable-path={`header.nav.${index}.label`}
              data-editable-type="link"
              data-editable-href-path={`header.nav.${index}.href`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {page === "home" && (
        <main>
          <section className="mmc-hero" id="home">
            <div className="mmc-hero-copy" data-mmc-reveal>
              <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
              <p data-editable-path="hero.description" data-editable-type="text">{content.hero.description}</p>
              <a
                className="mmc-text-link"
                href={`#${content.hero.cta.href}`}
                onClick={(event) => navigate(content.hero.cta.href, event)}
                data-editable-path="hero.cta.label"
                data-editable-type="link"
                data-editable-href-path="hero.cta.href"
              >
                {content.hero.cta.label}<ArrowMark />
              </a>
            </div>
            <div className="mmc-hero-media" data-mmc-reveal>
              <img
                src={content.hero.image}
                alt={content.hero.imageAlt}
                loading="eager"
                fetchPriority="high"
                data-editable-path="hero.image"
                data-editable-type="image"
                data-editable-alt-path="hero.imageAlt"
              />
            </div>
          </section>

          <section className="mmc-intro" id="about-preview">
            <div className="mmc-intro-gallery" data-mmc-reveal>
              {content.intro.images.map((image, index) => (
                <img
                  src={image.src}
                  alt={image.alt}
                  key={`${image.src}-${index}`}
                  data-editable-path={`intro.images.${index}.src`}
                  data-editable-type="image"
                  data-editable-alt-path={`intro.images.${index}.alt`}
                />
              ))}
            </div>
            <div className="mmc-intro-heading" data-mmc-reveal>
              <h2 data-editable-path="intro.title" data-editable-type="text">{content.intro.title}</h2>
            </div>
            <div className="mmc-intro-body" data-mmc-reveal>
              <p className="mmc-kicker" data-editable-path="intro.kicker" data-editable-type="text">{content.intro.kicker}</p>
              <p data-editable-path="intro.body" data-editable-type="text">{content.intro.body}</p>
            </div>
          </section>

          <section className="mmc-menu-section" id="menu">
            <div className="mmc-section-heading" data-mmc-reveal>
              <h2 data-editable-path="menu.title" data-editable-type="text">{content.menu.title}</h2>
              <p data-editable-path="menu.subtitle" data-editable-type="text">{content.menu.subtitle}</p>
            </div>
            <div className="mmc-menu-grid">
              {content.menu.items.map((item, index) => (
                <article className={`mmc-menu-card mmc-menu-card-${index + 1}`} key={`${item.name}-${index}`} data-mmc-reveal>
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading={index === 0 ? "eager" : "lazy"}
                    data-editable-path={`menu.items.${index}.image`}
                    data-editable-type="image"
                    data-editable-alt-path={`menu.items.${index}.imageAlt`}
                  />
                  <div className="mmc-menu-caption">
                    <h3 data-editable-path={`menu.items.${index}.name`} data-editable-type="text">{item.name}</h3>
                    <p data-editable-path={`menu.items.${index}.description`} data-editable-type="text">{item.description}</p>
                    <span data-editable-path={`menu.items.${index}.price`} data-editable-type="text">{item.price}</span>
                  </div>
                </article>
              ))}
              <div className="mmc-menu-cta" data-mmc-reveal>
                <a
                  className="mmc-solid-link"
                  href={`#${content.menu.cta.href}`}
                  onClick={(event) => navigate(content.menu.cta.href, event)}
                  data-editable-path="menu.cta.label"
                  data-editable-type="link"
                  data-editable-href-path="menu.cta.href"
                >
                  {content.menu.cta.label}<ArrowMark />
                </a>
              </div>
            </div>
          </section>

          <section className="mmc-manifesto" data-mmc-reveal>
            <h2 data-editable-path="manifesto.title" data-editable-type="text">{content.manifesto.title}</h2>
            <p className="mmc-kicker" data-editable-path="manifesto.kicker" data-editable-type="text">{content.manifesto.kicker}</p>
            <p data-editable-path="manifesto.body" data-editable-type="text">{content.manifesto.body}</p>
          </section>

          <section className="mmc-testimonials" id="reviews">
            <img
              src={content.testimonials.backgroundImage}
              alt={content.testimonials.backgroundAlt}
              className="mmc-testimonial-bg"
              loading="lazy"
              data-editable-path="testimonials.backgroundImage"
              data-editable-type="image"
              data-editable-alt-path="testimonials.backgroundAlt"
            />
            <div className="mmc-testimonial-heading" data-mmc-reveal>
              <h2 data-editable-path="testimonials.title" data-editable-type="text">{content.testimonials.title}</h2>
              <p data-editable-path="testimonials.kicker" data-editable-type="text">{content.testimonials.kicker}</p>
            </div>
            <div className="mmc-quote-field">
              {content.testimonials.items.map((item, index) => (
                <blockquote className={`mmc-quote mmc-quote-${index + 1}`} key={`${item.author}-${index}`} data-mmc-reveal>
                  <p data-editable-path={`testimonials.items.${index}.quote`} data-editable-type="text">"{item.quote}"</p>
                  <cite data-editable-path={`testimonials.items.${index}.author`} data-editable-type="text">- {item.author}</cite>
                </blockquote>
              ))}
            </div>
          </section>
        </main>
      )}

      {page === "about" && <AboutPage content={content} />}
      {page === "menu" && <MenuPage content={content} />}
      {page === "contact" && <ContactPage content={content} />}
      {page === "privacy" && <PolicyPage title={content.footer.privacyLabel} />}
      {page === "accessibility" && <PolicyPage title={content.footer.accessibilityLabel} />}

      <footer className="mmc-footer">
        <div className="mmc-footer-brand">
          <button type="button" onClick={(event) => navigate("home", event)} data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</button>
        </div>
        <div className="mmc-footer-links">
          {content.footer.social.map((link, index) => (
            <a
              key={`${link.label}-${index}`}
              href={link.href}
              data-editable-path={`footer.social.${index}.label`}
              data-editable-type="link"
              data-editable-href-path={`footer.social.${index}.href`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="mmc-footer-meta">
          <a
            href={`#${content.footer.privacyHref}`}
            onClick={(event) => navigate(content.footer.privacyHref, event)}
            data-editable-path="footer.privacyLabel"
            data-editable-type="link"
            data-editable-href-path="footer.privacyHref"
          >
            {content.footer.privacyLabel}
          </a>
          <a
            href={`#${content.footer.accessibilityHref}`}
            onClick={(event) => navigate(content.footer.accessibilityHref, event)}
            data-editable-path="footer.accessibilityLabel"
            data-editable-type="link"
            data-editable-href-path="footer.accessibilityHref"
          >
            {content.footer.accessibilityLabel}
          </a>
          <p data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</p>
          <p><span data-editable-path="brand.addressLine1" data-editable-type="text">{content.brand.addressLine1}</span><br /><span data-editable-path="brand.addressLine2" data-editable-type="text">{content.brand.addressLine2}</span></p>
        </div>
        <div className="mmc-footer-bottom">
          <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
          <p data-editable-path="footer.credit" data-editable-type="text">{content.footer.credit}</p>
        </div>
      </footer>
    </div>
  );
}

function AboutPage({ content }: { content: MossMarrowData }) {
  return (
    <main className="mmc-subpage">
      <section className="mmc-page-hero">
        <div>
          <p className="mmc-page-kicker">{pageTitles.about}</p>
          <h1 data-editable-path="pages.about.title" data-editable-type="text">{content.pages.about.title}</h1>
          <p data-editable-path="pages.about.intro" data-editable-type="text">{content.pages.about.intro}</p>
        </div>
        <img
          src={content.pages.about.image}
          alt={content.pages.about.imageAlt}
          data-editable-path="pages.about.image"
          data-editable-type="image"
          data-editable-alt-path="pages.about.imageAlt"
        />
      </section>
      <section className="mmc-page-text">
        <p data-editable-path="pages.about.body" data-editable-type="text">{content.pages.about.body}</p>
      </section>
    </main>
  );
}

function MenuPage({ content }: { content: MossMarrowData }) {
  return (
    <main className="mmc-subpage">
      <section className="mmc-page-heading">
        <p className="mmc-page-kicker">{pageTitles.menu}</p>
        <h1 data-editable-path="pages.menu.title" data-editable-type="text">{content.pages.menu.title}</h1>
        <p data-editable-path="pages.menu.intro" data-editable-type="text">{content.pages.menu.intro}</p>
      </section>
      <section className="mmc-full-menu">
        {content.pages.menu.sections.map((section, sectionIndex) => (
          <article className="mmc-menu-list" key={`${section.title}-${sectionIndex}`}>
            <h2 data-editable-path={`pages.menu.sections.${sectionIndex}.title`} data-editable-type="text">{section.title}</h2>
            {section.items.map((item, itemIndex) => (
              <div className="mmc-menu-row" key={`${item.name}-${itemIndex}`}>
                <div>
                  <h3 data-editable-path={`pages.menu.sections.${sectionIndex}.items.${itemIndex}.name`} data-editable-type="text">{item.name}</h3>
                  <p data-editable-path={`pages.menu.sections.${sectionIndex}.items.${itemIndex}.description`} data-editable-type="text">{item.description}</p>
                </div>
                <span data-editable-path={`pages.menu.sections.${sectionIndex}.items.${itemIndex}.price`} data-editable-type="text">{item.price}</span>
              </div>
            ))}
          </article>
        ))}
      </section>
    </main>
  );
}

function ContactPage({ content }: { content: MossMarrowData }) {
  return (
    <main className="mmc-subpage">
      <section className="mmc-contact-page">
        <div>
          <p className="mmc-page-kicker">{pageTitles.contact}</p>
          <h1 data-editable-path="pages.contact.title" data-editable-type="text">{content.pages.contact.title}</h1>
          <p data-editable-path="pages.contact.intro" data-editable-type="text">{content.pages.contact.intro}</p>
          <address>
            <span data-editable-path="brand.addressLine1" data-editable-type="text">{content.brand.addressLine1}</span><br />
            <span data-editable-path="brand.addressLine2" data-editable-type="text">{content.brand.addressLine2}</span><br />
            <a href={`tel:${content.brand.phone}`} data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</a><br />
            <a href={`mailto:${content.brand.email}`} data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</a>
          </address>
        </div>
        <form className="mmc-contact-form">
          <label><span data-editable-path="pages.contact.form.nameLabel" data-editable-type="text">{content.pages.contact.form.nameLabel}</span><input type="text" /></label>
          <label><span data-editable-path="pages.contact.form.emailLabel" data-editable-type="text">{content.pages.contact.form.emailLabel}</span><input type="email" /></label>
          <label><span data-editable-path="pages.contact.form.messageLabel" data-editable-type="text">{content.pages.contact.form.messageLabel}</span><textarea rows={5} /></label>
          <button type="button" data-editable-path="pages.contact.form.button" data-editable-type="text">{content.pages.contact.form.button}</button>
        </form>
      </section>
    </main>
  );
}

function PolicyPage({ title }: { title: string }) {
  return (
    <main className="mmc-subpage">
      <section className="mmc-page-heading">
        <p className="mmc-page-kicker">Website policy</p>
        <h1>{title}</h1>
        <p>This page can be replaced with the business policy content before publishing.</p>
      </section>
    </main>
  );
}
