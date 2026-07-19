"use client";
import { bindTemplateContent, mergeTemplateData, readTemplateTextGroup, type TemplateData } from "@/lib/template-data";
import React from "react";
import { TemplateContext } from "./TemplateContext";
import editableData from "./editable.json";
import * as staticContent from "./data/siteContent";

import { CTA } from "./components/CTA";
import { EventInquiry } from "./components/EventInquiry";
import { FAQ } from "./components/FAQ";
import { FeatureCard } from "./components/FeatureCard";
import { Footer } from "./components/Footer";
import { GalleryCard } from "./components/GalleryCard";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PackageCard } from "./components/PackageCard";
import { ProcessStep } from "./components/ProcessStep";
import { SectionHeader } from "./components/SectionHeader";
import { ServiceCard } from "./components/ServiceCard";
import { TestimonialCard } from "./components/TestimonialCard";
const themeStyles = {
  "--color-white": "#ffffff",
  "--color-black": "#0a0a0a",
  "--color-charcoal": "#171717",
  "--color-cream": "#f5f5f0",
  "--color-stone": "#2a2a2a",
} as React.CSSProperties;

export default function CateringWebsiteTemplate({ data }: { data: TemplateData }) {
  const templateData = bindTemplateContent(staticContent, mergeTemplateData(editableData, data));
  const about = readTemplateTextGroup(templateData, "about");

  return (
    <TemplateContext.Provider value={templateData}>
      <div style={themeStyles} className="template-wrapper min-h-screen bg-white text-black font-sans">
        <Navbar />
        <Hero />
        <section className="bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold">About the studio</p>
            <h2 className="mt-5 font-display text-5xl font-medium text-charcoal">{about.title}</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink">{about.text}</p>
          </div>
        </section>
        <section id="services" className="bg-charcoal px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="What we do" title="Considered catering for memorable gatherings" dark />
            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {templateData.features.map((feature) => <FeatureCard key={feature.title} feature={feature} />)}
            </div>
            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {templateData.services.map((service) => <ServiceCard key={service.title} service={service} />)}
            </div>
          </div>
        </section>
        <section className="bg-linen px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Packages" title="Flexible service, shaped around your event" />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {templateData.packages.map((item) => <PackageCard key={item.name} item={item} />)}
            </div>
          </div>
        </section>
        <section className="bg-white px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Our process" title="A calm path from first conversation to final course" />
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {templateData.processSteps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}
            </div>
          </div>
        </section>
        <section className="bg-charcoal px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Recent tables" title="Food, atmosphere, and details in harmony" dark />
            <div className="mt-14 grid auto-rows-[20rem] gap-5 md:grid-cols-2 lg:grid-cols-3">
              {templateData.galleryItems.map((item, index) => <GalleryCard key={item.title} item={item} featured={index === 0} />)}
            </div>
          </div>
        </section>
        <section className="bg-linen px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-3">
            {templateData.testimonials.map((testimonial) => <TestimonialCard key={testimonial.name} testimonial={testimonial} />)}
          </div>
        </section>
        <EventInquiry />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </TemplateContext.Provider>
  );
}
