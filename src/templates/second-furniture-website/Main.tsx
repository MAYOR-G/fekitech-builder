"use client";

import { useState } from "react";
import { ArrowRight, List, MapPin, Phone, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from "./TemplateContext";
import "./premium.css";

export default function Main() {
  const data = useTemplateData();
  const [activeRoom, setActiveRoom] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const room = data.rooms.items[activeRoom];

  return (
    <main className="chf-site">
      <header className="chf-header">
        <a className="chf-logo" href="#" aria-label={`${data.brand.name} home`}>
          <span>CH</span><strong>{data.brand.shortName}</strong>
        </a>
        <nav className={menuOpen ? "chf-nav is-open" : "chf-nav"} aria-label="Primary navigation">
          {data.navigation.links.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <a className="chf-consult" href={data.navigation.ctaHref}>{data.navigation.ctaLabel}</a>
        <button
          className="chf-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </header>

      <section className="chf-hero">
        <TemplateImage
          src={data.hero.image}
          alt={data.hero.imageAlt}
          width={1600}
          height={1400}
          loading="eager"
          priority
        />
        <div className="chf-hero-wash" aria-hidden="true" />
        <div className="chf-hero-copy">
          <p>{data.hero.eyebrow}</p>
          <h1>{data.hero.title}</h1>
          <span>{data.hero.subtitle}</span>
          <a href={data.hero.buttonHref}>{data.hero.button}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="chf-collections" id="collections">
        <div className="chf-section-head">
          <h2>{data.collections.title}</h2>
          <p>{data.collections.description}</p>
        </div>
        <div className="chf-collection-grid">
          {data.collections.items.map((item) => (
            <a href="#rooms" key={item.name}>
              <TemplateImage src={item.image} alt={item.imageAlt} width={1100} height={1400} />
              <div><h3>{item.name}</h3><p>{item.detail}</p><ArrowRight aria-hidden="true" /></div>
            </a>
          ))}
        </div>
      </section>

      <section className="chf-rooms" id="rooms">
        <div className="chf-room-copy">
          <h2>{data.rooms.title}</h2>
          <p>{data.rooms.description}</p>
          <div role="tablist" aria-label="Featured rooms">
            {data.rooms.items.map((item, index) => (
              <button
                type="button"
                role="tab"
                aria-selected={activeRoom === index}
                className={activeRoom === index ? "is-active" : ""}
                onClick={() => setActiveRoom(index)}
                key={item.name}
              >
                <span>{item.name}</span><small>{item.location}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="chf-room-image" role="tabpanel">
          <TemplateImage src={room.image} alt={room.imageAlt} width={1400} height={1200} />
          <p><strong>{room.name}</strong><span>{room.location}</span></p>
        </div>
      </section>

      <section className="chf-craft" id="craft">
        <div className="chf-craft-image">
          <TemplateImage src={data.craft.image} alt={data.craft.imageAlt} width={1200} height={1400} />
        </div>
        <div className="chf-craft-copy">
          <p>{data.craft.eyebrow}</p>
          <h2>{data.craft.title}</h2>
          <span>{data.craft.description}</span>
          <a href={data.craft.buttonHref}>{data.craft.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <blockquote className="chf-quote">
        <p>“{data.quote.text}”</p>
        <footer><strong>{data.quote.name}</strong><span>{data.quote.detail}</span></footer>
      </blockquote>

      <section className="chf-contact" id="contact">
        <div>
          <h2>{data.contact.title}</h2>
          <p>{data.contact.description}</p>
          <a href={data.contact.buttonHref}>{data.contact.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="chf-contact-meta">
          <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{data.brand.phone}</a>
          <p><MapPin aria-hidden="true" />{data.brand.address}</p>
          <a href={`mailto:${data.brand.email}`}>{data.brand.email}</a>
        </div>
      </section>

      <footer className="chf-footer">
        <a className="chf-logo" href="#"><span>CH</span><strong>{data.brand.shortName}</strong></a>
        <p>{data.footer.note}</p>
        <div>
          <a href={data.footer.instagramHref}>{data.footer.instagramLabel}</a>
          <a href={data.footer.pinterestHref}>{data.footer.pinterestLabel}</a>
        </div>
        <small>{data.footer.copyright}</small>
      </footer>
    </main>
  );
}
