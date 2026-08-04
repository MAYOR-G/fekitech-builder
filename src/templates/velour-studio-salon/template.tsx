"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useEffect, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type VelourData = typeof editableData;
type Page = "home" | "services" | "studio" | "team" | "care" | "book" | "accessibility";

const pages: Page[] = ["services", "studio", "team", "care", "book", "accessibility"];

export default function VelourStudioSalonTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as VelourData;
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    const root = document.querySelector('[data-template-id="velour-studio-salon"]');
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-vss-reveal]"));
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
    const next = pages.includes(target as Page) ? target as Page : "home";
    setPage(next);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div data-template-id="velour-studio-salon" className="velour-studio-salon">
      <header className="vss-header">
        <button type="button" onClick={(event) => go("home", event)} className="vss-logo">
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
      {page === "services" && <main className="vss-page"><Services content={content} /></main>}
      {page === "studio" && <Studio content={content} />}
      {page === "team" && <Team content={content} />}
      {page === "care" && <Care content={content} />}
      {page === "book" && <Booking content={content} />}
      {page === "accessibility" && <TextPage title={content.pages.accessibility.title} body={content.pages.accessibility.body} titlePath="pages.accessibility.title" bodyPath="pages.accessibility.body" />}
      <Footer content={content} go={go} />
    </div>
  );
}

function Home({ content, go }: { content: VelourData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <section className="vss-hero">
        <div className="vss-hero-copy" data-vss-reveal>
          <p data-editable-path="hero.kicker" data-editable-type="text">{content.hero.kicker}</p>
          <h1 data-editable-path="hero.title" data-editable-type="text">{content.hero.title}</h1>
          <span data-editable-path="hero.body" data-editable-type="text">{content.hero.body}</span>
          <a href={`#${content.hero.cta.href}`} onClick={(event) => go(content.hero.cta.href, event)} data-editable-path="hero.cta.label" data-editable-type="link" data-editable-href-path="hero.cta.href">{content.hero.cta.label}</a>
        </div>
        <div className="vss-hero-media">
          <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" data-editable-path="hero.image" data-editable-type="image" data-editable-alt-path="hero.imageAlt" />
        </div>
      </section>
      <Services content={content} />
      <TeamIntro content={content} go={go} />
      <Studio content={content} embedded />
    </main>
  );
}

function Services({ content }: { content: VelourData }) {
  return (
    <section className="vss-services" id="services" data-vss-reveal>
      <div className="vss-service-heading">
        <p data-editable-path="services.kicker" data-editable-type="text">{content.services.kicker}</p>
        <h2 data-editable-path="services.title" data-editable-type="text">{content.services.title}</h2>
        <span data-editable-path="services.body" data-editable-type="text">{content.services.body}</span>
      </div>
      <img src={content.services.image} alt={content.services.imageAlt} loading="lazy" data-editable-path="services.image" data-editable-type="image" data-editable-alt-path="services.imageAlt" />
      <div className="vss-service-list">
        {content.services.items.map((item, index) => (
          <article key={item.name}>
            <h3 data-editable-path={`services.items.${index}.name`} data-editable-type="text">{item.name}</h3>
            <p data-editable-path={`services.items.${index}.duration`} data-editable-type="text">{item.duration}</p>
            <strong data-editable-path={`services.items.${index}.price`} data-editable-type="text">{item.price}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeamIntro({ content, go }: { content: VelourData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <section className="vss-team-intro" data-vss-reveal>
      <img src={content.team.image} alt={content.team.imageAlt} loading="lazy" data-editable-path="team.image" data-editable-type="image" data-editable-alt-path="team.imageAlt" />
      <div>
        <p data-editable-path="team.kicker" data-editable-type="text">{content.team.kicker}</p>
        <h2 data-editable-path="team.title" data-editable-type="text">{content.team.title}</h2>
        <span data-editable-path="team.body" data-editable-type="text">{content.team.body}</span>
        <a href="#team" onClick={(event) => go("team", event)} data-editable-path="team.button" data-editable-type="link" data-editable-href-path="header.nav.2.href">{content.team.button}</a>
      </div>
    </section>
  );
}

function Studio({ content, embedded = false }: { content: VelourData; embedded?: boolean }) {
  const section = (
    <section className="vss-studio" data-vss-reveal>
      <div>
        <p data-editable-path="studio.kicker" data-editable-type="text">{content.studio.kicker}</p>
        <h1 data-editable-path="studio.title" data-editable-type="text">{content.studio.title}</h1>
      </div>
      <p data-editable-path="studio.body" data-editable-type="text">{content.studio.body}</p>
    </section>
  );
  return embedded ? section : <main className="vss-page">{section}</main>;
}

function Team({ content }: { content: VelourData }) {
  return (
    <main className="vss-page">
      <section className="vss-team-page">
        <img src={content.team.image} alt={content.team.imageAlt} loading="lazy" data-editable-path="team.image" data-editable-type="image" data-editable-alt-path="team.imageAlt" />
        <div>
          <p data-editable-path="team.kicker" data-editable-type="text">{content.team.kicker}</p>
          <h1 data-editable-path="team.title" data-editable-type="text">{content.team.title}</h1>
          <span data-editable-path="team.body" data-editable-type="text">{content.team.body}</span>
        </div>
      </section>
    </main>
  );
}

function Care({ content }: { content: VelourData }) {
  return (
    <main className="vss-page">
      <section className="vss-care">
        <div>
          <p data-editable-path="care.kicker" data-editable-type="text">{content.care.kicker}</p>
          <h1 data-editable-path="care.title" data-editable-type="text">{content.care.title}</h1>
          <span data-editable-path="care.body" data-editable-type="text">{content.care.body}</span>
        </div>
        <div className="vss-care-list">
          {content.care.items.map((item, index) => (
            <article key={item.title}>
              <h3 data-editable-path={`care.items.${index}.title`} data-editable-type="text">{item.title}</h3>
              <p data-editable-path={`care.items.${index}.body`} data-editable-type="text">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Booking({ content }: { content: VelourData }) {
  return (
    <main className="vss-page">
      <section className="vss-booking">
        <div>
          <h1 data-editable-path="booking.title" data-editable-type="text">{content.booking.title}</h1>
          <p data-editable-path="booking.body" data-editable-type="text">{content.booking.body}</p>
        </div>
        <form>
          <label><span data-editable-path="booking.nameLabel" data-editable-type="text">{content.booking.nameLabel}</span><input type="text" /></label>
          <label><span data-editable-path="booking.emailLabel" data-editable-type="text">{content.booking.emailLabel}</span><input type="email" /></label>
          <label><span data-editable-path="booking.messageLabel" data-editable-type="text">{content.booking.messageLabel}</span><textarea rows={5} /></label>
          <button type="button" data-editable-path="booking.button" data-editable-type="text">{content.booking.button}</button>
        </form>
      </section>
    </main>
  );
}

function TextPage({ title, body, titlePath, bodyPath }: { title: string; body: string; titlePath: string; bodyPath: string }) {
  return <main className="vss-page"><section className="vss-booking"><div><h1 data-editable-path={titlePath} data-editable-type="text">{title}</h1><p data-editable-path={bodyPath} data-editable-type="text">{body}</p></div></section></main>;
}

function Footer({ content, go }: { content: VelourData; go: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="vss-footer">
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
        <b data-editable-path="footer.noteTitle" data-editable-type="text">{content.footer.noteTitle}</b>
        <p data-editable-path="footer.noteBody" data-editable-type="text">{content.footer.noteBody}</p>
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
