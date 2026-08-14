"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, ChartLineUp, Check, List, Star, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type ConsultingData = typeof defaults;
type LinkItem = { label: string; href: string };
type Service = { title: string; image: string; imageAlt: string };
type ValueItem = { title: string; body: string; linkLabel: string };
type ProcessItem = { number: string; title: string; body: string };
type Testimonial = { quote: string; name: string; role: string };
type BlogPost = { date: string; title: string; image: string; imageAlt: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function cssVars(data: ConsultingData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--cga-blue": data.colors.blue,
    "--cga-blue-dark": data.colors.blueDark,
    "--cga-text": data.colors.text,
    "--cga-muted": data.colors.muted,
    "--cga-line": data.colors.line,
    "--cga-soft": data.colors.soft,
    "--cga-white": data.colors.white,
    "--cga-dark": data.colors.dark,
    "--cga-heading": data.typography.headingFont,
    "--cga-body": data.typography.bodyFont,
  };
}

function SectionLabel({ children }: { children: string }) {
  return <span className="cga-label">{children}</span>;
}

export default function ConsultingGrowthAdvisoryTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as ConsultingData;
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const logos = asArray<string>(content.logos);
  const services = asArray<Service>(content.services.items);
  const values = asArray<ValueItem>(content.value.items);
  const processItems = asArray<ProcessItem>(content.process.items);
  const testimonials = asArray<Testimonial>(content.testimonials.items);
  const posts = asArray<BlogPost>(content.blog.items);
  const companyLinks = asArray<LinkItem>(content.footer.companyLinks);
  const pageLinks = asArray<LinkItem>(content.footer.pageLinks);
  const serviceLinks = asArray<LinkItem>(content.footer.serviceLinks);
  const socialLinks = asArray<LinkItem>(content.footer.socialLinks);

  return (
    <main id="home" data-template-id="consulting-growth-advisory" className="consulting-growth-advisory" style={cssVars(content)}>
      <section className="cga-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="cga-hero-shade" />
        <header className="cga-header">
          <a className="cga-logo" href="#home" aria-label={content.brand.name}>
            <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
          </a>
          <button className="cga-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={18} /> : <List size={18} />}
          </button>
          <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
            {navLinks.map((link, index) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} data-editable-path={`navigation.links.${index}.label`} data-editable-type="link" data-editable-href-path={`navigation.links.${index}.href`}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="cga-outline" href={content.navigation.ctaHref} data-editable-path="navigation.ctaLabel" data-editable-type="link" data-editable-href-path="navigation.ctaHref">{content.navigation.ctaLabel}</a>
        </header>
        <div className="cga-hero-content">
          <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <p data-editable-path="hero.subtitle" data-editable-type="text">{content.hero.subtitle}</p>
          <div className="cga-actions">
            <a className="cga-button" href={content.hero.primary.href} data-editable-path="hero.primary.label" data-editable-type="link" data-editable-href-path="hero.primary.href">{content.hero.primary.label}</a>
            <a className="cga-ghost" href={content.hero.secondary.href} data-editable-path="hero.secondary.label" data-editable-type="link" data-editable-href-path="hero.secondary.href">{content.hero.secondary.label}</a>
          </div>
        </div>
        <div className="cga-hero-badges">
          {content.hero.badges.map((badge, index) => (
            <span key={badge} data-editable-path={`hero.badges.${index}`} data-editable-type="text">{badge}</span>
          ))}
        </div>
      </section>

      <section className="cga-logo-strip">
        {logos.map((logo, index) => <span key={logo} data-editable-path={`logos.${index}`} data-editable-type="text">{logo}</span>)}
      </section>

      <section id="services" className="cga-services">
        <div className="cga-section-head cga-split-head">
          <div>
            <SectionLabel>{content.services.label}</SectionLabel>
            <h2 data-editable-path="services.title" data-editable-type="text">{content.services.title}</h2>
          </div>
          <p data-editable-path="services.body" data-editable-type="text">{content.services.body}</p>
        </div>
        <div className="cga-service-grid">
          {services.map((service, index) => (
            <article className={index === 0 ? "is-large" : ""} key={service.title}>
              <img src={service.image} alt={service.imageAlt} loading="lazy" data-editable-path={`services.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`services.items.${index}.imageAlt`} />
              <div>
                <h3 data-editable-path={`services.items.${index}.title`} data-editable-type="text">{service.title}</h3>
                <span><ArrowRight size={14} /></span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="cga-blue-cta">
        <h2 data-editable-path="blueCta.title" data-editable-type="text">{content.blueCta.title}</h2>
        <a href={content.blueCta.button.href} data-editable-path="blueCta.button.label" data-editable-type="link" data-editable-href-path="blueCta.button.href">{content.blueCta.button.label}</a>
      </section>

      <section className="cga-approach">
        <div className="cga-photo-stat">
          <img src={content.approach.image} alt={content.approach.imageAlt} loading="lazy" data-editable-path="approach.image" data-editable-type="image" data-editable-alt-path="approach.imageAlt" />
          <div className="cga-chart">
            <span data-editable-path="approach.chartLabel" data-editable-type="text">{content.approach.chartLabel}</span>
            <strong data-editable-path="approach.chartValue" data-editable-type="text">{content.approach.chartValue}</strong>
            <i /><i /><i /><i /><i /><i />
          </div>
        </div>
        <div>
          <SectionLabel>{content.approach.label}</SectionLabel>
          <h2 data-editable-path="approach.title" data-editable-type="text">{content.approach.title}</h2>
          <p data-editable-path="approach.body" data-editable-type="text">{content.approach.body}</p>
          <ul>
            {content.approach.points.map((point, index) => (
              <li key={point}><Check size={16} weight="bold" /><span data-editable-path={`approach.points.${index}`} data-editable-type="text">{point}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section id="about" className="cga-story">
        <img src={content.story.image} alt={content.story.imageAlt} loading="lazy" data-editable-path="story.image" data-editable-type="image" data-editable-alt-path="story.imageAlt" />
        <div />
        <h2 data-editable-path="story.title" data-editable-type="text">{content.story.title}</h2>
        <a href={content.story.button.href} data-editable-path="story.button.label" data-editable-type="link" data-editable-href-path="story.button.href">{content.story.button.label}</a>
      </section>

      <section className="cga-value">
        <div className="cga-section-head">
          <SectionLabel>{content.value.label}</SectionLabel>
          <h2 data-editable-path="value.title" data-editable-type="text">{content.value.title}</h2>
          <p data-editable-path="value.body" data-editable-type="text">{content.value.body}</p>
        </div>
        <div className="cga-value-grid">
          {values.map((item, index) => (
            <article key={item.title}>
              <span><ChartLineUp size={17} weight="bold" /></span>
              <h3 data-editable-path={`value.items.${index}.title`} data-editable-type="text">{item.title}</h3>
              <p data-editable-path={`value.items.${index}.body`} data-editable-type="text">{item.body}</p>
              <a href="#contact" data-editable-path={`value.items.${index}.linkLabel`} data-editable-type="link">{item.linkLabel}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="cga-process">
        <div>
          <h2 data-editable-path="process.title" data-editable-type="text">{content.process.title}</h2>
          <p data-editable-path="process.body" data-editable-type="text">{content.process.body}</p>
          <a href={content.process.button.href} data-editable-path="process.button.label" data-editable-type="link" data-editable-href-path="process.button.href">{content.process.button.label}</a>
        </div>
        <div className="cga-process-grid">
          {processItems.map((item, index) => (
            <article key={item.number}>
              <strong data-editable-path={`process.items.${index}.number`} data-editable-type="text">{item.number}</strong>
              <h3 data-editable-path={`process.items.${index}.title`} data-editable-type="text">{item.title}</h3>
              <p data-editable-path={`process.items.${index}.body`} data-editable-type="text">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cga-commitment">
        <div className="cga-commit-photo">
          <img src={content.commitment.image} alt={content.commitment.imageAlt} loading="lazy" data-editable-path="commitment.image" data-editable-type="image" data-editable-alt-path="commitment.imageAlt" />
          <div>
            {content.commitment.stats.map((stat, index) => (
              <article key={stat.label}>
                <strong data-editable-path={`commitment.stats.${index}.value`} data-editable-type="text">{stat.value}</strong>
                <span data-editable-path={`commitment.stats.${index}.label`} data-editable-type="text">{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel>{content.commitment.label}</SectionLabel>
          <h2 data-editable-path="commitment.title" data-editable-type="text">{content.commitment.title}</h2>
          <p data-editable-path="commitment.body" data-editable-type="text">{content.commitment.body}</p>
          <a className="cga-button" href={content.commitment.button.href} data-editable-path="commitment.button.label" data-editable-type="link" data-editable-href-path="commitment.button.href">{content.commitment.button.label}</a>
        </div>
      </section>

      <section className="cga-testimonials">
        <div className="cga-split-head">
          <div>
            <SectionLabel>{content.testimonials.label}</SectionLabel>
            <h2 data-editable-path="testimonials.title" data-editable-type="text">{content.testimonials.title}</h2>
          </div>
          <p data-editable-path="testimonials.body" data-editable-type="text">{content.testimonials.body}</p>
        </div>
        <div className="cga-testimonial-row">
          {testimonials.map((item, index) => (
            <article key={item.name}>
              <div>{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={13} weight="fill" />)}</div>
              <p data-editable-path={`testimonials.items.${index}.quote`} data-editable-type="text">{item.quote}</p>
              <strong data-editable-path={`testimonials.items.${index}.name`} data-editable-type="text">{item.name}</strong>
              <span data-editable-path={`testimonials.items.${index}.role`} data-editable-type="text">{item.role}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="cga-blog">
        <div className="cga-section-head">
          <SectionLabel>{content.blog.label}</SectionLabel>
          <h2 data-editable-path="blog.title" data-editable-type="text">{content.blog.title}</h2>
          <p data-editable-path="blog.body" data-editable-type="text">{content.blog.body}</p>
        </div>
        <div className="cga-blog-grid">
          {posts.map((post, index) => (
            <article key={post.title}>
              <img src={post.image} alt={post.imageAlt} loading="lazy" data-editable-path={`blog.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`blog.items.${index}.imageAlt`} />
              <div>
                <span data-editable-path={`blog.items.${index}.date`} data-editable-type="text">{post.date}</span>
                <h3 data-editable-path={`blog.items.${index}.title`} data-editable-type="text">{post.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="cga-footer">
        <div className="cga-footer-cta">
          <h2 data-editable-path="footerCta.title" data-editable-type="text">{content.footerCta.title}</h2>
          <a href={content.footerCta.button.href} data-editable-path="footerCta.button.label" data-editable-type="link" data-editable-href-path="footerCta.button.href">{content.footerCta.button.label}</a>
        </div>
        <div className="cga-footer-grid">
          <div>
            <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
            <p data-editable-path="footer.tagline" data-editable-type="text">{content.footer.tagline}</p>
            <a href={content.brand.emailHref} data-editable-path="brand.email" data-editable-type="link" data-editable-href-path="brand.emailHref">{content.brand.email}</a>
          </div>
          <nav aria-label="Company links"><h3 data-editable-path="footer.companyTitle" data-editable-type="text">{content.footer.companyTitle}</h3>{companyLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.companyLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.companyLinks.${index}.href`}>{link.label}</a>)}</nav>
          <nav aria-label="Page links"><h3 data-editable-path="footer.pagesTitle" data-editable-type="text">{content.footer.pagesTitle}</h3>{pageLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.pageLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.pageLinks.${index}.href`}>{link.label}</a>)}</nav>
          <nav aria-label="Service links"><h3 data-editable-path="footer.servicesTitle" data-editable-type="text">{content.footer.servicesTitle}</h3>{serviceLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.serviceLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.serviceLinks.${index}.href`}>{link.label}</a>)}</nav>
        </div>
        <div className="cga-footer-bottom">
          <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright.replace("2026", String(year))}</small>
          <nav aria-label="Social links">{socialLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.socialLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.socialLinks.${index}.href`}>{link.label}</a>)}</nav>
        </div>
      </footer>
    </main>
  );
}
