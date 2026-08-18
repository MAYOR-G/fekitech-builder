"use client";

import React from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./index.css";

type LinkItem = { label: string; href: string };
type FeatureItem = { title: string; image: string; imageAlt: string };
type ServiceItem = { label: string; active: boolean };
type ProjectItem = { title: string; type: string; image: string; imageAlt: string };
type PointItem = { title: string; text: string };
type FooterColumn = { title: string; links: LinkItem[] };

function asItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

export default function AquaBlastTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme?.colors || defaults.theme.colors;
  const fonts = content.theme?.typography || defaults.theme.typography;
  
  const themeStyle = {
    "--template-page": colors.page,
    "--template-surface": colors.surface,
    "--template-soft": colors.soft,
    "--template-ink": colors.ink,
    "--template-body": colors.body,
    "--template-muted": colors.muted,
    "--template-line": colors.line,
    "--template-accent": colors.accent,
    "--template-dark": colors.dark,
    "--template-footer": colors.footer,
    "--template-heading-font": fonts.heading,
    "--template-body-font": fonts.body,
  } as React.CSSProperties;

  const navLinks = asItems<LinkItem>(content.navigation?.links);
  const featureItems = asItems<FeatureItem>(content.features?.items);
  const serviceList = asItems<ServiceItem>(content.services?.list);
  const projects = asItems<ProjectItem>(content.projects?.items);
  const areas = asItems<ProjectItem>(content.areas?.items);
  const whyPoints = asItems<PointItem>(content.whyUs?.points);
  const footerColumns = asItems<FooterColumn>(content.footer?.columns);

  return (
    <main id="home" data-template-id="aquablast-pressure-wash" style={themeStyle}>
      <header className="aq-header">
        <a className="aq-logo" href="#home">{str(content.brand?.name)}</a>
        <nav className="aq-nav" aria-label="Primary navigation">
          {navLinks.map((link, i) => (
            <a key={i} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <a className="aq-button" href={str(content.navigation?.buttonHref)}>
          {str(content.navigation?.buttonLabel)}
        </a>
      </header>

      <section className="aq-hero">
        <img className="aq-hero-bg" src={str(content.hero?.image)} alt={str(content.hero?.imageAlt)} />
        <div className="aq-hero-content">
          <span className="aq-hero-eyebrow">{str(content.hero?.eyebrow)}</span>
          <h1><Lines text={str(content.hero?.title)} /></h1>
          <p>{str(content.hero?.text)}</p>
          <div className="aq-hero-actions">
            <a className="aq-button" href={str(content.hero?.buttonHref)}>{str(content.hero?.buttonLabel)}</a>
            <div className="aq-hero-badge">
              <span>★</span> {str(content.hero?.badge)}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="aq-section aq-features">
        <div className="aq-section-header">
          <h2>{str(content.features?.title)}</h2>
          <p>{str(content.features?.text)}</p>
        </div>
        <div className="aq-feature-grid">
          {featureItems.map((item, i) => (
            <article key={i} className="aq-feature-card">
              <img src={item.image} alt={item.imageAlt} />
              <h3 className="aq-feature-title">{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="aq-section aq-services">
        <div className="aq-service-split">
          <div>
            <div className="aq-section-header" style={{ marginBottom: '2rem' }}>
              <h2>{str(content.services?.title)}</h2>
              <p>{str(content.services?.text)}</p>
            </div>
            <div className="aq-service-list">
              {serviceList.map((service, i) => (
                <div key={i} className={`aq-service-item ${service.active ? 'active' : ''}`}>
                  {service.label}
                  {service.active && <span>→</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <img className="aq-service-img" src={str(content.services?.image)} alt={str(content.services?.imageAlt)} />
          </div>
        </div>
      </section>

      <section id="projects" className="aq-section aq-projects">
        <div className="aq-section-header">
          <h2>{str(content.projects?.title)}</h2>
          <p>{str(content.projects?.text)}</p>
        </div>
        <div className="aq-project-grid">
          {projects.map((project, i) => (
            <article key={i} className="aq-project-card">
              <img src={project.image} alt={project.imageAlt} />
              <div className="aq-project-info">
                <span className="aq-project-type">{project.type}</span>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="areas" className="aq-section aq-areas">
        <div className="aq-section-header">
          <h2>{str(content.areas?.title)}</h2>
          <p>{str(content.areas?.text)}</p>
        </div>
        <div className="aq-project-grid">
          {areas.map((area, i) => (
            <article key={i} className="aq-project-card">
              <img src={area.image} alt={area.imageAlt} />
              <div className="aq-project-info">
                <span className="aq-project-type">{area.type}</span>
                <h3>{area.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="why-us" className="aq-section aq-why">
        <div className="aq-why-split">
          <div>
            <img className="aq-why-image" src={str(content.whyUs?.image)} alt={str(content.whyUs?.imageAlt)} />
          </div>
          <div>
            <h2>{str(content.whyUs?.title)}</h2>
            <p>{str(content.whyUs?.text)}</p>
            <div className="aq-why-points">
              {whyPoints.map((point, i) => (
                <div key={i} className="aq-point">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="aq-footer">
        <div className="aq-footer-grid">
          <div className="aq-footer-cta">
            <h2>{str(content.footer?.title)}</h2>
            <p>{str(content.footer?.text)}</p>
            <a className="aq-button" href={str(content.footer?.buttonHref)}>{str(content.footer?.buttonLabel)}</a>
          </div>
          {footerColumns.map((col, i) => (
            <nav key={i} className="aq-footer-nav" aria-label={col.title}>
              <h3>{col.title}</h3>
              {asItems<LinkItem>(col.links).map((link, j) => (
                <a key={j} href={link.href}>{link.label}</a>
              ))}
            </nav>
          ))}
        </div>
        <div className="aq-footer-bottom">
          <p>{str(content.brand?.copyright)}</p>
          <a href={str(content.brand?.phoneHref)}>{str(content.brand?.phone)}</a>
        </div>
      </footer>
    </main>
  );
}
