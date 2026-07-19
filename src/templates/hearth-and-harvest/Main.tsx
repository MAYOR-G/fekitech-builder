"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SignatureDishes from "./components/SignatureDishes";
import TheJourney from "./components/TheJourney";
import Locations from "./components/Locations";
import Catering from "./components/Catering";
import SeasonalMenu from "./components/SeasonalMenu";
import Masterclasses from "./components/Masterclasses";
import Delivery from "./components/Delivery";
import DualBanner from "./components/DualBanner";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import './index.css';

export default function Home() {
  return (
    <main className="bg-brand-dark min-h-screen">
      <Navbar />
      <Hero />
      <SignatureDishes />
      <TheJourney />
      <Locations />
      <Catering />
      <SeasonalMenu />
      <Masterclasses />
      <Delivery />
      <DualBanner />
      <Newsletter />
      <Footer />
    </main>
  );
}
