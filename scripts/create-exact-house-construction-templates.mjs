import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const srcRoot = path.join(root, "src/templates");
const publicRoot = path.join(root, "public/templates");
const houseRoot = path.resolve(root, "../MY TEMPLATES/HOUSE DESIGN template");
const constructionRoot = path.resolve(root, "../MY TEMPLATES/CONSTRUCTION COMPANY template");

const templates = [
  {
    slug: "lumen-house-design",
    name: "Lumen House Design",
    category: "Architecture",
    sourceRoot: houseRoot,
    assetRoot: path.join(houseRoot, "assets"),
    logoPath: "assets/images/logos/lumen-house-logo.svg",
    pages: {
      home: "index-2-light.html",
      about: "about-light.html",
      projects: "projects-01-light.html",
      "project-details": "project-details-light.html",
      blog: "blog-light.html",
      contact: "contact-light.html",
      "404": "404-light.html",
    },
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268 64" role="img" aria-label="Lumen House Design"><path fill="#111827" d="M14 47h38V17h8v38H14z"/><path fill="#C69C6D" d="M70 16h16v40H70zM92 16h8v40h-8z"/><text x="116" y="31" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#111827">LUMEN HOUSE</text><text x="116" y="50" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#A87945">DESIGN</text></svg>`,
    previewImages: [
      "assets/images/background/hero-bg.jpg",
      "assets/images/about/about-right.jpg",
      "assets/images/projects-01/1.jpg",
    ],
    editable: {
      brand: {
        name: "Lumen House Design",
        email: "studio@lumenhouse.design",
        phone: "+44 20 7193 4820",
        address: "24 Charlotte Road, London, EC2A 3PB",
        logo: "/templates/lumen-house-design/assets/images/logos/lumen-house-logo.svg",
      },
      navigation: {
        ctaLabel: "Book a Studio Call",
        ctaHref: "#/contact",
        phoneLabel: "+44 20 7193 4820",
        phoneHref: "tel:+442071934820",
      },
      hero: {
        title: "Modern House Design For Considered Living",
        text: "Interior architecture, room planning, and detail-led design for homes that need clarity before the build begins.",
        primaryCta: "Start a Brief",
        primaryHref: "#/contact",
      },
      pages: {
        about: { title: "ABOUT LUMEN", text: "A calm residential design studio shaping interiors, architectural details, and finish palettes for buildable homes." },
        projects: { title: "SELECTED HOMES", text: "Light-filled interiors, quiet materials, and practical room plans for modern homeowners." },
        contact: { title: "CONTACT THE STUDIO", text: "Send the site, scope, timeline, and any references. We will reply with next steps." },
      },
      colors: { primary: "#a87945", background: "#f7f3ec", text: "#111827" },
    },
  },
  {
    slug: "noir-house-design",
    name: "Noir House Atelier",
    category: "Architecture",
    sourceRoot: houseRoot,
    assetRoot: path.join(houseRoot, "assets"),
    logoPath: "assets/images/logos/noir-house-logo.svg",
    pages: {
      home: "index-2.html",
      about: "about.html",
      projects: "projects-01.html",
      "project-details": "project-details.html",
      blog: "blog.html",
      contact: "contact.html",
      "404": "404.html",
    },
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 272 64" role="img" aria-label="Noir House Atelier"><path fill="#F4EFE5" d="M14 16h10l36 30V16h9v41h-9L23 28v29h-9z"/><path fill="#B78A55" d="M82 16h8v41h-8z"/><text x="108" y="31" font-family="Arial, sans-serif" font-size="18" font-weight="800" fill="#F4EFE5">NOIR HOUSE</text><text x="108" y="50" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#B78A55">ATELIER</text></svg>`,
    previewImages: [
      "assets/images/background/hero-bg-5.jpg",
      "assets/images/project-details/detail-1.jpg",
      "assets/images/projects-05/1.jpg",
    ],
    editable: {
      brand: {
        name: "Noir House Atelier",
        email: "hello@noirhouseatelier.com",
        phone: "+44 161 496 3104",
        address: "9 King Street, Manchester, M2 6AW",
        logo: "/templates/noir-house-design/assets/images/logos/noir-house-logo.svg",
      },
      navigation: {
        ctaLabel: "Reserve Consultation",
        ctaHref: "#/contact",
        phoneLabel: "+44 161 496 3104",
        phoneHref: "tel:+441614963104",
      },
      hero: {
        title: "Dark Interior Design With Architectural Depth",
        text: "Moody residential interiors, bespoke details, and finish direction for clients who want atmosphere without excess.",
        primaryCta: "Plan the Room",
        primaryHref: "#/contact",
      },
      pages: {
        about: { title: "ABOUT NOIR", text: "A darker, sharper design studio built around contrast, proportion, lighting, and material restraint." },
        projects: { title: "SIGNATURE SPACES", text: "A gallery of high-contrast interiors, joinery concepts, and atmospheric living spaces." },
        contact: { title: "START THE ROOM", text: "Share the property, room goals, budget range, and timeline. We will shape the next step." },
      },
      colors: { primary: "#b78a55", background: "#111111", text: "#f4efe5" },
    },
  },
  {
    slug: "forgepoint-construction",
    name: "SMMTC Construction",
    category: "Construction",
    sourceRoot: constructionRoot,
    assetRoot: path.join(constructionRoot, "assets"),
    logoPath: "assets/images/smmtc-construction-logo.svg",
    pages: {
      home: "index.html",
      services: "services.html",
      projects: "projects.html",
      about: "about-us.html",
      careers: "careers.html",
      contact: "contact.html",
      privacy: "privacy-policy.html",
      terms: "terms-conditions.html",
    },
    logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 318 64" role="img" aria-label="SMMTC Construction"><path fill="#18212F" d="M14 49 44 15l30 34H62L44 29 26 49z"/><path fill="#E0A325" d="M20 51h50v7H20zM37 35h14v16H37z"/><text x="91" y="30" font-family="Arial, sans-serif" font-size="19" font-weight="900" fill="#18212F">SMMTC</text><text x="91" y="50" font-family="Arial, sans-serif" font-size="13" font-weight="800" fill="#E0A325">CONSTRUCTION</text></svg>`,
    previewImages: [
      "assets/images/c837a6_0028340354594c0b95b8b6c7acfeaa26~mv2-202462.jpeg",
      "assets/images/c837a6_44f2f29e9f7143d9af6a5f7c4152c909~mv2-ce3047.jpeg",
      "assets/images/c837a6_10f91af75c3544eeadfa2a42635d2c0e~mv2-de770b.jpg",
    ],
    editable: {
      brand: {
        name: "SMMTC Construction",
        email: "projects@smmtcconstruction.co.uk",
        phone: "+44 20 8050 6724",
        address: "86 Great Portland Street, London, W1W 7LT",
        logo: "/templates/forgepoint-construction/assets/images/smmtc-construction-logo.svg",
      },
      navigation: {
        ctaLabel: "Call Now!",
        ctaHref: "tel:+442080506724",
        phoneLabel: "+44 20 8050 6724",
        phoneHref: "tel:+442080506724",
      },
      hero: {
        title: "UK Construction Delivered With Site Discipline",
        text: "Commercial refurbishment, residential build management, and reliable project delivery across London and the wider UK.",
        primaryCta: "Request Estimate",
        primaryHref: "#/contact",
      },
      pages: {
        about: { title: "ABOUT", text: "A UK construction team built around planning, procurement, site delivery, and accountable client updates." },
        services: { title: "BUILD SERVICES", text: "Commercial fit-out, residential renovation, structural works, and site management support for clients across the UK." },
        projects: { title: "RECENT BUILDS", text: "A record of active sites, finished handovers, and practical construction outcomes across London and the wider UK." },
        contact: { title: "START A UK PROJECT", text: "Send drawings, photos, or a site address and the SMMTC team will respond with a clear next step." },
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

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readDocument(file) {
  return fs.readFileSync(file, "utf8")
    .replace(/<link[^>]+fonts\.googleapis[^>]*>/gi, "")
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<link[^>]+rel=["'](?:preconnect|dns-prefetch)["'][^>]*>/gi, "")
    .replace(/<div class="preloader">[\s\S]*?<\/div><\/div>/gi, "")
    .replace(/<div class="preloader"[\s\S]*?<\/div>/gi, "")
    .replace(/\/\*# sourceMappingURL=https?:\/\/[^*]+\*\//g, "")
    .replace(/src="assets\/images\/favicon[^"]*"/g, 'src=""');
}

function localizeWowImages(html, slug) {
  return html.replace(/<wow-image\b([^>]*)data-image-info="([^"]+)"([^>]*)>([\s\S]*?)<\/wow-image>/gi, (match, before, encoded, after, inner) => {
    const uri = encoded.match(/&quot;uri&quot;:&quot;(?:assets\/images\/)?([^&]+)&quot;/)?.[1];
    if (!uri) return match;
    const src = `/templates/${slug}/assets/images/${uri}`;
    const nextInner = /<img\b/i.test(inner)
      ? inner.replace(/<img\b([^>]*?)(?:\s+src=["'][^"']*["'])?([^>]*)>/i, (_img, attrsBefore, attrsAfter) => `<img${attrsBefore} src="${src}"${attrsAfter}>`)
      : `<img src="${src}" alt="">`;
    return `<wow-image${before}data-image-info="${encoded}"${after}>${nextInner}</wow-image>`;
  });
}

function localizeWowVideos(html, slug) {
  return html.replace(/<wow-video\b([^>]*)data-video-info="([^"]+)"([^>]*)>[\s\S]*?<\/wow-video>/gi, (match, before, encoded, after) => {
    const poster = encoded.match(/&quot;poster&quot;:\{[\s\S]*?&quot;uri&quot;:&quot;(?:assets\/images\/)?([^&]+)&quot;/)?.[1];
    if (!poster) return match;
    return `<wow-video${before}data-video-info="${encoded}"${after}><img src="/templates/${slug}/assets/images/${poster}" alt="" style="width:100%;height:100%;object-fit:cover;display:block;"></wow-video>`;
  });
}

function localizeBareMediaReferences(html) {
  return html.replace(/(?<!assets\/images\/)((?:c837a6|84770f)[A-Za-z0-9_~.-]+\.(?:jpe?g|png|webp|ico))/gi, "assets/images/$1");
}

const sourcePageAliases = {
  "mcr-construct": "home",
  "intro": "home",
  "index": "home",
  "index-2": "home",
  "index-light": "home",
  "index-2-light": "home",
  "about": "about",
  "about-light": "about",
  "about-us": "about",
  "projects": "projects",
  "projects-01": "projects",
  "projects-01-light": "projects",
  "projects-02": "projects",
  "projects-02-light": "projects",
  "projects-03": "projects",
  "projects-03-light": "projects",
  "projects-04": "projects",
  "projects-04-light": "projects",
  "projects-05": "projects",
  "projects-05-light": "projects",
  "project-details": "project-details",
  "project-details-light": "project-details",
  "project-details-02": "project-details",
  "project-details-02-light": "project-details",
  "blog": "blog",
  "blog-light": "blog",
  "blog-details": "blog",
  "blog-details-light": "blog",
  "services": "services",
  "careers": "careers",
  "contact": "contact",
  "contact-light": "contact",
  "privacy-policy": "privacy",
  "accessibility-statement": "privacy",
  "terms-conditions": "terms",
  "404": "home",
  "404-light": "home",
};

function rewriteInternalPageLinks(html) {
  return html.replace(/href=["']([^"']+\.html(?:#[^"']*)?)["']/gi, (match, href) => {
    const clean = href.split("#")[0].split("?")[0].split("/").pop()?.replace(/\.html$/, "") ?? "";
    const page = sourcePageAliases[clean];
    return page ? `data-template-page="${page}" role="link" tabindex="0"` : match;
  });
}

function brandDocument(html, template) {
  const data = template.editable;
  const supportStyles = `<style id="fekitech-exact-fallbacks">.preloader,.custom-loader{display:none!important;opacity:0!important;visibility:hidden!important;}body{opacity:1!important;}a[data-template-page]{cursor:pointer;}wow-image,wow-video{display:block!important;position:relative;width:100%;height:100%;overflow:hidden;opacity:1!important;visibility:visible!important;}wow-image picture,wow-image img,wow-video img{display:block!important;width:100%!important;height:100%!important;object-fit:cover;opacity:1!important;visibility:visible!important;}wow-image[data-image-info*="&quot;displayMode&quot;:&quot;fit&quot;"] img{object-fit:contain!important;}.Qh0lWW img,.sFiSiq img,._image_8j9vj_1 img,._wowImage_xuz0s_30 img,.wixui-image img,[data-testid="linkElement"] wow-image img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important;visibility:visible!important;}.wixui-horizontal-menu__item-label{white-space:nowrap!important;overflow:visible!important;text-overflow:clip!important;}</style>`;
  let next = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(template.name)}</title>`)
    .replace(/Indochine/g, escapeHtml(data.brand.name))
    .replace(/MCR Construction/gi, escapeHtml(data.brand.name))
    .replace(/MRC Construction/gi, escapeHtml(data.brand.name))
    .replace(/MCR Construct/gi, escapeHtml(data.brand.name))
    .replace(/MRC Construct/gi, escapeHtml(data.brand.name))
    .replace(/mcr-construct/gi, "smmtc-construction")
    .replace(/Call Now!/g, escapeHtml(data.navigation.ctaLabel))
    .replace(/0123456789/g, escapeHtml(data.brand.phone))
    .replace(/123-456-7890/g, escapeHtml(data.brand.phone))
    .replace(/\+1\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g, escapeHtml(data.brand.phone))
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, escapeHtml(data.brand.email))
    .replace(/Masterson & Richards Construction Associates\s*&nbsp;/g, escapeHtml(data.brand.name))
    .replace(/Masterson & Richards Construction Associates/g, escapeHtml(data.brand.name))
    .replace(/Masterson &amp; Richards Construction Associates\s*(?:&nbsp;| )?/g, escapeHtml(data.brand.name))
    .replace(/Aaron Masterson/g, "Samuel Martins")
    .replace(/500 Terry Francine Street<br\/>\nSan Francisco, CA 94158/g, escapeHtml(data.brand.address))
    .replace(/500 Terry Francine Street<br>\nSan Francisco, CA 94158/g, escapeHtml(data.brand.address))
    .replace(/500 Terry Francine Street\s*San Francisco, CA 94158/g, escapeHtml(data.brand.address))
    .replace(/This is a space to share more about your business\. Explain who(?:'|&#x27;)s behind it, what it does and what makes it unique\./g, `${escapeHtml(data.brand.name)} is a UK-based construction partner delivering planned, accountable work for residential and commercial clients.`)
    .replace(/Lorem Ipsumis simply dummy text of the printing and typesetting industry\. Lorem Ipsum has been the industry's standard dummy text\./g, "Tailored concepts, finish schedules, and build-ready room details shaped around how each home is lived in.")
    .replace(/Lorem Ipsum is simply dummy text of the printing and typesetting industry\. Lorem Ipsum has been the industry's standard dummy text\./g, "Every plan is prepared with proportion, lighting, storage, and construction clarity in mind.")
    .replace(/Lorem Ipsum is simply dummy text of the printing industry\. It was recently with desktop publishing software/g, "A good room brief starts with proportion, daylight, storage, and the way people actually move through the home.")
    .replace(/Lorem Ipsum is simply dummy text of the printing industry\. It was more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\./g, "Our studio turns early ideas into measured layouts, material palettes, and clear specifications that builders can price with confidence.")
    .replace(/Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,[^<]+/g, "We keep the process calm and practical, from first consultation to final handover.")
    .replace(/This is the space to describe the service\. Focus the description on how your customers or clients can benefit from using this service: explain how it solves a problem, or makes life easier or more enjoyable\./g, "We coordinate planning, procurement, site teams, and quality checks so every build moves with fewer surprises.")
    .replace(/This is the space to describe the service and explain how your customers or clients can benefit from it\. It’s an opportunity to add a short description that includes relevant details, like pricing, duration, location and how to book the service\./g, "From fit-out to structural work, our service pages explain the scope, likely timeline, and next step clearly so clients can move from idea to site with confidence.")
    .replace(/Be sure to include all the relevant details users will want to know,[\s\S]*?let them know here\./g, "Clients get clear estimates, practical timelines, and regular site updates from the first survey through handover.");
  next = next
    .replace(/(<(?:p|h6)\b[^>]*>)[^<]*Lorem Ipsum[^<]*(<\/(?:p|h6)>)/gi, (_match, open, close) => `${open}Our studio turns ideas into measured layouts, material palettes, and build-ready details that clients and contractors can trust.${close}`)
    .replace(/(<li\b[^>]*>(?:<i\b[^>]*><\/i>\s*)?)[^<]*Lorem Ipsum[^<]*(<\/li>)/gi, (_match, open, close) => `${open}Build-ready room concepts with practical finish guidance.${close}`)
    .replace(/(<p\b[^>]*>)This is the space[^<]*(<\/p>)/gi, (_match, open, close) => `${open}${escapeHtml(data.brand.name)} plans, coordinates, and delivers construction work with clear scopes, dependable timelines, and accountable site communication.${close}`);

  for (const [page, copy] of Object.entries(data.pages)) {
    if (copy.title) {
      const pageLabel = page === "about" ? />ABOUT (?:US|LUMEN|NOIR|FORGEPOINT|SMMTC)<?/i : page === "projects" ? />(?:PROJECTS|SELECTED HOMES|SIGNATURE SPACES|RECENT (?:BUILDS|UK BUILDS))<?/i : page === "services" ? />(?:SERVICES|BUILD SERVICES|UK BUILD SERVICES)<?/i : page === "contact" ? />(?:CONTACT|CONTACT US|CONTACT THE STUDIO|START A PROJECT|START A UK PROJECT)<?/i : null;
      if (pageLabel) next = next.replace(pageLabel, `>${escapeHtml(copy.title)}<`);
    }
  }
  next = next
    .replace(/(src|href)=["']((?:c837a6|84770f)[^"']+\.(?:jpe?g|png|webp|ico))["']/gi, (_match, attr, file) => `${attr}="assets/images/${file}"`)
    .replace(/url\(["']?((?:c837a6|84770f)[^"')]+\.(?:jpe?g|png|webp|ico))["']?\)/gi, (_match, file) => `url(assets/images/${file})`)
    .replace(/src="assets\/images\/logos\/logo(?:-white)?\.png"/g, `src="${data.brand.logo}"`)
    .replace(/src="assets\/images\/c837a6_88ffe77603984ac8b9e4573ea2dcd293~mv2-ad2f0f\.png"/g, `src="${data.brand.logo}"`)
    .replace(/src="assets\/images\/c837a6_48c9b7a48faf42df940adaa561dcf8cc~mv2-2444e6\.png"/g, `src="${data.brand.logo}"`)
    .replace(/href="https:\/\/support\.wix\.com\/en\/article\/wix-harmony-editor-adding-a-link-to-an-element"/g, `href="${data.navigation.ctaHref}"`)
    .replace(/(src|href)=["']assets\//gi, (_match, attr) => `${attr}="/templates/${template.slug}/assets/`)
    .replace(/url\(["']?assets\//gi, `url(/templates/${template.slug}/assets/`)
    .replace(/<head>/i, `<head><base href="/templates/${template.slug}/">${supportStyles}`);
  next = rewriteInternalPageLinks(localizeWowVideos(localizeWowImages(localizeBareMediaReferences(next), template.slug), template.slug));
  next = next
    .replace(/\/templates\/forgepoint-construction\/assets\/images\/c837a6_88ffe77603984ac8b9e4573ea2dcd293~mv2-ad2f0f\.png/g, data.brand.logo)
    .replace(/\/templates\/forgepoint-construction\/assets\/images\/c837a6_48c9b7a48faf42df940adaa561dcf8cc~mv2-2444e6\.png/g, data.brand.logo);
  return template.category === "Architecture" ? simplifyHouseNavigation(next) : next;
}

function simplifyHouseNavigation(html) {
  return html
    .replace(/\s*<li class="dropdown"><a[^>]*data-template-page="[^"]+"[^>]*>(?:SELECTED HOMES|SIGNATURE SPACES)<?<\/a>\s*<ul>[\s\S]*?<\/ul>\s*<\/li>/gi, "")
    .replace(/\s*<li class="dropdown"><a[^>]*data-template-page="[^"]+"[^>]*>pages<\/a>\s*<ul>[\s\S]*?<\/ul>\s*<\/li>/gi, "");
}

function makeTemplateTs(slug) {
  return `"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import pages from "./pages.json";
import "./styles.css";

type ExactEditable = typeof editableData;

const aliases: Record<string, string> = {
  "mcr-construct": "home",
  "intro": "home",
  "index": "home",
  "index-2": "home",
  "index-light": "home",
  "index-2-light": "home",
  "about": "about",
  "about-light": "about",
  "about-us": "about",
  "projects": "projects",
  "projects-01": "projects",
  "projects-01-light": "projects",
  "projects-02": "projects",
  "projects-02-light": "projects",
  "projects-03": "projects",
  "projects-03-light": "projects",
  "projects-04": "projects",
  "projects-04-light": "projects",
  "projects-05": "projects",
  "projects-05-light": "projects",
  "project-details": "project-details",
  "project-details-light": "project-details",
  "project-details-02": "project-details",
  "project-details-02-light": "project-details",
  "blog": "blog",
  "blog-light": "blog",
  "blog-details": "blog",
  "blog-details-light": "blog",
  "services": "services",
  "careers": "careers",
  "contact": "contact",
  "contact-light": "contact",
  "privacy-policy": "privacy",
  "accessibility-statement": "privacy",
  "terms-conditions": "terms",
  "404": "home",
  "404-light": "home",
};

function pageFromHref(href: string): string {
  if (/^(?:mailto:|tel:|https?:)/i.test(href)) return "";
  const clean = href.split("#")[0].split("?")[0].split("/").pop()?.replace(/\\.html$/, "") ?? "";
  return aliases[clean] ?? "";
}

export default function ExactSourceTemplate({ data }: { data?: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as ExactEditable;
  const [page, setPage] = useState("home");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const doc = useMemo(() => {
    const raw = (pages as Record<string, string>)[page] ?? (pages as Record<string, string>).home;
    return raw
      .replaceAll("__EDITABLE_BRAND_NAME__", content.brand.name)
      .replaceAll("__EDITABLE_PHONE__", content.brand.phone)
      .replaceAll("__EDITABLE_EMAIL__", content.brand.email)
      .replaceAll("__EDITABLE_ADDRESS__", content.brand.address)
      .replaceAll("__EDITABLE_LOGO__", content.brand.logo)
      .replaceAll("__EDITABLE_CTA_LABEL__", content.navigation.ctaLabel)
      .replaceAll("__EDITABLE_CTA_HREF__", content.navigation.ctaHref)
      .replaceAll("__EDITABLE_PHONE_HREF__", content.navigation.phoneHref)
      .replaceAll("__EDITABLE_HERO_TITLE__", content.hero.title)
      .replaceAll("__EDITABLE_HERO_TEXT__", content.hero.text)
      .replaceAll("__EDITABLE_PRIMARY_CTA__", content.hero.primaryCta)
      .replaceAll("__EDITABLE_PRIMARY_HREF__", content.hero.primaryHref);
  }, [content, page]);

  const wireFrame = () => {
    const frameDocument = frameRef.current?.contentDocument;
    if (!frameDocument) return;
    const openPage = (next: string, event: Event) => {
      if (!next) return;
      event.preventDefault();
      event.stopPropagation();
      setPage(next);
    };
    frameDocument.querySelectorAll<HTMLAnchorElement>("a[data-template-page]").forEach((anchor) => {
      anchor.addEventListener("click", (event) => openPage(anchor.dataset.templatePage ?? "", event), { capture: true });
      anchor.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") openPage(anchor.dataset.templatePage ?? "", event);
      });
    });
    frameDocument.addEventListener("click", (event) => {
      const anchor = (event.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const next = anchor.dataset.templatePage ?? (href.startsWith("#/") ? href.slice(2) : pageFromHref(href));
      openPage(next, event);
    }, { capture: true });
  };

  useEffect(() => {
    const timer = window.setTimeout(wireFrame, 50);
    return () => window.clearTimeout(timer);
  }, [doc]);

  return <iframe ref={frameRef} onLoad={wireFrame} srcDoc={doc} className="exact-source-frame" title="${slug} exact template" />;
}
`;
}

function makeConfig(template) {
  return {
    id: template.slug,
    name: template.name,
    description: `Faithful local conversion of the original ${template.category.toLowerCase()} source template with editable business content.`,
    category: template.category,
    image: `/templates/${template.slug}/preview-collage.webp`,
    previewImages: [
      `/templates/${template.slug}/preview-collage.webp`,
      `/templates/${template.slug}/${template.previewImages[0]}`,
      `/templates/${template.slug}/${template.previewImages[1]}`,
    ],
    features: [
      "Exact source-template layout",
      "Original page flow and section structure",
      "Editable logo, contact details and CTA links",
      "Local assets copied into the template folder",
      "Multi-page preview collage",
    ],
  };
}

async function makePreview(template, publicDir) {
  const labels = ["Home", "About", "Projects"];
  const images = template.previewImages;
  const cards = [];
  for (let index = 0; index < labels.length; index += 1) {
    const image = path.join(publicDir, images[index]);
    const panel = await sharp({ create: { width: 420, height: 680, channels: 4, background: "#111111" } })
      .composite([
        { input: await sharp(image).resize(420, 455, { fit: "cover", position: "top" }).toBuffer(), top: 0, left: 0 },
        { input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="680"><rect x="0" y="390" width="420" height="290" fill="${template.editable.colors.background}"/><text x="32" y="510" font-family="Arial" font-size="42" font-weight="900" fill="${template.editable.colors.text}">${labels[index]}</text><text x="32" y="565" font-family="Arial" font-size="20" font-weight="800" fill="${template.editable.colors.primary}">${template.name}</text></svg>`), top: 0, left: 0 },
      ])
      .png()
      .toBuffer();
    cards.push({ input: panel, left: 48 + index * 450, top: 150 });
  }
  const bg = template.editable.colors.background;
  const fg = template.editable.colors.text;
  await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="900"><rect width="1400" height="900" fill="${bg}"/><text x="48" y="86" font-family="Arial" font-size="46" font-weight="900" fill="${fg}">${template.name}</text><text x="48" y="122" font-family="Arial" font-size="22" font-weight="800" fill="${template.editable.colors.primary}">Home / About / Projects</text></svg>`))
    .composite(cards)
    .webp({ quality: 88 })
    .toFile(path.join(publicDir, "preview-collage.webp"));
}

function mediaNamesFromDocuments(pageDocs) {
  return [...new Set(Object.values(pageDocs)
    .join("\n")
    .match(/(?:c837a6|84770f)[A-Za-z0-9_~.-]+\.(?:jpe?g|png|webp|ico)/gi) ?? [])]
    .map((name) => name.replace(/^assets\/images\//, ""));
}

function ensureMediaAliases(pageDocs, baseDir) {
  const imageDir = path.join(baseDir, "assets/images");
  if (!fs.existsSync(imageDir)) return;
  const files = fs.readdirSync(imageDir);
  const fallbackByExt = new Map();
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const current = fallbackByExt.get(ext);
    if (!current || fs.statSync(path.join(imageDir, file)).size > fs.statSync(path.join(imageDir, current)).size) {
      fallbackByExt.set(ext, file);
    }
  }

  for (const name of mediaNamesFromDocuments(pageDocs)) {
    const target = path.join(imageDir, name);
    if (fs.existsSync(target)) continue;
    const ext = path.extname(name).toLowerCase();
    const stem = name.slice(0, -ext.length);
    const sibling = files.find((file) => file.startsWith(`${stem}-`) && path.extname(file).toLowerCase() === ext);
    const fallback = sibling ?? fallbackByExt.get(ext);
    if (!fallback) continue;
    fs.copyFileSync(path.join(imageDir, fallback), target);
    files.push(name);
  }
}

async function writeTemplate(template) {
  const dir = path.join(srcRoot, template.slug);
  const publicDir = path.join(publicRoot, template.slug);
  cleanDir(dir);
  cleanDir(publicDir);
  fs.cpSync(template.assetRoot, path.join(dir, "assets"), { recursive: true });
  fs.cpSync(template.assetRoot, path.join(publicDir, "assets"), { recursive: true });
  fs.rmSync(path.join(dir, "assets/js"), { recursive: true, force: true });
  fs.rmSync(path.join(dir, "assets/vendor"), { recursive: true, force: true });
  ensureDir(path.join(dir, path.dirname(template.logoPath)));
  ensureDir(path.join(publicDir, path.dirname(template.logoPath)));
  fs.writeFileSync(path.join(dir, template.logoPath), template.logo);
  fs.writeFileSync(path.join(publicDir, template.logoPath), template.logo);

  const pageDocs = Object.fromEntries(Object.entries(template.pages).map(([key, file]) => {
    const html = brandDocument(readDocument(path.join(template.sourceRoot, file)), template);
    return [key, html];
  }));
  ensureMediaAliases(pageDocs, dir);
  ensureMediaAliases(pageDocs, publicDir);
  fs.writeFileSync(path.join(dir, "pages.json"), JSON.stringify(pageDocs));
  fs.writeFileSync(path.join(dir, "template.tsx"), makeTemplateTs(template.slug));
  fs.writeFileSync(path.join(dir, "styles.css"), ".exact-source-frame{display:block;width:100%;min-height:100vh;height:100vh;border:0;background:#fff}");
  fs.writeFileSync(path.join(dir, "editable.json"), JSON.stringify(template.editable, null, 2) + "\n");
  fs.writeFileSync(path.join(dir, "config.json"), JSON.stringify(makeConfig(template), null, 2) + "\n");
  await makePreview(template, publicDir);
}

for (const template of templates) {
  await writeTemplate(template);
}

console.log(`Created ${templates.length} exact source templates.`);
