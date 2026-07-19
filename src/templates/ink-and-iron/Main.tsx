"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import AboutSplit from "./components/AboutSplit";
import ServicesPreview from "./components/ServicesPreview";
import Portfolio from "./components/Portfolio";
import BookingCTA from "./components/BookingCTA";
import Footer from "./components/Footer";
import './index.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A0A0A] text-white overflow-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <AboutSplit />
      <ServicesPreview />
      <Portfolio />
      <BookingCTA />
      <Footer />
    </main>
  );
}
