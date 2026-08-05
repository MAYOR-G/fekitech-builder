"use client";

import {
  Apple,
  ArrowUpRight,
  ChevronUp,
  Clock3,
  Dumbbell,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Plus,
  RefreshCw,
  Star,
  X,
  Zap,
} from "lucide-react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import editableData from "./editable.json";
import "./styles.css";

type ForgeFitData = typeof editableData;
type PageId = "home" | "about" | "plans" | "trainers" | "contact" | "privacy";
type IconName = "zap" | "clock" | "refresh" | "map" | "mail" | "phone" | "star" | "dumbbell";

function editableText(path: string) {
  return { "data-editable-path": path, "data-editable-type": "text" };
}

function editableLink(path: string, hrefPath: string) {
  return { "data-editable-path": path, "data-editable-type": "link", "data-editable-href-path": hrefPath };
}

function editableImage(path: string, altPath: string) {
  return { "data-editable-path": path, "data-editable-type": "image", "data-editable-alt-path": altPath };
}

function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  const icons = {
    zap: <Zap size={size} />,
    clock: <Clock3 size={size} />,
    refresh: <RefreshCw size={size} />,
    map: <MapPin size={size} />,
    mail: <Mail size={size} />,
    phone: <Phone size={size} />,
    star: <Star size={size} />,
    dumbbell: <Dumbbell size={size} />,
  };
  return icons[name];
}

function BrandMark({ label }: { label: string }) {
  return (
    <span className="fft-brand-mark" aria-label={label}>
      <span className="fft-brand-spark" aria-hidden="true" />
      <span {...editableText("brand.name")}>{label}</span>
    </span>
  );
}

function SplitTitle({
  accent,
  title,
  accentPath,
  titlePath,
  center = false,
}: {
  accent: string;
  title: string;
  accentPath: string;
  titlePath: string;
  center?: boolean;
}) {
  return (
    <h2 className={center ? "fft-section-title is-centred" : "fft-section-title"}>
      <span {...editableText(accentPath)}>{accent}</span>
      <strong {...editableText(titlePath)}>{title}</strong>
    </h2>
  );
}

function PillButton({
  children,
  href,
  onClick,
  variant = "light",
  editable,
}: {
  children: ReactNode;
  href: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  variant?: "light" | "dark" | "ghost" | "orange";
  editable?: ReturnType<typeof editableLink>;
}) {
  return (
    <a className={`fft-pill fft-pill-${variant}`} href={`#${href}`} onClick={onClick} {...editable}>
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}

export default function ForgeFitTrainingTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as ForgeFitData;
  const [page, setPage] = useState<PageId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const themeStyle = useMemo(
    () =>
      ({
        "--fft-page": content.colors.pageBackground,
        "--fft-surface": content.colors.surface,
        "--fft-card": content.colors.card,
        "--fft-heading": content.colors.headingText,
        "--fft-body": content.colors.bodyText,
        "--fft-muted": content.colors.mutedText,
        "--fft-accent": content.colors.accent,
        "--fft-line": content.colors.border,
        "--fft-button": content.colors.buttonBg,
        "--fft-button-text": content.colors.buttonText,
        "--fft-footer": content.colors.footerBg,
        "--fft-footer-text": content.colors.footerText,
        "--fft-footer-muted": content.colors.footerMuted,
        "--fft-heading-font": "var(--font-heading, Geist, Inter, Arial, sans-serif)",
        "--fft-body-font": "var(--font-body, Inter, Arial, sans-serif)",
      }) as CSSProperties,
    [content.colors],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-fft-reveal]"));
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
    const pages: PageId[] = ["about", "plans", "trainers", "contact", "privacy"];
    setMenuOpen(false);
    if (pages.includes(clean as PageId)) {
      setPage(clean as PageId);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }
    setPage("home");
    window.requestAnimationFrame(() => {
      if (clean === "home") window.scrollTo({ top: 0, behavior: "smooth" });
      else document.getElementById(`fft-${clean}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const pageData = page === "home" ? null : content.pages[page];

  return (
    <div ref={rootRef} className="forgefit-training" data-template-id="forgefit-training" style={themeStyle}>
      <div className="fft-top-strip" aria-hidden="true">
        <span>Book intro session</span>
        <span>Small-group training</span>
        <span>Nutrition support</span>
        <span>London performance studio</span>
      </div>

      <header className="fft-header">
        <button className="fft-logo" type="button" onClick={(event) => navigate("home", event)}>
          <BrandMark label={content.brand.name} />
        </button>
        <nav className={menuOpen ? "fft-nav is-open" : "fft-nav"} aria-label="Primary navigation">
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
          className="fft-header-cta"
          href={`#${content.navigation.buttonHref}`}
          onClick={(event) => navigate(content.navigation.buttonHref, event)}
          {...editableLink("navigation.buttonLabel", "navigation.buttonHref")}
        >
          {content.navigation.buttonLabel}
          <ArrowUpRight size={14} />
        </a>
        <button
          className="fft-menu"
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
          <section className="fft-page-shell" data-fft-reveal>
            <div className="fft-page-kicker">
              <BrandMark label={content.brand.name} />
            </div>
            <h1 {...editableText(`pages.${page}.title`)}>{pageData.title}</h1>
            <p {...editableText(`pages.${page}.body`)}>{pageData.body}</p>
            {page === "about" && <HomeSections content={content} navigate={navigate} compact />}
            {page === "plans" && <PricingSection content={content} />}
            {page === "trainers" && <TrainersSection content={content} />}
            {page === "contact" && <ContactSection content={content} />}
          </section>
        ) : (
          <>
            <section className="fft-hero" id="fft-home">
              <img
                className="fft-hero-image"
                src={content.hero.image}
                alt={content.hero.imageAlt}
                loading="eager"
                fetchPriority="high"
                {...editableImage("hero.image", "hero.imageAlt")}
              />
              <div className="fft-hero-shade" aria-hidden="true" />
              <div className="fft-hero-content">
                <p className="fft-kicker" data-fft-reveal {...editableText("hero.eyebrow")}>{content.hero.eyebrow}</p>
                <h1 data-fft-reveal>
                  <span {...editableText("hero.titleAccent")}>{content.hero.titleAccent}</span>
                  <strong {...editableText("hero.title")}>{content.hero.title}</strong>
                </h1>
                <p className="fft-hero-copy" data-fft-reveal {...editableText("hero.body")}>{content.hero.body}</p>
                <div className="fft-hero-actions" data-fft-reveal>
                  <PillButton
                    href={content.hero.primaryCta.href}
                    onClick={(event) => navigate(content.hero.primaryCta.href, event)}
                    editable={editableLink("hero.primaryCta.label", "hero.primaryCta.href")}
                  >
                    {content.hero.primaryCta.label}
                  </PillButton>
                  <PillButton
                    href={content.hero.secondaryCta.href}
                    variant="ghost"
                    onClick={(event) => navigate(content.hero.secondaryCta.href, event)}
                    editable={editableLink("hero.secondaryCta.label", "hero.secondaryCta.href")}
                  >
                    <Play size={13} />
                    {content.hero.secondaryCta.label}
                  </PillButton>
                </div>
              </div>
              <div className="fft-hero-features" data-fft-reveal>
                {content.hero.features.map((feature, index) => (
                  <div key={feature}>
                    <Icon name={index === 0 ? "zap" : "refresh"} />
                    <span {...editableText(`hero.features.${index}`)}>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <HomeSections content={content} navigate={navigate} />
          </>
        )}
      </main>

      <Footer content={content} navigate={navigate} />
    </div>
  );
}

function HomeSections({
  content,
  navigate,
  compact = false,
}: {
  content: ForgeFitData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
  compact?: boolean;
}) {
  return (
    <>
      <section className={compact ? "fft-belong is-compact" : "fft-belong"} id="fft-about">
        <p className="fft-micro" {...editableText("belong.eyebrow")}>{content.belong.eyebrow}</p>
        <SplitTitle
          accent={content.belong.titleAccent}
          title={content.belong.title}
          accentPath="belong.titleAccent"
          titlePath="belong.title"
          center
        />
        <p className="fft-centre-copy" data-fft-reveal {...editableText("belong.body")}>{content.belong.body}</p>
        <div className="fft-stat-row" data-fft-reveal>
          {content.belong.stats.map((stat, index) => (
            <article key={stat.label}>
              <Icon name={index === 0 ? "dumbbell" : index === 1 ? "star" : "clock"} />
              <strong {...editableText(`belong.stats.${index}.value`)}>{stat.value}</strong>
              <span {...editableText(`belong.stats.${index}.label`)}>{stat.label}</span>
            </article>
          ))}
        </div>
        <div className="fft-belong-images">
          {content.belong.images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              data-fft-reveal
              {...editableImage(`belong.images.${index}.src`, `belong.images.${index}.alt`)}
            />
          ))}
        </div>
        <div className="fft-partners" aria-label="Partner brands">
          <div className="fft-partners-track">
            {[...content.belong.partners, ...content.belong.partners, ...content.belong.partners].map((partner, index) => (
              <span key={`${partner}-${index}`} {...editableText(`belong.partners.${index % content.belong.partners.length}`)}>
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection content={content} navigate={navigate} />
      <TrainersSection content={content} />
      <WhySection content={content} navigate={navigate} />
      <StepsSection content={content} />
      <PricingSection content={content} />
      <TestimonialSection content={content} />
      <FaqSection content={content} />
      <ContactSection content={content} />
      <DownloadSection content={content} />
    </>
  );
}

function ServicesSection({
  content,
  navigate,
}: {
  content: ForgeFitData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section className="fft-services" id="fft-services">
      <div className="fft-service-copy" data-fft-reveal>
        <p className="fft-micro" {...editableText("services.eyebrow")}>{content.services.eyebrow}</p>
        <SplitTitle
          accent={content.services.titleAccent}
          title={content.services.title}
          accentPath="services.titleAccent"
          titlePath="services.title"
        />
        <p {...editableText("services.body")}>{content.services.body}</p>
        <div className="fft-service-actions">
          <PillButton
            href={content.services.primaryCta.href}
            variant="light"
            onClick={(event) => navigate(content.services.primaryCta.href, event)}
            editable={editableLink("services.primaryCta.label", "services.primaryCta.href")}
          >
            {content.services.primaryCta.label}
          </PillButton>
          <PillButton
            href={content.services.secondaryCta.href}
            variant="ghost"
            onClick={(event) => navigate(content.services.secondaryCta.href, event)}
            editable={editableLink("services.secondaryCta.label", "services.secondaryCta.href")}
          >
            <Play size={13} />
            {content.services.secondaryCta.label}
          </PillButton>
        </div>
      </div>
      <div className="fft-service-list">
        {content.services.items.map((item, index) => (
          <article key={item.title} data-fft-reveal>
            <div>
              <h3 {...editableText(`services.items.${index}.title`)}>{item.title}</h3>
              <p {...editableText(`services.items.${index}.text`)}>{item.text}</p>
            </div>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrainersSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-trainers" id="fft-trainers">
      <p className="fft-micro" {...editableText("trainers.eyebrow")}>{content.trainers.eyebrow}</p>
      <h2 data-fft-reveal {...editableText("trainers.title")}>{content.trainers.title}</h2>
      <p className="fft-centre-copy" data-fft-reveal {...editableText("trainers.body")}>{content.trainers.body}</p>
      <div className="fft-badges" data-fft-reveal>
        {content.trainers.badges.map((badge, index) => (
          <span key={badge}>
            <Icon name={index === 0 ? "star" : index === 1 ? "dumbbell" : "zap"} />
            <span {...editableText(`trainers.badges.${index}`)}>{badge}</span>
          </span>
        ))}
      </div>
      <div className="fft-trainer-grid">
        {content.trainers.items.map((trainer, index) => (
          <article key={trainer.name} data-fft-reveal>
            <img src={trainer.image} alt={trainer.imageAlt} {...editableImage(`trainers.items.${index}.image`, `trainers.items.${index}.imageAlt`)} />
            <h3 {...editableText(`trainers.items.${index}.name`)}>{trainer.name}</h3>
            <p {...editableText(`trainers.items.${index}.role`)}>{trainer.role}</p>
            <span {...editableText(`trainers.items.${index}.bio`)}>{trainer.bio}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhySection({
  content,
  navigate,
}: {
  content: ForgeFitData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <section className="fft-why">
      <p className="fft-micro" {...editableText("why.eyebrow")}>{content.why.eyebrow}</p>
      <SplitTitle accent={content.why.titleAccent} title={content.why.title} accentPath="why.titleAccent" titlePath="why.title" center />
      <p className="fft-centre-copy" data-fft-reveal {...editableText("why.body")}>{content.why.body}</p>
      <PillButton
        href={content.why.buttonHref}
        variant="ghost"
        onClick={(event) => navigate(content.why.buttonHref, event)}
        editable={editableLink("why.buttonLabel", "why.buttonHref")}
      >
        <Play size={13} />
        {content.why.buttonLabel}
      </PillButton>
      <div className="fft-why-stage">
        <img src={content.why.image} alt={content.why.imageAlt} data-fft-reveal {...editableImage("why.image", "why.imageAlt")} />
        {content.why.points.map((point, index) => (
          <article key={point.title} className={`fft-why-point point-${index + 1}`} data-fft-reveal>
            <Icon name={index % 2 === 0 ? "zap" : "refresh"} />
            <h3 {...editableText(`why.points.${index}.title`)}>{point.title}</h3>
            <p {...editableText(`why.points.${index}.text`)}>{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StepsSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-steps">
      <SplitTitle
        accent={content.steps.titleAccent}
        title={content.steps.title}
        accentPath="steps.titleAccent"
        titlePath="steps.title"
        center
      />
      <div className="fft-step-grid">
        {content.steps.items.map((step, index) => (
          <article key={step.title} data-fft-reveal>
            <strong>{String(index + 1).padStart(2, "0")}</strong>
            <h3 {...editableText(`steps.items.${index}.title`)}>{step.title}</h3>
            <p {...editableText(`steps.items.${index}.text`)}>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PricingSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-pricing" id="fft-plans">
      <SplitTitle
        accent={content.pricing.titleAccent}
        title={content.pricing.title}
        accentPath="pricing.titleAccent"
        titlePath="pricing.title"
        center
      />
      <p className="fft-centre-copy" data-fft-reveal {...editableText("pricing.body")}>{content.pricing.body}</p>
      <div className="fft-toggle" aria-hidden="true">
        <span {...editableText("pricing.toggleA")}>{content.pricing.toggleA}</span>
        <span {...editableText("pricing.toggleB")}>{content.pricing.toggleB}</span>
      </div>
      <div className="fft-price-grid">
        {content.pricing.items.map((plan, index) => (
          <article key={plan.name} className={plan.featured ? "is-featured" : ""} data-fft-reveal>
            <div className="fft-price-art">
              <BrandMark label={content.brand.name} />
              <span><Play size={12} /></span>
            </div>
            <h3 {...editableText(`pricing.items.${index}.name`)}>{plan.name}</h3>
            <strong {...editableText(`pricing.items.${index}.price`)}>{plan.price}</strong>
            <p {...editableText(`pricing.items.${index}.note`)}>{plan.note}</p>
            <button type="button">
              Start plan
              <ArrowUpRight size={14} />
            </button>
            <ul>
              {plan.features.map((feature, featureIndex) => (
                <li key={feature} {...editableText(`pricing.items.${index}.features.${featureIndex}`)}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function TestimonialSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-testimonial">
      <SplitTitle
        accent={content.testimonial.titleAccent}
        title={content.testimonial.title}
        accentPath="testimonial.titleAccent"
        titlePath="testimonial.title"
        center
      />
      <div className="fft-testimonial-card" data-fft-reveal>
        <article>
          <div className="fft-avatar-dot"><Icon name="star" /></div>
          <h3 {...editableText("testimonial.name")}>{content.testimonial.name}</h3>
          <span {...editableText("testimonial.role")}>{content.testimonial.role}</span>
          <p {...editableText("testimonial.quote")}>{content.testimonial.quote}</p>
          <div className="fft-stars" aria-hidden="true">★★★★★</div>
        </article>
        <img src={content.testimonial.image} alt={content.testimonial.imageAlt} {...editableImage("testimonial.image", "testimonial.imageAlt")} />
      </div>
      <div className="fft-dots" aria-hidden="true"><span /><span /></div>
    </section>
  );
}

function FaqSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-faq">
      <SplitTitle accent={content.faq.titleAccent} title={content.faq.title} accentPath="faq.titleAccent" titlePath="faq.title" center />
      <div className="fft-faq-list">
        {content.faq.items.map((item, index) => (
          <details key={item.question} data-fft-reveal>
            <summary>
              <span {...editableText(`faq.items.${index}.question`)}>{item.question}</span>
              <Plus size={16} />
            </summary>
            <p {...editableText(`faq.items.${index}.answer`)}>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function ContactSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-contact" id="fft-contact">
      <div data-fft-reveal>
        <h2 {...editableText("contact.title")}>{content.contact.title}</h2>
        <p {...editableText("contact.body")}>{content.contact.body}</p>
        <div className="fft-contact-list">
          <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`} {...editableLink("brand.phone", "brand.phone")}><Icon name="phone" />{content.brand.phone}</a>
          <a href={`mailto:${content.brand.email}`} {...editableLink("brand.email", "brand.email")}><Icon name="mail" />{content.brand.email}</a>
          <span><Icon name="clock" /><span {...editableText("brand.hours")}>{content.brand.hours}</span></span>
          {content.contact.locations.map((location, index) => (
            <span key={location}><Icon name="map" /><span {...editableText(`contact.locations.${index}`)}>{location}</span></span>
          ))}
        </div>
        <div className="fft-socials">
          {content.brand.social.map((social, index) => (
            <a key={social.label} href={social.href} {...editableLink(`brand.social.${index}.label`, `brand.social.${index}.href`)}>
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <form data-fft-reveal>
        <h2 {...editableText("contact.formTitle")}>{content.contact.formTitle}</h2>
        {content.contact.fields.map((field, index) => (
          <label key={field}>
            <span {...editableText(`contact.fields.${index}`)}>{field}</span>
            {index === 2 ? <textarea rows={3} /> : <input type={index === 1 ? "email" : "text"} />}
          </label>
        ))}
        <button type="button" {...editableText("contact.buttonLabel")}>
          {content.contact.buttonLabel}
          <ArrowUpRight size={14} />
        </button>
      </form>
    </section>
  );
}

function DownloadSection({ content }: { content: ForgeFitData }) {
  return (
    <section className="fft-download">
      <div data-fft-reveal>
        <h2 {...editableText("download.title")}>{content.download.title}</h2>
        <p {...editableText("download.body")}>{content.download.body}</p>
        <ul>
          {content.download.bullets.map((bullet, index) => (
            <li key={bullet} {...editableText(`download.bullets.${index}`)}>{bullet}</li>
          ))}
        </ul>
        <div className="fft-store-buttons" aria-label="App download links">
          <span><Apple size={16} /> App Store</span>
          <span><Play size={15} /> Google Play</span>
        </div>
      </div>
      <img src={content.download.image} alt={content.download.imageAlt} data-fft-reveal {...editableImage("download.image", "download.imageAlt")} />
    </section>
  );
}

function Footer({
  content,
  navigate,
}: {
  content: ForgeFitData;
  navigate: (target: string, event?: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <footer className="fft-footer">
      <BrandMark label={content.brand.name} />
      <nav aria-label="Footer navigation">
        {content.footer.links.map((link, index) => (
          <a
            key={link.label}
            href={`#${link.href}`}
            onClick={(event) => navigate(link.href, event)}
            {...editableLink(`footer.links.${index}.label`, `footer.links.${index}.href`)}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <p {...editableText("footer.copyright")}>{content.footer.copyright}</p>
      <button type="button" onClick={(event) => navigate("home", event)} aria-label="Back to top">
        <ChevronUp size={15} />
      </button>
    </footer>
  );
}
