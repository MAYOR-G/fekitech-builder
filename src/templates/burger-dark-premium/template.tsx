"use client";

import { useState } from "react";
import { ArrowRight, ArrowUpRight, List, MapPin, Phone, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type BurgerData = typeof editableData;

export default function BurgerDarkPremiumTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as BurgerData;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="ebb-site">
      <header className="ebb-header">
        <a className="ebb-brand" href="#" aria-label={`${content.brand.name} home`}>
          <span className="ebb-mark">E/B</span>
          <span>{content.brand.name}</span>
        </a>
        <nav className={menuOpen ? "ebb-nav is-open" : "ebb-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <a className="ebb-order ebb-order--header" href={content.navigation.ctaHref}>
          {content.navigation.ctaLabel}<ArrowUpRight aria-hidden="true" weight="bold" />
        </a>
        <button
          className="ebb-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </header>

      <section className="ebb-hero">
        <div className="ebb-hero-copy">
          <p className="ebb-kicker">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p className="ebb-intro">{content.hero.description}</p>
          <div className="ebb-actions">
            <a className="ebb-order" href={content.hero.primaryHref}>
              {content.hero.primaryLabel}<ArrowRight aria-hidden="true" weight="bold" />
            </a>
            <a className="ebb-text-link" href={content.hero.secondaryHref}>{content.hero.secondaryLabel}</a>
          </div>
        </div>
        <div className="ebb-product-stage">
          <span className="ebb-fire-disc" aria-hidden="true" />
          <TemplateImage
            className="ebb-hero-burger"
            src={content.hero.image}
            alt={content.hero.imageAlt}
            width={1536}
            height={1024}
            loading="eager"
            priority
          />
          <div className="ebb-price-note"><span>{content.signature.title}</span><strong>{content.signature.price}</strong></div>
          <div className="ebb-stage-caption"><span>{content.hero.badgeValue}</span>{content.hero.badgeLabel}</div>
        </div>
      </section>

      <section className="ebb-feature" id="story">
        <div className="ebb-feature-image">
          <TemplateImage src={content.signature.image} alt={content.signature.imageAlt} width={900} height={1100} />
        </div>
        <div className="ebb-feature-copy">
          <p>{content.signature.eyebrow}</p>
          <h2>{content.signature.title}</h2>
          <strong>{content.signature.price}</strong>
          <span>{content.signature.description}</span>
          <a href={content.signature.buttonHref}>{content.signature.buttonLabel}<ArrowUpRight aria-hidden="true" weight="bold" /></a>
        </div>
      </section>

      <section className="ebb-menu-section" id="menu">
        <div className="ebb-section-heading">
          <h2>{content.dishes.title}</h2>
          <p>{content.dishes.description}</p>
        </div>
        <div className="ebb-dish-track" aria-label="Featured menu">
          {content.dishes.items.map((dish, index) => (
            <article className="ebb-dish" key={dish.name}>
              <div className="ebb-dish-image">
                <TemplateImage src={dish.image} alt={dish.imageAlt} width={900} height={1100} />
              </div>
              <div className="ebb-dish-title">
                <span>{String(index + 1).padStart(2, "0")}</span><h3>{dish.name}</h3><strong>{dish.price}</strong>
              </div>
              <p>{dish.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ebb-ledger">
        <div className="ebb-ledger-intro">
          <h2>{content.menu.title}</h2>
          <p>{content.menu.description}</p>
        </div>
        <div className="ebb-ledger-groups">
          {content.menu.categories.map((category) => (
            <section key={category.name}>
              <h3>{category.name}</h3>
              {category.items.map((item) => (
                <div className="ebb-ledger-row" key={item.name}>
                  <div><strong>{item.name}</strong><span>{item.description}</span></div>
                  <b>{item.price}</b>
                </div>
              ))}
            </section>
          ))}
        </div>
      </section>

      <section className="ebb-room" id="gallery">
        <TemplateImage src={content.story.image} alt={content.story.imageAlt} width={1600} height={1000} />
        <div className="ebb-room-copy">
          <p>{content.story.eyebrow}</p><h2>{content.story.title}</h2><span>{content.story.description}</span>
        </div>
      </section>

      <section className="ebb-reviews">
        <h2>{content.reviews.title}</h2>
        <div>
          {content.reviews.items.map((review) => (
            <blockquote key={review.name}>
              <p>“{review.quote}”</p>
              <footer><strong>{review.name}</strong><span>{review.detail}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="ebb-contact" id="contact">
        <div>
          <h2>{content.contact.title}</h2>
          <p>{content.contact.description}</p>
          <div className="ebb-actions">
            <a className="ebb-order" href={content.contact.primaryHref}>{content.contact.primaryLabel}</a>
            <a className="ebb-text-link" href={content.contact.secondaryHref}>{content.contact.secondaryLabel}</a>
          </div>
        </div>
        <div className="ebb-contact-details">
          <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{content.brand.phone}</a>
          <p><MapPin aria-hidden="true" />{content.brand.address}</p>
          {content.contact.hours.map((item) => <p key={item.day}><span>{item.day}</span><strong>{item.time}</strong></p>)}
        </div>
      </section>

      <footer className="ebb-footer">
        <div className="ebb-brand"><span className="ebb-mark">E/B</span><span>{content.brand.name}</span></div>
        <p>{content.footer.note}</p>
        <div>
          <a href={content.social.instagramHref}>{content.social.instagram}</a>
          <a href={content.social.facebookHref}>{content.social.facebook}</a>
          <a href={content.social.tiktokHref}>{content.social.tiktok}</a>
        </div>
        <small>{content.footer.copyright}</small>
      </footer>
    </main>
  );
}
