"use client";

import { ArrowRight, CheckCircle, List, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import editableData from "./editable.json";
import "./styles.css";

type ArcstoneData = typeof editableData;

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function Mark() {
  return (
    <span className="ag-mark" aria-hidden="true">
      <i />
      <b />
    </span>
  );
}

export default function ArcstoneGrowthTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as ArcstoneData;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const themeStyle = useMemo(() => ({
    "--ag-page": content.theme.colors.page,
    "--ag-nav": content.theme.colors.nav,
    "--ag-ink": content.theme.colors.ink,
    "--ag-body": content.theme.colors.body,
    "--ag-muted": content.theme.colors.muted,
    "--ag-accent": content.theme.colors.accent,
    "--ag-mint": content.theme.colors.mint,
    "--ag-blue": content.theme.colors.blue,
    "--ag-yellow": content.theme.colors.yellow,
    "--ag-surface": content.theme.colors.surface,
    "--ag-soft": content.theme.colors.soft,
    "--ag-line": content.theme.colors.line,
    "--ag-dark": content.theme.colors.dark,
    "--ag-dark-text": content.theme.colors.darkText,
    "--ag-heading": content.theme.typography.heading,
    "--ag-body-font": content.theme.typography.body,
  }) as CSSProperties, [content.theme]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-ag-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -9% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [content]);

  return (
    <div ref={rootRef} className="arcstone-growth" data-template-id="arcstone-growth" style={themeStyle}>
      <header className="ag-header">
        <a className="ag-logo" href="#ag-top" {...editableLink("brand.name", "navigation.links.0.href")}>
          <Mark />
          <span {...editableText("brand.name")}>{content.brand.name}</span>
        </a>
        <nav className={menuOpen ? "ag-nav is-open" : "ag-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link, index) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="ag-button ag-nav-cta" href={content.navigation.buttonHref} {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}>{content.navigation.buttonLabel}</a>
        <button className="ag-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X weight="bold" /> : <List weight="bold" />}
        </button>
      </header>

      <main id="ag-top">
        <section className="ag-hero">
          <div className="ag-shell ag-hero-grid">
            <div className="ag-hero-copy" data-ag-reveal>
              <p className="ag-kicker" {...editableText("hero.eyebrow")}>{content.hero.eyebrow}</p>
              <h1 {...editableText("hero.title")}>{content.hero.title}</h1>
              <p {...editableText("hero.description")}>{content.hero.description}</p>
              <a className="ag-button" href={content.hero.buttonHref} {...editableLink("hero.buttonLabel", "hero.buttonHref")}>{content.hero.buttonLabel}</a>
            </div>
            <div className="ag-hero-media" data-ag-reveal>
              <img className="ag-hero-img ag-hero-a" src={content.hero.imageA} alt={content.hero.imageAAlt} loading="eager" fetchPriority="high" {...editableImage("hero.imageA", "hero.imageAAlt")} />
              <img className="ag-hero-img ag-hero-b" src={content.hero.imageB} alt={content.hero.imageBAlt} loading="eager" {...editableImage("hero.imageB", "hero.imageBAlt")} />
              <img className="ag-hero-img ag-hero-c" src={content.hero.imageC} alt={content.hero.imageCAlt} loading="eager" {...editableImage("hero.imageC", "hero.imageCAlt")} />
              <span className="ag-shape ag-shape-orange" aria-hidden="true" />
              <span className="ag-shape ag-shape-mint" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="ag-proof">
          <div className="ag-shell">
            <p {...editableText("logos.title")}>{content.logos.title}</p>
            <div className="ag-logo-row">
              {content.logos.items.map((logo, index) => <span key={logo} {...editableText(`logos.items.${index}`)}><i aria-hidden="true" />{logo}</span>)}
            </div>
          </div>
        </section>

        <section className="ag-section ag-barriers" id="ag-about">
          <div className="ag-shell ag-split">
            <div data-ag-reveal>
              <p className="ag-kicker" {...editableText("barriers.kicker")}>{content.barriers.kicker}</p>
              <h2 {...editableText("barriers.title")}>{content.barriers.title}</h2>
              <p className="ag-section-copy" {...editableText("barriers.description")}>{content.barriers.description}</p>
              <div className="ag-checks">
                {content.barriers.items.map((item, index) => (
                  <article key={item.title}>
                    <CheckCircle weight="fill" aria-hidden="true" />
                    <div><strong {...editableText(`barriers.items.${index}.title`)}>{item.title}</strong><span {...editableText(`barriers.items.${index}.text`)}>{item.text}</span></div>
                  </article>
                ))}
              </div>
            </div>
            <figure data-ag-reveal>
              <img src={content.barriers.image} alt={content.barriers.imageAlt} loading="lazy" {...editableImage("barriers.image", "barriers.imageAlt")} />
              <span className="ag-note is-blue">Clearer goals</span>
              <span className="ag-note is-mint">Better systems</span>
              <span className="ag-note is-orange">More progress</span>
            </figure>
          </div>
        </section>

        <section className="ag-section ag-services" id="ag-services">
          <div className="ag-shell">
            <div className="ag-centre" data-ag-reveal>
              <p className="ag-kicker" {...editableText("services.kicker")}>{content.services.kicker}</p>
              <h2 {...editableText("services.title")}>{content.services.title}</h2>
            </div>
            <div className="ag-service-grid">
              {content.services.items.map((service, index) => (
                <article key={service.title} data-ag-reveal>
                  <img src={service.image} alt={service.imageAlt} loading="lazy" {...editableImage(`services.items.${index}.image`, `services.items.${index}.imageAlt`)} />
                  <div><h3 {...editableText(`services.items.${index}.title`)}>{service.title}</h3><p {...editableText(`services.items.${index}.text`)}>{service.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ag-section ag-process" id="ag-process">
          <div className="ag-shell ag-process-grid">
            <div data-ag-reveal>
              <p className="ag-kicker" {...editableText("process.kicker")}>{content.process.kicker}</p>
              <h2 {...editableText("process.title")}>{content.process.title}</h2>
              <div className="ag-actions">
                <a className="ag-button" href={content.process.buttonHref} {...editableLink("process.buttonLabel", "process.buttonHref")}>{content.process.buttonLabel}</a>
                <a className="ag-button is-light" href={content.process.secondaryHref} {...editableLink("process.secondaryLabel", "process.secondaryHref")}>{content.process.secondaryLabel}</a>
              </div>
            </div>
            <div className="ag-step-list">
              {content.process.steps.map((step, index) => (
                <article key={step.title} data-ag-reveal>
                  <span>{index + 1}</span>
                  <div><h3 {...editableText(`process.steps.${index}.title`)}>{step.title}</h3><p {...editableText(`process.steps.${index}.text`)}>{step.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ag-image-band">
          <img src={content.imageBand.image} alt={content.imageBand.imageAlt} loading="lazy" {...editableImage("imageBand.image", "imageBand.imageAlt")} />
        </section>

        <section className="ag-section ag-stats">
          <div className="ag-shell">
            <div className="ag-centre" data-ag-reveal>
              <p className="ag-kicker" {...editableText("stats.kicker")}>{content.stats.kicker}</p>
              <h2 {...editableText("stats.title")}>{content.stats.title}</h2>
            </div>
            <div className="ag-stats-grid">
              {content.stats.items.map((stat, index) => (
                <article key={stat.label} data-ag-reveal>
                  <strong {...editableText(`stats.items.${index}.value`)}>{stat.value}</strong>
                  <span {...editableText(`stats.items.${index}.label`)}>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ag-section ag-pricing">
          <div className="ag-shell">
            <p className="ag-kicker" {...editableText("pricing.kicker")}>{content.pricing.kicker}</p>
            <h2 {...editableText("pricing.title")}>{content.pricing.title}</h2>
            <div className="ag-price-list">
              {content.pricing.plans.map((plan, index) => (
                <article key={plan.name} data-ag-reveal>
                  <h3 {...editableText(`pricing.plans.${index}.name`)}>{plan.name}</h3>
                  <p {...editableText(`pricing.plans.${index}.description`)}>{plan.description}</p>
                  <div><strong {...editableText(`pricing.plans.${index}.price`)}>{plan.price}</strong><span {...editableText(`pricing.plans.${index}.cadence`)}>{plan.cadence}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ag-section ag-sectors">
          <div className="ag-shell ag-centre">
            <h2 data-ag-reveal {...editableText("sectors.title")}>{content.sectors.title}</h2>
            <div className="ag-pills">
              {content.sectors.items.map((item, index) => <span key={item} {...editableText(`sectors.items.${index}`)}>{item}</span>)}
            </div>
          </div>
        </section>

        <section className="ag-section ag-testimonials" id="ag-clients">
          <div className="ag-shell">
            <div className="ag-centre" data-ag-reveal>
              <h2 {...editableText("testimonials.title")}>{content.testimonials.title}</h2>
            </div>
            <div className="ag-testimonial-grid">
              {content.testimonials.items.map((item, index) => (
                <blockquote key={item.name} data-ag-reveal>
                  <p {...editableText(`testimonials.items.${index}.quote`)}>"{item.quote}"</p>
                  <footer><strong {...editableText(`testimonials.items.${index}.name`)}>{item.name}</strong><span {...editableText(`testimonials.items.${index}.role`)}>{item.role}</span></footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        <section className="ag-section ag-cases">
          <div className="ag-shell">
            <div className="ag-case-head" data-ag-reveal>
              <div><p className="ag-kicker" {...editableText("cases.kicker")}>{content.cases.kicker}</p><h2 {...editableText("cases.title")}>{content.cases.title}</h2></div>
              <a className="ag-button is-light" href={content.cases.buttonHref} {...editableLink("cases.buttonLabel", "cases.buttonHref")}>{content.cases.buttonLabel}</a>
            </div>
            <div className="ag-case-grid">
              {content.cases.items.map((item, index) => (
                <article key={item.title} data-ag-reveal>
                  <img src={item.image} alt={item.imageAlt} loading="lazy" {...editableImage(`cases.items.${index}.image`, `cases.items.${index}.imageAlt`)} />
                  <span {...editableText(`cases.items.${index}.category`)}>{item.category}</span>
                  <h3 {...editableText(`cases.items.${index}.title`)}>{item.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ag-cta" id="ag-contact">
          <div className="ag-shell ag-centre">
            <h2 data-ag-reveal {...editableText("cta.title")}>{content.cta.title}</h2>
            <a className="ag-button is-light" href={content.cta.buttonHref} {...editableLink("cta.buttonLabel", "cta.buttonHref")}>{content.cta.buttonLabel}<ArrowRight weight="bold" aria-hidden="true" /></a>
          </div>
          <div className="ag-graphics" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </section>
      </main>

      <footer className="ag-footer">
        <div className="ag-shell">
          <div className="ag-footer-top">
            <div>
              <span {...editableText("brand.email")}>{content.brand.email}</span>
              <span {...editableText("brand.phone")}>{content.brand.phone}</span>
            </div>
            {content.footer.columns.map((column, columnIndex) => (
              <nav key={column.title} aria-label={column.title}>
                <strong {...editableText(`footer.columns.${columnIndex}.title`)}>{column.title}</strong>
                {column.links.map((link, linkIndex) => (
                  <a key={link.label} href={link.href} {...editableLink(`footer.columns.${columnIndex}.links.${linkIndex}.label`, `footer.columns.${columnIndex}.links.${linkIndex}.href`)}>{link.label}</a>
                ))}
              </nav>
            ))}
          </div>
          <div className="ag-footer-logo"><Mark /><strong {...editableText("brand.name")}>{content.brand.name}</strong></div>
          <p {...editableText("brand.copyright")}>{content.brand.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
