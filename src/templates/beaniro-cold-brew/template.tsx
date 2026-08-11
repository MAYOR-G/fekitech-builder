"use client";

import { CaretDown, List, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useMemo, useState, type CSSProperties } from "react";
import editableData from "./editable.json";
import "./styles.css";

type BeaniroData = typeof editableData;

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function BeanMark() {
  return <span className="bn-mark" aria-hidden="true"><i /><b /></span>;
}

export default function BeaniroColdBrewTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as BeaniroData;
  const [menuOpen, setMenuOpen] = useState(false);
  const themeStyle = useMemo(() => ({
    "--bn-page": content.theme.colors.page,
    "--bn-paper": content.theme.colors.paper,
    "--bn-card": content.theme.colors.card,
    "--bn-ink": content.theme.colors.ink,
    "--bn-body": content.theme.colors.body,
    "--bn-muted": content.theme.colors.muted,
    "--bn-accent": content.theme.colors.accent,
    "--bn-dark": content.theme.colors.dark,
    "--bn-dark-text": content.theme.colors.darkText,
    "--bn-line": content.theme.colors.line,
    "--bn-heading": content.theme.typography.heading,
    "--bn-body-font": content.theme.typography.body,
  }) as CSSProperties, [content.theme]);

  return (
    <div className="beaniro-cold-brew" data-template-id="beaniro-cold-brew" style={themeStyle}>
      <div className="bn-announcement" {...editableText("brand.announcement")}>{content.brand.announcement}</div>
      <header className="bn-header">
        <a className="bn-logo" href="#bn-top"><BeanMark /><span {...editableText("brand.name")}>{content.brand.name}</span></a>
        <nav className={menuOpen ? "bn-nav is-open" : "bn-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link, index) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}>{link.label}</a>
          ))}
        </nav>
        <a className="bn-button bn-nav-button" href={content.navigation.buttonHref} {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}>{content.navigation.buttonLabel}</a>
        <button className="bn-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X weight="bold" /> : <List weight="bold" />}
        </button>
      </header>

      <main id="bn-top">
        <section className="bn-hero">
          <p className="bn-kicker" {...editableText("hero.kicker")}>{content.hero.kicker}</p>
          <h1 {...editableText("hero.title")}>{content.hero.title}</h1>
          <div className="bn-hero-art">
            <img className="bn-hero-splash" src={content.hero.splashImage} alt={content.hero.splashAlt} aria-hidden="true" {...editableImage("hero.splashImage", "hero.splashAlt")} />
            <img className="bn-hero-cup" src={content.hero.image} alt={content.hero.imageAlt} {...editableImage("hero.image", "hero.imageAlt")} />
          </div>
          <p {...editableText("hero.description")}>{content.hero.description}</p>
          <a className="bn-button" href={content.hero.buttonHref} {...editableLink("hero.buttonLabel", "hero.buttonHref")}>{content.hero.buttonLabel}</a>
          <aside className="bn-sticky-card" aria-label="Quick order links">
            <a href="#bn-menu">Explore flavours</a>
            <a href="#bn-menu">Popular drinks</a>
            <a href="#bn-footer">Find us</a>
          </aside>
        </section>

        <section className="bn-section bn-menu-section" id="bn-menu">
          <div className="bn-section-head">
            <div><p className="bn-kicker" {...editableText("menu.kicker")}>{content.menu.kicker}</p><h2 {...editableText("menu.title")}>{content.menu.title}</h2></div>
            <p {...editableText("menu.description")}>{content.menu.description}</p>
          </div>
          <div className="bn-tabs">
            {content.menu.tabs.map((tab, index) => <span key={tab} {...editableText(`menu.tabs.${index}`)}>{tab}</span>)}
          </div>
          <div className="bn-drink-grid">
            {content.menu.items.map((item, index) => (
              <article key={item.name}>
                <span className="bn-rating">4.{index + 4}</span>
                <div className="bn-drink-image" style={{ backgroundImage: `url(${content.menu.image})`, backgroundPosition: item.position }} role="img" aria-label={item.imageAlt} {...editableImage("menu.image", `menu.items.${index}.imageAlt`)} />
                <h3 {...editableText(`menu.items.${index}.name`)}>{item.name}</h3>
                <footer><strong {...editableText(`menu.items.${index}.price`)}>{item.price}</strong><a href="#bn-menu" {...editableText(`menu.items.${index}.note`)}>{item.note}</a></footer>
              </article>
            ))}
          </div>
        </section>

        <section className="bn-section bn-standard" id="bn-story">
          <h2 {...editableText("standard.title")}>{content.standard.title}</h2>
          <img src={content.standard.image} alt={content.standard.imageAlt} loading="lazy" {...editableImage("standard.image", "standard.imageAlt")} />
          <p {...editableText("standard.body")}>{content.standard.body}</p>
        </section>

        <section className="bn-section bn-daily" id="bn-about">
          <div>
            <span>Premium cold coffee</span>
            <h2 {...editableText("daily.title")}>{content.daily.title}</h2>
            <p {...editableText("daily.body")}>{content.daily.body}</p>
          </div>
        </section>

        <section className="bn-section bn-feature-grid">
          {content.features.map((feature, index) => (
            <article key={feature.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3 {...editableText(`features.${index}.title`)}>{feature.title}</h3>
              <p {...editableText(`features.${index}.text`)}>{feature.text}</p>
            </article>
          ))}
        </section>

        <section className="bn-section bn-reviews">
          <h2 {...editableText("reviews.title")}>{content.reviews.title}</h2>
          <div>
            {content.reviews.items.map((review, index) => (
              <blockquote key={review.name}>
                <p {...editableText(`reviews.items.${index}.quote`)}>"{review.quote}"</p>
                <footer {...editableText(`reviews.items.${index}.name`)}>{review.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="bn-section bn-craft">
          <img src={content.craft.image} alt={content.craft.imageAlt} loading="lazy" {...editableImage("craft.image", "craft.imageAlt")} />
          <div>
            <h2 {...editableText("craft.title")}>{content.craft.title}</h2>
            <p {...editableText("craft.body")}>{content.craft.body}</p>
            <a className="bn-button" href={content.craft.buttonHref} {...editableLink("craft.buttonLabel", "craft.buttonHref")}>{content.craft.buttonLabel}</a>
          </div>
        </section>

        <section className="bn-section bn-faq">
          <h2 {...editableText("faq.title")}>{content.faq.title}</h2>
          <div>
            {content.faq.items.map((item, index) => (
              <details key={item.question}>
                <summary><span {...editableText(`faq.items.${index}.question`)}>{item.question}</span><CaretDown weight="bold" /></summary>
                <p {...editableText(`faq.items.${index}.answer`)}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="bn-offer">
          <div className="bn-mini-cup is-left" style={{ backgroundImage: `url(${content.menu.image})` }} aria-hidden="true" />
          <div>
            <h2 {...editableText("offer.title")}>{content.offer.title}</h2>
            <a className="bn-button" href={content.offer.buttonHref} {...editableLink("offer.buttonLabel", "offer.buttonHref")}>{content.offer.buttonLabel}</a>
          </div>
          <div className="bn-mini-cup is-right" style={{ backgroundImage: `url(${content.menu.image})` }} aria-hidden="true" />
        </section>

        <div className="bn-ticker" aria-label="Coffee highlights">
          {[...content.ticker, ...content.ticker].map((item, index) => <span key={`${item}-${index}`} {...editableText(`ticker.${index % content.ticker.length}`)}>{item}</span>)}
        </div>
      </main>

      <footer className="bn-footer" id="bn-footer">
        <div className="bn-footer-top"><BeanMark /><strong {...editableText("brand.name")}>{content.brand.name}</strong></div>
        <div className="bn-footer-grid">
          <div>
            <span {...editableText("brand.email")}>{content.brand.email}</span>
            <span {...editableText("brand.phone")}>{content.brand.phone}</span>
            <span {...editableText("brand.address")}>{content.brand.address}</span>
          </div>
          {content.footer.columns.map((column, columnIndex) => (
            <nav key={column.title} aria-label={column.title}>
              <strong {...editableText(`footer.columns.${columnIndex}.title`)}>{column.title}</strong>
              {column.links.map((link, linkIndex) => <a key={link.label} href={link.href} {...editableLink(`footer.columns.${columnIndex}.links.${linkIndex}.label`, `footer.columns.${columnIndex}.links.${linkIndex}.href`)}>{link.label}</a>)}
            </nav>
          ))}
        </div>
        <p {...editableText("brand.copyright")}>{content.brand.copyright}</p>
      </footer>
    </div>
  );
}
