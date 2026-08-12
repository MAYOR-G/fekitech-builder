"use client";

import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import React, { useMemo } from "react";
import defaults from "./editable.json";
import "./styles.css";

type LinkItem = { label: string; href: string };
type ImageItem = { src: string; alt: string; title?: string };
type StatItem = { value: string; label: string };
type Programme = ImageItem & { title: string; age: string; text: string; label: string; href: string; image: string; imageAlt: string };
type Activity = { title: string; image: string; alt: string };
type Person = { name: string; role: string; image: string; alt: string };
type Insight = { title: string; date: string; readTime: string; image: string; alt: string };
type Testimonial = { quote: string; name: string; rating: string };

function asItems<T>(value: unknown): T[] {
  return Array.isArray(value) ? value as T[] : [];
}

function str(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export default function BloomStepsNurseryTemplate({ data }: { data: TemplateData }) {
  const content = mergeTemplateData(defaults, data);
  const colors = content.theme.colors;
  const fonts = content.theme.typography;

  const themeStyle = useMemo(() => ({
    "--bsn-page": colors.page,
    "--bsn-surface": colors.surface,
    "--bsn-card": colors.card,
    "--bsn-ink": colors.ink,
    "--bsn-muted": colors.muted,
    "--bsn-green": colors.green,
    "--bsn-coral": colors.coral,
    "--bsn-yellow": colors.yellow,
    "--bsn-mint": colors.mint,
    "--bsn-lavender": colors.lavender,
    "--bsn-peach": colors.peach,
    "--bsn-sky": colors.sky,
    "--bsn-line": colors.line,
    "--bsn-heading": fonts.heading,
    "--bsn-body": fonts.body,
  }) as React.CSSProperties, [colors, fonts]);

  const navLinks = asItems<LinkItem>(content.navigation.links);
  const introImages = asItems<ImageItem>(content.intro.images);
  const introStats = asItems<StatItem>(content.intro.stats);
  const storyPoints = asItems<{ title: string; text: string }>(content.story.points);
  const foundationItems = asItems<string>(content.foundation.items);
  const programmes = asItems<Programme>(content.programmes.items);
  const activities = asItems<Activity>(content.activities.items);
  const people = asItems<Person>(content.team.people);
  const insights = asItems<Insight>(content.insights.items);
  const testimonials = asItems<Testimonial>(content.testimonials.items);
  const footerLinks = asItems<LinkItem>(content.footer.links);
  const socials = asItems<LinkItem>(content.footer.social);

  return (
    <main id="home" data-template-id="bloom-steps-nursery" className="bloom-steps-nursery" style={themeStyle}>
      <div className="bsn-topbar">
        <span>{str(content.announcement.text)}</span>
        <a href={str(content.announcement.href)}>{str(content.announcement.linkLabel)}</a>
      </div>

      <header className="bsn-header">
        <a className="bsn-brand" href="#home" aria-label={str(content.brand.name)}>
          <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
        </a>
        <nav aria-label="Primary navigation">
          {navLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </nav>
        <a className="bsn-header-cta" href={str(content.navigation.ctaHref)}>{str(content.navigation.ctaLabel)}</a>
      </header>

      <section className="bsn-hero">
        <div className="bsn-spark bsn-spark-one" aria-hidden="true" />
        <div className="bsn-spark bsn-spark-two" aria-hidden="true" />
        <div className="bsn-hero-copy">
          <p>{str(content.hero.eyebrow)}</p>
          <h1>{str(content.hero.title)}</h1>
          <span>{str(content.hero.text)}</span>
          <div className="bsn-actions">
            <a className="bsn-button bsn-button-primary" href={str(content.hero.primaryHref)}>{str(content.hero.primaryLabel)}</a>
            <a className="bsn-button bsn-button-soft" href={str(content.hero.secondaryHref)}>{str(content.hero.secondaryLabel)}</a>
          </div>
        </div>
        <div className="bsn-hero-media">
          <img src={str(content.hero.image)} alt={str(content.hero.imageAlt)} />
          <strong>{str(content.hero.badge)}</strong>
        </div>
      </section>

      <Wave />

      <section id="about" className="bsn-section bsn-intro">
        <Decor label="flower" />
        <h2>{str(content.intro.title)}</h2>
        <p>{str(content.intro.text)}</p>
        <div className="bsn-intro-card">
          {introImages.map((image, index) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} />
              {introStats[index] ? (
                <figcaption>
                  <strong>{introStats[index].value}</strong>
                  <span>{introStats[index].label}</span>
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </section>

      <section className="bsn-section bsn-story">
        <div className="bsn-story-image">
          <img src={str(content.story.image)} alt={str(content.story.imageAlt)} />
        </div>
        <div className="bsn-story-copy">
          <h2>{str(content.story.title)}</h2>
          <p>{str(content.story.text)}</p>
          <div className="bsn-point-grid">
            {storyPoints.map((point) => (
              <article key={point.title}>
                <b />
                <h3>{point.title}</h3>
                <p>{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bsn-section bsn-foundation">
        <div>
          <h2>{str(content.foundation.title)}</h2>
          <div className="bsn-ribbons">
            {foundationItems.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <img src={str(content.foundation.image)} alt={str(content.foundation.imageAlt)} />
      </section>

      <Zigzag />

      <section id="programmes" className="bsn-section bsn-programmes">
        <Decor label="books" />
        <h2>{str(content.programmes.title)}</h2>
        <div className="bsn-programme-list">
          {programmes.map((programme, index) => (
            <article key={programme.title}>
              <img src={programme.image} alt={programme.imageAlt} />
              <div>
                <span>{programme.age}</span>
                <h3>{programme.title}</h3>
                <p>{programme.text}</p>
                <a href={programme.href}>{programme.label}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Wave />

      <section id="activities" className="bsn-section bsn-activities">
        <h2>{str(content.activities.title)}</h2>
        <div className="bsn-activity-grid">
          {activities.map((activity) => (
            <figure key={activity.title}>
              <img src={activity.image} alt={activity.alt} />
              <figcaption>{activity.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bsn-section bsn-team">
        <h2>{str(content.team.title)}</h2>
        <div className="bsn-team-grid">
          {people.map((person) => (
            <article key={person.name}>
              <img src={person.image} alt={person.alt} />
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </article>
          ))}
        </div>
      </section>

      <Zigzag />

      <section className="bsn-section bsn-insights">
        <div>
          <h2>{str(content.insights.title)}</h2>
          <p>{str(content.insights.text)}</p>
        </div>
        <div className="bsn-insight-grid">
          {insights.map((insight) => (
            <article key={insight.title}>
              <img src={insight.image} alt={insight.alt} />
              <h3>{insight.title}</h3>
              <p>{insight.date} · {insight.readTime}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bsn-section bsn-testimonials">
        <h2>{str(content.testimonials.title)}</h2>
        <p>{str(content.testimonials.text)}</p>
        <div className="bsn-testimonial-grid">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name}>
              <span>{`Rating ${testimonial.rating}/5`}</span>
              <p>{testimonial.quote}</p>
              <strong>{testimonial.name}</strong>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="bsn-cta">
        <img src={str(content.cta.image)} alt={str(content.cta.imageAlt)} />
        <div>
          <p>{str(content.brand.strapline)}</p>
          <h2>{str(content.cta.title)}</h2>
          <span>{str(content.cta.text)}</span>
          <a className="bsn-button bsn-button-primary" href={str(content.cta.href)}>{str(content.cta.label)}</a>
        </div>
      </section>

      <footer className="bsn-footer">
        <div>
          <img src={str(content.brand.logo)} alt={str(content.brand.logoAlt)} />
          <p>{str(content.footer.note)}</p>
          <small>{str(content.brand.address)}</small>
          <small><a href={str(content.brand.emailHref)}>{str(content.brand.email)}</a></small>
        </div>
        <div>
          <h3>Links</h3>
          {footerLinks.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <div>
          <h3>Contact</h3>
          <a href={str(content.brand.phoneHref)}>{str(content.brand.phone)}</a>
          {socials.map((link) => <a key={link.label} href={link.href}>{link.label}</a>)}
        </div>
        <p>{str(content.footer.legal)}</p>
      </footer>
    </main>
  );
}

function Wave() {
  return <div className="bsn-wave" aria-hidden="true" />;
}

function Zigzag() {
  return <div className="bsn-zigzag" aria-hidden="true" />;
}

function Decor({ label }: { label: string }) {
  return <span className={`bsn-decor bsn-decor-${label}`} aria-hidden="true" />;
}
