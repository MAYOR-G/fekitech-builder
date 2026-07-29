import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Approach from "./components/Approach";
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function Main() {
  return (
    <div className="font-sans bg-[#F7F5F0] text-[#3C2A21] min-h-screen selection:bg-[#556B2F] selection:text-[#F7F5F0]">
      <Header />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
