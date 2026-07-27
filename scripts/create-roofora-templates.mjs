import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.resolve(root, "../MY TEMPLATES/roofora-template");
const templateRoot = path.join(root, "src/templates");
const publicRoot = path.join(root, "public/templates");

const htmlPages = [
  "about.html",
  "services.html",
  "single-service.html",
  "pricing.html",
  "gallery.html",
  "testimonials.html",
  "team.html",
  "faq.html",
  "blog.html",
  "single-blog.html",
  "contact.html",
  "privacy-policy.html",
  "cookie-policy.html",
  "terms-of-use.html",
  "404.html",
];

const templates = [
  {
    slug: "northcrest-roofing",
    home: "index.html",
    name: "Northcrest Roofing",
    location: "London, United Kingdom",
    email: "hello@northcrestroofing.co.uk",
    phone: "+44 20 7946 0418",
    address: "18 Camden Road, London, NW1 9DP",
    logoFile: "northcrest-logo.svg",
    preview: "/templates/northcrest-roofing/assets/images/banner-bg-img.jpg",
    description: "Residential and commercial roofing specialists serving London and surrounding areas.",
    heroTitle: "Roofing Solutions for London Homes.",
    heroText: "Fast leak repairs, careful replacements, and clean handovers from a local insured team.",
    primaryCta: "Get a Quote",
    secondaryCta: "Call Now",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 248 64" role="img" aria-label="Northcrest Roofing"><path fill="#0F2F5F" d="M14 43 42 17l28 26h-12L42 29 26 43z"/><path fill="#F6B740" d="M42 17 78 43H66L42 26 18 43H6z"/><text x="90" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0F2F5F">NORTHCREST</text><text x="90" y="49" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#F6B740">ROOFING</text></svg>`,
  },
  {
    slug: "alder-slate-roofing",
    home: "index2.html",
    name: "Alder & Slate Roofing",
    location: "Manchester, United Kingdom",
    email: "enquiries@alderandslate.co.uk",
    phone: "+44 161 496 0286",
    address: "74 Deansgate, Manchester, M3 2FW",
    logoFile: "alder-slate-logo.svg",
    preview: "/templates/alder-slate-roofing/assets/images/home2-banner-bg-img.jpg",
    description: "Dependable repairs, slate roofing, maintenance and replacement roofing across Manchester.",
    heroTitle: "Manchester Roofing Maintenance, Done Properly.",
    heroText: "Slate repairs, inspections, and replacement roofing planned with clear estimates and tidy workmanship.",
    primaryCta: "Book Inspection",
    secondaryCta: "Send Plans",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 64" role="img" aria-label="Alder and Slate Roofing"><path fill="#112F4C" d="m16 43 28-26 28 26H60L44 29 28 43z"/><path fill="#7A8D96" d="M22 47h46v7H22zM36 36h16v7H36z"/><text x="88" y="29" font-family="Arial, sans-serif" font-size="17" font-weight="800" fill="#112F4C">ALDER & SLATE</text><text x="88" y="49" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#7A8D96">ROOFING</text></svg>`,
  },
  {
    slug: "crownline-roofworks",
    home: "index3.html",
    name: "Crownline Roofworks",
    location: "Birmingham, United Kingdom",
    email: "team@crownlineroofworks.co.uk",
    phone: "+44 121 496 0735",
    address: "31 Colmore Row, Birmingham, B3 2BS",
    logoFile: "crownline-logo.svg",
    preview: "/templates/crownline-roofworks/assets/images/banner3-img1.jpg",
    description: "Roof installation, emergency repairs, flat roofing and commercial roof maintenance.",
    heroTitle: "Commercial Roofworks for Birmingham.",
    heroText: "Emergency repairs, flat roofing, and planned maintenance for busy commercial properties.",
    primaryCta: "Request Survey",
    secondaryCta: "View Services",
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 64" role="img" aria-label="Crownline Roofworks"><path fill="#0E2A3B" d="M14 43h58v8H14zM19 39l14-18 10 12 12-16 13 22z"/><path fill="#D6A841" d="M30 19h28l-6 8-8-6-8 6z"/><text x="88" y="30" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#0E2A3B">CROWNLINE</text><text x="88" y="49" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#D6A841">ROOFWORKS</text></svg>`,
  },
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanHtml(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? html;
  return body
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sdata-wow-(duration|delay)="[^"]*"/g, "")
    .replace(/\saction="[^"]*"/g, ' action="#"')
    .replace(/<input([^>]*?)\svalue=""/g, "<input$1")
    .replace(/<\/?(?:html|head|body)[^>]*>/gi, "")
    .trim();
}

function brandHtml(html, template) {
  return html
    .replace(/Roofora@gmail\.com/gi, template.email)
    .replace(/mailto:Roofora@gmail\.com/gi, `mailto:${template.email}`)
    .replace(/\+5689 2589 6325/g, template.phone)
    .replace(/tel:\+568925896325/g, `tel:${template.phone.replace(/[^+0-9]/g, "")}`)
    .replace(/121 King\s*Street Melbourne, 3000,\s*<br>\s*Australia/g, template.address)
    .replace(/121 King\s*Street Melbourne, 3000,\s*<br \/>\s*Australia/g, template.address)
    .replace(/Roofora/g, template.name)
    .replace(/Buy Now for \$19/g, `Call ${template.phone}`)
    .replace(/https:\/\/designingmedia\.com\/checkout\/\?add-to-cart=37902/g, `tel:${template.phone.replace(/[^+0-9]/g, "")}`)
    .replace(/Dallas, TX Distribution Hub/g, template.location)
    .replace(/Dallas's/g, `${template.location.split(",")[0]}'s`)
    .replace(/BridgeRock/g, template.name)
    .replace(/PDF\/DWG\/ZIP up to 250MB\./g, "Photos, reports, or plans accepted.")
    .replace(/Contact Estimating/g, template.primaryCta);
}

function readPages(template) {
  const entries = [["home", template.home], ...htmlPages.map((file) => [file.replace(/\.html$/, ""), file])];
  return Object.fromEntries(entries.map(([key, file]) => {
    const html = fs.readFileSync(path.join(sourceRoot, file), "utf8");
    return [key, brandHtml(cleanHtml(html), template)];
  }));
}

function stringifyTs(value) {
  return JSON.stringify(value, null, 2);
}

function makeStyles(slug) {
  const cssFiles = [
    "assets/bootstrap/bootstrap.min.css",
    "assets/css/all.min-4a9b2f.css",
    "assets/css/owl.carousel.min.css",
    "assets/css/owl.theme.default.min.css",
    "assets/css/animate.css",
    "assets/css/magnific-popup-763ab6.css",
    "assets/css/style.css",
    "assets/css/responsive.css",
  ];
  let css = cssFiles.map((file) => fs.readFileSync(path.join(sourceRoot, file), "utf8")).join("\n\n");
  css = css
    .replace(/@import\s+url\([^)]*fonts\.googleapis[^;]+;/g, "")
    .replace(/@font-face\{font-family:"Font(?: Awesome[^"]*|Awesome)"[\s\S]*?\}/g, "")
    .replaceAll("https://html.designingmedia.com/roofora/assets/", `/templates/${slug}/assets/`)
    .replace(/\.\.\/images\//g, `/templates/${slug}/assets/images/`)
    .replace(/\.\.\/webfonts\//g, `/templates/${slug}/assets/webfonts/`)
    .replace(/@font-face\{font-family:"Font(?: Awesome[^"]*|Awesome)"[\s\S]*?\}/g, "");
  return `${css.replace(/Project:\s*Roofora/g, "Project: Roofing service template")}\n.roofora-template-root{overflow-x:hidden;width:100%;max-width:100%;font-family:Arial,Helvetica,sans-serif;}.roofora-template-root .oswald-font,.roofora-template-root h1,.roofora-template-root h2,.roofora-template-root h3{font-family:Arial,Helvetica,sans-serif;}.roofora-template-root .loader-mask{display:none!important}.roofora-template-root img[src$="logo.png"],.roofora-template-root img[src$="footer-logo.png"]{height:auto;max-width:248px}.roofora-template-root .collapse:not(.show){display:none}.roofora-template-root .collapse.show{display:block}.roofora-template-root .dropdown-menu.show{display:block}.roofora-template-root a{cursor:pointer}.roofora-template-root .wow{opacity:1}@media (prefers-reduced-motion:no-preference){.roofora-template-root .roofora-reveal{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)}.roofora-template-root .roofora-reveal.is-visible{opacity:1;transform:translateY(0)}.roofora-template-root .case-study-img-con img,.roofora-template-root .portfolio-box img,.roofora-template-root .service-box img{transition:transform .7s ease,filter .7s ease}.roofora-template-root .case-study-img-con:hover img,.roofora-template-root .portfolio-box:hover img,.roofora-template-root .service-box:hover img{transform:scale(1.05);filter:contrast(1.08)}}`;
}

function makeEditable(template) {
  const cleanPhone = template.phone.replace(/[^+0-9]/g, "");
  return {
    brand: {
      name: template.name,
      location: template.location,
      email: template.email,
      phone: template.phone,
      address: template.address,
      description: template.description,
      logo: `/templates/${template.slug}/assets/images/${template.logoFile}`,
    },
    navigation: {
      links: [
        { label: "Home", page: "home", href: "#/home" },
        { label: "About", page: "about", href: "#/about" },
        { label: "Services", page: "services", href: "#/services" },
        { label: "Pricing", page: "pricing", href: "#/pricing" },
        { label: "Gallery", page: "gallery", href: "#/gallery" },
        { label: "Contact", page: "contact", href: "#/contact" },
      ],
      ctaLabel: template.primaryCta,
      ctaHref: "#/contact",
      phoneLabel: template.phone,
      phoneHref: `tel:${cleanPhone}`,
    },
    hero: {
      title: template.heroTitle,
      text: template.heroText,
      primaryCta: template.primaryCta,
      primaryHref: "#/contact",
      secondaryCta: template.secondaryCta,
      secondaryHref: `tel:${cleanPhone}`,
    },
    pages: {
      about: {
        title: `Meet ${template.name}`,
        text: "A practical, insured roofing team focused on clean surveys, careful repairs, and tidy handovers.",
      },
      services: {
        title: "Roofing Services",
        text: "Leak repairs, roof replacements, guttering, slate work, flat roofs, and planned commercial maintenance.",
      },
      "single-service": {
        title: "Detailed Service Plans",
        text: "Show the scope, timings, warranty notes, and booking links for the service your customer is viewing.",
      },
      pricing: {
        title: "Clear Roofing Pricing",
        text: "Publish inspection fees, project ranges, and emergency call-out options customers can understand quickly.",
      },
      gallery: {
        title: "Recent Roof Work",
        text: "A visual record of repairs, replacements, commercial maintenance, and finished roof details.",
      },
      testimonials: {
        title: "Customer Proof",
        text: "Short reviews, ratings, and project outcomes from homeowners and property managers.",
      },
      team: {
        title: "The Roofing Team",
        text: "Introduce surveyors, installers, and support staff with roles customers can trust.",
      },
      faq: {
        title: "Roofing Questions",
        text: "Answer inspection timing, warranty, emergency support, materials, and quote questions.",
      },
      blog: {
        title: "Roof Care Notes",
        text: "Helpful seasonal guidance for spotting leaks, choosing materials, and planning maintenance.",
      },
      "single-blog": {
        title: "Roofing Article",
        text: "Use this page for a detailed guide, project story, or customer education piece.",
      },
      contact: {
        title: "Book a Roofing Survey",
        text: "Make it easy for visitors to call, email, or send project details from any device.",
      },
      "privacy-policy": {
        title: "Privacy Policy",
        text: "Explain how enquiries, contact details, and project information are handled.",
      },
      "cookie-policy": {
        title: "Cookie Policy",
        text: "Describe essential cookies, analytics choices, and visitor preferences.",
      },
      "terms-of-use": {
        title: "Terms of Use",
        text: "Set expectations for estimates, website information, and service enquiries.",
      },
      "404": {
        title: "Page Not Found",
        text: "Guide visitors back to services, pricing, or contact without losing momentum.",
      },
    },
    colors: {
      primary: "#0f2f5f",
      background: "#ffffff",
      text: "#111827",
    },
  };
}

function makeConfig(template) {
  return {
    id: template.slug,
    name: template.name,
    description: `${template.description} Converted from the Roofora ${template.home} design.`,
    category: "Services",
    image: `/templates/${template.slug}/preview-collage.webp`,
    previewImages: [
      `/templates/${template.slug}/preview-collage.webp`,
      `/templates/${template.slug}/assets/images/about-img.jpg`,
      `/templates/${template.slug}/assets/images/services-img1.jpg`,
    ],
    features: [
      "Independent Roofora-derived homepage",
      "UK roofing business details",
      "Editable brand, hero and contact content",
      "Internal pages included",
      "Local assets and custom SVG logo",
    ],
  };
}

function imagePathFromPublicUrl(url) {
  return path.join(root, "public", url.replace(/^\//, ""));
}

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function svgText(text, x, y, size, color, weight = 700) {
  return `<text x="${x}" y="${y}" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(text)}</text>`;
}

async function makePreviewCollage(template, publicDir) {
  const pageImages = [
    { label: "Home", image: imagePathFromPublicUrl(template.preview) },
    { label: "About", image: path.join(publicDir, "assets/images/about-img.jpg") },
    { label: "Services", image: path.join(publicDir, "assets/images/services-img1.jpg") },
  ];
  const columns = [];
  for (const [index, item] of pageImages.entries()) {
    const image = fs.existsSync(item.image) ? item.image : pageImages[0].image;
    const title = index === 0 ? template.heroTitle : index === 1 ? `Meet ${template.name}` : "Roofing Services";
    const previewTitle = title.length > 24 ? `${title.slice(0, 24)}...` : title;
    const card = await sharp({
      create: {
        width: 420,
        height: 680,
        channels: 4,
        background: "#f7f3ec",
      },
    })
      .composite([
        {
          input: await sharp(image).resize(420, 470, { fit: "cover", position: "top" }).toBuffer(),
          top: 0,
          left: 0,
        },
        {
          input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="680">
            <rect x="0" y="0" width="420" height="680" rx="26" fill="none" stroke="rgba(22,24,30,.18)" stroke-width="2"/>
            <rect x="0" y="400" width="420" height="280" fill="#ffffff"/>
            <rect x="32" y="438" width="84" height="20" rx="10" fill="#f0b73c"/>
            ${svgText(item.label, 32, 510, 42, "#10131a", 800)}
            ${svgText(previewTitle, 32, 565, 20, "#343946", 700)}
            ${svgText(index === 0 ? template.primaryCta : index === 1 ? "Our Standard" : "What We Do", 32, 620, 18, "#7a5a10", 800)}
          </svg>`),
          top: 0,
          left: 0,
        },
      ])
      .png()
      .toBuffer();
    columns.push({ input: card, left: 48 + index * 450, top: 150 });
  }
  const background = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900">
    <rect width="1400" height="900" fill="#111827"/>
    <rect x="0" y="0" width="1400" height="900" fill="#f7f3ec"/>
    <circle cx="1210" cy="90" r="180" fill="#f0b73c" opacity=".16"/>
    ${svgText(template.name, 48, 86, 46, "#10131a", 800)}
    ${svgText("Home  /  About  /  Services", 48, 122, 22, "#5b6270", 700)}
  </svg>`);
  await sharp(background)
    .composite(columns)
    .webp({ quality: 88 })
    .toFile(path.join(publicDir, "preview-collage.webp"));
}

function makeTemplateTs(template) {
  return `"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import { pages } from "./pages";
import "./styles.css";

type RoofingEditable = typeof editableData;

const pageAliases: Record<string, string> = {
  "index": "home",
  "index2": "home",
  "index3": "home",
  "load-more": "blog",
  "one-column": "blog",
  "two-column": "blog",
  "three-column": "blog",
  "three-column-sidebar": "blog",
  "four-column": "blog",
  "six-column-full-width": "blog",
  "shop": "services",
  "single-product": "single-service",
  "cart": "contact",
  "checkout": "contact",
  "login": "contact",
  "join-now": "contact",
  "coming-soon": "contact",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^+0-9]/g, "");
}

function renderPage(raw: string, data: RoofingEditable, page: string): string {
  const brand = data.brand;
  const hero = data.hero;
  const navigation = data.navigation;
  const logo = brand.logo;
  const assetRoot = "/templates/${template.slug}/assets/";
  const pageCopy = (data.pages as Record<string, { title?: string; text?: string }>)[page];
  let html = raw
    .replaceAll("https://html.designingmedia.com/roofora/assets/", assetRoot)
    .replaceAll("assets/", assetRoot)
    .replaceAll(assetRoot + "images/logo.png", logo)
    .replaceAll(assetRoot + "images/logo2x.png", logo)
    .replaceAll(assetRoot + "images/footer-logo.png", logo)
    .replaceAll(assetRoot + "images/about-logo.png", logo)
    .replaceAll(assetRoot + "images/about-logo2.png", logo)
    .replace(/Roofora@gmail\\.com/gi, escapeHtml(brand.email))
    .replace(/mailto:Roofora@gmail\\.com/gi, "mailto:" + escapeHtml(brand.email))
    .replace(/\\+5689 2589 6325/g, escapeHtml(brand.phone))
    .replace(/tel:\\+568925896325/g, telHref(brand.phone))
    .replace(/121 King\\s*Street Melbourne, 3000,\\s*<br>\\s*Australia/g, escapeHtml(brand.address))
    .replace(/121 King\\s*Street Melbourne, 3000,\\s*<br \\/>\\s*Australia/g, escapeHtml(brand.address))
    .replace(/Roofora/g, escapeHtml(brand.name))
    .replace(/Buy Now for \\$19/g, "Call " + escapeHtml(brand.phone))
    .replace(/https:\\/\\/designingmedia\\.com\\/checkout\\/\\?add-to-cart=37902/g, telHref(brand.phone))
    .replace(/Dallas, TX Distribution Hub/g, escapeHtml(brand.location))
    .replace(/Dallas's/g, escapeHtml(brand.location.split(",")[0] + "'s"))
    .replace(/BridgeRock/g, escapeHtml(brand.name))
    .replace(/PDF\\/DWG\\/ZIP up to 250MB\\./g, "Photos, reports, or plans accepted.")
    .replace(/Contact Estimating/g, escapeHtml(hero.primaryCta));

  if (page === "home") {
    html = html.replace(/<h1([^>]*)>[\\s\\S]*?<\\/h1>/i, (_match, attrs) => {
      return \`<h1\${attrs}>\${escapeHtml(hero.title).replaceAll("\\n", "<br>")}</h1>\`;
    });
    html = html.replace(/<h1[^>]*>[\\s\\S]*?<\\/h1>\\s*<p([^>]*)>[\\s\\S]*?<\\/p>/i, (match, attrs) => {
      const heading = match.match(/<h1[^>]*>[\\s\\S]*?<\\/h1>/i)?.[0] ?? "";
      return \`\${heading}<p\${attrs}>\${escapeHtml(hero.text)}</p>\`;
    });
    html = html.replace(/Get a Quote|Book Inspection|Shop Inventory/g, escapeHtml(hero.primaryCta));
    html = html.replace(/Call Me Now|Contact Estimating|View Brands/g, escapeHtml(hero.secondaryCta));
  } else if (pageCopy) {
    if (pageCopy.title) {
      html = html.replace(/<h1([^>]*)>[\\s\\S]*?<\\/h1>/i, (_match, attrs) => {
        return \`<h1\${attrs}>\${escapeHtml(pageCopy.title ?? "").replaceAll("\\n", "<br>")}</h1>\`;
      });
    }
    if (pageCopy.text) {
      html = html.replace(/<h1[^>]*>[\\s\\S]*?<\\/h1>\\s*<p([^>]*)>[\\s\\S]*?<\\/p>/i, (match, attrs) => {
        const heading = match.match(/<h1[^>]*>[\\s\\S]*?<\\/h1>/i)?.[0] ?? "";
        return \`\${heading}<p\${attrs}>\${escapeHtml(pageCopy.text ?? "")}</p>\`;
      });
    }
  }

  html = html.replace(/href="([^"]+\\.html)(#[^"]*)?"/g, (_match, href, hash = "") => {
    const key = href.replace(/\\.html$/, "");
    return \`href="#/\${pageAliases[key] ?? key}\${hash}"\`;
  });
  html = html.replace(/href="index[23]?\\.html#([^"]*)"/g, 'href="#$1"');
  html = html.replace(/(<a\\b(?=[^>]*class="[^"]*contact-btn[^"]*")[^>]*href=")[^"]*("[^>]*>)([\\s\\S]*?)(<\\/a>)/gi, (_match, start, mid, _label, end) => {
    return \`\${start}\${escapeHtml(navigation.ctaHref)}\${mid}\${escapeHtml(navigation.ctaLabel)}\${end}\`;
  });
  html = html.replace(/(<a\\b(?=[^>]*class="[^"]*secondary_btn[^"]*")[^>]*href=")[^"]*("[^>]*>)([\\s\\S]*?)(<\\/a>)/i, (_match, start, mid, _label, end) => {
    return \`\${start}\${escapeHtml(hero.primaryHref)}\${mid}\${escapeHtml(hero.primaryCta)}\${end}\`;
  });
  html = html.replace(/(<a\\b(?=[^>]*class="[^"]*elementary_btn[^"]*")[^>]*href=")[^"]*("[^>]*>)([\\s\\S]*?)(<\\/a>)/i, (_match, start, mid, _label, end) => {
    return \`\${start}\${escapeHtml(hero.secondaryHref)}\${mid}\${escapeHtml(hero.secondaryCta)}\${end}\`;
  });
  html = html.replace(/href="tel:[^"]*"([^>]*>)(\\+?[0-9][^<]+)(<\\/a>)/gi, (_match, mid, _label, end) => {
    return \`href="\${escapeHtml(navigation.phoneHref)}"\${mid}\${escapeHtml(navigation.phoneLabel)}\${end}\`;
  });
  for (const link of navigation.links) {
    html = html.replace(new RegExp(\`href="#/\${link.page}"([^>]*)>[^<]+<\\\\/a>\`, "g"), \`href="\${escapeHtml(link.href)}"$1>\${escapeHtml(link.label)}</a>\`);
  }
  return html;
}

export default function RoofingServiceTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as RoofingEditable;
  const [page, setPage] = useState("home");
  const html = useMemo(() => renderPage(pages[page] ?? pages.home, content, page), [content, page]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector(".roofora-template-root");
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".wow, .case-study-img-con, .portfolio-box, .service-box, .main-service-box").forEach((element) => {
        element.classList.add("roofora-reveal");
        ScrollTrigger.create({
          trigger: element,
          start: "top 88%",
          once: true,
          onEnter: () => element.classList.add("is-visible"),
        });
      });
    }, root);
    return () => ctx.revert();
  }, [html]);

  useEffect(() => {
    const root = document.querySelector(".roofora-template-root");
    if (!root) return;

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a") as HTMLAnchorElement | null;
      const toggler = target.closest(".navbar-toggler") as HTMLButtonElement | null;
      const dropdown = target.closest(".dropdown-toggle") as HTMLAnchorElement | null;
      const close = target.closest("#search .close");

      if (toggler) {
        event.preventDefault();
        root.querySelector("#navbarSupportedContent")?.classList.toggle("show");
        toggler.classList.toggle("collapsed");
        return;
      }

      if (dropdown) {
        event.preventDefault();
        dropdown.parentElement?.querySelector(".dropdown-menu")?.classList.toggle("show");
        return;
      }

      if (close) {
        event.preventDefault();
        root.querySelector("#search")?.classList.remove("open");
        return;
      }

      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.includes("#search")) {
        event.preventDefault();
        root.querySelector("#search")?.classList.add("open");
        return;
      }
      if (href.startsWith("#/")) {
        event.preventDefault();
        const next = href.slice(2).split("#")[0] || "home";
        setPage(pageAliases[next] ?? next);
        root.scrollIntoView({ block: "start" });
      }
    };

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, []);

  return (
    <main
      className="roofora-template-root"
      style={{
        "--template-primary": content.colors.primary,
        "--template-background": content.colors.background,
        "--template-text": content.colors.text,
      } as CSSProperties}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
`;
}

async function writeTemplate(template) {
  const dir = path.join(templateRoot, template.slug);
  const publicDir = path.join(publicRoot, template.slug);
  ensureDir(dir);
  ensureDir(publicDir);
  fs.cpSync(path.join(sourceRoot, "assets"), path.join(dir, "assets"), { recursive: true });
  fs.cpSync(path.join(sourceRoot, "assets"), path.join(publicDir, "assets"), { recursive: true });
  fs.rmSync(path.join(dir, "assets/js"), { recursive: true, force: true });
  for (const base of [dir, publicDir]) {
    for (const file of ["logo.png", "logo2x.png", "footer-logo.png", "about-logo.png", "about-logo2.png"]) {
      fs.rmSync(path.join(base, "assets/images", file), { force: true });
    }
    for (const cssFile of ["assets/css/style.css", "assets/css/blog.css", "assets/css/owl.carousel.min.css"]) {
      const cssPath = path.join(base, cssFile);
      if (fs.existsSync(cssPath)) {
        const css = fs.readFileSync(cssPath, "utf8")
          .replaceAll("https://html.designingmedia.com/roofora/assets/", `/templates/${template.slug}/assets/`)
          .replace(/Project:\s*Roofora/g, "Project: Roofing service template");
        fs.writeFileSync(cssPath, css);
      }
    }
  }
  fs.writeFileSync(path.join(dir, "assets/images", template.logoFile), template.logo);
  fs.writeFileSync(path.join(publicDir, "assets/images", template.logoFile), template.logo);
  fs.writeFileSync(path.join(dir, "styles.css"), makeStyles(template.slug));
  fs.writeFileSync(path.join(dir, "editable.json"), JSON.stringify(makeEditable(template), null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "config.json"), JSON.stringify(makeConfig(template), null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "pages.ts"), `export const pages: Record<string, string> = ${stringifyTs(readPages(template))};\n`);
  fs.writeFileSync(path.join(dir, "template.tsx"), makeTemplateTs(template));
  await makePreviewCollage(template, publicDir);
}

for (const template of templates) {
  await writeTemplate(template);
}

console.log(`Created ${templates.length} Roofora-derived templates.`);
