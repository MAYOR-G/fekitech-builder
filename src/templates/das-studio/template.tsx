"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Minus, Plus } from "lucide-react";
import React, { type CSSProperties } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type DasStudioData = typeof defaults;
type LinkItem = { label: string; href: string };
type HeroTile = { type: string; text: string; image: string; imageAlt: string };
type Project = { duration: string; title: string; category: string; image: string; imageAlt: string };
type Service = { number: string; title: string; details: string[]; text: string };
type FlowStep = { title: string; text: string; progress: string };
type Testimonial = { quote: string; name: string; role: string };
type Plan = { name: string; badge: string; description: string; price: string; period: string; buttonLabel: string; buttonHref: string; features: string[] };
type Faq = { question: string; answer: string };
type Article = { readTime: string; title: string; image: string; imageAlt: string };
type FooterProject = { title: string; image: string; imageAlt: string; href: string };
type FooterColumn = { title: string; links: LinkItem[] };

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function safeArray<T>(value: T[] | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

function CtaLink({ className, label, href, labelPath, hrefPath }: { className?: string; label: string; href: string; labelPath: string; hrefPath: string }) {
  return (
    <a className={className ?? "das-pill"} href={href} {...editableLink(labelPath, hrefPath)}>
      {label}
      <ArrowUpRight size={13} strokeWidth={2.5} />
    </a>
  );
}

function SectionHead({ id, eyebrow, count, text }: { id?: string; eyebrow: string; count?: string; text?: string }) {
  return (
    <div className="das-section-head">
      <h2 id={id}>{eyebrow}{count ? <sup>({count})</sup> : null}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function DasStudioTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as DasStudioData;
  const colors = content.theme.colors;
  const typography = content.theme.typography;
  const themeStyle = {
    "--das-page": colors.page,
    "--das-surface": colors.surface,
    "--das-card": colors.card,
    "--das-ink": colors.ink,
    "--das-body": colors.body,
    "--das-muted": colors.muted,
    "--das-line": colors.line,
    "--das-pill": colors.pill,
    "--das-pill-text": colors.pillText,
    "--das-pink": colors.softPink,
    "--das-blue": colors.blue,
    "--das-heading-font": typography.heading,
    "--das-body-font": typography.body
  } as CSSProperties;

  const navLinks = safeArray<LinkItem>(content.navigation.links);
  const heroTiles = safeArray<HeroTile>(content.hero.tiles);
  const projects = safeArray<Project>(content.projects.items);
  const services = safeArray<Service>(content.services.items);
  const flowSteps = safeArray<FlowStep>(content.flow.steps);
  const testimonials = safeArray<Testimonial>(content.testimonials.items);
  const plans = safeArray<Plan>(content.pricing.plans);
  const faqs = safeArray<Faq>(content.faq.items);
  const articles = safeArray<Article>(content.journal.items);
  const footerProjects = safeArray<FooterProject>(content.footer.projects);
  const footerColumns = safeArray<FooterColumn>(content.footer.columns);

  return (
    <main className="das-studio" data-template-id="das-studio" style={themeStyle}>
      <header className="das-hero">
        <div className="das-hero-top">
          <div>
            <a className="das-logo" href="#top" {...editableText("brand.name")}>{content.brand.name}</a>
            <p {...editableText("brand.tagline")}>{content.brand.tagline}</p>
            <div className="das-hero-actions">
              <CtaLink className="das-pill" label={content.navigation.primaryLabel} href={content.navigation.primaryHref} labelPath="navigation.primaryLabel" hrefPath="navigation.primaryHref" />
              <CtaLink className="das-text-link" label={content.navigation.secondaryLabel} href={content.navigation.secondaryHref} labelPath="navigation.secondaryLabel" hrefPath="navigation.secondaryHref" />
            </div>
          </div>
          <dl className="das-meta-list">
            {safeArray<{ label: string; value: string }>(content.hero.stats).map((stat, index) => (
              <div key={stat.label}>
                <dt {...editableText(`hero.stats.${index}.label`)}>{stat.label}</dt>
                <dd {...editableText(`hero.stats.${index}.value`)}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="das-tile-row" aria-label="Featured studio visuals">
          <button className="das-round-nav" type="button" aria-label="Previous visual"><ArrowLeft size={16} /></button>
          {heroTiles.map((tile, index) => (
            <figure className={`das-hero-tile is-${tile.type}`} key={`${tile.type}-${index}`}>
              {tile.type === "image" ? (
                <img src={tile.image} alt={tile.imageAlt} loading={index === 1 ? "eager" : "lazy"} {...editableImage(`hero.tiles.${index}.image`, `hero.tiles.${index}.imageAlt`)} />
              ) : tile.type === "text" ? (
                <span {...editableText(`hero.tiles.${index}.text`)}>{tile.text}</span>
              ) : (
                <span className="das-soft-sphere" aria-hidden="true" />
              )}
            </figure>
          ))}
          <button className="das-round-nav is-next" type="button" aria-label="Next visual"><ArrowRight size={16} /></button>
        </div>
      </header>

      <section className="das-intro" id="about">
        <div className="das-kicker" {...editableText("intro.eyebrow")}>{content.intro.eyebrow}</div>
        <div>
          <p className="das-large-copy" {...editableText("intro.title")}>{content.intro.title}</p>
          <div className="das-inline-actions">
            <CtaLink className="das-pill" label={content.intro.primaryLabel} href={content.intro.primaryHref} labelPath="intro.primaryLabel" hrefPath="intro.primaryHref" />
            <CtaLink className="das-text-link" label={content.intro.secondaryLabel} href={content.intro.secondaryHref} labelPath="intro.secondaryLabel" hrefPath="intro.secondaryHref" />
          </div>
          <div className="das-logo-proof">
            <p>★★★★★</p>
            <span {...editableText("intro.proofIntro")}>{content.intro.proofIntro}</span>
            <div>
              {safeArray<string>(content.intro.logos).map((logo, index) => <strong key={logo} {...editableText(`intro.logos.${index}`)}>{logo}</strong>)}
            </div>
          </div>
        </div>
        <span className="das-section-number" {...editableText("intro.number")}>{content.intro.number}</span>
      </section>

      <section className="das-projects" id="projects">
        <SectionHead id="projects-title" eyebrow={content.projects.eyebrow} count={content.projects.count} text={content.projects.text} />
        <div className="das-project-grid">
          {projects.map((project, index) => (
            <article key={project.title}>
              <figure>
                <img src={project.image} alt={project.imageAlt} {...editableImage(`projects.items.${index}.image`, `projects.items.${index}.imageAlt`)} />
                <figcaption {...editableText(`projects.items.${index}.category`)}>{project.category}</figcaption>
              </figure>
              <span {...editableText(`projects.items.${index}.duration`)}>{project.duration}</span>
              <h3 {...editableText(`projects.items.${index}.title`)}>{project.title}</h3>
            </article>
          ))}
        </div>
        <div className="das-section-foot">
          <p {...editableText("projects.note")}>{content.projects.note}</p>
          <CtaLink className="das-pill" label={content.projects.buttonLabel} href={content.projects.buttonHref} labelPath="projects.buttonLabel" hrefPath="projects.buttonHref" />
        </div>
      </section>

      <section className="das-services" id="services">
        <SectionHead eyebrow={content.services.eyebrow} count={content.services.count} text={content.services.text} />
        <div className="das-service-list">
          {services.map((service, index) => (
            <details key={service.title} open={index === 0}>
              <summary>
                <span {...editableText(`services.items.${index}.number`)}>{service.number}</span>
                <strong {...editableText(`services.items.${index}.title`)}>{service.title}</strong>
                <i><Plus className="das-plus" size={18} /><Minus className="das-minus" size={18} /></i>
              </summary>
              <div className="das-service-body">
                <ul>
                  {safeArray<string>(service.details).map((detail, detailIndex) => <li key={detail} {...editableText(`services.items.${index}.details.${detailIndex}`)}>{detail}</li>)}
                </ul>
                <p {...editableText(`services.items.${index}.text`)}>{service.text}</p>
              </div>
            </details>
          ))}
        </div>
        <div className="das-section-foot">
          <p {...editableText("services.fallback")}>{content.services.fallback}</p>
          <CtaLink className="das-pill" label={content.services.buttonLabel} href={content.services.buttonHref} labelPath="services.buttonLabel" hrefPath="services.buttonHref" />
        </div>
      </section>

      <section className="das-flow" id="flow">
        <SectionHead eyebrow={content.flow.eyebrow} text={content.flow.text} />
        <div className="das-flow-meta">
          <span {...editableText("flow.metaLeft")}>{content.flow.metaLeft}</span>
          <span {...editableText("flow.metaRight")}>{content.flow.metaRight}</span>
        </div>
        <div className="das-flow-grid">
          {flowSteps.map((step, index) => (
            <article key={step.title}>
              {index === 1 ? <span className="das-flow-icon" aria-hidden="true" /> : null}
              <h3 {...editableText(`flow.steps.${index}.title`)}>{step.title}</h3>
              <p {...editableText(`flow.steps.${index}.text`)}>{step.text}</p>
              <div className="das-progress" style={{ "--das-progress": step.progress } as CSSProperties}>
                <span {...editableText(`flow.steps.${index}.progress`)}>{step.progress}</span>
                <i />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="das-about">
        <div className="das-kicker" {...editableText("about.eyebrow")}>{content.about.eyebrow}</div>
        <div>
          <p className="das-large-copy" {...editableText("about.title")}>{content.about.title}</p>
          <div className="das-inline-actions">
            <CtaLink className="das-pill" label={content.about.primaryLabel} href={content.about.primaryHref} labelPath="about.primaryLabel" hrefPath="about.primaryHref" />
            <CtaLink className="das-text-link" label={content.about.secondaryLabel} href={content.about.secondaryHref} labelPath="about.secondaryLabel" hrefPath="about.secondaryHref" />
          </div>
          <img className="das-about-image" src={content.about.image} alt={content.about.imageAlt} {...editableImage("about.image", "about.imageAlt")} />
          <div className="das-stats">
            {safeArray<{ value: string; label: string }>(content.about.stats).map((stat, index) => (
              <div key={stat.label}>
                <strong {...editableText(`about.stats.${index}.value`)}>{stat.value}</strong>
                <span {...editableText(`about.stats.${index}.label`)}>{stat.label}</span>
              </div>
            ))}
            <p {...editableText("about.statNote")}>{content.about.statNote}</p>
          </div>
        </div>
        <span className="das-section-number" {...editableText("about.number")}>{content.about.number}</span>
      </section>

      <section className="das-testimonials">
        <div className="das-testimonial-head">
          <div>
            <span className="das-kicker" {...editableText("testimonials.eyebrow")}>{content.testimonials.eyebrow}</span>
            <h2 {...editableText("testimonials.title")}>{content.testimonials.title}</h2>
          </div>
          <div className="das-arrows" aria-hidden="true"><button type="button"><ArrowLeft size={16} /></button><button type="button"><ArrowRight size={16} /></button></div>
        </div>
        <div className="das-testimonial-grid">
          <figure>
            <img src={content.testimonials.image} alt={content.testimonials.imageAlt} {...editableImage("testimonials.image", "testimonials.imageAlt")} />
          </figure>
          {testimonials.map((item, index) => (
            <article key={item.name}>
              <div><span>★★★★★</span><small>{index + 2}/5</small></div>
              <blockquote {...editableText(`testimonials.items.${index}.quote`)}>“{item.quote}”</blockquote>
              <footer>
                <i />
                <span><strong {...editableText(`testimonials.items.${index}.name`)}>{item.name}</strong><em {...editableText(`testimonials.items.${index}.role`)}>{item.role}</em></span>
              </footer>
            </article>
          ))}
        </div>
        <div className="das-section-foot">
          <p><span>★★★★★</span><br /><span {...editableText("testimonials.summary")}>{content.testimonials.summary}</span></p>
          <CtaLink className="das-pill" label={content.testimonials.buttonLabel} href={content.testimonials.buttonHref} labelPath="testimonials.buttonLabel" hrefPath="testimonials.buttonHref" />
        </div>
      </section>

      <section className="das-pricing" id="pricing">
        <SectionHead eyebrow={content.pricing.eyebrow} count={content.pricing.count} text={content.pricing.text} />
        <div className="das-plan-grid">
          {plans.map((plan, index) => (
            <article key={plan.name}>
              <header>
                <h3 {...editableText(`pricing.plans.${index}.name`)}>{plan.name}</h3>
                <span {...editableText(`pricing.plans.${index}.badge`)}>{plan.badge}</span>
              </header>
              <p {...editableText(`pricing.plans.${index}.description`)}>{plan.description}</p>
              <strong><span {...editableText(`pricing.plans.${index}.price`)}>{plan.price}</span><small {...editableText(`pricing.plans.${index}.period`)}>{plan.period}</small></strong>
              <ul>
                {safeArray<string>(plan.features).map((feature, featureIndex) => (
                  <li key={feature}><CheckCircle2 size={14} /><span {...editableText(`pricing.plans.${index}.features.${featureIndex}`)}>{feature}</span></li>
                ))}
              </ul>
              <CtaLink className="das-pill is-wide" label={plan.buttonLabel} href={plan.buttonHref} labelPath={`pricing.plans.${index}.buttonLabel`} hrefPath={`pricing.plans.${index}.buttonHref`} />
            </article>
          ))}
        </div>
      </section>

      <section className="das-faq">
        <div className="das-faq-aside">
          <span className="das-kicker" {...editableText("faq.eyebrow")}>{content.faq.eyebrow}</span>
          <h2 {...editableText("faq.title")}>{content.faq.title}</h2>
          <h3 {...editableText("faq.supportTitle")}>{content.faq.supportTitle}</h3>
          <p {...editableText("faq.supportText")}>{content.faq.supportText}</p>
          <CtaLink className="das-pill" label={content.faq.buttonLabel} href={content.faq.buttonHref} labelPath="faq.buttonLabel" hrefPath="faq.buttonHref" />
        </div>
        <div className="das-faq-list">
          {faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary><span {...editableText(`faq.items.${index}.question`)}>{faq.question}</span><i><Plus className="das-plus" size={18} /><Minus className="das-minus" size={18} /></i></summary>
              <p {...editableText(`faq.items.${index}.answer`)}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="das-journal" id="journal">
        <div className="das-journal-head">
          <div>
            <span className="das-kicker" {...editableText("journal.eyebrow")}>{content.journal.eyebrow}</span>
            <h2 {...editableText("journal.title")}>{content.journal.title}</h2>
          </div>
          <CtaLink className="das-text-link" label={content.journal.buttonLabel} href={content.journal.buttonHref} labelPath="journal.buttonLabel" hrefPath="journal.buttonHref" />
        </div>
        <div className="das-article-grid">
          {articles.map((article, index) => (
            <article key={article.title}>
              <img src={article.image} alt={article.imageAlt} {...editableImage(`journal.items.${index}.image`, `journal.items.${index}.imageAlt`)} />
              <span {...editableText(`journal.items.${index}.readTime`)}>{article.readTime}</span>
              <h3 {...editableText(`journal.items.${index}.title`)}>{article.title}</h3>
              <a href={content.journal.buttonHref}>Read article <ArrowUpRight size={13} /></a>
            </article>
          ))}
        </div>
      </section>

      <section className="das-cta" id="contact">
        <span {...editableText("cta.eyebrow")}>{content.cta.eyebrow}</span>
        <h2 {...editableText("cta.title")}>{content.cta.title}</h2>
        <p {...editableText("cta.text")}>{content.cta.text}</p>
        <CtaLink className="das-pill" label={content.cta.buttonLabel} href={content.cta.buttonHref} labelPath="cta.buttonLabel" hrefPath="cta.buttonHref" />
      </section>

      <footer className="das-footer">
        <div className="das-footer-marquee" {...editableText("brand.name")}>{content.brand.name}</div>
        <nav className="das-footer-nav" aria-label="Footer navigation">
          {navLinks.map((link, index) => <a key={link.label} href={link.href} {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}>{link.label}</a>)}
        </nav>
        <div className="das-footer-main">
          <form>
            <label htmlFor="das-email" {...editableText("footer.newsletterTitle")}>{content.footer.newsletterTitle}</label>
            <input id="das-email" type="email" placeholder={content.footer.placeholder} aria-label={content.footer.placeholder} />
            <button type="button" {...editableText("footer.submitLabel")}>{content.footer.submitLabel} <ArrowUpRight size={13} /></button>
          </form>
          <div className="das-footer-projects">
            {footerProjects.map((project, index) => (
              <a key={project.title} href={project.href} {...editableLink(`footer.projects.${index}.title`, `footer.projects.${index}.href`)}>
                <img src={project.image} alt={project.imageAlt} {...editableImage(`footer.projects.${index}.image`, `footer.projects.${index}.imageAlt`)} />
                <span>{project.title}</span>
                <em>View project <ArrowUpRight size={13} /></em>
              </a>
            ))}
          </div>
          <div className="das-footer-columns">
            {footerColumns.map((column, columnIndex) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 {...editableText(`footer.columns.${columnIndex}.title`)}>{column.title}</h3>
                {safeArray<LinkItem>(column.links).map((link, linkIndex) => (
                  <a key={link.label} href={link.href} {...editableLink(`footer.columns.${columnIndex}.links.${linkIndex}.label`, `footer.columns.${columnIndex}.links.${linkIndex}.href`)}>{link.label}</a>
                ))}
              </nav>
            ))}
          </div>
        </div>
        <div className="das-footer-bottom">
          <span {...editableText("brand.address")}>{content.brand.address}</span>
          <span {...editableText("brand.copyright")}>{content.brand.copyright}</span>
          <span {...editableText("footer.credit")}>{content.footer.credit}</span>
        </div>
      </footer>
    </main>
  );
}
