"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  List,
  MapPin,
  Phone,
  Star,
  TiktokLogo,
  Wrench,
  X,
  XLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type PlumbingData = typeof editableData;
type PageId = "home" | "about" | "services" | "reviews" | "blog" | "contact";

const socialIcons = {
  X: XLogo,
  Instagram: InstagramLogo,
  Facebook: FacebookLogo,
  TikTok: TiktokLogo,
  YouTube: YoutubeLogo,
};

function slugToPage(href: string): PageId | null {
  const clean = href.replace(/^\/+|\/+$/g, "");
  if (!clean) return "home";
  if (["about", "services", "reviews", "blog", "contact"].includes(clean)) return clean as PageId;
  return null;
}

function locationToPage(pathname: string): PageId {
  const lastSegment = pathname.split("/").filter(Boolean).at(-1) ?? "";
  return slugToPage(lastSegment) ?? "home";
}

function nextPathForPage(page: PageId) {
  const pathname = window.location.pathname;
  if (pathname.startsWith("/preview/")) return pathname;
  const parts = pathname.split("/").filter(Boolean);
  const current = parts.at(-1) ?? "";
  const slug = page === "home" ? "" : page;
  if (slugToPage(current)) parts.pop();
  if (slug) parts.push(slug);
  return `/${parts.join("/")}`;
}

function safeTel(phone: string) {
  return "tel:" + phone.replace(/[^+0-9]/g, "");
}

function SectionLabel({ children }: { children: string }) {
  return <p className="pp-eyebrow"><span aria-hidden="true">#</span>{children}</p>;
}

function ButtonLink({
  href,
  children,
  variant = "primary",
  onNavigate,
}: {
  href: string;
  children: string;
  variant?: "primary" | "secondary" | "dark";
  onNavigate: (page: PageId) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const page = slugToPage(href);
    if (!page) return;
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <a className={`pp-button pp-button-${variant}`} href={href} onClick={handleClick}>
      {children}
      <ArrowRight aria-hidden="true" weight="bold" />
    </a>
  );
}

function Header({ content, page, onNavigate }: { content: PlumbingData; page: PageId; onNavigate: (page: PageId) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const next = slugToPage(href);
    if (!next) return;
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(next);
  };

  return (
    <header className="pp-header">
      <div className="pp-nav-pill">
        <a className="pp-logo" href="#home" onClick={handleNav("/")} aria-label={`${content.brand.name} home`}>
          <span aria-hidden="true"><Wrench weight="fill" /></span>
          {content.brand.name}
        </a>
        <nav className={menuOpen ? "pp-nav is-open" : "pp-nav"} aria-label="Primary navigation">
          {content.navigation.links.map((link) => (
            <a
              key={link.label}
              className={page === link.page ? "is-active" : undefined}
              href={link.href}
              onClick={handleNav(link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="pp-header-actions">
          <a className="pp-call" href={content.navigation.callHref}>
            <Phone aria-hidden="true" weight="fill" />
            {content.navigation.callLabel}
          </a>
          <a className="pp-request" href={content.navigation.requestHref} onClick={handleNav(content.navigation.requestHref)}>
            {content.navigation.requestLabel}
          </a>
        </div>
        <button
          className="pp-menu"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}

function Hero({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <section className="pp-hero">
      <TemplateImage src={content.hero.image} alt={content.hero.imageAlt} width={1536} height={1024} priority loading="eager" />
      <div className="pp-hero-overlay" />
      <div className="pp-container pp-container-wide pp-hero-content">
        <div className="pp-hero-copy">
          <SectionLabel>{content.hero.eyebrow}</SectionLabel>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.description}</p>
          <div className="pp-hero-actions">
            <ButtonLink href={content.hero.primaryHref} onNavigate={onNavigate}>{content.hero.primaryLabel}</ButtonLink>
            <ButtonLink href={content.hero.secondaryHref} variant="dark" onNavigate={onNavigate}>{content.hero.secondaryLabel}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStrip({ content }: { content: PlumbingData }) {
  return (
    <section className="pp-proof" aria-label="Service proof">
      <div className="pp-container pp-proof-grid">
        <div className="pp-proof-benefits">
          {content.hero.benefits.map((benefit) => (
            <span key={benefit}><CheckCircle aria-hidden="true" weight="fill" />{benefit}</span>
          ))}
        </div>
        <div className="pp-proof-stats">
          {content.hero.stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection({ content, onNavigate, compact = false }: { content: PlumbingData; onNavigate: (page: PageId) => void; compact?: boolean }) {
  return (
    <section className="pp-section pp-services" id="services">
      <div className="pp-container pp-container-wide">
        <div className="pp-section-head">
          <div>
            <SectionLabel>{content.services.eyebrow}</SectionLabel>
            <h2>{content.services.title}</h2>
            <p>{content.services.description}</p>
          </div>
          <ButtonLink href={content.services.buttonHref} onNavigate={onNavigate}>{content.services.buttonLabel}</ButtonLink>
        </div>
        <div className={compact ? "pp-service-grid pp-service-grid-compact" : "pp-service-grid"} data-motion-grid>
          {content.services.items.map((service, index) => (
            <article className={`pp-service-card pp-motion-card pp-service-card-${index + 1}`} key={service.title}>
              <TemplateImage src={service.image} alt={service.imageAlt} width={900} height={650} loading={index < 2 ? "eager" : "lazy"} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmergencyBand({ content }: { content: PlumbingData }) {
  return (
    <section className="pp-emergency">
      <SectionLabel>{content.emergency.eyebrow}</SectionLabel>
      <h2>{content.emergency.title}</h2>
      <p>{content.emergency.description}</p>
      <a href={content.emergency.buttonHref}>{content.emergency.buttonLabel}</a>
    </section>
  );
}

function TestimonialsSection({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <section className="pp-section pp-testimonials" id="reviews">
      <div className="pp-container pp-container-wide">
        <div className="pp-centered-head">
          <SectionLabel>{content.testimonials.eyebrow}</SectionLabel>
          <h2>{content.testimonials.title}</h2>
        </div>
        <div className="pp-review-grid" data-motion-grid>
          {content.testimonials.items.map((item) => (
            <blockquote className="pp-motion-card" key={item.name}>
              <div className="pp-stars" aria-label="Five star rating">
                {[0, 1, 2, 3, 4].map((star) => <Star key={star} aria-hidden="true" weight="fill" />)}
              </div>
              <p>"{item.quote}"</p>
              <footer>
                <span>{item.name.slice(0, 1)}</span>
                <div><strong>{item.name}</strong><small>{item.detail}</small></div>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="pp-center-action">
          <ButtonLink href={content.testimonials.buttonHref} variant="secondary" onNavigate={onNavigate}>{content.testimonials.buttonLabel}</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function WhySection({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <section className="pp-section pp-why">
      <div className="pp-container pp-split-head">
        <div>
          <SectionLabel>{content.why.eyebrow}</SectionLabel>
          <h2>{content.why.title}</h2>
          <ButtonLink href={content.why.buttonHref} variant="secondary" onNavigate={onNavigate}>{content.why.buttonLabel}</ButtonLink>
        </div>
        <p>{content.why.description}</p>
      </div>
      <div className="pp-container pp-feature-grid" data-motion-grid>
        {content.why.items.map((item) => (
          <article className="pp-motion-card" key={item.title}>
            <span aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function AreaMap({ content }: { content: PlumbingData }) {
  return (
    <div className="pp-map" aria-label={content.areas.title}>
      <div className="pp-map-controls"><span>+</span><span>-</span></div>
      {content.areas.cities.map((city, index) => (
        <span className={`pp-pin pp-pin-${index + 1}`} key={city} aria-label={city} />
      ))}
    </div>
  );
}

function AreasSection({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <section className="pp-section pp-areas">
      <div className="pp-container pp-two-col">
        <div>
          <SectionLabel>{content.areas.eyebrow}</SectionLabel>
          <h2>{content.areas.title}</h2>
          <ButtonLink href={content.areas.buttonHref} onNavigate={onNavigate}>{content.areas.buttonLabel}</ButtonLink>
        </div>
        <div>
          <AreaMap content={content} />
          <div className="pp-chip-list">
            {content.areas.cities.map((city) => <span key={city}>{city}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ content }: { content: PlumbingData }) {
  return (
    <section className="pp-section pp-faq">
      <div className="pp-container pp-two-col">
        <div>
          <SectionLabel>{content.faq.eyebrow}</SectionLabel>
          <h2>{content.faq.title}</h2>
          <p>{content.faq.description}</p>
        </div>
        <div className="pp-faq-list">
          {content.faq.items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCta({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <section className="pp-bottom-cta">
      <TemplateImage src={content.bottomCta.image} alt={content.bottomCta.imageAlt} width={1536} height={760} />
      <div>
        <h2>{content.bottomCta.title}</h2>
        <div>
          <ButtonLink href={content.bottomCta.primaryHref} onNavigate={onNavigate}>{content.bottomCta.primaryLabel}</ButtonLink>
          <ButtonLink href={content.bottomCta.secondaryHref} variant="dark" onNavigate={onNavigate}>{content.bottomCta.secondaryLabel}</ButtonLink>
        </div>
      </div>
    </section>
  );
}

function AboutPage({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <>
      <section className="pp-subhero pp-about-hero">
        <div className="pp-container">
          <SectionLabel>{content.aboutPage.eyebrow}</SectionLabel>
          <h1>{content.aboutPage.title}</h1>
          <p>{content.aboutPage.description}</p>
          <div className="pp-about-images pp-motion-image">
            {content.aboutPage.images.map((image) => (
              <TemplateImage key={image.src} src={image.src} alt={image.alt} width={1100} height={760} priority />
            ))}
          </div>
        </div>
      </section>
      <section className="pp-section pp-story">
        <div className="pp-container pp-two-col">
          <div>
            <SectionLabel>{content.aboutPage.storyEyebrow}</SectionLabel>
            <h2>{content.aboutPage.storyTitle}</h2>
          </div>
          <div>
            <p>{content.aboutPage.storyText}</p>
            <div className="pp-story-stats">
              {content.hero.stats.map((stat) => (
                <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="pp-section pp-team">
        <div className="pp-container">
          <SectionLabel>{content.aboutPage.eyebrow}</SectionLabel>
          <h2>{content.aboutPage.teamTitle}</h2>
          <div className="pp-team-row" data-motion-grid>
            {content.aboutPage.team.map((member) => (
              <article className="pp-motion-card" key={member.name}>
                <TemplateImage src={member.image} alt={member.imageAlt} width={720} height={920} />
                <div><span>{member.role}</span><h3>{member.name}</h3></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <WhySection content={content} onNavigate={onNavigate} />
      <section className="pp-section pp-process">
        <div className="pp-container pp-split-head">
          <div>
            <SectionLabel>{content.aboutPage.processEyebrow}</SectionLabel>
            <h2>{content.aboutPage.processTitle}</h2>
          </div>
          <p>{content.aboutPage.processText}</p>
        </div>
        <div className="pp-container pp-process-grid">
          {content.aboutPage.process.map((step) => (
            <article key={step.step}>
              <span>{step.step}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>
      <BottomCta content={content} onNavigate={onNavigate} />
    </>
  );
}

function ContactPage({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <>
      <section className="pp-subhero pp-contact-hero">
        <div className="pp-container">
          <SectionLabel>{content.contactPage.eyebrow}</SectionLabel>
          <h1>{content.contactPage.title}</h1>
          <form className="pp-contact-card">
            <h2>{content.contactPage.formTitle}</h2>
            <p>{content.contactPage.formText}</p>
            <label>{content.contactPage.fields.name}<input type="text" placeholder={content.contactPage.placeholders.name} /></label>
            <div className="pp-form-row">
              <label>{content.contactPage.fields.email}<input type="email" placeholder={content.contactPage.placeholders.email} /></label>
              <label>{content.contactPage.fields.phone}<input type="tel" placeholder={content.contactPage.placeholders.phone} /></label>
            </div>
            <label>{content.contactPage.fields.service}<select defaultValue=""><option value="" disabled>{content.contactPage.placeholders.service}</option>{content.services.items.slice(0, 6).map((service) => <option key={service.title}>{service.title}</option>)}</select></label>
            <label>{content.contactPage.fields.message}<textarea placeholder={content.contactPage.placeholders.message} rows={5} /></label>
            <button type="button">{content.contactPage.submitLabel}</button>
          </form>
        </div>
      </section>
      <section className="pp-section pp-contact-info">
        <div className="pp-container pp-two-col">
          <div>
            <SectionLabel>{content.contactPage.infoEyebrow}</SectionLabel>
            <h2>{content.contactPage.infoTitle}</h2>
            <p>{content.contactPage.infoText}</p>
            <div className="pp-info-list">
              <a href={safeTel(content.brand.phone)}><Phone aria-hidden="true" />{content.brand.phone}</a>
              <a href={content.brand.emailHref}><EnvelopeSimple aria-hidden="true" />{content.brand.email}</a>
              <p><MapPin aria-hidden="true" />{content.brand.address}</p>
              <p><Clock aria-hidden="true" />{content.brand.hoursWeekday}<br />{content.brand.hoursWeekend}</p>
            </div>
            <h3>{content.contactPage.followLabel}</h3>
            <SocialLinks content={content} />
          </div>
          <AreaMap content={content} />
        </div>
      </section>
      <AreasSection content={content} onNavigate={onNavigate} />
      <FaqSection content={content} />
    </>
  );
}

function BlogPage({ content }: { content: PlumbingData }) {
  return (
    <section className="pp-subhero pp-simple-page">
      <div className="pp-container">
        <SectionLabel>{content.blog.eyebrow}</SectionLabel>
        <h1>{content.blog.title}</h1>
        <p>{content.blog.description}</p>
        <div className="pp-blog-grid">
          {content.blog.posts.map((post) => (
            <article key={post.title}>
              <span>{content.blog.eyebrow}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialLinks({ content }: { content: PlumbingData }) {
  return (
    <div className="pp-social">
      {content.footer.social.map((social) => {
        const Icon = socialIcons[social.label as keyof typeof socialIcons] ?? Wrench;
        return (
          <a key={social.label} href={social.href} aria-label={social.label}>
            <Icon aria-hidden="true" weight="bold" />
          </a>
        );
      })}
    </div>
  );
}

function Footer({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  const handleNav = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const next = slugToPage(href);
    if (!next) return;
    event.preventDefault();
    onNavigate(next);
  };

  return (
    <footer className="pp-footer">
      <div className="pp-container pp-footer-grid">
        <div>
          <h3>{content.footer.contactTitle}</h3>
          <a href={safeTel(content.brand.phone)}><Phone aria-hidden="true" />{content.brand.phone}</a>
          <a href={content.brand.emailHref}><EnvelopeSimple aria-hidden="true" />{content.brand.email}</a>
          <p><MapPin aria-hidden="true" />{content.brand.address}</p>
          <SocialLinks content={content} />
        </div>
        <div>
          <h3>{content.footer.quickTitle}</h3>
          {content.navigation.links.map((link) => <a key={link.label} href={link.href} onClick={handleNav(link.href)}>{link.label}</a>)}
        </div>
        <div>
          <h3>{content.footer.servicesTitle}</h3>
          {content.services.items.slice(0, 8).map((service) => <a href="/services" onClick={handleNav("/services")} key={service.title}>{service.title}</a>)}
        </div>
      </div>
      <div className="pp-container pp-footer-bottom">
        <small>{content.footer.copyright}</small>
        <div>
          <a href={content.footer.privacyHref}>{content.footer.privacyLabel}</a>
          <a href={content.footer.termsHref}>{content.footer.termsLabel}</a>
        </div>
      </div>
      <div className="pp-watermark" aria-hidden="true">
        <Wrench weight="fill" />
        {content.brand.name}
      </div>
    </footer>
  );
}

function HomePage({ content, onNavigate }: { content: PlumbingData; onNavigate: (page: PageId) => void }) {
  return (
    <>
      <Hero content={content} onNavigate={onNavigate} />
      <ProofStrip content={content} />
      <ServicesSection content={content} onNavigate={onNavigate} />
      <EmergencyBand content={content} />
      <TestimonialsSection content={content} onNavigate={onNavigate} />
      <WhySection content={content} onNavigate={onNavigate} />
      <AreasSection content={content} onNavigate={onNavigate} />
      <FaqSection content={content} />
      <BottomCta content={content} onNavigate={onNavigate} />
    </>
  );
}

export default function BlueforgePlumbingTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as PlumbingData;
  const rootRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState<PageId>(() => {
    if (typeof window === "undefined") return "home";
    return locationToPage(window.location.pathname);
  });
  const themeStyles = useMemo(() => ({
    "--pp-page": content.colors.pageBackground,
    "--pp-section": content.colors.sectionAlt,
    "--pp-card": content.colors.cardBackground,
    "--pp-heading": content.colors.headingText,
    "--pp-body": content.colors.bodyText,
    "--pp-muted": content.colors.mutedText,
    "--pp-accent": content.colors.accent,
    "--pp-accent-soft": content.colors.accentSecondary,
    "--pp-button": content.colors.buttonBg,
    "--pp-button-text": content.colors.buttonText,
    "--pp-secondary-bg": content.colors.secondaryButtonBg,
    "--pp-secondary-border": content.colors.secondaryButtonBorder,
    "--pp-secondary-text": content.colors.secondaryButtonText,
    "--pp-link": content.colors.link,
    "--pp-border": content.colors.border,
    "--pp-icon": content.colors.icon,
    "--pp-header-bg": content.colors.headerBg,
    "--pp-header-text": content.colors.headerText,
    "--pp-footer-bg": content.colors.footerBg,
    "--pp-footer-text": content.colors.footerText,
  }) as CSSProperties, [content]);

  useEffect(() => {
    const handlePopState = () => setPage(locationToPage(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".pp-hero-copy > *", {
        y: 18,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "expo.out",
      });

      gsap.utils.toArray<HTMLElement>(".pp-motion-card").forEach((card, index) => {
        gsap.fromTo(card, {
          y: 28,
          scale: 0.96,
          opacity: 0.78,
        }, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: (index % 4) * 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".pp-motion-image img, .pp-bottom-cta img").forEach((image) => {
        gsap.fromTo(image, {
          scale: 0.92,
          opacity: 0.72,
        }, {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: image,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [page]);

  const navigate = (next: PageId) => {
    setPage(next);
    const nextPath = nextPathForPage(next);
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  return (
    <main ref={rootRef} data-template-id="blueforge-plumbing" className="pp-site" style={themeStyles}>
      <Header content={content} page={page} onNavigate={navigate} />
      {page === "home" && <HomePage content={content} onNavigate={navigate} />}
      {page === "about" && <AboutPage content={content} onNavigate={navigate} />}
      {page === "services" && <><ServicesSection content={content} onNavigate={navigate} /><EmergencyBand content={content} /><FaqSection content={content} /><BottomCta content={content} onNavigate={navigate} /></>}
      {page === "reviews" && <><TestimonialsSection content={content} onNavigate={navigate} /><WhySection content={content} onNavigate={navigate} /><BottomCta content={content} onNavigate={navigate} /></>}
      {page === "blog" && <BlogPage content={content} />}
      {page === "contact" && <ContactPage content={content} onNavigate={navigate} />}
      <Footer content={content} onNavigate={navigate} />
    </main>
  );
}
