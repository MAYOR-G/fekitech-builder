"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, CaretDown, Check, List, Star, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type MedivraData = typeof defaults;
type LinkItem = { label: string; href: string };
type StatItem = { value: string; label: string; body: string };
type SmallCard = { title: string; body: string };
type ServiceItem = { title: string; body: string; tag: string };
type ProcessItem = { number: string; title: string; body: string };
type Testimonial = { title: string; quote: string; name: string };
type BlogPost = { title: string; date: string; image: string; imageAlt: string; tag: string };
type FaqItem = { question: string; answer: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function cssVars(data: MedivraData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--mtr-page": data.colors.page,
    "--mtr-card": data.colors.card,
    "--mtr-text": data.colors.text,
    "--mtr-muted": data.colors.muted,
    "--mtr-accent": data.colors.accent,
    "--mtr-accent-dark": data.colors.accentDark,
    "--mtr-line": data.colors.line,
    "--mtr-footer": data.colors.footer,
    "--mtr-heading": data.typography.headingFont,
    "--mtr-body": data.typography.bodyFont,
  };
}

function SectionLabel({ children, path }: { children: string; path: string }) {
  return (
    <span className="mtr-label" data-editable-path={path} data-editable-type="text">
      {children}
    </span>
  );
}

export default function MedivraTherapyRecoveryTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as MedivraData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const heroChips = asArray<string>(content.hero.chips);
  const stats = asArray<StatItem>(content.stats);
  const expertCards = asArray<SmallCard>(content.expert.cards);
  const services = asArray<ServiceItem>(content.services.items);
  const whyItems = asArray<SmallCard>(content.why.items);
  const processItems = asArray<ProcessItem>(content.process.items);
  const testimonials = asArray<Testimonial>(content.testimonials.items);
  const posts = asArray<BlogPost>(content.blog.items);
  const faqItems = asArray<FaqItem>(content.faq.items);
  const mainLinks = asArray<LinkItem>(content.footer.mainLinks);
  const supportLinks = asArray<LinkItem>(content.footer.supportLinks);
  const socialLinks = asArray<LinkItem>(content.footer.socialLinks);

  return (
    <main id="home" data-template-id="medivra-therapy-recovery" className="medivra-therapy-recovery" style={cssVars(content)}>
      <section className="mtr-hero">
        <header className="mtr-header">
          <a className="mtr-logo" href="#home" aria-label={content.brand.name}>
            <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
          </a>
          <button className="mtr-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={18} /> : <List size={18} />}
          </button>
          <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
            {navLinks.map((link, index) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} data-editable-path={`navigation.links.${index}.label`} data-editable-type="link" data-editable-href-path={`navigation.links.${index}.href`}>
                {link.label}
              </a>
            ))}
          </nav>
          <a className="mtr-nav-cta" href={content.navigation.ctaHref} data-editable-path="navigation.ctaLabel" data-editable-type="link" data-editable-href-path="navigation.ctaHref">
            {content.navigation.ctaLabel}
          </a>
        </header>

        <div className="mtr-hero-grid">
          <div className="mtr-hero-card">
            <SectionLabel path="hero.label">{content.hero.label}</SectionLabel>
            <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
            <p data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</p>
            <a className="mtr-button" href={content.hero.button.href} data-editable-path="hero.button.label" data-editable-type="link" data-editable-href-path="hero.button.href">
              {content.hero.button.label}
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
          <div className="mtr-hero-photo">
            <img src={content.hero.image} alt={content.hero.imageAlt} data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
            {heroChips.map((chip, index) => (
              <span className={`mtr-chip mtr-chip-${index + 1}`} key={chip} data-editable-path={`hero.chips.${index}`} data-editable-type="text">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mtr-statement">
        <p data-editable-path="statement" data-editable-type="text">{content.statement}</p>
      </section>

      <section className="mtr-stats">
        {stats.map((stat, index) => (
          <article key={stat.label}>
            <span aria-hidden="true" />
            <h2 data-editable-path={`stats.${index}.value`} data-editable-type="text">{stat.value}</h2>
            <h3 data-editable-path={`stats.${index}.label`} data-editable-type="text">{stat.label}</h3>
            <p data-editable-path={`stats.${index}.body`} data-editable-type="text">{stat.body}</p>
          </article>
        ))}
      </section>

      <section id="about" className="mtr-expert">
        <div className="mtr-expert-photo">
          <img src={content.expert.image} alt={content.expert.imageAlt} data-editable-path="expert.image" data-editable-type="image" data-editable-alt-path="expert.imageAlt" />
        </div>
        <div className="mtr-expert-copy">
          <SectionLabel path="expert.label">{content.expert.label}</SectionLabel>
          <h2 data-editable-path="expert.title" data-editable-type="text">{content.expert.title}</h2>
          <p data-editable-path="expert.body" data-editable-type="text">{content.expert.body}</p>
          <a className="mtr-button" href={content.expert.button.href} data-editable-path="expert.button.label" data-editable-type="link" data-editable-href-path="expert.button.href">
            {content.expert.button.label}
            <ArrowRight size={15} weight="bold" />
          </a>
          <div className="mtr-mini-grid">
            {expertCards.map((card, index) => (
              <article key={card.title}>
                <Check size={15} weight="bold" />
                <h3 data-editable-path={`expert.cards.${index}.title`} data-editable-type="text">{card.title}</h3>
                <p data-editable-path={`expert.cards.${index}.body`} data-editable-type="text">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="mtr-services">
        <div className="mtr-section-head">
          <SectionLabel path="services.label">{content.services.label}</SectionLabel>
          <h2 data-editable-path="services.title" data-editable-type="text">{content.services.title}</h2>
          <p data-editable-path="services.body" data-editable-type="text">{content.services.body}</p>
        </div>
        <div className="mtr-service-grid">
          {services.map((service, index) => (
            <article key={service.title}>
              <span data-editable-path={`services.items.${index}.tag`} data-editable-type="text">{service.tag}</span>
              <h3 data-editable-path={`services.items.${index}.title`} data-editable-type="text">{service.title}</h3>
              <p data-editable-path={`services.items.${index}.body`} data-editable-type="text">{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mtr-specialists">
        <div className="mtr-section-head">
          <SectionLabel path="specialists.label">{content.specialists.label}</SectionLabel>
          <h2 data-editable-path="specialists.title" data-editable-type="text">{content.specialists.title}</h2>
          <p data-editable-path="specialists.body" data-editable-type="text">{content.specialists.body}</p>
        </div>
        <div className="mtr-specialist-row">
          {[0, 1, 2].map((item) => (
            <figure className={`mtr-specialist-card is-${item + 1}`} key={item}>
              <img src={content.specialists.image} alt={content.specialists.imageAlt} data-editable-path="specialists.image" data-editable-type="image" data-editable-alt-path="specialists.imageAlt" />
            </figure>
          ))}
        </div>
      </section>

      <section className="mtr-why">
        <div className="mtr-section-head">
          <SectionLabel path="why.label">{content.why.label}</SectionLabel>
          <h2 data-editable-path="why.title" data-editable-type="text">{content.why.title}</h2>
          <p data-editable-path="why.body" data-editable-type="text">{content.why.body}</p>
        </div>
        <div className="mtr-why-row">
          {whyItems.map((item, index) => (
            <article key={item.title}>
              <span>{index + 1}</span>
              <h3 data-editable-path={`why.items.${index}.title`} data-editable-type="text">{item.title}</h3>
              <p data-editable-path={`why.items.${index}.body`} data-editable-type="text">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mtr-process">
        <div className="mtr-section-head">
          <SectionLabel path="process.label">{content.process.label}</SectionLabel>
          <h2 data-editable-path="process.title" data-editable-type="text">{content.process.title}</h2>
          <p data-editable-path="process.body" data-editable-type="text">{content.process.body}</p>
        </div>
        <div className="mtr-timeline">
          {processItems.map((item, index) => (
            <article className={index % 2 === 0 ? "is-right" : "is-left"} key={item.number}>
              <strong data-editable-path={`process.items.${index}.number`} data-editable-type="text">{item.number}</strong>
              <div>
                <h3 data-editable-path={`process.items.${index}.title`} data-editable-type="text">{item.title}</h3>
                <p data-editable-path={`process.items.${index}.body`} data-editable-type="text">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mtr-testimonials">
        <div className="mtr-section-head">
          <SectionLabel path="testimonials.label">{content.testimonials.label}</SectionLabel>
          <h2 data-editable-path="testimonials.title" data-editable-type="text">{content.testimonials.title}</h2>
          <p data-editable-path="testimonials.body" data-editable-type="text">{content.testimonials.body}</p>
        </div>
        <div className="mtr-testimonial-grid">
          {testimonials.map((item, index) => (
            <article key={item.name}>
              <div className="mtr-stars">{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={13} weight="fill" />)}</div>
              <h3 data-editable-path={`testimonials.items.${index}.title`} data-editable-type="text">{item.title}</h3>
              <p data-editable-path={`testimonials.items.${index}.quote`} data-editable-type="text">{item.quote}</p>
              <strong data-editable-path={`testimonials.items.${index}.name`} data-editable-type="text">{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="blog" className="mtr-blog">
        <div className="mtr-blog-head">
          <div>
            <SectionLabel path="blog.label">{content.blog.label}</SectionLabel>
            <h2 data-editable-path="blog.title" data-editable-type="text">{content.blog.title}</h2>
          </div>
          <a href={content.blog.button.href} data-editable-path="blog.button.label" data-editable-type="link" data-editable-href-path="blog.button.href">
            {content.blog.button.label}
            <ArrowRight size={14} weight="bold" />
          </a>
        </div>
        <div className="mtr-blog-grid">
          {posts.map((post, index) => (
            <article className={index === 0 ? "is-large" : ""} key={post.title}>
              <img src={post.image} alt={post.imageAlt} data-editable-path={`blog.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`blog.items.${index}.imageAlt`} />
              <div>
                <span data-editable-path={`blog.items.${index}.tag`} data-editable-type="text">{post.tag}</span>
                <h3 data-editable-path={`blog.items.${index}.title`} data-editable-type="text">{post.title}</h3>
                <time data-editable-path={`blog.items.${index}.date`} data-editable-type="text">{post.date}</time>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mtr-faq">
        <div className="mtr-section-head">
          <h2 data-editable-path="faq.title" data-editable-type="text">{content.faq.title}</h2>
          <p data-editable-path="faq.body" data-editable-type="text">{content.faq.body}</p>
        </div>
        <div className="mtr-faq-list">
          {faqItems.map((item, index) => (
            <article className={activeFaq === index ? "is-open" : ""} key={item.question}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)} aria-expanded={activeFaq === index}>
                <span data-editable-path={`faq.items.${index}.question`} data-editable-type="text">{item.question}</span>
                <CaretDown size={15} weight="bold" />
              </button>
              <p data-editable-path={`faq.items.${index}.answer`} data-editable-type="text">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mtr-cta">
        <img className="mtr-cta-left" src={content.cta.imageLeft} alt={content.cta.imageAlt} data-editable-path="cta.imageLeft" data-editable-type="image" data-editable-alt-path="cta.imageAlt" />
        <div>
          <SectionLabel path="cta.label">{content.cta.label}</SectionLabel>
          <h2 data-editable-path="cta.title" data-editable-type="text">{content.cta.title}</h2>
          <a className="mtr-button" href={content.cta.button.href} data-editable-path="cta.button.label" data-editable-type="link" data-editable-href-path="cta.button.href">
            {content.cta.button.label}
            <ArrowRight size={15} weight="bold" />
          </a>
        </div>
        <img className="mtr-cta-right" src={content.cta.imageRight} alt={content.cta.imageAlt} data-editable-path="cta.imageRight" data-editable-type="image" data-editable-alt-path="cta.imageAlt" />
      </section>

      <footer id="contact" className="mtr-footer">
        <div>
          <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
          <p data-editable-path="footer.tagline" data-editable-type="text">{content.footer.tagline}</p>
          <a className="mtr-button" href={content.hero.button.href} data-editable-path="hero.button.label" data-editable-type="link" data-editable-href-path="hero.button.href">
            {content.hero.button.label}
          </a>
        </div>
        <nav aria-label="Main pages">
          <h3 data-editable-path="footer.mainTitle" data-editable-type="text">{content.footer.mainTitle}</h3>
          {mainLinks.map((link, index) => (
            <a key={link.label} href={link.href} data-editable-path={`footer.mainLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.mainLinks.${index}.href`}>{link.label}</a>
          ))}
        </nav>
        <nav aria-label="Support links">
          <h3 data-editable-path="footer.supportTitle" data-editable-type="text">{content.footer.supportTitle}</h3>
          {supportLinks.map((link, index) => (
            <a key={link.label} href={link.href} data-editable-path={`footer.supportLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.supportLinks.${index}.href`}>{link.label}</a>
          ))}
        </nav>
        <div>
          <h3 data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</h3>
          <a href={`tel:${content.brand.phone.replace(/\s+/g, "")}`} data-editable-path="brand.phone" data-editable-type="link">{content.brand.phone}</a>
          <p data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</p>
          <div className="mtr-socials">
            {socialLinks.map((link, index) => (
              <a key={link.label} href={link.href} aria-label={link.label} data-editable-path={`footer.socialLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.socialLinks.${index}.href`}>
                {link.label.slice(0, 1)}
              </a>
            ))}
          </div>
        </div>
        <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</small>
      </footer>
    </main>
  );
}
