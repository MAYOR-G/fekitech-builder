"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import defaults from "./editable.json";
import "./styles.css";

type NavLink = { label: string; href: string };
type Stat = { value: string; title: string; text: string };
type ImageItem = { src?: string; image?: string; alt: string; title?: string; text?: string; step?: string };
type FaqItem = { question: string; answer: string };

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function GreenlyGardensTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const typography = content.theme.typography;

  const style = useMemo(() => ({
    "--grn-page": colors.page,
    "--grn-section": colors.section,
    "--grn-surface": colors.surface,
    "--grn-card": colors.card,
    "--grn-ink": colors.ink,
    "--grn-muted": colors.muted,
    "--grn-deep": colors.deep,
    "--grn-deep-alt": colors.deepAlt,
    "--grn-accent": colors.accent,
    "--grn-accent-soft": colors.accentSoft,
    "--grn-line": colors.line,
    "--grn-white": colors.white,
    "--grn-heading": typography.heading,
    "--grn-serif": typography.serif,
    "--grn-body": typography.body,
  }) as React.CSSProperties, [colors, typography]);

  const nav = list<NavLink>(content.navigation.links);
  const stats = list<Stat>(content.stats);
  const aboutPoints = list<{ title: string; text: string }>(content.about.points);
  const services = list<ImageItem>(content.services.items);
  const values = list<string>(content.values.items);
  const bullets = list<string>(content.feature.bullets);
  const process = list<ImageItem>(content.process);
  const gallery = list<ImageItem>(content.gallery.images);
  const faqs = list<FaqItem>(content.faq.items);
  const posts = list<ImageItem>(content.blog.items);
  const quickLinks = list<string>(content.footer.quickLinks);
  const footerServices = list<string>(content.footer.services);

  return (
    <main id="home" data-template-id="greenly-gardens" className="greenly-gardens" style={style}>
      <section className="grn-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(18, 45, 31, .76), rgba(18, 45, 31, .42) 46%, rgba(18, 45, 31, .08)), url(${str(content.hero.image)})` }}>
        <header className="grn-header">
          <a className="grn-brand" href="#home" aria-label={str(content.brand.name)}>
            <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
          </a>
          <nav aria-label="Primary navigation">
            {nav.map((link) => <a href={link.href} key={link.label}>{link.label}</a>)}
          </nav>
          <a className="grn-header-cta" href={str(content.navigation.ctaHref)}>{str(content.navigation.ctaLabel)}</a>
        </header>

        <div className="grn-hero-copy">
          <h1>
            {str(content.hero.titlePrefix)}<br />
            <span>{str(content.hero.titleMain)}</span> {str(content.hero.titleAccent)} <em>{str(content.hero.titleSuffix)}</em>
          </h1>
          <p>{str(content.hero.text)}</p>
        </div>
      </section>

      <section className="grn-stats" aria-label="Greenly benefits">
        {stats.map((stat) => (
          <article key={stat.title}>
            <strong>{stat.value}</strong>
            <h2>{stat.title}</h2>
            <p>{stat.text}</p>
          </article>
        ))}
      </section>

      <section id="about" className="grn-section grn-about">
        <img src={str(content.about.image)} alt={str(content.about.imageAlt)} />
        <div>
          <h2>{str(content.about.title)} <em>{str(content.about.accent)}</em></h2>
          <p>{str(content.about.text)}</p>
          {aboutPoints.map((point) => (
            <div className="grn-about-point" key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
          <a className="grn-button" href={str(content.about.buttonHref)}>{str(content.about.buttonLabel)}</a>
        </div>
      </section>

      <section id="services" className="grn-section grn-services">
        <h2>{str(content.services.title)} <em>{str(content.services.accent)}</em></h2>
        <div className="grn-service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <img src={str(service.image)} alt={service.alt} />
              <h3>{service.title}</h3>
            </article>
          ))}
        </div>
        <a className="grn-button" href={str(content.services.buttonHref)}>{str(content.services.buttonLabel)}</a>
      </section>

      <section className="grn-section grn-values">
        <h2>{str(content.values.title)} <em>{str(content.values.accent)}</em></h2>
        <p>{str(content.values.text)}</p>
        <div>
          {values.map((value) => <span key={value}>{value}</span>)}
        </div>
      </section>

      <section className="grn-feature">
        <img src={str(content.feature.image)} alt={str(content.feature.imageAlt)} />
        <div>
          <h2>{str(content.feature.title)} <em>{str(content.feature.accent)}</em></h2>
          <p>{str(content.feature.text)}</p>
          <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
          <a className="grn-button" href={str(content.feature.buttonHref)}>{str(content.feature.buttonLabel)}</a>
        </div>
      </section>

      <section className="grn-section grn-process">
        {process.map((item) => (
          <article key={item.title}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <img src={str(item.image)} alt={item.alt} />
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="grn-testimonial">
        <h2>{str(content.testimonial.title)} <em>{str(content.testimonial.accent)}</em></h2>
        <article>
          <img src={str(content.testimonial.image)} alt={str(content.testimonial.imageAlt)} />
          <div>
            <p className="grn-stars" aria-label="Five star rating">★★★★★</p>
            <blockquote>{str(content.testimonial.quote)}</blockquote>
            <strong>{str(content.testimonial.name)}</strong>
            <span>{str(content.testimonial.role)}</span>
          </div>
        </article>
        <div className="grn-slider-dots" aria-hidden="true"><i /><i /></div>
      </section>

      <section id="gallery" className="grn-section grn-gallery">
        <div className="grn-section-head">
          <h2>{str(content.gallery.title)}</h2>
          <a className="grn-button" href={str(content.gallery.buttonHref)}>{str(content.gallery.buttonLabel)}</a>
        </div>
        <div className="grn-gallery-grid">
          {gallery.map((image, index) => <img key={`${image.alt}-${index}`} src={str(image.src)} alt={image.alt} />)}
        </div>
      </section>

      <section className="grn-section grn-faq">
        <div className="grn-faq-head">
          <h2>{str(content.faq.title)} <em>{str(content.faq.accent)}</em></h2>
          <p>{str(content.faq.text)}</p>
        </div>
        <div className="grn-faq-layout">
          <article className="grn-faq-card">
            <h3>{str(content.faq.cardTitle)}</h3>
            <p>{str(content.faq.cardText)}</p>
            <a className="grn-button" href={str(content.faq.buttonHref)}>{str(content.faq.buttonLabel)}</a>
          </article>
          <div className="grn-accordion">
            {faqs.map((item, index) => (
              <details key={item.question} open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="grn-section grn-blog">
        <h2>{str(content.blog.title)} <em>{str(content.blog.accent)}</em></h2>
        <div>
          {posts.map((post) => (
            <article key={post.title}>
              <img src={str(post.image)} alt={post.alt} />
              <h3>{post.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="grn-final-cta">
        <div>
          <h2>{str(content.cta.title)}<br /><em>{str(content.cta.accent)}</em></h2>
          <p>{str(content.cta.text)}</p>
          <a className="grn-button" href={str(content.cta.buttonHref)}>{str(content.cta.buttonLabel)}</a>
        </div>
        <img src={str(content.cta.image)} alt={str(content.cta.imageAlt)} />
      </section>

      <footer id="contact" className="grn-footer">
        <div className="grn-footer-brand">
          <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
          <p>{str(content.footer.text)}</p>
          <a className="grn-button" href={str(content.navigation.ctaHref)}>{str(content.navigation.ctaLabel)}</a>
        </div>
        <div>
          <h3>Quick Links</h3>
          {quickLinks.map((link) => <a href="#home" key={link}>{link}</a>)}
        </div>
        <div>
          <h3>Our Services</h3>
          {footerServices.map((service) => <a href="#services" key={service}>{service}</a>)}
        </div>
        <div>
          <h3>Contact Us</h3>
          <a href={str(content.brand.emailHref)}>{str(content.brand.email)}</a>
          <a href={str(content.brand.phoneHref)}>{str(content.brand.phone)}</a>
          <p>{str(content.brand.address)}</p>
        </div>
        <small>{str(content.footer.legal)}</small>
      </footer>
    </main>
  );
}
