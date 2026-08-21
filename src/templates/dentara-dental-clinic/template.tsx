"use client";
import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Services } from "./components/Services";
import { Features } from "./components/Features";
import { ResultsSlider } from "./components/ResultsSlider";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Booking } from "./components/Booking";
import { Footer } from "./components/Footer";
import { TemplateData as LocalTemplateData, TemplateProvider } from "./TemplateContext";
import { type TemplateData } from "@/lib/template-data";
import "./index.css";

export default function DentaraDentalClinicTemplate({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider value={data as LocalTemplateData}>
      <div data-template-id="dentara-dental-clinic" className="dentara-dental-clinic min-h-screen bg-white text-[#2f2f2f]">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Services />
        <Features />
        <ResultsSlider />
        <Team />
        <Testimonials />
        <FAQ />
        <Booking />
        <Footer />
      </div>
    </TemplateProvider>
  );
}
