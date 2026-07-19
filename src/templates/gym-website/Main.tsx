"use client";
import React from 'react';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import PinnedHorizontalScroll from './components/PinnedHorizontalScroll';
import Trainers from './components/Trainers';
import InteractiveProgressSlider from './components/InteractiveProgressSlider';
import StickyBackground from './components/StickyBackground';
import ClassSchedule from './components/ClassSchedule';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import VideoBlock from './components/VideoBlock';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gym-dark text-white font-sans selection:bg-gym-accent selection:text-gym-darker">
      <header className="fixed top-0 w-full z-50 glass-panel border-b-0 py-4 px-6 flex justify-between items-center transition-all">
        <div className="font-display font-black text-2xl tracking-tighter text-white">FORGE<span className="text-gym-accent">.</span></div>
        <nav className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-300">
          <a href="#about" className="hover:text-gym-accent transition-colors">About</a>
          <a href="#programs" className="hover:text-gym-accent transition-colors">Programs</a>
          <a href="#trainers" className="hover:text-gym-accent transition-colors">Trainers</a>
          <a href="#schedule" className="hover:text-gym-accent transition-colors">Schedule</a>
        </nav>
        <button className="bg-gym-accent text-gym-darker font-bold px-6 py-2 rounded-full hover:bg-gym-accentHover transition-colors uppercase tracking-widest text-sm">
          Join Now
        </button>
      </header>

      <main>
        <Hero />
        <TrustStrip />
        <About />
        <PinnedHorizontalScroll />
        <Trainers />
        <InteractiveProgressSlider />
        <StickyBackground />
        <ClassSchedule />
        <Pricing />
        <Testimonials />
        <VideoBlock />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

export default App;
