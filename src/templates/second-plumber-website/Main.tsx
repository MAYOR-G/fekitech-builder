"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Drop,
  HouseLine,
  List,
  MapPin,
  Phone,
  ThermometerSimple,
  Wrench,
  X,
} from "@phosphor-icons/react";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useTemplateData } from "./TemplateContext";
import "./premium.css";

const serviceIcons = [Drop, ThermometerSimple, Wrench, HouseLine];

export default function Main() {
  const data = useTemplateData();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="rp-site">
      <div className="rp-emergency">
        <span>Active leak or no heating?</span>
        <a href={`tel:${data.brand.emergencyPhone.replace(/\s/g, "")}`}>Emergency: {data.brand.emergencyPhone}</a>
      </div>
      <header className="rp-header">
        <a className="rp-logo" href="#" aria-label={`${data.brand.name} home`}>
          <span><Drop aria-hidden="true" weight="fill" /></span><strong>{data.brand.shortName}</strong>
        </a>
        <nav className={menuOpen ? "rp-nav is-open" : "rp-nav"} aria-label="Primary navigation">
          {data.navigation.links.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
        </nav>
        <a className="rp-book" href={data.navigation.ctaHref}>{data.navigation.ctaLabel}<ArrowRight aria-hidden="true" /></a>
        <button
          className="rp-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </header>

      <section className="rp-hero">
        <div className="rp-hero-copy">
          <p>{data.hero.eyebrow}</p>
          <h1>{data.hero.title}</h1>
          <span>{data.hero.subtitle}</span>
          <div>
            <a href={data.hero.buttonHref}>{data.hero.button}<ArrowRight aria-hidden="true" /></a>
            <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{data.brand.phone}</a>
          </div>
          <ul>
            {data.proof.map((item) => <li key={item}><CheckCircle aria-hidden="true" weight="fill" />{item}</li>)}
          </ul>
        </div>
        <div className="rp-hero-image">
          <TemplateImage
            src={data.hero.image}
            alt={data.hero.imageAlt}
            width={1600}
            height={1200}
            loading="eager"
            priority
          />
          <p><strong>Same-day appointments</strong><span>Subject to availability</span></p>
        </div>
      </section>

      <section className="rp-services" id="services">
        <div className="rp-section-head">
          <h2>{data.services.title}</h2>
          <p>{data.services.description}</p>
        </div>
        <div className="rp-service-list">
          {data.services.items.map((item, index) => {
            const Icon = serviceIcons[index];
            return (
              <article key={item.title}>
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ArrowRight aria-hidden="true" />
              </article>
            );
          })}
        </div>
      </section>

      <section className="rp-work" id="work">
        <div className="rp-work-copy">
          <p>{data.work.eyebrow}</p>
          <h2>{data.work.title}</h2>
          <span>{data.work.description}</span>
        </div>
        <div className="rp-work-images">
          <figure><TemplateImage src={data.work.beforeImage} alt={data.work.beforeAlt} width={1200} height={900} /><figcaption>Before</figcaption></figure>
          <figure><TemplateImage src={data.work.afterImage} alt={data.work.afterAlt} width={1200} height={900} /><figcaption>After</figcaption></figure>
        </div>
      </section>

      <section className="rp-process" id="process">
        <div className="rp-process-image">
          <TemplateImage src={data.process.image} alt={data.process.imageAlt} width={1200} height={1200} />
        </div>
        <div className="rp-process-copy">
          <h2>{data.process.title}</h2>
          <ol>
            {data.process.items.map((item, index) => (
              <li key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rp-testimonials">
        <h2>{data.testimonials.title}</h2>
        <div>
          {data.testimonials.items.map((item) => (
            <blockquote key={item.name}>
              <p>“{item.quote}”</p><footer><strong>{item.name}</strong><span>{item.detail}</span></footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="rp-contact" id="contact">
        <div>
          <h2>{data.contact.title}</h2>
          <p>{data.contact.description}</p>
          <a href={data.contact.buttonHref}>{data.contact.buttonLabel}<ArrowRight aria-hidden="true" /></a>
        </div>
        <div className="rp-contact-meta">
          <a href={`tel:${data.brand.phone.replace(/\s/g, "")}`}><Phone aria-hidden="true" />{data.brand.phone}</a>
          <a href={`mailto:${data.brand.email}`}>{data.brand.email}</a>
          <p><MapPin aria-hidden="true" />{data.brand.address}</p>
        </div>
      </section>

      <footer className="rp-footer">
        <a className="rp-logo" href="#"><span><Drop aria-hidden="true" weight="fill" /></span><strong>{data.brand.shortName}</strong></a>
        <p>{data.footer.note}</p>
        <small>{data.footer.copyright}</small>
      </footer>
    </main>
  );
}
