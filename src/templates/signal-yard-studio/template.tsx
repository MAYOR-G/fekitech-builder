"use client";

import { ArrowUpRight, Home, Menu, X } from "lucide-react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import editableData from "./editable.json";
import "./styles.css";

type SignalYardData = typeof editableData;
type PageId = "home" | "work" | "about" | "services" | "journal" | "contact" | "privacy";
type SubPageId = Exclude<PageId, "home">;

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function RepeatTitle({ title }: { title: string }) {
  return (
    <div className="sys-repeat" aria-hidden="true">
      <div className="sys-repeat-track">
        {Array.from({ length: 10 }).map((_, index) => (
          <span key={index}>{title}</span>
        ))}
      </div>
    </div>
  );
}

function DotLabel({ children }: { children: ReactNode }) {
  return <p className="sys-eyebrow"><span />{children}</p>;
}

export default function SignalYardStudioTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as SignalYardData;
  const [page, setPage] = useState<PageId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const themeStyle = useMemo(() => ({
    "--sys-page": content.colors.pageBackground,
    "--sys-surface": content.colors.surface,
    "--sys-card": content.colors.card,
    "--sys-ink": content.colors.headingText,
    "--sys-text": content.colors.bodyText,
    "--sys-muted": content.colors.mutedText,
    "--sys-accent": content.colors.accent,
    "--sys-line": content.colors.border,
    "--sys-footer": content.colors.footerBg,
    "--sys-footer-text": content.colors.footerText,
    "--sys-footer-muted": content.colors.footerMuted,
    "--sys-heading-font": "var(--font-heading, Geist, Inter, Arial, sans-serif)",
    "--sys-body-font": "var(--font-body, Inter, Arial, sans-serif)",
  }) as CSSProperties, [content.colors]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-sys-reveal]"));
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
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const navigate = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const clean = target.replace("#", "") || "home";
    const pages: PageId[] = ["work", "about", "services", "journal", "contact", "privacy"];
    setMenuOpen(false);
    if (pages.includes(clean as PageId)) {
      setPage(clean as PageId);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }
    setPage("home");
    window.requestAnimationFrame(() => {
      if (clean === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(`sys-${clean}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const Header = (
    <header className="sys-header">
      <button className="sys-logo" type="button" onClick={(event) => navigate("home", event)}>
        <span {...editableText("brand.name")}>{content.brand.name}</span><i />
      </button>
      <nav className={menuOpen ? "sys-nav is-open" : "sys-nav"} aria-label="Primary navigation">
        {content.navigation.links.map((link, index) => (
          <a key={link.label} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="sys-contact-pill" href={`#${content.navigation.buttonHref}`} onClick={(event) => navigate(content.navigation.buttonHref, event)} {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}>
        {content.navigation.buttonLabel}<ArrowUpRight size={17} />
      </a>
      <button className="sys-menu" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );

  return (
    <div ref={rootRef} className="signal-yard-studio" data-template-id="signal-yard-studio" style={themeStyle}>
      {Header}
      <main>
        {page === "home" ? (
          <>
            <section className="sys-hero" id="sys-home">
              <div className="sys-glow" aria-hidden="true" />
              <h1 data-sys-reveal {...editableText("hero.title")}>{content.hero.title}</h1>
              <div className="sys-hero-lower">
                <p className="sys-scroll" {...editableText("hero.scrollLabel")}><span />{content.hero.scrollLabel}</p>
                <p className="sys-hero-body" data-sys-reveal {...editableText("hero.body")}>{content.hero.body}</p>
              </div>
              <img className="sys-hero-image" src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" {...editableImage("hero.image", "hero.imageAlt")} />
            </section>

            <section className="sys-about" id="sys-about">
              <DotLabel><span {...editableText("about.eyebrow")}>{content.about.eyebrow}</span></DotLabel>
              <article className="sys-about-card" data-sys-reveal>
                <img src={content.about.cardImage} alt={content.about.cardImageAlt} {...editableImage("about.cardImage", "about.cardImageAlt")} />
                <p {...editableText("about.cardText")}>{content.about.cardText}</p>
              </article>
              <div className="sys-about-copy" data-sys-reveal>
                <h2 {...editableText("about.title")}>{content.about.title}</h2>
                <div className="sys-stats">
                  {content.about.stats.map((stat, index) => (
                    <div key={stat.label}>
                      <strong {...editableText(`about.stats.${index}.value`)}>{stat.value}</strong>
                      <span {...editableText(`about.stats.${index}.label`)}>{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="sys-projects" id="sys-work">
              <RepeatTitle title={content.projects.title} />
              <div className="sys-project-grid">
                {content.projects.items.map((item, index) => (
                  <article key={item.name} className={index === 2 ? "is-wide" : ""} data-sys-reveal>
                    <img src={item.image} alt={item.imageAlt} {...editableImage(`projects.items.${index}.image`, `projects.items.${index}.imageAlt`)} />
                    <h3 {...editableText(`projects.items.${index}.name`)}>{item.name}</h3>
                    <span {...editableText(`projects.items.${index}.category`)}>{item.category}</span>
                  </article>
                ))}
              </div>
              <a className="sys-strip-button" href={`#${content.projects.buttonHref}`} onClick={(event) => navigate(content.projects.buttonHref, event)} {...editableLink("projects.buttonLabel", "projects.buttonHref")}>
                {content.projects.buttonLabel}<ArrowUpRight size={14} />
              </a>
            </section>

            <section className="sys-services" id="sys-services">
              <RepeatTitle title={content.services.title} />
              <div className="sys-service-list">
                {content.services.items.map((item, index) => (
                  <article key={item.title} data-sys-reveal>
                    <h3 {...editableText(`services.items.${index}.title`)}>{item.title}</h3>
                    <p {...editableText(`services.items.${index}.text`)}>{item.text}</p>
                  </article>
                ))}
              </div>
              <img className="sys-wide-image" src={content.services.bannerImage} alt={content.services.bannerImageAlt} {...editableImage("services.bannerImage", "services.bannerImageAlt")} />
            </section>

            <section className="sys-process">
              <DotLabel><span {...editableText("process.eyebrow")}>{content.process.eyebrow}</span></DotLabel>
              <div className="sys-process-grid">
                <h2 data-sys-reveal {...editableText("process.title")}>{content.process.title}</h2>
                {content.process.steps.map((step, index) => (
                  <article key={step.title} data-sys-reveal>
                    <i />
                    <h3 {...editableText(`process.steps.${index}.title`)}>{step.title}</h3>
                    <p {...editableText(`process.steps.${index}.text`)}>{step.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="sys-expertise">
              <RepeatTitle title={content.expertise.title} />
              <div className="sys-expertise-grid">
                <div data-sys-reveal>
                  <h2 {...editableText("expertise.heading")}>{content.expertise.heading}</h2>
                  <p {...editableText("expertise.body")}>{content.expertise.body}</p>
                  <div className="sys-tags">
                    {content.expertise.tags.map((tag, index) => <span key={tag} {...editableText(`expertise.tags.${index}`)}>{tag}</span>)}
                  </div>
                </div>
                <img src={content.expertise.image} alt={content.expertise.imageAlt} {...editableImage("expertise.image", "expertise.imageAlt")} />
              </div>
            </section>

            <section className="sys-proof">
              <DotLabel><span {...editableText("testimonials.eyebrow")}>{content.testimonials.eyebrow}</span></DotLabel>
              <div data-sys-reveal>
                <h2 {...editableText("testimonials.title")}>{content.testimonials.title}</h2>
                <p {...editableText("testimonials.body")}>{content.testimonials.body}</p>
                <div className="sys-logos">
                  {content.testimonials.logos.map((logo, index) => <span key={logo} {...editableText(`testimonials.logos.${index}`)}>{logo}</span>)}
                </div>
              </div>
              <img src={content.testimonials.image} alt={content.testimonials.imageAlt} {...editableImage("testimonials.image", "testimonials.imageAlt")} />
            </section>

            <section className="sys-journal" id="sys-journal">
              <DotLabel><span {...editableText("journal.eyebrow")}>{content.journal.eyebrow}</span></DotLabel>
              <h2 data-sys-reveal {...editableText("journal.title")}>{content.journal.title}</h2>
              <div className="sys-article-grid">
                {content.journal.items.map((item, index) => (
                  <article key={item.title} data-sys-reveal>
                    <img src={item.image} alt={item.imageAlt} {...editableImage(`journal.items.${index}.image`, `journal.items.${index}.imageAlt`)} />
                    <span {...editableText(`journal.items.${index}.category`)}>{item.category}</span>
                    <h3 {...editableText(`journal.items.${index}.title`)}>{item.title}</h3>
                  </article>
                ))}
              </div>
              <a className="sys-strip-button" href={`#${content.journal.buttonHref}`} onClick={(event) => navigate(content.journal.buttonHref, event)} {...editableLink("journal.buttonLabel", "journal.buttonHref")}>
                {content.journal.buttonLabel}<ArrowUpRight size={14} />
              </a>
            </section>
          </>
        ) : (
          <InternalPage page={page} content={content} navigate={navigate} />
        )}
      </main>
      <Footer content={content} navigate={navigate} />
    </div>
  );
}

function InternalPage({ page, content, navigate }: { page: SubPageId; content: SignalYardData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  const pageData = content.pages[page];
  return (
    <section className="sys-page">
      <div className="sys-glow" aria-hidden="true" />
      <button className="sys-home-link" type="button" onClick={(event) => navigate("home", event)}><Home size={18} />Home</button>
      <h1 data-sys-reveal {...editableText(`pages.${page}.title`)}>{pageData.title}</h1>
      <p data-sys-reveal {...editableText(`pages.${page}.body`)}>{pageData.body}</p>
      {page === "work" && (
        <div className="sys-project-grid sys-page-grid">
          {content.projects.items.map((item, index) => (
            <article key={item.name}>
              <img src={item.image} alt={item.imageAlt} {...editableImage(`projects.items.${index}.image`, `projects.items.${index}.imageAlt`)} />
              <h3 {...editableText(`projects.items.${index}.name`)}>{item.name}</h3>
              <span {...editableText(`projects.items.${index}.category`)}>{item.category}</span>
            </article>
          ))}
        </div>
      )}
      {page === "services" && (
        <div className="sys-service-list sys-page-list">
          {content.services.items.map((item, index) => (
            <article key={item.title}>
              <h3 {...editableText(`services.items.${index}.title`)}>{item.title}</h3>
              <p {...editableText(`services.items.${index}.text`)}>{item.text}</p>
            </article>
          ))}
        </div>
      )}
      {page === "journal" && (
        <div className="sys-article-grid sys-page-grid">
          {content.journal.items.map((item, index) => (
            <article key={item.title}>
              <img src={item.image} alt={item.imageAlt} {...editableImage(`journal.items.${index}.image`, `journal.items.${index}.imageAlt`)} />
              <span {...editableText(`journal.items.${index}.category`)}>{item.category}</span>
              <h3 {...editableText(`journal.items.${index}.title`)}>{item.title}</h3>
            </article>
          ))}
        </div>
      )}
      {page === "contact" && (
        <form className="sys-contact-form">
          {content.pages.contact.fields.map((field, index) => (
            <label key={field}>
              <span {...editableText(`pages.contact.fields.${index}`)}>{field}</span>
              {index === content.pages.contact.fields.length - 1 ? <textarea /> : <input />}
            </label>
          ))}
          <button type="button" {...editableText("pages.contact.buttonLabel")}>{content.pages.contact.buttonLabel}</button>
        </form>
      )}
    </section>
  );
}

function Footer({ content, navigate }: { content: SignalYardData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="sys-footer" id="sys-contact">
      <div className="sys-footer-glow" aria-hidden="true" />
      <section>
        <h2 {...editableText("cta.title")}>{content.cta.title}</h2>
        <p {...editableText("cta.body")}>{content.cta.body}</p>
        <a href={`#${content.cta.buttonHref}`} onClick={(event) => navigate(content.cta.buttonHref, event)} {...editableLink("cta.buttonLabel", "cta.buttonHref")}>
          {content.cta.buttonLabel}<ArrowUpRight size={15} />
        </a>
      </section>
      <div className="sys-footer-links">
        {content.footer.columns.map((column, columnIndex) => (
          <div key={column.title}>
            <h3 {...editableText(`footer.columns.${columnIndex}.title`)}>{column.title}</h3>
            {column.links.map((link, linkIndex) => (
              <a key={link.label} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} {...editableLink(`footer.columns.${columnIndex}.links.${linkIndex}.label`, `footer.columns.${columnIndex}.links.${linkIndex}.href`)}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="sys-footer-bottom">
        <p {...editableText("footer.copyright")}>{content.footer.copyright}</p>
        <p {...editableText("brand.registration")}>{content.brand.registration}</p>
        <a href={`mailto:${content.brand.email}`} {...editableLink("brand.email", "brand.email")}>{content.brand.email}</a>
      </div>
    </footer>
  );
}
