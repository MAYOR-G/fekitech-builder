"use client";
import React, { useEffect } from 'react';
import { useTemplateData } from './TemplateContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import Footer from './components/Footer';

export default function Main() {
  const data = useTemplateData();

  useEffect(() => {
    // Inject CSS variables for colors
    const root = document.documentElement;
    root.style.setProperty('--color-primary', data.colors.primary);
    root.style.setProperty('--color-secondary', data.colors.secondary);
    root.style.setProperty('--color-accent', data.colors.accent);
    root.style.setProperty('--color-text', data.colors.text);
    root.style.setProperty('--color-background', data.colors.background);
  }, [data.colors]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-sans flex flex-col overflow-x-hidden antialiased">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        
        .font-sans {
          font-family: 'Inter', sans-serif;
        }

        ::selection {
          background-color: var(--color-primary);
          color: white;
        }
      `}} />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Testimonials />
        <Team />
      </main>
      <Footer />
    </div>
  );
}
