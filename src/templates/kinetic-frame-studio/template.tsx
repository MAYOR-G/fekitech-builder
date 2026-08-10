"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowRight, Check, Menu, Minus, Plus, X } from "lucide-react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type KineticData = typeof editableData;

function readCssVars(data: KineticData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--kfs-page": data.colors.pageBackground,
    "--kfs-surface": data.colors.surface,
    "--kfs-card": data.colors.card,
    "--kfs-heading": data.colors.headingText,
    "--kfs-body": data.colors.bodyText,
    "--kfs-muted": data.colors.mutedText,
    "--kfs-accent": data.colors.accent,
    "--kfs-ink": data.colors.accentSecondary,
    "--kfs-border": data.colors.border,
    "--kfs-footer": data.colors.footerBg,
    "--kfs-footer-text": data.colors.footerText,
    "--kfs-footer-muted": data.colors.footerMuted,
    "--kfs-form": data.colors.formBackground,
    "--kfs-form-text": data.colors.formText,
    "--kfs-form-muted": data.colors.formPlaceholder,
    "--kfs-form-border": data.colors.formBorder,
    "--kfs-display-font": "var(--font-display, \"Arial Black\", Arial, sans-serif)",
    "--kfs-heading-font": "var(--font-heading, \"Arial Black\", Arial, sans-serif)",
    "--kfs-body-font": "var(--font-body, Inter, Arial, sans-serif)",
  };
}

export default function KineticFrameStudioTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as KineticData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <div data-template-id="kinetic-frame-studio" className="kinetic-frame-studio" style={readCssVars(content)}>
      <header className="kfs-header" id="home">
        <a className="kfs-brand" href="#home" aria-label={content.brand.name}>
          <img src={content.brand.logo} alt={content.brand.logoAlt} />
          <span>{content.brand.shortName}</span>
        </a>
        <button className="kfs-menu-button" type="button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`kfs-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {content.navigation.links.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a className="kfs-nav-cta" href={content.navigation.ctaHref}>{content.navigation.ctaLabel}</a>
        </nav>
      </header>

      <main>
        <section className="kfs-hero" aria-labelledby="kfs-hero-title">
          <div className="kfs-hero-copy">
            <p className="kfs-star-label"><span aria-hidden="true">*</span>{content.hero.eyebrow}</p>
            <h1 id="kfs-hero-title">{content.hero.title}</h1>
            <p className="kfs-hero-description">{content.hero.description}</p>
            <a className="kfs-team-link" href={content.hero.teamHref}>
              <span className="kfs-avatar-stack" aria-hidden="true">
                {content.hero.avatars.map((avatar) => <img key={avatar.image} src={avatar.image} alt="" />)}
              </span>
              <span>{content.hero.teamLabel}</span>
              <ArrowRight size={22} />
            </a>
          </div>
          <div className="kfs-hero-visual">
            <img src={content.hero.image} alt={content.hero.imageAlt} />
            <div className="kfs-hero-orb">
              <span>{content.hero.orbText}</span>
              <ArrowDown size={22} />
            </div>
            <strong>{content.hero.caption}</strong>
          </div>
        </section>

        <SectionHeading eyebrow={content.services.eyebrow} title={content.services.title} />
        <section className="kfs-services" id="services" aria-label={content.services.title}>
          {content.services.items.map((service, index) => (
            <button className={`kfs-service-row ${activeService === index ? "is-active" : ""}`} key={service.title} type="button" onClick={() => setActiveService(index)}>
              <span>{service.number}</span>
              <strong>{service.title}</strong>
              <small>{service.meta}</small>
              {activeService === index ? <Minus size={18} /> : <Plus size={18} />}
              <em>{service.description}</em>
            </button>
          ))}
        </section>

        <section className="kfs-about" id="about">
          <SectionHeading eyebrow={content.about.eyebrow} title={content.about.title} />
          <div className="kfs-about-grid">
            <div className="kfs-about-image">
              <img src={content.about.image} alt={content.about.imageAlt} />
              <span aria-hidden="true"><ArrowDown size={18} /></span>
            </div>
            <article className="kfs-story-card">
              <h3>{content.about.storyTitle}</h3>
              <p>{content.about.story}</p>
            </article>
          </div>
          <div className="kfs-stats">
            {content.about.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="kfs-partner-note">{content.about.statsIntro}</p>
          <div className="kfs-partners" aria-label="Partner logos">
            {content.about.partners.map((partner) => <span key={partner}>{partner}</span>)}
          </div>
        </section>

        <section className="kfs-projects" id="projects">
          <SectionHeading eyebrow={content.projects.eyebrow} title={content.projects.title} />
          <div className="kfs-project-stack">
            {content.projects.items.map((project) => (
              <article className="kfs-project-card" key={project.title}>
                <img src={project.image} alt={project.imageAlt} />
                <div>
                  <span>{project.category}</span>
                  <h3>{project.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kfs-process" id="process">
          <div className="kfs-process-lead">
            <SectionHeading eyebrow={content.process.eyebrow} title={content.process.title} />
            <img src={content.process.image} alt={content.process.imageAlt} />
          </div>
          <div className="kfs-process-steps">
            {content.process.steps.map((step) => (
              <article key={step.number}>
                <strong>{step.number}</strong>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kfs-team" id="team">
          <SectionHeading eyebrow={content.team.eyebrow} title={content.team.title} />
          <div className="kfs-team-grid">
            {content.team.people.map((person) => (
              <article key={person.name}>
                <img src={person.image} alt={person.imageAlt} />
                <div>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="kfs-pricing" id="pricing">
          <SectionHeading eyebrow={content.pricing.eyebrow} title={content.pricing.title} />
          <div className="kfs-price-grid">
            {content.pricing.plans.map((plan, index) => (
              <article className={index === 1 ? "is-featured" : ""} key={plan.name}>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div><strong>{plan.price}</strong><span>{plan.period}</span></div>
                <a href={plan.buttonHref}>{plan.buttonLabel}</a>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}><Check size={14} />{feature}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="kfs-testimonials" id="testimonials">
          <SectionHeading eyebrow={content.testimonials.eyebrow} title={content.testimonials.title} />
          <div className="kfs-testimonial-grid">
            {content.testimonials.items.map((item) => (
              <blockquote key={item.name}>
                <p>{item.quote}</p>
                <cite>{item.name}<span>{item.role}</span></cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="kfs-faq" id="faq">
          <div>
            <SectionHeading eyebrow={content.faq.eyebrow} title={content.faq.title} />
            <img src={content.faq.image} alt={content.faq.imageAlt} />
          </div>
          <div className="kfs-faq-list">
            {content.faq.items.map((item, index) => (
              <article className={activeFaq === index ? "is-open" : ""} key={item.question}>
                <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                  <span>{item.question}</span>
                  {activeFaq === index ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="kfs-blog" id="blog">
          <SectionHeading eyebrow={content.blog.eyebrow} title={content.blog.title} />
          <div className="kfs-blog-grid">
            {content.blog.posts.map((post) => (
              <article key={post.title}>
                <img src={post.image} alt={post.imageAlt} />
                <span>{post.date}</span>
                <h3>{post.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="kfs-contact" id="contact">
          <div className="kfs-contact-copy">
            <span>{content.contact.badge}</span>
            <h2>{content.contact.title}</h2>
            <p>{content.contact.description}</p>
            <a href={content.brand.emailHref}>{content.brand.email}</a>
            <a href={content.brand.phoneHref}>{content.brand.phone}</a>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>{content.contact.form.nameLabel}<input placeholder={content.contact.form.namePlaceholder} /></label>
            <label>{content.contact.form.emailLabel}<input type="email" placeholder={content.contact.form.emailPlaceholder} /></label>
            <label>{content.contact.form.companyLabel}<input placeholder={content.contact.form.companyPlaceholder} /></label>
            <label>{content.contact.form.messageLabel}<textarea placeholder={content.contact.form.messagePlaceholder} rows={5} /></label>
            <button type="submit">{content.contact.form.buttonLabel}</button>
          </form>
        </section>
      </main>

      <footer className="kfs-footer">
        <div className="kfs-footer-brand">
          <img src={content.brand.logo} alt={content.brand.logoAlt} />
          <h2>{content.brand.name}</h2>
          <p>{content.footer.description}</p>
        </div>
        <div>
          <h3>{content.footer.linksTitle}</h3>
          {content.navigation.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <div>
          <h3>{content.footer.serviceTitle}</h3>
          {content.footer.serviceLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <div>
          <h3>{content.footer.socialTitle}</h3>
          {content.footer.socialLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
          <p>{content.brand.address}</p>
          <p>{content.brand.hours}</p>
        </div>
        <small>{content.footer.copyright.replace("2026", String(currentYear))}</small>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="kfs-section-heading">
      <p><span aria-hidden="true">{"{"}</span>{eyebrow}<span aria-hidden="true">{"}"}</span></p>
      <h2>{title}</h2>
    </div>
  );
}
