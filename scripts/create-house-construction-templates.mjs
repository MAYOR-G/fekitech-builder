import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const templatesRoot = path.join(root, "src/templates");
const publicRoot = path.join(root, "public/templates");
const houseSource = path.resolve(root, "../MY TEMPLATES/HOUSE DESIGN template/assets");
const constructionSource = path.resolve(root, "../MY TEMPLATES/CONSTRUCTION COMPANY template/assets");

const templates = [
  {
    slug: "lumen-house-design",
    name: "Lumen House Design",
    category: "Architecture",
    source: houseSource,
    mode: "light",
    logoFile: "lumen-house-logo.svg",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 64" role="img" aria-label="Lumen House Design"><path fill="#111827" d="M14 47h38V17h8v38H14z"/><path fill="#C69C6D" d="M70 16h16v40H70zM92 16h8v40h-8z"/><text x="116" y="31" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#111827">LUMEN HOUSE</text><text x="116" y="50" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#A87945">DESIGN</text></svg>`,
    images: {
      hero: "assets/images/background/hero-bg.jpg",
      secondary: "assets/images/about/about-right.jpg",
      projectOne: "assets/images/projects-01/1.jpg",
      projectTwo: "assets/images/projects-02/1-after.jpg",
      projectThree: "assets/images/interior/4.jpg",
      texture: "assets/images/background/cta.png",
    },
    editable: {
      brand: {
        name: "Lumen House Design",
        tagline: "Residential interiors and architectural detailing",
        email: "studio@lumenhouse.design",
        phone: "+44 20 7193 4820",
        address: "24 Charlotte Road, London, EC2A 3PB",
        logo: "/templates/lumen-house-design/assets/images/logos/lumen-house-logo.svg",
      },
      navigation: {
        links: [
          { label: "Home", page: "home", href: "#/home" },
          { label: "About", page: "about", href: "#/about" },
          { label: "Projects", page: "projects", href: "#/projects" },
          { label: "Services", page: "services", href: "#/services" },
          { label: "Pricing", page: "pricing", href: "#/pricing" },
          { label: "Contact", page: "contact", href: "#/contact" },
        ],
        ctaLabel: "Book a Studio Call",
        ctaHref: "#/contact",
        phoneLabel: "+44 20 7193 4820",
        phoneHref: "tel:+442071934820",
      },
      hero: {
        eyebrow: "Light-filled residential design",
        title: "Homes shaped with quiet precision.",
        accent: "quiet",
        text: "Interior architecture, finish schedules, and custom room concepts for owners who want clarity before the build begins.",
        primaryCta: "Start a Brief",
        primaryHref: "#/contact",
        secondaryCta: "View Projects",
        secondaryHref: "#/projects",
      },
      pages: {
        about: { title: "A studio for calm, buildable homes.", text: "We turn spatial ideas into practical drawings, material palettes, and rooms that feel settled from day one." },
        projects: { title: "Recent residential work.", text: "Explore living rooms, kitchens, bedrooms, and whole-home schemes designed around real use." },
        services: { title: "Design services from concept to handover.", text: "Choose the level of support your project needs, from a single room refresh to a full design package." },
        pricing: { title: "Transparent design packages.", text: "Simple starting points help clients budget before choosing finishes, drawings, and sourcing support." },
        contact: { title: "Tell us what your home needs next.", text: "Send the site, scope, timeline, and any references. We will reply with next steps." },
      },
      stats: [
        { value: "42", label: "homes refined" },
        { value: "8wk", label: "typical design phase" },
        { value: "4.9", label: "client rating" },
      ],
      services: {
        items: [
          { title: "Interior Architecture", text: "Room plans, joinery ideas, lighting direction, and buildable finish notes." },
          { title: "Material Direction", text: "Palettes, fixtures, surfaces, and supplier-ready schedules." },
          { title: "Project Styling", text: "Furniture, art, and final-layer styling for move-in ready spaces." },
        ],
      },
      projects: {
        items: [
          { title: "Canonbury Terrace", type: "Whole-home refresh", image: "/templates/lumen-house-design/assets/images/projects-01/1.jpg" },
          { title: "Belsize Kitchen", type: "Joinery and lighting", image: "/templates/lumen-house-design/assets/images/projects-02/1-after.jpg" },
          { title: "Clerkenwell Loft", type: "Living space concept", image: "/templates/lumen-house-design/assets/images/interior/4.jpg" },
        ],
      },
      pricing: {
        items: [
          { name: "Room Edit", price: "From £850", text: "One room concept, palette, layout, and purchasing direction." },
          { name: "Design Package", price: "From £3,200", text: "Multi-room design, finish schedules, and supplier-ready notes." },
          { name: "Full Home", price: "Custom quote", text: "Complete design support from brief through handover." },
        ],
      },
      testimonials: [
        { quote: "The process felt composed and exact. Every decision became easier.", name: "Amara C.", role: "Homeowner" },
        { quote: "They gave our builder the detail he needed and gave us a home we actually love living in.", name: "Daniel R.", role: "Renovation client" },
      ],
      images: {
        hero: "/templates/lumen-house-design/assets/images/background/hero-bg.jpg",
        secondary: "/templates/lumen-house-design/assets/images/about/about-right.jpg",
        texture: "/templates/lumen-house-design/assets/images/background/cta.png",
      },
      colors: { primary: "#a87945", background: "#f7f3ec", text: "#111827" },
    },
  },
  {
    slug: "noir-house-design",
    name: "Noir House Atelier",
    category: "Architecture",
    source: houseSource,
    mode: "dark",
    logoFile: "noir-house-logo.svg",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 64" role="img" aria-label="Noir House Atelier"><path fill="#F4EFE5" d="M14 16h10l36 30V16h9v41h-9L23 28v29h-9z"/><path fill="#B78A55" d="M82 16h8v41h-8z"/><text x="108" y="31" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#F4EFE5">NOIR HOUSE</text><text x="108" y="50" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#B78A55">ATELIER</text></svg>`,
    images: {
      hero: "assets/images/background/hero-bg-5.jpg",
      secondary: "assets/images/project-details/detail-1.jpg",
      projectOne: "assets/images/projects-05/1.jpg",
      projectTwo: "assets/images/interior/10.jpg",
      projectThree: "assets/images/project-details/detail-3.jpg",
      texture: "assets/images/background/faq.png",
    },
    editable: {
      brand: {
        name: "Noir House Atelier",
        tagline: "Moody interiors, architectural rooms, bespoke details",
        email: "hello@noirhouseatelier.com",
        phone: "+44 161 496 3104",
        address: "9 King Street, Manchester, M2 6AW",
        logo: "/templates/noir-house-design/assets/images/logos/noir-house-logo.svg",
      },
      navigation: {
        links: [
          { label: "Home", page: "home", href: "#/home" },
          { label: "About", page: "about", href: "#/about" },
          { label: "Projects", page: "projects", href: "#/projects" },
          { label: "Services", page: "services", href: "#/services" },
          { label: "Pricing", page: "pricing", href: "#/pricing" },
          { label: "Contact", page: "contact", href: "#/contact" },
        ],
        ctaLabel: "Reserve Consultation",
        ctaHref: "#/contact",
        phoneLabel: "+44 161 496 3104",
        phoneHref: "tel:+441614963104",
      },
      hero: {
        eyebrow: "Dark-mode interior atelier",
        title: "Rooms with shadow, depth, and restraint.",
        accent: "depth",
        text: "A refined design system for statement homes, boutique residences, and clients who want atmosphere without excess.",
        primaryCta: "Plan the Room",
        primaryHref: "#/contact",
        secondaryCta: "Open Gallery",
        secondaryHref: "#/projects",
      },
      pages: {
        about: { title: "A darker, sharper design language.", text: "We build rooms around contrast, proportion, texture, and the small decisions that make spaces feel expensive." },
        projects: { title: "A gallery of high-contrast spaces.", text: "Selected interiors, joinery concepts, and atmospheric living areas designed with editorial restraint." },
        services: { title: "Studio services for statement homes.", text: "From mood direction to full design packages, every service is built to be edited and sold clearly." },
        pricing: { title: "Packages for measured design work.", text: "Clients can compare the scope, timeline, and deliverables before booking a consultation." },
        contact: { title: "Start the next room with intent.", text: "Share the property, room goals, budget range, and timeline. We will shape a precise next step." },
      },
      stats: [
        { value: "31", label: "signature spaces" },
        { value: "6", label: "material libraries" },
        { value: "92%", label: "repeat referrals" },
      ],
      services: {
        items: [
          { title: "Atmosphere Direction", text: "Concept boards, palette choices, lighting mood, and signature room language." },
          { title: "Bespoke Joinery", text: "Built-in storage, bars, media walls, wardrobes, and display systems." },
          { title: "Full Styling", text: "Furniture, accessories, art direction, and handover styling." },
        ],
      },
      projects: {
        items: [
          { title: "King Street Residence", type: "Dark living concept", image: "/templates/noir-house-design/assets/images/projects-05/1.jpg" },
          { title: "Northern Apartment", type: "Primary bedroom", image: "/templates/noir-house-design/assets/images/interior/10.jpg" },
          { title: "Private Lounge", type: "Materials and joinery", image: "/templates/noir-house-design/assets/images/project-details/detail-3.jpg" },
        ],
      },
      pricing: {
        items: [
          { name: "Mood Direction", price: "From £950", text: "One-room atmosphere concept, palette, and sourcing list." },
          { name: "Atelier Package", price: "From £4,500", text: "Detailed room design with joinery, lighting, and finish notes." },
          { name: "Residence", price: "Custom quote", text: "Whole-home creative direction and staged implementation support." },
        ],
      },
      testimonials: [
        { quote: "It feels like a boutique hotel, but still completely ours.", name: "Priya M.", role: "Private client" },
        { quote: "The palette, lighting, and joinery were all handled with real taste.", name: "Lewis A.", role: "Apartment owner" },
      ],
      images: {
        hero: "/templates/noir-house-design/assets/images/background/hero-bg-5.jpg",
        secondary: "/templates/noir-house-design/assets/images/project-details/detail-1.jpg",
        texture: "/templates/noir-house-design/assets/images/background/faq.png",
      },
      colors: { primary: "#b78a55", background: "#111111", text: "#f4efe5" },
    },
  },
  {
    slug: "forgepoint-construction",
    name: "Forgepoint Construction",
    category: "Construction",
    source: constructionSource,
    mode: "construction",
    logoFile: "forgepoint-logo.svg",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 64" role="img" aria-label="Forgepoint Construction"><path fill="#18212F" d="M14 48 44 16l30 32H62L44 29 26 48z"/><path fill="#E0A325" d="M20 50h50v8H20zM38 34h12v16H38z"/><text x="92" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#18212F">FORGEPOINT</text><text x="92" y="50" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#E0A325">CONSTRUCTION</text></svg>`,
    images: {
      hero: "assets/images/c837a6_0028340354594c0b95b8b6c7acfeaa26~mv2-202462.jpeg",
      secondary: "assets/images/c837a6_44f2f29e9f7143d9af6a5f7c4152c909~mv2-ce3047.jpeg",
      projectOne: "assets/images/c837a6_10f91af75c3544eeadfa2a42635d2c0e~mv2-de770b.jpg",
      projectTwo: "assets/images/c837a6_1aa91221d7904160919be80412e91c39~mv2-4a4033.jpeg",
      projectThree: "assets/images/c837a6_39f14f8f765d4268bf5aed5a5b0ae2a4~mv2-2fbda6.jpeg",
      texture: "assets/images/c837a6_549841d99460414993f41a97bc1f269f~mv2-1a1e2d.jpg",
    },
    editable: {
      brand: {
        name: "Forgepoint Construction",
        tagline: "Commercial construction and residential build management",
        email: "projects@forgepointbuild.co.uk",
        phone: "+44 121 496 8840",
        address: "41 Colmore Row, Birmingham, B3 2BS",
        logo: "/templates/forgepoint-construction/assets/images/forgepoint-logo.svg",
      },
      navigation: {
        links: [
          { label: "Home", page: "home", href: "#/home" },
          { label: "About", page: "about", href: "#/about" },
          { label: "Projects", page: "projects", href: "#/projects" },
          { label: "Services", page: "services", href: "#/services" },
          { label: "Pricing", page: "pricing", href: "#/pricing" },
          { label: "Contact", page: "contact", href: "#/contact" },
        ],
        ctaLabel: "Request Estimate",
        ctaHref: "#/contact",
        phoneLabel: "+44 121 496 8840",
        phoneHref: "tel:+441214968840",
      },
      hero: {
        eyebrow: "Construction company template",
        title: "Builds managed with site discipline.",
        accent: "discipline",
        text: "A premium construction template for contractors, builders, and project teams that need credibility before the first call.",
        primaryCta: "Request Estimate",
        primaryHref: "#/contact",
        secondaryCta: "View Projects",
        secondaryHref: "#/projects",
      },
      pages: {
        about: { title: "A construction team built around accountability.", text: "Forgepoint coordinates planning, procurement, site delivery, and client updates with one clean operating rhythm." },
        projects: { title: "Recent builds and active sites.", text: "Showcase commercial fit-outs, structural works, renovations, and finished handovers with local imagery." },
        services: { title: "Construction services that clients can understand.", text: "Clear service blocks help visitors choose maintenance, renovation, commercial work, or full build support." },
        pricing: { title: "Estimate ranges and project starts.", text: "Give clients useful budget context while keeping final pricing tied to survey and scope." },
        contact: { title: "Send drawings, photos, or a site address.", text: "Make every enquiry actionable with contact links, phone number, and project detail prompts." },
      },
      stats: [
        { value: "128", label: "projects delivered" },
        { value: "24h", label: "estimate response" },
        { value: "£18m", label: "managed build value" },
      ],
      services: {
        items: [
          { title: "Commercial Fit-Out", text: "Office, retail, and hospitality projects with phased delivery planning." },
          { title: "Residential Build", text: "Extensions, renovations, structural works, and finish coordination." },
          { title: "Site Management", text: "Procurement, contractor coordination, documentation, and client reporting." },
        ],
      },
      projects: {
        items: [
          { title: "Birmingham Roof Structure", type: "Structural works", image: "/templates/forgepoint-construction/assets/images/c837a6_10f91af75c3544eeadfa2a42635d2c0e~mv2-de770b.jpg" },
          { title: "Civic Bridge Works", type: "Infrastructure build", image: "/templates/forgepoint-construction/assets/images/c837a6_1aa91221d7904160919be80412e91c39~mv2-4a4033.jpeg" },
          { title: "Colmore Workspace", type: "Commercial shell", image: "/templates/forgepoint-construction/assets/images/c837a6_39f14f8f765d4268bf5aed5a5b0ae2a4~mv2-2fbda6.jpeg" },
        ],
      },
      pricing: {
        items: [
          { name: "Site Visit", price: "From £250", text: "Initial review, scope notes, and budget direction." },
          { name: "Renovation Works", price: "From £18k", text: "Residential or commercial works based on survey and drawings." },
          { name: "Full Build", price: "Tendered quote", text: "Procurement-led project pricing with a documented delivery plan." },
        ],
      },
      testimonials: [
        { quote: "They made a complicated programme feel controlled from week one.", name: "Morgan S.", role: "Commercial client" },
        { quote: "Clear updates, tidy site, and no mystery around the budget.", name: "Harriet B.", role: "Homeowner" },
      ],
      images: {
        hero: "/templates/forgepoint-construction/assets/images/c837a6_0028340354594c0b95b8b6c7acfeaa26~mv2-202462.jpeg",
        secondary: "/templates/forgepoint-construction/assets/images/c837a6_44f2f29e9f7143d9af6a5f7c4152c909~mv2-ce3047.jpeg",
        texture: "/templates/forgepoint-construction/assets/images/c837a6_549841d99460414993f41a97bc1f269f~mv2-1a1e2d.jpg",
      },
      colors: { primary: "#e0a325", background: "#f4f1e9", text: "#18212f" },
    },
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function removeGeneratedSourceScripts(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      removeGeneratedSourceScripts(fullPath);
    } else if (/\.(?:js|mjs|map)$/i.test(entry.name)) {
      fs.rmSync(fullPath, { force: true });
    }
  }
}

function stringify(value) {
  return JSON.stringify(value, null, 2);
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svgText(text, x, y, size, color, weight = 800) {
  return `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(text)}</text>`;
}

function makeConfig(template) {
  return {
    id: template.slug,
    name: template.name,
    description: template.mode === "construction"
      ? "A premium editable construction company website with local imagery, service pages, pricing, testimonials, and contact CTAs."
      : `A premium editable ${template.mode === "light" ? "light" : "dark"} house-design website with local architecture assets and multi-page content.`,
    category: template.category,
    image: `/templates/${template.slug}/preview-collage.webp`,
    previewImages: [
      `/templates/${template.slug}/preview-collage.webp`,
      template.editable.images.hero,
      template.editable.images.secondary,
    ],
    features: [
      "Editable header and CTA links",
      "Editable phone, email and contact details",
      "Home, about, projects, services, pricing and contact pages",
      "Local assets and custom SVG logo",
      "Three-page catalogue preview image",
    ],
  };
}

function makeTemplateTsx() {
  return `"use client";

import { useMemo, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type LocalEditable = typeof editableData;
type NavLink = { label: string; page: string; href: string };
type Service = { title: string; text: string };
type Project = { title: string; type: string; image: string };
type Price = { name: string; price: string; text: string };
type Testimonial = { quote: string; name: string; role: string };

function pageFromHref(href: string) {
  return href.startsWith("#/") ? href.slice(2) : "";
}

function AccentTitle({ title, accent }: { title: string; accent: string }) {
  const parts = accent ? title.split(accent) : [title];
  if (!accent || parts.length < 2) return <>{title}</>;
  return <>{parts[0]}<em>{accent}</em>{parts.slice(1).join(accent)}</>;
}

export default function LocalPremiumTemplate({ data }: { data?: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as LocalEditable;
  const [page, setPage] = useState("home");
  const links = content.navigation.links as NavLink[];
  const services = content.services.items as Service[];
  const projects = content.projects.items as Project[];
  const prices = content.pricing.items as Price[];
  const testimonials = content.testimonials as Testimonial[];
  const currentPage = page === "home" ? undefined : (content.pages as Record<string, { title: string; text: string }>)[page] ?? content.pages.about;
  const pageTitle = currentPage?.title ?? content.hero.title;
  const pageText = currentPage?.text ?? content.hero.text;

  const go = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    const next = pageFromHref(href);
    if (!next) return;
    event.preventDefault();
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nav = useMemo(() => links.map((link) => (
    <a key={link.page} href={link.href} onClick={go(link.href)} aria-current={page === link.page ? "page" : undefined}>{link.label}</a>
  )), [links, page]);

  return (
    <main className="local-premium-template" data-mode={content.colors.background === "#111111" ? "dark" : "light"} style={{
      "--template-primary": content.colors.primary,
      "--template-background": content.colors.background,
      "--template-text": content.colors.text,
    } as CSSProperties}>
      <section className="lp-hero-shell">
        <Header content={content} nav={nav} go={go} />
        {page === "home" ? (
          <Home content={content} services={services} projects={projects} testimonials={testimonials} go={go} />
        ) : (
          <InteriorPage page={page} title={pageTitle} text={pageText} content={content} services={services} projects={projects} prices={prices} testimonials={testimonials} go={go} />
        )}
      </section>
      <Footer content={content} nav={nav} />
    </main>
  );
}

function Header({ content, nav, go }: { content: LocalEditable; nav: ReactNode; go: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <header className="lp-header">
      <a className="lp-logo" href="#/home" onClick={go("#/home")}><img src={content.brand.logo} alt={content.brand.name} /></a>
      <nav>{nav}</nav>
      <div className="lp-header-actions">
        <a className="lp-phone" href={content.navigation.phoneHref}>{content.navigation.phoneLabel}</a>
        <a className="lp-button" href={content.navigation.ctaHref} onClick={go(content.navigation.ctaHref)}>{content.navigation.ctaLabel}</a>
      </div>
    </header>
  );
}

function Home({ content, services, projects, testimonials, go }: { content: LocalEditable; services: Service[]; projects: Project[]; testimonials: Testimonial[]; go: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <>
      <div className="lp-hero">
        <img className="lp-hero-image" src={content.images.hero} alt="" aria-hidden="true" />
        <div className="lp-hero-overlay" />
        <div className="lp-hero-content">
          <span>{content.hero.eyebrow}</span>
          <h1><AccentTitle title={content.hero.title} accent={content.hero.accent} /></h1>
          <p>{content.hero.text}</p>
          <div className="lp-actions">
            <a className="lp-button" href={content.hero.primaryHref} onClick={go(content.hero.primaryHref)}>{content.hero.primaryCta}</a>
            <a className="lp-button ghost" href={content.hero.secondaryHref} onClick={go(content.hero.secondaryHref)}>{content.hero.secondaryCta}</a>
          </div>
        </div>
        <div className="lp-metrics">{content.stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><small>{stat.label}</small></div>)}</div>
      </div>
      <LogoRail />
      <ContentBands content={content} services={services} projects={projects} testimonials={testimonials} />
    </>
  );
}

function InteriorPage({ page, title, text, content, services, projects, prices, testimonials, go }: { page: string; title: string; text: string; content: LocalEditable; services: Service[]; projects: Project[]; prices: Price[]; testimonials: Testimonial[]; go: (href: string) => (event: MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <>
      <div className="lp-page-hero">
        <img src={content.images.secondary} alt="" aria-hidden="true" />
        <div>
          <span>{content.brand.tagline}</span>
          <h1>{title}</h1>
          <p>{text}</p>
          <a className="lp-button" href={content.navigation.ctaHref} onClick={go(content.navigation.ctaHref)}>{content.navigation.ctaLabel}</a>
        </div>
      </div>
      {page === "projects" && <Projects projects={projects} />}
      {page === "services" && <Services services={services} />}
      {page === "pricing" && <Pricing prices={prices} />}
      {page === "contact" && <Contact content={content} />}
      {page === "about" && <ContentBands content={content} services={services} projects={projects} testimonials={testimonials} />}
    </>
  );
}

function LogoRail() {
  const names = ["Houzz", "Dezeen", "Build Partner", "Studio Trade", "Local Works", "Design Guild"];
  return <div className="lp-rail"><div>{[...names, ...names].map((name, index) => <span key={name + index}>{name}</span>)}</div></div>;
}

function ContentBands({ content, services, projects, testimonials }: { content: LocalEditable; services: Service[]; projects: Project[]; testimonials: Testimonial[] }) {
  return (
    <>
      <section className="lp-split">
        <div><span>{content.brand.tagline}</span><h2>{content.pages.about.title}</h2><p>{content.pages.about.text}</p></div>
        <img src={content.images.secondary} alt="" />
      </section>
      <Services services={services} />
      <Projects projects={projects} />
      <Testimonials testimonials={testimonials} />
    </>
  );
}

function Services({ services }: { services: Service[] }) {
  return <section className="lp-section"><span>Core offer</span><h2>Services built for confident decisions.</h2><div className="lp-card-grid">{services.map((service) => <article key={service.title}><h3>{service.title}</h3><p>{service.text}</p></article>)}</div></section>;
}

function Projects({ projects }: { projects: Project[] }) {
  return <section className="lp-section"><span>Visual proof</span><h2>Work that shows the standard.</h2><div className="lp-project-grid">{projects.map((project) => <article key={project.title}><img src={project.image} alt={project.title} /><div><strong>{project.title}</strong><small>{project.type}</small></div></article>)}</div></section>;
}

function Pricing({ prices }: { prices: Price[] }) {
  return <section className="lp-section"><span>Pricing</span><h2>Editable packages for real enquiries.</h2><div className="lp-card-grid pricing">{prices.map((price) => <article key={price.name}><h3>{price.name}</h3><strong>{price.price}</strong><p>{price.text}</p></article>)}</div></section>;
}

function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return <section className="lp-testimonials"><span>Client words</span><h2>Proof with room to breathe.</h2><div>{testimonials.map((item) => <article key={item.name}><b>“</b><p>{item.quote}</p><strong>{item.name}</strong><small>{item.role}</small></article>)}</div></section>;
}

function Contact({ content }: { content: LocalEditable }) {
  return <section className="lp-contact"><div><span>Contact</span><h2>{content.pages.contact.title}</h2><p>{content.pages.contact.text}</p></div><div><a href={content.navigation.phoneHref}>{content.brand.phone}</a><a href={"mailto:" + content.brand.email}>{content.brand.email}</a><p>{content.brand.address}</p></div></section>;
}

function Footer({ content, nav }: { content: LocalEditable; nav: ReactNode }) {
  return <footer className="lp-footer"><img src={content.brand.logo} alt={content.brand.name} /><nav>{nav}</nav><p>{content.brand.address}</p></footer>;
}
`;
}

function makeStyles() {
  return `.local-premium-template{--accent:var(--template-primary);--bg:var(--template-background);--text:var(--template-text);background:var(--bg);color:var(--text);font-family:Inter,Arial,Helvetica,sans-serif;overflow:hidden}.local-premium-template *{box-sizing:border-box}.local-premium-template a{color:inherit;text-decoration:none}.lp-hero-shell{position:relative;background:var(--bg)}.lp-header{position:absolute;z-index:20;top:24px;left:50%;transform:translateX(-50%);width:min(1180px,calc(100% - 32px));display:flex;align-items:center;justify-content:space-between;gap:18px;padding:12px 14px;border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.16);backdrop-filter:blur(22px);box-shadow:0 24px 80px rgba(0,0,0,.16);border-radius:18px}.local-premium-template[data-mode=light] .lp-header{background:rgba(255,255,255,.76);border-color:rgba(17,24,39,.12)}.lp-logo img{width:190px;max-height:46px;display:block}.lp-header nav,.lp-footer nav{display:flex;align-items:center;gap:22px;font-size:13px;font-weight:800;text-transform:uppercase}.lp-header-actions{display:flex;align-items:center;gap:10px}.lp-phone{font-size:13px;font-weight:800}.lp-button{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border-radius:12px;background:var(--accent);color:#111!important;font-weight:900;border:1px solid rgba(0,0,0,.08);transition:transform .28s ease,box-shadow .28s ease}.lp-button:hover{transform:translateY(-2px);box-shadow:0 18px 45px rgba(0,0,0,.18)}.lp-button.ghost{background:rgba(255,255,255,.18);color:#fff!important;border-color:rgba(255,255,255,.35)}.lp-hero{min-height:92vh;position:relative;display:flex;align-items:flex-end;padding:150px max(28px,calc((100vw - 1180px)/2)) 78px}.lp-hero-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.lp-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.78),rgba(0,0,0,.34) 48%,rgba(0,0,0,.12)),linear-gradient(0deg,rgba(0,0,0,.58),transparent 45%)}.lp-hero-content{position:relative;z-index:2;width:min(760px,100%);color:#fff}.lp-hero-content span,.lp-section>span,.lp-split span,.lp-page-hero span,.lp-testimonials>span,.lp-contact span{display:block;margin-bottom:16px;color:var(--accent);font-size:13px;font-weight:900;text-transform:uppercase}.lp-hero h1,.lp-page-hero h1{margin:0;font-size:clamp(48px,7vw,108px);line-height:.94;font-weight:900;letter-spacing:0}.lp-hero h1 em{font-family:Georgia,serif;font-weight:500}.lp-hero p,.lp-page-hero p,.lp-split p,.lp-section p,.lp-contact p{font-size:18px;line-height:1.65;max-width:680px}.lp-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}.lp-metrics{position:absolute;right:max(28px,calc((100vw - 1180px)/2));bottom:70px;z-index:3;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:min(390px,34vw)}.lp-metrics div{padding:18px;border-radius:16px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.28);backdrop-filter:blur(16px);color:#fff}.lp-metrics strong{display:block;font-size:30px}.lp-metrics small{font-weight:800;text-transform:uppercase}.lp-rail{overflow:hidden;border-block:1px solid rgba(128,128,128,.2);background:rgba(255,255,255,.04)}.lp-rail div{display:flex;width:max-content;gap:56px;padding:22px 0;animation:lp-marquee 32s linear infinite}.lp-rail span{font-size:14px;font-weight:900;text-transform:uppercase;color:color-mix(in srgb,var(--text) 70%,transparent)}@keyframes lp-marquee{to{transform:translateX(-50%)}}.lp-split,.lp-section,.lp-testimonials,.lp-contact{width:min(1180px,calc(100% - 32px));margin:0 auto;padding:100px 0}.lp-split{display:grid;grid-template-columns:1fr .86fr;gap:70px;align-items:center}.lp-split h2,.lp-section h2,.lp-testimonials h2,.lp-contact h2{font-size:clamp(34px,4vw,64px);line-height:1.02;margin:0 0 20px}.lp-split img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:8px}.lp-card-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:36px}.lp-card-grid article{padding:30px;border:1px solid rgba(128,128,128,.2);background:color-mix(in srgb,var(--bg) 90%,#fff 10%);border-radius:8px;min-height:220px}.lp-card-grid h3{font-size:25px;margin:0 0 18px}.pricing strong{display:block;font-size:30px;margin-bottom:16px;color:var(--accent)}.lp-project-grid{display:grid;grid-template-columns:1.1fr .9fr .9fr;gap:18px;margin-top:36px}.lp-project-grid article{position:relative;min-height:430px;overflow:hidden;border-radius:8px;background:#111}.lp-project-grid img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;transition:transform .7s ease}.lp-project-grid article:hover img{transform:scale(1.05)}.lp-project-grid div{position:absolute;left:20px;right:20px;bottom:20px;padding:18px;border-radius:8px;background:rgba(255,255,255,.86);color:#111}.lp-project-grid strong,.lp-project-grid small{display:block}.lp-project-grid small{margin-top:4px;text-transform:uppercase;font-weight:900;color:#6b7280}.lp-testimonials{background:#fff;color:#111;width:100%;padding-inline:max(28px,calc((100vw - 1180px)/2))}.local-premium-template[data-mode=dark] .lp-testimonials{background:#f4efe5}.lp-testimonials>div{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:34px}.lp-testimonials article{position:relative;padding:34px;border-radius:8px;background:#f7f3ec}.lp-testimonials b{font-family:Georgia,serif;font-size:78px;color:var(--accent);line-height:.6}.lp-testimonials p{font-size:21px;line-height:1.5}.lp-testimonials small{display:block;color:#6b7280;margin-top:4px}.lp-page-hero{min-height:72vh;position:relative;display:grid;place-items:end start;padding:160px max(28px,calc((100vw - 1180px)/2)) 80px;color:#fff}.lp-page-hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.lp-page-hero:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.8),rgba(0,0,0,.22))}.lp-page-hero div{position:relative;z-index:2;width:min(760px,100%)}.lp-contact{display:grid;grid-template-columns:1fr .8fr;gap:50px}.lp-contact div:last-child{padding:32px;border-radius:8px;border:1px solid rgba(128,128,128,.2);background:color-mix(in srgb,var(--bg) 90%,#fff 10%)}.lp-contact a{display:block;font-size:24px;font-weight:900;margin-bottom:16px}.lp-footer{display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(1180px,calc(100% - 32px));margin:0 auto;padding:34px 0 46px;border-top:1px solid rgba(128,128,128,.2)}.lp-footer img{width:190px;max-height:46px}.lp-footer p{max-width:260px;text-align:right;font-weight:700;color:color-mix(in srgb,var(--text) 70%,transparent)}@media (prefers-reduced-motion:reduce){.lp-rail div{animation:none}.lp-button,.lp-project-grid img{transition:none}}@media (max-width:980px){.lp-header{position:absolute;align-items:flex-start;flex-wrap:wrap}.lp-header nav{order:3;width:100%;overflow:auto;padding:8px 0}.lp-header-actions{margin-left:auto}.lp-phone{display:none}.lp-hero{min-height:86vh;padding-top:170px}.lp-metrics{display:none}.lp-split,.lp-contact{grid-template-columns:1fr}.lp-card-grid,.lp-project-grid,.lp-testimonials>div{grid-template-columns:1fr}.lp-project-grid article{min-height:330px}.lp-footer{flex-direction:column;align-items:flex-start}.lp-footer p{text-align:left}}@media (max-width:560px){.lp-logo img,.lp-footer img{width:154px}.lp-header-actions .lp-button{min-height:40px;padding:0 12px;font-size:12px}.lp-hero,.lp-page-hero{padding-inline:18px}.lp-hero h1,.lp-page-hero h1{font-size:46px}.lp-hero p,.lp-page-hero p,.lp-split p,.lp-section p,.lp-contact p{font-size:16px}.lp-split,.lp-section,.lp-testimonials,.lp-contact{width:calc(100% - 28px);padding:70px 0}.lp-testimonials{width:100%;padding-inline:18px}.lp-card-grid article{padding:24px}.lp-header nav{gap:16px;font-size:12px}}`;
}

async function makePreview(template, publicDir) {
  const pages = [
    { label: "Home", title: template.editable.hero.title, image: template.editable.images.hero },
    { label: "About", title: template.editable.pages.about.title, image: template.editable.images.secondary },
    { label: "Projects", title: template.editable.pages.projects.title, image: template.editable.projects.items[0].image },
  ];
  const composites = [];
  for (const [index, page] of pages.entries()) {
    const sourcePath = path.join(root, "public", page.image.replace(/^\//, ""));
    const image = fs.existsSync(sourcePath) ? sourcePath : path.join(publicDir, template.images.hero);
    const previewTitle = page.title.length > 24 ? `${page.title.slice(0, 24)}...` : page.title;
    const panel = await sharp({ create: { width: 420, height: 680, channels: 4, background: template.mode === "dark" ? "#111111" : "#f7f3ec" } })
      .composite([
        { input: await sharp(image).resize(420, 455, { fit: "cover", position: "top" }).toBuffer(), top: 0, left: 0 },
        { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="680"><rect x="0" y="0" width="420" height="680" rx="24" fill="none" stroke="${template.mode === "dark" ? "rgba(255,255,255,.22)" : "rgba(17,24,39,.16)"}" stroke-width="2"/><rect x="0" y="390" width="420" height="290" fill="${template.mode === "dark" ? "#161616" : "#ffffff"}"/><rect x="32" y="434" width="74" height="18" rx="9" fill="${template.editable.colors.primary}"/>${svgText(page.label, 32, 510, 42, template.mode === "dark" ? "#f4efe5" : "#111827", 900)}${svgText(previewTitle, 32, 565, 20, template.mode === "dark" ? "#d9d0c4" : "#3d4656", 800)}${svgText(index === 0 ? template.editable.hero.primaryCta : template.editable.navigation.ctaLabel, 32, 622, 18, template.editable.colors.primary, 900)}</svg>`), top: 0, left: 0 },
      ])
      .png()
      .toBuffer();
    composites.push({ input: panel, left: 48 + index * 450, top: 150 });
  }
  const bg = template.mode === "dark" ? "#0d0d0d" : "#f2eee6";
  const fg = template.mode === "dark" ? "#f4efe5" : "#111827";
  const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900"><rect width="1400" height="900" fill="${bg}"/><circle cx="1220" cy="96" r="180" fill="${template.editable.colors.primary}" opacity=".16"/>${svgText(template.name, 48, 86, 46, fg, 900)}${svgText("Home  /  About  /  Projects", 48, 122, 22, template.mode === "dark" ? "#b9afa2" : "#5b6270", 800)}</svg>`);
  await sharp(svg).composite(composites).webp({ quality: 88 }).toFile(path.join(publicDir, "preview-collage.webp"));
}

async function writeTemplate(template) {
  const dir = path.join(templatesRoot, template.slug);
  const publicDir = path.join(publicRoot, template.slug);
  cleanDir(dir);
  cleanDir(publicDir);
  fs.cpSync(template.source, path.join(dir, "assets"), { recursive: true });
  fs.cpSync(template.source, path.join(publicDir, "assets"), { recursive: true });
  fs.rmSync(path.join(dir, "assets/js"), { recursive: true, force: true });
  removeGeneratedSourceScripts(path.join(dir, "assets"));
  ensureDir(path.join(dir, "assets/images/logos"));
  ensureDir(path.join(publicDir, "assets/images/logos"));
  fs.writeFileSync(path.join(dir, "assets/images/logos", template.logoFile), template.logo);
  fs.writeFileSync(path.join(publicDir, "assets/images/logos", template.logoFile), template.logo);
  fs.writeFileSync(path.join(dir, "assets/images", template.logoFile), template.logo);
  fs.writeFileSync(path.join(publicDir, "assets/images", template.logoFile), template.logo);
  fs.writeFileSync(path.join(dir, "template.tsx"), makeTemplateTsx());
  fs.writeFileSync(path.join(dir, "styles.css"), makeStyles());
  fs.writeFileSync(path.join(dir, "editable.json"), stringify(template.editable) + "\n");
  fs.writeFileSync(path.join(dir, "config.json"), stringify(makeConfig(template)) + "\n");
  await makePreview(template, publicDir);
}

for (const template of templates) {
  await writeTemplate(template);
}

console.log(`Created ${templates.length} local house/construction templates.`);
