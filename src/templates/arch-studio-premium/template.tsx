"use client";

import React from "react";
import { TemplateData as LocalTemplateData, TemplateProvider } from "./TemplateContext";
import { type TemplateData } from "@/lib/template-data";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Footer } from "./components/Footer";

export default function ArchStudioPremiumTemplate({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider value={data as LocalTemplateData}>
      <div data-template-id="arch-studio-premium" className="arch-studio-premium">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Footer />
      </div>
    </TemplateProvider>
  );
}
