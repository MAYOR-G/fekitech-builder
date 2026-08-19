"use client";

import React from "react";
import { TemplateData as LocalTemplateData, TemplateProvider } from "./TemplateContext";
import { type TemplateData } from "@/lib/template-data";
import "./index.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";

export default function SushiBarPremiumTemplate({ data }: { data: TemplateData }) {
  return (
    <TemplateProvider value={data as LocalTemplateData}>
      <div data-template-id="sushi-bar-premium" className="sushi-bar-premium">
        <Navbar />
        <Hero />
        <About />
        <Menu />
        <Footer />
      </div>
    </TemplateProvider>
  );
}
