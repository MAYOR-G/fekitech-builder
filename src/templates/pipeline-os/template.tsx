"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import defaults from "./editable.json";
import "./styles.css";

type Link = { label: string; href: string };
type FeatureBlock = { kicker: string; text: string; tone: string; image: string; imageAlt: string; badge: string };
type Benefit = { title: string; text: string };
type WorkflowStep = { title: string; text: string; button: string; tone: string; image: string; imageAlt: string; badge: string };
type UseCase = { title: string; text: string };
type Metric = { label: string; value: string };
type Plan = { name: string; price: string; text: string; features: string[]; featured: boolean };
type Testimonial = { quote: string; name: string; role: string };
type Insight = { title: string; tone: string; image: string; imageAlt: string };
type Faq = { question: string; answer: string };
type FooterColumn = { title: string; links: string[] };

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function CornerBadge({ label, tone = "blue" }: { label: string; tone?: string }) {
  return (
    <div className={`pos-corner-badge pos-tone-${tone}`} aria-hidden="true">
      <span />
      <strong>{label}</strong>
    </div>
  );
}

export default function PipelineOSTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const typography = content.theme.typography;

  const style = useMemo(() => ({
    "--pos-page": colors.page,
    "--pos-section": colors.section,
    "--pos-surface": colors.surface,
    "--pos-card": colors.card,
    "--pos-ink": colors.ink,
    "--pos-muted": colors.muted,
    "--pos-soft": colors.soft,
    "--pos-line": colors.line,
    "--pos-black": colors.black,
    "--pos-blue": colors.blue,
    "--pos-coral": colors.coral,
    "--pos-pink": colors.pink,
    "--pos-green": colors.green,
    "--pos-yellow": colors.yellow,
    "--pos-purple": colors.purple,
    "--pos-heading": typography.heading,
    "--pos-body": typography.body,
  }) as React.CSSProperties, [colors, typography]);

  const nav = list<Link>(content.navigation.links);
  const partners = list<string>(content.partners);
  const featureBlocks = list<FeatureBlock>(content.featureBlocks);
  const benefits = list<Benefit>(content.benefits.items);
  const steps = list<WorkflowStep>(content.workflow.steps);
  const tabs = list<string>(content.useCases.tabs);
  const useCases = list<UseCase>(content.useCases.items);
  const metrics = list<Metric>(content.metrics.items);
  const plans = list<Plan>(content.pricing.plans);
  const comparisonRows = list<string>(content.comparison.rows);
  const testimonials = list<Testimonial>(content.testimonials.items);
  const insights = list<Insight>(content.insights.items);
  const faqs = list<Faq>(content.faq.items);
  const footerColumns = list<FooterColumn>(content.footer.columns);

  return (
    <main id="home" data-template-id="pipeline-os" className="pipeline-os" style={style}>
      <header className="pos-header">
        <a className="pos-brand" href="#home" aria-label={str(content.brand.name)}>
          <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
        </a>
        <nav aria-label="Primary navigation">
          {nav.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="pos-pill pos-pill-dark" href={str(content.navigation.ctaHref)}>{str(content.navigation.ctaLabel)}</a>
      </header>

      <section className="pos-hero">
        <div className="pos-hero-copy">
          <span>{str(content.hero.eyebrow)}</span>
          <h1>{str(content.hero.title)}</h1>
          <p>{str(content.hero.text)}</p>
          <a className="pos-pill pos-pill-dark" href={str(content.hero.buttonHref)}>{str(content.hero.buttonLabel)}</a>
        </div>
        <div className="pos-hero-visual">
          <img src={str(content.hero.image)} alt={str(content.hero.imageAlt)} />
          <CornerBadge label="Pipeline health +42%" tone="blue" />
        </div>
      </section>

      <section className="pos-partners" aria-label="Trusted by">
        {partners.map((partner) => <span key={partner}>{partner}</span>)}
      </section>

      <section id="features" className="pos-intro">
        <h2>{str(content.intro.title)}</h2>
        <p>{str(content.intro.text)}</p>
      </section>

      <section className="pos-feature-blocks">
        {featureBlocks.map((block, index) => (
          <article className={`pos-feature-block pos-tone-${block.tone}`} key={block.kicker}>
            <div>
              <h3>{block.kicker}</h3>
              <p>{block.text}</p>
            </div>
            <figure className="pos-photo-card">
              <img src={block.image} alt={block.imageAlt} />
              <CornerBadge label={block.badge} tone={block.tone} />
            </figure>
          </article>
        ))}
      </section>

      <section className="pos-section pos-benefits">
        <h2>{str(content.benefits.title)}</h2>
        <p>{str(content.benefits.text)}</p>
        <div>
          {benefits.map((benefit, index) => (
            <article key={benefit.title}>
              <span>{index + 1}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="pos-section pos-workflow">
        <h2>{str(content.workflow.title)}</h2>
        <p>{str(content.workflow.text)}</p>
        <div className="pos-workflow-list">
          {steps.map((step, index) => (
            <article className={`pos-step pos-tone-${step.tone}`} key={step.title}>
              <div className="pos-step-visual">
                <img src={step.image} alt={step.imageAlt} />
                <CornerBadge label={step.badge} tone={step.tone} />
              </div>
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <a className="pos-pill pos-pill-dark" href="#pricing">{step.button}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="use-cases" className="pos-section pos-use-cases">
        <div>
          <h2>{str(content.useCases.title)}</h2>
          <p>{str(content.useCases.text)}</p>
          <ul>{tabs.map((tab) => <li key={tab}>{tab}</li>)}</ul>
        </div>
        <div>
          {useCases.map((item, index) => (
            <article key={item.title}>
              <span>{index + 1}</span>
              <div><h3>{item.title}</h3><p>{item.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="pos-metrics">
        <h2>{str(content.metrics.title)}</h2>
        <p>{str(content.metrics.text)}</p>
        <div className="pos-metrics-grid">
          <img src={str(content.metrics.image)} alt={str(content.metrics.imageAlt)} />
          {metrics.map((metric) => (
            <article key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="pos-section pos-pricing">
        <h2>{str(content.pricing.title)}</h2>
        <p>{str(content.pricing.text)}</p>
        <div className="pos-toggle"><span>{str(content.pricing.toggleA)}</span><span>{str(content.pricing.toggleB)}</span></div>
        <div className="pos-plan-grid">
          {plans.map((plan) => (
            <article className={plan.featured ? "pos-plan-featured" : ""} key={plan.name}>
              <h3>{plan.name}</h3>
              <p>{plan.text}</p>
              <strong>{plan.price}</strong>
              <small>/month</small>
              <ul>{list<string>(plan.features).map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a className="pos-pill pos-pill-dark" href="#pricing">Get started</a>
            </article>
          ))}
        </div>
      </section>

      <section className="pos-section pos-comparison">
        <h2>{str(content.comparison.title)}</h2>
        <table>
          <thead><tr><th>Feature</th><th>Starter</th><th>Pro</th><th>Scale</th></tr></thead>
          <tbody>
            {comparisonRows.map((row, index) => (
              <tr key={row}>
                <td>{row}</td>
                <td>{index < 5 ? "●" : "○"}</td>
                <td>{index < 8 ? "●" : "○"}</td>
                <td>●</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="customers" className="pos-testimonials">
        <h2>{str(content.testimonials.title)}</h2>
        <div>
          {testimonials.map((item) => (
            <article key={item.name}>
              <p>{item.quote}</p>
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="pos-section pos-insights">
        <h2>{str(content.insights.title)}</h2>
        <p>{str(content.insights.text)}</p>
        <div>
          {insights.map((item) => (
            <article className={`pos-tone-${item.tone}`} key={item.title}>
              <img src={item.image} alt={item.imageAlt} />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="pos-section pos-faq">
        <h2>{str(content.faq.title)}</h2>
        <div>
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="pos-cta">
        <div>
          <h2>{str(content.cta.title)}</h2>
          <a className="pos-pill pos-pill-dark" href={str(content.cta.buttonHref)}>{str(content.cta.buttonLabel)}</a>
        </div>
        <figure className="pos-photo-card">
          <img src={str(content.cta.image)} alt={str(content.cta.imageAlt)} />
          <CornerBadge label="Pipeline ready" tone="blue" />
        </figure>
      </section>

      <footer className="pos-footer">
        <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {list<string>(column.links).map((link) => <a href="#home" key={link}>{link}</a>)}
          </div>
        ))}
        <small>{str(content.footer.legal)}</small>
      </footer>
    </main>
  );
}
