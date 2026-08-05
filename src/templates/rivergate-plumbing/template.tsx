"use client";

import {
  ArrowUpRight,
  Check,
  ChevronUp,
  Clock3,
  Droplets,
  Mail,
  MapPin,
  Menu,
  Phone,
  Plus,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import editableData from "./editable.json";
import "./styles.css";

type RivergateData = typeof editableData;
type PageId = "home" | "services" | "team" | "testimonials" | "blogs" | "contact" | "privacy";

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function Brand({ name }: { name: string }) {
  return (
    <span className="rgp-brand">
      <span className="rgp-brand-icon" aria-hidden="true"><Droplets size={14} /></span>
      <span {...editableText("brand.name")}>{name}</span>
    </span>
  );
}

function CTA({
  label,
  href,
  path,
  hrefPath,
  onClick,
  variant = "lime",
}: {
  label: string;
  href: string;
  path: string;
  hrefPath: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "lime" | "light" | "dark";
}) {
  return (
    <a className={`rgp-cta rgp-cta-${variant}`} href={`#${href}`} onClick={onClick} {...editableLink(path, hrefPath)}>
      {label}
      <ArrowUpRight size={15} />
    </a>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="rgp-label">{children}</p>;
}

export default function RivergatePlumbingTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as RivergateData;
  const [page, setPage] = useState<PageId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const themeStyle = useMemo(
    () =>
      ({
        "--rgp-page": content.colors.pageBackground,
        "--rgp-mint": content.colors.mintBackground,
        "--rgp-surface": content.colors.surface,
        "--rgp-dark": content.colors.darkSurface,
        "--rgp-heading": content.colors.headingText,
        "--rgp-body": content.colors.bodyText,
        "--rgp-muted": content.colors.mutedText,
        "--rgp-accent": content.colors.accent,
        "--rgp-border": content.colors.border,
        "--rgp-footer": content.colors.footerBg,
        "--rgp-footer-text": content.colors.footerText,
        "--rgp-footer-muted": content.colors.footerMuted,
        "--rgp-heading-font": `${content.typography.headingFont}, Inter, Arial, sans-serif`,
        "--rgp-body-font": `${content.typography.bodyFont}, Inter, Arial, sans-serif`,
      }) as CSSProperties,
    [content.colors, content.typography.bodyFont, content.typography.headingFont],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-rgp-reveal]"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const navigate = (target: string, event?: React.MouseEvent<HTMLElement>) => {
    event?.preventDefault();
    const clean = target.replace("#", "") || "home";
    const pages: PageId[] = ["services", "team", "testimonials", "blogs", "contact", "privacy"];
    setMenuOpen(false);
    if (pages.includes(clean as PageId)) {
      setPage(clean as PageId);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }
    setPage("home");
    window.requestAnimationFrame(() => {
      if (clean === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(`rgp-${clean}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const pageData = page === "home" ? null : content.pages[page];

  return (
    <div ref={rootRef} className="rivergate-plumbing" data-template-id="rivergate-plumbing" style={themeStyle}>
      <header className="rgp-header">
        <button className="rgp-logo" type="button" onClick={(event) => navigate("home", event)}>
          <Brand name={content.brand.name} />
        </button>
        <nav className={menuOpen ? "rgp-nav is-open" : "rgp-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link, index) => (
            <a
              key={link.label}
              href={`#${link.href}`}
              onClick={(event) => navigate(link.href, event)}
              {...editableLink(`navigation.links.${index}.label`, `navigation.links.${index}.href`)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          className="rgp-header-cta"
          href={`#${content.navigation.buttonHref}`}
          onClick={(event) => navigate(content.navigation.buttonHref, event)}
          {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}
        >
          {content.navigation.buttonLabel}
          <ArrowUpRight size={13} />
        </a>
        <button
          className="rgp-menu"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main>
        {pageData ? (
          <section className="rgp-page" data-rgp-reveal>
            <SectionLabel><span {...editableText(`pages.${page}.title`)}>{pageData.title}</span></SectionLabel>
            <h1 {...editableText(`pages.${page}.title`)}>{pageData.title}</h1>
            <p {...editableText(`pages.${page}.body`)}>{pageData.body}</p>
            {page === "services" && <Services content={content} />}
            {page === "team" && <Team content={content} />}
            {page === "testimonials" && <Testimonial content={content} />}
            {page === "blogs" && <Blogs content={content} />}
            {page === "contact" && <Contact content={content} />}
          </section>
        ) : (
          <>
            <Hero content={content} navigate={navigate} />
            <LogoTicker content={content} />
            <About content={content} />
            <Why content={content} navigate={navigate} />
            <Story content={content} navigate={navigate} />
            <Services content={content} />
            <Focus content={content} navigate={navigate} />
            <Testimonial content={content} />
            <Team content={content} />
            <CtaBand content={content} navigate={navigate} />
            <Faq content={content} />
            <Blogs content={content} />
            <Contact content={content} />
          </>
        )}
      </main>

      <Footer content={content} navigate={navigate} />
    </div>
  );
}

function Hero({ content, navigate }: { content: RivergateData; navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <section className="rgp-hero">
      <div className="rgp-hero-copy" data-rgp-reveal>
        <SectionLabel><span {...editableText("hero.eyebrow")}>{content.hero.eyebrow}</span></SectionLabel>
        <h1 {...editableText("hero.title")}>{content.hero.title}</h1>
        <p {...editableText("hero.body")}>{content.hero.body}</p>
        <CTA
          label={content.hero.primaryCta.label}
          href={content.hero.primaryCta.href}
          path="hero.primaryCta.label"
          hrefPath="hero.primaryCta.href"
          onClick={(event) => navigate(content.hero.primaryCta.href, event)}
        />
        <div className="rgp-hero-features">
          {content.hero.features.map((feature, index) => (
            <span key={feature}>
              <Check size={14} />
              <span {...editableText(`hero.features.${index}`)}>{feature}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="rgp-hero-figure" data-rgp-reveal>
        <img src={content.hero.image} alt={content.hero.imageAlt} loading="eager" fetchPriority="high" {...editableImage("hero.image", "hero.imageAlt")} />
        <article>
          <strong {...editableText("hero.rating.value")}>{content.hero.rating.value}</strong>
          <span {...editableText("hero.rating.label")}>{content.hero.rating.label}</span>
          <p {...editableText("hero.rating.detail")}>{content.hero.rating.detail}</p>
        </article>
      </div>
    </section>
  );
}

function LogoTicker({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-logos" aria-label="Trusted by brands">
      <div className="rgp-logo-track">
        {[...content.logos, ...content.logos, ...content.logos].map((logo, index) => (
          <span key={`${logo}-${index}`} {...editableText(`logos.${index % content.logos.length}`)}>{logo}</span>
        ))}
      </div>
    </section>
  );
}

function About({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-about">
      <div className="rgp-about-head" data-rgp-reveal>
        <SectionLabel><span {...editableText("about.eyebrow")}>{content.about.eyebrow}</span></SectionLabel>
        <h2 {...editableText("about.title")}>{content.about.title}</h2>
        <p {...editableText("about.body")}>{content.about.body}</p>
      </div>
      <div className="rgp-collage">
        {content.about.images.map((image, index) => (
          <img key={image.src} src={image.src} alt={image.alt} data-rgp-reveal {...editableImage(`about.images.${index}.src`, `about.images.${index}.alt`)} />
        ))}
      </div>
    </section>
  );
}

function Why({
  content,
  navigate,
}: {
  content: RivergateData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section className="rgp-why">
      <div className="rgp-why-intro" data-rgp-reveal>
        <SectionLabel><span {...editableText("why.eyebrow")}>{content.why.eyebrow}</span></SectionLabel>
        <h2 {...editableText("why.title")}>{content.why.title}</h2>
        <CTA
          label={content.why.buttonLabel}
          href={content.why.buttonHref}
          path="why.buttonLabel"
          hrefPath="why.buttonHref"
          onClick={(event) => navigate(content.why.buttonHref, event)}
        />
      </div>
      <div className="rgp-why-list">
        {content.why.items.map((item, index) => (
          <article key={item.title} data-rgp-reveal>
            <span><ShieldCheck size={18} /></span>
            <h3 {...editableText(`why.items.${index}.title`)}>{item.title}</h3>
            <p {...editableText(`why.items.${index}.text`)}>{item.text}</p>
            <img src={content.why.images[index % content.why.images.length].src} alt={content.why.images[index % content.why.images.length].alt} {...editableImage(`why.images.${index % content.why.images.length}.src`, `why.images.${index % content.why.images.length}.alt`)} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Story({
  content,
  navigate,
}: {
  content: RivergateData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section className="rgp-story">
      <img src={content.story.image} alt={content.story.imageAlt} data-rgp-reveal {...editableImage("story.image", "story.imageAlt")} />
      <div data-rgp-reveal>
        <SectionLabel><span {...editableText("story.eyebrow")}>{content.story.eyebrow}</span></SectionLabel>
        <h2 {...editableText("story.title")}>{content.story.title}</h2>
        <p {...editableText("story.body")}>{content.story.body}</p>
        <CTA
          label={content.story.buttonLabel}
          href={content.story.buttonHref}
          path="story.buttonLabel"
          hrefPath="story.buttonHref"
          onClick={(event) => navigate(content.story.buttonHref, event)}
        />
      </div>
    </section>
  );
}

function Services({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-services" id="rgp-services">
      <div className="rgp-services-head" data-rgp-reveal>
        <SectionLabel><span {...editableText("services.eyebrow")}>{content.services.eyebrow}</span></SectionLabel>
        <h2 {...editableText("services.title")}>{content.services.title}</h2>
        <p {...editableText("services.body")}>{content.services.body}</p>
      </div>
      <div className="rgp-service-cards">
        {content.services.items.map((item, index) => (
          <article key={item.title} data-rgp-reveal>
            <img src={item.image} alt={item.imageAlt} {...editableImage(`services.items.${index}.image`, `services.items.${index}.imageAlt`)} />
            <div>
              <h3 {...editableText(`services.items.${index}.title`)}>{item.title}</h3>
              <p {...editableText(`services.items.${index}.text`)}>{item.text}</p>
            </div>
            <a href={`#${content.services.buttonHref}`} {...editableLink("services.buttonLabel", "services.buttonHref")}>
              {content.services.buttonLabel}
              <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
      <div className="rgp-benefits">
        {content.services.benefits.map((item, index) => (
          <article key={item.title} data-rgp-reveal>
            <span><Wrench size={17} /></span>
            <h3 {...editableText(`services.benefits.${index}.title`)}>{item.title}</h3>
            <p {...editableText(`services.benefits.${index}.text`)}>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Focus({
  content,
  navigate,
}: {
  content: RivergateData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section className="rgp-focus">
      <div data-rgp-reveal>
        <h2 {...editableText("focus.title")}>{content.focus.title}</h2>
        <p {...editableText("focus.body")}>{content.focus.body}</p>
        <div className="rgp-focus-actions">
          <CTA label={content.focus.primaryCta.label} href={content.focus.primaryCta.href} path="focus.primaryCta.label" hrefPath="focus.primaryCta.href" onClick={(event) => navigate(content.focus.primaryCta.href, event)} />
          <CTA label={content.focus.secondaryCta.label} href={content.focus.secondaryCta.href} path="focus.secondaryCta.label" hrefPath="focus.secondaryCta.href" onClick={(event) => navigate(content.focus.secondaryCta.href, event)} variant="light" />
        </div>
      </div>
      <img src={content.focus.image} alt={content.focus.imageAlt} data-rgp-reveal {...editableImage("focus.image", "focus.imageAlt")} />
    </section>
  );
}

function Testimonial({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-testimonials" id="rgp-testimonials">
      <SectionLabel><span {...editableText("testimonial.eyebrow")}>{content.testimonial.eyebrow}</span></SectionLabel>
      <h2 data-rgp-reveal {...editableText("testimonial.title")}>{content.testimonial.title}</h2>
      <div className="rgp-testimonial-card" data-rgp-reveal>
        <img src={content.testimonial.image} alt={content.testimonial.imageAlt} {...editableImage("testimonial.image", "testimonial.imageAlt")} />
        <article>
          <p {...editableText("testimonial.quote")}>{content.testimonial.quote}</p>
          <strong {...editableText("testimonial.stat")}>{content.testimonial.stat}</strong>
          <span {...editableText("testimonial.statLabel")}>{content.testimonial.statLabel}</span>
          <h3 {...editableText("testimonial.name")}>{content.testimonial.name}</h3>
          <small {...editableText("testimonial.role")}>{content.testimonial.role}</small>
        </article>
      </div>
    </section>
  );
}

function Team({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-team" id="rgp-team">
      <SectionLabel><span {...editableText("team.eyebrow")}>{content.team.eyebrow}</span></SectionLabel>
      <h2 data-rgp-reveal {...editableText("team.title")}>{content.team.title}</h2>
      <div className="rgp-team-grid">
        {content.team.items.map((member, index) => (
          <article key={member.name} data-rgp-reveal>
            <img src={member.image} alt={member.imageAlt} {...editableImage(`team.items.${index}.image`, `team.items.${index}.imageAlt`)} />
            <div>
              <h3 {...editableText(`team.items.${index}.name`)}>{member.name}</h3>
              <p {...editableText(`team.items.${index}.role`)}>{member.role}</p>
            </div>
            <span><ArrowUpRight size={14} /></span>
          </article>
        ))}
      </div>
    </section>
  );
}

function CtaBand({
  content,
  navigate,
}: {
  content: RivergateData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section className="rgp-cta-band" data-rgp-reveal>
      <h2 {...editableText("cta.title")}>{content.cta.title}</h2>
      <p {...editableText("cta.body")}>{content.cta.body}</p>
      <div>
        <CTA label={content.cta.primaryCta.label} href={content.cta.primaryCta.href} path="cta.primaryCta.label" hrefPath="cta.primaryCta.href" onClick={(event) => navigate(content.cta.primaryCta.href, event)} />
        <CTA label={content.cta.secondaryCta.label} href={content.cta.secondaryCta.href} path="cta.secondaryCta.label" hrefPath="cta.secondaryCta.href" onClick={(event) => navigate(content.cta.secondaryCta.href, event)} variant="light" />
      </div>
    </section>
  );
}

function Faq({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-faq">
      <h2 data-rgp-reveal {...editableText("faq.title")}>{content.faq.title}</h2>
      <div>
        {content.faq.items.map((item, index) => (
          <details key={item.question} data-rgp-reveal>
            <summary>
              <span {...editableText(`faq.items.${index}.question`)}>{item.question}</span>
              <Plus size={15} />
            </summary>
            <p {...editableText(`faq.items.${index}.answer`)}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Blogs({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-blogs" id="rgp-blogs">
      <div className="rgp-blogs-head">
        <div>
          <SectionLabel><span {...editableText("blogs.eyebrow")}>{content.blogs.eyebrow}</span></SectionLabel>
          <h2 {...editableText("blogs.title")}>{content.blogs.title}</h2>
        </div>
        <a href="#blogs" {...editableText("blogs.buttonLabel")}>{content.blogs.buttonLabel}<ArrowUpRight size={14} /></a>
      </div>
      <div className="rgp-blog-grid">
        {content.blogs.items.map((item, index) => (
          <article key={item.title} data-rgp-reveal>
            <img src={item.image} alt={item.imageAlt} {...editableImage(`blogs.items.${index}.image`, `blogs.items.${index}.imageAlt`)} />
            <h3 {...editableText(`blogs.items.${index}.title`)}>{item.title}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact({ content }: { content: RivergateData }) {
  return (
    <section className="rgp-contact" id="rgp-contact">
      <div data-rgp-reveal>
        <h2 {...editableText("contact.title")}>{content.contact.title}</h2>
        <p {...editableText("contact.body")}>{content.contact.body}</p>
        <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`} {...editableLink("brand.phone", "brand.phone")}><Phone size={15} />{content.brand.phone}</a>
        <a href={`mailto:${content.brand.email}`} {...editableLink("brand.email", "brand.email")}><Mail size={15} />{content.brand.email}</a>
        <span><MapPin size={15} /><span {...editableText("brand.address")}>{content.brand.address}</span></span>
        <span><Clock3 size={15} /><span {...editableText("brand.hours")}>{content.brand.hours}</span></span>
      </div>
      <form data-rgp-reveal>
        {content.contact.fields.map((field, index) => (
          <label key={field}>
            <span {...editableText(`contact.fields.${index}`)}>{field}</span>
            {index === 3 ? <textarea rows={4} /> : <input type={index === 1 ? "email" : "text"} />}
          </label>
        ))}
        <button type="button" {...editableText("contact.buttonLabel")}>{content.contact.buttonLabel}<ArrowUpRight size={15} /></button>
      </form>
    </section>
  );
}

function Footer({
  content,
  navigate,
}: {
  content: RivergateData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <footer className="rgp-footer">
      <div>
        <Brand name={content.brand.name} />
        <p {...editableText("brand.descriptor")}>{content.brand.descriptor}</p>
      </div>
      <nav aria-label="Footer navigation">
        {content.footer.links.map((link, index) => (
          <a key={link.label} href={`#${link.href}`} onClick={(event) => navigate(link.href, event)} {...editableLink(`footer.links.${index}.label`, `footer.links.${index}.href`)}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="rgp-footer-social">
        {content.brand.social.map((social, index) => (
          <a key={social.label} href={social.href} {...editableLink(`brand.social.${index}.label`, `brand.social.${index}.href`)}>{social.label}</a>
        ))}
      </div>
      <p {...editableText("footer.copyright")}>{content.footer.copyright}</p>
      <button type="button" onClick={(event) => navigate("home", event)} aria-label="Back to top"><ChevronUp size={15} /></button>
    </footer>
  );
}
