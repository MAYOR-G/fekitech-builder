"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type EstateData = typeof editableData;
type Page = "home" | "homes" | "valuation" | "contact" | "privacy";

export default function HarrowValeEstatesTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as EstateData;
  const [page, setPage] = useState<Page>("home");
  const go = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = ["homes", "valuation", "contact", "privacy"].includes(target) ? target as Page : "home";
    setPage(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  return (
    <div data-template-id="harrow-vale-estates" className="harrow-vale-estates">
      <header className="hve-header">
        <button type="button" onClick={(event) => go("home", event)}>
          <strong data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</strong>
          <span data-editable-path="brand.descriptor" data-editable-type="text">{content.brand.descriptor}</span>
        </button>
        <nav aria-label="Main navigation">
          {content.header.nav.map((link, index) => (
            <a key={link.href} href={`#${link.href}`} onClick={(event) => go(link.href, event)} data-editable-path={`header.nav.${index}.label`} data-editable-type="link" data-editable-href-path={`header.nav.${index}.href`}>{link.label}</a>
          ))}
        </nav>
      </header>
      {page === "home" && <Home content={content} go={go} />}
      {page === "homes" && <main className="hve-page"><Listings content={content} /></main>}
      {page === "valuation" && <Valuation content={content} />}
      {page === "contact" && <Contact content={content} />}
      {page === "privacy" && <TextPage title={content.pages?.privacy?.title} body={content.pages?.privacy?.body} />}
      <Footer content={content} go={go} />
    </div>
  );
}

function Home({ content, go }: { content: EstateData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <section className="hve-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="hve-hero-card">
          <p data-editable-path="hero.eyebrow" data-editable-type="text">{content.hero.eyebrow}</p>
          <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <span data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</span>
          <a href={`#${content.hero.cta.href}`} onClick={(event) => go(content.hero.cta.href, event)} data-editable-path="hero.cta.label" data-editable-type="link" data-editable-href-path="hero.cta.href">{content.hero.cta.label}</a>
        </div>
      </section>
      <Listings content={content} />
      <section className="hve-valuation">
        <h2 data-editable-path="valuation.title" data-editable-type="text">{content.valuation.title}</h2>
        <p data-editable-path="valuation.body" data-editable-type="text">{content.valuation.body}</p>
        <button type="button" data-editable-path="valuation.button" data-editable-type="text">{content.valuation.button}</button>
      </section>
    </main>
  );
}

function Listings({ content }: { content: EstateData }) {
  return (
    <section className="hve-listings" id="homes">
      <div className="hve-listing-image">
        <img src={content.listings.image} alt={content.listings.imageAlt} loading="lazy" data-editable-path="listings.image" data-editable-type="image" data-editable-alt-path="listings.imageAlt" />
      </div>
      <div>
        <h2 data-editable-path="listings.title" data-editable-type="text">{content.listings.title}</h2>
        {content.listings.items.map((item, index) => (
          <article key={item.name}>
            <h3 data-editable-path={`listings.items.${index}.name`} data-editable-type="text">{item.name}</h3>
            <p data-editable-path={`listings.items.${index}.meta`} data-editable-type="text">{item.meta}</p>
            <strong data-editable-path={`listings.items.${index}.price`} data-editable-type="text">{item.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function Valuation({ content }: { content: EstateData }) {
  return <main className="hve-page"><section className="hve-valuation"><h1 data-editable-path="valuation.title" data-editable-type="text">{content.valuation.title}</h1><p data-editable-path="valuation.body" data-editable-type="text">{content.valuation.body}</p><button type="button" data-editable-path="valuation.button" data-editable-type="text">{content.valuation.button}</button></section></main>;
}

function Contact({ content }: { content: EstateData }) {
  return (
    <main className="hve-page">
      <section className="hve-contact">
        <div><h1 data-editable-path="contact.title" data-editable-type="text">{content.contact.title}</h1><p data-editable-path="contact.body" data-editable-type="text">{content.contact.body}</p></div>
        <form>
          <label><span data-editable-path="contact.nameLabel" data-editable-type="text">{content.contact.nameLabel}</span><input type="text" /></label>
          <label><span data-editable-path="contact.emailLabel" data-editable-type="text">{content.contact.emailLabel}</span><input type="email" /></label>
          <label><span data-editable-path="contact.messageLabel" data-editable-type="text">{content.contact.messageLabel}</span><textarea rows={5} /></label>
          <button type="button" data-editable-path="contact.button" data-editable-type="text">{content.contact.button}</button>
        </form>
      </section>
    </main>
  );
}

function TextPage({ title, body }: { title: string; body: string }) {
  return <main className="hve-page"><section className="hve-valuation"><h1>{title}</h1><p>{body}</p></section></main>;
}

function Footer({ content, go }: { content: EstateData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="hve-footer">
      <strong data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</strong>
      <p><span data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</span><br /><span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span><br /><span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span></p>
      <nav>
        {content.footer.links.map((link, index) => (
          <a key={link.href} href={`#${link.href}`} onClick={(event) => go(link.href, event)} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
    </footer>
  );
}
