"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { ArrowRight, CalendarBlank, ForkKnife, List, Star, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type JumamiData = typeof defaults;
type LinkItem = { label: string; href: string };
type ImageItem = { src: string; alt: string };
type MenuItem = { name: string; price: string };
type Dish = { name: string; body: string; image: string; imageAlt: string; tag: string };
type EventItem = { date: string; month: string; title: string; body: string; buttonLabel: string; href: string; image: string; imageAlt: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function cssVars(data: JumamiData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--jst-page": data.colors.page,
    "--jst-ink": data.colors.ink,
    "--jst-muted": data.colors.muted,
    "--jst-red": data.colors.red,
    "--jst-green": data.colors.green,
    "--jst-yellow": data.colors.yellow,
    "--jst-cream": data.colors.cream,
    "--jst-white": data.colors.white,
    "--jst-footer": data.colors.footer,
    "--jst-display": data.typography.displayFont,
    "--jst-body": data.typography.bodyFont,
  };
}

export default function JumamiStreetFoodTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as JumamiData;
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const introImages = asArray<ImageItem>(content.intro.images);
  const menuItems = asArray<MenuItem>(content.specials.items);
  const dishes = asArray<Dish>(content.dishes.items);
  const moments = asArray<ImageItem>(content.moments.items);
  const events = asArray<EventItem>(content.events.items);
  const fields = asArray<string>(content.booking.fields);
  const marquee = asArray<string>(content.marquee.items);
  const companyLinks = asArray<LinkItem>(content.footer.companyLinks);
  const socialLinks = asArray<LinkItem>(content.footer.socialLinks);
  const legalLinks = asArray<LinkItem>(content.footer.legalLinks);

  return (
    <main id="home" data-template-id="jumami-street-food" className="jumami-street-food" style={cssVars(content)}>
      <header className="jst-header">
        <a className="jst-logo" href="#home" aria-label={content.brand.name}>
          <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
        </a>
        <button className="jst-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={19} weight="bold" /> : <List size={19} weight="bold" />}
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          {navLinks.map((link, index) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} data-editable-path={`navigation.links.${index}.label`} data-editable-type="link" data-editable-href-path={`navigation.links.${index}.href`}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="jst-pill jst-nav-cta" href={content.navigation.ctaHref} data-editable-path="navigation.ctaLabel" data-editable-type="link" data-editable-href-path="navigation.ctaHref">
          {content.navigation.ctaLabel}
          <ArrowRight size={14} weight="bold" />
        </a>
      </header>

      <section className="jst-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="jst-hero-shade" />
        <div className="jst-hero-copy">
          <span className="jst-rating" data-editable-path="hero.rating" data-editable-type="text"><Star size={15} weight="fill" />{content.hero.rating}</span>
          <p data-editable-path="hero.eyebrow" data-editable-type="text">{content.hero.eyebrow}</p>
          <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <small data-editable-path="hero.subtitle" data-editable-type="text">{content.hero.subtitle}</small>
          <a className="jst-pill" href={content.hero.button.href} data-editable-path="hero.button.label" data-editable-type="link" data-editable-href-path="hero.button.href">
            {content.hero.button.label}
            <ArrowRight size={15} weight="bold" />
          </a>
        </div>
      </section>

      <section id="about" className="jst-intro jst-scallop-top">
        <div className="jst-section-heading">
          <h2 data-editable-path="intro.title" data-editable-type="text">{content.intro.title}</h2>
          <p data-editable-path="intro.body" data-editable-type="text">{content.intro.body}</p>
          <strong data-editable-path="intro.hours" data-editable-type="text">{content.intro.hours}</strong>
          <a className="jst-pill" href={content.intro.button.href} data-editable-path="intro.button.label" data-editable-type="link" data-editable-href-path="intro.button.href">
            {content.intro.button.label}
            <ArrowRight size={15} weight="bold" />
          </a>
        </div>
        <div className="jst-circle-row">
          {introImages.map((image, index) => (
            <img key={image.src} src={image.src} alt={image.alt} data-editable-path={`intro.images.${index}.src`} data-editable-type="image" data-editable-alt-path={`intro.images.${index}.alt`} />
          ))}
        </div>
      </section>

      <section id="menu" className="jst-specials jst-scallop-top">
        <h2 data-editable-path="specials.title" data-editable-type="text">{content.specials.title}</h2>
        <div className="jst-special-card">
          <img src={content.specials.image} alt={content.specials.imageAlt} data-editable-path="specials.image" data-editable-type="image" data-editable-alt-path="specials.imageAlt" />
          <div className="jst-menu-board">
            <h3 data-editable-path="specials.panelTitle" data-editable-type="text">{content.specials.panelTitle}</h3>
            {menuItems.map((item, index) => (
              <div key={item.name}>
                <span data-editable-path={`specials.items.${index}.name`} data-editable-type="text">{item.name}</span>
                <strong data-editable-path={`specials.items.${index}.price`} data-editable-type="text">{item.price}</strong>
              </div>
            ))}
            <a className="jst-pill" href={content.specials.button.href} data-editable-path="specials.button.label" data-editable-type="link" data-editable-href-path="specials.button.href">
              {content.specials.button.label}
              <ArrowRight size={15} weight="bold" />
            </a>
          </div>
        </div>
      </section>

      <section className="jst-dishes jst-scallop-top">
        <h2 data-editable-path="dishes.title" data-editable-type="text">{content.dishes.title}</h2>
        <div className="jst-dish-grid">
          {dishes.map((dish, index) => (
            <article key={dish.name}>
              <div>
                <img src={dish.image} alt={dish.imageAlt} loading="lazy" data-editable-path={`dishes.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`dishes.items.${index}.imageAlt`} />
                <span data-editable-path={`dishes.items.${index}.tag`} data-editable-type="text">{dish.tag}</span>
              </div>
              <h3 data-editable-path={`dishes.items.${index}.name`} data-editable-type="text">{dish.name}</h3>
              <p data-editable-path={`dishes.items.${index}.body`} data-editable-type="text">{dish.body}</p>
              <a className="jst-pill" href="#booking" data-editable-path="dishes.buttonLabel" data-editable-type="link" data-editable-href-path="navigation.ctaHref">
                {content.dishes.buttonLabel}
                <ArrowRight size={14} weight="bold" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="jst-testimonial jst-scallop-top">
        <img src={content.testimonial.image} alt={content.testimonial.imageAlt} loading="lazy" data-editable-path="testimonial.image" data-editable-type="image" data-editable-alt-path="testimonial.imageAlt" />
        <div className="jst-testimonial-shade" />
        <h2 data-editable-path="testimonial.title" data-editable-type="text">{content.testimonial.title}</h2>
        <blockquote>
          <p data-editable-path="testimonial.quote" data-editable-type="text">{content.testimonial.quote}</p>
          <footer>
            <strong data-editable-path="testimonial.name" data-editable-type="text">{content.testimonial.name}</strong>
            <span data-editable-path="testimonial.role" data-editable-type="text">{content.testimonial.role}</span>
          </footer>
        </blockquote>
      </section>

      <section className="jst-moments jst-scallop-top">
        <h2 data-editable-path="moments.title" data-editable-type="text">{content.moments.title}</h2>
        <div className="jst-moment-strip">
          {moments.map((image, index) => (
            <img key={image.src} src={image.src} alt={image.alt} loading="lazy" data-editable-path={`moments.items.${index}.src`} data-editable-type="image" data-editable-alt-path={`moments.items.${index}.alt`} />
          ))}
        </div>
      </section>

      <section id="events" className="jst-events jst-scallop-top">
        <h2 data-editable-path="events.title" data-editable-type="text">{content.events.title}</h2>
        <div className="jst-event-list">
          {events.map((event, index) => (
            <article key={event.title}>
              <div className="jst-date">
                <strong data-editable-path={`events.items.${index}.date`} data-editable-type="text">{event.date}</strong>
                <span data-editable-path={`events.items.${index}.month`} data-editable-type="text">{event.month}</span>
              </div>
              <div>
                <h3 data-editable-path={`events.items.${index}.title`} data-editable-type="text">{event.title}</h3>
                <p data-editable-path={`events.items.${index}.body`} data-editable-type="text">{event.body}</p>
                <a className="jst-pill" href={event.href} data-editable-path={`events.items.${index}.buttonLabel`} data-editable-type="link" data-editable-href-path={`events.items.${index}.href`}>
                  {event.buttonLabel}
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
              <img src={event.image} alt={event.imageAlt} loading="lazy" data-editable-path={`events.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`events.items.${index}.imageAlt`} />
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="jst-booking jst-scallop-top">
        <h2 data-editable-path="booking.title" data-editable-type="text">{content.booking.title}</h2>
        <div className="jst-booking-card">
          <img src={content.booking.image} alt={content.booking.imageAlt} loading="lazy" data-editable-path="booking.image" data-editable-type="image" data-editable-alt-path="booking.imageAlt" />
          <form onSubmit={(event) => event.preventDefault()}>
            {fields.map((field, index) => (
              <label key={field}>
                <span data-editable-path={`booking.fields.${index}`} data-editable-type="text">{field}</span>
                <input type={field.toLowerCase().includes("date") ? "date" : field.toLowerCase().includes("time") ? "time" : "text"} />
              </label>
            ))}
            <button type="submit">
              <CalendarBlank size={16} weight="bold" />
              <span data-editable-path="booking.buttonLabel" data-editable-type="text">{content.booking.buttonLabel}</span>
            </button>
          </form>
        </div>
      </section>

      <section className="jst-marquee" aria-label="Food categories">
        <div>
          {[...marquee, ...marquee].map((item, index) => (
            <span key={`${item}-${index}`} data-editable-path={`marquee.items.${index % Math.max(marquee.length, 1)}`} data-editable-type="text">
              <ForkKnife size={24} weight="fill" />
              {item}
            </span>
          ))}
        </div>
      </section>

      <footer id="contact" className="jst-footer">
        <div className="jst-footer-grid">
          <div>
            <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
            <p data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</p>
            <a href={content.brand.emailHref} data-editable-path="brand.email" data-editable-type="link" data-editable-href-path="brand.emailHref">{content.brand.email}</a>
            <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`} data-editable-path="brand.phone" data-editable-type="link">{content.brand.phone}</a>
          </div>
          <nav aria-label="Company links">
            <h3 data-editable-path="footer.companyTitle" data-editable-type="text">{content.footer.companyTitle}</h3>
            {companyLinks.map((link, index) => (
              <a key={link.label} href={link.href} data-editable-path={`footer.companyLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.companyLinks.${index}.href`}>{link.label}</a>
            ))}
          </nav>
          <div>
            <h3 data-editable-path="footer.hoursTitle" data-editable-type="text">{content.footer.hoursTitle}</h3>
            {content.footer.hours.map((item, index) => (
              <span key={item} data-editable-path={`footer.hours.${index}`} data-editable-type="text">{item}</span>
            ))}
          </div>
          <nav aria-label="Social links">
            <h3 data-editable-path="footer.socialTitle" data-editable-type="text">{content.footer.socialTitle}</h3>
            {socialLinks.map((link, index) => (
              <a key={link.label} href={link.href} data-editable-path={`footer.socialLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.socialLinks.${index}.href`}>{link.label}</a>
            ))}
          </nav>
          <form onSubmit={(event) => event.preventDefault()}>
            <h3 data-editable-path="footer.newsletterTitle" data-editable-type="text">{content.footer.newsletterTitle}</h3>
            <label>
              <span data-editable-path="footer.newsletterPlaceholder" data-editable-type="text">{content.footer.newsletterPlaceholder}</span>
              <input type="email" />
            </label>
            <button type="submit" data-editable-path="footer.newsletterButton" data-editable-type="text">{content.footer.newsletterButton}</button>
          </form>
        </div>
        <div className="jst-footer-brand" aria-hidden="true">{content.brand.name.toUpperCase()}</div>
        <div className="jst-footer-bottom">
          <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright.replace("2026", String(year))}</small>
          <nav aria-label="Legal links">
            {legalLinks.map((link, index) => (
              <a key={link.label} href={link.href} data-editable-path={`footer.legalLinks.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.legalLinks.${index}.href`}>{link.label}</a>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
