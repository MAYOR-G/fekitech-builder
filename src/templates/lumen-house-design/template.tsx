"use client";

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
  const clean = href.split("#")[0].split("?")[0].split("/").pop()?.replace(/\.html$/, "") ?? "";
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

  return <iframe ref={frameRef} onLoad={wireFrame} srcDoc={doc} className="exact-source-frame" title="lumen-house-design exact template" />;
}
