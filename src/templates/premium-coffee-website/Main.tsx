"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import CoffeeJourney from './components/CoffeeJourney';
import Locations from './components/Locations';
import Wholesale from './components/Wholesale';
import SeasonalRoasts from './components/SeasonalRoasts';
import BaristaSchool from './components/BaristaSchool';
import FromRoastHouse from './components/FromRoastHouse';
import Mosaic from './components/Mosaic';
import NewsletterMarquee from './components/NewsletterMarquee';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="bg-brand-black min-h-screen text-brand-cream font-body selection:bg-brand-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <CoffeeJourney />
        <Locations />
        <Wholesale />
        <SeasonalRoasts />
        <BaristaSchool />
        <FromRoastHouse />
        <Mosaic />
        <NewsletterMarquee />
      </main>
      <Footer />
    </div>
  );
}

export default App;
