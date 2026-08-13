"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { List, UserCircle, X } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type FioraData = typeof editableData;

export default function FioraLocksTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as FioraData;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-fl-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={rootRef} data-template-id="fiora-locks" className="fiora-locks">
      <Header content={content} menuOpen={menuOpen} setMenuOpen={setMenuOpen} closeMenu={closeMenu} />
      <main id="home">
        <Hero content={content} />
        <Match content={content} />
        <Editorial content={content} />
        <ShadeList content={content} />
        <Gallery content={content} />
        <Testimonial content={content} />
        <FinalCta content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}

function Header({
  content,
  menuOpen,
  setMenuOpen,
  closeMenu,
}: {
  content: FioraData;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  closeMenu: () => void;
}) {
  return (
    <header className="fl-header">
      <div className="fl-wordmark" data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</div>
      <div className="fl-nav-row">
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          {content.header.nav.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              data-editable-path={`header.nav.${index}.label`}
              data-editable-type="link"
              data-editable-href-path={`header.nav.${index}.href`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="fl-actions">
          <a
            className="fl-pill"
            href={content.header.bookHref}
            data-editable-path="header.bookLabel"
            data-editable-type="link"
            data-editable-href-path="header.bookHref"
          >
            {content.header.bookLabel}
          </a>
          <a
            className="fl-login"
            href={content.header.loginHref}
            aria-label={content.header.loginLabel}
            data-editable-path="header.loginLabel"
            data-editable-type="link"
            data-editable-href-path="header.loginHref"
          >
            <UserCircle aria-hidden="true" />
            <span>{content.header.loginLabel}</span>
          </a>
          <button
            className="fl-menu"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ content }: { content: FioraData }) {
  return (
    <section className="fl-hero" aria-label="Hair extensions introduction">
      <figure className="fl-hero-main" data-fl-reveal>
        <TemplateImage src={content.hero.mainImage} alt={content.hero.mainImageAlt} width={900} height={1100} priority loading="eager" data-editable-path="hero.mainImage" data-editable-type="image" data-editable-alt-path="hero.mainImageAlt" />
      </figure>
      <div className="fl-hero-copy" data-fl-reveal>
        <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
        <p data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</p>
      </div>
      <figure className="fl-hero-texture" data-fl-reveal>
        <TemplateImage src={content.hero.textureImage} alt={content.hero.textureImageAlt} width={700} height={900} loading="eager" data-editable-path="hero.textureImage" data-editable-type="image" data-editable-alt-path="hero.textureImageAlt" />
      </figure>
      <figure className="fl-hero-portrait" data-fl-reveal>
        <TemplateImage src={content.hero.portraitImage} alt={content.hero.portraitImageAlt} width={1400} height={900} loading="eager" data-editable-path="hero.portraitImage" data-editable-type="image" data-editable-alt-path="hero.portraitImageAlt" />
      </figure>
      <div className="fl-hero-swatches" data-fl-reveal>
        <TemplateImage src={content.hero.shadeOne} alt={content.hero.shadeOneAlt} width={700} height={900} loading="eager" data-editable-path="hero.shadeOne" data-editable-type="image" data-editable-alt-path="hero.shadeOneAlt" />
        <TemplateImage src={content.hero.shadeTwo} alt={content.hero.shadeTwoAlt} width={700} height={900} loading="eager" data-editable-path="hero.shadeTwo" data-editable-type="image" data-editable-alt-path="hero.shadeTwoAlt" />
      </div>
      <a className="fl-inline-book" href={content.hero.primaryHref} data-editable-path="hero.primaryLabel" data-editable-type="link" data-editable-href-path="hero.primaryHref">{content.hero.primaryLabel}</a>
    </section>
  );
}

function Match({ content }: { content: FioraData }) {
  return (
    <section className="fl-match" id="about">
      <div className="fl-centre-heading" data-fl-reveal>
        <h2 data-editable-path="match.title" data-editable-type="text">{content.match.title}</h2>
        <p data-editable-path="match.body" data-editable-type="text">{content.match.body}</p>
      </div>
      <div className="fl-match-grid">
        <div className="fl-service-list" data-fl-reveal>
          {content.match.services.map((service, index) => (
            <article key={service.name}>
              <div>
                <h3 data-editable-path={`match.services.${index}.name`} data-editable-type="text">{service.name}</h3>
                <p data-editable-path={`match.services.${index}.body`} data-editable-type="text">{service.body}</p>
              </div>
              <a
                href={service.buttonHref}
                data-editable-path={`match.services.${index}.buttonLabel`}
                data-editable-type="link"
                data-editable-href-path={`match.services.${index}.buttonHref`}
              >
                {service.buttonLabel}
              </a>
            </article>
          ))}
          <TemplateImage className="fl-small-texture" src={content.match.swatchImage} alt={content.match.swatchImageAlt} width={700} height={900} loading="lazy" data-editable-path="match.swatchImage" data-editable-type="image" data-editable-alt-path="match.swatchImageAlt" />
        </div>
        <figure className="fl-match-photo" data-fl-reveal>
          <TemplateImage src={content.match.image} alt={content.match.imageAlt} width={1200} height={1600} loading="lazy" data-editable-path="match.image" data-editable-type="image" data-editable-alt-path="match.imageAlt" />
        </figure>
      </div>
    </section>
  );
}

function Editorial({ content }: { content: FioraData }) {
  return (
    <section className="fl-editorial" aria-label="Hair detail gallery">
      <figure className="fl-comb" data-fl-reveal>
        <TemplateImage src={content.editorial.combImage} alt={content.editorial.combImageAlt} width={1400} height={900} loading="lazy" data-editable-path="editorial.combImage" data-editable-type="image" data-editable-alt-path="editorial.combImageAlt" />
      </figure>
      <figure className="fl-blonde-texture" data-fl-reveal>
        <TemplateImage src={content.editorial.blondeTexture} alt={content.editorial.blondeTextureAlt} width={700} height={900} loading="lazy" data-editable-path="editorial.blondeTexture" data-editable-type="image" data-editable-alt-path="editorial.blondeTextureAlt" />
      </figure>
      <figure className="fl-blonde-portrait" data-fl-reveal>
        <TemplateImage src={content.editorial.blondePortrait} alt={content.editorial.blondePortraitAlt} width={900} height={1100} loading="lazy" data-editable-path="editorial.blondePortrait" data-editable-type="image" data-editable-alt-path="editorial.blondePortraitAlt" />
      </figure>
    </section>
  );
}

function ShadeList({ content }: { content: FioraData }) {
  return (
    <section className="fl-shades" aria-label="Extension shades">
      <figure className="fl-shade-feature" data-fl-reveal>
        <TemplateImage src={content.editorial.monoImage} alt={content.editorial.monoImageAlt} width={1400} height={900} loading="lazy" data-editable-path="editorial.monoImage" data-editable-type="image" data-editable-alt-path="editorial.monoImageAlt" />
      </figure>
      <div className="fl-shade-list" data-fl-reveal>
        {content.shades.items.map((shade, index) => (
          <article key={shade.name}>
            <span data-editable-path={`shades.items.${index}.number`} data-editable-type="text">{shade.number}</span>
            <div>
              <h3 data-editable-path={`shades.items.${index}.name`} data-editable-type="text">{shade.name}</h3>
              <p data-editable-path={`shades.items.${index}.body`} data-editable-type="text">{shade.body}</p>
            </div>
            <TemplateImage src={shade.image} alt={shade.imageAlt} width={700} height={900} loading="lazy" data-editable-path={`shades.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`shades.items.${index}.imageAlt`} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Gallery({ content }: { content: FioraData }) {
  return (
    <section className="fl-gallery" id="gallery">
      <div className="fl-centre-heading" data-fl-reveal>
        <h2 data-editable-path="gallery.title" data-editable-type="text">{content.gallery.title}</h2>
        <p data-editable-path="gallery.body" data-editable-type="text">{content.gallery.body}</p>
      </div>
      <div className="fl-gallery-strip" data-fl-reveal>
        {content.gallery.images.map((image, index) => (
          <figure key={image.image}>
            <TemplateImage src={image.image} alt={image.alt} width={900} height={900} loading="lazy" data-editable-path={`gallery.images.${index}.image`} data-editable-type="image" data-editable-alt-path={`gallery.images.${index}.alt`} />
          </figure>
        ))}
      </div>
      <a className="fl-gallery-button" href={content.gallery.buttonHref} data-editable-path="gallery.buttonLabel" data-editable-type="link" data-editable-href-path="gallery.buttonHref">{content.gallery.buttonLabel}</a>
    </section>
  );
}

function Testimonial({ content }: { content: FioraData }) {
  return (
    <section className="fl-testimonial" data-fl-reveal>
      <h2 data-editable-path="testimonial.title" data-editable-type="text">{content.testimonial.title}</h2>
      <figure>
        <blockquote data-editable-path="testimonial.quote" data-editable-type="text">{content.testimonial.quote}</blockquote>
        <figcaption data-editable-path="testimonial.name" data-editable-type="text">{content.testimonial.name}</figcaption>
      </figure>
      <div className="fl-testimonial-image">
        <TemplateImage src={content.testimonial.image} alt={content.testimonial.imageAlt} width={1200} height={1600} loading="lazy" data-editable-path="testimonial.image" data-editable-type="image" data-editable-alt-path="testimonial.imageAlt" />
      </div>
    </section>
  );
}

function FinalCta({ content }: { content: FioraData }) {
  return (
    <section className="fl-final" id="contact" data-fl-reveal>
      <h2 data-editable-path="cta.title" data-editable-type="text">{content.cta.title}</h2>
      <p data-editable-path="cta.body" data-editable-type="text">{content.cta.body}</p>
      <a href={content.cta.buttonHref} data-editable-path="cta.buttonLabel" data-editable-type="link" data-editable-href-path="cta.buttonHref">{content.cta.buttonLabel}</a>
    </section>
  );
}

function Footer({ content }: { content: FioraData }) {
  return (
    <footer className="fl-footer">
      <strong data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</strong>
      <address>
        <b data-editable-path="footer.locationTitle" data-editable-type="text">{content.footer.locationTitle}</b>
        <span data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</span>
        <span data-editable-path="footer.hours" data-editable-type="text">{content.footer.hours}</span>
        <span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span>
        <span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span>
      </address>
      <nav aria-label="Social links">
        <b data-editable-path="footer.socialTitle" data-editable-type="text">{content.footer.socialTitle}</b>
        {content.footer.links.map((link, index) => (
          <a key={link.label} href={link.href} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <nav aria-label="Policy links">
        <b data-editable-path="footer.policyTitle" data-editable-type="text">{content.footer.policyTitle}</b>
        {content.footer.policies.map((link, index) => (
          <a key={link.label} href={link.href} data-editable-path={`footer.policies.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.policies.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
    </footer>
  );
}
