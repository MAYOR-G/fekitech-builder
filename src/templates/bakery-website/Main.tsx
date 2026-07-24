import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Specialties from "./components/Specialties";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import DripDivider from "./components/DripDivider";

export default function Main() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full overflow-hidden font-sans">
        <Hero />
        <DripDivider color="#ffffff" bgColor="#faf9f6" direction="down" />
        <Specialties />
        <DripDivider color="#faf9f6" bgColor="var(--color-primary)" direction="down" />
        <About />
        <DripDivider color="var(--color-primary)" bgColor="#ffffff" direction="down" />
        <Gallery />
        <DripDivider color="#ffffff" bgColor="var(--color-secondary)" direction="down" />
        <Testimonials />
        <DripDivider color="var(--color-secondary)" bgColor="#ffffff" direction="down" />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
