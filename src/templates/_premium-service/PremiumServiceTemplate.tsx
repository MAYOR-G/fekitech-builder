"use client";

/* eslint-disable @next/next/no-img-element */

import {
  ArrowRight,
  Broom,
  Buildings,
  CalendarCheck,
  CaretLeft,
  CaretRight,
  CheckCircle,
  ClipboardText,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  Hammer,
  HouseLine,
  InstagramLogo,
  LinkedinLogo,
  List,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkle,
  Star,
  UsersThree,
  Warning,
  Wrench,
  X,
} from "@phosphor-icons/react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import "./premium-service.css";

export type PremiumServiceData = {
  colors: { primary: string; background: string; text: string };
  brand: {
    name: string;
    tagline: string;
    logo: string;
    phone: string;
    email: string;
    address: string;
    notice: string;
    noticeHref: string;
  };
  navigation: {
    links: Array<{ label: string; href: string }>;
    ctaLabel: string;
    ctaHref: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    image: string;
    imageAlt: string;
  };
  trust: {
    items: Array<{ title: string; description: string }>;
  };
  services: {
    title: string;
    description: string;
    items: Array<{ name: string; description: string; image: string; imageAlt: string }>;
  };
  comparison: {
    eyebrow: string;
    title: string;
    description: string;
    beforeImage: string;
    beforeAlt: string;
    beforeLabel: string;
    afterImage: string;
    afterAlt: string;
    afterLabel: string;
    controlLabel: string;
  };
  process: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    steps: Array<{ title: string; description: string }>;
  };
  packages: {
    title: string;
    description: string;
    items: Array<{
      name: string;
      description: string;
      price: string;
      note: string;
      buttonLabel: string;
      buttonHref: string;
      features: string[];
    }>;
  };
  stats: {
    items: Array<{ value: string; label: string }>;
  };
  gallery: {
    title: string;
    description: string;
    images: Array<{ image: string; imageAlt: string; caption: string }>;
  };
  testimonials: {
    title: string;
    description: string;
    items: Array<{ quote: string; name: string; detail: string }>;
  };
  areas: {
    title: string;
    description: string;
    items: string[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    hours: Array<{ day: string; time: string }>;
  };
  social: {
    instagram: string;
    instagramHref: string;
    facebook: string;
    facebookHref: string;
    linkedin: string;
    linkedinHref: string;
  };
  footer: { note: string; copyright: string };
};

type Variant = "cleaning" | "roofing";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const revealIfInView = () => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < window.innerHeight && bounds.bottom > 0) setVisible(true);
    };
    const timeout = window.setTimeout(revealIfInView, 32);

    if (!("IntersectionObserver" in window)) {
      return () => window.clearTimeout(timeout);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );
    observer.observe(element);
    return () => {
      window.clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return <div ref={ref} className={`pst-reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

function ActionLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return (
    <a className={`pst-button ${secondary ? "pst-button--secondary" : ""}`} href={href}>
      <span>{children}</span><ArrowRight aria-hidden="true" size={17} weight="bold" />
    </a>
  );
}

function BrandMark({ data, variant }: { data: PremiumServiceData; variant: Variant }) {
  if (data.brand.logo) {
    return <img className="pst-logo-image" src={data.brand.logo} alt={`${data.brand.name} logo`} />;
  }
  return (
    <span className="pst-logo-mark" aria-hidden="true">
      {variant === "cleaning" ? <Sparkle size={25} weight="fill" /> : <HouseLine size={27} weight="duotone" />}
    </span>
  );
}

function BeforeAfter({ data }: { data: PremiumServiceData["comparison"] }) {
  const [position, setPosition] = useState(50);
  return (
    <figure className="pst-compare-figure">
      <div className="pst-compare-stage">
        <img src={data.beforeImage} alt={data.beforeAlt} draggable={false} />
        <div className="pst-compare-after" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={data.afterImage} alt={data.afterAlt} draggable={false} />
        </div>
        <input
          className="pst-compare-input"
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label={data.controlLabel}
          aria-valuetext={`${position}% ${data.afterLabel}`}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
        <span className="pst-compare-divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span><CaretLeft size={15} weight="bold" /><CaretRight size={15} weight="bold" /></span>
        </span>
      </div>
      <figcaption className="pst-compare-caption">
        <span>{data.beforeLabel}</span>
        <span>Drag or use arrow keys</span>
        <span>{data.afterLabel}</span>
      </figcaption>
    </figure>
  );
}

const cleaningServiceIcons = [HouseLine, Buildings, Sparkle, Broom, CalendarCheck];
const roofingServiceIcons = [HouseLine, Buildings, Wrench, ClipboardText, Hammer, Wrench, Warning];
const trustIcons = [ShieldCheck, UsersThree, CheckCircle, CalendarCheck];

export default function PremiumServiceTemplate({ data, variant }: { data: PremiumServiceData; variant: Variant }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isCleaning = variant === "cleaning";
  const serviceIcons = isCleaning ? cleaningServiceIcons : roofingServiceIcons;
  const themeStyle = {
    "--pst-accent": data.colors.primary,
    "--pst-background": data.colors.background,
    "--pst-ink": data.colors.text,
  } as CSSProperties;

  return (
    <div className={`pst-template pst-${variant}`} style={themeStyle}>
      <a className="pst-skip" href="#main-content">Skip to content</a>

      {!isCleaning ? (
        <div className="pst-notice">
          <div className="pst-shell">
            <a href={data.brand.noticeHref}><Warning aria-hidden="true" size={16} weight="fill" />{data.brand.notice}</a>
            <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" size={16} weight="fill" />{data.brand.phone}</a>
          </div>
        </div>
      ) : null}

      <header className="pst-header">
        <div className="pst-shell pst-header-inner">
          <a className="pst-brand" href="#top" aria-label={`${data.brand.name} home`}>
            <BrandMark data={data} variant={variant} />
            <span><strong>{data.brand.name}</strong><small>{data.brand.tagline}</small></span>
          </a>
          <nav className={`pst-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
            {data.navigation.links.map((link) => <a key={`${link.label}-${link.href}`} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          </nav>
          <div className="pst-header-actions">
            {isCleaning ? <a className="pst-phone" href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" size={17} />{data.brand.phone}</a> : null}
            <ActionLink href={data.navigation.ctaHref}>{data.navigation.ctaLabel}</ActionLink>
            <button className="pst-menu-button" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="pst-hero" id="top">
          <div className="pst-shell pst-hero-grid">
            <Reveal className="pst-hero-copy">
              <p className="pst-eyebrow">{data.hero.eyebrow}</p>
              <h1>{data.hero.title}</h1>
              <p className="pst-hero-description">{data.hero.description}</p>
              <div className="pst-actions">
                <ActionLink href={data.hero.primaryHref}>{data.hero.primaryLabel}</ActionLink>
                <ActionLink href={data.hero.secondaryHref} secondary>{data.hero.secondaryLabel}</ActionLink>
              </div>
            </Reveal>
            <div className="pst-hero-media">
              <img src={data.hero.image} alt={data.hero.imageAlt} fetchPriority="high" />
              <div className="pst-hero-proof">
                <ShieldCheck aria-hidden="true" size={24} weight="duotone" />
                <span>{data.trust.items[0]?.title}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pst-trust" aria-label="Why customers trust us">
          <div className="pst-shell pst-trust-grid">
            {data.trust.items.map((item, index) => {
              const Icon = trustIcons[index % trustIcons.length];
              return <article key={item.title}><Icon aria-hidden="true" size={25} weight="duotone" /><div><h2>{item.title}</h2><p>{item.description}</p></div></article>;
            })}
          </div>
        </section>

        <section className="pst-section pst-services" id="services">
          <div className="pst-shell">
            <Reveal className="pst-section-heading">
              <h2>{data.services.title}</h2>
              <p>{data.services.description}</p>
            </Reveal>
            <div className="pst-services-grid">
              {data.services.items.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];
                return (
                  <Reveal className={`pst-service pst-service--${index + 1}`} key={service.name}>
                    {service.image ? <img src={service.image} alt={service.imageAlt} loading="lazy" /> : null}
                    <div className="pst-service-content">
                      <Icon aria-hidden="true" size={27} weight="duotone" />
                      <h3>{service.name}</h3>
                      <p>{service.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="pst-section pst-comparison" id="results">
          <div className="pst-shell pst-comparison-grid">
            <Reveal className="pst-comparison-copy">
              <p className="pst-eyebrow">{data.comparison.eyebrow}</p>
              <h2>{data.comparison.title}</h2>
              <p>{data.comparison.description}</p>
            </Reveal>
            <Reveal><BeforeAfter data={data.comparison} /></Reveal>
          </div>
        </section>

        <section className="pst-section pst-process" id="process">
          <div className="pst-shell pst-process-grid">
            <div className="pst-process-media"><img src={data.process.image} alt={data.process.imageAlt} loading="lazy" /></div>
            <div className="pst-process-copy">
              <Reveal className="pst-section-heading"><h2>{data.process.title}</h2><p>{data.process.description}</p></Reveal>
              <div className="pst-process-steps">
                {data.process.steps.map((step, index) => (
                  <Reveal className="pst-process-step" key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pst-section pst-packages" id="packages">
          <div className="pst-shell">
            <Reveal className="pst-section-heading"><h2>{data.packages.title}</h2><p>{data.packages.description}</p></Reveal>
            <div className="pst-package-grid">
              {data.packages.items.map((item, index) => (
                <Reveal className={`pst-package ${index === 0 ? "pst-package--featured" : ""}`} key={item.name}>
                  <div><h3>{item.name}</h3><p>{item.description}</p></div>
                  <strong>{item.price}</strong><small>{item.note}</small>
                  <ul>{item.features.map((feature) => <li key={feature}><CheckCircle aria-hidden="true" size={18} weight="fill" />{feature}</li>)}</ul>
                  <ActionLink href={item.buttonHref} secondary={index !== 0}>{item.buttonLabel}</ActionLink>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pst-stats" aria-label="Company statistics">
          <div className="pst-shell pst-stats-grid">
            {data.stats.items.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
          </div>
        </section>

        <section className="pst-section pst-gallery" id="gallery">
          <div className="pst-shell">
            <Reveal className="pst-section-heading"><h2>{data.gallery.title}</h2><p>{data.gallery.description}</p></Reveal>
            <div className="pst-gallery-grid">
              {data.gallery.images.map((item, index) => (
                <Reveal className={`pst-gallery-item pst-gallery-item--${index + 1}`} key={`${item.caption}-${index}`}>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" /><p>{item.caption}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pst-section pst-testimonials" id="reviews">
          <div className="pst-shell">
            <Reveal className="pst-section-heading"><h2>{data.testimonials.title}</h2><p>{data.testimonials.description}</p></Reveal>
            <div className="pst-testimonial-grid">
              {data.testimonials.items.map((item, index) => (
                <Reveal className={`pst-testimonial pst-testimonial--${index + 1}`} key={item.name}>
                  <div className="pst-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, star) => <Star key={star} aria-hidden="true" size={15} weight="fill" />)}</div>
                  <blockquote>“{item.quote}”</blockquote><p><strong>{item.name}</strong><span>{item.detail}</span></p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="pst-section pst-areas" id="areas">
          <div className="pst-shell pst-areas-grid">
            <Reveal><MapPin aria-hidden="true" size={32} weight="duotone" /><h2>{data.areas.title}</h2><p>{data.areas.description}</p></Reveal>
            <div className="pst-area-list">{data.areas.items.map((area) => <span key={area}>{area}</span>)}</div>
          </div>
        </section>

        <section className="pst-section pst-contact" id="contact">
          <div className="pst-shell pst-contact-panel">
            <Reveal className="pst-contact-copy">
              <p className="pst-eyebrow">{data.contact.eyebrow}</p><h2>{data.contact.title}</h2><p>{data.contact.description}</p>
              <div className="pst-actions"><ActionLink href={data.contact.primaryHref}>{data.contact.primaryLabel}</ActionLink><ActionLink href={data.contact.secondaryHref} secondary>{data.contact.secondaryLabel}</ActionLink></div>
            </Reveal>
            <div className="pst-contact-details">
              <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" size={20} /><span>{data.brand.phone}</span></a>
              <a href={`mailto:${data.brand.email}`}><EnvelopeSimple aria-hidden="true" size={20} /><span>{data.brand.email}</span></a>
              <p><MapPin aria-hidden="true" size={20} /><span>{data.brand.address}</span></p>
              <div className="pst-hours"><Clock aria-hidden="true" size={20} /><div>{data.contact.hours.map((item) => <p key={item.day}><span>{item.day}</span><strong>{item.time}</strong></p>)}</div></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pst-footer">
        <div className="pst-shell pst-footer-grid">
          <div><a className="pst-brand" href="#top"><BrandMark data={data} variant={variant} /><span><strong>{data.brand.name}</strong><small>{data.footer.note}</small></span></a></div>
          <nav aria-label="Footer navigation">{data.navigation.links.map((link) => <a key={`footer-${link.label}`} href={link.href}>{link.label}</a>)}</nav>
          <div className="pst-socials">
            <a href={data.social.instagramHref} aria-label={data.social.instagram}><InstagramLogo size={20} /></a>
            <a href={data.social.facebookHref} aria-label={data.social.facebook}><FacebookLogo size={20} /></a>
            <a href={data.social.linkedinHref} aria-label={data.social.linkedin}><LinkedinLogo size={20} /></a>
          </div>
        </div>
        <div className="pst-shell pst-footer-bottom"><span>{data.footer.copyright}</span><a href={`mailto:${data.brand.email}`}>{data.brand.email}</a></div>
      </footer>
    </div>
  );
}
