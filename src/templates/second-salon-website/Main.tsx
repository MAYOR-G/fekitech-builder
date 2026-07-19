"use client";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Services from "./components/Services";
import Lookbook from "./components/Lookbook";
import Transformations from "./components/Transformations";
import Team from "./components/Team";
import Testimonials from "./components/Testimonials";
import BookingCTA from "./components/BookingCTA";
import './index.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <Lookbook />
      <Transformations />
      <Team />
      <Testimonials />
      <BookingCTA />
    </>
  );
}
