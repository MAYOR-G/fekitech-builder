"use client";

import { useState } from "react";
import { ArrowRight, List, MapPin, Phone, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type LumaData = typeof editableData;

export default function PizzaLightCleanTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as LumaData;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="ls-site">
      <header className="ls-header">
        <a className="ls-logo" href="#" aria-label={`${content.brand.name} home`}>
          <span>L</span>{content.brand.name}
        </a>
        <nav className={menuOpen ? "ls-nav is-open" : "ls-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <a className="ls-order" href={content.navigation.ctaHref}>{content.navigation.ctaLabel}<ArrowRight aria-hidden="true" /></a>
        <button
          className="ls-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </header>

      <section className="ls-hero">
        <div className="ls-hero-title">
          <p>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
        </div>
        <div className="ls-pizza-frame">
          <span aria-hidden="true">LUMA</span>
          <TemplateImage
            src={content.hero.image}
            alt={content.hero.imageAlt}
            width={1536}
            height={1024}
            loading="eager"
            priority
          />
        </div>
        <div className="ls-hero-note">
          <p>{content.hero.description}</p>
          <a href={content.hero.primaryHref}>{content.hero.primaryLabel}<ArrowRight aria-hidden="true" /></a>
          <a href={content.hero.secondaryHref}>{content.hero.secondaryLabel}</a>
        </div>
      </section>

      <section className="ls-signature">
        <div className="ls-signature-image">
          <TemplateImage src={content.signature.image} alt={content.signature.imageAlt} width={1200} height={1000} />
        </div>
        <div className="ls-signature-copy">
          <p>{content.signature.eyebrow}</p>
          <h2>{content.signature.title}</h2>
          <strong>{content.signature.price}</strong>
          <span>{content.signature.description}</span>
          <a href={content.signature.buttonHref}>{content.signature.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="ls-menu-board" id="menu">
        <div className="ls-menu-board-title">
          <h2>{content.menu.title}</h2>
          <p>{content.menu.description}</p>
        </div>
        <div className="ls-menu-board-grid">
          {content.menu.categories.map((category) => (
            <section key={category.name}>
              <h3>{category.name}</h3>
              {category.items.map((item) => (
                <article key={item.name}>
                  <div><strong>{item.name}</strong><p>{item.description}</p></div>
                  <b>{item.price}</b>
                </article>
              ))}
            </section>
          ))}
        </div>
      </section>

      <section className="ls-gallery" id="gallery">
        <div className="ls-gallery-main">
          <TemplateImage src={content.gallery.images[0].image} alt={content.gallery.images[0].imageAlt} width={1400} height={1000} />
          <div><h2>{content.gallery.title}</h2><p>{content.gallery.description}</p></div>
        </div>
        <div className="ls-gallery-side">
          {content.gallery.images.slice(1, 4).map((item, index) => (
            <TemplateImage key={`${item.image}-${index}`} src={item.image} alt={item.imageAlt} width={900} height={900} />
          ))}
        </div>
      </section>

      <section className="ls-story" id="story">
        <div className="ls-story-copy">
          <p>{content.story.eyebrow}</p>
          <h2>{content.story.title}</h2>
          <span>{content.story.description}</span>
          <a href={content.story.buttonHref}>{content.story.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
        <TemplateImage src={content.story.image} alt={content.story.imageAlt} width={1400} height={1000} />
      </section>

      <section className="ls-reviews">
        <h2>{content.reviews.title}</h2>
        <div>
          {content.reviews.items.map((review) => (
            <blockquote key={review.name}>
              <p>“{review.quote}”</p>
              <div className="ls-review-author"><strong>{review.name}</strong><span>{review.detail}</span></div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="ls-contact" id="contact">
        <div>
          <h2>{content.contact.title}</h2>
          <p>{content.contact.description}</p>
          <a href={content.contact.primaryHref}>{content.contact.primaryLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="ls-contact-list">
          <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{content.brand.phone}</a>
          <p><MapPin aria-hidden="true" />{content.brand.address}</p>
          {content.contact.hours.map((item) => <p key={item.day}><span>{item.day}</span><strong>{item.time}</strong></p>)}
        </div>
      </section>

      <footer className="ls-footer">
        <div className="ls-footer-brand">
          <a className="ls-logo" href="#"><span>L</span>{content.brand.name}</a>
          <p>{content.footer.note}</p>
          <a href={content.contact.primaryHref}>{content.contact.primaryLabel}<ArrowRight aria-hidden="true" /></a>
        </div>

        <div className="ls-footer-column">
          <h3>Explore</h3>
          {content.navigation.links.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div className="ls-footer-column">
          <h3>Menu</h3>
          {content.menu.categories.slice(0, 3).map((category) => (
            <a key={category.name} href="#menu">{category.name}</a>
          ))}
        </div>

        <div className="ls-footer-column">
          <h3>Visit</h3>
          <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}>{content.brand.phone}</a>
          <a href={`mailto:${content.brand.email}`}>{content.brand.email}</a>
          <p>{content.brand.address}</p>
        </div>

        <div className="ls-footer-hours">
          <h3>Hours</h3>
          {content.contact.hours.map((item) => (
            <p key={item.day}><span>{item.day}</span><strong>{item.time}</strong></p>
          ))}
        </div>

        <div className="ls-footer-bottom">
          <small>{content.footer.copyright}</small>
          <div>
            <a href={content.social.instagramHref}>{content.social.instagram}</a>
            <a href={content.social.facebookHref}>{content.social.facebook}</a>
            <a href={content.social.tiktokHref}>{content.social.tiktok}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
