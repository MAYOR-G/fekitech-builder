"use client";

import React from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Stat = { label: string; value: string };
type Step = { title: string; text: string };
type Metric = { value: string; label: string };
type Plan = { name: string; price: string; period: string; image: string; imageAlt: string; features: string[] };
type Person = { name: string; role: string; image: string; imageAlt: string };
type Faq = { question: string; answer: string };
type FooterColumn = { title: string; links: LinkItem[] };

function asItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function Mark() {
  return <span className="vai-mark" aria-hidden="true">✦</span>;
}

function Lines({ text }: { text: string }) {
  return <>{text.split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</>;
}

export default function ValistAiStudioTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;
  const themeStyle = {
    "--vai-page": colors.page,
    "--vai-section": colors.section,
    "--vai-ink": colors.ink,
    "--vai-body": colors.body,
    "--vai-muted": colors.muted,
    "--vai-line": colors.line,
    "--vai-card": colors.card,
    "--vai-soft": colors.soft,
    "--vai-accent": colors.accent,
    "--vai-accent-dark": colors.accentDark,
    "--vai-dark": colors.dark,
    "--vai-heading-font": fonts.heading,
    "--vai-body-font": fonts.body,
  } as React.CSSProperties;

  const navLinks = asItems<LinkItem>(content.navigation.links);
  const introStats = asItems<Stat>(content.intro.stats);
  const serviceItems = asItems<string>(content.services.items);
  const buttonLabels = asItems<string>(content.services.buttonLabels);
  const steps = asItems<Step>(content.process.steps);
  const metrics = asItems<Metric>(content.results.metrics);
  const leftTags = asItems<string>(content.comparison.leftTags);
  const rightTags = asItems<string>(content.comparison.rightTags);
  const plans = asItems<Plan>(content.pricing.plans);
  const people = asItems<Person>(content.team.people);
  const faqs = asItems<Faq>(content.faq.items);
  const footerColumns = asItems<FooterColumn>(content.footer.columns);

  return (
    <main id="home" data-template-id="valist-ai-studio" className="valist-ai-studio" style={themeStyle}>
      <header className="vai-header">
        <a className="vai-logo" href="#home"><Mark />{str(content.brand.name)}</a>
        <nav aria-label="Primary navigation">
          {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="vai-nav-button" href={str(content.navigation.buttonHref)}>{str(content.navigation.buttonLabel)}</a>
      </header>

      <section className="vai-hero">
        <p>{str(content.hero.eyebrow)}</p>
        <h1><Lines text={str(content.hero.title)} /></h1>
        <span>{str(content.hero.text)}</span>
        <form>
          <input aria-label={str(content.hero.inputPlaceholder)} placeholder={str(content.hero.inputPlaceholder)} />
          <a href={str(content.hero.buttonHref)}>{str(content.hero.buttonLabel)}</a>
        </form>
        <figure>
          <img src={str(content.hero.image)} alt={str(content.hero.imageAlt)} />
          <figcaption>{str(content.hero.badge)}</figcaption>
        </figure>
      </section>

      <section className="vai-intro">
        <h2>{str(content.intro.title)}</h2>
        <div className="vai-stat-grid">
          {introStats.map((stat) => <article key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong></article>)}
        </div>
      </section>

      <section id="services" className="vai-section vai-services">
        <div className="vai-service-list">
          <h2><Lines text={str(content.services.title)} /></h2>
          {serviceItems.map((item) => <a key={item} href="#contact">{item} →</a>)}
        </div>
        <div className="vai-service-copy">
          <p>{str(content.services.text)}</p>
          <div className="vai-image-pair">
            <img src={str(content.services.imageA)} alt={str(content.services.imageAAlt)} />
            <img src={str(content.services.imageB)} alt={str(content.services.imageBAlt)} />
          </div>
          <div className="vai-chip-row">
            {buttonLabels.map((label) => <span key={label}>{label}</span>)}
          </div>
        </div>
      </section>

      <section className="vai-section vai-proof">
        <h2><Lines text={str(content.proof.title)} /></h2>
        <div className="vai-proof-grid">
          <article className="vai-quote-card">
            <img src={str(content.proof.image)} alt={str(content.proof.imageAlt)} />
            <blockquote>{str(content.proof.quote)}</blockquote>
            <span>{str(content.proof.name)}</span>
          </article>
          <article className="vai-impact-card">
            <span>Positive Impact</span>
            <strong>{str(content.proof.metric)}</strong>
            <p>{str(content.proof.metricText)}</p>
          </article>
        </div>
      </section>

      <section className="vai-section vai-process">
        <div>
          <h2><Lines text={str(content.process.title)} /></h2>
          <p>{str(content.process.text)}</p>
          <a href={str(content.process.buttonHref)}>{str(content.process.buttonLabel)}</a>
        </div>
        <div className="vai-step-list">
          {steps.map((step, index) => (
            <article key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cases" className="vai-section vai-results">
        <h2>{str(content.results.title)}</h2>
        <p>{str(content.results.text)}</p>
        <div className="vai-results-grid">
          <article className="vai-result-quote">
            <img src={str(content.results.image)} alt={str(content.results.imageAlt)} />
            <blockquote>{str(content.results.quote)}</blockquote>
            <a href={str(content.results.buttonHref)}>{str(content.results.buttonLabel)}</a>
          </article>
          <div className="vai-metrics">
            {metrics.map((metric) => <article key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></article>)}
          </div>
        </div>
      </section>

      <section className="vai-section vai-comparison">
        <h2><Lines text={str(content.comparison.title)} /></h2>
        <p>{str(content.comparison.text)}</p>
        <div className="vai-compare-grid">
          <article><h3>{str(content.comparison.leftTitle)}</h3>{leftTags.map((tag) => <span key={tag}>{tag}</span>)}</article>
          <article><h3>{str(content.comparison.rightTitle)}</h3>{rightTags.map((tag) => <span key={tag}>{tag}</span>)}</article>
        </div>
      </section>

      <section id="pricing" className="vai-section vai-pricing">
        <h2>{str(content.pricing.title)}</h2>
        <p>{str(content.pricing.text)}</p>
        <div className="vai-plan-grid">
          {plans.map((plan) => (
            <article key={plan.name}>
              <img src={plan.image} alt={plan.imageAlt} />
              <span>{plan.name}</span>
              <h3>{plan.price}<small>{plan.period}</small></h3>
              <ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="vai-section vai-team">
        <div>
          <h2><Lines text={str(content.team.title)} /></h2>
          <p>{str(content.team.text)}</p>
        </div>
        <div className="vai-team-grid">
          {people.map((person) => (
            <article key={person.name}>
              <img src={person.image} alt={person.imageAlt} />
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="vai-section vai-faq">
        <h2>{str(content.faq.title)}</h2>
        <p>{str(content.faq.text)}</p>
        <div className="vai-faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span>+</span></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="vai-contact">
        <Mark />
        <h2><Lines text={str(content.contact.title)} /></h2>
        <p>{str(content.contact.text)}</p>
        <a href={str(content.contact.buttonHref)}>{str(content.contact.buttonLabel)}</a>
      </section>

      <footer className="vai-footer">
        <div className="vai-footer-top">
          <img src={str(content.footer.image)} alt={str(content.footer.imageAlt)} />
          <div>
            <strong>{str(content.brand.name)} {str(content.brand.descriptor)}</strong>
            <a href={str(content.brand.emailHref)}>{str(content.brand.email)}</a>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              {asItems<LinkItem>(column.links).map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
            </nav>
          ))}
        </div>
        <div className="vai-footer-bottom">
          <span>{str(content.brand.copyright)}</span>
          <a href={str(content.footer.termsHref)}>{str(content.footer.termsLabel)}</a>
          <a href={str(content.footer.privacyHref)}>{str(content.footer.privacyLabel)}</a>
        </div>
        <h2>{str(content.brand.name)}® {str(content.brand.descriptor)}</h2>
      </footer>
    </main>
  );
}
