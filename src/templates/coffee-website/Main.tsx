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

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-coffee-light text-coffee-dark font-sans selection:bg-coffee-terracotta selection:text-coffee-light">
      <header 
        className={`fixed top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'bg-coffee-light/90 backdrop-blur-md border-b border-coffee-brown/10 shadow-sm py-3' : 'bg-transparent text-coffee-light'
        }`}
      >
        <div className={`font-serif font-bold text-2xl tracking-tight ${isScrolled ? 'text-coffee-dark' : 'text-coffee-light'}`}>
          COFFEE CRAFTED<span className="text-coffee-terracotta">.</span>
        </div>
        <nav className={`hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest ${isScrolled ? 'text-coffee-dark/80' : 'text-coffee-light/90'}`}>
          <a href="#about" className="hover:text-coffee-terracotta transition-colors">Our Story</a>
          <a href="#menu" className="hover:text-coffee-terracotta transition-colors">Menu</a>
          <a href="#journey" className="hover:text-coffee-terracotta transition-colors">Journey</a>
          <a href="#visit" className="hover:text-coffee-terracotta transition-colors">Visit</a>
        </nav>
        <a 
          href="#visit"
          className={`border px-6 py-2 rounded-none font-medium transition-colors uppercase tracking-widest text-xs hidden sm:block ${
            isScrolled 
              ? 'border-coffee-dark text-coffee-dark hover:bg-coffee-dark hover:text-coffee-light' 
              : 'border-coffee-light text-coffee-light hover:bg-coffee-light hover:text-coffee-dark'
          }`}
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
