"use client";
import React, { useState } from 'react';
import { useTemplateData } from './TemplateContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Features from './components/Features';
import Logos from './components/Logos';
import Stats from './components/Stats';
import Team from './components/Team';
import CTA from './components/CTA';
import Benefits from './components/Benefits';
import Pricing from './components/Pricing';
import Banner from './components/Banner';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Main() {
  const data = useTemplateData();
  const [activePage, setActivePage] = useState("Home");

  const themeStyles = {
    "--color-primary": data.colors.primary,
    "--color-secondary": data.colors.secondary,
    "--color-accent": data.colors.accent,
    "--color-text": data.colors.text,
    "--color-background": data.colors.background,
  } as React.CSSProperties;

  const renderPage = () => {
    switch (activePage) {
      case "Home":
        return (
          <>
            <Hero />
            <About />
            <Services />
            <Projects />
            <Features />
            <Logos />
            <Stats />
            <Team />
            <CTA />
            <Benefits />
            <Pricing />
            <Banner />
            <Blog />
            <Contact />
          </>
        );
      case "About":
        return (
          <>
            <div className="pt-32 pb-16 bg-[var(--color-secondary)] text-white text-center">
              <h1 className="text-5xl font-bold">About Us</h1>
            </div>
            <About />
            <Stats />
            <Team />
            <CTA />
          </>
        );
      case "Services":
        return (
          <>
            <div className="pt-32 pb-16 bg-[var(--color-secondary)] text-white text-center">
              <h1 className="text-5xl font-bold">Our Services</h1>
            </div>
            <Services />
            <Features />
            <Benefits />
            <Pricing />
          </>
        );
      case "News & Insights":
        return (
          <>
            <div className="pt-32 pb-16 bg-[var(--color-secondary)] text-white text-center">
              <h1 className="text-5xl font-bold">News & Insights</h1>
            </div>
            <Blog />
          </>
        );
      case "Contact Us":
        return (
          <>
            <div className="pt-32 pb-16 bg-[var(--color-secondary)] text-white text-center">
              <h1 className="text-5xl font-bold">Contact Us</h1>
            </div>
            <Contact />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div style={themeStyles} className="premium-construction-template min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans flex flex-col overflow-x-hidden antialiased">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        .premium-construction-template ::selection {
          background-color: var(--color-primary);
          color: white;
        }
      `}} />
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setActivePage={setActivePage} />
    </div>
  );
}
