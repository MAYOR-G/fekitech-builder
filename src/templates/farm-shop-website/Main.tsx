import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import Storytelling from "./components/Storytelling";
import Categories from "./components/Categories";
import Mission from "./components/Mission";
import Farmers from "./components/Farmers";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";

export default function Main() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Storytelling />
        <Categories />
        <Mission />
        <Farmers />
        <Gallery />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
