"use client";
import { AboutClinic } from "./components/AboutClinic";
import { AppointmentCTA } from "./components/AppointmentCTA";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HorizontalJourney } from "./components/HorizontalJourney";
import { Navbar } from "./components/Navbar";
import { Results } from "./components/Results";
import { Services } from "./components/Services";
import { StickyStory } from "./components/StickyStory";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import { TrustStrip } from "./components/TrustStrip";
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-clinic-wash font-body text-ink">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <AboutClinic />
        <Services />
        <HorizontalJourney />
        <StickyStory />
        <Results />
        <Team />
        <Testimonials />
        <AppointmentCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default App;
