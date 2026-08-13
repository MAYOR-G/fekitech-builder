"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import defaults from "./editable.json";
import "./styles.css";

type NavLink = { label: string; href: string };
type Stat = { value: string; label: string };
type Service = { title: string; text: string; image: string; alt: string; tags: string[] };
type Point = { value: string; label: string };
type Step = { step: string; title: string; text: string };
type ImageItem = { src: string; alt: string };
type Person = { name: string; role: string; image: string; alt: string };
type Testimonial = { quote: string; name: string; role: string; image: string; alt: string };
type Faq = { question: string; answer: string };

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function AgritechGrowthTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const typography = content.theme.typography;
  const nav = list<NavLink>(content.navigation.links);
  const stats = list<Stat>(content.about.stats);
  const services = list<Service>(content.services.items);
  const points = list<Point>(content.feature.points);
  const steps = list<Step>(content.process.steps);
  const gallery = list<ImageItem>(content.gallery.images);
  const members = list<Person>(content.team.members);
  const testimonials = list<Testimonial>(content.testimonials.items);
  const faqs = list<Faq>(content.faq.items);
  const quickLinks = list<string>(content.footer.quickLinks);
  const footerServices = list<string>(content.footer.services);
  const social = list<string>(content.footer.social);

  const style = {
    "--ag-page": colors.page,
    "--ag-section": colors.section,
    "--ag-surface": colors.surface,
    "--ag-card": colors.card,
    "--ag-ink": colors.ink,
    "--ag-muted": colors.muted,
    "--ag-deep": colors.deep,
    "--ag-deep-soft": colors.deepSoft,
    "--ag-accent": colors.accent,
    "--ag-accent-alt": colors.accentAlt,
    "--ag-line": colors.line,
    "--ag-white": colors.white,
    "--ag-heading": typography.heading,
    "--ag-body": typography.body,
  } as React.CSSProperties;

  return (
    <main id="home" data-template-id="agritech-growth" className="agritech-growth" style={style}>
      <section
        className="ag-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 17, 10, .82), rgba(5, 17, 10, .46) 54%, rgba(5, 17, 10, .2)), url(${str(content.hero.image)})` }}
      >
        <header className="ag-header">
          <a className="ag-brand" href="#home" aria-label={str(content.brand.name)}>
            <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
          </a>
          <nav aria-label="Primary navigation">
            {nav.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
          </nav>
          <a className="ag-header-cta" href={str(content.navigation.ctaHref)}>{str(content.navigation.ctaLabel)}</a>
        </header>

        <div className="ag-hero-inner">
          <div className="ag-hero-copy">
            <p className="ag-kicker">{str(content.hero.eyebrow)}</p>
            <h1>{str(content.hero.title)}</h1>
          </div>
          <aside className="ag-hero-panel">
            <p>{str(content.hero.text)}</p>
            <div className="ag-hero-actions">
              <a className="ag-button" href={str(content.hero.primaryHref)}>{str(content.hero.primaryLabel)}</a>
              <a className="ag-button ag-button-light" href={str(content.hero.secondaryHref)}>{str(content.hero.secondaryLabel)}</a>
            </div>
          </aside>
          <article className="ag-floating-card">
            <img src={str(content.hero.cardImage)} alt={str(content.hero.cardImageAlt)} />
            <h2>{str(content.hero.cardTitle)}</h2>
            <p>{str(content.hero.cardText)}</p>
          </article>
        </div>
      </section>

      <section id="about" className="ag-section ag-about">
        <div className="ag-about-top">
          <p className="ag-eyebrow">{str(content.about.eyebrow)}</p>
          <h2>{str(content.about.title)}</h2>
          <p>{str(content.about.text)}</p>
        </div>
        <div className="ag-stats">
          {stats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="ag-section ag-services">
        <div className="ag-section-head">
          <div>
            <p className="ag-eyebrow">{str(content.services.eyebrow)}</p>
            <h2>{str(content.services.title)}</h2>
          </div>
          <a className="ag-button" href={str(content.services.buttonHref)}>{str(content.services.buttonLabel)}</a>
        </div>
        <div className="ag-service-grid">
          {services.map((service) => (
            <article key={service.title} style={{ backgroundImage: `linear-gradient(180deg, rgba(4, 15, 9, .1), rgba(4, 15, 9, .88)), url(${service.image})` }}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div>{list<string>(service.tags).map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="ag-overlay" style={{ backgroundImage: `linear-gradient(rgba(5, 16, 10, .72), rgba(5, 16, 10, .76)), url(${str(content.overlay.image)})` }}>
        <p className="ag-eyebrow">{str(content.overlay.eyebrow)}</p>
        <h2>{str(content.overlay.title)}</h2>
        <article>
          <img src={str(content.overlay.cardImage)} alt={str(content.overlay.cardImageAlt)} />
          <div>
            <h3>{str(content.overlay.cardTitle)}</h3>
            <p>{str(content.overlay.cardText)}</p>
          </div>
        </article>
        <aside>
          <strong>{str(content.overlay.captionTitle)}</strong>
          <span>{str(content.overlay.captionText)}</span>
        </aside>
      </section>

      <section className="ag-section ag-feature">
        <div>
          <p className="ag-eyebrow">{str(content.feature.eyebrow)}</p>
          <h2>{str(content.feature.title)}</h2>
          <p>{str(content.feature.text)}</p>
          <div className="ag-feature-points">
            {points.map((point) => (
              <article key={point.value}>
                <strong>{point.value}</strong>
                <span>{point.label}</span>
              </article>
            ))}
          </div>
        </div>
        <img src={str(content.feature.image)} alt={str(content.feature.imageAlt)} />
      </section>

      <section className="ag-section ag-process">
        <p className="ag-eyebrow">{str(content.process.eyebrow)}</p>
        <h2>{str(content.process.title)}</h2>
        <div>
          {steps.map((step) => (
            <article key={step.step}>
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="ag-gallery">
        <p className="ag-eyebrow">{str(content.gallery.eyebrow)}</p>
        <h2>{str(content.gallery.title)}</h2>
        <div>
          {gallery.map((image, index) => <img src={image.src} alt={image.alt} key={`${image.alt}-${index}`} />)}
        </div>
      </section>

      <section className="ag-section ag-team">
        <p className="ag-eyebrow">{str(content.team.eyebrow)}</p>
        <h2>{str(content.team.title)}</h2>
        <div>
          {members.map((member) => (
            <article key={member.name}>
              <img src={member.image} alt={member.alt} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="testimonials" className="ag-section ag-testimonials">
        <div className="ag-section-head">
          <div>
            <p className="ag-eyebrow">{str(content.testimonials.eyebrow)}</p>
            <h2>{str(content.testimonials.title)}</h2>
          </div>
          <p>{str(content.testimonials.intro)}</p>
        </div>
        <div>
          {testimonials.map((item) => (
            <article key={item.name}>
              <blockquote>{item.quote}</blockquote>
              <div>
                <img src={item.image} alt={item.alt} />
                <span><strong>{item.name}</strong>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ag-section ag-faq">
        <p className="ag-eyebrow">{str(content.faq.eyebrow)}</p>
        <h2>{str(content.faq.title)}</h2>
        <div>
          <div className="ag-accordion">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <img src={str(content.faq.image)} alt={str(content.faq.imageAlt)} />
        </div>
      </section>

      <section id="contact" className="ag-final">
        <h2>{str(content.cta.title)}</h2>
        <a className="ag-button" href={str(content.cta.buttonHref)}>{str(content.cta.buttonLabel)}</a>
        <footer>
          <div>
            <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
            <p>{str(content.footer.text)}</p>
            <a href={str(content.brand.emailHref)}>{str(content.brand.email)}</a>
          </div>
          <div>
            <h3>Quick Links</h3>
            {quickLinks.map((link) => <a href="#home" key={link}>{link}</a>)}
          </div>
          <div>
            <h3>Services</h3>
            {footerServices.map((service) => <a href="#services" key={service}>{service}</a>)}
          </div>
          <div>
            <h3>Contact</h3>
            <a href={str(content.brand.phoneHref)}>{str(content.brand.phone)}</a>
            <p>{str(content.brand.address)}</p>
            <div>{social.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <small>{str(content.footer.legal)}</small>
        </footer>
      </section>
    </main>
  );
}
