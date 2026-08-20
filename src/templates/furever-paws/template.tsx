"use client";
import React from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { Services } from "./components/Services";
import { Gallery } from "./components/Gallery";
import { Welcome } from "./components/Welcome";
import { FAQ } from "./components/FAQ";
import { Testimonials } from "./components/Testimonials";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import { TemplateData as LocalTemplateData, TemplateProvider } from "./TemplateContext";
import { type TemplateData } from "@/lib/template-data";
import "./index.css";

export default function FureverPawsTemplate({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider value={data as LocalTemplateData}>
      <div data-template-id="furever-paws" className="furever-paws">
        <Navbar />
        <Hero />
        <WhyChooseUs />
        <Services />
        <Gallery />
        <Welcome />
        <FAQ />
        <Testimonials />
        <CTABanner />
        <Footer />
      </div>
    </TemplateProvider>
  );
}
