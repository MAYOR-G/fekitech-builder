"use client";

import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowRight,
  CaretDown,
  FlowerLotus,
  HandsPraying,
  Heart,
  Leaf,
  List,
  Minus,
  Plus,
  Sparkle,
  Star,
  X,
} from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type QuantumData = typeof defaults;
type LinkItem = { label: string; href: string };
type Feature = { title: string; body: string; icon: string };
type Therapy = { title: string; body: string };
type Plan = { name: string; price: string; period: string; icon: string };
type Story = { quote: string; name: string; role: string; image: string; imageAlt: string };
type PathItem = { title: string; body: string };
type Moment = { image: string; alt: string };
type BlogPost = { title: string; date: string; image: string; imageAlt: string; buttonLabel: string; href: string };
type Faq = { question: string; answer: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function iconFor(name: string, size = 22) {
  const props = { size, weight: "regular" as const };
  if (name === "leaf") return <Leaf {...props} />;
  if (name === "heart") return <Heart {...props} />;
  if (name === "hands") return <HandsPraying {...props} />;
  if (name === "sparkle") return <Sparkle {...props} />;
  return <FlowerLotus {...props} />;
}

function cssVars(data: QuantumData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--qws-page": data.colors.pageBackground,
    "--qws-surface": data.colors.surface,
    "--qws-card": data.colors.card,
    "--qws-heading": data.colors.headingText,
    "--qws-body": data.colors.bodyText,
    "--qws-muted": data.colors.mutedText,
    "--qws-accent": data.colors.accent,
    "--qws-accent-deep": data.colors.accentDeep,
    "--qws-line": data.colors.line,
    "--qws-button": data.colors.buttonBg,
    "--qws-button-text": data.colors.buttonText,
    "--qws-footer": data.colors.footerBg,
    "--qws-footer-text": data.colors.footerText,
    "--qws-footer-muted": data.colors.footerMuted,
    "--qws-heading-font": data.typography.headingFont,
    "--qws-body-font": data.typography.bodyFont,
    "--qws-display-font": data.typography.displayFont,
  };
}

function SectionHead({ label, title, description }: { label?: string; title: string; description?: string }) {
  return (
    <div className="qws-section-head">
      {label ? <span>{label}</span> : null}
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default function QuantumWellnessSpaTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as QuantumData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTherapy, setActiveTherapy] = useState(0);
  const [activeFaq, setActiveFaq] = useState(0);
  const year = useMemo(() => new Date().getFullYear(), []);

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const features = asArray<Feature>(content.features.items);
  const therapies = asArray<Therapy>(content.therapies.items);
  const plans = asArray<Plan>(content.pricing.plans);
  const stories = asArray<Story>(content.stories.items);
  const pathItems = asArray<PathItem>(content.path.items);
  const moments = asArray<Moment>(content.moments.items);
  const posts = asArray<BlogPost>(content.blog.items);
  const faqs = asArray<Faq>(content.faq.items);
  const companyLinks = asArray<LinkItem>(content.footer.companyLinks);
  const socialLinks = asArray<LinkItem>(content.footer.socialLinks);

  return (
    <main id="home" data-template-id="quantum-wellness-spa" className="quantum-wellness-spa" style={cssVars(content)}>
      <div className="qws-topbar">
        <span data-editable-path="topBar.text" data-editable-type="text">{content.topBar.text}</span>
        <span data-editable-path="topBar.rightText" data-editable-type="text">{content.topBar.rightText}</span>
      </div>

      <header className="qws-header">
        <a className="qws-logo" href="#home" aria-label={content.brand.name}>
          <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
        </a>
        <button className="qws-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={18} /> : <List size={18} />}
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} data-editable-path={`navigation.links.${index}.label`} data-editable-type="link" data-editable-href-path={`navigation.links.${index}.href`}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="qws-nav-cta" href={content.navigation.ctaHref} data-editable-path="navigation.ctaLabel" data-editable-type="link" data-editable-href-path="navigation.ctaHref">
          {content.navigation.ctaLabel}
        </a>
      </header>

      <section className="qws-hero" aria-labelledby="qws-hero-title">
        <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="qws-hero-overlay" />
        <div className="qws-hero-copy">
          <div className="qws-rating" data-editable-path="hero.rating" data-editable-type="text">
            <Star size={13} weight="fill" /> {content.hero.rating}
          </div>
          <h1 id="qws-hero-title" data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <p data-editable-path="hero.description" data-editable-type="text">{content.hero.description}</p>
          <a href={content.hero.primaryCta.href} data-editable-path="hero.primaryCta.label" data-editable-type="link" data-editable-href-path="hero.primaryCta.href">
            {content.hero.primaryCta.label} <ArrowRight size={14} />
          </a>
        </div>
        <div className="qws-hero-cards">
          {content.hero.cards.map((card, index) => (
            <article key={card.label}>
              <span data-editable-path={`hero.cards.${index}.label`} data-editable-type="text">{card.label}</span>
              <strong data-editable-path={`hero.cards.${index}.title`} data-editable-type="text">{card.title}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="qws-intro">
        <div className="qws-intro-number">
          <strong data-editable-path="intro.number" data-editable-type="text">{content.intro.number}</strong>
          <span data-editable-path="intro.numberLabel" data-editable-type="text">{content.intro.numberLabel}</span>
        </div>
        <div>
          <h2 data-editable-path="intro.title" data-editable-type="text">{content.intro.title}</h2>
          <p data-editable-path="intro.body" data-editable-type="text">{content.intro.body}</p>
        </div>
        <a href={content.intro.button.href} data-editable-path="intro.button.label" data-editable-type="link" data-editable-href-path="intro.button.href">{content.intro.button.label}</a>
      </section>

      <section className="qws-features">
        {features.map((feature, index) => (
          <article key={feature.title}>
            {iconFor(feature.icon)}
            <h3 data-editable-path={`features.items.${index}.title`} data-editable-type="text">{feature.title}</h3>
            <p data-editable-path={`features.items.${index}.body`} data-editable-type="text">{feature.body}</p>
          </article>
        ))}
      </section>

      <section id="therapies" className="qws-therapies">
        <SectionHead label={content.therapies.label} title={content.therapies.title} description={content.therapies.description} />
        <div className="qws-therapy-grid">
          <div className="qws-accordion">
            {therapies.map((item, index) => (
              <article className={activeTherapy === index ? "is-open" : ""} key={item.title}>
                <button type="button" onClick={() => setActiveTherapy(activeTherapy === index ? -1 : index)}>
                  <span data-editable-path={`therapies.items.${index}.title`} data-editable-type="text">{item.title}</span>
                  {activeTherapy === index ? <Minus size={15} /> : <Plus size={15} />}
                </button>
                <p data-editable-path={`therapies.items.${index}.body`} data-editable-type="text">{item.body}</p>
              </article>
            ))}
            <a href={content.therapies.button.href} data-editable-path="therapies.button.label" data-editable-type="link" data-editable-href-path="therapies.button.href">{content.therapies.button.label}</a>
          </div>
          <img src={content.therapies.image} alt={content.therapies.imageAlt} loading="lazy" data-editable-path="therapies.image" data-editable-type="image" data-editable-alt-path="therapies.imageAlt" />
        </div>
      </section>

      <section className="qws-journey">
        <img src={content.journey.image} alt={content.journey.imageAlt} loading="lazy" data-editable-path="journey.image" data-editable-type="image" data-editable-alt-path="journey.imageAlt" />
        <h2 data-editable-path="journey.title" data-editable-type="text">{content.journey.title}</h2>
      </section>

      <section id="pricing" className="qws-pricing">
        <SectionHead label={content.pricing.label} title={content.pricing.title} description={content.pricing.description} />
        <div className="qws-price-grid">
          {plans.map((plan, index) => (
            <article key={plan.name}>
              {iconFor(plan.icon, 25)}
              <h3 data-editable-path={`pricing.plans.${index}.name`} data-editable-type="text">{plan.name}</h3>
              <p><strong data-editable-path={`pricing.plans.${index}.price`} data-editable-type="text">{plan.price}</strong> <span data-editable-path={`pricing.plans.${index}.period`} data-editable-type="text">{plan.period}</span></p>
            </article>
          ))}
        </div>
      </section>

      <section id="stories" className="qws-stories">
        <div>
          <SectionHead label={content.stories.label} title={content.stories.title} description={content.stories.description} />
        </div>
        <div className="qws-story-grid">
          {stories.map((story, index) => (
            <blockquote key={story.name}>
              <img src={story.image} alt={story.imageAlt} loading="lazy" data-editable-path={`stories.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`stories.items.${index}.imageAlt`} />
              <p data-editable-path={`stories.items.${index}.quote`} data-editable-type="text">"{story.quote}"</p>
              <footer>
                <strong data-editable-path={`stories.items.${index}.name`} data-editable-type="text">{story.name}</strong>
                <span data-editable-path={`stories.items.${index}.role`} data-editable-type="text">{story.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="qws-path">
        <SectionHead title={content.path.title} description={content.path.description} />
        <div className="qws-path-grid">
          <div>
            {pathItems.slice(0, 2).map((item, index) => (
              <article key={item.title}>
                <span>{index + 1}</span>
                <h3 data-editable-path={`path.items.${index}.title`} data-editable-type="text">{item.title}</h3>
                <p data-editable-path={`path.items.${index}.body`} data-editable-type="text">{item.body}</p>
              </article>
            ))}
          </div>
          <img src={content.path.image} alt={content.path.imageAlt} loading="lazy" data-editable-path="path.image" data-editable-type="image" data-editable-alt-path="path.imageAlt" />
          <div>
            {pathItems.slice(2).map((item, offset) => {
              const index = offset + 2;
              return (
                <article key={item.title}>
                  <span>{index + 1}</span>
                  <h3 data-editable-path={`path.items.${index}.title`} data-editable-type="text">{item.title}</h3>
                  <p data-editable-path={`path.items.${index}.body`} data-editable-type="text">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="qws-moments">
        <SectionHead label={content.moments.label} title={content.moments.title} description={content.moments.description} />
        <div className="qws-moment-grid">
          {moments.map((item, index) => (
            <img key={item.image} src={item.image} alt={item.alt} loading="lazy" data-editable-path={`moments.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`moments.items.${index}.alt`} />
          ))}
        </div>
      </section>

      <section id="blog" className="qws-blog">
        <SectionHead label={content.blog.label} title={content.blog.title} description={content.blog.description} />
        <div className="qws-post-grid">
          {posts.map((post, index) => (
            <article key={post.title}>
              <img src={post.image} alt={post.imageAlt} loading="lazy" data-editable-path={`blog.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`blog.items.${index}.imageAlt`} />
              <div>
                <span data-editable-path={`blog.items.${index}.date`} data-editable-type="text">{post.date}</span>
                <h3 data-editable-path={`blog.items.${index}.title`} data-editable-type="text">{post.title}</h3>
                <a href={post.href} data-editable-path={`blog.items.${index}.buttonLabel`} data-editable-type="link" data-editable-href-path={`blog.items.${index}.href`}>{post.buttonLabel}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="qws-faq">
        <SectionHead title={content.faq.title} description={content.faq.description} />
        <div>
          {faqs.map((item, index) => (
            <article className={activeFaq === index ? "is-open" : ""} key={item.question}>
              <button type="button" onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}>
                <span data-editable-path={`faq.items.${index}.question`} data-editable-type="text">{item.question}</span>
                <CaretDown size={15} />
              </button>
              <p data-editable-path={`faq.items.${index}.answer`} data-editable-type="text">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="qws-cta">
        <h2 data-editable-path="cta.title" data-editable-type="text">{content.cta.title}</h2>
        <p data-editable-path="cta.body" data-editable-type="text">{content.cta.body}</p>
        <a href={content.cta.button.href} data-editable-path="cta.button.label" data-editable-type="link" data-editable-href-path="cta.button.href">{content.cta.button.label}</a>
      </section>

      <footer className="qws-footer">
        <div className="qws-footer-word" aria-hidden="true">{content.brand.name.toUpperCase()}</div>
        <div className="qws-newsletter">
          <p data-editable-path="footer.newsletterLabel" data-editable-type="text">{content.footer.newsletterLabel}</p>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>
              <span>Email</span>
              <input type="email" aria-label="Email address" />
            </label>
            <button type="submit" data-editable-path="footer.newsletterButton" data-editable-type="text">{content.footer.newsletterButton}</button>
          </form>
        </div>
        <div className="qws-footer-links">
          <div>
            <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
            <p data-editable-path="brand.strapline" data-editable-type="text">{content.brand.strapline}</p>
            <a href={content.brand.emailHref} data-editable-path="brand.email" data-editable-type="link" data-editable-href-path="brand.emailHref">{content.brand.email}</a>
          </div>
          <nav aria-label="Footer studio links">
            <h3 data-editable-path="footer.companyTitle" data-editable-type="text">{content.footer.companyTitle}</h3>
            {companyLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.companyLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.companyLinks.${index}.href`}>{link.label}</a>)}
          </nav>
          <div>
            <h3 data-editable-path="footer.hoursTitle" data-editable-type="text">{content.footer.hoursTitle}</h3>
            {content.footer.hours.map((item, index) => <span key={`${item}-${index}`} data-editable-path={`footer.hours.${index}`} data-editable-type="text">{item}</span>)}
          </div>
          <nav aria-label="Social links">
            <h3 data-editable-path="footer.socialTitle" data-editable-type="text">{content.footer.socialTitle}</h3>
            {socialLinks.map((link, index) => <a key={link.label} href={link.href} data-editable-path={`footer.socialLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.socialLinks.${index}.href`}>{link.label}</a>)}
          </nav>
        </div>
        <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright.replace("2026", String(year))}</small>
      </footer>
    </main>
  );
}
