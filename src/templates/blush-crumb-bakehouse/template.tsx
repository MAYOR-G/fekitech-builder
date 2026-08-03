"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useEffect, useState } from "react";
import editableData from "./editable.json";
import "./styles.css";

type BlushCrumbData = typeof editableData;
type PageId = "home" | "about" | "menu" | "visit" | "privacy" | "terms" | "accessibility";

const pageIds: PageId[] = ["home", "about", "menu", "visit", "privacy", "terms", "accessibility"];

function normalisePage(target: string): PageId {
  const clean = target.replace("#", "") as PageId;
  return pageIds.includes(clean) ? clean : "home";
}

function StickerArrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

export default function BlushCrumbBakehouseTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as BlushCrumbData;
  const [page, setPage] = useState<PageId>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.querySelector('[data-template-id="blush-crumb-bakehouse"]');
    if (!root || !("IntersectionObserver" in window)) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-bcb-reveal]"));
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

  const navigate = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const next = normalisePage(target);
    setPage(next);
    setMenuOpen(false);
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <div data-template-id="blush-crumb-bakehouse" className="blush-crumb-bakehouse">
      <header className="bcb-header">
        <button className="bcb-brand" type="button" onClick={(event) => navigate("home", event)} aria-label="Go to home">
          <span className="bcb-brand-name" data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</span>
          <span className="bcb-brand-sub" data-editable-path="brand.descriptor" data-editable-type="text">{content.brand.descriptor}</span>
        </button>
        <button className="bcb-menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Open menu">
          <span />
          <span />
        </button>
        <nav className={`bcb-menu-panel ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          {content.header.nav.map((link, index) => (
            <a
              href={`#${link.href}`}
              key={`${link.label}-${index}`}
              onClick={(event) => navigate(link.href, event)}
              data-editable-path={`header.nav.${index}.label`}
              data-editable-type="link"
              data-editable-href-path={`header.nav.${index}.href`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {page === "home" && <HomePage content={content} navigate={navigate} />}
      {page === "about" && <AboutPage content={content} navigate={navigate} />}
      {page === "menu" && <MenuPage content={content} navigate={navigate} />}
      {page === "visit" && <VisitPage content={content} navigate={navigate} />}
      {["privacy", "terms", "accessibility"].includes(page) && <PolicyPage content={content} page={page} navigate={navigate} />}

      <Footer content={content} navigate={navigate} />
    </div>
  );
}

function HomePage({ content, navigate }: { content: BlushCrumbData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main>
      <section className="bcb-hero" id="home">
        <img className="bcb-floater bcb-croissant" src={content.hero.images.croissant.src} alt={content.hero.images.croissant.alt} loading="eager" fetchPriority="high" data-editable-path="hero.images.croissant.src" data-editable-type="image" data-editable-alt-path="hero.images.croissant.alt" />
        <img className="bcb-floater bcb-cinnamon" src={content.hero.images.cinnamon.src} alt={content.hero.images.cinnamon.alt} loading="eager" fetchPriority="high" data-editable-path="hero.images.cinnamon.src" data-editable-type="image" data-editable-alt-path="hero.images.cinnamon.alt" />
        <img className="bcb-floater bcb-caramel" src={content.hero.images.caramelCookie.src} alt={content.hero.images.caramelCookie.alt} loading="eager" fetchPriority="high" data-editable-path="hero.images.caramelCookie.src" data-editable-type="image" data-editable-alt-path="hero.images.caramelCookie.alt" />
        <img className="bcb-floater bcb-chocolate" src={content.hero.images.chocolateCookie.src} alt={content.hero.images.chocolateCookie.alt} loading="eager" fetchPriority="high" data-editable-path="hero.images.chocolateCookie.src" data-editable-type="image" data-editable-alt-path="hero.images.chocolateCookie.alt" />
        <h1 data-editable-path="hero.wordmark" data-editable-type="text">{content.hero.wordmark}</h1>
        <a
          className="bcb-sticker bcb-hero-sticker"
          href={`#${content.hero.cta.href}`}
          onClick={(event) => navigate(content.hero.cta.href, event)}
          data-editable-path="hero.cta.label"
          data-editable-type="link"
          data-editable-href-path="hero.cta.href"
        >
          {content.hero.cta.label} <StickerArrow />
        </a>
      </section>

      <section className="bcb-story" data-bcb-reveal>
        <h2 data-editable-path="story.title" data-editable-type="text">{content.story.title}</h2>
        <p data-editable-path="story.body" data-editable-type="text">{content.story.body}</p>
        <a href={`#${content.story.cta.href}`} onClick={(event) => navigate(content.story.cta.href, event)} data-editable-path="story.cta.label" data-editable-type="link" data-editable-href-path="story.cta.href">{content.story.cta.label}</a>
      </section>

      <section className="bcb-featured" id="menu" data-bcb-reveal>
        <div className="bcb-notch" aria-hidden="true" />
        <div className="bcb-featured-copy">
          <h2 data-editable-path="featured.title" data-editable-type="text">{content.featured.title}</h2>
          <p data-editable-path="featured.body" data-editable-type="text">{content.featured.body}</p>
        </div>
        <div className="bcb-product-row">
          {content.featured.items.map((item, index) => (
            <article className="bcb-product" key={`${item.name}-${index}`}>
              <img src={item.image} alt={item.imageAlt} loading={index < 2 ? "eager" : "lazy"} data-editable-path={`featured.items.${index}.image`} data-editable-type="image" data-editable-alt-path={`featured.items.${index}.imageAlt`} />
              <h3 data-editable-path={`featured.items.${index}.name`} data-editable-type="text">{item.name}</h3>
              <p data-editable-path={`featured.items.${index}.description`} data-editable-type="text">{item.description}</p>
              <strong data-editable-path={`featured.items.${index}.price`} data-editable-type="text">{item.price}</strong>
            </article>
          ))}
        </div>
        <a className="bcb-sticker bcb-featured-sticker" href={`#${content.featured.cta.href}`} onClick={(event) => navigate(content.featured.cta.href, event)} data-editable-path="featured.cta.label" data-editable-type="link" data-editable-href-path="featured.cta.href">
          {content.featured.cta.label} <StickerArrow />
        </a>
      </section>

      <TestimonialSection content={content} />
      <GallerySection content={content} />
    </main>
  );
}

function TestimonialSection({ content }: { content: BlushCrumbData }) {
  return (
    <section className="bcb-testimonial" data-bcb-reveal>
      <img className="bcb-test-baguette" src={content.testimonial.images.baguette.src} alt={content.testimonial.images.baguette.alt} loading="lazy" data-editable-path="testimonial.images.baguette.src" data-editable-type="image" data-editable-alt-path="testimonial.images.baguette.alt" />
      <img className="bcb-test-cinnamon" src={content.testimonial.images.cinnamon.src} alt={content.testimonial.images.cinnamon.alt} loading="lazy" data-editable-path="testimonial.images.cinnamon.src" data-editable-type="image" data-editable-alt-path="testimonial.images.cinnamon.alt" />
      <img className="bcb-test-pretzel" src={content.testimonial.images.pretzel.src} alt={content.testimonial.images.pretzel.alt} loading="lazy" data-editable-path="testimonial.images.pretzel.src" data-editable-type="image" data-editable-alt-path="testimonial.images.pretzel.alt" />
      <p className="bcb-script-title" data-editable-path="testimonial.eyebrow" data-editable-type="text">{content.testimonial.eyebrow}</p>
      <blockquote>
        <p data-editable-path="testimonial.quote" data-editable-type="text">"{content.testimonial.quote}"</p>
        <cite data-editable-path="testimonial.author" data-editable-type="text">{content.testimonial.author}</cite>
      </blockquote>
    </section>
  );
}

function GallerySection({ content }: { content: BlushCrumbData }) {
  return (
    <section className="bcb-gallery" data-bcb-reveal>
      <h2 data-editable-path="gallery.title" data-editable-type="text">{content.gallery.title}</h2>
      <div className="bcb-gallery-strip">
        <button className="bcb-gallery-arrow" type="button" aria-label="Previous gallery image">&lt;</button>
        {content.gallery.items.map((item, index) => (
          <figure className={`bcb-gallery-item bcb-gallery-item-${index + 1}`} key={`${item.src}-${index}`}>
            <img src={item.src} alt={item.alt} loading="eager" data-editable-path={`gallery.items.${index}.src`} data-editable-type="image" data-editable-alt-path={`gallery.items.${index}.alt`} />
          </figure>
        ))}
        <button className="bcb-gallery-arrow" type="button" aria-label="Next gallery image">&gt;</button>
      </div>
    </section>
  );
}

function AboutPage({ content, navigate }: { content: BlushCrumbData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main className="bcb-subpage">
      <section className="bcb-page-hero">
        <img className="bcb-page-floater bcb-page-croissant" src={content.hero.images.croissant.src} alt={content.hero.images.croissant.alt} loading="eager" data-editable-path="hero.images.croissant.src" data-editable-type="image" data-editable-alt-path="hero.images.croissant.alt" />
        <h1 data-editable-path="pages.about.title" data-editable-type="text">{content.pages.about.title}</h1>
        <p data-editable-path="pages.about.body" data-editable-type="text">{content.pages.about.body}</p>
        <a className="bcb-sticker" href={`#${content.pages.about.cta.href}`} onClick={(event) => navigate(content.pages.about.cta.href, event)} data-editable-path="pages.about.cta.label" data-editable-type="link" data-editable-href-path="pages.about.cta.href">{content.pages.about.cta.label} <StickerArrow /></a>
      </section>
      <section className="bcb-split bcb-pink-panel">
        <img src={content.pages.about.image} alt={content.pages.about.imageAlt} data-editable-path="pages.about.image" data-editable-type="image" data-editable-alt-path="pages.about.imageAlt" />
        <div>
          <p className="bcb-script-title" data-editable-path="pages.about.calloutTitle" data-editable-type="text">{content.pages.about.calloutTitle}</p>
          <p data-editable-path="pages.about.calloutBody" data-editable-type="text">{content.pages.about.calloutBody}</p>
        </div>
      </section>
      <TestimonialSection content={content} />
    </main>
  );
}

function MenuPage({ content, navigate }: { content: BlushCrumbData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main className="bcb-subpage">
      <section className="bcb-page-hero bcb-menu-hero">
        <img className="bcb-page-floater bcb-page-cookie" src={content.hero.images.chocolateCookie.src} alt={content.hero.images.chocolateCookie.alt} loading="eager" data-editable-path="hero.images.chocolateCookie.src" data-editable-type="image" data-editable-alt-path="hero.images.chocolateCookie.alt" />
        <h1 data-editable-path="pages.menu.title" data-editable-type="text">{content.pages.menu.title}</h1>
        <p data-editable-path="pages.menu.intro" data-editable-type="text">{content.pages.menu.intro}</p>
      </section>
      <section className="bcb-menu-list bcb-pink-panel">
        <div className="bcb-notch" aria-hidden="true" />
        {content.pages.menu.sections.map((section, sectionIndex) => (
          <div className="bcb-menu-block" key={`${section.title}-${sectionIndex}`}>
            <h2 data-editable-path={`pages.menu.sections.${sectionIndex}.title`} data-editable-type="text">{section.title}</h2>
            {section.items.map((item, itemIndex) => (
              <article key={`${item.name}-${itemIndex}`}>
                <div>
                  <h3 data-editable-path={`pages.menu.sections.${sectionIndex}.items.${itemIndex}.name`} data-editable-type="text">{item.name}</h3>
                  <p data-editable-path={`pages.menu.sections.${sectionIndex}.items.${itemIndex}.description`} data-editable-type="text">{item.description}</p>
                </div>
                <strong data-editable-path={`pages.menu.sections.${sectionIndex}.items.${itemIndex}.price`} data-editable-type="text">{item.price}</strong>
              </article>
            ))}
          </div>
        ))}
      </section>
      <section className="bcb-menu-callout">
        <img src={content.featured.items[3].image} alt={content.featured.items[3].imageAlt} data-editable-path="featured.items.3.image" data-editable-type="image" data-editable-alt-path="featured.items.3.imageAlt" />
        <a className="bcb-sticker" href={`#${content.pages.menu.cta.href}`} onClick={(event) => navigate(content.pages.menu.cta.href, event)} data-editable-path="pages.menu.cta.label" data-editable-type="link" data-editable-href-path="pages.menu.cta.href">{content.pages.menu.cta.label} <StickerArrow /></a>
      </section>
    </main>
  );
}

function VisitPage({ content }: { content: BlushCrumbData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <main className="bcb-subpage">
      <section className="bcb-page-hero bcb-visit-hero">
        <img className="bcb-page-floater bcb-page-roll" src={content.hero.images.cinnamon.src} alt={content.hero.images.cinnamon.alt} loading="eager" data-editable-path="hero.images.cinnamon.src" data-editable-type="image" data-editable-alt-path="hero.images.cinnamon.alt" />
        <h1 data-editable-path="pages.visit.title" data-editable-type="text">{content.pages.visit.title}</h1>
        <p data-editable-path="pages.visit.intro" data-editable-type="text">{content.pages.visit.intro}</p>
      </section>
      <section className="bcb-visit-grid bcb-pink-panel">
        <div>
          <h2 data-editable-path="pages.visit.findTitle" data-editable-type="text">{content.pages.visit.findTitle}</h2>
          <p><span data-editable-path="brand.addressLine1" data-editable-type="text">{content.brand.addressLine1}</span><br /><span data-editable-path="brand.addressLine2" data-editable-type="text">{content.brand.addressLine2}</span></p>
          <p><span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span><br /><span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span></p>
          <div className="bcb-hours">
            {content.pages.visit.hours.map((item, index) => (
              <p key={`${item.day}-${index}`}><span data-editable-path={`pages.visit.hours.${index}.day`} data-editable-type="text">{item.day}</span><strong data-editable-path={`pages.visit.hours.${index}.time`} data-editable-type="text">{item.time}</strong></p>
            ))}
          </div>
        </div>
        <form className="bcb-form">
          <label>
            <span data-editable-path="pages.visit.form.nameLabel" data-editable-type="text">{content.pages.visit.form.nameLabel}</span>
            <input type="text" />
          </label>
          <label>
            <span data-editable-path="pages.visit.form.emailLabel" data-editable-type="text">{content.pages.visit.form.emailLabel}</span>
            <input type="email" />
          </label>
          <label>
            <span data-editable-path="pages.visit.form.messageLabel" data-editable-type="text">{content.pages.visit.form.messageLabel}</span>
            <textarea rows={4} />
          </label>
          <button type="button" data-editable-path="pages.visit.form.button" data-editable-type="text">{content.pages.visit.form.button}</button>
        </form>
      </section>
      <GallerySection content={content} />
    </main>
  );
}

function PolicyPage({ content, page, navigate }: { content: BlushCrumbData; page: PageId; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  const label = content.footer.policies.find((item) => item.href === page)?.label ?? "Policy";
  return (
    <main className="bcb-subpage">
      <section className="bcb-page-hero">
        <h1>{label}</h1>
        <p data-editable-path="pages.policies.body" data-editable-type="text">{content.pages.policies.body}</p>
        <a className="bcb-sticker" href={`#${content.pages.policies.backHref}`} onClick={(event) => navigate(content.pages.policies.backHref, event)} data-editable-path="pages.policies.backLabel" data-editable-type="link" data-editable-href-path="pages.policies.backHref">{content.pages.policies.backLabel} <StickerArrow /></a>
      </section>
    </main>
  );
}

function Footer({ content, navigate }: { content: BlushCrumbData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <footer className="bcb-footer">
      <div className="bcb-notch" aria-hidden="true" />
      <section className="bcb-newsletter">
        <div>
          <h2 data-editable-path="newsletter.title" data-editable-type="text">{content.newsletter.title}</h2>
          <p data-editable-path="newsletter.body" data-editable-type="text">{content.newsletter.body}</p>
        </div>
        <form>
          <label>
            <span data-editable-path="newsletter.emailLabel" data-editable-type="text">{content.newsletter.emailLabel}</span>
            <input type="email" />
          </label>
          <label className="bcb-checkbox">
            <input type="checkbox" />
            <span data-editable-path="newsletter.checkboxLabel" data-editable-type="text">{content.newsletter.checkboxLabel}</span>
          </label>
          <button type="button" data-editable-path="newsletter.button" data-editable-type="text">{content.newsletter.button}</button>
        </form>
      </section>
      <section className="bcb-footer-main">
        <address>
          <span data-editable-path="brand.addressLine1" data-editable-type="text">{content.brand.addressLine1}</span><br />
          <span data-editable-path="brand.addressLine2" data-editable-type="text">{content.brand.addressLine2}</span><br /><br />
          <span data-editable-path="brand.email" data-editable-type="text">{content.brand.email}</span><br />
          <span data-editable-path="brand.phone" data-editable-type="text">{content.brand.phone}</span>
        </address>
        <nav aria-label="Footer navigation">
          {content.footer.links.map((link, index) => (
            <a key={`${link.label}-${index}`} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} data-editable-path={`footer.links.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.links.${index}.href`}>{link.label}</a>
          ))}
        </nav>
        <div className="bcb-social">
          {content.footer.social.map((link, index) => (
            <a key={`${link.label}-${index}`} href={link.href} data-editable-path={`footer.social.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.social.${index}.href`}>{link.label}</a>
          ))}
        </div>
      </section>
      <button className="bcb-footer-wordmark" type="button" onClick={(event) => navigate("home", event)} data-editable-path="brand.name" data-editable-type="text">{content.brand.name}</button>
      <section className="bcb-footer-bottom">
        <nav aria-label="Policies">
          {content.footer.policies.map((link, index) => (
            <a key={`${link.label}-${index}`} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} data-editable-path={`footer.policies.${index}.label`} data-editable-type="link" data-editable-href-path={`footer.policies.${index}.href`}>{link.label}</a>
          ))}
        </nav>
        <p data-editable-path="footer.copyright" data-editable-type="text">{content.footer.copyright}</p>
      </section>
    </footer>
  );
}
