"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, EnvelopeSimple, List, MapPin, Phone, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from "./TemplateContext";
import "./premium.css";

export default function Main() {
  const data = useTemplateData();
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const flavours = data.highlights.items.slice(0, 3);
  const previous = () => setActive((index) => (index + flavours.length - 1) % flavours.length);
  const next = () => setActive((index) => (index + 1) % flavours.length);

  return (
    <main className="ms-site">
      <header className="ms-header">
        <a className="ms-logo" href="#" aria-label={`${data.brand.name} home`}>
          <span>MS</span><strong>{data.brand.name}</strong>
        </a>
        <nav className={menuOpen ? "ms-nav is-open" : "ms-nav"} aria-label="Primary navigation">
          {data.navigation.links.slice(1).map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <a className="ms-order" href={data.navigation.ctaHref}>{data.navigation.ctaLabel}<ArrowRight aria-hidden="true" /></a>
        <button
          className="ms-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </header>

      <section className="ms-hero">
        <div className="ms-hero-copy">
          <p>{data.hero.kicker} {data.brand.name}</p>
          <h1>Pick a mood. We’ll scoop it.</h1>
          <span>{data.hero.subtitle}</span>
          <a href={data.navigation.ctaHref}>{data.navigation.ctaLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="ms-carousel" aria-live="polite">
          <div className="ms-carousel-rail">
            {flavours.map((flavour, index) => {
              const position = (index - active + flavours.length) % flavours.length;
              return (
                <article className={`ms-flavour position-${position}`} key={flavour.title}>
                  <TemplateImage
                    src={flavour.image}
                    alt={flavour.title}
                    width={900}
                    height={1100}
                    loading={index === active ? "eager" : "lazy"}
                  />
                  <div><strong>{flavour.title}</strong><span>{flavour.description}</span></div>
                </article>
              );
            })}
          </div>
          <div className="ms-carousel-controls">
            <button type="button" onClick={previous} aria-label="Previous flavour"><ArrowLeft aria-hidden="true" /></button>
            <span>{String(active + 1).padStart(2, "0")} / {String(flavours.length).padStart(2, "0")}</span>
            <button type="button" onClick={next} aria-label="Next flavour"><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </section>

      <section className="ms-parlour" id="about">
        <div className="ms-parlour-image">
          <TemplateImage src={data.welcome.backgroundImage} alt="Gelato being served at The Minted Scoop" width={1200} height={1400} />
        </div>
        <div className="ms-parlour-copy">
          <p>{data.brand.tagline}</p>
          <h2>{data.welcome.title}</h2>
          <span>{data.welcome.description}</span>
          <a href={data.welcome.buttonHref}>{data.welcome.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
      </section>

      <section className="ms-menu" id="menu">
        <div className="ms-menu-heading">
          <h2>Six flavours. One very good decision.</h2>
          <p>Small-batch gelato, seasonal sorbet, and classic soft serve made in our London kitchen.</p>
        </div>
        <div className="ms-menu-grid">
          {data.gallery.images.slice(0, 6).map((image, index) => (
            <figure key={`${image}-${index}`}>
              <TemplateImage src={image} alt={`The Minted Scoop flavour ${index + 1}`} width={900} height={1100} />
              <figcaption>{["Pistachio mint", "Summer berry", "Chocolate vanilla", "Counter favourites", "Espresso affogato", "The house sundae"][index]}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="ms-boxes" id="shop">
        <div className="ms-boxes-heading"><h2>{data.pricing.title}</h2><p>Choose the box, then choose the flavours. We pack every order cold and ready to share.</p></div>
        <div className="ms-box-list">
          {data.pricing.items.map((item) => (
            <article key={item.name}>
              <div><h3>{item.name}</h3><strong>{item.currency}{item.price}</strong></div>
              <ul>{item.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}</ul>
              <a href={item.buttonHref}>{item.buttonLabel}<ArrowRight aria-hidden="true" /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="ms-testimonials">
        <h2>{data.testimonials.title}</h2>
        <div>
          {data.testimonials.items.map((item) => (
            <blockquote key={item.name}>
              <p>“{item.quote}”</p><footer>{item.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="ms-contact" id="contact">
        <div><h2>Come for one scoop. Stay for another.</h2><p>{data.brand.address}</p></div>
        <div className="ms-contact-links">
          <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{data.brand.phone}</a>
          <a href={`mailto:${data.brand.email}`}><EnvelopeSimple aria-hidden="true" />{data.brand.email}</a>
          <p><MapPin aria-hidden="true" />{data.brand.address}</p>
        </div>
      </section>

      <footer className="ms-footer">
        <a className="ms-logo" href="#"><span>MS</span><strong>{data.brand.name}</strong></a>
        <div>
          <a href={data.footer.social.instagram}>Instagram</a>
          <a href={data.footer.social.facebook}>Facebook</a>
          <a href={data.footer.social.twitter}>Twitter</a>
        </div>
        <small>{data.footer.copyright}</small>
      </footer>
    </main>
  );
}
