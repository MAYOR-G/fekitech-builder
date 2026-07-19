"use client";
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Industries from './components/Industries';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Results from './components/Results';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="font-sans text-charcoal bg-cream antialiased selection:bg-gold-500 selection:text-forest-900 min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Industries />
        <Team />
        <Testimonials />
        <Results />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
