"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useEffect, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type AureaData = typeof editableData;
type Page = "home" | "shop" | "journal" | "visit" | "returns" | "privacy";

export default function AureaObjectsShopTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as AureaData;
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    const root = document.querySelector('[data-template-id="aurea-objects-shop"]');
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-aos-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const go = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = ["shop", "journal", "visit", "returns", "privacy"].includes(target) ? target as Page : "home";
    setPage(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div data-template-id="aurea-objects-shop" className="aurea-objects-shop">
      <header className="aos-header">
        <button type="button" onClick={(event) => go("home", event)}>
          <strong data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</strong>
          <span data-editable-path="brand.descriptor" data-editable-type="text">{content.brand.descriptor}</span>
        </button>
        <nav aria-label="Main navigation">
          {content.header.nav.map((link, index) => (
            <a key={link.href} href={`#${link.href}`} onClick={(event) => go(link.href, event)} data-editable-path={`header.nav.${index}.label`} data-editable-type="link" data-editable-href-path={`header.nav.${index}.href`}>{link.label}</a>
          ))}
        </nav>
        <a href="#shop" onClick={(event) => go("shop", event)} data-editable-path="header.cartLabel" data-editable-type="link" data-editable-href-path="header.nav.0.href">{content.header.cartLabel}</a>
      </header>
      {page === "home" && <Home content={content} go={go} />}
      {page === "shop" && <Shop content={content} />}
      {page === "journal" && <TextPage title={content.journal.title} body={content.journal.body} />}
      {page === "visit" && <Visit content={content} />}
      {(page === "returns" || page === "privacy") && (
        <TextPage title={content.pages?.[page]?.title} body={content.pages?.[page]?.body} />
      )}
      <Footer content={content} go={go} />
    </div>
  );
}

function Home({ content, go }: { content: AureaData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <section className="aos-hero">
        <div className="aos-hero-copy" data-aos-reveal>
          <p data-editable-path="hero.eyebrow" data-editable-type="text">{content.hero.eyebrow}</p>
          <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <span data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</span>
          <a href={`#${content.hero.cta.href}`} onClick={(event) => go(content.hero.cta.href, event)} data-editable-path="hero.cta.label" data-editable-type="link" data-editable-href-path="hero.cta.href">{content.hero.cta.label}</a>
        </div>
        <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
      </section>
      <ProductSection content={content} />
      <section className="aos-manifesto" data-aos-reveal>
        <h2 data-editable-path="journal.title" data-editable-type="text">{content.journal.title}</h2>
        <p data-editable-path="journal.body" data-editable-type="text">{content.journal.body}</p>
      </section>
    </main>
  );
}

function ProductSection({ content }: { content: AureaData }) {
  return (
    <section className="aos-products" id="shop" data-aos-reveal>
      <div>
        <p data-editable-path="products.body" data-editable-type="text">{content.products.body}</p>
        <h2 data-editable-path="products.title" data-editable-type="text">{content.products.title}</h2>
      </div>
      <img src={content.products.image} alt={content.products.imageAlt} loading="lazy" data-editable-path="products.image" data-editable-type="image" data-editable-alt-path="products.imageAlt" />
      <div className="aos-product-list">
        {content.products.items.map((item, index) => (
          <article key={item.name}>
            <span data-editable-path={`products.items.${index}.tag`} data-editable-type="text">{item.tag}</span>
            <h3 data-editable-path={`products.items.${index}.name`} data-editable-type="text">{item.name}</h3>
            <strong data-editable-path={`products.items.${index}.price`} data-editable-type="text">{item.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Shop({ content }: { content: AureaData }) {
  return <main className="aos-page"><ProductSection content={content} /></main>;
}

function Visit({ content }: { content: AureaData }) {
  return (
    <main className="aos-page">
      <section className="aos-visit">
        <h1 data-editable-path="visit.title" data-editable-type="text">{content.visit.title}</h1>
        <p data-editable-path="visit.body" data-editable-type="text">{content.visit.body}</p>
        <button type="button" data-editable-path="visit.button" data-editable-type="text">{content.visit.button}</button>
      </section>
    </main>
  );
}

function TextPage({ title, body }: { title: string; body: string }) {
  return <main className="aos-page"><section className="aos-visit"><h1>{title}</h1><p>{body}</p></section></main>;
}

function Footer({ content, go }: { content: AureaData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="aos-footer">
      <div>
        <h2 data-editable-path="footer.newsletterTitle" data-editable-type="text">{content.footer.newsletterTitle}</h2>
        <p data-editable-path="footer.newsletterBody" data-editable-type="text">{content.footer.newsletterBody}</p>
      </div>
      <form>
        <label><span data-editable-path="footer.emailLabel" data-editable-type="text">{content.footer.emailLabel}</span><input type="email" /></label>
      </form>
      <address><span data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</span><br /><span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span><br /><span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span></address>
      <nav>
        {content.footer.links.map((link, index) => (
          <a key={link.href} href={`#${link.href}`} onClick={(event) => go(link.href, event)} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
    </footer>
  );
}
