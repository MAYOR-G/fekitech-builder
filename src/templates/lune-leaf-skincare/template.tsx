"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import {
  CheckCircle,
  Heart,
  Leaf,
  Package,
  SealCheck,
  ShoppingBag,
  Sparkle,
  Star,
  Truck,
  User,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type LuneLeafData = typeof editableData;
type Page = "home" | "shop" | "collections" | "about" | "journal" | "contact";
type ContentPage = Exclude<Page, "home">;

const pages: Page[] = ["shop", "collections", "about", "journal", "contact"];

const trustIcons = [Leaf, Heart, SealCheck, Truck];

export default function LuneLeafSkincareTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as LuneLeafData;
  const [page, setPage] = useState<Page>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("page") || window.location.hash.replace("#", "");
    if (!pages.includes(requested as Page)) return undefined;
    const frame = window.requestAnimationFrame(() => setPage(requested as ContentPage));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const go = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = pages.includes(target as Page) ? (target as ContentPage) : "home";
    setPage(next);
    setMenuOpen(false);
    setSent(false);
    if (next === "home") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    } else {
      window.history.replaceState(null, "", `#${next}`);
    }
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div data-template-id="lune-leaf-skincare" className="lune-leaf-skincare">
      <Header content={content} page={page} menuOpen={menuOpen} setMenuOpen={setMenuOpen} go={go} />
      {page === "home" ? <Home content={content} go={go} /> : <InnerPage content={content} page={page as ContentPage} go={go} sent={sent} setSent={setSent} />}
      <Footer content={content} go={go} />
    </div>
  );
}

function Header({
  content,
  page,
  menuOpen,
  setMenuOpen,
  go,
}: {
  content: LuneLeafData;
  page: Page;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  go: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <header className="lls-header">
      <a className="lls-brand" href="#home" onClick={(event) => go("home", event)} aria-label="Lune & Leaf home">
        <span data-editable-path="brand.monogram" data-editable-type="text">{content.brand.monogram}</span>
      </a>
      <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
        {content.header.nav.map((item, index) => (
          <a
            key={item.href}
            className={page === item.href ? "is-active" : ""}
            href={`#${item.href}`}
            onClick={(event) => go(item.href, event)}
            data-editable-path={`header.nav.${index}.label`}
            data-editable-type="link"
            data-editable-href-path={`header.nav.${index}.href`}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="lls-header-actions">
        <a href="#account" aria-label={content.header.accountLabel} data-editable-path="header.accountLabel" data-editable-type="text"><User size={15} weight="regular" /></a>
        <a href="#shop" onClick={(event) => go("shop", event)} aria-label={content.header.cartLabel} data-editable-path="header.cartLabel" data-editable-type="link" data-editable-href-path="header.nav.0.href"><ShoppingBag size={15} weight="regular" /></a>
        <button type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Home({ content, go }: { content: LuneLeafData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <section className="lls-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="lls-hero-copy">
          <p data-editable-path="hero.eyebrow" data-editable-type="text">{content.hero.eyebrow}</p>
          <h1>
            <span data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</span>
            <em data-editable-path="hero.emphasis" data-editable-type="text">{content.hero.emphasis}</em>
          </h1>
          <span data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</span>
          <a href={`#${content.hero.cta.href}`} onClick={(event) => go(content.hero.cta.href, event)} data-editable-path="hero.cta.label" data-editable-type="link" data-editable-href-path="hero.cta.href">{content.hero.cta.label}</a>
        </div>
      </section>
      <TrustStrip content={content} />
      <section className="lls-statement">
        <h2>
          <span data-editable-path="statement.lineOne" data-editable-type="text">{content.statement.lineOne}</span>
          <span data-editable-path="statement.lineTwo" data-editable-type="text">{content.statement.lineTwo}</span>
        </h2>
      </section>
      <Products content={content} go={go} />
      <EcoPanel content={content} />
      <Benefits content={content} />
      <TestimonialProduct content={content} />
      <Newsletter content={content} />
      <InstagramStrip content={content} />
    </main>
  );
}

function TrustStrip({ content }: { content: LuneLeafData }) {
  return (
    <section className="lls-trust" aria-label="Skincare benefits">
      {content.trust.map((item, index) => {
        const Icon = trustIcons[index] ?? Leaf;
        return (
          <article key={item.title}>
            <Icon size={18} weight="regular" />
            <h2 data-editable-path={`trust.${index}.title`} data-editable-type="text">{item.title}</h2>
            <p data-editable-path={`trust.${index}.body`} data-editable-type="text">{item.body}</p>
          </article>
        );
      })}
    </section>
  );
}

function Products({ content, go }: { content: LuneLeafData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <section className="lls-products" id="shop">
      <div className="lls-product-tabs">
        {content.products.tabs.map((tab, index) => (
          <a key={tab.label} className={index === 0 ? "is-active" : ""} href={`#${tab.href}`} onClick={(event) => go(tab.href, event)} data-editable-path={`products.tabs.${index}.label`} data-editable-type="link" data-editable-href-path={`products.tabs.${index}.href`}>{tab.label}</a>
        ))}
      </div>
      <div className="lls-product-grid">
        {content.products.items.map((item, index) => (
          <article key={item.name} className={`lls-product-card is-${item.type}`}>
            <button type="button" aria-label={`Add ${item.name} to favourites`}><Heart size={13} /></button>
            <ProductBottle product={item} index={index} />
            <h3 data-editable-path={`products.items.${index}.name`} data-editable-type="text">{item.name}</h3>
            <p data-editable-path={`products.items.${index}.price`} data-editable-type="text">{item.price}</p>
          </article>
        ))}
      </div>
      <a className="lls-text-link" href={`#${content.products.link.href}`} onClick={(event) => go(content.products.link.href, event)} data-editable-path="products.link.label" data-editable-type="link" data-editable-href-path="products.link.href">{content.products.link.label}</a>
    </section>
  );
}

function ProductBottle({ product, index }: { product: LuneLeafData["products"]["items"][number]; index: number }) {
  return (
    <img
      className={`lls-product-image is-${product.type}`}
      src={product.image}
      alt={product.imageAlt}
      loading="lazy"
      data-editable-path={`products.items.${index}.image`}
      data-editable-type="image"
      data-editable-alt-path={`products.items.${index}.imageAlt`}
    />
  );
}

function EcoPanel({ content }: { content: LuneLeafData }) {
  return (
    <section className="lls-eco">
      <img src={content.eco.image} alt={content.eco.imageAlt} loading="lazy" data-editable-path="eco.image" data-editable-type="image" data-editable-alt-path="eco.imageAlt" />
      <div>
        <h2><span data-editable-path="eco.title" data-editable-type="text">{content.eco.title}</span> <em data-editable-path="eco.emphasis" data-editable-type="text">{content.eco.emphasis}</em></h2>
        <p data-editable-path="eco.body" data-editable-type="text">{content.eco.body}</p>
        <ul>
          {content.eco.points.map((point, index) => (
            <li key={point}><CheckCircle size={15} weight="regular" /><span data-editable-path={`eco.points.${index}`} data-editable-type="text">{point}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Benefits({ content }: { content: LuneLeafData }) {
  return (
    <section className="lls-benefits">
      <div className="lls-section-title">
        <h2 data-editable-path="benefits.title" data-editable-type="text">{content.benefits.title}</h2>
        <p><Star size={14} weight="fill" /><span data-editable-path="benefits.rating" data-editable-type="text">{content.benefits.rating}</span></p>
      </div>
      <div className="lls-benefit-grid">
        <figure>
          <img src={content.benefits.image} alt={content.benefits.imageAlt} loading="lazy" data-editable-path="benefits.image" data-editable-type="image" data-editable-alt-path="benefits.imageAlt" />
          <figcaption>
            <SealCheck size={15} />
            <strong data-editable-path="benefits.cards.0.title" data-editable-type="text">{content.benefits.cards[0].title}</strong>
            <span data-editable-path="benefits.cards.0.body" data-editable-type="text">{content.benefits.cards[0].body}</span>
          </figcaption>
        </figure>
        <div className="lls-benefit-stack">
          <article>
            <Package size={22} />
            <h3 data-editable-path="benefits.cards.1.title" data-editable-type="text">{content.benefits.cards[1].title}</h3>
            <p data-editable-path="benefits.cards.1.body" data-editable-type="text">{content.benefits.cards[1].body}</p>
            <ProductMini />
          </article>
          <article>
            <Leaf size={32} />
            <h3 data-editable-path="benefits.cards.2.title" data-editable-type="text">{content.benefits.cards[2].title}</h3>
            <p data-editable-path="benefits.cards.2.body" data-editable-type="text">{content.benefits.cards[2].body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProductMini() {
  return <img className="lls-mini-bottle" src="/templates/lune-leaf-skincare/assets/citrus-foam-dropper.png" alt="" loading="lazy" />;
}

function TestimonialProduct({ content }: { content: LuneLeafData }) {
  return (
    <section className="lls-testimonial">
      <Sparkle size={24} weight="duotone" />
      <blockquote data-editable-path="testimonial.quote" data-editable-type="text">{content.testimonial.quote}</blockquote>
      <div className="lls-stars" aria-label="Five star rating">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} weight="fill" />)}</div>
      <cite><strong data-editable-path="testimonial.name" data-editable-type="text">{content.testimonial.name}</strong><span data-editable-path="testimonial.role" data-editable-type="text">{content.testimonial.role}</span></cite>
      <div className="lls-floating-product">
        <span data-editable-path="testimonial.badgeLeft" data-editable-type="text">{content.testimonial.badgeLeft}</span>
        <img src={content.testimonial.productImage} alt={content.testimonial.productImageAlt} loading="lazy" data-editable-path="testimonial.productImage" data-editable-type="image" data-editable-alt-path="testimonial.productImageAlt" />
        <span data-editable-path="testimonial.badgeRight" data-editable-type="text">{content.testimonial.badgeRight}</span>
      </div>
    </section>
  );
}

function Newsletter({ content }: { content: LuneLeafData }) {
  return (
    <section className="lls-newsletter">
      <div>
        <h2 data-editable-path="newsletter.title" data-editable-type="text">{content.newsletter.title}</h2>
        <p data-editable-path="newsletter.body" data-editable-type="text">{content.newsletter.body}</p>
        <form>
          <label>
            <span data-editable-path="newsletter.emailLabel" data-editable-type="text">{content.newsletter.emailLabel}</span>
            <input type="email" aria-label={content.newsletter.emailLabel} />
          </label>
          <button type="submit" data-editable-path="newsletter.buttonLabel" data-editable-type="text">{content.newsletter.buttonLabel}</button>
        </form>
      </div>
      <img src={content.newsletter.image} alt={content.newsletter.imageAlt} loading="lazy" data-editable-path="newsletter.image" data-editable-type="image" data-editable-alt-path="newsletter.imageAlt" />
    </section>
  );
}

function InstagramStrip({ content }: { content: LuneLeafData }) {
  return (
    <section className="lls-instagram">
      <h2 data-editable-path="instagram.title" data-editable-type="text">{content.instagram.title}</h2>
      <div>
        {content.instagram.items.map((item, index) => (
          <img key={`${item.image}-${index}`} src={item.image} alt={item.alt} loading="lazy" data-editable-path={`instagram.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`instagram.items.${index}.alt`} />
        ))}
      </div>
    </section>
  );
}

function InnerPage({
  content,
  page,
  go,
  sent,
  setSent,
}: {
  content: LuneLeafData;
  page: ContentPage;
  go: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
  sent: boolean;
  setSent: (value: boolean) => void;
}) {
  const pageData = content.pages[page];
  const isContact = page === "contact";

  return (
    <main className="lls-page">
      <section className="lls-page-hero">
        <div>
          <h1 data-editable-path={`pages.${page}.title`} data-editable-type="text">{pageData.title}</h1>
          <p data-editable-path={`pages.${page}.body`} data-editable-type="text">{pageData.body}</p>
        </div>
        <img src={pageData.image} alt={pageData.imageAlt} loading="eager" data-editable-path={`pages.${page}.image`} data-editable-type="image" data-editable-alt-path={`pages.${page}.imageAlt`} />
      </section>
      {isContact ? (
        <section className="lls-contact-panel">
          <div>
            <h2 data-editable-path="pages.contact.formTitle" data-editable-type="text">{content.pages.contact.formTitle}</h2>
            <a href={content.brand.emailHref} data-editable-path="brand.email" data-editable-type="link" data-editable-href-path="brand.emailHref">{content.brand.email}</a>
            <a href={content.brand.phoneHref} data-editable-path="brand.phone" data-editable-type="link" data-editable-href-path="brand.phoneHref">{content.brand.phone}</a>
            <address data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</address>
          </div>
          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
            <label><span data-editable-path="pages.contact.nameLabel" data-editable-type="text">{content.pages.contact.nameLabel}</span><input required /></label>
            <label><span data-editable-path="pages.contact.emailLabel" data-editable-type="text">{content.pages.contact.emailLabel}</span><input type="email" required /></label>
            <label><span data-editable-path="pages.contact.messageLabel" data-editable-type="text">{content.pages.contact.messageLabel}</span><textarea rows={5} required /></label>
            <button type="submit" data-editable-path="pages.contact.buttonLabel" data-editable-type="text">{content.pages.contact.buttonLabel}</button>
            {sent && <p role="status" data-editable-path="pages.contact.success" data-editable-type="text">{content.pages.contact.success}</p>}
          </form>
        </section>
      ) : (
        <section className="lls-page-products">
          <Products content={content} go={go} />
        </section>
      )}
    </main>
  );
}

function Footer({ content, go }: { content: LuneLeafData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="lls-footer">
      <div className="lls-footer-grid">
        <div>
          <strong data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</strong>
          <p data-editable-path="brand.strapline" data-editable-type="text">{content.brand.strapline}</p>
          <small data-editable-path="footer.legal" data-editable-type="text">{content.footer.legal}</small>
        </div>
        {content.footer.columns.map((column, columnIndex) => (
          <nav key={column.title}>
            <b data-editable-path={`footer.columns.${columnIndex}.title`} data-editable-type="text">{column.title}</b>
            {column.links.map((link, linkIndex) => (
              <a key={link.label} href={`#${link.href}`} onClick={(event) => go(link.href, event)} data-editable-path={`footer.columns.${columnIndex}.links.${linkIndex}.label`} data-editable-type="link" data-editable-href-path={`footer.columns.${columnIndex}.links.${linkIndex}.href`}>{link.label}</a>
            ))}
          </nav>
        ))}
        <nav>
          <b>Follow</b>
          {content.footer.social.map((link, index) => (
            <a key={link.label} href={link.href} data-editable-path={`footer.social.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.social.${index}.href`}>{link.label}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
