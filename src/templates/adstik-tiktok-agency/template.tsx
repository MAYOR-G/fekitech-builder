"use client";

import { useState, useMemo, type CSSProperties } from "react";
import {
  Check,
  List,
  X,
  ArrowRight,
  Heart,
  ShareFat,
  TiktokLogo,
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
  TwitterLogo,
  CaretRight,
  Sparkle,
  TrendUp
} from "@phosphor-icons/react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./styles.css";

type AdstikData = typeof defaults;

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

export default function AdstikTiktokAgencyTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data) as AdstikData;
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState<number>(1);
  const [selectedBudget, setSelectedBudget] = useState<string>(
    content.proposal?.budgetOptions?.[1] || "£5k - £15k"
  );
  const [formSubmitted, setFormSubmitted] = useState(false);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const navLinks = asArray<{ label: string; href: string }>(content.navigation?.links);
  const ticker1Items = asArray<string>(content.ticker1?.items);
  const ticker2Items = asArray<string>(content.ticker2?.items);
  const services = asArray<{ title: string; description: string; image: string; imageAlt: string }>(
    content.services?.items
  );
  const whyChecklist = asArray<string>(content.whyTiktok?.checklist);
  const showcaseItems = asArray<{
    title: string;
    client: string;
    views: string;
    roas: string;
    image: string;
    imageAlt: string;
  }>(content.showcase?.items);
  const approachItems = asArray<{ title: string; description: string; image: string; imageAlt: string }>(
    content.approach?.items
  );
  const testimonials = asArray<{
    quote: string;
    name: string;
    role: string;
    avatar: string;
    avatarAlt: string;
    tone?: string;
  }>(content.testimonials?.items);
  const faqItems = asArray<{ question: string; answer: string }>(content.faq?.items);
  const budgetOptions = asArray<string>(content.proposal?.budgetOptions);
  const footerNavLinks = asArray<{ label: string; href: string }>(content.footer?.navLinks);
  const footerServiceLinks = asArray<{ label: string; href: string }>(content.footer?.serviceLinks);
  const footerLegalLinks = asArray<{ label: string; href: string }>(content.footer?.legalLinks);
  const footerSocials = asArray<{ name: string; href: string }>(content.footer?.socials);
  const avatarImages = asArray<string>(content.hero?.avatarImages);

  const dynamicStyles: CSSProperties = {
    "--adstik-page": content.colors?.pageBackground || "#0b0416",
    "--adstik-surface": content.colors?.surface || "#15092a",
    "--adstik-heading": content.colors?.headingText || "#ffffff",
    "--adstik-body": content.colors?.bodyText || "#c8c4d6",
    "--adstik-yellow": content.colors?.accentYellow || "#f9ff4c",
    "--adstik-purple-deep": content.colors?.tickerBg || "#550fcd",
    "--adstik-font-heading": content.typography?.headingFont || "'Inter', sans-serif",
    "--adstik-font-body": content.typography?.bodyFont || "'Inter', sans-serif"
  } as CSSProperties;

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div
      data-template-id="adstik-tiktok-agency"
      className="adstik-tiktok-agency"
      style={dynamicStyles}
    >
      {/* Header / Navbar */}
      <header className="adstik-header">
        <div className="adstik-container">
          <div className="adstik-header-inner">
            <a href="#top" className="adstik-logo">
              <img
                src={content.brand?.logo || "/templates/adstik-tiktok-agency/assets/tiktok-3d-badge.png"}
                alt={content.brand?.logoAlt || "Logo"}
                className="adstik-logo-icon"
              />
              <span>{content.brand?.name || "PULSETIK"}</span>
            </a>

            <nav className="adstik-nav">
              {navLinks.map((link, idx) => (
                <a key={idx} href={link.href} className="adstik-nav-link">
                  {link.label}
                </a>
              ))}
            </nav>

            <a href={content.navigation?.ctaHref || "#contact"} className="adstik-header-cta">
              {content.navigation?.ctaLabel || "Get Started"}
            </a>

            <button
              className="adstik-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`adstik-mobile-drawer ${menuOpen ? "adstik-drawer-open" : ""}`}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="adstik-mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={content.navigation?.ctaHref || "#contact"}
            className="adstik-mobile-cta"
            onClick={() => setMenuOpen(false)}
          >
            {content.navigation?.ctaLabel || "Get Started"}
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero Section */}
        <section className="adstik-hero">
          <div className="adstik-hero-bg-wave">
            <svg
              viewBox="0 0 1595 1400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <linearGradient id="adstik-hero-grad" x1="1" y1="0.09" x2="0" y2="0.91">
                  <stop offset="0%" stopColor="#ff57ee" />
                  <stop offset="48%" stopColor="#f9ff4c" />
                  <stop offset="100%" stopColor="#ff4b4b" />
                </linearGradient>
              </defs>
              <path
                d="M 1595 428.79 C 1222.54 365.611 989.602 561.782 888.438 624.205 C 880.513 629.759 873.049 634.936 866.024 639.645 C 865.332 640.127 864.629 640.613 863.916 641.107 C 864.516 640.765 865.11 640.426 865.701 640.095 C 863.39 641.607 861.091 643.126 858.802 644.653 C 853.347 648.434 847.38 652.568 840.941 657.051 L 840.941 656.905 C 582.131 839.269 476.253 1129.371 476.253 1400 L 0 1400 L 0 883.85 C 452.862 960.598 734.531 719.414 854.6 646.599 C 858.497 643.859 862.264 641.222 865.903 638.701 C 869.174 636.39 872.74 633.901 876.581 631.23 C 876.547 631.249 876.513 631.27 876.479 631.289 C 876.593 631.214 876.707 631.137 876.821 631.062 C 885.688 624.896 896.024 617.771 907.651 609.685 C 1114.74 457.806 1199.72 221.079 1199.72 0 L 1595 0 Z"
                fill="url(#adstik-hero-grad)"
              />
            </svg>
          </div>

          <div className="adstik-container">
            <div className="adstik-hero-grid">
              {/* Left Text */}
              <div className="adstik-hero-content">
                <div className="adstik-hero-badge-wrap">
                  <div className="adstik-hero-badge">
                    <span>{content.hero?.badge || "⚡ UK's Leading TikTok Growth Partner"}</span>
                  </div>
                </div>

                <h1 className="adstik-hero-title">
                  <div className="adstik-hero-title-row">
                    <span>{content.hero?.titlePrefix || "TikTok"}</span>
                    <img
                      src="/templates/adstik-tiktok-agency/assets/tiktok-3d-badge.png"
                      alt="TikTok Badge"
                      className="adstik-inline-icon"
                    />
                  </div>
                  <div className="adstik-hero-title-row">
                    <span>{content.hero?.titleMid || "Ads"}</span>
                    <img
                      src="/templates/adstik-tiktok-agency/assets/hashtag-3d-icon.png"
                      alt="Hashtag Icon"
                      className="adstik-inline-icon"
                    />
                    <span>{content.hero?.titleSuffix || "that Go Viral"}</span>
                  </div>
                </h1>

                <p className="adstik-hero-desc">
                  {content.hero?.description ||
                    "We craft high-performing TikTok campaigns that capture attention, stop the scroll, and turn viral reach into measurable revenue for ambitious UK brands."}
                </p>

                <div className="adstik-hero-actions">
                  <a
                    href={content.hero?.primaryCta?.href || "#contact"}
                    className="adstik-btn-primary"
                  >
                    <span>{content.hero?.primaryCta?.label || "Get Free Proposal"}</span>
                    <ArrowRight size={18} weight="bold" />
                  </a>
                </div>
              </div>

              {/* Right Visual with Widgets */}
              <div className="adstik-hero-visual">
                <div className="adstik-hero-person-wrap">
                  <img
                    src={
                      content.hero?.heroImage ||
                      "/templates/adstik-tiktok-agency/assets/hero-creator-headphones.png"
                    }
                    alt={content.hero?.heroImageAlt || "Creative producer"}
                    className="adstik-hero-person-img"
                  />
                </div>

                {/* Floating Widget: 25M+ Views */}
                <div className="adstik-stat-widget-views">
                  <div>
                    <h4>{content.hero?.statValue || "25M+"}</h4>
                    <p>{content.hero?.statLabel || "Views Generated"}</p>
                  </div>
                  <img
                    src="/templates/adstik-tiktok-agency/assets/waveform-chart.svg"
                    alt="Waveform chart"
                    className="adstik-chart-icon"
                  />
                </div>

                {/* Floating Widget: TikTok 3D Icon */}
                <div className="adstik-floating-tiktok-badge">
                  <img
                    src="/templates/adstik-tiktok-agency/assets/tiktok-floating-icon.png"
                    alt="TikTok 3D icon"
                  />
                </div>

                {/* Floating Widget: Creator Community */}
                <div className="adstik-creator-community-widget">
                  <div className="adstik-avatar-group">
                    {avatarImages.slice(0, 3).map((imgUrl, i) => (
                      <div key={i} className="adstik-avatar-circle">
                        <img src={imgUrl} alt={`Creator ${i + 1}`} />
                      </div>
                    ))}
                    <div className="adstik-avatar-circle adstik-avatar-count">
                      <span>{content.hero?.avatarCount || "6k+"}</span>
                    </div>
                  </div>
                  <span className="adstik-community-text">
                    {content.hero?.avatarLabel || "Join 250K+ Creators"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker Bar 1 */}
        <section className="adstik-ticker-section">
          <div className="adstik-ticker-track">
            {[...ticker1Items, ...ticker1Items, ...ticker1Items, ...ticker1Items].map((item, idx) => (
              <div key={idx} className="adstik-ticker-item">
                <span>{item}</span>
                <img
                  src="/templates/adstik-tiktok-agency/assets/diamond-star-accent.svg"
                  alt="Star"
                  className="adstik-ticker-star"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="adstik-services-section">
          <div className="adstik-container">
            <div className="adstik-section-badge-center">
              <div className="adstik-pill-badge">
                <span>{content.services?.badge || "HOW WE CAN HELP YOU"}</span>
              </div>
            </div>

            <h2 className="adstik-section-heading">
              {content.services?.title || "Our TikTok Growth Solutions"}
            </h2>

            <div className="adstik-services-grid">
              {services.map((service, index) => {
                const glowClass =
                  index === 0
                    ? "adstik-glow-purple"
                    : index === 1
                    ? "adstik-glow-yellow"
                    : "adstik-glow-cyan";
                return (
                  <div key={index} className="adstik-service-card">
                    <div className="adstik-service-icon-wrap">
                      <img src={service.image} alt={service.imageAlt || service.title} />
                    </div>
                    <h3 className="adstik-service-title">{service.title}</h3>
                    <p className="adstik-service-desc">{service.description}</p>
                    <div className={`adstik-service-glow ${glowClass}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why TikTok Section */}
        <section id="why-tiktok" className="adstik-why-section">
          <img
            src={content.whyTiktok?.torusImage || "/templates/adstik-tiktok-agency/assets/why-torus-ring-3d.png"}
            alt="3D Ring"
            className="adstik-why-torus-bg"
          />

          <div className="adstik-container">
            <div className="adstik-why-grid">
              {/* Left Column */}
              <div>
                <div className="adstik-pill-badge">
                  <span>{content.whyTiktok?.badge || "WHY TIKTOK"}</span>
                </div>

                <h2 className="adstik-why-heading">
                  {content.whyTiktok?.title || "Why Advertise On TikTok"}
                </h2>

                <p className="adstik-why-desc">
                  {content.whyTiktok?.description ||
                    "TikTok is the UK's fastest-growing shopping and discovery platform. We unlock its full revenue potential with creative strategies built specifically for TikTok's native audience."}
                </p>

                <ul className="adstik-checklist">
                  {whyChecklist.map((item, idx) => (
                    <li key={idx} className="adstik-check-item">
                      <span className="adstik-check-icon">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a href={content.whyTiktok?.cta?.href || "#contact"} className="adstik-btn-primary">
                  <span>{content.whyTiktok?.cta?.label || "Start A Campaign"}</span>
                  <ArrowRight size={18} weight="bold" />
                </a>
              </div>

              {/* Right Column Visual */}
              <div className="adstik-why-visual-wrap">
                <div className="adstik-why-backdrop-blob" />
                <div className="adstik-why-dot-grid" />

                <div className="adstik-why-creator-container">
                  <img
                    src={
                      content.whyTiktok?.image ||
                      "/templates/adstik-tiktok-agency/assets/why-creator-coffee.png"
                    }
                    alt={content.whyTiktok?.imageAlt || "TikTok Creator"}
                    className="adstik-why-creator-img"
                  />

                  {/* Floating Left: 1.2M Likes */}
                  <div className="adstik-why-like-badge">
                    <Heart size={18} weight="fill" className="adstik-heart-icon" />
                    <span>{content.whyTiktok?.likesBadge || "1.2M Likes"}</span>
                  </div>

                  {/* Floating Right: 48K Shares */}
                  <div className="adstik-why-share-badge">
                    <ShareFat size={18} weight="fill" className="adstik-share-icon" />
                    <span>{content.whyTiktok?.sharesBadge || "48K Shares"}</span>
                  </div>

                  {/* Floating Bottom: Platform icons pill */}
                  <div className="adstik-why-platform-bar">
                    <TiktokLogo size={22} weight="fill" className="adstik-platform-icon" />
                    <InstagramLogo size={22} weight="fill" className="adstik-platform-icon" />
                    <YoutubeLogo size={22} weight="fill" className="adstik-platform-icon" />
                    <TrendUp size={22} weight="bold" className="adstik-platform-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Showcase / Our Work Section */}
        <section id="works" className="adstik-showcase-section">
          <div className="adstik-container">
            <div className="adstik-section-badge-center">
              <div className="adstik-pill-badge">
                <span>{content.showcase?.badge || "OUR WORK"}</span>
              </div>
            </div>

            <h2 className="adstik-section-heading">
              {content.showcase?.title || "PulseTik Selected Ads"}
            </h2>

            {/* Fanned 3D Phone Showcase Stack */}
            <div className="adstik-showcase-stack">
              {showcaseItems.map((item, idx) => {
                const total = showcaseItems.length;
                const active = activeShowcaseIndex;
                const prev = (active - 1 + total) % total;
                const next = (active + 1) % total;

                let positionClass = "adstik-phone-card-hidden";
                if (idx === active) positionClass = "adstik-phone-card-active";
                else if (idx === prev) positionClass = "adstik-phone-card-left";
                else if (idx === next) positionClass = "adstik-phone-card-right";

                return (
                  <div
                    key={idx}
                    className={`adstik-phone-card ${positionClass}`}
                    onClick={() => setActiveShowcaseIndex(idx)}
                  >
                    <img src={item.image} alt={item.imageAlt || item.title} className="adstik-phone-img" />
                    <div className="adstik-phone-overlay">
                      <div className="adstik-phone-badge">
                        <span>{item.views} • {item.roas}</span>
                      </div>
                      <h4 className="adstik-phone-title">{item.title}</h4>
                      <p className="adstik-phone-client">{item.client}</p>
                      <a href={content.showcase?.ctaHref || "#contact"} className="adstik-phone-cta">
                        {content.showcase?.ctaLabel || "See Case Studies"}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots */}
            <div className="adstik-showcase-dots">
              {showcaseItems.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  className={`adstik-dot ${dotIdx === activeShowcaseIndex ? "active" : ""}`}
                  onClick={() => setActiveShowcaseIndex(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section id="approach" className="adstik-approach-section">
          <div className="adstik-container">
            <div className="adstik-section-badge-center">
              <div className="adstik-pill-badge">
                <span>{content.approach?.badge || "OUR PROCESS"}</span>
              </div>
            </div>

            <h2 className="adstik-approach-heading">
              {content.approach?.title || "Our Approach"}
            </h2>

            <div className="adstik-approach-grid">
              {approachItems.map((step, idx) => (
                <div key={idx} className="adstik-approach-card">
                  <div>
                    <h3 className="adstik-approach-title">{step.title}</h3>
                    <p className="adstik-approach-desc">{step.description}</p>
                  </div>
                  <div className="adstik-approach-visual">
                    <img src={step.image} alt={step.imageAlt || step.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="adstik-testimonials-section">
          <div className="adstik-container">
            <div className="adstik-testimonials-header">
              <div>
                <div className="adstik-pill-badge">
                  <span>{content.testimonials?.badge || "CLIENT SUCCESS"}</span>
                </div>
                <h2 className="adstik-testimonials-heading">
                  {content.testimonials?.title || "They Grew. You Can Too"}
                </h2>
              </div>
            </div>

            <div className="adstik-testimonials-grid">
              {testimonials.map((t, idx) => {
                const toneClass =
                  t.tone === "teal"
                    ? "adstik-tone-teal"
                    : t.tone === "blue"
                    ? "adstik-tone-blue"
                    : "adstik-tone-amber";
                return (
                  <div key={idx} className={`adstik-testimonial-card ${toneClass}`}>
                    <div className="adstik-testimonial-avatar-wrap">
                      <img src={t.avatar} alt={t.avatarAlt || t.name} />
                    </div>
                    <div className="adstik-quote-icon">“</div>
                    <p className="adstik-testimonial-quote">{t.quote}</p>
                    <div className="adstik-testimonial-author">
                      <div>
                        <h4 className="adstik-author-name">{t.name}</h4>
                        <p className="adstik-author-role">{t.role}</p>
                      </div>
                      <Sparkle size={20} weight="fill" color="#550fcd" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section with Embedded CTA Banner */}
        <section id="faq" className="adstik-faq-section">
          <div className="adstik-container">
            <div className="adstik-section-badge-center">
              <div className="adstik-pill-badge">
                <span>{content.faq?.badge || "GOT QUESTIONS?"}</span>
              </div>
            </div>

            <h2 className="adstik-faq-heading">
              {content.faq?.title || "Frequently Asked Questions"}
            </h2>

            <div className="adstik-faq-list">
              {faqItems.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`adstik-faq-item ${isOpen ? "adstik-faq-open" : ""}`}
                  >
                    <button
                      className="adstik-faq-question-btn"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      <span>{item.question}</span>
                      <div className="adstik-faq-arrow">
                        <CaretRight size={18} weight="bold" />
                      </div>
                    </button>
                    {isOpen && (
                      <div className="adstik-faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Banner Embedded */}
            <div className="adstik-cta-banner-wrap">
              <div className="adstik-cta-banner">
                <img
                  src="/templates/adstik-tiktok-agency/assets/cta-floating-sphere-1.png"
                  alt="3D bubble"
                  className="adstik-banner-bubble-left"
                />
                <img
                  src="/templates/adstik-tiktok-agency/assets/cta-floating-bubble-3.png"
                  alt="3D sphere"
                  className="adstik-banner-bubble-right"
                />

                <h3 className="adstik-banner-title">
                  {content.ctaBanner?.title || "Scale Your Brand With Us"}
                </h3>

                <p className="adstik-banner-desc">
                  {content.ctaBanner?.description ||
                    "Ready to turn viral TikTok attention into predictable, scalable revenue? Let's build your brand's growth roadmap today."}
                </p>

                <a
                  href={content.ctaBanner?.button?.href || "#contact"}
                  className="adstik-btn-primary"
                >
                  <span>{content.ctaBanner?.button?.label || "Let's Talk"}</span>
                  <ArrowRight size={18} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Proposal / Contact Form Section */}
        <section id="contact" className="adstik-proposal-section">
          <div className="adstik-container">
            <div className="adstik-section-badge-center">
              <div className="adstik-pill-badge">
                <span>{content.proposal?.badge || "LET'S COLLABORATE"}</span>
              </div>
            </div>

            <h2 className="adstik-section-heading" style={{ color: "#ffffff" }}>
              {content.proposal?.title || "Request a Proposal"}
            </h2>

            <div className="adstik-proposal-card">
              {formSubmitted ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "var(--adstik-yellow)",
                      color: "var(--adstik-dark-text)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px auto"
                    }}
                  >
                    <Check size={32} weight="bold" />
                  </div>
                  <h3 style={{ color: "#ffffff", fontSize: "24px", marginBottom: "10px" }}>
                    Proposal Request Received!
                  </h3>
                  <p style={{ color: "var(--adstik-body)", maxWidth: "420px", margin: "0 auto" }}>
                    Thank you. Our TikTok strategy team will audit your brand and send a tailored growth plan within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleProposalSubmit}>
                  <div className="adstik-form-grid">
                    <div className="adstik-form-group">
                      <label className="adstik-form-label">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        className="adstik-form-input"
                      />
                    </div>

                    <div className="adstik-form-group">
                      <label className="adstik-form-label">Work Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@yourbrand.co.uk"
                        className="adstik-form-input"
                      />
                    </div>

                    <div className="adstik-form-group adstik-form-full">
                      <label className="adstik-form-label">Website or TikTok Handle</label>
                      <input
                        type="text"
                        required
                        placeholder="yourbrand.co.uk or @yourbrand"
                        className="adstik-form-input"
                      />
                    </div>

                    <div className="adstik-form-group adstik-form-full">
                      <label className="adstik-form-label">Monthly Ad Spend Budget</label>
                      <div className="adstik-budget-pills">
                        {budgetOptions.map((opt, bIdx) => (
                          <div
                            key={bIdx}
                            className={`adstik-budget-pill ${selectedBudget === opt ? "selected" : ""}`}
                            onClick={() => setSelectedBudget(opt)}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="adstik-form-group adstik-form-full">
                      <label className="adstik-form-label">Project Details & Growth Goals</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your current campaigns, target ROAS, or products you want to scale on TikTok..."
                        className="adstik-form-textarea"
                      />
                    </div>
                  </div>

                  <button type="submit" className="adstik-submit-btn">
                    {content.proposal?.submitLabel || "Get Free Proposal"}
                  </button>

                  <p className="adstik-confidential-note">
                    {content.proposal?.confidentialNotice ||
                      "🔒 100% confidential. No spam or pressure, ever."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Ticker Bar 2 */}
        <section className="adstik-ticker-section">
          <div className="adstik-ticker-track">
            {[...ticker2Items, ...ticker2Items, ...ticker2Items, ...ticker2Items].map((item, idx) => (
              <div key={idx} className="adstik-ticker-item">
                <span>✦ {item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="adstik-footer">
        <div className="adstik-container">
          <div className="adstik-footer-grid">
            {/* Brand Col */}
            <div className="adstik-footer-brand">
              <a href="#top" className="adstik-logo">
                <img
                  src={content.brand?.logo || "/templates/adstik-tiktok-agency/assets/tiktok-3d-badge.png"}
                  alt={content.brand?.logoAlt || "Logo"}
                  className="adstik-logo-icon"
                />
                <span>{content.brand?.name || "PULSETIK"}</span>
              </a>
              <p>
                {content.footer?.description ||
                  "PulseTik is London's premier TikTok advertising and viral creator growth agency, scaling direct-to-consumer and modern brands."}
              </p>
            </div>

            {/* Navigation Col */}
            <div>
              <h4 className="adstik-footer-col-title">
                {content.footer?.navTitle || "Navigation"}
              </h4>
              <ul className="adstik-footer-links">
                {footerNavLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="adstik-footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions Col */}
            <div>
              <h4 className="adstik-footer-col-title">
                {content.footer?.servicesTitle || "Growth Solutions"}
              </h4>
              <ul className="adstik-footer-links">
                {footerServiceLinks.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="adstik-footer-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Col */}
            <div>
              <h4 className="adstik-footer-col-title">
                {content.footer?.contactTitle || "London Office"}
              </h4>
              <address className="adstik-footer-address">
                <span>{content.brand?.address || "74 Great Eastern St, London EC2A 3JG"}</span>
                <a href={content.brand?.emailHref || "mailto:hello@pulsetik.co.uk"} className="adstik-footer-link">
                  {content.brand?.email || "hello@pulsetik.co.uk"}
                </a>
                <a href={content.brand?.phoneHref || "tel:+442079460928"} className="adstik-footer-link">
                  {content.brand?.phone || "+44 20 7946 0928"}
                </a>
              </address>

              <div style={{ marginTop: "20px" }}>
                <p style={{ fontSize: "12px", color: "var(--adstik-muted)", margin: "0 0 6px 0" }}>
                  {content.footer?.newsletterDescription ||
                    "Weekly TikTok trends and high-performing hooks breakdown."}
                </p>
                <div className="adstik-newsletter-form">
                  <input
                    type="email"
                    placeholder="Enter work email"
                    className="adstik-newsletter-input"
                  />
                  <button type="button" className="adstik-newsletter-btn">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="adstik-footer-bottom">
            <p className="adstik-copyright">
              © {currentYear} {content.brand?.name || "Adstik"} Ltd. All Rights Reserved.
            </p>

            <div className="adstik-socials-row">
              {footerSocials.map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="adstik-social-icon"
                  aria-label={s.name}
                >
                  {s.name.toLowerCase().includes("tik") ? (
                    <TiktokLogo size={18} weight="fill" />
                  ) : s.name.toLowerCase().includes("insta") ? (
                    <InstagramLogo size={18} weight="fill" />
                  ) : s.name.toLowerCase().includes("you") ? (
                    <YoutubeLogo size={18} weight="fill" />
                  ) : s.name.toLowerCase().includes("link") ? (
                    <LinkedinLogo size={18} weight="fill" />
                  ) : (
                    <TwitterLogo size={18} weight="fill" />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
