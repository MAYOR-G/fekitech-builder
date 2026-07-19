"use client";
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Services from './components/Services';
import Listings from './components/Listings';
import Difference from './components/Difference';
import Landlord from './components/Landlord';
import Neighborhoods from './components/Neighborhoods';
import Testimonials from './components/Testimonials';
import Insights from './components/Insights';
import Team from './components/Team';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal">
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Listings />
        <Difference />
        <Landlord />
        <Neighborhoods />
        <Testimonials />
        <Insights />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
