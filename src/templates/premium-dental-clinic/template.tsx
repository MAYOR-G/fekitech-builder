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
import { TemplateData as LocalTemplateData, TemplateProvider } from "./TemplateContext";
import { type TemplateData } from "@/lib/template-data";
import "./index.css";

export default function PremiumDentalClinicTemplate({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider value={data as LocalTemplateData}>
      <div className="premium-dental-clinic font-sans bg-[#f9f8f6] text-[#222222]">
        <Navbar />
        <Hero />
        <ValueProp />
        <Services />
        <VideoFeature />
        <BeforeAfter />
        <FeaturesAccordion />
        <Reviews />
        <FAQ />
        <Location />
        <Footer />
      </div>
    </TemplateProvider>
  );
}
