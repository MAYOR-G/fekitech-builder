"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="bg-plumber-bg min-h-screen text-plumber-text font-sans overflow-x-clip selection:bg-plumber-copper selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <BeforeAfter />
      <Process />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default App;
