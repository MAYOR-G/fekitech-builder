"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, At, List, MapPin, Sparkle, X } from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type LacquerFormData = typeof editableData;

export default function LacquerFormNailAtelierTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as LacquerFormData;
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("All");
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [activeService, setActiveService] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const themeStyle = useMemo(
    () =>
      ({
        "--lf-berry": content.theme.colors.berry,
        "--lf-blush": content.theme.colors.blush,
        "--lf-charcoal": content.theme.colors.charcoal,
        "--lf-ivory": content.theme.colors.ivory,
        "--lf-rose": content.theme.colors.roseGold,
        "--lf-muted": content.theme.colors.muted,
        "--lf-white": content.theme.colors.white,
        "--lf-heading": content.theme.typography.heading,
        "--lf-body": content.theme.typography.body,
      }) as CSSProperties,
    [content.theme],
  );

  const filteredPortfolio = content.portfolio.items.filter(
    (item) => filter === "All" || item.category === filter,
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-lf-reveal]"));
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [content, filter]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveTestimonial((current) => (current + 1) % content.testimonials.items.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [content.testimonials.items.length]);

  const testimonial = content.testimonials.items[activeTestimonial];

  return (
    <div ref={rootRef} className="lacquer-form" data-template-id="lacquer-form-nail-atelier" style={themeStyle}>
      <a className="lf-skip" href="#lf-main">Skip to content</a>
      <header className={scrolled || menuOpen ? "lf-header is-solid" : "lf-header"}>
        <div className="lf-shell lf-nav">
          <a className="lf-logo" href="#lf-top">{content.brand.name}</a>
          <nav className={menuOpen ? "lf-links is-open" : "lf-links"} aria-label="Primary navigation">
            {content.navigation.links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
            ))}
          </nav>
          <a className="lf-pill lf-nav-book" href={content.navigation.buttonHref}>{content.navigation.buttonLabel}</a>
          <button className="lf-menu" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
          </button>
        </div>
      </header>

      <main id="lf-main">
        <section className="lf-hero" id="lf-top">
          <TemplateImage src={content.hero.image} alt={content.hero.imageAlt} width={1800} height={1200} priority loading="eager" />
          <span className="lf-hero-shade" aria-hidden="true" />
          <div className="lf-shell lf-hero-inner">
            <div>
              <p className="lf-label">{content.hero.eyebrow}</p>
              <h1><span>{content.hero.titleLineOne}</span><em>{content.hero.titleLineTwo}</em></h1>
              <p className="lf-hero-copy">{content.hero.description}</p>
              <div className="lf-hero-actions">
                <a className="lf-pill" href={content.hero.primaryHref}>{content.hero.primaryLabel}</a>
                <a className="lf-pill is-outline" href={content.hero.secondaryHref}>{content.hero.secondaryLabel}</a>
              </div>
            </div>
          </div>
          <a className="lf-scroll" href="#lf-about" aria-label="Scroll to studio introduction"><span /><b>⌄</b></a>
        </section>

        <section className="lf-section lf-about" id="lf-about">
          <div className="lf-shell lf-about-grid">
            <figure data-lf-reveal>
              <TemplateImage src={content.about.image} alt={content.about.imageAlt} width={1200} height={1200} loading="lazy" />
            </figure>
            <div data-lf-reveal>
              <p className="lf-label">{content.about.eyebrow}</p>
              <h2>{content.about.title}</h2>
              <p className="lf-body-copy">{content.about.description}</p>
              <div className="lf-signature"><span />{content.about.signature}</div>
            </div>
          </div>
        </section>

        <section className="lf-section lf-portfolio" id="lf-work">
          <div className="lf-shell">
            <div className="lf-heading is-centered" data-lf-reveal>
              <p className="lf-label">{content.portfolio.eyebrow}</p>
              <h2>{content.portfolio.title}</h2>
            </div>
            <div className="lf-filters" role="tablist" aria-label="Portfolio filters">
              {content.portfolio.filters.map((item) => (
                <button className={filter === item ? "is-active" : ""} key={item} type="button" role="tab" aria-selected={filter === item} onClick={() => { setFilter(item); setActiveImage(null); }}>
                  {item}
                </button>
              ))}
            </div>
            <div className="lf-portfolio-grid">
              {filteredPortfolio.map((item, index) => (
                <button className={item.featured ? "lf-portfolio-card is-featured" : "lf-portfolio-card"} key={item.title} type="button" onClick={() => setActiveImage(index)} data-lf-reveal>
                  <TemplateImage src={item.src} alt={item.alt} width={1200} height={1000} loading="lazy" />
                  <span><b>{item.title}</b></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="lf-section lf-services" id="lf-services">
          <div className="lf-shell lf-services-grid">
            <div>
              <div className="lf-heading" data-lf-reveal>
                <p className="lf-label">{content.services.eyebrow}</p>
                <h2>{content.services.title}</h2>
              </div>
              <div className="lf-service-list">
                {content.services.items.map((service, index) => (
                  <button className={activeService === index ? "is-active" : ""} type="button" key={service.name} onMouseEnter={() => setActiveService(index)} onFocus={() => setActiveService(index)} onClick={() => setActiveService(index)} data-lf-reveal>
                    <span><strong>{service.name}</strong><small>{service.description}</small></span>
                    <b>{service.price}</b>
                  </button>
                ))}
              </div>
            </div>
            <figure className="lf-service-image" data-lf-reveal>
              <TemplateImage src={content.services.items[activeService].image} alt={content.services.items[activeService].imageAlt} width={1000} height={1300} loading="lazy" />
            </figure>
          </div>
        </section>

        <section className="lf-section lf-process">
          <div className="lf-shell">
            <div className="lf-heading" data-lf-reveal>
              <p className="lf-label">{content.process.eyebrow}</p>
              <h2>{content.process.title}</h2>
            </div>
            <div className="lf-process-grid">
              {content.process.steps.map((step) => (
                <article key={step.number} data-lf-reveal>
                  <span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lf-section lf-testimonials">
          <div className="lf-shell">
            <h2 data-lf-reveal>{content.testimonials.title}</h2>
            <div className="lf-quote-mark">“</div>
            <figure key={testimonial.name}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption><b>{testimonial.name}</b><span>{testimonial.service}</span></figcaption>
            </figure>
            <div className="lf-testimonial-controls">
              <button type="button" aria-label="Previous testimonial" onClick={() => setActiveTestimonial((activeTestimonial - 1 + content.testimonials.items.length) % content.testimonials.items.length)}><ArrowLeft aria-hidden="true" /></button>
              {content.testimonials.items.map((item, index) => <button className={index === activeTestimonial ? "is-active" : ""} type="button" key={item.name} aria-label={`Show testimonial ${index + 1}`} onClick={() => setActiveTestimonial(index)} />)}
              <button type="button" aria-label="Next testimonial" onClick={() => setActiveTestimonial((activeTestimonial + 1) % content.testimonials.items.length)}><ArrowRight aria-hidden="true" /></button>
            </div>
          </div>
        </section>

        <section className="lf-section lf-social">
          <div className="lf-shell">
            <div className="lf-heading is-centered" data-lf-reveal>
              <p className="lf-label">{content.social.eyebrow}</p>
              <h2>{content.social.title}</h2>
            </div>
            <div className="lf-social-grid">
              {content.social.images.map((image) => (
                <a href={content.social.link} key={image.src} aria-label={image.alt} data-lf-reveal>
                  <TemplateImage src={image.src} alt={image.alt} width={500} height={500} loading="lazy" /><At aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="lf-booking" id="lf-book">
          <div className="lf-shell" data-lf-reveal>
            <Sparkle aria-hidden="true" weight="fill" />
            <h2>{content.booking.title}</h2>
            <p>{content.booking.description}</p>
            <a className="lf-pill is-white" href={content.booking.buttonHref}>{content.booking.buttonLabel}<ArrowUpRight aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer className="lf-footer">
        <div className="lf-shell">
          <div className="lf-footer-grid">
            <div><h2>{content.brand.name}</h2><p>{content.brand.tagline}</p><div className="lf-social-links">{content.footer.socialLinks.map((link) => <a key={link.label} href={link.href}>{link.label.slice(0, 1)}</a>)}</div></div>
            <nav aria-label="Footer navigation">{content.footer.links.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}</nav>
            <address>
              <p><MapPin aria-hidden="true" />{content.brand.address}</p>
              <p><At aria-hidden="true" /><span><a href={content.brand.emailHref}>{content.brand.email}</a><a href={content.brand.phoneHref}>{content.brand.phone}</a></span></p>
              <p><Sparkle aria-hidden="true" />{content.brand.hours}</p>
            </address>
          </div>
          <div className="lf-footer-bottom"><span>{content.footer.copyright}</span><a href={content.footer.backToTopHref}>{content.footer.backToTopLabel}</a></div>
        </div>
      </footer>

      {activeImage !== null && filteredPortfolio[activeImage] && (
        <div className="lf-modal" role="dialog" aria-modal="true" aria-label={filteredPortfolio[activeImage].title}>
          <button type="button" onClick={() => setActiveImage(null)} aria-label="Close portfolio image"><X aria-hidden="true" /></button>
          <figure><TemplateImage src={filteredPortfolio[activeImage].src} alt={filteredPortfolio[activeImage].alt} width={1400} height={1200} /></figure>
        </div>
      )}
    </div>
  );
}
