"use client";

import { useMemo, useState, type CSSProperties, type FormEvent, type MouseEvent } from "react";
import type { TemplateData } from "@/lib/template-data";
import { iconSvg } from "@/lib/icon-library";

type RecordValue = Record<string, unknown>;
type NavItem = { label: string; page: string };
type ImageItem = { src: string; alt: string; caption?: string };
type CardItem = { icon?: string; title: string; text: string; meta?: string; href?: string };
type PageData = { eyebrow: string; title: string; body: string; image: string; imageAlt: string; cards: CardItem[] };

type BatchData = {
  theme: { colors: Record<string, string>; typography: { heading: string; body: string } };
  brand: { name: string; strapline: string; logo: string; logoAlt: string; phone: string; phoneHref: string; email: string; emailHref: string; address: string };
  navigation: { links: NavItem[]; ctaLabel: string; ctaPage: string };
  hero: { eyebrow: string; title: string; text: string; primaryLabel: string; primaryPage: string; secondaryLabel: string; secondaryPage: string; image: string; imageAlt: string; imageSecondary: string; imageSecondaryAlt: string; note: string };
  intro: { eyebrow: string; title: string; text: string; image: string; imageAlt: string; stats: { value: string; label: string }[] };
  services: { eyebrow: string; title: string; items: CardItem[] };
  gallery: { eyebrow: string; title: string; images: ImageItem[] };
  feature: { label: string; items: string[] };
  testimonials: { eyebrow: string; title: string; items: { quote: string; name: string }[] };
  cta: { eyebrow: string; title: string; text: string; label: string; page: string };
  footer: { note: string; legal: string; social: { label: string; href: string }[] };
  pages: Record<string, PageData>;
  homeOrder: string[];
};

function object(value: unknown): RecordValue { return value && typeof value === "object" && !Array.isArray(value) ? value as RecordValue : {}; }
function merge<T>(base: T, update: unknown): T {
  if (!update || typeof update !== "object" || Array.isArray(update)) return base;
  const output: RecordValue = { ...object(base) };
  for (const [key, value] of Object.entries(update as RecordValue)) {
    const current = output[key];
    output[key] = value && current && typeof value === "object" && typeof current === "object" && !Array.isArray(value) && !Array.isArray(current)
      ? merge(current, value) : value;
  }
  return output as T;
}

const text = (path: string) => ({ "data-editable-path": path, "data-editable-type": "text" });
const link = (path: string, hrefPath: string) => ({ "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath });
const image = (path: string, altPath: string) => ({ "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath });
const icon = (path: string) => ({ "data-editable-path": path, "data-editable-type": "icon" });

function Icon({ name, path }: { name?: string; path: string }) {
  if (!name) return null;
  return <span className="ukb-icon" {...icon(path)} dangerouslySetInnerHTML={{ __html: iconSvg(name) }} />;
}

export default function BatchTemplate({ id, layout, defaults, data }: { id: string; layout: number; defaults: BatchData; data: TemplateData }) {
  const content = useMemo(() => merge(defaults, data), [defaults, data]);
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const colors = content.theme.colors;
  const style = {
    "--ukb-page": colors.page, "--ukb-surface": colors.surface, "--ukb-card": colors.card,
    "--ukb-ink": colors.ink, "--ukb-muted": colors.muted, "--ukb-accent": colors.accent,
    "--ukb-accent-2": colors.accentSecondary, "--ukb-line": colors.line,
    "--ukb-heading": content.theme.typography.heading, "--ukb-body": content.theme.typography.body,
  } as CSSProperties;

  const navigate = (target: string, event?: MouseEvent<HTMLElement>) => {
    event?.preventDefault(); setPage(target || "home"); setMenuOpen(false); setSent(false);
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };

  const modules: Record<string, React.ReactNode> = {
    feature: <section className="ukb-feature"><strong {...text("feature.label")}>{content.feature.label}</strong><div>{content.feature.items.map((item, i) => <span key={`${item}-${i}`} {...text(`feature.items.${i}`)}>{item}</span>)}</div></section>,
    intro: <section className="ukb-intro ukb-shell"><div className="ukb-intro-copy"><p className="ukb-eyebrow" {...text("intro.eyebrow")}>{content.intro.eyebrow}</p><h2 {...text("intro.title")}>{content.intro.title}</h2><p {...text("intro.text")}>{content.intro.text}</p><div className="ukb-stats">{content.intro.stats.map((stat, i) => <div key={`${stat.value}-${i}`}><strong {...text(`intro.stats.${i}.value`)}>{stat.value}</strong><span {...text(`intro.stats.${i}.label`)}>{stat.label}</span></div>)}</div></div><img src={content.intro.image} alt={content.intro.imageAlt} loading="lazy" {...image("intro.image", "intro.imageAlt")} /></section>,
    services: <section className="ukb-services ukb-shell"><div className="ukb-section-head"><p className="ukb-eyebrow" {...text("services.eyebrow")}>{content.services.eyebrow}</p><h2 {...text("services.title")}>{content.services.title}</h2></div><div className="ukb-card-grid">{content.services.items.map((item, i) => <article key={`${item.title}-${i}`}><Icon name={item.icon} path={`services.items.${i}.icon`} /><span className="ukb-card-index">0{i + 1}</span><h3 {...text(`services.items.${i}.title`)}>{item.title}</h3><p {...text(`services.items.${i}.text`)}>{item.text}</p>{item.meta && <small {...text(`services.items.${i}.meta`)}>{item.meta}</small>}</article>)}</div></section>,
    gallery: <section className="ukb-gallery"><div className="ukb-shell ukb-section-head"><p className="ukb-eyebrow" {...text("gallery.eyebrow")}>{content.gallery.eyebrow}</p><h2 {...text("gallery.title")}>{content.gallery.title}</h2></div><div className="ukb-gallery-grid">{content.gallery.images.map((item, i) => <figure key={`${item.src}-${i}`}><img src={item.src} alt={item.alt} loading="lazy" {...image(`gallery.images.${i}.src`, `gallery.images.${i}.alt`)} />{item.caption && <figcaption {...text(`gallery.images.${i}.caption`)}>{item.caption}</figcaption>}</figure>)}</div></section>,
    testimonials: <section className="ukb-testimonials ukb-shell"><div className="ukb-section-head"><p className="ukb-eyebrow" {...text("testimonials.eyebrow")}>{content.testimonials.eyebrow}</p><h2 {...text("testimonials.title")}>{content.testimonials.title}</h2></div><div className="ukb-quotes">{content.testimonials.items.map((item, i) => <blockquote key={`${item.name}-${i}`}><p {...text(`testimonials.items.${i}.quote`)}>“{item.quote}”</p><cite {...text(`testimonials.items.${i}.name`)}>{item.name}</cite></blockquote>)}</div></section>,
    cta: <section className="ukb-cta ukb-shell"><p className="ukb-eyebrow" {...text("cta.eyebrow")}>{content.cta.eyebrow}</p><h2 {...text("cta.title")}>{content.cta.title}</h2><p {...text("cta.text")}>{content.cta.text}</p><a href={`#${content.cta.page}`} onClick={(e) => navigate(content.cta.page, e)} {...link("cta.label", "cta.page")}>{content.cta.label}</a></section>,
  };

  return <div data-template-id={id} className={`ukb ukb-${id}`} style={style}>
    <header className="ukb-header"><a className="ukb-brand" href="#home" onClick={(e) => navigate("home", e)}><img src={content.brand.logo} alt={content.brand.logoAlt} {...image("brand.logo", "brand.logoAlt")} /><span><b {...text("brand.name")}>{content.brand.name}</b><small {...text("brand.strapline")}>{content.brand.strapline}</small></span></a><nav className={menuOpen ? "is-open" : ""}>{content.navigation.links.map((item, i) => <a key={`${item.page}-${i}`} className={page === item.page ? "is-active" : ""} href={`#${item.page}`} onClick={(e) => navigate(item.page, e)} {...link(`navigation.links.${i}.label`, `navigation.links.${i}.page`)}>{item.label}</a>)}<a className="ukb-nav-cta" href={`#${content.navigation.ctaPage}`} onClick={(e) => navigate(content.navigation.ctaPage, e)} {...link("navigation.ctaLabel", "navigation.ctaPage")}>{content.navigation.ctaLabel}</a></nav><button className="ukb-menu" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen(v => !v)}><span /><span /></button></header>
    <main>
      {page === "home" ? <>
        <Hero layout={layout} content={content} navigate={navigate} />
        {content.homeOrder.map((name) => <div className={`ukb-module ukb-module-${name}`} key={name}>{modules[name]}</div>)}
      </> : <InnerPage page={page} content={content} navigate={navigate} submit={submit} sent={sent} />}
    </main>
    <footer className="ukb-footer"><div className="ukb-footer-main"><div><img src={content.brand.logo} alt="" /><h2 {...text("brand.name")}>{content.brand.name}</h2><p {...text("footer.note")}>{content.footer.note}</p></div><div><strong>Explore</strong>{content.navigation.links.map((item, i) => <a key={`${item.page}-footer`} href={`#${item.page}`} onClick={(e) => navigate(item.page, e)} {...link(`navigation.links.${i}.label`, `navigation.links.${i}.page`)}>{item.label}</a>)}</div><div><strong>Contact</strong><a href={content.brand.phoneHref} {...link("brand.phone", "brand.phoneHref")}>{content.brand.phone}</a><a href={content.brand.emailHref} {...link("brand.email", "brand.emailHref")}>{content.brand.email}</a><address {...text("brand.address")}>{content.brand.address}</address></div><div><strong>Follow</strong>{content.footer.social.map((item, i) => <a key={item.label} href={item.href} {...link(`footer.social.${i}.label`, `footer.social.${i}.href`)}>{item.label}</a>)}</div></div><p className="ukb-legal" {...text("footer.legal")}>{content.footer.legal}</p></footer>
  </div>;
}

function Hero({ layout, content, navigate }: { layout: number; content: BatchData; navigate: (target: string, e?: MouseEvent<HTMLElement>) => void }) {
  const Copy = () => <div className="ukb-hero-copy"><p className="ukb-eyebrow" {...text("hero.eyebrow")}>{content.hero.eyebrow}</p><h1 {...text("hero.title")}>{content.hero.title}</h1><p {...text("hero.text")}>{content.hero.text}</p><div className="ukb-actions"><a href={`#${content.hero.primaryPage}`} onClick={(e) => navigate(content.hero.primaryPage, e)} {...link("hero.primaryLabel", "hero.primaryPage")}>{content.hero.primaryLabel}</a><a href={`#${content.hero.secondaryPage}`} onClick={(e) => navigate(content.hero.secondaryPage, e)} {...link("hero.secondaryLabel", "hero.secondaryPage")}>{content.hero.secondaryLabel}</a></div><small {...text("hero.note")}>{content.hero.note}</small></div>;
  const MainImage = ({ className = "ukb-hero-main" }: { className?: string }) => <img className={className} src={content.hero.image} alt={content.hero.imageAlt} {...image("hero.image", "hero.imageAlt")} />;
  const SecondImage = ({ className = "ukb-hero-secondary" }: { className?: string }) => <img className={className} src={content.hero.imageSecondary} alt={content.hero.imageSecondaryAlt} {...image("hero.imageSecondary", "hero.imageSecondaryAlt")} />;
  if (layout === 1) return <section className="ukb-hero ukb-hero-academy"><aside><span>EST.</span><b>1898</b><i>York</i></aside><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /><strong>Prospectus<br />2026–27</strong></div></section>;
  if (layout === 2) return <section className="ukb-hero ukb-hero-hotel"><MainImage className="ukb-hero-backdrop" /><div className="ukb-hotel-panel"><Copy /><SecondImage /><span>16 rooms · one lovely house</span></div></section>;
  if (layout === 3) return <section className="ukb-hero ukb-hero-legal"><div className="ukb-legal-mark"><span>MB</span><small>01 / Counsel</small></div><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /></div></section>;
  if (layout === 4) return <section className="ukb-hero ukb-hero-ledger"><div className="ukb-ledger-grid"><span>01</span><span>Plan</span><span>Measure</span><span>Move</span></div><Copy /><div className="ukb-hero-media"><MainImage /><div><b>98%</b><small>client retention</small></div></div></section>;
  if (layout === 5) return <section className="ukb-hero ukb-hero-events"><SecondImage /><Copy /><MainImage /><em>Celebrations, composed beautifully</em></section>;
  if (layout === 6) return <section className="ukb-hero ukb-hero-vet"><div className="ukb-vet-orbit"><MainImage /><SecondImage /><span>Open today</span></div><Copy /><aside><b>Need advice?</b><small>Call our Bristol team</small></aside></section>;
  if (layout === 7) return <section className="ukb-hero ukb-hero-florist"><div className="ukb-florist-word">FIELD<br /><i>&amp;</i> STEM</div><div className="ukb-hero-media"><MainImage /><SecondImage /></div><Copy /></section>;
  if (layout === 8) return <section className="ukb-hero ukb-hero-nursery"><div className="ukb-play-shape">A<br />B<br />C</div><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /><span>Learn · play · belong</span></div></section>;
  if (layout === 9) return <section className="ukb-hero ukb-hero-motor"><div className="ukb-motor-code">BMW / 09</div><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /><span>MOT • SERVICE • REPAIR</span></div></section>;
  if (layout === 10) return <section className="ukb-hero ukb-hero-garden"><MainImage className="ukb-hero-backdrop" /><div className="ukb-garden-caption"><span>Landscape notes № 10</span><Copy /></div><SecondImage /></section>;
  if (layout === 11) return <section className="ukb-hero ukb-hero-restaurant"><div className="ukb-restaurant-date">SEASON / 08</div><div className="ukb-hero-media"><MainImage /><SecondImage /></div><Copy /><div className="ukb-restaurant-menu"><span>Tonight</span><b>Market menu</b><small>Six courses · £92</small></div></section>;
  if (layout === 12) return <section className="ukb-hero ukb-hero-pub"><div className="ukb-pub-sign">N<span>&amp;</span>C</div><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /></div><div className="ukb-pub-taps">CASK / KITCHEN / MUSIC</div></section>;
  if (layout === 13) return <section className="ukb-hero ukb-hero-burger"><div className="ukb-burger-stamp">SMASHED<br />TO ORDER</div><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /></div><div className="ukb-burger-price">FROM £9.50</div></section>;
  return <section className="ukb-hero ukb-hero-pizza"><div className="ukb-pizza-word">LUMA</div><Copy /><div className="ukb-hero-media"><MainImage /><SecondImage /></div><aside><b>48h</b><span>slow-fermented dough</span></aside></section>;
}

function InnerPage({ page, content, navigate, submit, sent }: { page: string; content: BatchData; navigate: (target: string, e?: MouseEvent<HTMLElement>) => void; submit: (e: FormEvent) => void; sent: boolean }) {
  const pageData = content.pages[page] ?? content.pages[Object.keys(content.pages)[0]];
  const isContact = /book|visit|contact|enquire/i.test(page);
  return <section className="ukb-page"><div className="ukb-page-hero"><div><p className="ukb-eyebrow" {...text(`pages.${page}.eyebrow`)}>{pageData.eyebrow}</p><h1 {...text(`pages.${page}.title`)}>{pageData.title}</h1><p {...text(`pages.${page}.body`)}>{pageData.body}</p></div><img src={pageData.image} alt={pageData.imageAlt} {...image(`pages.${page}.image`, `pages.${page}.imageAlt`)} /></div><div className="ukb-page-grid">{pageData.cards.map((item, i) => <article key={`${item.title}-${i}`}><Icon name={item.icon} path={`pages.${page}.cards.${i}.icon`} /><span>0{i + 1}</span><h2 {...text(`pages.${page}.cards.${i}.title`)}>{item.title}</h2><p {...text(`pages.${page}.cards.${i}.text`)}>{item.text}</p>{item.meta && <small {...text(`pages.${page}.cards.${i}.meta`)}>{item.meta}</small>}</article>)}</div>{isContact && <form className="ukb-form" onSubmit={submit}><h2>Start a conversation</h2><label>Name<input required /></label><label>Email<input type="email" required /></label><label>How can we help?<textarea rows={4} required /></label><button type="submit">Send enquiry</button>{sent && <p role="status">Thank you. This demonstration form is ready to connect to your preferred service.</p>}</form>}<a className="ukb-back" href="#home" onClick={(e) => navigate("home", e)}>Back to home</a></section>;
}

export type { BatchData };
