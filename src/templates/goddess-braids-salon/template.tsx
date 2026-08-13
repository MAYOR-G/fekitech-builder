"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { Handbag, LockKey, UserCircle } from "@phosphor-icons/react";
import React from "react";
import editableData from "./editable.json";
import "./styles.css";

type GoddessData = typeof editableData;

export default function GoddessBraidsSalonTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as GoddessData;

  return (
    <div data-template-id="goddess-braids-salon" className="goddess-braids-salon">
      <Header content={content} />
      <main id="home">
        <Hero content={content} />
        <About content={content} />
        <FeaturedService content={content} />
        <InstagramGallery content={content} />
        <Testimonials content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}

function Header({ content }: { content: GoddessData }) {
  return (
    <header className="gbs-header">
      <a className="gbs-logo" href="#home" aria-label={`${content.brand.name} home`} data-editable-path="brand.mark" data-editable-type="text">
        <span>{content.brand.mark}</span>
      </a>
      <nav aria-label="Main navigation">
        {content.header.nav.map((link, index) => (
          <a key={link.label} href={link.href} data-editable-path={`header.nav.${index}.label`} data-editable-type="link" data-editable-href-path={`header.nav.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <div className="gbs-header-actions">
        <a href={content.header.loginHref} data-editable-path="header.loginLabel" data-editable-type="link" data-editable-href-path="header.loginHref">{content.header.loginLabel}</a>
        <UserCircle aria-hidden="true" />
        <LockKey aria-hidden="true" />
        <a href={content.header.basketHref} aria-label={content.header.basketLabel} data-editable-path="header.basketLabel" data-editable-type="link" data-editable-href-path="header.basketHref"><Handbag aria-hidden="true" /></a>
      </div>
    </header>
  );
}

function Hero({ content }: { content: GoddessData }) {
  return (
    <section className="gbs-hero">
      <div className="gbs-hero-copy">
        <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
        <a href={content.hero.buttonHref} data-editable-path="hero.buttonLabel" data-editable-type="link" data-editable-href-path="hero.buttonHref">{content.hero.buttonLabel}</a>
      </div>
      <div className="gbs-hero-line" aria-hidden="true" />
      <p data-editable-path="hero.tagline" data-editable-type="text">{content.hero.tagline}</p>
      <div className="gbs-purple-disc" aria-hidden="true" />
      <TemplateImage className="gbs-hero-person" src={content.hero.image} alt={content.hero.imageAlt} width={686} height={1200} priority loading="eager" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
    </section>
  );
}

function About({ content }: { content: GoddessData }) {
  return (
    <section className="gbs-about" id="about">
      <div className="gbs-about-copy">
        <h2 data-editable-path="about.title" data-editable-type="text">{content.about.title}</h2>
        <p data-editable-path="about.body" data-editable-type="text">{content.about.body}</p>
        <a href={content.about.buttonHref} data-editable-path="about.buttonLabel" data-editable-type="link" data-editable-href-path="about.buttonHref">{content.about.buttonLabel}</a>
      </div>
      <TemplateImage src={content.about.image} alt={content.about.imageAlt} width={900} height={1100} loading="lazy" data-editable-path="about.image" data-editable-type="image" data-editable-alt-path="about.imageAlt" />
    </section>
  );
}

function FeaturedService({ content }: { content: GoddessData }) {
  return (
    <section className="gbs-service" id="services">
      <TemplateImage src={content.featuredService.image} alt={content.featuredService.imageAlt} width={1200} height={900} loading="lazy" data-editable-path="featuredService.image" data-editable-type="image" data-editable-alt-path="featuredService.imageAlt" />
      <div>
        <h2 data-editable-path="featuredService.title" data-editable-type="text">{content.featuredService.title}</h2>
        <p data-editable-path="featuredService.body" data-editable-type="text">{content.featuredService.body}</p>
        <dl>
          <div><dt data-editable-path="featuredService.duration" data-editable-type="text">{content.featuredService.duration}</dt></div>
          <div><dt data-editable-path="featuredService.price" data-editable-type="text">{content.featuredService.price}</dt></div>
        </dl>
        <a href={content.featuredService.buttonHref} data-editable-path="featuredService.buttonLabel" data-editable-type="link" data-editable-href-path="featuredService.buttonHref">{content.featuredService.buttonLabel}</a>
      </div>
    </section>
  );
}

function InstagramGallery({ content }: { content: GoddessData }) {
  return (
    <section className="gbs-insta" id="insta">
      <div className="gbs-insta-heading">
        <h2 data-editable-path="instagram.title" data-editable-type="text">{content.instagram.title}</h2>
        <p data-editable-path="instagram.handle" data-editable-type="text">{content.instagram.handle}</p>
      </div>
      <div className="gbs-insta-grid">
        {content.instagram.gallery.map((item, index) => (
          <figure key={item.title}>
            <TemplateImage src={item.image} alt={item.alt} width={900} height={900} loading="lazy" data-editable-path={`instagram.gallery.${index}.image`} data-editable-type="image" data-editable-alt-path={`instagram.gallery.${index}.alt`} />
            <figcaption data-editable-path={`instagram.gallery.${index}.title`} data-editable-type="text">{item.title}</figcaption>
          </figure>
        ))}
      </div>
      <a className="gbs-load" href={content.instagram.buttonHref} data-editable-path="instagram.buttonLabel" data-editable-type="link" data-editable-href-path="instagram.buttonHref">{content.instagram.buttonLabel}</a>
    </section>
  );
}

function Testimonials({ content }: { content: GoddessData }) {
  return (
    <section className="gbs-testimonials">
      <h2 data-editable-path="testimonials.title" data-editable-type="text">{content.testimonials.title}</h2>
      <div>
        {content.testimonials.items.map((item, index) => (
          <figure key={item.name}>
            <figcaption data-editable-path={`testimonials.items.${index}.name`} data-editable-type="text">{item.name}</figcaption>
            <blockquote data-editable-path={`testimonials.items.${index}.quote`} data-editable-type="text">{item.quote}</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Contact({ content }: { content: GoddessData }) {
  return (
    <section className="gbs-contact" id="contact">
      <form>
        <span data-editable-path="contact.formAccent" data-editable-type="text">{content.contact.formAccent}</span>
        <div className="gbs-form-grid">
          <label><b data-editable-path="contact.firstNameLabel" data-editable-type="text">{content.contact.firstNameLabel}</b><input type="text" /></label>
          <label><b data-editable-path="contact.lastNameLabel" data-editable-type="text">{content.contact.lastNameLabel}</b><input type="text" /></label>
          <label><b data-editable-path="contact.emailLabel" data-editable-type="text">{content.contact.emailLabel}</b><input type="email" /></label>
          <label><b data-editable-path="contact.phoneLabel" data-editable-type="text">{content.contact.phoneLabel}</b><input type="tel" /></label>
          <label className="gbs-message"><b data-editable-path="contact.messageLabel" data-editable-type="text">{content.contact.messageLabel}</b><textarea rows={4} /></label>
        </div>
        <button type="button" data-editable-path="contact.buttonLabel" data-editable-type="text">{content.contact.buttonLabel}</button>
      </form>
      <aside>
        <div>
          <h2 data-editable-path="contact.hoursTitle" data-editable-type="text">{content.contact.hoursTitle}</h2>
          <p data-editable-path="contact.hours" data-editable-type="text">{content.contact.hours}</p>
        </div>
        <div>
          <h2 data-editable-path="contact.phoneTitle" data-editable-type="text">{content.contact.phoneTitle}</h2>
          <p data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</p>
        </div>
      </aside>
    </section>
  );
}

function Footer({ content }: { content: GoddessData }) {
  return (
    <footer className="gbs-footer">
      <div className="gbs-newsletter">
        <label><b data-editable-path="newsletter.emailLabel" data-editable-type="text">{content.newsletter.emailLabel}</b><input type="email" /></label>
        <label className="gbs-check"><input type="checkbox" /><span data-editable-path="newsletter.checkboxLabel" data-editable-type="text">{content.newsletter.checkboxLabel}</span></label>
        <button type="button" data-editable-path="newsletter.buttonLabel" data-editable-type="text">{content.newsletter.buttonLabel}</button>
      </div>
      <div className="gbs-footer-row">
        <p><b>Email:</b> <span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span></p>
        <p><b>Phone:</b> <span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span></p>
        <p><b>Salon:</b> <span data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</span></p>
      </div>
      <nav aria-label="Social links">
        {content.footer.social.map((link, index) => (
          <a key={link.label} href={link.href} data-editable-path={`footer.social.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.social.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <small data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</small>
    </footer>
  );
}
