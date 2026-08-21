"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useMemo, useState, type CSSProperties } from "react";
import editableData from "./editable.json";
import "./styles.css";

type KidocareData = typeof editableData;

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

/* Vector Graphic Components */
function LogoIcon() {
  return (
    <svg className="kc-logo-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="16" fill="#cff145" />
      <path d="M11 18C11 14.134 14.134 11 18 11C21.866 11 25 14.134 25 18C25 21.866 21.866 25 18 25" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="18" cy="18" r="3.5" fill="#000000" />
    </svg>
  );
}

function WavyPinkBadge({ text, path }: { text: string; path: string }) {
  return (
    <span className="kc-sticker kc-sticker-pink" {...editableText(path)}>
      {text}
    </span>
  );
}

function GreenFlowerBadge({ text, path }: { text: string; path: string }) {
  return (
    <span className="kc-sticker kc-sticker-green" {...editableText(path)}>
      {text}
    </span>
  );
}

function PurplePillBadge({ text, path }: { text: string; path: string }) {
  return (
    <span className="kc-sticker kc-sticker-purple" {...editableText(path)}>
      {text}
    </span>
  );
}

function OrangeScallopBadge({ text, path }: { text: string; path: string }) {
  return (
    <span className="kc-sticker kc-sticker-orange" {...editableText(path)}>
      {text}
    </span>
  );
}

function TeacherBlob({ index }: { index: number }) {
  const colors = ["#fece80", "#cff145", "#d8a3f3"];
  const color = colors[index % colors.length];
  return (
    <svg className="kc-teacher-blob" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      {index === 0 && (
        <path d="M138 60C148 95 125 135 90 145C55 155 25 130 15 95C5 60 30 25 65 15C100 5 128 25 138 60Z" fill={color} />
      )}
      {index === 1 && (
        <path d="M142 80C142 120 115 145 78 145C41 145 18 118 18 80C18 42 45 15 82 15C119 15 142 40 142 80Z" fill={color} />
      )}
      {index === 2 && (
        <path d="M135 90C125 128 95 145 60 140C25 135 15 105 20 70C25 35 55 18 90 22C125 26 145 52 135 90Z" fill={color} />
      )}
    </svg>
  );
}

export default function KidocareDaycareTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as KidocareData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const themeStyle = useMemo(() => ({
    "--kc-page": content.theme.colors.page,
    "--kc-section": content.theme.colors.section,
    "--kc-surface": content.theme.colors.surface,
    "--kc-card": content.theme.colors.card,
    "--kc-card-border": content.theme.colors.cardBorder,
    "--kc-heading": content.theme.colors.heading,
    "--kc-body": content.theme.colors.body,
    "--kc-muted": content.theme.colors.muted,
    "--kc-accent": content.theme.colors.accent,
    "--kc-accent-text": content.theme.colors.accentText,
    "--kc-badge-pink": content.theme.colors.badgePink,
    "--kc-badge-green": content.theme.colors.badgeGreen,
    "--kc-badge-purple": content.theme.colors.badgePurple,
    "--kc-badge-orange": content.theme.colors.badgeOrange,
    "--kc-banner-yellow": content.theme.colors.bannerYellow,
    "--kc-font-heading": content.theme.typography.heading,
    "--kc-font-body": content.theme.typography.body,
  }) as CSSProperties, [content.theme]);

  const testimonial = content.testimonials.items[activeTestimonial] || content.testimonials.items[0];

  return (
    <div className="kidocare-daycare" data-template-id="kidocare-daycare" style={themeStyle}>
      {/* Header */}
      <header className="kc-header">
        <div className="kc-container kc-header-inner">
          <a className="kc-logo" href="#kc-hero">
            <LogoIcon />
            <span {...editableText("brand.name")}>{content.brand.name}</span>
          </a>

          <nav className="kc-nav" aria-label="Main Navigation">
            {content.navigation.links.map((link, idx) => (
              <a
                key={idx}
                className="kc-nav-link"
                href={link.href}
                {...editableLink(`navigation.links.${idx}.label`, `navigation.links.${idx}.href`)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="kc-header-actions">
            <div className="kc-header-phone">
              <span>Call Us</span>
              <a href={content.navigation.phoneHref} {...editableLink("navigation.phoneLabel", "navigation.phoneHref")}>
                <strong>{content.navigation.phoneLabel}</strong>
              </a>
            </div>
            <a
              className="kc-btn"
              href={content.navigation.buttonHref}
              {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}
            >
              {content.navigation.buttonLabel}
            </a>
            <button
              className="kc-mobile-toggle"
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="7" x2="20" y2="7" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="17" x2="20" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="kc-mobile-nav">
            {content.navigation.links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                {...editableLink(`navigation.links.${idx}.label`, `navigation.links.${idx}.href`)}
              >
                {link.label}
              </a>
            ))}
            <a
              className="kc-btn"
              href={content.navigation.buttonHref}
              onClick={() => setMobileMenuOpen(false)}
              {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}
            >
              {content.navigation.buttonLabel}
            </a>
          </div>
        )}
      </header>

      <main id="kc-hero">
        {/* Hero Section */}
        <section className="kc-hero">
          <div className="kc-container">
            <div className="kc-hero-headline-wrap">
              <div className="kc-hero-badge-1">
                <WavyPinkBadge text={content.hero.stickerSafe} path="hero.stickerSafe" />
              </div>
              <h1 className="kc-hero-title" {...editableText("hero.title")}>
                {content.hero.title}
              </h1>
              <div className="kc-hero-badge-2">
                <GreenFlowerBadge text={content.hero.stickerCare} path="hero.stickerCare" />
              </div>
              <div className="kc-hero-badge-3">
                <PurplePillBadge text={content.hero.stickerGuided} path="hero.stickerGuided" />
              </div>
            </div>

            <div className="kc-hero-image-wrap">
              <img
                className="kc-hero-img"
                src={content.hero.image}
                alt={content.hero.imageAlt}
                {...editableImage("hero.image", "hero.imageAlt")}
              />
              <div className="kc-hero-card-float">
                <strong {...editableText("hero.badgeTitle")}>{content.hero.badgeTitle}</strong>
                <div className="kc-hero-card-stars">
                  <span>{content.hero.badgeStars}</span>
                  <strong {...editableText("hero.badgeRating")}>{content.hero.badgeRating}</strong>
                  <span {...editableText("hero.badgeReviews")}>({content.hero.badgeReviews})</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Built on Trust (Features Grid) */}
        <section className="kc-trust" id="kc-trust">
          <div className="kc-container">
            <div className="kc-section-head">
              <OrangeScallopBadge text={content.trust.sticker} path="trust.sticker" />
              <h2 {...editableText("trust.title")}>{content.trust.title}</h2>
            </div>
            <div className="kc-trust-grid">
              {content.trust.items.map((item, idx) => (
                <article key={idx} className="kc-trust-card">
                  <div>
                    <h3 {...editableText(`trust.items.${idx}.title`)}>{item.title}</h3>
                    <p {...editableText(`trust.items.${idx}.description`)}>{item.description}</p>
                  </div>
                  <div className="kc-trust-img-wrap">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      {...editableImage(`trust.items.${idx}.image`, `trust.items.${idx}.imageAlt`)}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="kc-story" id="kc-story">
          <div className="kc-container kc-story-inner">
            <div className="kc-story-image-wrap">
              <img
                src={content.story.image}
                alt={content.story.imageAlt}
                loading="lazy"
                {...editableImage("story.image", "story.imageAlt")}
              />
            </div>
            <div className="kc-story-content">
              <GreenFlowerBadge text={content.story.badge} path="story.badge" />
              <h2 {...editableText("story.title")}>{content.story.title}</h2>
              <p {...editableText("story.body")}>{content.story.body}</p>
              <a
                className="kc-btn"
                href={content.story.buttonHref}
                {...editableLink("story.buttonLabel", "story.buttonHref")}
              >
                {content.story.buttonLabel} →
              </a>
            </div>
          </div>
        </section>

        {/* Our Programs */}
        <section className="kc-programs" id="kc-programs">
          <div className="kc-container">
            <div className="kc-programs-header">
              <div className="kc-programs-title-group">
                <PurplePillBadge text={content.programs.badge} path="programs.badge" />
                <h2 {...editableText("programs.title")}>{content.programs.title}</h2>
              </div>
              <div className="kc-programs-controls">
                <button className="kc-arrow-btn" type="button" aria-label="Previous Program" onClick={() => {}}>
                  ←
                </button>
                <button className="kc-arrow-btn" type="button" aria-label="Next Program" onClick={() => {}}>
                  →
                </button>
              </div>
            </div>

            <div className="kc-programs-grid">
              {content.programs.items.map((program, idx) => (
                <article key={idx} className="kc-program-card">
                  <div>
                    <span className="kc-program-age" {...editableText(`programs.items.${idx}.age`)}>
                      {program.age}
                    </span>
                    <h3 {...editableText(`programs.items.${idx}.title`)}>{program.title}</h3>
                    <p {...editableText(`programs.items.${idx}.description`)}>{program.description}</p>
                  </div>
                  <div className="kc-program-img-wrap">
                    <img
                      src={program.image}
                      alt={program.imageAlt}
                      loading="lazy"
                      {...editableImage(`programs.items.${idx}.image`, `programs.items.${idx}.imageAlt`)}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Daily Routine */}
        <section className="kc-routine" id="kc-routine">
          <div className="kc-container">
            <div className="kc-section-head">
              <WavyPinkBadge text={content.routine.badge} path="routine.badge" />
              <h2 {...editableText("routine.title")}>{content.routine.title}</h2>
            </div>
            <div className="kc-routine-grid">
              {content.routine.items.map((item, idx) => (
                <article key={idx} className="kc-routine-card">
                  <span className="kc-routine-time" {...editableText(`routine.items.${idx}.time`)}>
                    {item.time}
                  </span>
                  <h3 {...editableText(`routine.items.${idx}.title`)}>{item.title}</h3>
                  <p {...editableText(`routine.items.${idx}.description`)}>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Teachers */}
        <section className="kc-teachers" id="kc-teachers">
          <div className="kc-container">
            <div className="kc-section-head">
              <OrangeScallopBadge text={content.teachers.badge} path="teachers.badge" />
              <h2 {...editableText("teachers.title")}>{content.teachers.title}</h2>
            </div>
            <div className="kc-teachers-grid">
              {content.teachers.items.map((teacher, idx) => (
                <article key={idx} className="kc-teacher-card">
                  <div className="kc-teacher-photo-wrap">
                    <TeacherBlob index={idx} />
                    <img
                      className="kc-teacher-img"
                      src={teacher.image}
                      alt={teacher.imageAlt}
                      loading="lazy"
                      {...editableImage(`teachers.items.${idx}.image`, `teachers.items.${idx}.imageAlt`)}
                    />
                  </div>
                  <h3 {...editableText(`teachers.items.${idx}.name`)}>{teacher.name}</h3>
                  <span className="kc-teacher-role" {...editableText(`teachers.items.${idx}.role`)}>
                    {teacher.role}
                  </span>
                  <p {...editableText(`teachers.items.${idx}.bio`)}>{teacher.bio}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="kc-testimonial-section" id="kc-testimonials">
          <div className="kc-container">
            <div className="kc-testimonial-box">
              <div className="kc-testimonial-left">
                <h3 {...editableText("testimonials.title")}>{content.testimonials.title}</h3>
                <div className="kc-avatars-row">
                  {content.testimonials.items.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={activeTestimonial === idx ? "kc-avatar-btn is-active" : "kc-avatar-btn"}
                      aria-label={`View review from ${item.author}`}
                      onClick={() => setActiveTestimonial(idx)}
                    >
                      <img src={item.avatar} alt={item.author} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="kc-testimonial-quote-wrap">
                <p className="kc-testimonial-quote" {...editableText(`testimonials.items.${activeTestimonial}.quote`)}>
                  “{testimonial.quote}”
                </p>
                <div className="kc-testimonial-author">
                  <strong {...editableText(`testimonials.items.${activeTestimonial}.author`)}>
                    {testimonial.author}
                  </strong>{" "}
                  — <span {...editableText(`testimonials.items.${activeTestimonial}.role`)}>{testimonial.role}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted by Families / Stats */}
        <section className="kc-stats">
          <div className="kc-container kc-stats-inner">
            <div className="kc-stats-image-wrap">
              <img
                src={content.stats.image}
                alt={content.stats.imageAlt}
                loading="lazy"
                {...editableImage("stats.image", "stats.imageAlt")}
              />
            </div>
            <div className="kc-stats-content">
              <GreenFlowerBadge text={content.stats.badge} path="stats.badge" />
              <h2 {...editableText("stats.title")}>{content.stats.title}</h2>
              <p {...editableText("stats.description")}>{content.stats.description}</p>
              <div className="kc-stats-row">
                {content.stats.counters.map((counter, idx) => (
                  <div key={idx} className="kc-stat-item">
                    <strong {...editableText(`stats.counters.${idx}.value`)}>{counter.value}</strong>
                    <span {...editableText(`stats.counters.${idx}.label`)}>{counter.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Have Questions? (FAQ) */}
        <section className="kc-faq" id="kc-faq">
          <div className="kc-container">
            <div className="kc-section-head">
              <PurplePillBadge text={content.faq.badge} path="faq.badge" />
              <h2 {...editableText("faq.title")}>{content.faq.title}</h2>
            </div>
            <div className="kc-faq-list">
              {content.faq.items.map((item, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={isOpen ? "kc-faq-item is-open" : "kc-faq-item"}>
                    <button
                      className="kc-faq-trigger"
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                    >
                      <span {...editableText(`faq.items.${idx}.question`)}>{item.question}</span>
                      <span className="kc-faq-icon">{isOpen ? "−" : "+"}</span>
                    </button>
                    {isOpen && (
                      <div className="kc-faq-answer">
                        <p {...editableText(`faq.items.${idx}.answer`)}>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="kc-cta" id="kc-cta">
          <div className="kc-container">
            <div className="kc-cta-card">
              <div className="kc-cta-content">
                <WavyPinkBadge text={content.cta.badge} path="cta.badge" />
                <h2 {...editableText("cta.title")}>{content.cta.title}</h2>
                <p {...editableText("cta.subtitle")}>{content.cta.subtitle}</p>
                <a
                  className="kc-btn"
                  href={content.cta.buttonHref}
                  {...editableLink("cta.buttonLabel", "cta.buttonHref")}
                >
                  {content.cta.buttonLabel} →
                </a>
              </div>
              <div className="kc-cta-image-wrap">
                <span className="kc-cta-speech" {...editableText("cta.speechText")}>
                  {content.cta.speechText}
                </span>
                <img
                  className="kc-cta-child-img"
                  src={content.cta.image}
                  alt={content.cta.imageAlt}
                  loading="lazy"
                  {...editableImage("cta.image", "cta.imageAlt")}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="kc-footer">
        <div className="kc-container">
          <div className="kc-footer-grid">
            <div className="kc-footer-brand">
              <a className="kc-logo" href="#kc-hero">
                <LogoIcon />
                <span {...editableText("footer.brandName")}>{content.footer.brandName}</span>
              </a>
              <p {...editableText("footer.tagline")}>{content.footer.tagline}</p>
            </div>

            <div className="kc-footer-col">
              <h4 {...editableText("footer.programsTitle")}>{content.footer.programsTitle}</h4>
              <ul>
                {content.footer.programsLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      {...editableLink(`footer.programsLinks.${idx}.label`, `footer.programsLinks.${idx}.href`)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="kc-footer-col">
              <h4 {...editableText("footer.exploreTitle")}>{content.footer.exploreTitle}</h4>
              <ul>
                {content.footer.exploreLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      {...editableLink(`footer.exploreLinks.${idx}.label`, `footer.exploreLinks.${idx}.href`)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="kc-footer-col">
              <h4 {...editableText("footer.contactTitle")}>{content.footer.contactTitle}</h4>
              <ul>
                {content.footer.contactLines.map((line, idx) => (
                  <li key={idx} {...editableText(`footer.contactLines.${idx}`)}>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="kc-footer-bottom">
            <p {...editableText("footer.copyright")}>{content.footer.copyright}</p>
            <div className="kc-social-dots" aria-hidden="true">
              <span className="kc-social-dot" />
              <span className="kc-social-dot" />
              <span className="kc-social-dot" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
