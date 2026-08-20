import React from 'react';
import './index.css';

export default function FreshFarmTemplate({ data }: { data: any }) {
  if (!data?.content) return null;
  const content = data.content;

  return (
    <div data-template-id="fresh-farm" className="fresh-farm">
      {/* Header */}
      <header className="ff-header">
        <div className="ff-header-links-left">
          {content.header?.links?.slice(0, 5).map((link: string, idx: number) => (
            <span key={idx} className="ff-nav-link">{link}</span>
          ))}
        </div>
        <div className="ff-header-links-right">
          <span className="ff-nav-link">{content.header?.links?.[5]}</span>
        </div>
      </header>

      {/* Hero Section */}
      {content.hero && (
        <section className="ff-hero">
          <img className="ff-hero-bg" src={content.hero.image} alt="Farm hero" />
          <div className="ff-hero-overlay">
            <div className="ff-hero-content">
              <h1 className="ff-hero-title">{content.hero.title}</h1>
              <p className="ff-hero-subtitle">{content.hero.subtitle}</p>
              <div className="ff-hero-buttons">
                {content.hero.buttons?.map((btn: string, idx: number) => (
                  <button key={idx} className={`ff-btn ff-btn-hero ${idx === 1 ? 'ff-btn-outline' : ''}`}>
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="ff-gallery">
        {content.gallery?.map((img: any, idx: number) => (
          <div key={idx} className="ff-gallery-item">
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </section>

      {/* Features Grid */}
      <section className="ff-features-section">
        <div className="ff-features-grid">
          {content.features?.map((feature: any, idx: number) => (
            <div key={idx} className="ff-feature-card">
              <h3 className="ff-feature-title">{feature.title}</h3>
              <hr className="ff-feature-divider" />
              <p className="ff-feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax / Atmospheric Section */}
      {content.parallax && (
        <section className="ff-parallax-section">
          <img className="ff-parallax-bg" src={content.parallax.image} alt="Parallax background" />
          <div className="ff-parallax-overlay">
            <div className="ff-parallax-content">
              <h2 className="ff-parallax-quote">{content.parallax.quote}</h2>
              <p className="ff-parallax-author">{content.parallax.author}</p>
            </div>
          </div>
        </section>
      )}

      {/* Subscribe Section */}
      <section className="ff-split-section">
        <div className="ff-split-left ff-bg-primary ff-text-light">
          <div className="ff-subscribe-content">
            <h2 className="ff-subscribe-title">{content.subscribe.title}</h2>
            <h2 className="ff-subscribe-subtitle">{content.subscribe.subtitle}</h2>
            <p className="ff-subscribe-text">{content.subscribe.text}</p>
          </div>
        </div>
        <div className="ff-split-right ff-relative">
          <img className="ff-bg-img" src={content.subscribe.image} alt="Subscribe background" />
          <div className="ff-subscribe-card">
            <div className="ff-form-row">
              <div className="ff-form-group">
                <label>First Name *</label>
                <input type="text" placeholder="" />
              </div>
              <div className="ff-form-group">
                <label>Last Name *</label>
                <input type="text" placeholder="" />
              </div>
            </div>
            <div className="ff-form-group">
              <label>Email *</label>
              <input type="email" placeholder="" />
            </div>
            <div className="ff-form-checkbox">
              <input type="checkbox" id="ff-terms" />
              <label htmlFor="ff-terms">I agree to the Terms & Conditions.</label>
            </div>
            <button className="ff-btn ff-btn-full">{content.subscribe.button}</button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="ff-split-section">
        <div className="ff-split-left ff-contact-bg">
          <div className="ff-contact-content">
            <h1 className="ff-contact-title">{content.contact.title1}</h1>
            <h1 className="ff-contact-title">{content.contact.title2}</h1>
            <div className="ff-contact-form">
              <div className="ff-form-row">
                <div className="ff-form-group-underline">
                  <label>First Name *</label>
                  <input type="text" placeholder="" />
                </div>
                <div className="ff-form-group-underline">
                  <label>Last Name *</label>
                  <input type="text" placeholder="" />
                </div>
              </div>
              <div className="ff-form-group-underline">
                <label>Email *</label>
                <input type="email" placeholder="" />
              </div>
              <div className="ff-form-group-underline">
                <label>Message *</label>
                <textarea rows={1} placeholder=""></textarea>
              </div>
              <button className="ff-btn ff-btn-submit">{content.contact.button}</button>
            </div>
          </div>
        </div>
        <div className="ff-split-right ff-relative">
          <img className="ff-bg-img" src={content.contact.image} alt="Contact background" />
        </div>
      </section>

      {/* Footer */}
      <footer className="ff-footer">
        <div className="ff-socials">
          <svg className="ff-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
          </svg>
          <svg className="ff-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.326V1.326C24 .593 23.407 0 22.675 0z"/>
          </svg>
          <svg className="ff-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </div>
      </footer>
    </div>
  );
}
