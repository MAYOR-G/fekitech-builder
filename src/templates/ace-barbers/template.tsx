"use client";

import { useState, type CSSProperties } from "react";
import { CaretRight, List, Scissors, Star, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type AceData = typeof defaults;
type LinkItem = { label: string; href: string };
type ServiceItem = { title: string; body: string; price: string };
type GalleryImage = { src: string; alt: string };
type Testimonial = { quote: string; name: string };
type TeamMember = { name: string; role: string; image: string; imageAlt: string };
type StatItem = { value: string; label: string };
type BookingStep = { label: string; value: string };

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function cssVars(data: AceData): CSSProperties & Record<`--${string}`, string> {
  return {
    "--ace-page": data.colors.page,
    "--ace-panel": data.colors.panel,
    "--ace-card": data.colors.card,
    "--ace-text": data.colors.text,
    "--ace-muted": data.colors.muted,
    "--ace-line": data.colors.line,
    "--ace-accent": data.colors.accent,
    "--ace-button": data.colors.button,
    "--ace-heading": data.typography.headingFont,
    "--ace-body": data.typography.bodyFont,
  };
}

export default function AceBarbersTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as AceData;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = asArray<LinkItem>(content.navigation.links);
  const services = asArray<ServiceItem>(content.services.items);
  const gallery = asArray<GalleryImage>(content.gallery.images);
  const testimonials = asArray<Testimonial>(content.testimonials.items);
  const team = asArray<TeamMember>(content.team.members);
  const stats = asArray<StatItem>(content.stats.items);
  const steps = asArray<BookingStep>(content.booking.steps);
  const hours = asArray<string>(content.contact.hours);
  const footerLinks = asArray<LinkItem>(content.footer.links);

  return (
    <main id="home" data-template-id="ace-barbers" className="ace-barbers" style={cssVars(content)}>
      <header className="ace-header">
        <a className="ace-logo" href="#home" aria-label={content.brand.name}>
          <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
        </a>
        <button className="ace-menu" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={16} /> : <List size={16} />}
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <a href={content.navigation.button.href} data-editable-path="navigation.button.label" data-editable-type="link" data-editable-href-path="navigation.button.href" onClick={() => setMenuOpen(false)}>
            {content.navigation.button.label}
          </a>
          {navLinks.map((link, index) => (
            <a key={link.label} href={link.href} data-editable-path={`navigation.links.${index}.label`} data-editable-type="link" data-editable-href-path={`navigation.links.${index}.href`} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="ace-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="ace-hero-shade" />
        <div className="ace-hero-copy">
          <h1>
            <span data-editable-path="hero.titleLineOne" data-editable-type="text">{content.hero.titleLineOne}</span>
            <span data-editable-path="hero.titleLineTwo" data-editable-type="text">{content.hero.titleLineTwo}</span>
          </h1>
          <p data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</p>
        </div>
        <a className="ace-hero-book" href={content.hero.button.href} data-editable-path="hero.button.label" data-editable-type="link" data-editable-href-path="hero.button.href">
          {content.hero.button.label}
        </a>
      </section>

      <section id="services" className="ace-services">
        <h2 data-editable-path="services.title" data-editable-type="text">{content.services.title}</h2>
        <div className="ace-service-list">
          {services.map((service, index) => (
            <article key={service.title}>
              <span aria-hidden="true" />
              <div>
                <h3 data-editable-path={`services.items.${index}.title`} data-editable-type="text">{service.title}</h3>
                <p data-editable-path={`services.items.${index}.body`} data-editable-type="text">{service.body}</p>
              </div>
              <strong data-editable-path={`services.items.${index}.price`} data-editable-type="text">{service.price}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="ace-gallery">
        <h2 data-editable-path="gallery.title" data-editable-type="text">{content.gallery.title}</h2>
        <div>
          {gallery.map((image, index) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} data-editable-path={`gallery.images.${index}.src`} data-editable-type="image" data-editable-alt-path={`gallery.images.${index}.alt`} />
            </figure>
          ))}
        </div>
      </section>

      <section className="ace-testimonials">
        <div className="ace-section-row">
          <h2 data-editable-path="testimonials.title" data-editable-type="text">{content.testimonials.title}</h2>
          <div>
            <span>{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} weight="fill" />)}</span>
            <strong data-editable-path="testimonials.rating" data-editable-type="text">{content.testimonials.rating}</strong>
            <p data-editable-path="testimonials.ratingLabel" data-editable-type="text">{content.testimonials.ratingLabel}</p>
          </div>
        </div>
        <div className="ace-testimonial-track">
          {testimonials.map((item, index) => (
            <article key={item.name}>
              <p data-editable-path={`testimonials.items.${index}.quote`} data-editable-type="text">{item.quote}</p>
              <strong data-editable-path={`testimonials.items.${index}.name`} data-editable-type="text">{item.name}</strong>
              <span>{Array.from({ length: 5 }).map((_, star) => <Star key={star} size={11} weight="fill" />)}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="team" className="ace-team">
        <h2 data-editable-path="team.title" data-editable-type="text">{content.team.title}</h2>
        <div className="ace-team-grid">
          {team.map((member, index) => (
            <article key={member.name}>
              <img src={member.image} alt={member.imageAlt} data-editable-path={`team.members.${index}.image`} data-editable-type="image" data-editable-alt-path={`team.members.${index}.imageAlt`} />
              <div>
                <h3 data-editable-path={`team.members.${index}.name`} data-editable-type="text">{member.name}</h3>
                <p data-editable-path={`team.members.${index}.role`} data-editable-type="text">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ace-stats">
        <h2 data-editable-path="stats.title" data-editable-type="text">{content.stats.title}</h2>
        <div>
          {stats.map((stat, index) => (
            <article key={stat.label}>
              <strong data-editable-path={`stats.items.${index}.value`} data-editable-type="text">{stat.value}</strong>
              <span data-editable-path={`stats.items.${index}.label`} data-editable-type="text">{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="ace-booking">
        <h2 data-editable-path="booking.title" data-editable-type="text">{content.booking.title}</h2>
        <p data-editable-path="booking.body" data-editable-type="text">{content.booking.body}</p>
        <div className="ace-booking-panel">
          {steps.map((step, index) => (
            <label key={step.label}>
              <span data-editable-path={`booking.steps.${index}.label`} data-editable-type="text">{step.label}</span>
              <select defaultValue={step.value} aria-label={step.label}>
                <option data-editable-path={`booking.steps.${index}.value`} data-editable-type="text">{step.value}</option>
              </select>
            </label>
          ))}
          <div className="ace-booking-actions">
            <button type="button" data-editable-path="booking.backLabel" data-editable-type="text">{content.booking.backLabel}</button>
            <button type="button" data-editable-path="booking.nextLabel" data-editable-type="text">{content.booking.nextLabel}</button>
          </div>
        </div>
      </section>

      <section id="contact" className="ace-contact">
        <div className="ace-contact-lines">
          <p data-editable-path="contact.address" data-editable-type="text">{content.contact.address}</p>
          <a href={content.brand.phoneHref} data-editable-path="contact.phone" data-editable-type="link" data-editable-href-path="brand.phoneHref">{content.contact.phone}</a>
        </div>
        <div className="ace-about-card">
          <img src={content.contact.image} alt={content.contact.imageAlt} data-editable-path="contact.image" data-editable-type="image" data-editable-alt-path="contact.imageAlt" />
          <div>
            <h2 data-editable-path="contact.title" data-editable-type="text">{content.contact.title}</h2>
            <p data-editable-path="contact.body" data-editable-type="text">{content.contact.body}</p>
            <h3 data-editable-path="contact.hoursTitle" data-editable-type="text">{content.contact.hoursTitle}</h3>
            {hours.map((hour, index) => (
              <span key={hour} data-editable-path={`contact.hours.${index}`} data-editable-type="text">{hour}</span>
            ))}
          </div>
        </div>
      </section>

      <footer className="ace-footer">
        <img src={content.brand.logo} alt={content.brand.logoAlt} data-editable-path="brand.logo" data-editable-type="image" data-editable-alt-path="brand.logoAlt" />
        <nav aria-label="Footer navigation">
          {footerLinks.map((link, index) => (
            <a key={link.label} href={link.href} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="ace-back-top" href="#home" aria-label="Back to top">
          <Scissors size={18} weight="bold" />
          <CaretRight size={16} weight="bold" />
        </a>
        <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</small>
      </footer>
    </main>
  );
}
