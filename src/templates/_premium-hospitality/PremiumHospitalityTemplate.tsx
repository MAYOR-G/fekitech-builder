"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  ForkKnife,
  InstagramLogo,
  List,
  MapPin,
  Phone,
  Star,
  TiktokLogo,
  X,
} from "@phosphor-icons/react";
import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import "./premium-hospitality.css";

type ImageItem = { image: string; imageAlt: string; caption: string };
type ProductItem = { name: string; description: string; price: string; image: string; imageAlt: string };

export type PremiumHospitalityData = {
  colors: { primary: string; secondary: string; background: string; text: string };
  brand: { name: string; tagline: string; logo: string; phone: string; email: string; address: string };
  navigation: {
    links: Array<{ label: string; href: string }>;
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    note: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    image: string;
    imageAlt: string;
    badge: string;
  };
  strip: { items: string[] };
  products: {
    title: string;
    description: string;
    items: ProductItem[];
  };
  feature: {
    note: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    facts: Array<{ value: string; label: string }>;
    buttonLabel: string;
    buttonHref: string;
  };
  packages: {
    title: string;
    description: string;
    items: Array<{ name: string; description: string; price: string; note: string; features: string[]; buttonLabel: string; buttonHref: string }>;
  };
  gallery: {
    title: string;
    description: string;
    rowOne: ImageItem[];
    rowTwo: ImageItem[];
  };
  story: {
    note: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    quote: string;
    buttonLabel: string;
    buttonHref: string;
  };
  process: {
    title: string;
    description: string;
    steps: Array<{ title: string; description: string }>;
  };
  testimonials: {
    title: string;
    description: string;
    items: Array<{ quote: string; name: string; detail: string }>;
  };
  visit: {
    note: string;
    title: string;
    description: string;
    areasLabel: string;
    areas: string[];
    hours: Array<{ day: string; time: string }>;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  social: {
    instagram: string;
    instagramHref: string;
    facebook: string;
    facebookHref: string;
    tiktok: string;
    tiktokHref: string;
  };
  footer: { note: string; copyright: string };
};

export type HospitalityVariant = "restaurant" | "fastfood" | "bakery" | "pastry" | "catering";

function Button({ href, children, quiet = false }: { href: string; children: ReactNode; quiet?: boolean }) {
  return (
    <a className={`pht-button ${quiet ? "pht-button--quiet" : ""}`} href={href}>
      <span>{children}</span><ArrowRight aria-hidden="true" size={17} weight="bold" />
    </a>
  );
}

function Brand({ data }: { data: PremiumHospitalityData }) {
  return (
    <span className="pht-brand-lockup">
      {data.brand.logo ? <img src={data.brand.logo} alt="" /> : <span className="pht-brand-mark" aria-hidden="true"><ForkKnife size={20} weight="bold" /></span>}
      <span><strong>{data.brand.name}</strong><small>{data.brand.tagline}</small></span>
    </span>
  );
}

function MarqueeRow({ items, reverse = false }: { items: ImageItem[]; reverse?: boolean }) {
  const repeated = [...items, ...items];
  return (
    <div className={`pht-image-marquee ${reverse ? "is-reverse" : ""}`}>
      <div className="pht-image-track">
        {repeated.map((item, index) => (
          <figure key={`${item.caption}-${index}`} aria-hidden={index >= items.length}>
            <img src={item.image} alt={index < items.length ? item.imageAlt : ""} loading="lazy" />
            <figcaption>{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function PremiumHospitalityTemplate({ data, variant }: { data: PremiumHospitalityData; variant: HospitalityVariant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = {
    "--pht-accent": data.colors.primary,
    "--pht-secondary": data.colors.secondary,
    "--pht-bg": data.colors.background,
    "--pht-ink": data.colors.text,
  } as CSSProperties;

  return (
    <div className={`pht-template pht-${variant}`} style={theme}>
      <a className="pht-skip" href="#main-content">Skip to content</a>
      <header className="pht-header">
        <div className="pht-shell pht-header-inner">
          <a className="pht-brand" href="#top" aria-label={`${data.brand.name} home`}><Brand data={data} /></a>
          <nav className={`pht-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {data.navigation.links.map((link) => <a key={`${link.label}-${link.href}`} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          </nav>
          <div className="pht-header-actions">
            <a className="pht-phone" href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" size={16} />{data.brand.phone}</a>
            <Button href={data.navigation.ctaHref}>{data.navigation.ctaLabel}</Button>
            <button className="pht-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="pht-hero" id="top">
          <div className="pht-shell pht-hero-grid">
            <div className="pht-hero-copy pht-enter">
              <p className="pht-kicker">{data.hero.note}</p>
              <h1>{data.hero.title}</h1>
              <p className="pht-lead">{data.hero.description}</p>
              <div className="pht-actions">
                <Button href={data.hero.primaryHref}>{data.hero.primaryLabel}</Button>
                <Button href={data.hero.secondaryHref} quiet>{data.hero.secondaryLabel}</Button>
              </div>
              <p className="pht-hero-contact"><MapPin aria-hidden="true" size={17} />{data.brand.address}</p>
            </div>
            <div className="pht-hero-media pht-enter">
              <span className="pht-hero-shape" aria-hidden="true" />
              <img src={data.hero.image} alt={data.hero.imageAlt} fetchPriority="high" />
              <span className="pht-hero-badge">{data.hero.badge}</span>
              <span className="pht-doodle" aria-hidden="true">✦</span>
            </div>
          </div>
          <div className="pht-ripped-edge" aria-hidden="true" />
        </section>

        <div className="pht-strip" aria-label="Highlights">
          <div>{[...data.strip.items, ...data.strip.items].map((item, index) => <span key={`${item}-${index}`}>{item}<b aria-hidden="true">✦</b></span>)}</div>
        </div>

        <section className="pht-section pht-products" id="menu">
          <div className="pht-shell">
            <div className="pht-heading pht-reveal"><h2>{data.products.title}</h2><p>{data.products.description}</p></div>
            <div className="pht-products-grid">
              {data.products.items.map((item, index) => (
                <article className={`pht-product pht-product--${index + 1} pht-reveal`} key={item.name}>
                  <div className="pht-product-media"><img src={item.image} alt={item.imageAlt} loading="lazy" /></div>
                  <div><p>{String(index + 1).padStart(2, "0")}</p><h3>{item.name}</h3><span>{item.description}</span><strong>{item.price}</strong></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pht-section pht-feature" id="story">
          <div className="pht-shell pht-feature-grid">
            <div className="pht-feature-media pht-reveal"><img src={data.feature.image} alt={data.feature.imageAlt} loading="lazy" /><span>{data.feature.note}</span></div>
            <div className="pht-feature-copy pht-reveal">
              <p className="pht-kicker">{data.feature.note}</p><h2>{data.feature.title}</h2><p>{data.feature.description}</p>
              <div className="pht-facts">{data.feature.facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div>
              <Button href={data.feature.buttonHref}>{data.feature.buttonLabel}</Button>
            </div>
          </div>
        </section>

        <section className="pht-section pht-packages" id="packages">
          <div className="pht-shell">
            <div className="pht-heading pht-reveal"><h2>{data.packages.title}</h2><p>{data.packages.description}</p></div>
            <div className="pht-package-grid">
              {data.packages.items.map((item, index) => (
                <article className={`pht-package ${index === 1 ? "is-featured" : ""} pht-reveal`} key={item.name}>
                  <p>{item.note}</p><h3>{item.name}</h3><span>{item.description}</span><strong>{item.price}</strong>
                  <ul>{item.features.map((feature) => <li key={feature}><Check aria-hidden="true" size={16} weight="bold" />{feature}</li>)}</ul>
                  <Button href={item.buttonHref} quiet={index !== 1}>{item.buttonLabel}</Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pht-section pht-gallery" id="gallery">
          <div className="pht-shell pht-heading pht-reveal"><h2>{data.gallery.title}</h2><p>{data.gallery.description}</p></div>
          <MarqueeRow items={data.gallery.rowOne} />
          <MarqueeRow items={data.gallery.rowTwo} reverse />
        </section>

        <section className="pht-section pht-story">
          <div className="pht-shell pht-story-grid">
            <div className="pht-story-copy pht-reveal"><p className="pht-kicker">{data.story.note}</p><h2>{data.story.title}</h2><p>{data.story.description}</p><blockquote>“{data.story.quote}”</blockquote><Button href={data.story.buttonHref}>{data.story.buttonLabel}</Button></div>
            <div className="pht-story-media pht-reveal"><img src={data.story.image} alt={data.story.imageAlt} loading="lazy" /></div>
          </div>
        </section>

        <section className="pht-section pht-process" id="process">
          <div className="pht-shell">
            <div className="pht-heading pht-reveal"><h2>{data.process.title}</h2><p>{data.process.description}</p></div>
            <ol>{data.process.steps.map((step, index) => <li className="pht-reveal" key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
          </div>
        </section>

        <section className="pht-section pht-testimonials" id="reviews">
          <div className="pht-shell">
            <div className="pht-heading pht-reveal"><h2>{data.testimonials.title}</h2><p>{data.testimonials.description}</p></div>
            <div className="pht-review-grid">{data.testimonials.items.map((item) => <figure className="pht-reveal" key={item.name}><div aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, star) => <Star aria-hidden="true" key={star} size={15} weight="fill" />)}</div><blockquote>“{item.quote}”</blockquote><figcaption><strong>{item.name}</strong><span>{item.detail}</span></figcaption></figure>)}</div>
          </div>
        </section>

        <section className="pht-section pht-visit" id="contact">
          <div className="pht-shell pht-visit-panel">
            <div className="pht-visit-copy pht-reveal"><p className="pht-kicker">{data.visit.note}</p><h2>{data.visit.title}</h2><p>{data.visit.description}</p><div className="pht-actions"><Button href={data.visit.primaryHref}>{data.visit.primaryLabel}</Button><Button href={data.visit.secondaryHref} quiet>{data.visit.secondaryLabel}</Button></div></div>
            <div className="pht-visit-details">
              <div><Clock aria-hidden="true" size={22} /><h3>Opening hours</h3>{data.visit.hours.map((item) => <p key={item.day}><span>{item.day}</span><strong>{item.time}</strong></p>)}</div>
              <div><MapPin aria-hidden="true" size={22} /><h3>{data.visit.areasLabel}</h3><p>{data.visit.areas.join(" · ")}</p><a href={`mailto:${data.brand.email}`}>{data.brand.email}</a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pht-footer">
        <div className="pht-shell pht-footer-grid">
          <div><a className="pht-brand" href="#top"><Brand data={data} /></a><p>{data.footer.note}</p></div>
          <nav aria-label="Footer navigation">{data.navigation.links.map((link) => <a key={`footer-${link.label}`} href={link.href}>{link.label}</a>)}</nav>
          <div className="pht-footer-contact">
            <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone size={18} />{data.brand.phone}</a>
            <a href={`mailto:${data.brand.email}`}><EnvelopeSimple size={18} />{data.brand.email}</a>
            <p>{data.brand.address}</p>
          </div>
          <div className="pht-socials">
            <a href={data.social.instagramHref} aria-label={data.social.instagram}><InstagramLogo size={20} /></a>
            <a href={data.social.facebookHref} aria-label={data.social.facebook}><FacebookLogo size={20} /></a>
            <a href={data.social.tiktokHref} aria-label={data.social.tiktok}><TiktokLogo size={20} /></a>
          </div>
        </div>
        <div className="pht-shell pht-footer-bottom"><span>{data.footer.copyright}</span><span><CalendarCheck aria-hidden="true" size={16} />Bookings and enquiries welcome</span></div>
      </footer>
    </div>
  );
}
