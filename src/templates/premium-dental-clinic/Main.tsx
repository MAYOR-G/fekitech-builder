"use client";
import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ValueProp } from "./components/ValueProp";
import { Services } from "./components/Services";
import { VideoFeature } from "./components/VideoFeature";
import { BeforeAfter } from "./components/BeforeAfter";
import { FeaturesAccordion } from "./components/FeaturesAccordion";
import { Reviews } from "./components/Reviews";
import { FAQ } from "./components/FAQ";
import { Location } from "./components/Location";
import { Footer } from "./components/Footer";

export default function Main() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ValueProp />
        <Services />
        <VideoFeature />
        <BeforeAfter />
        <FeaturesAccordion />
        <Reviews />
        <FAQ />
        <Location />
      </main>
      <Footer />
    </>
  );
}
