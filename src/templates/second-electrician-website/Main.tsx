"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SmartHome from './components/SmartHome';
import Precision from './components/Precision';
import Process from './components/Process';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="bg-electric-bg min-h-screen text-electric-text font-sans overflow-x-clip selection:bg-electric-amber selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <SmartHome />
      <Precision />
      <Process />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
