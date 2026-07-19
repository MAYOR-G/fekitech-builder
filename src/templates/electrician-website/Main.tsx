"use client";
import { EmergencyBanner } from "./components/EmergencyBanner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServicesSection } from "./components/ServicesSection";
import { WhyChooseUsSection } from "./components/WhyChooseUsSection";
import { ProcessSection } from "./components/ProcessSection";
import { PricingSection } from "./components/PricingSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { CtaSection } from "./components/CtaSection";
import { Footer } from "./components/Footer";
import { motion } from "motion/react";
import './index.css';

import { useTemplateData } from "./TemplateContext";
export function App() {
  const { credentialBadges, serviceAreas } = useTemplateData();

  return (
    <div className="flex min-h-screen flex-col font-body text-navy bg-cloud selection:bg-safety/30">
      <EmergencyBanner />
      <Navbar />

      <main className="flex-1">
        <Hero />
        
        {/* Credential Badges Banner */}
        <div className="border-y border-white/10 bg-midnight px-5 py-6 sm:py-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-4 sm:gap-x-12 lg:justify-between">
            {credentialBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  key={badge.label}
                  className="flex items-center gap-3"
                >
                  <Icon className="h-5 w-5 text-safety" aria-hidden="true" />
                  <span className="text-sm font-bold tracking-tight text-white/90">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <ServicesSection />
        <WhyChooseUsSection />
        <ProcessSection />
        <PricingSection />
        <ReviewsSection />
        
        {/* Service Areas Banner */}
        <section className="bg-mist px-5 py-12 lg:px-8 border-y border-slate-200">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 mb-6">
              Active Service Areas
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {serviceAreas.map((area, idx) => (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={area}
                  className="rounded-full bg-white px-4 py-2 text-sm font-bold text-navy shadow-sm border border-slate-200"
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;
