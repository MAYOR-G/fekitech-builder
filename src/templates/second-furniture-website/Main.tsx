"use client";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Craft from './components/Craft';
import Collections from './components/Collections';
import Materials from './components/Materials';
import Transformation from './components/Transformation';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="bg-furniture-bg min-h-screen text-furniture-text font-sans overflow-x-clip selection:bg-furniture-ochre selection:text-white">
      <Navbar />
      <Hero />
      <Craft />
      <Collections />
      <Materials />
      <Transformation />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
