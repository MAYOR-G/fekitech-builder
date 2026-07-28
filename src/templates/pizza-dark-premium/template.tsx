"use client";

import { useState } from "react";
import { ArrowDown, ArrowRight, List, MapPin, Phone, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type FornoData = typeof editableData;

export default function PizzaDarkPremiumTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as FornoData;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="fn-site">
      <header className="fn-header">
        <a className="fn-logo" href="#" aria-label={`${content.brand.name} home`}>
          <span>FN</span>{content.brand.name}
        </a>
        <nav className={menuOpen ? "fn-nav is-open" : "fn-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <a className="fn-reserve" href={content.navigation.ctaHref}>{content.navigation.ctaLabel}</a>
        <button
          className="fn-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </header>

      <section className="fn-hero">
        <TemplateImage
          className="fn-hero-bg"
          src={content.story.secondaryImage}
          alt={content.story.secondaryImageAlt}
          width={1800}
          height={1200}
          loading="eager"
          priority
        />
        <div className="fn-hero-wash" aria-hidden="true" />
        <div className="fn-hero-copy">
          <p>{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <span>{content.hero.description}</span>
          <div>
            <a href={content.hero.primaryHref}>{content.hero.primaryLabel}<ArrowRight aria-hidden="true" /></a>
            <a href={content.hero.secondaryHref}>{content.hero.secondaryLabel}</a>
          </div>
        </div>
        <TemplateImage
          className="fn-hero-pizza"
          src={content.hero.image}
          alt={content.hero.imageAlt}
          width={1536}
          height={1024}
          loading="eager"
          priority
        />
        <a className="fn-menu-jump" href="#menu"><ArrowDown aria-hidden="true" />Menu</a>
      </section>

      <section className="fn-signature" id="story">
        <div className="fn-signature-title">
          <p>{content.signature.eyebrow}</p>
          <h2>{content.signature.title}</h2>
        </div>
        <div className="fn-signature-copy">
          <strong>{content.signature.price}</strong>
          <p>{content.signature.description}</p>
          <a href={content.signature.buttonHref}>{content.signature.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="fn-menu" id="menu">
        <div className="fn-menu-heading">
          <h2>{content.menu.title}</h2>
          <p>{content.menu.description}</p>
        </div>
        <div className="fn-menu-columns">
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

      <section className="fn-gallery" id="gallery">
        <div className="fn-gallery-heading">
          <h2>{content.gallery.title}</h2>
          <p>{content.gallery.description}</p>
        </div>
        <div className="fn-gallery-track">
          {content.gallery.images.slice(0, 3).map((item, index) => (
            <figure key={`${item.image}-${index}`}>
              <TemplateImage src={item.image} alt={item.imageAlt} width={1200} height={1500} />
              <figcaption>{index === 0 ? "The oven" : index === 1 ? "The table" : "The craft"}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="fn-maker">
        <div className="fn-maker-image">
          <TemplateImage src={content.story.image} alt={content.story.imageAlt} width={1200} height={1200} />
        </div>
        <div className="fn-maker-copy">
          <p>{content.story.eyebrow}</p>
          <h2>{content.story.title}</h2>
          <span>{content.story.description}</span>
          <a href={content.story.buttonHref}>{content.story.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="fn-quote">
        <p>“{content.reviews.items[0].quote}”</p>
        <div><strong>{content.reviews.items[0].name}</strong><span>{content.reviews.items[0].detail}</span></div>
      </section>

      <section className="fn-contact" id="contact">
        <div className="fn-contact-copy">
          <h2>{content.contact.title}</h2>
          <p>{content.contact.description}</p>
          <a href={content.contact.primaryHref}>{content.contact.primaryLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="fn-contact-meta">
          <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{content.brand.phone}</a>
          <p><MapPin aria-hidden="true" />{content.brand.address}</p>
          <div>
            {content.contact.hours.map((item) => <p key={item.day}><span>{item.day}</span><strong>{item.time}</strong></p>)}
          </div>
        </div>
      </section>

      <footer className="fn-footer">
        <a className="fn-logo" href="#"><span>FN</span>{content.brand.name}</a>
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
