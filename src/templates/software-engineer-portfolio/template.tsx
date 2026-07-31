"use client";
import React, { useState, useEffect, useRef } from "react";
import "./index.css";

export default function SoftwareEngineerPortfolioTemplate({ data }: any) {
  const [currentPage, setCurrentPage] = useState("home");
  const missionRef = useRef(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (missionRef.current) {
        const rect = (missionRef.current as HTMLElement).getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top <= 0) {
          const maxScroll = rect.height - windowHeight;
          const progress = Math.min(1, Math.max(0, -rect.top / maxScroll));
          setScrollProgress(progress);
        } else {
          setScrollProgress(0);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const missionWords = data.mission?.text?.split(" ") || [];

  if (currentPage === "projects") {
    return (
      <div className="se-template" data-template-id="software-engineer-portfolio">
        {/* Navigation */}
        <nav className="se-nav">
          <div className="se-nav-inner">
            <div className="se-logo">{data.nav?.logo}</div>
            <div className="se-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); }}>{data.allProjects?.backLink}</a>
            </div>
            <a href="#contact" className="se-btn-nav" onClick={() => setCurrentPage("home")}>{data.nav?.button?.label}</a>
          </div>
        </nav>

        {/* All Projects */}
        <section className="se-section se-all-projects-page" style={{ paddingTop: '150px' }}>
          <div className="se-container">
            <h2 className="se-heading-lg">{data.allProjects?.heading}</h2>
            <div className="se-projects-grid">
              {data.allProjects?.items?.map((item: any, i: number) => (
                <div key={i} className="se-project-card">
                  <div className="se-project-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="se-project-info">
                    <h3>{item.title}</h3>
                    <p>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="se-template" data-template-id="software-engineer-portfolio">
      {/* Navigation */}
      <nav className="se-nav">
        <div className="se-nav-inner">
          <div className="se-logo">{data.nav?.logo}</div>
          <div className="se-links">
            {data.nav?.links?.map((link: any, i: number) => (
              <a key={i} href={link.url}>{link.label}</a>
            ))}
          </div>
          <a href="#contact" className="se-btn-nav">{data.nav?.button?.label}</a>
        </div>
      </nav>

      <div className="se-hero-wrapper">
        {/* Hero Section */}
        <header className="se-hero" id="home">
          <div className="se-container se-hero-container">
            <div className="se-hero-left">{data.hero?.year}</div>
            
            <div className="se-hero-center">
              <div className="se-hero-title-top">
                <svg className="se-star-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
                {data.hero?.headline.split(" ")[0]}
              </div>
              <div className="se-hero-title-bottom">
                {data.hero?.headline.split(" ")[1]}
                <svg className="se-bolt-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* The scrolling sticky portrait */}
        <div className="se-sticky-portrait-container">
          <div className="se-sticky-portrait">
             <img src={data.hero?.portrait} alt="Portrait" />
          </div>
        </div>

        {/* About / Hey! Section */}
        <section className="se-section se-about" id="about">
          <div className="se-container">
            <div className="se-about-grid">
              <div className="se-about-left">
                <h2 className="se-heading">{data.about?.heading}</h2>
                <p>{data.about?.textLeft}</p>
                <div className="se-about-btn-wrap">
                  <a href={data.about?.button?.url} className="se-btn-outline">{data.about?.button?.label}</a>
                </div>
              </div>
              <div className="se-about-center-gap"></div>
              <div className="se-about-right">
                <p>{data.about?.textRight}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mission / Idea to launch */}
      <section className="se-section se-mission" ref={missionRef}>
        <div className="se-mission-sticky">
          <p className="se-mission-text">
            {missionWords.map((word: string, i: number) => {
              const threshold = i / missionWords.length;
              return (
                <span key={i} className={scrollProgress >= threshold ? "active" : ""}>
                  {word}{" "}
                </span>
              );
            })}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="se-section se-services">
        <div className="se-container">
          <h2 className="se-heading">{data.services?.heading}</h2>
          <div className="se-services-list">
            {data.services?.items?.map((item: any, i: number) => (
              <div key={i} className="se-service-item">
                <h3>{item.title}</h3>
                <div className="se-service-tags">
                  {item.tags.map((tag: string, j: number) => (
                    <span key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="se-section se-projects" id="projects">
        <div className="se-container">
          <div className="se-projects-header">
            <h2 className="se-heading">{data.projects?.heading}</h2>
            <a href="#" className="se-view-all" onClick={(e) => { e.preventDefault(); setCurrentPage("projects"); }}>
              {data.projects?.viewAll} <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
          
          <div className="se-projects-grid">
            {data.projects?.items?.map((item: any, i: number) => (
              <div key={i} className="se-project-card">
                <div className="se-project-img">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="se-project-info">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="se-section se-testimonials">
        <div className="se-container">
          <h2 className="se-heading">{data.testimonials?.heading}</h2>
          <div className="se-testimonials-grid">
            {data.testimonials?.items?.map((item: any, i: number) => (
              <div key={i} className="se-testimonial-box">
                <p className="se-testimonial-text">{item.text}</p>
                <div className="se-testimonial-info">
                  <div className="se-testimonial-author">{item.name}</div>
                  <div className="se-testimonial-role">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thoughts */}
      <section className="se-section se-thoughts">
        <div className="se-container">
          <h2 className="se-heading">{data.thoughts?.heading}</h2>
          <div className="se-thoughts-layout">
            <div className="se-thoughts-grid">
              {data.thoughts?.items?.map((item: any, i: number) => (
                <div key={i} className="se-thought-card">
                  <div className="se-thought-img">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="se-thought-content">
                    <span className="se-thought-date">{item.date}</span>
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="se-thoughts-sidebar">
              <div className="se-thoughts-sidebar-box">
                <h3>{data.thoughts?.sidebar?.text}</h3>
                <a href="#" className="se-view-all">
                  {data.thoughts?.sidebar?.button} <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk */}
      <section className="se-section se-contact" id="contact">
        <div className="se-container">
          <div className="se-contact-layout">
            <div className="se-contact-left">
              <h2 className="se-heading">{data.contact?.heading}</h2>
              <p>{data.contact?.subtext}</p>
              <div className="se-socials">
                {data.contact?.socials?.map((social: any, i: number) => (
                  <a key={i} href={social.url} className="se-social-icon">{social.icon}</a>
                ))}
              </div>
            </div>
            <div className="se-contact-right">
              <form className="se-contact-form" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <textarea placeholder="Tell me about your project" rows={4}></textarea>
                <button type="submit" className="se-btn-submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="se-footer">
        <div className="se-container">
          <div className="se-footer-top">
            <div className="se-footer-heading">
              <h2>{data.footer?.heading.split(' ').slice(0,2).join(' ')}<br/>{data.footer?.heading.split(' ').slice(2).join(' ')}</h2>
            </div>
            <div className="se-footer-contact">
              <div className="se-footer-col">
                <span>Email me</span>
                <a href={`mailto:${data.footer?.email}`}>{data.footer?.email}</a>
              </div>
              <div className="se-footer-col">
                <span>Call me</span>
                <a href={`tel:${data.footer?.phone}`}>{data.footer?.phone}</a>
              </div>
            </div>
          </div>
          <div className="se-footer-bottom">
            <h1 className="se-footer-large-text">{data.footer?.largeText}</h1>
          </div>
        </div>
      </footer>
    </div>
  );
}
