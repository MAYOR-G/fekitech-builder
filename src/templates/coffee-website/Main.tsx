"use client";
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BrandIntro from './components/BrandIntro';
import StorytellingAbout from './components/StorytellingAbout';
import FeaturedMenu from './components/FeaturedMenu';
import PinnedHorizontalScroll from './components/PinnedHorizontalScroll';
import CafeAtmosphere from './components/CafeAtmosphere';
import Products from './components/Products';
import Testimonials from './components/Testimonials';
import VisitUs from './components/VisitUs';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './index.css';
import { useTemplateData } from './TemplateContext';

function App() {
  const siteContent = useTemplateData();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-artisan-coffee-coffee-light text-artisan-coffee-coffee-dark font-artisan-coffee-sans selection:bg-artisan-coffee-coffee-terracotta selection:text-artisan-coffee-coffee-light">
      <header 
        className={`fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'bg-artisan-coffee-coffee-light/95 backdrop-blur-md border-b border-artisan-coffee-coffee-brown/10 shadow-sm py-3' : 'bg-artisan-coffee-coffee-light/90 text-artisan-coffee-coffee-dark border-b border-artisan-coffee-coffee-brown/10 backdrop-blur-md'
        }`}
      >
        <div className="font-artisan-coffee-serif font-bold text-xl tracking-tight text-artisan-coffee-coffee-dark sm:text-2xl">
          {siteContent.brand.name}<span className="text-artisan-coffee-coffee-terracotta">.</span>
        </div>
        <nav className="hidden gap-8 text-sm font-medium uppercase tracking-widest text-artisan-coffee-coffee-dark/80 md:flex">
          <a href="#about" className="hover:text-artisan-coffee-coffee-terracotta transition-colors">Our Story</a>
          <a href="#menu" className="hover:text-artisan-coffee-coffee-terracotta transition-colors">Menu</a>
          <a href="#journey" className="hover:text-artisan-coffee-coffee-terracotta transition-colors">Journey</a>
          <a href="#visit" className="hover:text-artisan-coffee-coffee-terracotta transition-colors">Visit</a>
        </nav>
        <a 
          href="#visit"
          className="hidden border border-artisan-coffee-coffee-dark px-6 py-2 text-xs font-medium uppercase tracking-widest text-artisan-coffee-coffee-dark transition-colors hover:bg-artisan-coffee-coffee-dark hover:text-artisan-coffee-coffee-light sm:block"
        >
          Find Us
        </a>
      </header>

      <main>
        <Hero />
        <BrandIntro />
        <StorytellingAbout />
        <FeaturedMenu />
        <PinnedHorizontalScroll />
        <CafeAtmosphere />
        <Products />
        <Testimonials />
        <VisitUs />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default App;
