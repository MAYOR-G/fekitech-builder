"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import { pages } from "./pages";

type RoofingEditable = typeof editableData;
const TEMPLATE_ID = "crownline-roofworks";

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
  const assetRoot = "/templates/crownline-roofworks/assets/";
  const pageCopy = (data.pages as Record<string, { title?: string; text?: string }>)[page];
  let html = raw
    .replaceAll("https://html.designingmedia.com/roofora/assets/", assetRoot)
    .replaceAll("assets/", assetRoot)
    .replaceAll(assetRoot + "images/logo.png", logo)
    .replaceAll(assetRoot + "images/logo2x.png", logo)
    .replaceAll(assetRoot + "images/footer-logo.png", logo)
    .replaceAll(assetRoot + "images/about-logo.png", logo)
    .replaceAll(assetRoot + "images/about-logo2.png", logo)
    .replace(/Roofora@gmail\.com/gi, escapeHtml(brand.email))
    .replace(/mailto:Roofora@gmail\.com/gi, "mailto:" + escapeHtml(brand.email))
    .replace(/\+5689 2589 6325/g, escapeHtml(brand.phone))
    .replace(/tel:\+568925896325/g, telHref(brand.phone))
    .replace(/121 King\s*Street Melbourne, 3000,\s*<br>\s*Australia/g, escapeHtml(brand.address))
    .replace(/121 King\s*Street Melbourne, 3000,\s*<br \/>\s*Australia/g, escapeHtml(brand.address))
    .replace(/Roofora/g, escapeHtml(brand.name))
    .replace(/Buy Now for \$19/g, "Call " + escapeHtml(brand.phone))
    .replace(/https:\/\/designingmedia\.com\/checkout\/\?add-to-cart=37902/g, telHref(brand.phone))
    .replace(/Dallas, TX Distribution Hub/g, escapeHtml(brand.location))
    .replace(/Dallas's/g, escapeHtml(brand.location.split(",")[0] + "'s"))
    .replace(/BridgeRock/g, escapeHtml(brand.name))
    .replace(/PDF\/DWG\/ZIP up to 250MB\./g, "Photos, reports, or plans accepted.")
    .replace(/Contact Estimating/g, escapeHtml(hero.primaryCta));

  if (page === "home") {
    html = html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, (_match, attrs) => {
      return `<h1${attrs}>${escapeHtml(hero.title).replaceAll("\n", "<br>")}</h1>`;
    });
    html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*<p([^>]*)>[\s\S]*?<\/p>/i, (match, attrs) => {
      const heading = match.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0] ?? "";
      return `${heading}<p${attrs}>${escapeHtml(hero.text)}</p>`;
    });
    html = html.replace(/Get a Quote|Book Inspection|Shop Inventory/g, escapeHtml(hero.primaryCta));
    html = html.replace(/Call Me Now|Contact Estimating|View Brands/g, escapeHtml(hero.secondaryCta));
  } else if (pageCopy) {
    if (pageCopy.title) {
      html = html.replace(/<h1([^>]*)>[\s\S]*?<\/h1>/i, (_match, attrs) => {
        return `<h1${attrs}>${escapeHtml(pageCopy.title ?? "").replaceAll("\n", "<br>")}</h1>`;
      });
    }
    if (pageCopy.text) {
      html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>\s*<p([^>]*)>[\s\S]*?<\/p>/i, (match, attrs) => {
        const heading = match.match(/<h1[^>]*>[\s\S]*?<\/h1>/i)?.[0] ?? "";
        return `${heading}<p${attrs}>${escapeHtml(pageCopy.text ?? "")}</p>`;
      });
    }
  }

  html = html.replace(/href="([^"]+\.html)(#[^"]*)?"/g, (_match, href, hash = "") => {
    const key = href.replace(/\.html$/, "");
    return `href="#/${pageAliases[key] ?? key}${hash}"`;
  });
  html = html.replace(/href="index[23]?\.html#([^"]*)"/g, 'href="#$1"');
  html = html.replace(/(<a\b(?=[^>]*class="[^"]*contact-btn[^"]*")[^>]*href=")[^"]*("[^>]*>)([\s\S]*?)(<\/a>)/gi, (_match, start, mid, _label, end) => {
    return `${start}${escapeHtml(navigation.ctaHref)}${mid}${escapeHtml(navigation.ctaLabel)}${end}`;
  });
  html = html.replace(/(<a\b(?=[^>]*class="[^"]*secondary_btn[^"]*")[^>]*href=")[^"]*("[^>]*>)([\s\S]*?)(<\/a>)/i, (_match, start, mid, _label, end) => {
    return `${start}${escapeHtml(hero.primaryHref)}${mid}${escapeHtml(hero.primaryCta)}${end}`;
  });
  html = html.replace(/(<a\b(?=[^>]*class="[^"]*elementary_btn[^"]*")[^>]*href=")[^"]*("[^>]*>)([\s\S]*?)(<\/a>)/i, (_match, start, mid, _label, end) => {
    return `${start}${escapeHtml(hero.secondaryHref)}${mid}${escapeHtml(hero.secondaryCta)}${end}`;
  });
  html = html.replace(/href="tel:[^"]*"([^>]*>)(\+?[0-9][^<]+)(<\/a>)/gi, (_match, mid, _label, end) => {
    return `href="${escapeHtml(navigation.phoneHref)}"${mid}${escapeHtml(navigation.phoneLabel)}${end}`;
  });
  for (const link of navigation.links) {
    html = html.replace(new RegExp(`href="#/${link.page}"([^>]*)>[^<]+<\\/a>`, "g"), `href="${escapeHtml(link.href)}"$1>${escapeHtml(link.label)}</a>`);
  }
  return html;
}

function renderDocument(body: string, data: RoofingEditable): string {
  const cssRoot = `/templates/${TEMPLATE_ID}/assets/`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="${cssRoot}bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="${cssRoot}css/all.min-4a9b2f.css">
  <link rel="stylesheet" href="${cssRoot}css/animate.css">
  <link rel="stylesheet" href="${cssRoot}css/owl.carousel.min.css">
  <link rel="stylesheet" href="${cssRoot}css/owl.theme.default.min.css">
  <link rel="stylesheet" href="${cssRoot}css/style.css">
  <link rel="stylesheet" href="${cssRoot}css/responsive.css">
  <style>
    :root {
      --template-primary: ${data.colors.primary};
      --template-background: ${data.colors.background};
      --template-text: ${data.colors.text};
    }
    html, body { min-width: 320px; overflow-x: hidden; }
    body { margin: 0; }
    .loader-mask { display: none !important; }
    .collapse:not(.show) { display: none; }
    .collapse.show, .dropdown-menu.show { display: block; }
    a { cursor: pointer; }
    .wow { opacity: 1 !important; visibility: visible !important; }
    img[src$="logo.png"], img[src$="footer-logo.png"] { height: auto; max-width: 248px; }
  </style>
</head>
<body>${body}</body>
</html>`;
}

export default function RoofingServiceTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as RoofingEditable;
  const [page, setPage] = useState("home");
  const frameRef = useRef<HTMLIFrameElement>(null);
  const html = useMemo(() => renderDocument(renderPage(pages[page] ?? pages.home, content, page), content), [content, page]);

  useEffect(() => {
    const root = frameRef.current?.contentDocument;
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
        frameRef.current?.contentWindow?.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, [html]);

  return (
    <iframe
      ref={frameRef}
      srcDoc={html}
      className="block h-screen min-h-screen w-full border-0 bg-white"
      title={`${content.brand.name} template`}
      onLoad={() => {
        const root = frameRef.current?.contentDocument;
        root?.querySelector(".loader-mask")?.remove();
      }}
    />
  );
}
