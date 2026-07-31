"use client";
import React, { useState } from 'react';
import './index.css';

export default function InfusionLondonTemplate({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState('home');

  if (!data) return null;

  const { theme, header, hero, newArrivals, blogPromo, reviews, footer, pages } = data;

  const handleNavigate = (e: React.MouseEvent<HTMLElement>, pageId: string) => {
    e.preventDefault();
    setCurrentPage(pageId);
    window.scrollTo(0,0);
  };

  return (
    <div data-template-id="infusion-london" className="infusion-london">
      {/* Header */}
      <header className="infusion-header">
        <div className="infusion-header-left">
          {header.social.map((s: any, idx: number) => (
            <a key={idx} href={s.href}>
              {s.icon === 'facebook' && (
                <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.3h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 3.3h-2.33v6.579C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
              )}
              {s.icon === 'instagram' && (
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              )}
              {s.icon === 'twitter' && (
                <svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              )}
            </a>
          ))}
        </div>
        <div className="infusion-logo" onClick={(e) => handleNavigate(e, 'home')} style={{ cursor: 'pointer' }}>{header.businessName}</div>
        <div className="infusion-header-right">
          <svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          <a href="#">Log In</a>
          <svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
      </header>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem', borderBottom: '1px solid var(--template-border)', backgroundColor: 'var(--template-bg)' }}>
        <nav className="infusion-header-nav">
          {header.nav.map((link: any, idx: number) => {
            const pageId = link.href.replace('#', '') || 'home';
            return (
              <a key={idx} href={link.href} onClick={(e) => handleNavigate(e, pageId)}>
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>

      {currentPage === 'home' && (
        <>
          {/* Hero */}
          <section className="infusion-hero">
            <div className="infusion-hero-content">
              <div className="infusion-hero-toplabel">{hero.topLabel}</div>
              <h1 className="infusion-hero-title">{hero.title}</h1>
              <p className="infusion-hero-subtitle">{hero.subtitle}</p>
              <a href={hero.primaryCta.href} className="infusion-btn-primary" onClick={(e) => handleNavigate(e, hero.primaryCta.href.replace('#', ''))}>
                {hero.primaryCta.label}
              </a>
            </div>
            <div className="infusion-hero-image"></div>
            <div className="infusion-hero-badge">
              <span>{hero.badgeText}</span>
            </div>
          </section>

          {/* New Arrivals */}
          <section className="infusion-arrivals">
            <div className="infusion-arrivals-header">
              <h2 className="infusion-arrivals-header-title">{newArrivals.title}</h2>
              <p className="infusion-arrivals-header-desc">{newArrivals.description}</p>
              <a href={newArrivals.shopAll.href} className="infusion-arrivals-header-link" onClick={(e) => handleNavigate(e, 'shop')}>
                {newArrivals.shopAll.label}
              </a>
            </div>
            <div className="infusion-arrivals-grid">
              {newArrivals.items.map((item: any) => (
                <div key={item.id} className="infusion-product-card">
                  <div className="infusion-product-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <h3 className="infusion-product-name">{item.name}</h3>
                  <div className="infusion-product-price">{item.price}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Blog Promo */}
          <section className="infusion-blog-promo">
            {/* Floating images (decorative) */}
            <img src="/templates/infusion-london/assets/item4.png" className="infusion-floating-img" style={{ width: '100px', height: '100px', top: '20%', left: '15%' }} alt="" />
            <img src="/templates/infusion-london/assets/item1.png" className="infusion-floating-img" style={{ width: '150px', height: '150px', top: '10%', right: '25%' }} alt="" />
            <img src="/templates/infusion-london/assets/item3.png" className="infusion-floating-img" style={{ width: '120px', height: '120px', bottom: '15%', left: '25%' }} alt="" />
            <img src="/templates/infusion-london/assets/item2.png" className="infusion-floating-img" style={{ width: '140px', height: '140px', bottom: '20%', right: '15%' }} alt="" />

            <h2 className="infusion-blog-title">{blogPromo.title}</h2>
            <a href={blogPromo.cta.href} className="infusion-btn-secondary" onClick={(e) => handleNavigate(e, blogPromo.cta.href.replace('#', ''))}>
              {blogPromo.cta.label}
            </a>
          </section>

          {/* Reviews */}
          <section className="infusion-reviews">
            <h2 className="infusion-reviews-title">{reviews.title}</h2>
            <div className="infusion-reviews-grid">
              {reviews.items.map((review: any) => (
                <div key={review.id} className="infusion-review-card">
                  <div className="infusion-review-stars">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <div className="infusion-review-name">{review.name}</div>
                  <p className="infusion-review-text">"{review.text}"</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {currentPage === 'shop' && pages?.shop && (
        <section className="infusion-shop-page" style={{ padding: '6rem 2rem', backgroundColor: 'var(--template-section)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--template-heading)' }}>{pages.shop.title}</h1>
            <p style={{ textAlign: 'center', color: 'var(--template-muted)', marginBottom: '4rem', fontSize: '1.1rem' }}>{pages.shop.description}</p>
            <div className="infusion-arrivals-grid">
              {pages.shop.items.map((item: any) => (
                <div key={item.id} className="infusion-product-card" style={{ backgroundColor: 'var(--template-surface)' }}>
                  <div className="infusion-product-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <h3 className="infusion-product-name">{item.name}</h3>
                  <div className="infusion-product-price">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentPage === 'about' && pages?.about && (
        <section className="infusion-about-page" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--template-heading)', textAlign: 'center' }}>{pages.about.title}</h1>
          <div style={{ color: 'var(--template-body)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            {pages.about.content.map((p: string, i: number) => (
              <p key={i} style={{ marginBottom: '2rem' }}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {currentPage === 'blog' && pages?.blog && (
        <section className="infusion-blog-page" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem', color: 'var(--template-heading)' }}>{pages.blog.title}</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {pages.blog.posts.map((post: any) => (
              <div key={post.id} style={{ border: '1px solid var(--template-border)', padding: '2.5rem', backgroundColor: 'var(--template-surface)' }}>
                <div style={{ color: 'var(--template-muted)', fontSize: '0.9rem', marginBottom: '1rem', letterSpacing: '0.05em' }}>{post.date}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--template-heading)' }}>{post.title}</h3>
                <p style={{ color: 'var(--template-body)', marginBottom: '2rem', lineHeight: '1.6' }}>{post.excerpt}</p>
                <a href="#" style={{ color: 'var(--template-link)', textDecoration: 'underline', fontWeight: 'bold' }}>Read more</a>
              </div>
            ))}
          </div>
        </section>
      )}

      {currentPage === 'contact' && pages?.contact && (
        <section className="infusion-contact-page" style={{ padding: '6rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--template-heading)', textAlign: 'center' }}>{pages.contact.title}</h1>
          <p style={{ color: 'var(--template-muted)', marginBottom: '3rem', textAlign: 'center', fontSize: '1.1rem' }}>{pages.contact.description}</p>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="text" placeholder={pages.contact.form.namePlaceholder} style={{ padding: '1.2rem', border: '1px solid var(--template-border)', backgroundColor: 'transparent', outline: 'none' }} />
            <input type="email" placeholder={pages.contact.form.emailPlaceholder} style={{ padding: '1.2rem', border: '1px solid var(--template-border)', backgroundColor: 'transparent', outline: 'none' }} />
            <textarea placeholder={pages.contact.form.messagePlaceholder} style={{ padding: '1.2rem', border: '1px solid var(--template-border)', minHeight: '200px', backgroundColor: 'transparent', outline: 'none', resize: 'vertical' }}></textarea>
            <button type="button" className="infusion-btn-primary" style={{ alignSelf: 'flex-start' }}>{pages.contact.form.submitText}</button>
          </form>
        </section>
      )}

      {['refund-policy', 'delivery-policy', 'terms'].includes(currentPage) && pages?.[currentPage] && (
        <section className="infusion-policy-page" style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '3rem', color: 'var(--template-heading)' }}>{pages[currentPage].title}</h1>
          <div style={{ color: 'var(--template-body)', lineHeight: '1.8', whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
            {pages[currentPage].content}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="infusion-footer">
        <div className="infusion-footer-top">
          <div className="infusion-logo">{footer.businessName}</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#">{footer.contact.address}</a>
            <span>{footer.contact.phone}</span>
          </div>
        </div>

        <div className="infusion-footer-main">
          <div className="infusion-footer-col">
            <h3>{footer.tagline}</h3>
          </div>
          <div className="infusion-footer-col">
            <h4>Help</h4>
            {footer.helpLinks.map((link: any, idx: number) => {
              const pageId = link.href.replace('#', '') || 'home';
              return (
                <a key={idx} href={link.href} onClick={(e) => handleNavigate(e, pageId)}>
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="infusion-footer-col">
            <h4>Follow Us</h4>
            {footer.followLinks.map((link: any, idx: number) => {
              const pageId = link.href.replace('#', '') || 'home';
              return (
                <a key={idx} href={link.href} onClick={(e) => handleNavigate(e, pageId)}>
                  {link.label}
                </a>
              );
            })}
          </div>
          <div className="infusion-footer-col">
            <div className="infusion-newsletter-form">
              <div className="infusion-newsletter-input-group">
                <input type="email" placeholder={footer.newsletter.placeholder} className="infusion-newsletter-input" />
                <button className="infusion-newsletter-btn">{footer.newsletter.button}</button>
              </div>
              <label className="infusion-newsletter-check">
                <input type="checkbox" />
                {footer.newsletter.disclaimer}
              </label>
            </div>
          </div>
        </div>

        <div className="infusion-footer-bottom">
          <div className="infusion-footer-bottom-left">
            <svg className="infusion-footer-leaf" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 2c-3 0-6 2.5-7.5 5.5C8.5 4.5 5.5 2 2.5 2 2 4.5 3 8 5.5 10c-1.5 1-4.5 1.5-4.5 4.5 3 0 6-1 7.5-3 1.5 2 4.5 3 7.5 3 .5-2.5-.5-6-3-8 2.5-1 5.5-1.5 5.5-4.5zM10 13c-1.5 1.5-4 2-6 2 1-1.5 2-3.5 1.5-5.5C7.5 10.5 9.5 12 10 13zm5.5-5.5c-1-1.5-3-2.5-5-2.5.5-2 1.5-4 3.5-5 1 2 2.5 3.5 2 5.5-1.5.5-2.5 1.5-2 2.5-.5 0-1-.5-.5-.5z"/></svg>
            <div className="infusion-footer-socials">
              {header.social.map((s: any, idx: number) => (
                <a key={idx} href={s.href}>
                  {/* Reuse header icons */}
                  {s.icon === 'facebook' && (
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V15.3h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 3.3h-2.33v6.579C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
                  )}
                  {s.icon === 'instagram' && (
                    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  )}
                  {s.icon === 'twitter' && (
                    <svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        
        <div className="infusion-footer-copyright">
          <span>{footer.copyright}</span>
          <div className="infusion-footer-copyright-links">
            {footer.bottomLinks.map((link: any, idx: number) => {
              const pageId = link.href.replace('#', '') || 'home';
              return (
                <a key={idx} href={link.href} onClick={(e) => handleNavigate(e, pageId)}>
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  </div>
);
}
