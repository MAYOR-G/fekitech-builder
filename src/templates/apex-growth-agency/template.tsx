"use client";

import React from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Service = { title: string; text: string };
type Stat = { value: string; label: string };
type Card = { title: string; text: string };
type CaseItem = { title: string; sector: string; image: string; imageAlt: string };
type Testimonial = { quote: string; name: string; role: string };
type PricingPlan = { name: string; price: string; cadence: string; features: string[]; buttonLabel: string; buttonHref: string };
type Post = { title: string; category: string; image: string; imageAlt: string };
type Faq = { question: string; answer: string };
type Detail = { label: string; value: string; href: string };
type FooterColumn = { title: string; links: LinkItem[] };

function asItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function Mark() {
  return (
    <span className="aga-mark" aria-hidden="true">
      <span />
      <i />
    </span>
  );
}

function Arrow() {
  return <span className="aga-arrow" aria-hidden="true">→</span>;
}

export default function ApexGrowthAgencyTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;
  const themeStyle = {
    "--aga-page": colors.page,
    "--aga-panel": colors.panel,
    "--aga-panel-soft": colors.panelSoft,
    "--aga-line": colors.line,
    "--aga-heading": colors.heading,
    "--aga-body": colors.body,
    "--aga-muted": colors.muted,
    "--aga-accent": colors.accent,
    "--aga-accent-deep": colors.accentDeep,
    "--aga-button-text": colors.buttonText,
    "--aga-heading-font": fonts.heading,
    "--aga-body-font": fonts.body,
  } as React.CSSProperties;

  const navLinks = asItems<LinkItem>(content.navigation.links);
  const services = asItems<Service>(content.services.items);
  const brands = asItems<string>(content.brands.items);
  const stats = asItems<Stat>(content.proof.stats);
  const proofCards = asItems<Card>(content.proof.cards);
  const proofTags = asItems<string>(content.proof.tags);
  const cases = asItems<CaseItem>(content.cases.items);
  const testimonials = asItems<Testimonial>(content.testimonials.items);
  const pricing = asItems<PricingPlan>(content.pricing.plans);
  const posts = asItems<Post>(content.posts.items);
  const faqs = asItems<Faq>(content.faq.items);
  const details = asItems<Detail>(content.contact.details);
  const footerColumns = asItems<FooterColumn>(content.footer.columns);
  const heroTitle = str(content.hero.title).split("\n");
  const priceTitle = str(content.pricing.title).split("\n");
  const postsTitle = str(content.posts.title).split("\n");
  const faqTitle = str(content.faq.title).split("\n");
  const contactTitle = str(content.contact.title).split("\n");

  return (
    <main id="home" data-template-id="apex-growth-agency" className="apex-growth-agency" style={themeStyle}>
      <header className="aga-header">
        <a className="aga-logo" href="#home" aria-label={str(content.brand.name)}>
          <Mark />
          <span>{str(content.brand.name)}</span>
        </a>
        <nav aria-label="Primary navigation">
          {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="aga-mini-button" href={str(content.navigation.buttonHref)}>{str(content.navigation.buttonLabel)}</a>
      </header>

      <section className="aga-hero">
        <p className="aga-eyebrow">{str(content.hero.eyebrow)}</p>
        <h1>
          {heroTitle.map((line) => (
            <React.Fragment key={line}>
              {line.includes(str(content.hero.highlight)) ? (
                <>{line.replace(str(content.hero.highlight), "")}<span>{str(content.hero.highlight)}</span></>
              ) : line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        <a className="aga-button" href={str(content.hero.buttonHref)}>{str(content.hero.buttonLabel)} <Arrow /></a>
        <div className="aga-hero-media">
          <img src={str(content.hero.image)} alt={str(content.hero.imageAlt)} />
          <span>{str(content.hero.badge)}</span>
        </div>
        <div className="aga-marquee"><span>{str(content.hero.marquee)}</span></div>
      </section>

      <section id="services" className="aga-section aga-services">
        <div className="aga-section-head">
          <p><i />{str(content.services.eyebrow)}</p>
          <a className="aga-mini-button" href={str(content.services.buttonHref)}>{str(content.services.buttonLabel)} <Arrow /></a>
        </div>
        <div className="aga-service-grid">
          {services.map((service, index) => (
            <article key={service.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href={str(content.services.buttonHref)}>Learn more <Arrow /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="aga-brands">
        <h2>{str(content.brands.title)}</h2>
        <div>
          {brands.map((brand) => <span key={brand}>{brand}</span>)}
        </div>
      </section>

      <section className="aga-proof">
        <img src={str(content.proof.image)} alt={str(content.proof.imageAlt)} />
        <div className="aga-proof-stats">
          {stats.map((stat) => <article key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
        </div>
        <div className="aga-proof-cards">
          {proofCards.map((card) => <article key={card.title}><h3>{card.title}</h3><p>{card.text}</p></article>)}
        </div>
        <div className="aga-tags">
          {proofTags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </section>

      <section id="cases" className="aga-section aga-cases">
        <h2>{str(content.cases.title)}</h2>
        <div className="aga-case-space">
          {cases.map((item) => (
            <article key={item.title}>
              <img src={item.image} alt={item.imageAlt} />
              <span>{item.sector}</span>
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
        <a className="aga-button" href={str(content.cases.buttonHref)}>{str(content.cases.buttonLabel)} <Arrow /></a>
      </section>

      <section className="aga-section aga-testimonials">
        <h2>{str(content.testimonials.title)}</h2>
        <div className="aga-quotes">
          {testimonials.map((item) => (
            <blockquote key={item.name}>
              <div>★★★★★</div>
              <p>{item.quote}</p>
              <footer><strong>{item.name}</strong><span>{item.role}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="pricing" className="aga-section aga-pricing">
        <h2>{priceTitle.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h2>
        <div className="aga-price-grid">
          {pricing.map((plan, index) => (
            <article key={plan.name} className={index === 1 ? "is-featured" : ""}>
              <span>{plan.name}</span>
              <h3>{plan.price}<small>{plan.cadence}</small></h3>
              <ul>
                {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
              </ul>
              <a href={plan.buttonHref}>{plan.buttonLabel}</a>
            </article>
          ))}
        </div>
      </section>

      <section id="specialties" className="aga-section aga-specialties">
        <div className="aga-section-head">
          <p><i />{str(content.specialties.eyebrow)}</p>
          <span>{str(content.specialties.text)}</span>
        </div>
        <div className="aga-special-grid">
          <article className="aga-traffic-card">
            <img src={str(content.specialties.image)} alt={str(content.specialties.imageAlt)} />
            <h2>{str(content.specialties.title)}</h2>
          </article>
          <article className="aga-metric-card">
            <strong>{str(content.specialties.metric)}</strong>
            <span>{str(content.specialties.metricLabel)}</span>
          </article>
          <article className="aga-orange-image">
            <img src={str(content.specialties.orangeImage)} alt={str(content.specialties.orangeImageAlt)} />
          </article>
          <article className="aga-orange-card">
            <h2>{str(content.specialties.orangeTitle)}</h2>
            <p>{str(content.specialties.orangeText)}</p>
          </article>
        </div>
      </section>

      <section className="aga-section aga-posts">
        <div className="aga-section-head">
          <h2>{postsTitle.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h2>
          <a className="aga-mini-button" href={str(content.posts.buttonHref)}>{str(content.posts.buttonLabel)} <Arrow /></a>
        </div>
        <div className="aga-post-grid">
          {posts.map((post) => (
            <article key={post.title}>
              <img src={post.image} alt={post.imageAlt} />
              <span>{post.category}</span>
              <h3>{post.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="aga-section aga-faq">
        <h2>{faqTitle.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h2>
        <div className="aga-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="aga-section aga-contact">
        <h2>{contactTitle.map((line, index) => <React.Fragment key={line}>{index === 1 ? <span>{line}</span> : line}<br /></React.Fragment>)}</h2>
        <form>
          <p>{str(content.contact.formTitle)}</p>
          <label>{str(content.contact.nameLabel)}<input aria-label={str(content.contact.nameLabel)} /></label>
          <label>{str(content.contact.emailLabel)}<input type="email" aria-label={str(content.contact.emailLabel)} /></label>
          <label>{str(content.contact.messageLabel)}<textarea aria-label={str(content.contact.messageLabel)} /></label>
          <button type="button">{str(content.contact.buttonLabel)}</button>
        </form>
      </section>

      <footer className="aga-footer">
        <div className="aga-detail-grid">
          {details.map((detail) => <a key={detail.label} href={detail.href}><span>{detail.label}</span>{detail.value}</a>)}
        </div>
        <div className="aga-footer-main">
          <a className="aga-logo" href="#home"><Mark /><span>{str(content.brand.name)}</span></a>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              {asItems<LinkItem>(column.links).map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
            </div>
          ))}
        </div>
        <p>{str(content.brand.copyright)}</p>
      </footer>
    </main>
  );
}
