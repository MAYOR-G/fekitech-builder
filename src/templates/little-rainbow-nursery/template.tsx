"use client";

import React from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type RoomItem = { name: string; text: string; icon: string };
type Testimonial = { quote: string; name: string };
type GalleryImage = { src: string; alt: string };

function asItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function RainbowLogo({ name, strapline }: { name: string; strapline: string }) {
  return (
    <span className="lrn-brand-mark" aria-hidden="true">
      <span className="lrn-rainbow">
        <i />
        <i />
        <i />
      </span>
      <span>
        <strong>{name}</strong>
        <small>{strapline}</small>
      </span>
    </span>
  );
}

function RoomIcon({ type }: { type: string }) {
  return (
    <span className={`lrn-room-icon lrn-room-icon-${type}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function SocialDots() {
  return (
    <div className="lrn-socials" aria-label="Social links">
      {["f", "ig", "x", "p"].map((label) => (
        <a key={label} href="#contact" aria-label={label}>{label}</a>
      ))}
    </div>
  );
}

export default function LittleRainbowNurseryTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;

  const themeStyle = {
    "--lrn-page": colors.page,
    "--lrn-paper": colors.paper,
    "--lrn-peach": colors.peach,
    "--lrn-orange": colors.peachDeep,
    "--lrn-navy": colors.navy,
    "--lrn-blue": colors.blue,
    "--lrn-sky": colors.sky,
    "--lrn-yellow": colors.yellow,
    "--lrn-line": colors.line,
    "--lrn-muted": colors.muted,
    "--lrn-footer": colors.footer,
    "--lrn-heading": fonts.heading,
    "--lrn-body": fonts.body,
  } as React.CSSProperties;

  const navLinks = asItems<LinkItem>(content.navigation.links);
  const rooms = asItems<RoomItem>(content.rooms.items);
  const testimonials = asItems<Testimonial>(content.testimonials.items);
  const gallery = asItems<GalleryImage>(content.gallery.images);
  const heroTitle = str(content.hero.title).split("\n");

  return (
    <main id="home" data-template-id="little-rainbow-nursery" className="little-rainbow-nursery" style={themeStyle}>
      <div className="lrn-safety">
        <span>ⓘ</span>
        <p>{str(content.announcement.text)} <a href={str(content.announcement.href)}>{str(content.announcement.linkLabel)}</a></p>
      </div>

      <header className="lrn-header">
        <a className="lrn-brand" href="#home" aria-label={str(content.brand.name)}>
          <RainbowLogo name={str(content.brand.name)} strapline={str(content.brand.strapline)} />
        </a>
        <nav className="lrn-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </header>

      <section className="lrn-hero" aria-labelledby="lrn-hero-title">
        <div className="lrn-hero-panel">
          <p>{str(content.hero.eyebrow)}</p>
          <h1 id="lrn-hero-title">
            {heroTitle.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
          </h1>
          <strong>{str(content.hero.tagline)}</strong>
        </div>
        <div className="lrn-hero-grid">
          <img className="lrn-hero-image" src={str(content.hero.image)} alt={str(content.hero.imageAlt)} />
          <aside className="lrn-welcome-card">
            <p>{str(content.hero.cardText)}</p>
            <span className="lrn-star" aria-hidden="true" />
          </aside>
        </div>
      </section>

      <section id="rooms" className="lrn-rooms">
        <h2>{str(content.rooms.title)}</h2>
        <div className="lrn-room-grid">
          {rooms.map((room) => (
            <article key={room.name}>
              <RoomIcon type={room.icon} />
              <h3>{room.name}</h3>
              <p>{room.text}</p>
            </article>
          ))}
        </div>
        <a className="lrn-pill-button" href={str(content.rooms.buttonHref)}>{str(content.rooms.buttonLabel)}</a>
      </section>

      <section id="about" className="lrn-approach">
        <img src={str(content.approach.image)} alt={str(content.approach.imageAlt)} />
        <div className="lrn-approach-card">
          <span className="lrn-starfish" aria-hidden="true" />
          <span className="lrn-starfish lrn-starfish-small" aria-hidden="true" />
          <h2>{str(content.approach.title)}</h2>
          <p>{str(content.approach.text)}</p>
          <a className="lrn-pill-button" href={str(content.approach.buttonHref)}>{str(content.approach.buttonLabel)}</a>
        </div>
      </section>

      <section className="lrn-testimonials">
        <div className="lrn-testimonial-banner">
          <span className="lrn-planet" aria-hidden="true" />
          <span className="lrn-corner-rainbow" aria-hidden="true" />
          <h2>{str(content.testimonials.title)}</h2>
        </div>
        <div className="lrn-testimonial-grid">
          {testimonials.map((item) => (
            <article key={item.name}>
              <p>{item.quote}</p>
              <strong>{item.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="programs" className="lrn-gallery" aria-label="Nursery gallery">
        {gallery.map((image, index) => (
          <figure key={image.src} className={`lrn-gallery-item lrn-gallery-item-${index + 1}`}>
            <img src={image.src} alt={image.alt} />
          </figure>
        ))}
      </section>

      <footer id="contact" className="lrn-footer">
        <div className="lrn-clouds" aria-hidden="true" />
        <div className="lrn-footer-main">
          <RainbowLogo name={str(content.brand.name)} strapline={str(content.brand.strapline)} />
          <SocialDots />
          <div className="lrn-footer-links">
            <a href={str(content.footer.accessibilityHref)}>{str(content.footer.accessibilityLabel)}</a>
            <a href={str(content.footer.privacyHref)}>{str(content.footer.privacyLabel)}</a>
          </div>
        </div>
        <address className="lrn-contact-line">
          <a href={str(content.contact.emailHref)}>{str(content.contact.emailLabel)}: {str(content.contact.email)}</a>
          <a href={str(content.contact.phoneHref)}>{str(content.contact.phoneLabel)}: {str(content.contact.phone)}</a>
          <span>{str(content.contact.addressLabel)}: {str(content.contact.address)}</span>
        </address>
        <p className="lrn-legal">{str(content.footer.legal)} Powered and secured by FekiTech.</p>
      </footer>
    </main>
  );
}
