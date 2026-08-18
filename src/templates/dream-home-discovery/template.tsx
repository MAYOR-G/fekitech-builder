"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useState } from "react";
import editableData from "./editable.json";
import "./index.css";

type TemplateContent = typeof editableData;
type Page = "home" | "listings" | "agents" | "about" | "contact";

const pages: Page[] = ["home", "listings", "agents", "about", "contact"];

export default function DreamHomeDiscoveryTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as TemplateContent;
  const [page, setPage] = useState<Page>("home");

  const go = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = pages.includes(target as Page) ? (target as Page) : "home";
    setPage(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div data-template-id="dream-home-discovery" className="dream-home-discovery">
      <Header content={content} go={go} />
      {page === "home" && <Home content={content} go={go} />}
      {page !== "home" && (
        <main className="dhd-page-placeholder">
          <h1>{page.charAt(0).toUpperCase() + page.slice(1)}</h1>
          <p>This is a placeholder for the {page} page.</p>
        </main>
      )}
      <Footer content={content} go={go} />
    </div>
  );
}

function Header({ content, go }: { content: TemplateContent; go: (t: string, e?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <header className="dhd-header">
      <div className="dhd-header-inner">
        <button type="button" onClick={(e) => go("home", e)} className="dhd-logo">
          <span data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</span>
        </button>
        <nav className="dhd-nav">
          {content.header.nav.map((link, index) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => go(link.href, e)}
              data-editable-path={`header.nav.${index}.label`}
              data-editable-type="link"
              data-editable-href-path={`header.nav.${index}.href`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="dhd-header-actions">
          <a
            href={`#${content.header.cta.href}`}
            onClick={(e) => go(content.header.cta.href, e)}
            className="dhd-btn dhd-btn-white"
            data-editable-path="header.cta.label"
            data-editable-type="link"
            data-editable-href-path="header.cta.href"
          >
            {content.header.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}

function Home({ content, go }: { content: TemplateContent; go: (t: string, e?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <Hero content={content} />
      <FeaturedListings content={content} />
      <Discover content={content} />
      <Banner content={content} />
      <Neighborhoods content={content} />
      <Testimonials content={content} />
      <Agents content={content} />
      <FAQ content={content} />
      <Contact content={content} />
    </main>
  );
}

function Hero({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-hero">
      <div className="dhd-hero-content">
        <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
        <p data-editable-path="hero.subtitle" data-editable-type="text">{content.hero.subtitle}</p>
        <div className="dhd-search-bar">
          <div className="dhd-search-input">
            <span className="dhd-icon">📍</span>
            <span data-editable-path="hero.search.locationPlaceholder" data-editable-type="text">{content.hero.search.locationPlaceholder}</span>
          </div>
          <div className="dhd-search-input">
            <span className="dhd-icon">🏠</span>
            <span data-editable-path="hero.search.typePlaceholder" data-editable-type="text">{content.hero.search.typePlaceholder}</span>
          </div>
          <div className="dhd-search-input">
            <span className="dhd-icon">💰</span>
            <span data-editable-path="hero.search.pricePlaceholder" data-editable-type="text">{content.hero.search.pricePlaceholder}</span>
          </div>
          <button className="dhd-btn dhd-btn-primary" data-editable-path="hero.search.button" data-editable-type="text">
            {content.hero.search.button}
          </button>
        </div>
      </div>
    </section>
  );
}

function FeaturedListings({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-featured">
      <div className="dhd-container">
        <div className="dhd-section-header">
          <div>
            <span className="dhd-kicker" data-editable-path="featuredListings.kicker" data-editable-type="text">{content.featuredListings.kicker}</span>
            <h2 data-editable-path="featuredListings.title" data-editable-type="text">{content.featuredListings.title}</h2>
          </div>
          <button className="dhd-btn dhd-btn-outline" data-editable-path="featuredListings.button" data-editable-type="text">{content.featuredListings.button}</button>
        </div>
        <div className="dhd-listings-grid">
          {content.featuredListings.items.map((item, index) => (
            <article key={item.name} className="dhd-listing-card">
              <div className="dhd-listing-image-wrapper">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  data-editable-path={`featuredListings.items.${index}.image`}
                  data-editable-type="image"
                  data-editable-alt-path={`featuredListings.items.${index}.imageAlt`}
                />
                <span className="dhd-listing-tag" data-editable-path={`featuredListings.items.${index}.tag`} data-editable-type="text">{item.tag}</span>
              </div>
              <div className="dhd-listing-details">
                <h3 data-editable-path={`featuredListings.items.${index}.name`} data-editable-type="text">{item.name}</h3>
                <div className="dhd-listing-meta">
                  <span data-editable-path={`featuredListings.items.${index}.location`} data-editable-type="text">{item.location}</span>
                  <span data-editable-path={`featuredListings.items.${index}.beds`} data-editable-type="text">{item.beds}</span>
                </div>
                <strong className="dhd-listing-price" data-editable-path={`featuredListings.items.${index}.price`} data-editable-type="text">{item.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Discover({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-discover">
      <div className="dhd-container dhd-discover-inner">
        <div className="dhd-discover-images">
          {content.discover.images.map((src, idx) => (
            <img key={idx} src={src} alt="" className={`dhd-discover-img-${idx}`} loading="lazy" data-editable-path={`discover.images.${idx}`} data-editable-type="image" />
          ))}
        </div>
        <div className="dhd-discover-content">
          <h2 data-editable-path="discover.title" data-editable-type="text">{content.discover.title}</h2>
          <h3 data-editable-path="discover.subtitle" data-editable-type="text">{content.discover.subtitle}</h3>
          <p data-editable-path="discover.body" data-editable-type="text">{content.discover.body}</p>
          <div className="dhd-discover-stats">
            {content.discover.stats.map((stat, idx) => (
              <div key={idx} className="dhd-stat">
                <strong data-editable-path={`discover.stats.${idx}.value`} data-editable-type="text">{stat.value}</strong>
                <span data-editable-path={`discover.stats.${idx}.label`} data-editable-type="text">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Banner({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-banner">
      <h2 data-editable-path="banner.title" data-editable-type="text">{content.banner.title}</h2>
      <img src={content.banner.image} alt={content.banner.imageAlt} loading="lazy" data-editable-path="banner.image" data-editable-type="image" data-editable-alt-path="banner.imageAlt" />
    </section>
  );
}

function Neighborhoods({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-neighborhoods">
      <div className="dhd-container">
        <div className="dhd-section-header dhd-text-center">
          <h2 data-editable-path="neighborhoods.title" data-editable-type="text">{content.neighborhoods.title}</h2>
          <p data-editable-path="neighborhoods.subtitle" data-editable-type="text">{content.neighborhoods.subtitle}</p>
        </div>
        <div className="dhd-neighborhoods-grid">
          {content.neighborhoods.items.map((item, index) => (
            <div key={item.name} className="dhd-neighborhood-card">
              <img src={item.image} alt={item.name} loading="lazy" data-editable-path={`neighborhoods.items.${index}.image`} data-editable-type="image" />
              <div className="dhd-neighborhood-card-content">
                <h3 data-editable-path={`neighborhoods.items.${index}.name`} data-editable-type="text">{item.name}</h3>
                <span data-editable-path={`neighborhoods.items.${index}.properties`} data-editable-type="text">{item.properties}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-testimonials">
      <div className="dhd-container">
        <h2 className="dhd-text-center" data-editable-path="testimonials.title" data-editable-type="text">{content.testimonials.title}</h2>
        <div className="dhd-testimonials-grid">
          {content.testimonials.items.map((item, index) => (
            <div key={item.name} className="dhd-testimonial-card">
              <p data-editable-path={`testimonials.items.${index}.text`} data-editable-type="text">"{item.text}"</p>
              <div className="dhd-testimonial-author">
                <img src={item.image} alt={item.name} loading="lazy" data-editable-path={`testimonials.items.${index}.image`} data-editable-type="image" />
                <span data-editable-path={`testimonials.items.${index}.name`} data-editable-type="text">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Agents({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-agents">
      <div className="dhd-container">
        <h2 className="dhd-text-center" data-editable-path="agents.title" data-editable-type="text">{content.agents.title}</h2>
        <div className="dhd-agents-grid">
          {content.agents.items.map((item, index) => (
            <div key={item.name} className="dhd-agent-card">
              <img src={item.image} alt={item.name} loading="lazy" data-editable-path={`agents.items.${index}.image`} data-editable-type="image" />
              <h3 data-editable-path={`agents.items.${index}.name`} data-editable-type="text">{item.name}</h3>
              <span data-editable-path={`agents.items.${index}.role`} data-editable-type="text">{item.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-faq">
      <div className="dhd-container">
        <h2 className="dhd-text-center" data-editable-path="faq.title" data-editable-type="text">{content.faq.title}</h2>
        <div className="dhd-faq-list">
          {content.faq.items.map((item, index) => (
            <details key={index} className="dhd-faq-item">
              <summary data-editable-path={`faq.items.${index}.question`} data-editable-type="text">{item.question}</summary>
              <p data-editable-path={`faq.items.${index}.answer`} data-editable-type="text">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content }: { content: TemplateContent }) {
  return (
    <section className="dhd-section dhd-contact">
      <div className="dhd-container dhd-contact-inner">
        <div className="dhd-contact-text">
          <h2 data-editable-path="contact.title" data-editable-type="text">{content.contact.title}</h2>
          <h3 data-editable-path="contact.subtitle" data-editable-type="text">{content.contact.subtitle}</h3>
        </div>
        <form className="dhd-contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="dhd-form-group">
            <label>{content.contact.form.typeLabel}</label>
            <select>
              {content.contact.form.typeOptions.map((opt, i) => (
                <option key={i}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="dhd-form-group">
            <input type="text" placeholder={content.contact.form.nameLabel} />
          </div>
          <div className="dhd-form-group">
            <input type="email" placeholder={content.contact.form.emailLabel} />
          </div>
          <div className="dhd-form-group">
            <input type="tel" placeholder={content.contact.form.phoneLabel} />
          </div>
          <button className="dhd-btn dhd-btn-primary" data-editable-path="contact.form.button" data-editable-type="text">
            {content.contact.form.button}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer({ content, go }: { content: TemplateContent; go: (t: string, e?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="dhd-footer">
      <div className="dhd-container dhd-footer-inner">
        <div className="dhd-footer-brand">
          <h2 data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</h2>
          <p data-editable-path="footer.tagline" data-editable-type="text">{content.footer.tagline}</p>
        </div>
        <div className="dhd-footer-links">
          <div>
            <h4 data-editable-path="footer.links1Title" data-editable-type="text">{content.footer.links1Title}</h4>
            <ul>
              {content.footer.links1.map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link.href}`} onClick={(e) => go(link.href, e)} data-editable-path={`footer.links1.${idx}.label`} data-editable-type="link" data-editable-href-path={`footer.links1.${idx}.href`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 data-editable-path="footer.links2Title" data-editable-type="text">{content.footer.links2Title}</h4>
            <ul>
              {content.footer.links2.map((link, idx) => (
                <li key={idx}>
                  <a href={`#${link.href}`} onClick={(e) => go(link.href, e)} data-editable-path={`footer.links2.${idx}.label`} data-editable-type="link" data-editable-href-path={`footer.links2.${idx}.href`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="dhd-container dhd-footer-bottom">
        <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
        <div className="dhd-footer-contact">
          <span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span>
          <span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span>
        </div>
      </div>
    </footer>
  );
}
