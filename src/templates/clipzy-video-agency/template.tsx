"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ChartLineUp,
  CheckCircle,
  CurrencyGbp,
  InstagramLogo,
  Lightning,
  List,
  MagicWand,
  Minus,
  Play,
  Plus,
  Scissors,
  ShieldCheck,
  Sparkle,
  TiktokLogo,
  UploadSimple,
  VideoCamera,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type ClipzyData = typeof defaults;
type LinkItem = { label: string; href: string };
type ImageCard = { title: string; category?: string; body?: string; image: string; imageAlt: string };
type Stat = { value: string; label: string };
type Service = { title: string; icon: string };
type CtaCard = { title: string; body: string };
type Testimonial = { quote: string; name: string; role: string; image: string; imageAlt: string };
type Plan = { name: string; price: string; period: string; description: string; button: LinkItem; features: string[] };
type Faq = { question: string; answer: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function cssVars(data: ClipzyData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--cva-page": data.colors.pageBackground,
    "--cva-surface": data.colors.surface,
    "--cva-soft": data.colors.softSurface,
    "--cva-heading": data.colors.headingText,
    "--cva-body": data.colors.bodyText,
    "--cva-muted": data.colors.mutedText,
    "--cva-accent": data.colors.accent,
    "--cva-accent-deep": data.colors.accentDeep,
    "--cva-button": data.colors.buttonBg,
    "--cva-button-text": data.colors.buttonText,
    "--cva-secondary": data.colors.secondaryButtonBg,
    "--cva-secondary-border": data.colors.secondaryButtonBorder,
    "--cva-secondary-text": data.colors.secondaryButtonText,
    "--cva-border": data.colors.border,
    "--cva-footer": data.colors.footerBg,
    "--cva-footer-text": data.colors.footerText,
    "--cva-footer-muted": data.colors.footerMuted,
    "--cva-heading-font": data.typography.headingFont,
    "--cva-body-font": data.typography.bodyFont,
    "--cva-accent-font": data.typography.accentFont,
  };
}

function ServiceIcon({ name }: { name: string }) {
  const props = { size: 50, weight: "fill" as const };
  if (name === "youtube") return <YoutubeLogo {...props} />;
  if (name === "instagram") return <InstagramLogo {...props} />;
  if (name === "tiktok") return <TiktokLogo {...props} />;
  if (name === "motion") return <MagicWand {...props} />;
  return <Scissors {...props} />;
}

function SectionTitle({ label, title, accent }: { label?: string; title: string; accent?: string }) {
  return (
    <div className="cva-section-title">
      {label ? <span>{label}</span> : null}
      <h2>
        {title} {accent ? <em>{accent}</em> : null}
      </h2>
    </div>
  );
}

export default function ClipzyVideoAgencyTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as ClipzyData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const steps = asArray<ImageCard>(content.steps.items);
  const works = asArray<ImageCard>(content.works.items);
  const stats = asArray<Stat>(content.proof.stats);
  const services = asArray<Service>(content.services.items);
  const ctaCards = asArray<CtaCard>(content.cta.cards);
  const testimonials = asArray<Testimonial>(content.testimonials.items);
  const plans = asArray<Plan>(content.pricing.plans);
  const faqs = asArray<Faq>(content.faq.items);
  const companyLinks = asArray<LinkItem>(content.footer.companyLinks);
  const footerLinks = asArray<LinkItem>(content.footer.links);
  const socialLinks = asArray<LinkItem>(content.footer.socialLinks);

  return (
    <main id="home" data-template-id="clipzy-video-agency" className="clipzy-video-agency" style={cssVars(content)}>
      <header className="cva-header">
        <a className="cva-brand" href="#home" aria-label={content.brand.name}>
          <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
        </a>
        <button className="cva-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? <X size={18} /> : <List size={18} />}
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} data-editable-path={`navigation.links.${index}.label`} data-editable-type="link" data-editable-href-path={`navigation.links.${index}.href`}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="cva-nav-cta" href={content.navigation.ctaHref} data-editable-path="navigation.ctaLabel" data-editable-type="link" data-editable-href-path="navigation.ctaHref">
          {content.navigation.ctaLabel} <ArrowRight size={13} weight="bold" />
        </a>
      </header>

      <section className="cva-hero" aria-labelledby="cva-hero-title">
        <div className="cva-orbit" aria-hidden="true">
          <span><YoutubeLogo size={18} weight="fill" /></span>
          <span><InstagramLogo size={17} weight="fill" /></span>
          <span><TiktokLogo size={17} weight="fill" /></span>
          <i />
        </div>
        <p className="cva-pill" data-editable-path="hero.badge" data-editable-type="text"><Sparkle size={13} weight="fill" /> {content.hero.badge}</p>
        <h1 id="cva-hero-title">
          <span data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</span>
          <em data-editable-path="hero.accent" data-editable-type="text">{content.hero.accent}</em>
        </h1>
        <p data-editable-path="hero.description" data-editable-type="text">{content.hero.description}</p>
        <div className="cva-hero-actions">
          <a className="cva-button cva-button-dark" href={content.hero.primaryCta.href} data-editable-path="hero.primaryCta.label" data-editable-type="link" data-editable-href-path="hero.primaryCta.href">
            {content.hero.primaryCta.label} <ArrowRight size={13} weight="bold" />
          </a>
          <a className="cva-button cva-button-light" href={content.hero.secondaryCta.href} data-editable-path="hero.secondaryCta.label" data-editable-type="link" data-editable-href-path="hero.secondaryCta.href">
            {content.hero.secondaryCta.label}
          </a>
        </div>
        <div className="cva-hero-media">
          <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        </div>
        <div className="cva-side-notes" aria-label="Campaign highlights">
          {content.hero.sideCards.map((note, index) => (
            <span key={note} data-editable-path={`hero.sideCards.${index}`} data-editable-type="text">{note}</span>
          ))}
        </div>
      </section>

      <section className="cva-logos" aria-label="Client logos">
        <p data-editable-path="logos.intro" data-editable-type="text">{content.logos.intro}</p>
        <div>
          {content.logos.items.map((logo, index) => (
            <span key={logo}>
              <i aria-hidden="true" />
              <b data-editable-path={`logos.items.${index}`} data-editable-type="text">{logo}</b>
            </span>
          ))}
        </div>
      </section>

      <section id="about" className="cva-steps">
        {steps.map((step, index) => (
          <article key={step.title}>
            <span>{index === 0 ? <VideoCamera size={18} /> : index === 1 ? <Scissors size={18} /> : <UploadSimple size={18} />}</span>
            <h2 data-editable-path={`steps.items.${index}.title`} data-editable-type="text">{step.title}</h2>
            <p data-editable-path={`steps.items.${index}.body`} data-editable-type="text">{step.body}</p>
            <img src={step.image} alt={step.imageAlt} loading="lazy" data-editable-path={`steps.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`steps.items.${index}.imageAlt`} />
          </article>
        ))}
      </section>

      <section id="works" className="cva-works">
        <SectionTitle label={content.works.label} title={content.works.title} accent={content.works.accent} />
        <div className="cva-work-track">
          {works.map((work, index) => (
            <article key={work.title}>
              <img src={work.image} alt={work.imageAlt} loading="lazy" data-editable-path={`works.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`works.items.${index}.imageAlt`} />
              <div>
                <span data-editable-path={`works.items.${index}.category`} data-editable-type="text">{work.category}</span>
                <h3 data-editable-path={`works.items.${index}.title`} data-editable-type="text">{work.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <a className="cva-button cva-button-light" href={content.works.button.href} data-editable-path="works.button.label" data-editable-type="link" data-editable-href-path="works.button.href">{content.works.button.label}</a>
      </section>

      <section className="cva-proof">
        <span data-editable-path="proof.label" data-editable-type="text">{content.proof.label}</span>
        <h2 data-editable-path="proof.title" data-editable-type="text">{content.proof.title}</h2>
        <div>
          {stats.map((stat, index) => (
            <article key={stat.label}>
              <strong data-editable-path={`proof.stats.${index}.value`} data-editable-type="text">{stat.value}</strong>
              <p data-editable-path={`proof.stats.${index}.label`} data-editable-type="text">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className="cva-services">
        <SectionTitle label={content.services.label} title={content.services.title} accent={content.services.accent} />
        <div className="cva-service-grid">
          {services.map((service, index) => (
            <article key={service.title}>
              <ServiceIcon name={service.icon} />
              <h3 data-editable-path={`services.items.${index}.title`} data-editable-type="text">{service.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="cva-orange-cta">
        <div>
          <h2 data-editable-path="cta.title" data-editable-type="text">{content.cta.title}</h2>
          <a className="cva-button cva-button-light" href={content.cta.button.href} data-editable-path="cta.button.label" data-editable-type="link" data-editable-href-path="cta.button.href">
            {content.cta.button.label} <ArrowRight size={13} weight="bold" />
          </a>
        </div>
        <div className="cva-cta-cards">
          {ctaCards.map((card, index) => (
            <article key={card.title}>
              {index === 0 ? <CurrencyGbp size={18} weight="fill" /> : index === 1 ? <Lightning size={18} weight="fill" /> : <ShieldCheck size={18} weight="fill" />}
              <h3 data-editable-path={`cta.cards.${index}.title`} data-editable-type="text">{card.title}</h3>
              <p data-editable-path={`cta.cards.${index}.body`} data-editable-type="text">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cva-testimonials">
        <SectionTitle label={content.testimonials.label} title={content.testimonials.title} accent={content.testimonials.accent} />
        <div className="cva-testimonial-track">
          {testimonials.map((item, index) => (
            <blockquote key={item.name}>
              <img src={item.image} alt={item.imageAlt} loading="lazy" data-editable-path={`testimonials.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`testimonials.items.${index}.imageAlt`} />
              <p data-editable-path={`testimonials.items.${index}.quote`} data-editable-type="text">"{item.quote}"</p>
              <footer>
                <strong data-editable-path={`testimonials.items.${index}.name`} data-editable-type="text">{item.name}</strong>
                <span data-editable-path={`testimonials.items.${index}.role`} data-editable-type="text">{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section id="pricing" className="cva-pricing">
        <SectionTitle title={content.pricing.title} accent={content.pricing.accent} />
        <p data-editable-path="pricing.description" data-editable-type="text">{content.pricing.description}</p>
        <div className="cva-price-grid">
          {plans.map((plan, index) => (
            <article key={plan.name}>
              <h3 data-editable-path={`pricing.plans.${index}.name`} data-editable-type="text">{plan.name}</h3>
              <p data-editable-path={`pricing.plans.${index}.description`} data-editable-type="text">{plan.description}</p>
              <div><strong data-editable-path={`pricing.plans.${index}.price`} data-editable-type="text">{plan.price}</strong><span data-editable-path={`pricing.plans.${index}.period`} data-editable-type="text">{plan.period}</span></div>
              <a href={plan.button.href} data-editable-path={`pricing.plans.${index}.button.label`} data-editable-type="link" data-editable-href-path={`pricing.plans.${index}.button.href`}>{plan.button.label}</a>
              <ul>
                {plan.features.map((feature, featureIndex) => (
                  <li key={feature}><CheckCircle size={14} weight="fill" /><span data-editable-path={`pricing.plans.${index}.features.${featureIndex}`} data-editable-type="text">{feature}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="cva-faq">
        <SectionTitle title={content.faq.title} accent={content.faq.accent} />
        <div>
          {faqs.map((item, index) => (
            <article className={activeFaq === index ? "is-open" : ""} key={item.question}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                <span data-editable-path={`faq.items.${index}.question`} data-editable-type="text">{item.question}</span>
                {activeFaq === index ? <Minus size={15} /> : <Plus size={15} />}
              </button>
              <p data-editable-path={`faq.items.${index}.answer`} data-editable-type="text">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" className="cva-footer">
        <section>
          <h2><span data-editable-path="footer.title" data-editable-type="text">{content.footer.title}</span> <em data-editable-path="footer.accent" data-editable-type="text">{content.footer.accent}</em></h2>
          <p data-editable-path="footer.body" data-editable-type="text">{content.footer.body}</p>
          <a className="cva-button cva-button-light" href={content.footer.button.href} data-editable-path="footer.button.label" data-editable-type="link" data-editable-href-path="footer.button.href">
            {content.footer.button.label}
          </a>
          <div className="cva-footer-icons" aria-hidden="true">
            <span><Scissors size={19} weight="fill" /></span>
            <span><Play size={19} weight="fill" /></span>
            <span><ChartLineUp size={19} weight="fill" /></span>
          </div>
        </section>
        <div className="cva-footer-card">
          <div className="cva-footer-brand">
            <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
            <p data-editable-path="brand.strapline" data-editable-type="text">{content.brand.strapline}</p>
            <a href={content.brand.emailHref} data-editable-path="brand.email" data-editable-type="link" data-editable-href-path="brand.emailHref">{content.brand.email}</a>
            <a href={content.brand.phoneHref} data-editable-path="brand.phone" data-editable-type="link" data-editable-href-path="brand.phoneHref">{content.brand.phone}</a>
          </div>
          <nav aria-label="Footer company links">
            <h3 data-editable-path="footer.companyTitle" data-editable-type="text">{content.footer.companyTitle}</h3>
            {companyLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.companyLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.companyLinks.${index}.href`}>{link.label}</a>)}
          </nav>
          <nav aria-label="Footer service links">
            <h3 data-editable-path="footer.linksTitle" data-editable-type="text">{content.footer.linksTitle}</h3>
            {footerLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>{link.label}</a>)}
          </nav>
          <nav aria-label="Social links">
            <h3 data-editable-path="footer.socialTitle" data-editable-type="text">{content.footer.socialTitle}</h3>
            <div className="cva-socials">
              {socialLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.socialLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.socialLinks.${index}.href`}>{link.label}</a>)}
            </div>
          </nav>
          <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright.replace("2026", String(currentYear))}</small>
          <div className="cva-legal">
            <span data-editable-path="footer.privacy" data-editable-type="text">{content.footer.privacy}</span>
            <span data-editable-path="footer.terms" data-editable-type="text">{content.footer.terms}</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
