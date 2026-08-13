"use client";

import React from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Feature = { title: string; text: string };
type ImageCard = { title: string; type?: string; text?: string; category?: string; image: string; imageAlt: string };
type Testimonial = { quote: string; name: string; role: string };
type Faq = { question: string; answer: string };
type FooterColumn = { title: string; links: LinkItem[] };

function asItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function Lines({ text }: { text: string }) {
  return <>{text.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</>;
}

function Mark() {
  return <span className="chl-mark" aria-hidden="true">✦</span>;
}

export default function CleanHubLondonTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;
  const themeStyle = {
    "--chl-page": colors.page,
    "--chl-surface": colors.surface,
    "--chl-soft": colors.soft,
    "--chl-ink": colors.ink,
    "--chl-body": colors.body,
    "--chl-muted": colors.muted,
    "--chl-line": colors.line,
    "--chl-accent": colors.accent,
    "--chl-dark": colors.dark,
    "--chl-footer": colors.footer,
    "--chl-heading-font": fonts.heading,
    "--chl-body-font": fonts.body,
  } as React.CSSProperties;

  const navLinks = asItems<LinkItem>(content.navigation.links);
  const logos = asItems<string>(content.trust.logos);
  const features = asItems<Feature>(content.about.features);
  const projects = asItems<ImageCard>(content.projects.items);
  const howSteps = asItems<Feature>(content.how.steps);
  const services = asItems<ImageCard>(content.services.items);
  const testimonials = asItems<Testimonial>(content.testimonials.items);
  const tips = asItems<ImageCard>(content.tips.items);
  const faqs = asItems<Faq>(content.faq.items);
  const footerColumns = asItems<FooterColumn>(content.footer.columns);

  return (
    <main id="home" data-template-id="cleanhub-london" className="cleanhub-london" style={themeStyle}>
      <header className="chl-header">
        <a className="chl-logo" href="#home"><Mark />{str(content.brand.name)}</a>
        <nav aria-label="Primary navigation">
          {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="chl-pill" href={str(content.navigation.buttonHref)}>{str(content.navigation.buttonLabel)}</a>
      </header>

      <section className="chl-hero">
        <img src={str(content.hero.image)} alt={str(content.hero.imageAlt)} />
        <div className="chl-hero-copy">
          <p>{str(content.hero.eyebrow)}</p>
          <h1><Lines text={str(content.hero.title)} /></h1>
          <a className="chl-button" href={str(content.hero.buttonHref)}>{str(content.hero.buttonLabel)}</a>
          <a className="chl-phone" href={str(content.brand.phoneHref)}>{str(content.brand.phone)}</a>
          <span>{str(content.hero.text)}</span>
        </div>
        <b>{str(content.hero.badge)}</b>
      </section>

      <section className="chl-trust">
        <p>{str(content.trust.title)}</p>
        <div>{logos.map((logo) => <span key={logo}>{logo}</span>)}</div>
      </section>

      <section id="about" className="chl-section chl-about">
        <p className="chl-kicker">{str(content.about.eyebrow)}</p>
        <h2><Lines text={str(content.about.title)} /></h2>
        <p>{str(content.about.text)}</p>
        <a className="chl-button" href={str(content.about.buttonHref)}>{str(content.about.buttonLabel)}</a>
        <div className="chl-feature-grid">
          {features.map((feature) => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}
        </div>
      </section>

      <section id="projects" className="chl-section chl-projects">
        <p className="chl-kicker">{str(content.projects.title)}</p>
        <div className="chl-project-grid">
          {projects.map((project) => (
            <article key={project.title}>
              <img src={project.image} alt={project.imageAlt} />
              <span>{project.type}</span>
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="chl-section chl-how">
        <h2>{str(content.how.title)}</h2>
        <div>
          {howSteps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
      </section>

      <section id="services" className="chl-section chl-services">
        <p className="chl-kicker">{str(content.services.eyebrow)}</p>
        <h2><Lines text={str(content.services.title)} /></h2>
        <div className="chl-service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <img src={service.image} alt={service.imageAlt} />
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
        <a className="chl-button chl-right" href={str(content.services.buttonHref)}>{str(content.services.buttonLabel)}</a>
      </section>

      <section id="reviews" className="chl-section chl-reviews">
        <h2><Lines text={str(content.testimonials.title)} /></h2>
        <div className="chl-review-grid">
          {testimonials.map((item) => <blockquote key={item.name}><p>{item.quote}</p><footer>{item.name}<span>{item.role}</span></footer></blockquote>)}
        </div>
      </section>

      <section id="tips" className="chl-section chl-tips">
        <div>
          <h2><Lines text={str(content.tips.title)} /></h2>
          <a className="chl-pill" href={str(content.tips.buttonHref)}>{str(content.tips.buttonLabel)}</a>
        </div>
        <div className="chl-tip-list">
          {tips.map((tip) => (
            <article key={tip.title}>
              <img src={tip.image} alt={tip.imageAlt} />
              <div><span>{tip.category}</span><h3>{tip.title}</h3></div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="chl-section chl-faq">
        <div>
          <h2><Lines text={str(content.faq.title)} /></h2>
          <a className="chl-button" href={str(content.faq.buttonHref)}>{str(content.faq.buttonLabel)}</a>
        </div>
        <div className="chl-faq-list">
          {faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <section id="contact" className="chl-cta">
        <img src={str(content.cta.image)} alt={str(content.cta.imageAlt)} />
        <div>
          <h2><Lines text={str(content.cta.title)} /></h2>
          <p>{str(content.cta.text)}</p>
          <a className="chl-button" href={str(content.cta.buttonHref)}>{str(content.cta.buttonLabel)}</a>
        </div>
      </section>

      <footer className="chl-footer">
        <div>
          <h2><Lines text={str(content.footer.title)} /></h2>
          <p>{str(content.footer.text)}</p>
          <a className="chl-button" href={str(content.footer.buttonHref)}>{str(content.footer.buttonLabel)}</a>
        </div>
        {footerColumns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h3>{column.title}</h3>
            {asItems<LinkItem>(column.links).map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </nav>
        ))}
        <p className="chl-copy">{str(content.brand.copyright)}</p>
      </footer>
    </main>
  );
}
