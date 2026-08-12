"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React from "react";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type Stat = { value: string; label: string };
type Service = { title: string; category: string; text: string; image: string; alt: string };
type Member = { name: string; role: string; image: string; alt: string };
type Hour = { day: string; time: string };
type Price = { title: string; text: string; price: string; image: string; alt: string };
type Article = { dateDay: string; dateMonth: string; category: string; title: string };

function list<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function AlvionMedicalTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;

  const style = {
    "--alv-page": colors.page,
    "--alv-section": colors.section,
    "--alv-soft": colors.soft,
    "--alv-card": colors.card,
    "--alv-ink": colors.ink,
    "--alv-muted": colors.muted,
    "--alv-dark": colors.dark,
    "--alv-deep": colors.deep,
    "--alv-lime": colors.lime,
    "--alv-lime-dark": colors.limeDark,
    "--alv-line": colors.line,
    "--alv-heading": fonts.heading,
    "--alv-body": fonts.body,
  } as React.CSSProperties;

  const nav = list<LinkItem>(content.navigation.links);
  const chips = list<string>(content.hero.chips);
  const introStats = list<Stat>(content.intro.stats);
  const services = list<Service>(content.services.items);
  const members = list<Member>(content.team.members);
  const hours = list<Hour>(content.appointment.hours);
  const prices = list<Price>(content.pricing.items);
  const articles = list<Article>(content.articles.items);
  const footerLinks = list<LinkItem>(content.footer.links);
  const footerPolicy = list<LinkItem>(content.footer.policy);
  const footerSocial = list<LinkItem>(content.footer.social);

  return (
    <main id="home" data-template-id="alvion-medical" className="alvion-medical" style={style}>
      <section
        className="alv-hero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.86), rgba(0,0,0,.55) 42%, rgba(0,0,0,.03) 74%), url(${str(content.hero.image)})` }}
      >
        <header className="alv-header">
          <a className="alv-brand" href="#home" aria-label={str(content.brand.name)}>
            <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
          </a>
          <a className="alv-notice" href="#appointment">{str(content.navigation.notice)}</a>
          <nav aria-label="Primary navigation">
            {nav.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="alv-header-actions">
            <a href={str(content.brand.phoneHref)}>{str(content.navigation.phoneLabel)}</a>
            <a href={str(content.navigation.contactHref)}>{str(content.navigation.contactLabel)}</a>
          </div>
        </header>

        <div className="alv-hero-body">
          <p className="alv-hero-eyebrow">{str(content.hero.eyebrow)}</p>
          <h1>
            {str(content.hero.titlePrefix)} <span>{str(content.hero.titleHighlight)}</span>
            <br />
            {str(content.hero.titleSuffix)}
          </h1>
          <a className="alv-button alv-button-lime" href={str(content.hero.primaryHref)}>{str(content.hero.primaryLabel)}</a>
          <div className="alv-hero-bottom">
            <p>{str(content.hero.text)}</p>
            <div>{chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="about" className="alv-section alv-intro">
        <div className="alv-stat-stack">
          {introStats.map((stat, index) => (
            <article key={stat.label} className={`alv-stat-${index + 1}`}>
              <strong>{stat.value}</strong>
              <p>{stat.label}</p>
            </article>
          ))}
        </div>
        <div className="alv-intro-copy">
          <span>{str(content.intro.eyebrow)}</span>
          <h2>{str(content.intro.title)}</h2>
          <div className="alv-patient-proof">
            <i />
            <i />
            <i />
            <b>+</b>
            <p>{str(content.intro.trusted)}</p>
          </div>
        </div>
        <img src={str(content.intro.image)} alt={str(content.intro.imageAlt)} />
      </section>

      <section id="services" className="alv-services">
        <div className="alv-services-head">
          <span>{str(content.services.label)}</span>
          <h2>{str(content.services.title)}</h2>
        </div>
        <div className="alv-service-grid">
          {services.map((service) => (
            <article key={service.title}>
              <img src={service.image} alt={service.alt} />
              <span>{service.category}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#appointment">Discover More</a>
            </article>
          ))}
        </div>
      </section>

      <section id="team" className="alv-section alv-team">
        <h2>{str(content.team.title)}</h2>
        <div className="alv-team-grid">
          <div className="alv-team-note">
            <p>{str(content.team.text)}</p>
            <a href={str(content.team.buttonHref)}>{str(content.team.buttonLabel)}</a>
          </div>
          {members.map((member) => (
            <article key={member.name}>
              <img src={member.image} alt={member.alt} />
              <span>+</span>
              <div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="appointment"
        className="alv-appointment"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.44) 55%, rgba(0,0,0,.72)), url(${str(content.appointment.image)})` }}
      >
        <span>{str(content.appointment.label)}</span>
        <div className="alv-appointment-body">
          <h2>{str(content.appointment.title)}</h2>
          <div className="alv-hours">
            <h3>Opening hours</h3>
            {hours.map((item) => (
              <p key={item.day}><b>{item.day}</b><span>{item.time}</span></p>
            ))}
          </div>
          <div className="alv-appointment-note">
            <p>{str(content.appointment.note)}</p>
            <a className="alv-button alv-button-lime" href={str(content.appointment.buttonHref)}>{str(content.appointment.buttonLabel)}</a>
          </div>
        </div>
      </section>

      <section className="alv-section alv-pricing">
        <span>{str(content.pricing.label)}</span>
        <h2>{str(content.pricing.title)}</h2>
        <div className="alv-price-grid">
          {prices.map((price) => (
            <article key={price.title}>
              <img src={price.image} alt={price.alt} />
              <div>
                <h3>{price.title}</h3>
                <p>{price.text}</p>
              </div>
              <strong>{price.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="articles" className="alv-section alv-articles">
        <span>{str(content.articles.label)}</span>
        <h2>{str(content.articles.title)}</h2>
        <div className="alv-article-layout">
          <article className="alv-featured-article">
            <img src={str(content.articles.featured.image)} alt={str(content.articles.featured.alt)} />
            <div>
              <strong>{str(content.articles.featured.dateDay)}</strong>
              <small>{str(content.articles.featured.dateMonth)}</small>
            </div>
            <p>{str(content.articles.featured.category)}</p>
            <h3>{str(content.articles.featured.title)}</h3>
          </article>
          <div className="alv-article-list">
            {articles.map((article) => (
              <article key={article.title}>
                <div><strong>{article.dateDay}</strong><small>{article.dateMonth}</small></div>
                <div><p>{article.category}</p><h3>{article.title}</h3></div>
              </article>
            ))}
            <a href={str(content.articles.buttonHref)}>{str(content.articles.buttonLabel)}</a>
          </div>
        </div>
      </section>

      <div className="alv-marquee" aria-hidden="true">
        <span>{str(content.footer.marquee)}</span>
        <i />
        <span>{str(content.footer.marquee)}</span>
      </div>

      <footer id="contact" className="alv-footer">
        <div className="alv-footer-top">
          <div>
            <h3>Main pages</h3>
            {footerLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </div>
          <div>
            <h3>Utility pages</h3>
            {footerPolicy.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </div>
          <div>
            <h3>Follow us</h3>
            {footerSocial.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          </div>
          <form className="alv-form">
            <h2>{str(content.footer.tagline)}</h2>
            <div className="alv-form-grid">
              <label>Full name<input type="text" placeholder="Jane Smith" suppressHydrationWarning /></label>
              <label>Email address<input type="email" placeholder="jane@email.co.uk" suppressHydrationWarning /></label>
              <label>Phone<input type="tel" placeholder="0200-000-000" suppressHydrationWarning /></label>
              <label>Select subject<select defaultValue="" suppressHydrationWarning><option value="" disabled>Select subject</option><option>Consultation</option><option>Diagnostics</option><option>Pricing</option></select></label>
            </div>
            <label>Tell us about your health<textarea placeholder="Enter your message" suppressHydrationWarning /></label>
            <div className="alv-form-actions">
              <button type="button">{str(content.footer.buttonLabel)}</button>
              <label><input type="checkbox" suppressHydrationWarning /> {str(content.footer.checkLabel)}</label>
            </div>
          </form>
        </div>
        <div className="alv-footer-bottom">
          <div>
            <a href={str(content.brand.phoneHref)}>{str(content.brand.phone)}</a>
            <a href={str(content.brand.emailHref)}>{str(content.brand.email)}</a>
            <p>{str(content.brand.address)}</p>
          </div>
          <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
          <p>{str(content.footer.legal)}</p>
        </div>
      </footer>
    </main>
  );
}
