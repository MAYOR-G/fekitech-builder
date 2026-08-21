"use client";

import React, { useState } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Car = {
  name: string;
  year: string;
  price: string;
  badge?: string;
  image: string;
  imageAlt?: string;
};
type ServiceCard = {
  id: string;
  title: string;
  image?: string;
  imageAlt?: string;
  type?: string;
  marques?: { name: string; icon: string }[];
};
type StatCard = {
  value: string;
  label: string;
  description?: string;
  rating?: string;
  reviewCount?: string;
  googleIcon?: string;
};
type TeamMember = {
  name: string;
  role: string;
  image: string;
  imageAlt?: string;
};
type Article = {
  title: string;
  date: string;
  category: string;
  image: string;
  imageAlt?: string;
};
type FaqItem = {
  question: string;
  answer: string;
};

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffb800" stroke="#ffb800" strokeWidth="1" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.25s ease",
      }}
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function MayfairPrestigeMotorsTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const themeStyle = {
    "--mpm-page": colors.page,
    "--mpm-section": colors.section,
    "--mpm-surface": colors.surface,
    "--mpm-card": colors.card,
    "--mpm-heading": colors.heading,
    "--mpm-body": colors.body,
    "--mpm-muted": colors.muted,
    "--mpm-accent": colors.accent,
    "--mpm-accent-sec": colors.accentSecondary,
    "--mpm-btn-primary": colors.buttonPrimary,
    "--mpm-btn-primary-text": colors.buttonPrimaryText,
    "--mpm-btn-sec": colors.buttonSecondary,
    "--mpm-btn-sec-text": colors.buttonSecondaryText,
    "--mpm-btn-sec-border": colors.buttonSecondaryBorder,
    "--mpm-border": colors.border,
    "--mpm-header-bg": colors.headerBg,
    "--mpm-header-text": colors.headerText,
    "--mpm-footer-bg": colors.footerBg,
    "--mpm-footer-text": colors.footerText,
    "--mpm-hero-card-bg": colors.heroCardBg,
    "--mpm-hero-card-text": colors.heroCardText,
    "--mpm-heading-font": fonts.heading,
    "--mpm-body-font": fonts.body,
  } as React.CSSProperties;

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const heroStats = asArray<{ value: string; label: string }>(content.hero.stats);
  const featuredCars = asArray<Car>(content.featured.cars);
  const serviceCards = asArray<ServiceCard>(content.services.cards);
  const statCards = asArray<StatCard>(content.testimonials.statCards);
  const teamMembers = asArray<TeamMember>(content.team.members);
  const articles = asArray<Article>(content.journal.articles);
  const faqs = asArray<FaqItem>(content.faq.items);
  const marquePills = asArray<string>(content.quickContact.marques);
  const footerLinks = asArray<LinkItem>(content.footer.links);
  const legalLinks = asArray<LinkItem>(content.footer.legalLinks);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmailInput("");
    }
  };

  return (
    <div data-template-id="mayfair-prestige-motors" className="mayfair-prestige-motors" style={themeStyle}>
      {/* ================= HEADER ================= */}
      <header className="mpm-header">
        <div className="mpm-header-inner">
          <a href="#" className="mpm-brand-logo">
            {str(content.brand.name)}
          </a>

          <nav className="mpm-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="mpm-nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mpm-header-actions">
            <a href={str(content.navigation.buttonHref)} className="mpm-btn-pill mpm-btn-dark">
              <span>{str(content.navigation.buttonLabel)}</span>
              <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
            </a>

            <button
              type="button"
              className="mpm-mobile-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="mpm-bar" />
              <span className="mpm-bar" />
              <span className="mpm-bar" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="mpm-mobile-menu">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mpm-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={str(content.navigation.buttonHref)}
              className="mpm-btn-pill mpm-btn-dark mpm-mobile-cta"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>{str(content.navigation.buttonLabel)}</span>
              <span className="mpm-btn-icon"><ArrowIcon /></span>
            </a>
          </div>
        )}
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="mpm-hero-wrapper">
        <div className="mpm-hero-card">
          <div className="mpm-hero-bg">
            <img
              src={str(content.hero.image)}
              alt={str(content.hero.imageAlt)}
              className="mpm-hero-img"
            />
            <div className="mpm-hero-overlay" />
          </div>

          <div className="mpm-hero-content">
            <div className="mpm-hero-top">
              <div className="mpm-hero-title-group">
                <h1 className="mpm-hero-title">{str(content.hero.title)}</h1>
                <p className="mpm-hero-subtitle">{str(content.hero.subtitle)}</p>
                <div className="mpm-hero-actions">
                  <a href={str(content.hero.primaryCta?.href, "#inventory")} className="mpm-btn-pill mpm-btn-light">
                    <span>{str(content.hero.primaryCta?.label, "Browse Inventory")}</span>
                    <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </div>
              </div>

              <div className="mpm-hero-top-right">
                <div className="mpm-model-selector">
                  <span>{str(content.hero.modelSelectLabel, "Select Model")}</span>
                  <ChevronDownIcon open={false} />
                </div>
              </div>
            </div>

            <div className="mpm-hero-bottom">
              <div className="mpm-hero-stats">
                {heroStats.map((stat, idx) => (
                  <div key={idx} className="mpm-hero-stat-badge">
                    <span className="mpm-stat-val">{stat.value}</span>
                    <span className="mpm-stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED CARS ================= */}
      <section id="inventory" className="mpm-section mpm-featured-section">
        <div className="mpm-container">
          <div className="mpm-section-header">
            <div className="mpm-header-left">
              <span className="mpm-tag">{str(content.featured.tag)}</span>
              <h2 className="mpm-section-title">{str(content.featured.title)}</h2>
            </div>
            <div className="mpm-header-right">
              <a href={str(content.featured.ctaHref, "#inventory")} className="mpm-btn-pill mpm-btn-dark">
                <span>{str(content.featured.ctaLabel)}</span>
                <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
              </a>
              <p className="mpm-header-desc">{str(content.featured.subtitle)}</p>
            </div>
          </div>

          <div className="mpm-cars-grid">
            {featuredCars.map((car, index) => (
              <div key={index} className="mpm-car-card">
                <div className="mpm-car-image-box">
                  <img src={car.image} alt={car.imageAlt || car.name} className="mpm-car-img" />
                  {car.badge && (
                    <span className="mpm-car-badge">{car.badge}</span>
                  )}
                </div>
                <div className="mpm-car-info">
                  <div className="mpm-car-details">
                    <div className="mpm-car-title-row">
                      <h3 className="mpm-car-name">{car.name}</h3>
                      <span className="mpm-car-year">{car.year}</span>
                    </div>
                    <div className="mpm-car-price-row">
                      <span className="mpm-car-price">{car.price}</span>
                    </div>
                  </div>
                  <a href="#contact" className="mpm-car-action" aria-label={`Enquire about ${car.name}`}>
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section id="services" className="mpm-section mpm-services-section">
        <div className="mpm-container">
          <div className="mpm-services-layout">
            <div className="mpm-services-left">
              <span className="mpm-tag">{str(content.services.tag)}</span>
              <h2 className="mpm-section-title">{str(content.services.title)}</h2>
              <p className="mpm-services-desc">{str(content.services.subtitle)}</p>
              <a href={str(content.services.ctaHref, "#services")} className="mpm-btn-pill mpm-btn-dark">
                <span>{str(content.services.ctaLabel)}</span>
                <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
              </a>
            </div>

            <div className="mpm-services-grid">
              {serviceCards.map((card) => {
                if (card.type === "marques" && card.marques) {
                  return (
                    <div key={card.id} className="mpm-service-card mpm-marques-card">
                      <div className="mpm-marques-grid">
                        {card.marques.map((marque, mIdx) => (
                          <div key={mIdx} className="mpm-marque-item" title={marque.name}>
                            <img src={marque.icon} alt={marque.name} className="mpm-marque-icon" />
                          </div>
                        ))}
                      </div>
                      <div className="mpm-service-card-text">
                        <h3 className="mpm-service-card-title">{card.title}</h3>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={card.id} className="mpm-service-card">
                    {card.image && (
                      <img src={card.image} alt={card.imageAlt || card.title} className="mpm-service-card-bg" />
                    )}
                    <div className="mpm-service-card-overlay" />
                    <div className="mpm-service-card-text">
                      <h3 className="mpm-service-card-title">{card.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS & STATS ================= */}
      <section id="reviews" className="mpm-section mpm-testimonials-section">
        <div className="mpm-container">
          <div className="mpm-section-header">
            <div className="mpm-header-left">
              <span className="mpm-tag">{str(content.testimonials.tag)}</span>
              <h2 className="mpm-section-title">{str(content.testimonials.title)}</h2>
            </div>
            <div className="mpm-header-right">
              <a href={str(content.testimonials.ctaHref, "#reviews")} className="mpm-btn-pill mpm-btn-dark">
                <span>{str(content.testimonials.ctaLabel)}</span>
                <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
              </a>
              <p className="mpm-header-desc">{str(content.testimonials.subtitle)}</p>
            </div>
          </div>

          <div className="mpm-testimonials-grid">
            {/* Featured Review Card */}
            <div className="mpm-review-card">
              <div className="mpm-review-image-wrapper">
                <img
                  src={str(content.testimonials.featuredReview?.image)}
                  alt={str(content.testimonials.featuredReview?.imageAlt)}
                  className="mpm-review-img"
                />
              </div>
              <div className="mpm-review-content">
                <div className="mpm-stars" aria-label="5 star rating">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <blockquote className="mpm-review-quote">
                  {str(content.testimonials.featuredReview?.quote)}
                </blockquote>
                <div className="mpm-review-author">
                  <strong>{str(content.testimonials.featuredReview?.author)}</strong>
                  <span>{str(content.testimonials.featuredReview?.role)}</span>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            {statCards.map((stat, idx) => (
              <div key={idx} className="mpm-stat-box">
                <div className="mpm-stat-top">
                  <span className="mpm-big-number">{stat.value}</span>
                  <h3 className="mpm-stat-heading">{stat.label}</h3>
                  {stat.description && <p className="mpm-stat-text">{stat.description}</p>}
                </div>
                {stat.rating && (
                  <div className="mpm-stat-bottom-rating">
                    <div className="mpm-rating-val">{stat.rating}</div>
                    <div className="mpm-rating-details">
                      <div className="mpm-stars">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <span className="mpm-review-count">{stat.reviewCount}</span>
                    </div>
                    {stat.googleIcon && (
                      <img src={stat.googleIcon} alt="Google Reviews" className="mpm-google-badge" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM SECTION ================= */}
      <section id="team" className="mpm-section mpm-team-section">
        <div className="mpm-container">
          <div className="mpm-team-layout">
            <div className="mpm-team-cards">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="mpm-team-card">
                  <div className="mpm-team-img-box">
                    <img src={member.image} alt={member.imageAlt || member.name} className="mpm-team-img" />
                  </div>
                  <div className="mpm-team-meta">
                    <h3 className="mpm-team-name">{member.name}</h3>
                    <span className="mpm-team-role">{member.role}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mpm-team-text">
              <span className="mpm-tag">{str(content.team.tag)}</span>
              <h2 className="mpm-section-title">{str(content.team.title)}</h2>
              <p className="mpm-team-desc">{str(content.team.subtitle)}</p>
              <a href={str(content.team.ctaHref, "#contact")} className="mpm-btn-pill mpm-btn-dark">
                <span>{str(content.team.ctaLabel)}</span>
                <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOURNAL / BLOG SECTION ================= */}
      <section id="journal" className="mpm-section mpm-journal-section">
        <div className="mpm-container">
          <div className="mpm-journal-layout">
            <div className="mpm-journal-left">
              <span className="mpm-tag">{str(content.journal.tag)}</span>
              <h2 className="mpm-section-title">{str(content.journal.title)}</h2>
              <p className="mpm-journal-desc">{str(content.journal.subtitle)}</p>
              <a href={str(content.journal.ctaHref, "#journal")} className="mpm-btn-pill mpm-btn-dark">
                <span>{str(content.journal.ctaLabel)}</span>
                <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
              </a>
            </div>

            <div className="mpm-journal-grid">
              {articles.map((article, idx) => (
                <article key={idx} className="mpm-article-card">
                  <img src={article.image} alt={article.imageAlt || article.title} className="mpm-article-img" />
                  <div className="mpm-article-overlay" />
                  <div className="mpm-article-content">
                    <div className="mpm-article-top">
                      <span className="mpm-article-date">{article.date}</span>
                      <span className="mpm-article-cat">{article.category}</span>
                    </div>
                    <h3 className="mpm-article-title">{article.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BIG CTA BANNER ================= */}
      <section className="mpm-cta-banner-wrapper">
        <div className="mpm-cta-card">
          <img
            src={str(content.ctaBanner.image)}
            alt={str(content.ctaBanner.imageAlt)}
            className="mpm-cta-bg-img"
          />
          <div className="mpm-cta-overlay" />
          <div className="mpm-cta-content">
            <h2 className="mpm-cta-title">{str(content.ctaBanner.title)}</h2>
            <p className="mpm-cta-desc">{str(content.ctaBanner.subtitle)}</p>
            <a href={str(content.ctaBanner.buttonHref, "#contact")} className="mpm-btn-pill mpm-btn-light">
              <span>{str(content.ctaBanner.buttonLabel)}</span>
              <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="mpm-section mpm-faq-section">
        <div className="mpm-container">
          <div className="mpm-faq-layout">
            <div className="mpm-faq-left">
              <span className="mpm-tag">{str(content.faq.tag)}</span>
              <h2 className="mpm-section-title">{str(content.faq.title)}</h2>
              <p className="mpm-faq-desc">{str(content.faq.subtitle)}</p>
            </div>

            <div className="mpm-faq-accordion">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className={`mpm-faq-item ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="mpm-faq-question"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span>{faq.question}</span>
                      <ChevronDownIcon open={isOpen} />
                    </button>
                    {isOpen && (
                      <div className="mpm-faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRE-FOOTER QUICK CONTACT & MARQUES ================= */}
      <section id="contact" className="mpm-section mpm-quick-contact-section">
        <div className="mpm-container">
          <div className="mpm-quick-layout">
            <div className="mpm-quick-left">
              <h2 className="mpm-quick-title">{str(content.quickContact.title)}</h2>
              <p className="mpm-quick-desc">{str(content.quickContact.subtitle)}</p>

              <form onSubmit={handleContactSubmit} className="mpm-quick-form">
                <input
                  type="text"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder={str(content.quickContact.inputPlaceholder)}
                  className="mpm-quick-input"
                  aria-label="Contact input"
                  required
                />
                <button type="submit" className="mpm-btn-pill mpm-btn-dark">
                  <span>{submitted ? "Message Sent!" : str(content.quickContact.buttonLabel)}</span>
                  <span className="mpm-btn-icon" aria-hidden="true"><ArrowIcon /></span>
                </button>
              </form>
            </div>

            <div className="mpm-quick-right">
              <div className="mpm-marque-pills">
                {marquePills.map((marque, idx) => (
                  <span key={idx} className="mpm-pill-badge">{marque}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= GRAND STATEMENT FOOTER ================= */}
      <footer className="mpm-footer">
        <div className="mpm-container">
          <div className="mpm-footer-branding">
            <h2 className="mpm-giant-brand-text">{str(content.footer.brandName, "CAR DEALERSHIP")}</h2>
          </div>

          <div className="mpm-footer-bottom">
            <div className="mpm-footer-left">
              <p className="mpm-footer-copy">{str(content.footer.copyright)}</p>
              <p className="mpm-footer-address">{str(content.footer.location)}</p>
            </div>

            <div className="mpm-footer-links">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href} className="mpm-footer-link">
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mpm-footer-legal">
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="mpm-footer-legal-link">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
