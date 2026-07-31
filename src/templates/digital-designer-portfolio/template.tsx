"use client";

import React, { useState } from "react";
import type { TemplateData } from "@/lib/template-data";
import "./index.css";

export default function DigitalDesignerPortfolioTemplate({
  data,
}: {
  data: TemplateData;
}) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div data-template-id="digital-designer-portfolio">
      {/* Header */}
      <header className="header">
        <div className="logo">{data.global?.logoText || "KD."}</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blog</a>
        </nav>
        <a href="#contact" className="nav-cta">
          Let's Work
        </a>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text-left">
            <span className="hero-sub">{data.hero?.subheadline}</span>
            <h1 className="hero-title">
              {data.hero?.headline?.split(" ")[0]}
            </h1>
          </div>
          
          <div className="hero-image-wrapper">
            <img src={data.hero?.image} alt="Designer Portrait" />
            <div className="play-btn">
              <svg viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          
          <div className="hero-text-right">
            <h1 className="hero-title">
              {data.hero?.headline?.split(" ").slice(1).join(" ")}
            </h1>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="section-header">
          <h2 className="section-title">{data.services?.title}</h2>
          <p className="section-desc">{data.services?.description}</p>
        </div>
        
        <div className="services-list">
          {data.services?.list?.map((service: any, index: number) => (
            <div key={index} className="service-item">
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="about-grid">
          <div>
            <h2 className="section-title">{data.about?.title}</h2>
            <p className="section-desc">{data.about?.description}</p>
            
            <div className="contact-info">
              <div className="contact-item">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <span>{data.global?.email}</span>
              </div>
              <div className="contact-item">
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <span>{data.global?.phone}</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="stats-grid">
              {data.about?.stats?.map((stat: any, index: number) => (
                <div key={index} className="stat-item">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="section-header">
          <h2 className="section-title">{data.projects?.title}</h2>
          <p className="section-desc">{data.projects?.description}</p>
        </div>
        
        <div className="projects-grid">
          {data.projects?.featured?.map((project: any, index: number) => (
            <a href="#" key={index} className="project-card">
              <img src={project.image} alt={project.title} className="project-image" />
              <div className="project-overlay">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{data.experience?.title}</h2>
          <p className="section-desc">{data.experience?.description}</p>
        </div>
        
        <div className="services-list">
          {data.experience?.list?.map((exp: any, index: number) => (
            <div key={index} className="service-item">
              <h3 className="service-title">{exp.role}</h3>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "var(--accent)", fontWeight: "600", fontSize: "1.2rem" }}>{exp.company}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{exp.period}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{data.process?.title}</h2>
          <p className="section-desc">{data.process?.description}</p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
          {data.process?.steps?.map((step: any, index: number) => (
            <div key={index} style={{ backgroundColor: index % 2 === 0 ? "var(--bg-tertiary)" : "var(--accent)", color: index % 2 === 0 ? "var(--text-primary)" : "var(--bg-primary)", padding: "3rem 2rem", borderRadius: "15px" }}>
              <div style={{ fontSize: "2rem", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>{step.number}</div>
              <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>{step.title}</h3>
              <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">{data.faqs?.title}</h2>
          <p className="section-desc">{data.faqs?.description}</p>
        </div>
        
        <div className="services-list">
          {data.faqs?.list?.map((faq: any, index: number) => (
            <div key={index} style={{ borderBottom: "1px solid var(--border-color)", padding: "1.5rem 0" }}>
              <div 
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
                onClick={() => toggleFaq(index)}
              >
                <h3 style={{ fontSize: "1.2rem", fontWeight: "500", margin: 0 }}>{faq.question}</h3>
                <span style={{ fontSize: "1.5rem", color: "var(--accent)" }}>{activeFaq === index ? "-" : "+"}</span>
              </div>
              {activeFaq === index && (
                <p style={{ color: "var(--text-secondary)", marginTop: "1rem", lineHeight: "1.6" }}>
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer id="contact" className="footer">
        <div className="footer-content">
          <div>
            <h2 className="footer-title">{data.footer?.title}</h2>
            <p className="footer-desc">{data.footer?.description}</p>
          </div>
          
          <form className="footer-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input type="text" placeholder="Name" className="form-input" />
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <textarea placeholder="Tell me about your project..." className="form-input" rows={4}></textarea>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-socials">
            {data.footer?.socials?.map((social: any, index: number) => (
              <a key={index} href={social.url}>{social.name}</a>
            ))}
          </div>
          <div>{data.footer?.copyright?.replace("2026", currentYear.toString())}</div>
        </div>
      </footer>
    </div>
  );
}
