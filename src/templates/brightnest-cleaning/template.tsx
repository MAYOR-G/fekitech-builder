"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import editableData from "./editable.json";
import "./styles.css";

type BrightNestData = typeof editableData;

function setText(documentRoot: Document, selector: string, value: string) {
  const element = documentRoot.querySelector<HTMLElement>(selector);
  if (element) element.textContent = value;
}

function setImage(documentRoot: Document, selector: string, src: string, alt: string) {
  const image = documentRoot.querySelector<HTMLImageElement>(selector);
  if (!image) return;
  image.src = src;
  image.alt = alt;
}

function setLink(documentRoot: Document, selector: string, href: string, label?: string) {
  const link = documentRoot.querySelector<HTMLAnchorElement>(selector);
  if (!link) return;
  link.href = href;
  if (label) link.textContent = label;
}

function setOwnText(element: Element | null, value: string) {
  if (!element) return;
  [...element.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => node.remove());
  element.append(element.ownerDocument.createTextNode(value));
}

function cycle<T>(items: T[], index: number): T | undefined {
  return items.length ? items[index % items.length] : undefined;
}

export default function BrightNestCleaningTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(editableData, data) as BrightNestData;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(900);
  const [loaded, setLoaded] = useState(false);

  const applyContent = useCallback(() => {
    const frame = frameRef.current;
    const documentRoot = frame?.contentDocument;
    if (!frame || !documentRoot) return;

    documentRoot.querySelector(".preloader")?.remove();
    documentRoot.documentElement.style.scrollBehavior = "smooth";
    documentRoot.body.dataset.templateId = "brightnest-cleaning-frame";

    const oldOverrides = documentRoot.querySelector("#brightnest-runtime-overrides");
    oldOverrides?.remove();
    const overrides = documentRoot.createElement("style");
    overrides.id = "brightnest-runtime-overrides";
    overrides.textContent = `
      :root {
        --brightnest-primary: ${content.theme.colors.primary};
        --brightnest-primary-dark: ${content.theme.colors.primaryDark};
        --brightnest-accent: ${content.theme.colors.accent};
        --brightnest-page: ${content.theme.colors.page};
        --brightnest-text: ${content.theme.colors.text};
        --brightnest-muted: ${content.theme.colors.muted};
        --brightnest-footer: ${content.theme.colors.footer};
      }
      html, body { min-width: 320px; overflow-x: hidden; background: var(--brightnest-page); }
      body { font-family: ${content.theme.typography.body}; }
      .sansita_fontfamily, h1, h2, h3, h4, h5, h6 { font-family: ${content.theme.typography.heading}; }
      .bgcolor_skyblue { background-color: var(--brightnest-primary) !important; }
      .bgcolor_darkblue, footer .footer_sec { background-color: var(--brightnest-footer) !important; }
      .color_skyblue { color: var(--brightnest-primary) !important; }
      .color_darkblue { color: var(--brightnest-text) !important; }
      .color_yellow { color: var(--brightnest-accent) !important; }
      .yellow_btn, .get_quote_btn { background-color: var(--brightnest-accent) !important; }
      .yellow_btn { color: var(--brightnest-text) !important; }
      .preloader { display: none !important; }
      .header_logo img, .footer_logo_img img { max-width: 246px; height: auto; }
      .custome_nav { align-items: center; }
      .custome_nav > li > a { white-space: nowrap; }
      .slick-slide { height: auto; }
      .client_testimonials_info p { min-height: 90px; }
      .brightnest-inline-link { cursor: pointer; }
      @media (max-width: 991px) {
        .custome_nav { align-items: stretch; }
        .custome_nav > li > a { display: block; padding: 14px 22px; }
      }
    `;
    documentRoot.head.append(overrides);

    setImage(documentRoot, ".header_logo img", content.brand.logo, content.brand.logoAlt);
    setImage(documentRoot, ".footer_logo_img img", content.brand.logoLight, content.brand.logoAlt);
    setText(documentRoot, ".header_address_area > p", content.brand.tagline);
    setLink(documentRoot, ".header_upper .upper_call", content.brand.phoneHref, `Need help? ${content.brand.phone}`);

    const nav = documentRoot.querySelector<HTMLUListElement>("ul.custome_nav");
    if (nav) {
      nav.replaceChildren();
      content.navigation.links.forEach((item) => {
        const li = documentRoot.createElement("li");
        li.className = "nav-item";
        const link = documentRoot.createElement("a");
        link.className = "nav-link color_darkblue";
        link.href = item.href;
        link.textContent = item.label;
        li.append(link);
        nav.append(li);
      });
    }
    setLink(documentRoot, ".get_quote_btn a", content.navigation.quoteHref, content.navigation.quoteLabel);

    setText(documentRoot, ".brightnest_banner_content h5:not(.d-none)", content.hero.eyebrow);
    setText(documentRoot, ".brightnest_banner_content h1:not(.d-none)", content.hero.title);
    setText(documentRoot, ".brightnest_banner_content p", content.hero.description);
    setLink(documentRoot, ".brightnest_banner_content .yellow_btn", content.hero.buttonHref, content.hero.buttonLabel);
    setImage(documentRoot, ".banner_img img", content.hero.image, content.hero.imageAlt);
    setText(documentRoot, ".banner_img_info h2", content.hero.experienceValue);
    setText(documentRoot, ".banner_img_info p", content.hero.experienceLabel);

    setImage(documentRoot, ".about_img img", content.about.image, content.about.imageAlt);
    setLink(documentRoot, ".about_us_contact_box", content.brand.phoneHref);
    setText(documentRoot, ".abt_btn_info h5", content.brand.phone);
    setText(documentRoot, ".abt_titles .sml_title h5", content.about.eyebrow);
    setText(documentRoot, ".abt_titles h2", content.about.title);
    const aboutParagraphs = documentRoot.querySelectorAll<HTMLElement>(".abt_right_info > p");
    if (aboutParagraphs[0]) aboutParagraphs[0].textContent = content.about.intro;
    if (aboutParagraphs[1]) aboutParagraphs[1].textContent = content.about.description;
    documentRoot.querySelectorAll(".abt_right_list li").forEach((item, index) => {
      const value = cycle(content.about.benefits, index);
      if (value) setOwnText(item, value);
    });
    setLink(documentRoot, ".abt_btn .yellow_btn", content.about.buttonHref, content.about.buttonLabel);

    const statValues = documentRoot.querySelectorAll<HTMLElement>("#fw_counter_sec h3[data-max]");
    const statLabels = documentRoot.querySelectorAll<HTMLElement>("#fw_counter_sec h6:not(.d-none)");
    content.stats.forEach((stat, index) => {
      if (statValues[index]) {
        statValues[index].dataset.max = stat.value;
        statValues[index].textContent = stat.value;
      }
      if (statLabels[index]) statLabels[index].textContent = stat.label;
    });

    const servicesSection = documentRoot.querySelector(".clean_plan_slider_sec");
    servicesSection?.setAttribute("id", "brightnest-services");
    setText(documentRoot, ".clean_slider_titles .sml_title h5", content.services.eyebrow);
    setText(documentRoot, ".clean_slider_titles h2", content.services.title);
    documentRoot.querySelectorAll<HTMLElement>(".clean_slider_item").forEach((card, index) => {
      const item = cycle(content.services.items, index);
      if (!item) return;
      const heading = card.querySelector<HTMLElement>("h4");
      const paragraph = card.querySelector<HTMLElement>(".clean_slide_info p");
      const image = card.querySelector<HTMLImageElement>("img");
      const anchors = card.querySelectorAll<HTMLAnchorElement>("a");
      if (heading) heading.textContent = item.title;
      if (paragraph) paragraph.textContent = item.description;
      if (image) { image.src = item.image; image.alt = item.imageAlt; }
      anchors.forEach((anchor) => { anchor.href = content.services.buttonHref; });
    });
    setText(documentRoot, ".clean_slider_btn_area h6", content.services.description);
    setLink(documentRoot, ".clean_slider_btn_area .yellow_btn", content.services.buttonHref, content.services.buttonLabel);

    setText(documentRoot, ".services_titles .sml_title h5", content.features.eyebrow);
    setText(documentRoot, ".services_titles h2", content.features.title);
    const featureHeadings = documentRoot.querySelectorAll<HTMLElement>(".our_services_sec h4:not(.d-none)");
    const featureParagraphs = documentRoot.querySelectorAll<HTMLElement>(".our_services_sec .service_box p, .our_services_sec .services_box p");
    content.features.items.forEach((item, index) => {
      if (featureHeadings[index]) featureHeadings[index].textContent = item.title;
      if (featureParagraphs[index]) featureParagraphs[index].textContent = item.description;
    });

    setText(documentRoot, ".client_testimonials_titles .sml_title h5", content.testimonials.eyebrow);
    setText(documentRoot, ".client_testimonials_titles h2", content.testimonials.title);
    documentRoot.querySelectorAll<HTMLElement>(".client_testimonials_item").forEach((card, index) => {
      const item = cycle(content.testimonials.items, index);
      if (!item) return;
      const quote = card.querySelector<HTMLElement>(".client_testimonials_info p");
      const name = card.querySelector<HTMLElement>("h6");
      const detail = card.querySelector<HTMLElement>(".client_testimonials_detail p");
      const image = card.querySelector<HTMLImageElement>("img");
      if (quote) quote.textContent = `“${item.quote}”`;
      if (name) name.textContent = item.name;
      if (detail) detail.textContent = item.detail;
      if (image) { image.src = item.image; image.alt = item.imageAlt; }
    });

    const teamSection = documentRoot.querySelector(".meet_team_sec");
    teamSection?.setAttribute("id", "brightnest-team");
    setText(documentRoot, ".meet_team_titles .sml_title h5", content.team.eyebrow);
    setText(documentRoot, ".meet_team_titles h2", content.team.title);
    documentRoot.querySelectorAll<HTMLElement>(".meet_team_text_info").forEach((card, index) => {
      const item = cycle(content.team.items, index);
      if (!item) return;
      const name = card.querySelector<HTMLElement>("h5");
      const role = card.querySelector<HTMLElement>("p");
      const image = card.parentElement?.querySelector<HTMLImageElement>(".meet_team_img img");
      if (name) name.textContent = item.name;
      if (role) role.textContent = item.role;
      if (image) { image.src = item.image; image.alt = item.imageAlt; }
    });

    setText(documentRoot, ".home_contact_titles .sml_title h5", content.contact.eyebrow);
    setText(documentRoot, ".home_contact_titles h2", content.contact.title);
    setText(documentRoot, ".home_contact_titles > p", content.contact.description);
    const contactBoxes = documentRoot.querySelectorAll<HTMLElement>(".home_contact_box");
    const contactValues = [content.brand.phone, content.brand.email, content.brand.address, content.brand.hours];
    contactBoxes.forEach((box, index) => {
      const values = box.querySelectorAll<HTMLElement>("h6");
      const value = values[values.length - 1];
      if (value && contactValues[index]) value.textContent = contactValues[index];
    });
    setLink(documentRoot, ".home_contact_box a[href^='tel:']", content.brand.phoneHref);
    setLink(documentRoot, ".home_contact_box a[href^='mailto:']", content.brand.emailHref);
    const contactInputs = documentRoot.querySelectorAll<HTMLInputElement>(".home_contact_right input");
    const placeholders = [content.contact.form.namePlaceholder, content.contact.form.emailPlaceholder, content.contact.form.phonePlaceholder, content.contact.form.subjectPlaceholder];
    contactInputs.forEach((input, index) => { if (placeholders[index]) input.placeholder = placeholders[index]; });
    const message = documentRoot.querySelector<HTMLTextAreaElement>(".home_contact_right textarea");
    if (message) message.placeholder = content.contact.form.messagePlaceholder;
    setText(documentRoot, ".home_contact_right button", content.contact.form.buttonLabel);

    const projectsSection = documentRoot.querySelector(".our_work_slider_sec");
    projectsSection?.setAttribute("id", "brightnest-projects");
    setText(documentRoot, ".our_work_slider_title_info .sml_title h5", content.projects.eyebrow);
    setText(documentRoot, ".our_work_slider_title_info h2", content.projects.title);
    setText(documentRoot, ".our_work_slider_title_info > p", content.projects.description);
    documentRoot.querySelectorAll<HTMLElement>(".work_slider_1_item").forEach((card, index) => {
      const item = cycle(content.projects.items, index);
      if (!item) return;
      const heading = card.querySelector<HTMLElement>("h4");
      const image = card.querySelector<HTMLImageElement>("img");
      if (heading) heading.textContent = item.title;
      if (image) { image.src = item.image; image.alt = item.imageAlt; }
    });

    const processSection = documentRoot.querySelector(".how_work_sec");
    processSection?.setAttribute("id", "brightnest-process");
    setText(documentRoot, ".how_work_titles .sml_title h5", content.process.eyebrow);
    setText(documentRoot, ".how_work_titles h2", content.process.title);
    documentRoot.querySelectorAll<HTMLElement>(".how_work_box_info").forEach((card, index) => {
      const item = cycle(content.process.items, index);
      if (!item) return;
      const paragraphs = card.querySelectorAll<HTMLElement>("p");
      const heading = card.querySelector<HTMLElement>("h5");
      if (paragraphs[0]) paragraphs[0].textContent = item.label;
      if (heading) heading.textContent = item.title;
      if (paragraphs[1]) paragraphs[1].textContent = item.description;
    });
    setText(documentRoot, ".netural_product_btn", content.process.note);

    const articlesSection = documentRoot.querySelector(".home_blog_sec");
    articlesSection?.setAttribute("id", "brightnest-articles");
    setText(documentRoot, ".home_blogs_titles .sml_title h5", content.articles.eyebrow);
    setText(documentRoot, ".home_blogs_titles h2", content.articles.title);
    documentRoot.querySelectorAll<HTMLElement>(".home_blog_box").forEach((card, index) => {
      const item = cycle(content.articles.items, index);
      if (!item) return;
      const image = card.querySelector<HTMLImageElement>("img");
      const date = card.querySelector<HTMLElement>(".home_blog_date_box h4");
      const month = card.querySelector<HTMLElement>(".home_blog_date_box h6");
      const category = card.querySelector<HTMLElement>(".home_blog_img_title h6");
      const title = card.querySelector<HTMLAnchorElement>(".home_blogs_info_title");
      const description = card.querySelector<HTMLElement>(".home_blogs_info p");
      const button = card.querySelector<HTMLAnchorElement>(".yellow_btn");
      if (image) { image.src = item.image; image.alt = item.imageAlt; }
      if (date) date.textContent = item.day;
      if (month) month.textContent = item.month;
      if (category) category.textContent = item.category;
      if (title) { title.textContent = item.title; title.href = item.buttonHref; }
      if (description) description.textContent = item.description;
      if (button) { button.textContent = item.buttonLabel; button.href = item.buttonHref; }
    });

    setText(documentRoot, ".home_faq_titles .sml_title h5", content.faq.eyebrow);
    setText(documentRoot, ".home_faq_titles h2", content.faq.title);
    documentRoot.querySelectorAll<HTMLElement>(".home_faq_accodian_item").forEach((itemRoot, index) => {
      const item = cycle(content.faq.items, index);
      if (!item) return;
      const question = itemRoot.querySelector<HTMLElement>(".home_faq_accodian_title h5");
      const answer = itemRoot.querySelector<HTMLElement>(".home_faq_accodian_tab");
      if (question) question.textContent = item.question;
      if (answer) answer.textContent = item.answer;
    });
    setImage(documentRoot, ".home_faq_img img", content.faq.image, content.faq.imageAlt);

    setText(documentRoot, ".newsletter_left h4", content.newsletter.title);
    const newsletterInput = documentRoot.querySelector<HTMLInputElement>(".newsletter_right input");
    if (newsletterInput) newsletterInput.placeholder = content.newsletter.placeholder;
    setText(documentRoot, ".newsletter_right button", content.newsletter.buttonLabel);

    setText(documentRoot, ".footer_logo_info > p", content.brand.description);
    setText(documentRoot, ".footer_short_links .footer_title h5", content.footer.usefulTitle);
    setText(documentRoot, ".footer_services .footer_title h5", content.footer.servicesTitle);
    setText(documentRoot, ".footer_contect_info .footer_title h5", content.footer.contactTitle);
    const usefulList = documentRoot.querySelector<HTMLUListElement>(".footer_short_links ul");
    if (usefulList) {
      usefulList.replaceChildren();
      content.navigation.links.forEach((item) => {
        const li = documentRoot.createElement("li");
        const link = documentRoot.createElement("a");
        link.className = "color_white fw_400 line_height_24";
        link.href = item.href;
        link.textContent = item.label;
        li.append(link);
        usefulList.append(li);
      });
    }
    const serviceList = documentRoot.querySelector<HTMLUListElement>(".footer_services ul");
    if (serviceList) {
      serviceList.replaceChildren();
      content.footer.serviceLinks.forEach((item) => {
        const li = documentRoot.createElement("li");
        const link = documentRoot.createElement("a");
        link.className = "color_white fw_400 line_height_24";
        link.href = item.href;
        link.textContent = item.label;
        li.append(link);
        serviceList.append(li);
      });
    }
    const footerContact = documentRoot.querySelectorAll<HTMLElement>(".footer_contect_info .footer_links");
    if (footerContact[0]) { const anchor = footerContact[0] as HTMLAnchorElement; anchor.href = content.brand.phoneHref; setOwnText(anchor, content.brand.phone); }
    if (footerContact[1]) { const anchor = footerContact[1] as HTMLAnchorElement; anchor.href = content.brand.emailHref; setOwnText(anchor, content.brand.email); }
    if (footerContact[2]) setOwnText(footerContact[2], content.brand.address);
    setText(documentRoot, ".footer_copyride_left", content.footer.copyright);
    const legal = documentRoot.querySelector<HTMLElement>(".footer_copyride_right");
    if (legal) {
      legal.replaceChildren();
      content.footer.legalLinks.forEach((item, index) => {
        if (index) legal.append(" · ");
        const link = documentRoot.createElement("a");
        link.className = "color_white fw_400 line_height_24";
        link.href = item.href;
        link.textContent = item.label;
        legal.append(link);
      });
    }

    documentRoot.querySelectorAll<HTMLAnchorElement>("a[href$='.html'], a[href*='.html#']").forEach((link) => {
      const label = link.textContent?.toLowerCase() ?? "";
      if (label.includes("service")) link.href = "#brightnest-services";
      else if (label.includes("team")) link.href = "#brightnest-team";
      else if (label.includes("project")) link.href = "#brightnest-projects";
      else if (label.includes("about")) link.href = "#about_1";
      else link.href = "#home_contact";
      link.removeAttribute("target");
    });

    const handleClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const anchor = target.closest("a");
      const href = anchor?.getAttribute("href") ?? "";
      if (!anchor || !href.startsWith("#")) return;
      const targetElement = documentRoot.querySelector(href);
      if (!targetElement) return;
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    documentRoot.removeEventListener("click", handleClick);
    documentRoot.addEventListener("click", handleClick);

    const resize = () => {
      const nextHeight = Math.max(documentRoot.documentElement.scrollHeight, documentRoot.body.scrollHeight, 900);
      setHeight(nextHeight);
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(documentRoot.body);
    window.setTimeout(resize, 700);
    window.setTimeout(resize, 1800);
    setLoaded(true);
  }, [content]);

  useEffect(() => {
    if (frameRef.current?.contentDocument?.readyState === "complete") applyContent();
  }, [applyContent]);

  return (
    <div data-template-id="brightnest-cleaning" className="brightnest-cleaning">
      {!loaded && <div className="bn-loading">Preparing BrightNest</div>}
      <iframe
        ref={frameRef}
        className="bn-frame"
        src="/templates/brightnest-cleaning/source.html"
        title={`${content.brand.name} template`}
        style={{ height, display: loaded ? "block" : "none" }}
        sandbox="allow-same-origin allow-scripts allow-forms"
        onLoad={applyContent}
      />
    </div>
  );
}
