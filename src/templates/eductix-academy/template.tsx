"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Course = { title: string; text: string };
type Project = { title: string; date: string; image: string; alt: string };
type Stat = { value: string; label: string };
type Plan = { name: string; price: string; period: string; featured: boolean; features: string[] };
type Faq = { question: string; answer: string };

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function EductixAcademyTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;

  const style = {
    "--edx-page": colors.page,
    "--edx-section": colors.section,
    "--edx-card": colors.card,
    "--edx-ink": colors.ink,
    "--edx-muted": colors.muted,
    "--edx-green": colors.green,
    "--edx-green-dark": colors.greenDark,
    "--edx-green-soft": colors.greenSoft,
    "--edx-line": colors.line,
    "--edx-white": colors.white,
    "--edx-heading": fonts.heading,
    "--edx-body": fonts.body,
  } as React.CSSProperties;

  const nav = list<LinkItem>(content.navigation.links);
  const logos = list<string>(content.trusted.logos);
  const stats = list<Stat>(content.stats);
  const courses = list<Course>(content.courses.items);
  const projects = list<Project>(content.projects.items);
  const outcomeItems = list<string>(content.outcomes.items);
  const skillLeft = list<string>(content.skills.left);
  const skillRight = list<string>(content.skills.right);
  const plans = list<Plan>(content.pricing.plans);
  const faqs = list<Faq>(content.faq.items);
  const footerLinks = list<LinkItem>(content.footer.links);
  const social = list<string>(content.footer.social);

  return (
    <main id="home" data-template-id="eductix-academy" className="eductix-academy" style={style}>
      <header className="edx-header">
        <a href="#home" className="edx-logo" aria-label={str(content.brand.name)}>
          <span>{str(content.brand.name)}</span>
        </a>
        <nav aria-label="Primary navigation">
          {nav.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="edx-button" href={str(content.navigation.ctaHref)}>{str(content.navigation.ctaLabel)}</a>
      </header>

      <section className="edx-hero">
        <div className="edx-hero-copy">
          <h1>{str(content.hero.title)}</h1>
          <p>{str(content.hero.text)}</p>
          <a className="edx-button" href={str(content.hero.primaryHref)}>{str(content.hero.primaryLabel)}</a>
        </div>
        <div className="edx-hero-grid">
          <figure className="edx-card-img edx-hero-one">
            <img src={str(content.hero.imageOne)} alt={str(content.hero.imageOneAlt)} />
          </figure>
          <figure className="edx-card-img edx-hero-two">
            <img src={str(content.hero.imageTwo)} alt={str(content.hero.imageTwoAlt)} />
            <figcaption>{str(content.hero.badge)}</figcaption>
          </figure>
          <article className="edx-review-card">
            <span>4.9</span>
            <p>{str(content.hero.review)}</p>
          </article>
          <article className="edx-metric-card">
            <strong>{str(content.hero.metricValue)}</strong>
            <p>{str(content.hero.metricLabel)}</p>
          </article>
        </div>
        <div className="edx-chat-card">
          <strong>Built for real growth</strong>
          <p>Follow guided learning paths from beginner to job-ready level.</p>
        </div>
      </section>

      <section className="edx-trusted">
        <p>{str(content.trusted.title)}</p>
        <div>{logos.map((logo) => <span key={logo}>{logo}</span>)}</div>
      </section>

      <section id="about" className="edx-section edx-about">
        <div>
          <h2>{str(content.about.title)}</h2>
          <p>{str(content.about.text)}</p>
          <a className="edx-button" href={str(content.about.primaryHref)}>{str(content.about.primaryLabel)}</a>
        </div>
        <figure>
          <img src={str(content.about.image)} alt={str(content.about.imageAlt)} />
          <figcaption>{str(content.about.rating)}</figcaption>
          <span>{str(content.about.tagOne)}</span>
          <span>{str(content.about.tagTwo)}</span>
        </figure>
      </section>

      <section className="edx-stats">
        {stats.map((stat) => (
          <article key={stat.label}>
            <strong>{stat.value}</strong>
            <p>{stat.label}</p>
          </article>
        ))}
      </section>

      <section id="courses" className="edx-section edx-courses">
        <div className="edx-section-head">
          <h2>{str(content.courses.title)}</h2>
          <p>{str(content.courses.text)}</p>
        </div>
        <div className="edx-course-grid">
          {courses.map((course, index) => (
            <article key={course.title}>
              <span>{index + 1}</span>
              <h3>{course.title}</h3>
              <p>{course.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edx-section edx-projects">
        <div className="edx-section-head">
          <h2>{str(content.projects.title)}</h2>
          <p>{str(content.projects.text)}</p>
        </div>
        <div className="edx-project-grid">
          {projects.map((project) => (
            <article key={project.title}>
              <img src={project.image} alt={project.alt} />
              <p>{project.date} - Eductix</p>
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="edx-section edx-outcomes">
        <img src={str(content.outcomes.image)} alt={str(content.outcomes.imageAlt)} />
        <div>
          <h2>{str(content.outcomes.title)}</h2>
          {outcomeItems.map((item) => <details key={item} open><summary>{item}</summary></details>)}
        </div>
      </section>

      <section id="skills" className="edx-section edx-skills">
        <h2>{str(content.skills.title)}</h2>
        <p>{str(content.skills.text)}</p>
        <div className="edx-skills-compare">
          <div>
            <h3>{str(content.skills.leftTitle)}</h3>
            {skillLeft.map((item) => <span key={item}>{item}</span>)}
          </div>
          <i aria-hidden="true" />
          <div>
            <h3>{str(content.skills.rightTitle)}</h3>
            {skillRight.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </section>

      <section className="edx-section edx-testimonial">
        <div>
          <h2>{str(content.testimonial.title)}</h2>
          <p>{str(content.testimonial.text)}</p>
          <a className="edx-button" href={str(content.testimonial.buttonHref)}>{str(content.testimonial.buttonLabel)}</a>
        </div>
        <article>
          <h3>{str(content.testimonial.quote)}</h3>
          <p>{str(content.testimonial.body)}</p>
          <div>
            <img src={str(content.testimonial.image)} alt={str(content.testimonial.imageAlt)} />
            <span><b>{str(content.testimonial.name)}</b>{str(content.testimonial.role)}</span>
          </div>
        </article>
      </section>

      <section id="pricing" className="edx-section edx-pricing">
        <div className="edx-section-head">
          <h2>{str(content.pricing.title)}</h2>
          <p>{str(content.pricing.text)}</p>
        </div>
        <div className="edx-plan-grid">
          {plans.map((plan) => (
            <article key={plan.name} className={plan.featured ? "is-featured" : ""}>
              <h3>{plan.name}</h3>
              <strong>{plan.price}<small>/{plan.period}</small></strong>
              <ul>{list<string>(plan.features).map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="edx-section edx-faq">
        <div>
          <h2>{str(content.faq.title)}</h2>
          <p>{str(content.faq.text)}</p>
          <a className="edx-button" href={str(content.faq.buttonHref)}>{str(content.faq.buttonLabel)}</a>
        </div>
        <div className="edx-faq-grid">
          {faqs.map((faq) => (
            <article key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="edx-cta">
        <img src={str(content.cta.image)} alt={str(content.cta.imageAlt)} />
        <div>
          <h2>{str(content.cta.title)}</h2>
          <p>{str(content.cta.text)}</p>
          <a className="edx-button" href={str(content.cta.buttonHref)}>{str(content.cta.buttonLabel)}</a>
        </div>
      </section>

      <footer className="edx-footer">
        <div>
          <p>{str(content.brand.name)}</p>
          <h2>{str(content.footer.title)}</h2>
        </div>
        <nav aria-label="Footer navigation">
          {footerLinks.map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div>
          <a href={str(content.brand.emailHref)}>{str(content.brand.email)}</a>
          <a href={str(content.brand.phoneHref)}>{str(content.brand.phone)}</a>
          <p>{social.join("  ")}</p>
        </div>
        <a href="#home">{str(content.footer.backLabel)}</a>
        <small>{str(content.footer.legal)}</small>
      </footer>
    </main>
  );
}
