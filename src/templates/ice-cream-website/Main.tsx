import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Welcome from "./components/Welcome";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";
import Footer from "./components/Footer";
import DripDivider from "./components/DripDivider";

export default function Main() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <Hero />
        <DripDivider color="#faf9f6" bgColor="#ffffff" direction="down" />
        <Highlights />
        <DripDivider color="#ffffff" bgColor="#faf9f6" direction="down" />
        <Welcome />
        <DripDivider color="#faf9f6" bgColor="#ffffff" direction="down" />
        <Gallery />
        <DripDivider color="#ffffff" bgColor="var(--color-secondary)" direction="down" />
        <Services />
        <DripDivider color="var(--color-secondary)" bgColor="#faf9f6" direction="down" />
        <Testimonials />
        <DripDivider color="#faf9f6" bgColor="#ffffff" direction="down" />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
