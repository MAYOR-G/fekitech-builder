"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustStrip from './components/TrustStrip';
import About from './components/About';
import ServicesList from './components/ServicesList';
import Transformations from './components/Transformations';
import Lookbook from './components/Lookbook';
import Team from './components/Team';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="bg-brand-black min-h-screen text-brand-cream selection:bg-brand-accent selection:text-brand-black">
      <Navbar />
      <Hero />
      <TrustStrip />
      <About />
      <ServicesList />
      <Transformations />
      <Lookbook />
      <Team />
      
      {/* Booking CTA Section */}
      <section id="booking" className="py-32 px-6 bg-brand-accent text-brand-black text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-heading mb-6 leading-tight uppercase">Ready for a transformation?</h2>
          <p className="text-xl mb-12 opacity-80">Book your session today and experience premium grooming.</p>
          <a href="#" className="inline-block bg-brand-black text-brand-cream px-12 py-5 font-bold tracking-widest uppercase hover:bg-brand-charcoal transition-colors text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-300">
            Secure Your Slot
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
