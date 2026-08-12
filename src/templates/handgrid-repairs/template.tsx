"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Card = { title: string; text: string };
type ImageCard = Card & { image: string; alt: string; date?: string };
type Review = { quote: string; name: string; role: string };
type Stat = { value: string; label: string };

function items<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : [];
}

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function HandGridRepairsTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;

  const style = useMemo(() => ({
    "--hgr-page": colors.page,
    "--hgr-section": colors.section,
    "--hgr-card": colors.card,
    "--hgr-ink": colors.ink,
    "--hgr-muted": colors.muted,
    "--hgr-dark": colors.dark,
    "--hgr-accent": colors.accent,
    "--hgr-accent-dark": colors.accentDark,
    "--hgr-line": colors.line,
    "--hgr-heading": fonts.heading,
    "--hgr-body": fonts.body,
  }) as React.CSSProperties, [colors, fonts]);

  const nav = items<LinkItem>(content.navigation.links);
  const quickLinks = items<LinkItem>(content.quickLinks);
  const trustCards = items<Card>(content.trustCards);
  const aboutPoints = items<string>(content.about.points);
  const stats = items<Stat>(content.stats.items);
  const priorityPoints = items<string>(content.priority.points);
  const services = items<ImageCard>(content.services.items);
  const process = items<Card>(content.process.items);
  const reviews = items<Review>(content.reviews.items);
  const blog = items<ImageCard>(content.blog.items);
  const footerLinks = items<LinkItem>(content.footer.links);
  const footerServices = items<LinkItem>(content.footer.services);
  const social = items<LinkItem>(content.footer.social);

  return (
    <main id="home" data-template-id="handgrid-repairs" className="handgrid-repairs" style={style}>
      <section className="hgr-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.74), rgba(0,0,0,.28) 44%, rgba(0,0,0,.08)), url(${text(content.hero.image)})` }}>
        <header className="hgr-header">
          <a className="hgr-brand" href="#home" aria-label={text(content.brand.name)}>
            <img src={text(content.brand.logo)} alt={text(content.brand.logoAlt)} />
          </a>
          <nav aria-label="Primary navigation">
            {nav.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </nav>
          <a className="hgr-call" href={text(content.navigation.ctaHref)}>{text(content.navigation.ctaLabel)}</a>
        </header>
        <div className="hgr-hero-body">
          <div className="hgr-hero-copy">
            <h1>{text(content.hero.title)}</h1>
            <p>{text(content.hero.text)}</p>
            <div className="hgr-actions">
              <a className="hgr-button hgr-button-red" href={text(content.hero.primaryHref)}>{text(content.hero.primaryLabel)}</a>
              <a className="hgr-button hgr-button-light" href={text(content.hero.secondaryHref)}>{text(content.hero.secondaryLabel)}</a>
            </div>
          </div>
          <div className="hgr-floating-links">
            {quickLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </div>
          <div className="hgr-trust-pill">
            <div>
              <span />
              <span />
              <span />
              <span />
            </div>
            <p>{text(content.hero.trust)}<b>{text(content.hero.rating)}</b></p>
          </div>
        </div>
      </section>

      <section className="hgr-trust-grid">
        {trustCards.map((card) => (
          <article key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>

      <section id="about" className="hgr-section hgr-about">
        <img src={text(content.about.image)} alt={text(content.about.imageAlt)} />
        <div>
          <h2>{text(content.about.title)}</h2>
          <p>{text(content.about.text)}</p>
          <div className="hgr-bullets">
            {aboutPoints.map((point) => <span key={point}>{point}</span>)}
          </div>
        </div>
      </section>

      <section className="hgr-section hgr-stats">
        <h2>{text(content.stats.title)}</h2>
        <div>
          {stats.map((stat) => (
            <article key={stat.label}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="hgr-section hgr-priority">
        <div>
          <h2>{text(content.priority.title)}</h2>
          <p>{text(content.priority.text)}</p>
          <div className="hgr-priority-points">
            {priorityPoints.map((point) => <span key={point}>{point}</span>)}
          </div>
          <a className="hgr-button hgr-button-red" href={text(content.priority.buttonHref)}>{text(content.priority.buttonLabel)}</a>
        </div>
        <img src={text(content.priority.image)} alt={text(content.priority.imageAlt)} />
      </section>

      <section id="services" className="hgr-section hgr-services">
        <h2>{text(content.services.title)}</h2>
        <div className="hgr-service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <img src={service.image} alt={service.alt} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </div>
            </article>
          ))}
        </div>
        <a className="hgr-button hgr-button-red" href={text(content.services.buttonHref)}>{text(content.services.buttonLabel)}</a>
      </section>

      <section className="hgr-section hgr-process">
        <h2>{text(content.process.title)}</h2>
        <div>
          {process.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="hgr-section hgr-reviews">
        <h2>{text(content.reviews.title)}</h2>
        <div>
          {reviews.map((review) => (
            <article key={review.name}>
              <b>"</b>
              <h3>{review.quote}</h3>
              <p>{review.name}</p>
              <span>{review.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="hgr-section hgr-blog">
        <h2>{text(content.blog.title)}</h2>
        <div className="hgr-blog-grid">
          {blog.map((post) => (
            <article key={post.title}>
              <img src={post.image} alt={post.alt} />
              <div>
                <h3>{post.title}</h3>
                <p>{post.text}</p>
                <span>{post.date}</span>
              </div>
            </article>
          ))}
        </div>
        <a className="hgr-button hgr-button-red" href={text(content.blog.buttonHref)}>{text(content.blog.buttonLabel)}</a>
      </section>

      <section id="contact" className="hgr-cta">
        <div>
          <h2>{text(content.cta.title)}</h2>
          <a className="hgr-button hgr-button-light" href={text(content.cta.buttonHref)}>{text(content.cta.buttonLabel)}</a>
        </div>
        <img src={text(content.cta.image)} alt={text(content.cta.imageAlt)} />
      </section>

      <footer className="hgr-footer">
        <div>
          <img src={text(content.brand.logo)} alt={text(content.brand.logoAlt)} />
          <p>{text(content.brand.address)}</p>
        </div>
        <div>
          <h3>Navigation</h3>
          {footerLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <div>
          <h3>Services</h3>
          {footerServices.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <div>
          <h3>Contact</h3>
          <a href={text(content.brand.emailHref)}>{text(content.brand.email)}</a>
          <a href={text(content.brand.phoneHref)}>{text(content.brand.phone)}</a>
        </div>
        <div className="hgr-footer-bottom">
          <p>{social.map((link) => link.label).join(" / ")}</p>
          <p>{text(content.footer.legal)}</p>
        </div>
      </footer>
    </main>
  );
}
