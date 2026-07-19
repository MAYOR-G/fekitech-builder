"use client";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Treatments from "./components/Treatments";
import Experience from "./components/Experience";
import Transformations from "./components/Transformations";
import Retreats from "./components/Retreats";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import GiftCards from "./components/GiftCards";
import BookingCTA from "./components/BookingCTA";
import './index.css';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-white">
      <Hero />
      <Intro />
      <Treatments />
      <Experience />
      <Transformations />
      <Retreats />
      <Pricing />
      <Testimonials />
      <Team />
      <GiftCards />
      <BookingCTA />
    </main>
  );
}
