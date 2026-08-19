"use client";

import React from "react";
import { LocalTemplateData, TemplateProvider } from "./TemplateContext";
import { type TemplateData } from "@/lib/template-data";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Programs } from "./components/Programs";
import { Footer } from "./components/Footer";

export default function PremiumFitnessCoachTemplate({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider value={data as LocalTemplateData}>
      <div data-template-id="premium-fitness-coach" className="premium-fitness-coach">
        <Navbar />
        <Hero />
        <About />
        <Programs />
        <Footer />
      </div>
    </TemplateProvider>
  );
}
