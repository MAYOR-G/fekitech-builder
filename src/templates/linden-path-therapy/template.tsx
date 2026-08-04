"use client";

import { ArrowRight, Brain, Butterfly, CaretDown, CheckCircle, Heart, Leaf, List, ShieldCheck, Sparkle, Star, Users, X } from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import editableData from "./editable.json";
import "./styles.css";

type LindenPathData = typeof editableData;
type PageId = "home" | "about" | "services" | "contact" | "privacy" | "accessibility" | "journal";

const iconMap = [Heart, Butterfly, Users, Brain];

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function IconButton({ children }: { children: ReactNode }) {
  return <span className="lpt-icon-button">{children}</span>;
}

export default function LindenPathTherapyTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as LindenPathData;
  const rootRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<PageId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const themeStyle = useMemo(() => ({
    "--lpt-page": content.theme.colors.page,
    "--lpt-section": content.theme.colors.section,
    "--lpt-surface": content.theme.colors.surface,
    "--lpt-ink": content.theme.colors.ink,
    "--lpt-muted": content.theme.colors.muted,
    "--lpt-olive": content.theme.colors.olive,
    "--lpt-olive-dark": content.theme.colors.oliveDark,
    "--lpt-coral": content.theme.colors.coral,
    "--lpt-gold": content.theme.colors.gold,
    "--lpt-blue": content.theme.colors.blue,
    "--lpt-line": content.theme.colors.line,
    "--lpt-heading": content.theme.typography.heading,
    "--lpt-body": content.theme.typography.body,
    "--lpt-mono": content.theme.typography.mono,
  }) as CSSProperties, [content.theme]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-lpt-reveal]"));
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
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const navigate = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = (target.replace("#", "") || "home") as PageId;
    setMenuOpen(false);
    if (["about", "services", "contact", "privacy", "accessibility", "journal"].includes(next)) {
      setPage(next);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }
    setPage("home");
    window.requestAnimationFrame(() => {
      if (next === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(next)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const navLinks = content.navigation.links;

  return (
    <div ref={rootRef} className="linden-path-therapy" data-template-id="linden-path-therapy" style={themeStyle}>
      <a className="lpt-skip" href="#lpt-main">Skip to content</a>
      <header className="lpt-header">
        <div className="lpt-shell lpt-nav">
          <button className="lpt-logo" type="button" onClick={(event) => navigate("home", event)}>
            <span aria-hidden="true"><Sparkle weight="fill" /></span>
            <strong {...editableText("brand.name")}>{content.brand.name}</strong>
          </button>
          <nav className={menuOpen ? "lpt-links is-open" : "lpt-links"} aria-label="Primary navigation">
            {navLinks.map((link, index) => (
              <a
                key={`${link.label}-${index}`}
                href={`#${link.href}`}
                onClick={(event) => navigate(link.href, event)}
                {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a className="lpt-pill lpt-pill-small" href={`#${content.navigation.buttonHref}`} onClick={(event) => navigate(content.navigation.buttonHref, event)} {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}>
            {content.navigation.buttonLabel}
          </a>
          <button className="lpt-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <List />}
          </button>
        </div>
      </header>

      <main id="lpt-main">
        {page === "home" && (
          <>
            <section className="lpt-hero" id="home">
              <div className="lpt-shell lpt-hero-grid">
                <div className="lpt-hero-copy" data-lpt-reveal>
                  <div className="lpt-rating">
                    <span><Star weight="fill" /></span>
                    <b {...editableText("hero.rating")}>{content.hero.rating}</b>
                    <em {...editableText("hero.ratingNote")}>{content.hero.ratingNote}</em>
                  </div>
                  <h1 {...editableText("hero.title")}>{content.hero.title}</h1>
                  <p {...editableText("hero.description")}>{content.hero.description}</p>
                  <a className="lpt-pill" href={`#${content.hero.buttonHref}`} onClick={(event) => navigate(content.hero.buttonHref, event)} {...editableLink("hero.buttonLabel", "hero.buttonHref")}>
                    {content.hero.buttonLabel}
                  </a>
                  <div className="lpt-trust">
                    <span><img src={content.hero.imageSecondary} alt="" /></span>
                    <span><img src={content.gallery.images[1].src} alt="" /></span>
                    <span><img src={content.gallery.images[0].src} alt="" /></span>
                    <p {...editableText("hero.trusted")}>{content.hero.trusted}</p>
                  </div>
                </div>
                <div className="lpt-hero-media" data-lpt-reveal>
                  <div className="lpt-main-photo">
                    <img src={content.hero.imagePrimary} alt={content.hero.imagePrimaryAlt} loading="eager" fetchPriority="high" {...editableImage("hero.imagePrimary", "hero.imagePrimaryAlt")} />
                    <div className="lpt-floating-tags">
                      {content.hero.badges.map((badge, index) => <span key={badge} {...editableText(`hero.badges.${index}`)}>{badge}</span>)}
                    </div>
                  </div>
                  <aside className="lpt-peace-card">
                    <h2 {...editableText("hero.careCardTitle")}>{content.hero.careCardTitle}</h2>
                    <p {...editableText("hero.careCardText")}>{content.hero.careCardText}</p>
                    <img src={content.hero.imageSecondary} alt={content.hero.imageSecondaryAlt} loading="eager" {...editableImage("hero.imageSecondary", "hero.imageSecondaryAlt")} />
                  </aside>
                </div>
              </div>
            </section>

            <section className="lpt-space lpt-shell">
              <article className="lpt-session-card" data-lpt-reveal>
                <img src={content.intro.cardImage} alt={content.intro.cardImageAlt} {...editableImage("intro.cardImage", "intro.cardImageAlt")} />
                <IconButton><ArrowRight /></IconButton>
                <h3 {...editableText("intro.cardTitle")}>{content.intro.cardTitle}</h3>
                <p {...editableText("intro.cardText")}>{content.intro.cardText}</p>
              </article>
              <div className="lpt-space-copy" data-lpt-reveal>
                <h2 {...editableText("intro.title")}>{content.intro.title}</h2>
                <p {...editableText("intro.description")}>{content.intro.description}</p>
              </div>
              <article className="lpt-metric-card" data-lpt-reveal>
                <span><Heart weight="fill" /></span>
                <strong {...editableText("intro.metricValue")}>{content.intro.metricValue}</strong>
                <p {...editableText("intro.metricLabel")}>{content.intro.metricLabel}</p>
              </article>
              <article className="lpt-expert-card" data-lpt-reveal>
                <IconButton><ArrowRight /></IconButton>
                <h3 {...editableText("intro.expertTitle")}>{content.intro.expertTitle}</h3>
                <p {...editableText("intro.expertText")}>{content.intro.expertText}</p>
                <img src={content.intro.expertImage} alt={content.intro.expertImageAlt} {...editableImage("intro.expertImage", "intro.expertImageAlt")} />
              </article>
            </section>

            <section className="lpt-services lpt-shell" id="services-preview">
              <div className="lpt-section-head" data-lpt-reveal>
                <p className="lpt-eyebrow" {...editableText("services.eyebrow")}>{content.services.eyebrow}</p>
                <h2 {...editableText("services.title")}>{content.services.title}</h2>
                <a className="lpt-pill lpt-pill-small" href={`#${content.services.buttonHref}`} onClick={(event) => navigate(content.services.buttonHref, event)} {...editableLink("services.buttonLabel", "services.buttonHref")}>{content.services.buttonLabel}</a>
              </div>
              <div className="lpt-service-list">
                {content.services.items.map((service, index) => {
                  const Icon = iconMap[index % iconMap.length];
                  return (
                    <article key={service.title} data-lpt-reveal>
                      <div><Icon weight="fill" /><h3 {...editableText(`services.items.${index}.title`)}>{service.title}</h3></div>
                      <p {...editableText(`services.items.${index}.description`)}>{service.description}</p>
                      <a
                        href={`#${service.href}`}
                        onClick={(event) => navigate(service.href, event)}
                        data-editable-path={`services.items.${index}.href`}
                        data-editable-type="link"
                        data-editable-href-path={`services.items.${index}.href`}
                        aria-label={`Read more about ${service.title}`}
                      >
                        <ArrowRight />
                      </a>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="lpt-process lpt-shell" data-lpt-reveal>
              <img src={content.process.image} alt={content.process.imageAlt} {...editableImage("process.image", "process.imageAlt")} />
              <div>
                <h2 {...editableText("process.title")}>{content.process.title}</h2>
                <p {...editableText("process.description")}>{content.process.description}</p>
                <div className="lpt-step-row">
                  {content.process.steps.map((step, index) => (
                    <article key={step.title}>
                      <span>{index + 1}</span>
                      <h3 {...editableText(`process.steps.${index}.title`)}>{step.title}</h3>
                      <p {...editableText(`process.steps.${index}.text`)}>{step.text}</p>
                    </article>
                  ))}
                </div>
                <a className="lpt-pill lpt-pill-small" href={`#${content.process.buttonHref}`} onClick={(event) => navigate(content.process.buttonHref, event)} {...editableLink("process.buttonLabel", "process.buttonHref")}>{content.process.buttonLabel}</a>
              </div>
            </section>

            <section className="lpt-best lpt-shell">
              <div className="lpt-centred" data-lpt-reveal>
                <p className="lpt-eyebrow" {...editableText("best.eyebrow")}>{content.best.eyebrow}</p>
                <h2 {...editableText("best.title")}>{content.best.title}</h2>
              </div>
            <div className="lpt-best-grid">
                {content.best.items.map((item, index) => {
                  const Icon = [Leaf, ShieldCheck, Brain][index] ?? Leaf;
                  return (
                    <article key={item.title} data-lpt-reveal>
                      <Icon weight="fill" />
                      <h3 {...editableText(`best.items.${index}.title`)}>{item.title}</h3>
                      <p {...editableText(`best.items.${index}.text`)}>{item.text}</p>
                    </article>
                  );
                })}
              </div>
              <blockquote data-lpt-reveal {...editableText("best.quote")}>{content.best.quote}</blockquote>
            </section>

            <Gallery content={content} />
            <Testimonials content={content} />
            <Support content={content} />
            <Pricing content={content} navigate={navigate} />
            <Faq content={content} openFaq={openFaq} setOpenFaq={setOpenFaq} />
            <Cta content={content} navigate={navigate} />
          </>
        )}
        {page !== "home" && <InnerPage page={page} content={content} navigate={navigate} />}
      </main>
      <Footer content={content} navigate={navigate} navLinks={navLinks} />
    </div>
  );
}

function Gallery({ content }: { content: LindenPathData }) {
  return (
    <section className="lpt-gallery lpt-shell" data-lpt-reveal>
      <p className="lpt-eyebrow" {...editableText("gallery.eyebrow")}>{content.gallery.eyebrow}</p>
      <h2 {...editableText("gallery.title")}>{content.gallery.title}</h2>
      <div>
        {content.gallery.images.map((image, index) => (
          <img key={`${image.src}-${index}`} src={image.src} alt={image.alt} loading="lazy" {...editableImage(`gallery.images.${index}.src`, `gallery.images.${index}.alt`)} />
        ))}
      </div>
    </section>
  );
}

function Testimonials({ content }: { content: LindenPathData }) {
  return (
    <section className="lpt-testimonials">
      <div className="lpt-shell">
        <p className="lpt-eyebrow" {...editableText("testimonials.eyebrow")}>{content.testimonials.eyebrow}</p>
        <h2 {...editableText("testimonials.title")}>{content.testimonials.title}</h2>
      </div>
      <div className="lpt-quote-strip">
        {content.testimonials.items.map((item, index) => (
          <blockquote key={item.name} data-lpt-reveal>
            <p {...editableText(`testimonials.items.${index}.quote`)}>{item.quote}</p>
            <cite {...editableText(`testimonials.items.${index}.name`)}>{item.name}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}

function Support({ content }: { content: LindenPathData }) {
  return (
    <section className="lpt-support lpt-shell" data-lpt-reveal>
      <h2 {...editableText("support.title")}>{content.support.title}</h2>
      <div className="lpt-tags">
        {content.support.tags.map((tag, index) => <span key={tag} {...editableText(`support.tags.${index}`)}>{tag}</span>)}
      </div>
      <div className="lpt-stat-row">
        {content.support.stats.map((stat, index) => (
          <article key={`${stat.value}-${stat.label}`}>
            <strong {...editableText(`support.stats.${index}.value`)}>{stat.value}</strong>
            <p {...editableText(`support.stats.${index}.label`)}>{stat.label}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Pricing({ content, navigate }: { content: LindenPathData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <section className="lpt-pricing lpt-shell" id="pricing">
      <div className="lpt-centred" data-lpt-reveal>
        <p className="lpt-eyebrow" {...editableText("pricing.eyebrow")}>{content.pricing.eyebrow}</p>
        <h2 {...editableText("pricing.title")}>{content.pricing.title}</h2>
        <div className="lpt-toggle"><span {...editableText("pricing.toggleA")}>{content.pricing.toggleA}</span><b /><span {...editableText("pricing.toggleB")}>{content.pricing.toggleB}</span></div>
      </div>
      <div className="lpt-price-grid">
        {content.pricing.items.map((item, index) => (
          <article key={item.title} data-lpt-reveal>
            <h3 {...editableText(`pricing.items.${index}.title`)}>{item.title}</h3>
            <p {...editableText(`pricing.items.${index}.note`)}>{item.note}</p>
            <strong {...editableText(`pricing.items.${index}.price`)}>{item.price}</strong>
            <ul>
              {item.features.map((feature, featureIndex) => <li key={feature}><CheckCircle weight="fill" /><span {...editableText(`pricing.items.${index}.features.${featureIndex}`)}>{feature}</span></li>)}
            </ul>
            <a className="lpt-pill lpt-pill-small" href={`#${item.buttonHref}`} onClick={(event) => navigate(item.buttonHref, event)} {...editableLink(`pricing.items.${index}.buttonLabel`, `pricing.items.${index}.buttonHref`)}>{item.buttonLabel}</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Faq({ content, openFaq, setOpenFaq }: { content: LindenPathData; openFaq: number; setOpenFaq: (index: number) => void }) {
  return (
    <section className="lpt-faq lpt-shell" data-lpt-reveal>
      <div>
        <p className="lpt-eyebrow" {...editableText("faq.eyebrow")}>{content.faq.eyebrow}</p>
        <h2 {...editableText("faq.title")}>{content.faq.title}</h2>
      </div>
      <div className="lpt-faq-list">
        {content.faq.items.map((item, index) => (
          <article key={item.question} className={openFaq === index ? "is-open" : ""}>
            <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
              <span {...editableText(`faq.items.${index}.question`)}>{index + 1}. {item.question}</span>
              <CaretDown />
            </button>
            <p {...editableText(`faq.items.${index}.answer`)}>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Cta({ content, navigate }: { content: LindenPathData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <section className="lpt-cta lpt-shell" data-lpt-reveal>
      <Sparkle weight="fill" />
      <h2 {...editableText("cta.title")}>{content.cta.title}</h2>
      <a className="lpt-light-pill" href={`#${content.cta.buttonHref}`} onClick={(event) => navigate(content.cta.buttonHref, event)} {...editableLink("cta.buttonLabel", "cta.buttonHref")}>{content.cta.buttonLabel}</a>
    </section>
  );
}

function InnerPage({ page, content, navigate }: { page: PageId; content: LindenPathData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  if (page === "privacy" || page === "accessibility" || page === "journal") {
    const title = page === "journal" ? "Journal" : page === "privacy" ? "Privacy Policy" : "Accessibility Statement";
    return (
      <section className="lpt-inner-page lpt-shell">
        <p className="lpt-eyebrow">{content.brand.name}</p>
        <h1>{title}</h1>
        <p>{page === "journal" ? "Articles and resources can be added here by the business owner." : "This page is ready for your practice policy wording and can be edited in the builder."}</p>
        <a className="lpt-pill" href="#home" onClick={(event) => navigate("home", event)}>Return home</a>
      </section>
    );
  }
  if (page === "home") return null;
  const pageData = content.pages[page];
  return (
    <section className="lpt-page-hero lpt-shell">
      <div data-lpt-reveal>
        <p className="lpt-eyebrow" {...editableText(`pages.${page}.eyebrow`)}>{pageData.eyebrow}</p>
        <h1 {...editableText(`pages.${page}.title`)}>{pageData.title}</h1>
        <p {...editableText(`pages.${page}.body`)}>{pageData.body}</p>
        {page === "contact" && <ContactForm content={content} />}
      </div>
      {"image" in pageData && <img src={pageData.image} alt={pageData.imageAlt} {...editableImage(`pages.${page}.image`, `pages.${page}.imageAlt`)} />}
    </section>
  );
}

function ContactForm({ content }: { content: LindenPathData }) {
  return (
    <form className="lpt-contact-form" onSubmit={(event) => event.preventDefault()}>
      {content.pages.contact.fields.map((field, index) => (
        <label key={field}>
          <span {...editableText(`pages.contact.fields.${index}`)}>{field}</span>
          {index === 3 ? <textarea rows={4} /> : <input type={index === 1 ? "email" : index === 2 ? "tel" : "text"} />}
        </label>
      ))}
      <button type="submit" className="lpt-pill" {...editableText("pages.contact.buttonLabel")}>{content.pages.contact.buttonLabel}</button>
    </form>
  );
}

function Footer({ content, navigate, navLinks }: { content: LindenPathData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void; navLinks: LindenPathData["navigation"]["links"] }) {
  return (
    <footer className="lpt-footer">
      <div className="lpt-shell lpt-footer-grid">
        <div>
          <button type="button" className="lpt-footer-logo" onClick={(event) => navigate("home", event)} {...editableText("brand.name")}>{content.brand.name}</button>
          <p {...editableText("footer.note")}>{content.footer.note}</p>
          <div className="lpt-social">
            {content.footer.social.map((link, index) => <a key={link.label} href={link.href} {...editableLink(`footer.social.${index}.label`, `footer.social.${index}.href`)}>{link.label}</a>)}
          </div>
        </div>
        <div>
          <h3 {...editableText("footer.quickLinksTitle")}>{content.footer.quickLinksTitle}</h3>
          {navLinks.map((link, index) => <a key={link.label} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}>{link.label}</a>)}
        </div>
        <div>
          <h3 {...editableText("footer.contactTitle")}>{content.footer.contactTitle}</h3>
          <a href={content.brand.emailHref} {...editableLink("brand.email", "brand.emailHref")}>{content.brand.email}</a>
          <a href={content.brand.phoneHref} {...editableLink("brand.phone", "brand.phoneHref")}>{content.brand.phone}</a>
          <p {...editableText("brand.hours")}>{content.brand.hours}</p>
        </div>
        <div>
          <h3 {...editableText("footer.visitTitle")}>{content.footer.visitTitle}</h3>
          <address {...editableText("brand.address")}>{content.brand.address}</address>
        </div>
        <div className="lpt-footer-bottom">
          <span {...editableText("footer.copyright")}>{content.footer.copyright}</span>
          <div>{content.footer.legal.map((link, index) => <a key={link.label} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} {...editableLink(`footer.legal.${index}.label`, `footer.legal.${index}.href`)}>{link.label}</a>)}</div>
        </div>
      </div>
    </footer>
  );
}
