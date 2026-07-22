"use client";
/* eslint-disable @next/next/no-img-element -- Template image URLs are user-editable and may point to uploaded asset hosts. */

import { useEffect } from "react";
import {
  ArrowRight,
  Clock,
  EnvelopeSimple,
  InstagramLogo,
  MapPin,
  Phone,
  Quotes,
  Star,
} from "@phosphor-icons/react";
import "./premium-food.css";

type LinkItem = { label: string; href: string };
type MenuItem = { name: string; description: string; price: string };
type MenuCategory = { name: string; items: MenuItem[] };
type Dish = { name: string; description: string; price: string; image: string; imageAlt: string };
type GalleryImage = { image: string; imageAlt: string };
type Review = { quote: string; name: string; detail: string };
type Hour = { day: string; time: string };

export type PremiumFoodVariant = "burger-dark" | "burger-light" | "pizza-dark" | "pizza-light";

export type PremiumFoodData = {
  brand: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
  };
  navigation: { links: LinkItem[]; ctaLabel: string; ctaHref: string };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    image: string;
    imageAlt: string;
    badgeValue: string;
    badgeLabel: string;
  };
  marquee: { items: string[] };
  signature: {
    eyebrow: string;
    title: string;
    description: string;
    price: string;
    buttonLabel: string;
    buttonHref: string;
    image: string;
    imageAlt: string;
  };
  dishes: { title: string; description: string; buttonLabel: string; buttonHref: string; items: Dish[] };
  menu: { title: string; description: string; categories: MenuCategory[] };
  story: {
    eyebrow: string;
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
    image: string;
    imageAlt: string;
    secondaryImage: string;
    secondaryImageAlt: string;
  };
  gallery: { title: string; description: string; images: GalleryImage[] };
  reviews: { title: string; items: Review[] };
  contact: {
    title: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    hours: Hour[];
  };
  social: { instagram: string; instagramHref: string; facebook: string; facebookHref: string; tiktok: string; tiktokHref: string };
  footer: { note: string; copyright: string };
};

function Reveal({ children, className = "", direction = "up" }: { children: React.ReactNode; className?: string; direction?: "up" | "left" | "right" | "scale" }) {
  return <div className={`pft-reveal pft-reveal--${direction} ${className}`}>{children}</div>;
}

function ActionLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <a className={`pft-button${secondary ? " pft-button--secondary" : ""}`} href={href}>
      <span>{children}</span>
      <ArrowRight aria-hidden="true" weight="bold" />
    </a>
  );
}

export default function PremiumFoodTemplate({ data, variant }: { data: PremiumFoodData; variant: PremiumFoodVariant }) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(`.pft-${variant} .pft-reveal`));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("pft-reveal--visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pft-reveal--visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [variant]);

  const isPizza = variant.startsWith("pizza");
  const marqueeItems = [...data.marquee.items, ...data.marquee.items];
  const decorativeWord = isPizza ? "PIZZA" : "BURGER";
  const heroSupport = data.dishes.items.slice(1, 3);

  return (
    <div className={`pft-root pft-${variant}`}>
      <header className="pft-header">
        <a className="pft-wordmark" href="#top" aria-label={`${data.brand.name} home`}>
          <span className="pft-mark" aria-hidden="true">{isPizza ? "◒" : "≋"}</span>
          <span>{data.brand.name}</span>
        </a>
        <nav className="pft-nav" aria-label="Primary navigation">
          {data.navigation.links.map((link) => <a key={`${link.label}-${link.href}`} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="pft-nav-cta" href={data.navigation.ctaHref}>{data.navigation.ctaLabel}<ArrowRight aria-hidden="true" weight="bold" /></a>
      </header>

      <main>
        <section className="pft-hero" id="top">
          <div className="pft-hero-atmosphere" aria-hidden="true">
            <span className="pft-hero-ghost">{decorativeWord}</span>
            <span className="pft-scribble pft-scribble--one" />
            <span className="pft-scribble pft-scribble--two" />
          </div>
          <div className="pft-hero-copy">
            <p className="pft-eyebrow">{data.hero.eyebrow}</p>
            <h1>{data.hero.title}</h1>
            <p className="pft-lede">{data.hero.description}</p>
            <div className="pft-actions">
              <ActionLink href={data.hero.primaryHref}>{data.hero.primaryLabel}</ActionLink>
              <ActionLink href={data.hero.secondaryHref} secondary>{data.hero.secondaryLabel}</ActionLink>
            </div>
            <p className="pft-hero-tagline"><span aria-hidden="true">✦</span>{data.brand.tagline}</p>
          </div>
          <div className="pft-hero-media">
            <span className="pft-hero-halo" aria-hidden="true" />
            <img className="pft-hero-food" src={data.hero.image} alt={data.hero.imageAlt} loading="eager" fetchPriority="high" />
            <div className="pft-hero-badge" aria-label={`${data.hero.badgeValue} ${data.hero.badgeLabel}`}>
              <strong>{data.hero.badgeValue}</strong><span>{data.hero.badgeLabel}</span>
            </div>
            {heroSupport.map((item, index) => (
              <div className={`pft-hero-support pft-hero-support--${index + 1}`} key={item.name}>
                <img src={item.image} alt={item.imageAlt} loading="eager" />
                <span>{item.name}</span>
              </div>
            ))}
            <span className="pft-orbit pft-orbit--one" aria-hidden="true" />
            <span className="pft-orbit pft-orbit--two" aria-hidden="true" />
          </div>
        </section>

        <div className="pft-rip pft-rip--hero" aria-hidden="true" />

        <div className="pft-marquee" aria-label={data.marquee.items.join(", ")}>
          <div className="pft-marquee-track">
            {marqueeItems.map((item, index) => <span key={`${item}-${index}`} aria-hidden={index >= data.marquee.items.length}>{item}<i aria-hidden="true">✦</i></span>)}
          </div>
        </div>

        <section className="pft-signature" id="specials">
          <div className="pft-signature-media pft-parallax-media">
            <img src={data.signature.image} alt={data.signature.imageAlt} loading="lazy" />
            <span className="pft-section-number" aria-hidden="true">01</span>
          </div>
          <Reveal className="pft-signature-copy" direction="right">
            <p className="pft-eyebrow">{data.signature.eyebrow}</p>
            <h2>{data.signature.title}</h2>
            <p>{data.signature.description}</p>
            <strong className="pft-price">{data.signature.price}</strong>
            <ActionLink href={data.signature.buttonHref}>{data.signature.buttonLabel}</ActionLink>
          </Reveal>
        </section>

        <section className="pft-dishes" id="menu">
          <Reveal className="pft-section-heading">
            <h2>{data.dishes.title}</h2>
            <p>{data.dishes.description}</p>
            <ActionLink href={data.dishes.buttonHref} secondary>{data.dishes.buttonLabel}</ActionLink>
          </Reveal>
          <div className="pft-dish-grid">
            {data.dishes.items.map((dish, index) => (
              <Reveal className={`pft-dish pft-dish--${index + 1}`} direction={index % 2 === 0 ? "left" : "right"} key={dish.name}>
                <div className="pft-dish-media"><img src={dish.image} alt={dish.imageAlt} loading="lazy" /></div>
                <span className="pft-dish-index" aria-hidden="true">0{index + 1}</span>
                <div className="pft-dish-copy"><h3>{dish.name}</h3><p>{dish.description}</p><strong>{dish.price}</strong></div>
              </Reveal>
            ))}
          </div>
        </section>

        <div className="pft-rip pft-rip--menu" aria-hidden="true" />

        <section className="pft-menu-ledger">
          <Reveal className="pft-menu-intro"><h2>{data.menu.title}</h2><p>{data.menu.description}</p></Reveal>
          <div className="pft-menu-categories">
            {data.menu.categories.map((category) => (
              <Reveal className="pft-menu-category" key={category.name}>
                <h3>{category.name}</h3>
                <div>
                  {category.items.map((item) => (
                    <article className="pft-menu-item" key={item.name}>
                      <div><h4>{item.name}</h4><p>{item.description}</p></div><strong>{item.price}</strong>
                    </article>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="pft-story" id="story">
          <div className="pft-story-media">
            <img className="pft-story-primary pft-parallax-media" src={data.story.image} alt={data.story.imageAlt} loading="lazy" />
            <img className="pft-story-secondary" src={data.story.secondaryImage} alt={data.story.secondaryImageAlt} loading="lazy" />
          </div>
          <Reveal className="pft-story-copy" direction="right">
            <p className="pft-eyebrow">{data.story.eyebrow}</p><h2>{data.story.title}</h2><p>{data.story.description}</p>
            <ActionLink href={data.story.buttonHref} secondary>{data.story.buttonLabel}</ActionLink>
          </Reveal>
        </section>

        <div className="pft-rip pft-rip--story" aria-hidden="true" />

        <section className="pft-gallery" id="gallery">
          <Reveal className="pft-gallery-heading"><h2>{data.gallery.title}</h2><p>{data.gallery.description}</p></Reveal>
          <div className="pft-gallery-grid">
            {data.gallery.images.map((item, index) => <Reveal direction="scale" className={`pft-gallery-item pft-gallery-item--${index + 1}`} key={`${item.image}-${index}`}><span aria-hidden="true">0{index + 1}</span><img src={item.image} alt={item.imageAlt} loading="lazy" /></Reveal>)}
          </div>
        </section>

        <section className="pft-reviews" id="reviews">
          <Reveal><h2>{data.reviews.title}</h2></Reveal>
          <div className="pft-review-grid">
            {data.reviews.items.map((review) => (
              <Reveal className="pft-review" key={review.name}>
                <Quotes aria-hidden="true" weight="fill" /><div className="pft-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} weight="fill" aria-hidden="true" />)}</div>
                <blockquote>{review.quote}</blockquote><p><strong>{review.name}</strong><span>{review.detail}</span></p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="pft-contact" id="contact">
          <Reveal className="pft-contact-cta">
            <h2>{data.contact.title}</h2><p>{data.contact.description}</p>
            <div className="pft-actions"><ActionLink href={data.contact.primaryHref}>{data.contact.primaryLabel}</ActionLink><ActionLink href={data.contact.secondaryHref} secondary>{data.contact.secondaryLabel}</ActionLink></div>
          </Reveal>
          <div className="pft-contact-details">
            <Reveal className="pft-detail"><Clock aria-hidden="true" /><div><h3>Opening hours</h3>{data.contact.hours.map((hour) => <p key={hour.day}><span>{hour.day}</span><strong>{hour.time}</strong></p>)}</div></Reveal>
            <Reveal className="pft-detail"><MapPin aria-hidden="true" /><div><h3>Find us</h3><p>{data.brand.address}</p><a href={data.contact.secondaryHref}>Get directions</a></div></Reveal>
            <Reveal className="pft-detail"><Phone aria-hidden="true" /><div><h3>Talk to us</h3><a href={`tel:${data.brand.phone}`}>{data.brand.phone}</a><a href={`mailto:${data.brand.email}`}><EnvelopeSimple aria-hidden="true" />{data.brand.email}</a></div></Reveal>
          </div>
        </section>
      </main>

      <footer className="pft-footer">
        <div><a className="pft-wordmark" href="#top"><span className="pft-mark" aria-hidden="true">{isPizza ? "◒" : "≋"}</span>{data.brand.name}</a><p>{data.footer.note}</p></div>
        <div className="pft-footer-links">{data.navigation.links.map((link) => <a key={`${link.label}-footer`} href={link.href}>{link.label}</a>)}</div>
        <div className="pft-socials"><a href={data.social.instagramHref}><InstagramLogo aria-hidden="true" />{data.social.instagram}</a><a href={data.social.facebookHref}>{data.social.facebook}</a><a href={data.social.tiktokHref}>{data.social.tiktok}</a></div>
        <p className="pft-copyright">{data.footer.copyright}</p>
      </footer>
    </div>
  );
}
