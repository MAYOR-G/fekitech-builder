"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useEffect, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type ChurchData = typeof editableData;
type Page = "home" | "sundays" | "groups" | "visit" | "privacy" | "safeguarding";

export default function EmberGraceChurchTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as ChurchData;
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    const root = document.querySelector('[data-template-id="ember-grace-church"]');
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-egc-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const go = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = ["sundays", "groups", "visit", "privacy", "safeguarding"].includes(target) ? target as Page : "home";
    setPage(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div data-template-id="ember-grace-church" className="ember-grace-church">
      <header className="egc-header">
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
      {page === "sundays" && <main className="egc-page"><Sundays content={content} /></main>}
      {page === "groups" && <main className="egc-page"><Groups content={content} /></main>}
      {page === "visit" && <Visit content={content} />}
      {(page === "privacy" || page === "safeguarding") && (
        <TextPage title={content.pages?.[page]?.title} body={content.pages?.[page]?.body} />
      )}
      <Footer content={content} go={go} />
    </div>
  );
}

function Home({ content, go }: { content: ChurchData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <section className="egc-hero">
        <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        <div className="egc-hero-copy" data-egc-reveal>
          <p data-editable-path="hero.kicker" data-editable-type="text">{content.hero.kicker}</p>
          <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <span data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</span>
          <a href={`#${content.hero.cta.href}`} onClick={(event) => go(content.hero.cta.href, event)} data-editable-path="hero.cta.label" data-editable-type="link" data-editable-href-path="hero.cta.href">{content.hero.cta.label}</a>
        </div>
      </section>
      <Sundays content={content} />
      <Groups content={content} />
    </main>
  );
}

function Sundays({ content }: { content: ChurchData }) {
  return (
    <section className="egc-sundays" id="sundays" data-egc-reveal>
      <div>
        <h2 data-editable-path="sundays.title" data-editable-type="text">{content.sundays.title}</h2>
        <p data-editable-path="sundays.body" data-editable-type="text">{content.sundays.body}</p>
      </div>
      <div className="egc-times">
        {content.sundays.times.map((item, index) => (
          <article key={item.label}>
            <strong data-editable-path={`sundays.times.${index}.time`} data-editable-type="text">{item.time}</strong>
            <span data-editable-path={`sundays.times.${index}.label`} data-editable-type="text">{item.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Groups({ content }: { content: ChurchData }) {
  return (
    <section className="egc-groups" id="groups" data-egc-reveal>
      <img src={content.groups.image} alt={content.groups.imageAlt} loading="lazy" data-editable-path="groups.image" data-editable-type="image" data-editable-alt-path="groups.imageAlt" />
      <div>
        <h2 data-editable-path="groups.title" data-editable-type="text">{content.groups.title}</h2>
        <p data-editable-path="groups.body" data-editable-type="text">{content.groups.body}</p>
        {content.groups.items.map((item, index) => (
          <article key={item.name}>
            <h3 data-editable-path={`groups.items.${index}.name`} data-editable-type="text">{item.name}</h3>
            <span data-editable-path={`groups.items.${index}.detail`} data-editable-type="text">{item.detail}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Visit({ content }: { content: ChurchData }) {
  return (
    <main className="egc-page">
      <section className="egc-visit">
        <div><h1 data-editable-path="visit.title" data-editable-type="text">{content.visit.title}</h1><p data-editable-path="visit.body" data-editable-type="text">{content.visit.body}</p></div>
        <form>
          <label><span data-editable-path="visit.nameLabel" data-editable-type="text">{content.visit.nameLabel}</span><input type="text" /></label>
          <label><span data-editable-path="visit.emailLabel" data-editable-type="text">{content.visit.emailLabel}</span><input type="email" /></label>
          <label><span data-editable-path="visit.messageLabel" data-editable-type="text">{content.visit.messageLabel}</span><textarea rows={5} /></label>
          <button type="button" data-editable-path="visit.button" data-editable-type="text">{content.visit.button}</button>
        </form>
      </section>
    </main>
  );
}

function TextPage({ title, body }: { title: string; body: string }) {
  return <main className="egc-page"><section className="egc-visit"><div><h1>{title}</h1><p>{body}</p></div></section></main>;
}

function Footer({ content, go }: { content: ChurchData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="egc-footer">
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
