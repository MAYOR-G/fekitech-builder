"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type EstateData = typeof editableData;
type Page = "home" | "homes" | "neighbourhoods" | "valuation" | "about" | "contact" | "privacy";

const pages: Page[] = ["homes", "neighbourhoods", "valuation", "about", "contact", "privacy"];

export default function HarrowValeEstatesTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as EstateData;
  const [page, setPage] = useState<Page>("home");
  const go = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = pages.includes(target as Page) ? target as Page : "home";
    setPage(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  return (
    <div data-template-id="harrow-vale-estates" className="harrow-vale-estates">
      <header className="hve-header">
        <button type="button" onClick={(event) => go("home", event)} className="hve-logo">
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
      {page === "neighbourhoods" && <Neighbourhoods content={content} />}
      {page === "valuation" && <Valuation content={content} />}
      {page === "about" && <About content={content} />}
      {page === "contact" && <Contact content={content} />}
      {page === "privacy" && <TextPage title={content.pages.privacy.title} body={content.pages.privacy.body} titlePath="pages.privacy.title" bodyPath="pages.privacy.body" />}
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
      <ValuationPanel content={content} />
      <NeighbourhoodPanel content={content} go={go} />
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
        <p data-editable-path="listings.kicker" data-editable-type="text">{content.listings.kicker}</p>
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

function ValuationPanel({ content }: { content: EstateData }) {
  return (
    <section className="hve-valuation">
      <div>
        <p data-editable-path="valuation.kicker" data-editable-type="text">{content.valuation.kicker}</p>
        <h2 data-editable-path="valuation.title" data-editable-type="text">{content.valuation.title}</h2>
        <span data-editable-path="valuation.body" data-editable-type="text">{content.valuation.body}</span>
        <button type="button" data-editable-path="valuation.button" data-editable-type="text">{content.valuation.button}</button>
      </div>
      <img src={content.valuation.image} alt={content.valuation.imageAlt} loading="lazy" data-editable-path="valuation.image" data-editable-type="image" data-editable-alt-path="valuation.imageAlt" />
    </section>
  );
}

function NeighbourhoodPanel({ content, go }: { content: EstateData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <section className="hve-neighbourhoods">
      <div>
        <p data-editable-path="neighbourhoods.kicker" data-editable-type="text">{content.neighbourhoods.kicker}</p>
        <h2 data-editable-path="neighbourhoods.title" data-editable-type="text">{content.neighbourhoods.title}</h2>
        <span data-editable-path="neighbourhoods.body" data-editable-type="text">{content.neighbourhoods.body}</span>
      </div>
      <div className="hve-area-list">
        {content.neighbourhoods.areas.map((area, index) => (
          <article key={area.name}>
            <h3 data-editable-path={`neighbourhoods.areas.${index}.name`} data-editable-type="text">{area.name}</h3>
            <p data-editable-path={`neighbourhoods.areas.${index}.body`} data-editable-type="text">{area.body}</p>
          </article>
        ))}
        <a href="#neighbourhoods" onClick={(event) => go("neighbourhoods", event)} data-editable-path="neighbourhoods.button" data-editable-type="link" data-editable-href-path="header.nav.1.href">{content.neighbourhoods.button}</a>
      </div>
    </section>
  );
}

function Neighbourhoods({ content }: { content: EstateData }) {
  return <main className="hve-page"><NeighbourhoodPanel content={content} go={() => undefined} /></main>;
}

function Valuation({ content }: { content: EstateData }) {
  return <main className="hve-page"><ValuationPanel content={content} /></main>;
}

function About({ content }: { content: EstateData }) {
  return (
    <main className="hve-page">
      <section className="hve-about">
        <div>
          <p data-editable-path="about.kicker" data-editable-type="text">{content.about.kicker}</p>
          <h1 data-editable-path="about.title" data-editable-type="text">{content.about.title}</h1>
          <span data-editable-path="about.body" data-editable-type="text">{content.about.body}</span>
        </div>
        <img src={content.about.image} alt={content.about.imageAlt} loading="lazy" data-editable-path="about.image" data-editable-type="image" data-editable-alt-path="about.imageAlt" />
      </section>
    </main>
  );
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

function TextPage({ title, body, titlePath, bodyPath }: { title: string; body: string; titlePath: string; bodyPath: string }) {
  return <main className="hve-page"><section className="hve-contact"><div><h1 data-editable-path={titlePath} data-editable-type="text">{title}</h1><p data-editable-path={bodyPath} data-editable-type="text">{body}</p></div></section></main>;
}

function Footer({ content, go }: { content: EstateData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="hve-footer">
      <div>
        <strong data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</strong>
        <p data-editable-path="brand.descriptor" data-editable-type="text">{content.brand.descriptor}</p>
      </div>
      <address>
        <b data-editable-path="footer.locationTitle" data-editable-type="text">{content.footer.locationTitle}</b>
        <span data-editable-path="brand.address" data-editable-type="text">{content.brand.address}</span>
        <span data-editable-path="footer.hours" data-editable-type="text">{content.footer.hours}</span>
        <span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span>
        <span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span>
      </address>
      <div>
        <b data-editable-path="footer.areasTitle" data-editable-type="text">{content.footer.areasTitle}</b>
        <p data-editable-path="footer.areasBody" data-editable-type="text">{content.footer.areasBody}</p>
      </div>
      <nav>
        {content.footer.links.map((link, index) => (
          <a key={link.href} href={`#${link.href}`} onClick={(event) => go(link.href, event)} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>{link.label}</a>
        ))}
      </nav>
      <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
    </footer>
  );
}
