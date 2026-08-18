"use client";

import { ArrowRight, Clock, Heart, Mail, MapPin, Menu, Phone, Search, ShoppingCart } from "lucide-react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type FreshBiteData = typeof defaults;
type LinkItem = { label: string; href: string };
type Product = { name: string; description: string; price: string; image: string; imageAlt: string };
type Promo = { eyebrow: string; title: string; text: string; buttonLabel: string; buttonHref: string; image: string; imageAlt: string };
type MenuItem = Product;
type Chef = { name: string; role: string; image: string; imageAlt: string };
type News = { date: string; month: string; category: string; title: string; image: string; imageAlt: string };
type GalleryItem = { image: string; imageAlt: string };

function arr<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function text(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function link(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function image(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function Cta({ label, href, labelPath, hrefPath, variant = "red" }: { label: string; href: string; labelPath: string; hrefPath: string; variant?: "red" | "orange" }) {
  return (
    <a className={`fb-cta is-${variant}`} href={href} {...link(labelPath, hrefPath)}>
      {label}
      <ArrowRight size={15} />
    </a>
  );
}

function Heading({ eyebrow, title, eyebrowPath, titlePath }: { eyebrow: string; title: string; eyebrowPath: string; titlePath: string }) {
  return (
    <div className="fb-heading">
      <span {...text(eyebrowPath)}>🍔 {eyebrow} 🍔</span>
      <h2 {...text(titlePath)}>{title}</h2>
    </div>
  );
}

function Logo({ content }: { content: FreshBiteData }) {
  return (
    <a className="fb-logo" href="#home" aria-label={content.brand.name}>
      <i aria-hidden="true" />
      <span><strong {...text("brand.name")}>{content.brand.name}</strong><small {...text("brand.tagline")}>{content.brand.tagline}</small></span>
      <b aria-hidden="true">⌂</b>
    </a>
  );
}

export default function FreshBiteFastFoodTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as FreshBiteData;
  const colors = content.theme.colors;
  const fonts = content.theme.typography;
  const style = {
    "--fb-page": colors.page,
    "--fb-cream": colors.cream,
    "--fb-surface": colors.surface,
    "--fb-ink": colors.ink,
    "--fb-muted": colors.muted,
    "--fb-red": colors.red,
    "--fb-orange": colors.orange,
    "--fb-yellow": colors.yellow,
    "--fb-dark": colors.dark,
    "--fb-footer": colors.footer,
    "--fb-line": colors.line,
    "--fb-heading": fonts.heading,
    "--fb-body": fonts.body
  } as React.CSSProperties;

  const navLinks = arr<LinkItem>(content.navigation.links);
  const popular = arr<Product>(content.popular.items);
  const promos = arr<Promo>(content.promos.items);
  const dishes = arr<Product>(content.dishes.items);
  const menuItems = arr<MenuItem>(content.menu.items);
  const chefs = arr<Chef>(content.chefs.items);
  const news = arr<News>(content.news.items);
  const gallery = arr<GalleryItem>(content.news.gallery);

  return (
    <main id="home" className="freshbite-fast-food" data-template-id="freshbite-fast-food" style={style}>
      <header className="fb-header">
        <Logo content={content} />
        <div className="fb-topbar">
          <span><Clock size={15} /> <b {...text("topbar.hours")}>{content.topbar.hours}</b></span>
          <span {...text("topbar.follow")}>{content.topbar.follow}</span>
          {arr<string>(content.topbar.socials).map((item, index) => <a key={item} href="#contact" {...text(`topbar.socials.${index}`)}>{item[0]}</a>)}
        </div>
        <nav className="fb-nav" aria-label="Main navigation">
          {navLinks.map((item, index) => (
            <a key={item.label} href={item.href} {...link(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}>{item.label} <span>+</span></a>
          ))}
        </nav>
        <div className="fb-icons" aria-hidden="true">
          <Search size={19} />
          <ShoppingCart size={19} />
          <Menu size={21} />
        </div>
      </header>

      <section className="fb-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} {...image("hero.image", "hero.imageAlt")} />
        <div className="fb-hero-copy">
          <p {...text("hero.eyebrow")}>{content.hero.eyebrow}</p>
          <h1 {...text("hero.title")}>{content.hero.title}</h1>
          <Cta label={content.hero.buttonLabel} href={content.hero.buttonHref} labelPath="hero.buttonLabel" hrefPath="hero.buttonHref" />
        </div>
      </section>

      <section className="fb-popular">
        <Heading eyebrow={content.popular.eyebrow} title={content.popular.title} eyebrowPath="popular.eyebrow" titlePath="popular.title" />
        <div className="fb-popular-grid">
          {popular.map((item, index) => (
            <article key={item.name}>
              <img src={item.image} alt={item.imageAlt} {...image(`popular.items.${index}.image`, `popular.items.${index}.imageAlt`)} />
              <h3 {...text(`popular.items.${index}.name`)}>{item.name}</h3>
              <p {...text(`popular.items.${index}.description`)}>{item.description}</p>
              <strong {...text(`popular.items.${index}.price`)}>{item.price}</strong>
            </article>
          ))}
        </div>
        <div className="fb-promo-grid">
          {promos.map((item, index) => (
            <article key={item.title}>
              <img src={item.image} alt={item.imageAlt} {...image(`promos.items.${index}.image`, `promos.items.${index}.imageAlt`)} />
              <div>
                <span {...text(`promos.items.${index}.eyebrow`)}>{item.eyebrow}</span>
                <h3 {...text(`promos.items.${index}.title`)}>{item.title}</h3>
                <p {...text(`promos.items.${index}.text`)}>{item.text}</p>
                <Cta label={item.buttonLabel} href={item.buttonHref} labelPath={`promos.items.${index}.buttonLabel`} hrefPath={`promos.items.${index}.buttonHref`} variant={index === 1 ? "orange" : "red"} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="fb-about">
        <img className="fb-about-left" src={content.about.leftImage} alt={content.about.leftImageAlt} {...image("about.leftImage", "about.leftImageAlt")} />
        <div>
          <Heading eyebrow={content.about.eyebrow} title={content.about.title} eyebrowPath="about.eyebrow" titlePath="about.title" />
          <p {...text("about.text")}>{content.about.text}</p>
          <Cta label={content.about.buttonLabel} href={content.about.buttonHref} labelPath="about.buttonLabel" hrefPath="about.buttonHref" />
        </div>
        <img className="fb-about-right" src={content.about.rightImage} alt={content.about.rightImageAlt} {...image("about.rightImage", "about.rightImageAlt")} />
      </section>

      <section id="dishes" className="fb-dishes">
        <Heading eyebrow={content.dishes.eyebrow} title={content.dishes.title} eyebrowPath="dishes.eyebrow" titlePath="dishes.title" />
        <div className="fb-dish-grid">
          {dishes.map((item, index) => (
            <article key={item.name}>
              <button type="button" aria-label="Save item"><Heart size={18} /></button>
              <img src={item.image} alt={item.imageAlt} {...image(`dishes.items.${index}.image`, `dishes.items.${index}.imageAlt`)} />
              <h3 {...text(`dishes.items.${index}.name`)}>{item.name}</h3>
              <p {...text(`dishes.items.${index}.description`)}>{item.description}</p>
              <strong {...text(`dishes.items.${index}.price`)}>{item.price}</strong>
            </article>
          ))}
        </div>
        <Cta label={content.dishes.buttonLabel} href={content.dishes.buttonHref} labelPath="dishes.buttonLabel" hrefPath="dishes.buttonHref" />
      </section>

      <section className="fb-offer">
        <img src={content.offer.image} alt={content.offer.imageAlt} {...image("offer.image", "offer.imageAlt")} />
        <div>
          <span {...text("offer.eyebrow")}>{content.offer.eyebrow}</span>
          <h2 {...text("offer.title")}>{content.offer.title}</h2>
          <p {...text("offer.text")}>{content.offer.text}</p>
          <b {...text("offer.discount")}>{content.offer.discount}</b>
          <Cta label={content.offer.buttonLabel} href={content.offer.buttonHref} labelPath="offer.buttonLabel" hrefPath="offer.buttonHref" />
        </div>
      </section>

      <section id="menu" className="fb-menu-section">
        <div className="fb-menu-card">
          <Heading eyebrow={content.menu.eyebrow} title={content.menu.title} eyebrowPath="menu.eyebrow" titlePath="menu.title" />
          <div className="fb-tabs">
            {arr<string>(content.menu.tabs).map((tab, index) => <span key={tab} {...text(`menu.tabs.${index}`)}>🍟 {tab}</span>)}
          </div>
          <div className="fb-menu-list">
            {menuItems.map((item, index) => (
              <article key={`${item.name}-${index}`}>
                <img src={item.image} alt={item.imageAlt} {...image(`menu.items.${index}.image`, `menu.items.${index}.imageAlt`)} />
                <div>
                  <h3 {...text(`menu.items.${index}.name`)}>{item.name}</h3>
                  <p {...text(`menu.items.${index}.description`)}>{item.description}</p>
                </div>
                <strong {...text(`menu.items.${index}.price`)}>{item.price}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fb-deal">
        <img src={content.deal.image} alt={content.deal.imageAlt} {...image("deal.image", "deal.imageAlt")} />
        <div>
          <span {...text("deal.eyebrow")}>🍔 {content.deal.eyebrow}</span>
          <h2 {...text("deal.title")}>{content.deal.title}</h2>
          <p {...text("deal.status")}>{content.deal.status}</p>
          <Cta label={content.deal.buttonLabel} href={content.deal.buttonHref} labelPath="deal.buttonLabel" hrefPath="deal.buttonHref" />
        </div>
      </section>

      <section className="fb-chefs">
        <Heading eyebrow={content.chefs.eyebrow} title={content.chefs.title} eyebrowPath="chefs.eyebrow" titlePath="chefs.title" />
        <div className="fb-chef-grid">
          {chefs.map((chef, index) => (
            <article key={chef.name}>
              <img src={chef.image} alt={chef.imageAlt} {...image(`chefs.items.${index}.image`, `chefs.items.${index}.imageAlt`)} />
              <h3 {...text(`chefs.items.${index}.name`)}>{chef.name}</h3>
              <p {...text(`chefs.items.${index}.role`)}>{chef.role}</p>
            </article>
          ))}
        </div>
        <div className="fb-brand-strip">
          {arr<string>(content.chefs.logos).map((logo, index) => <span key={logo} {...text(`chefs.logos.${index}`)}>{logo}</span>)}
        </div>
      </section>

      <section className="fb-testimonials">
        <img src={content.testimonials.image} alt={content.testimonials.imageAlt} {...image("testimonials.image", "testimonials.imageAlt")} />
        <div className="fb-testimonial-card">
          <span {...text("testimonials.eyebrow")}>🍔 {content.testimonials.eyebrow}</span>
          <h2 {...text("testimonials.title")}>{content.testimonials.title}</h2>
          <article>
            <strong {...text("testimonials.name")}>{content.testimonials.name}</strong>
            <small {...text("testimonials.role")}>{content.testimonials.role}</small>
            <p>★★★★★</p>
            <blockquote {...text("testimonials.quote")}>{content.testimonials.quote}</blockquote>
          </article>
        </div>
      </section>

      <section id="news" className="fb-news">
        <Heading eyebrow={content.news.eyebrow} title={content.news.title} eyebrowPath="news.eyebrow" titlePath="news.title" />
        <div className="fb-news-grid">
          {news.map((item, index) => (
            <article key={item.title}>
              <img src={item.image} alt={item.imageAlt} {...image(`news.items.${index}.image`, `news.items.${index}.imageAlt`)} />
              <div className="fb-date"><strong {...text(`news.items.${index}.date`)}>{item.date}</strong><span {...text(`news.items.${index}.month`)}>{item.month}</span></div>
              <p>By Admin · <span {...text(`news.items.${index}.category`)}>{item.category}</span></p>
              <h3 {...text(`news.items.${index}.title`)}>{item.title}</h3>
              <a href="#news">Read More <ArrowRight size={14} /></a>
            </article>
          ))}
        </div>
        <div className="fb-gallery">
          {gallery.map((item, index) => <img key={item.imageAlt} src={item.image} alt={item.imageAlt} {...image(`news.gallery.${index}.image`, `news.gallery.${index}.imageAlt`)} />)}
        </div>
      </section>

      <footer id="contact" className="fb-footer">
        <div className="fb-contact-band">
          <span><MapPin size={26} /><b>Address</b><em {...text("brand.address")}>{content.brand.address}</em></span>
          <span><Mail size={26} /><b>Send Email</b><em {...text("brand.email")}>{content.brand.email}</em></span>
          <span><Phone size={26} /><b>Call Emergency</b><em {...text("brand.phone")}>{content.brand.phone}</em></span>
        </div>
        <div className="fb-footer-grid">
          <div>
            <Logo content={content} />
            <p {...text("footer.intro")}>{content.footer.intro}</p>
          </div>
          <nav aria-label="Quick links">
            <h3 {...text("footer.quickTitle")}>{content.footer.quickTitle}</h3>
            {arr<string>(content.footer.links).map((item, index) => <a key={item} href="#home" {...text(`footer.links.${index}`)}>» {item}</a>)}
          </nav>
          <nav aria-label="Menu links">
            <h3 {...text("footer.menuTitle")}>{content.footer.menuTitle}</h3>
            {arr<string>(content.footer.menuLinks).map((item, index) => <a key={item} href="#menu" {...text(`footer.menuLinks.${index}`)}>» {item}</a>)}
          </nav>
          <form onSubmit={(event) => event.preventDefault()}>
            <h3 {...text("footer.contactTitle")}>{content.footer.contactTitle}</h3>
            {arr<string>(content.footer.hours).map((item, index) => <p key={item} {...text(`footer.hours.${index}`)}>{item}</p>)}
            <label>
              <span className="fb-sr">{content.footer.newsletterPlaceholder}</span>
              <input placeholder={content.footer.newsletterPlaceholder} />
              <button type="submit"><ArrowRight size={17} /></button>
            </label>
            <small {...text("footer.privacyLabel")}>{content.footer.privacyLabel}</small>
          </form>
        </div>
        <div className="fb-footer-bottom">
          <span {...text("brand.copyright")}>{content.brand.copyright}</span>
          <div>{arr<string>(content.footer.legal).map((item, index) => <a key={item} href="#home" {...text(`footer.legal.${index}`)}>{item}</a>)}</div>
        </div>
      </footer>
    </main>
  );
}
