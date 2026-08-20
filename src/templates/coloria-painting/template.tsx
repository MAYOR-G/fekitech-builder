"use client";

import React, { useState } from "react";
import { mergeTemplateData, type TemplateData } from "@/lib/template-data";
import defaults from "./editable.json";
import "./index.css";
import {
  Phone,
  Mail,
  MapPin,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
  Clock,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  Award
} from "lucide-react";

function PaintBrushIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
      <path d="M15 13 9 7l4-4 6 6z" />
      <path d="M18 10l-1.5-1.5" />
    </svg>
  );
}

function PaintRollerIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="6" x="2" y="2" rx="2" />
      <path d="M10 16v-2a2 2 0 0 1 2-2h6a2 2 0 0 0 2-2V5" />
      <rect width="4" height="6" x="8" y="16" rx="1" />
    </svg>
  );
}

type ColoriaData = typeof defaults;

export default function ColoriaPaintingTemplate({ data }: { data?: TemplateData }) {
  const content = (data ? mergeTemplateData(defaults, data) : defaults) as ColoriaData;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All Projects");

  const colors = content.theme?.colors || defaults.theme.colors;
  const CSS_VARS = {
    "--color-page": colors.page || "#ffffff",
    "--color-section": colors.section || "#f8f3ec",
    "--color-surface": colors.surface || "#ffffff",
    "--color-card": colors.card || "#ffffff",
    "--color-heading": colors.heading || "#131126",
    "--color-body": colors.body || "#3f4051",
    "--color-muted": colors.muted || "#6b7280",
    "--color-accent": colors.accent || "#ff6c1f",
    "--color-accent-hover": "#e5560e",
    "--color-accent-light": "#fff3ec",
    "--color-border": colors.border || "#e8dfd4",
    "--color-dark-bg": colors.footerBg || "#0d1117",
    "--font-heading": `"${content.theme?.fontHeading || defaults.theme.fontHeading}", sans-serif`,
    "--font-body": `"${content.theme?.fontBody || defaults.theme.fontBody}", sans-serif`,
  } as React.CSSProperties;

  const filteredProjects = content.projects?.items?.filter((project) => {
    if (selectedFilter === "All Projects") return true;
    if (selectedFilter === "Residential") return project.category.includes("Residential") || project.category.includes("Interior");
    if (selectedFilter === "Commercial") return project.category.includes("Commercial") || project.category.includes("Office");
    if (selectedFilter === "Exterior") return project.category.includes("Exterior");
    if (selectedFilter === "Specialist") return project.category.includes("Specialist") || project.category.includes("Feature") || project.category.includes("Heritage");
    return true;
  }) || [];

  return (
    <div data-template-id="coloria-painting" className="coloria-painting min-h-screen" style={CSS_VARS}>
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#131126] text-white/90 text-xs md:text-sm py-2.5 px-4 border-b border-white/10">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="w-2 h-2 rounded-full bg-[#ff6c1f] animate-pulse inline-block" />
            <span>{content.topBar?.announcement}</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-white/80">
            <a href={`mailto:${content.topBar?.email}`} className="flex items-center gap-1.5 hover:text-[#ff6c1f]">
              <Mail className="w-3.5 h-3.5 text-[#ff6c1f]" />
              <span>{content.topBar?.email}</span>
            </a>
            <a href={`tel:${content.topBar?.phone}`} className="flex items-center gap-1.5 hover:text-[#ff6c1f]">
              <Phone className="w-3.5 h-3.5 text-[#ff6c1f]" />
              <span>{content.topBar?.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8dfd4]/80 shadow-sm transition-all">
        <div className="container-custom flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff6c1f] to-[#f8a849] flex items-center justify-center text-white shadow-md shadow-[#ff6c1f]/20 group-hover:scale-105 transition-transform">
              <PaintBrushIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-[#131126] font-['Instrument_Sans']">
                {content.brand?.name || "Coloria"}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#ff6c1f] font-semibold -mt-1">
                Decorators London
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {content.navigation?.links?.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-[15px] font-medium text-[#3f4051] hover:text-[#ff6c1f] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#ff6c1f] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${content.brand?.phone}`}
              className="hidden xl:flex items-center gap-2 text-sm font-semibold text-[#131126] hover:text-[#ff6c1f] py-2 px-3 rounded-full hover:bg-black/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#fff3ec] flex items-center justify-center text-[#ff6c1f]">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="block text-[11px] font-normal text-[#6b7280] -mb-1">Call Us 24/7</span>
                <span>{content.brand?.phone}</span>
              </div>
            </a>
            <a
              href={content.navigation?.ctaHref || "#contact"}
              className="btn-primary"
            >
              <span>{content.navigation?.ctaLabel || "Get a Free Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-gray-100 text-[#131126] hover:bg-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#e8dfd4] px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              {content.navigation?.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#131126] hover:text-[#ff6c1f] py-2 border-b border-gray-100 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              ))}
            </nav>
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`tel:${content.brand?.phone}`}
                className="flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 text-sm font-semibold text-[#131126]"
              >
                <Phone className="w-4 h-4 text-[#ff6c1f]" />
                <span>Call {content.brand?.phone}</span>
              </a>
              <a
                href={content.navigation?.ctaHref || "#contact"}
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full text-center"
              >
                <span>{content.navigation?.ctaLabel || "Get a Free Quote"}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. HERO SECTION */}
      <section id="home" className="hero-section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[560px]">
            
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start z-10">
              
              {/* Badge */}
              <div className="badge-pill mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.hero?.badge || "Top-Rated Decorators in West London"}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#131126] tracking-tight leading-[1.12] mb-6">
                <span className="block">{content.hero?.titleLine1 || "Professional"}</span>
                <span className="block text-[#ff6c1f]">{content.hero?.titleLine2 || "Painting Services"}</span>
                <span className="block">{content.hero?.titleLine3 || "in West London"}</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#3f4051] max-w-xl mb-8 leading-relaxed">
                {content.hero?.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <a
                  href={content.hero?.primaryCtaHref || "#contact"}
                  className="btn-primary w-full sm:w-auto"
                >
                  <span>{content.hero?.primaryCta || "Get a Free Quote"}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={content.hero?.secondaryCtaHref || "#projects"}
                  className="btn-secondary w-full sm:w-auto"
                >
                  <span>{content.hero?.secondaryCta || "View Our Work"}</span>
                </a>
              </div>

              {/* Social Proof & Rating Box */}
              <div className="bg-white/80 backdrop-blur-sm border border-[#e8dfd4] rounded-2xl p-4 sm:p-5 flex flex-wrap items-center gap-4 shadow-sm">
                <div className="flex -space-x-2.5">
                  {content.hero?.socialProof?.avatars?.map((avatar, idx) => (
                    <img
                      key={idx}
                      src={avatar}
                      alt="Customer"
                      className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#ff6c1f] mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#ff6c1f]" />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#131126]">
                    {content.hero?.socialProof?.text}
                  </span>
                </div>
              </div>

              {/* Slider Preview Tabs */}
              {content.hero?.slidePreviews && (
                <div className="mt-8 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mr-1">
                    Featured Spaces:
                  </span>
                  {content.hero.slidePreviews.map((slide, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`hero-slider-thumb w-14 h-11 rounded-lg overflow-hidden border-2 relative ${
                        activeSlide === idx ? "active border-[#ff6c1f] ring-2 ring-[#ff6c1f]/20" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      title={slide.label}
                    >
                      <img src={slide.image} alt={slide.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Right Hero Image Column (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Decorative background glow circles */}
              <div className="absolute w-72 h-72 rounded-full bg-[#f8a849]/20 blur-3xl -top-10 -right-10 pointer-events-none" />
              <div className="absolute w-80 h-80 rounded-full bg-[#ff6c1f]/15 blur-3xl bottom-0 -left-10 pointer-events-none" />
              
              {/* Subtle architectural backdrop card */}
              <div className="relative w-full max-w-lg aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-white/60 bg-gradient-to-b from-[#f3eae0] to-[#e8ded3] flex items-end justify-center">
                
                {/* Background Room Preview */}
                {content.hero?.slidePreviews && content.hero.slidePreviews[activeSlide] && (
                  <img
                    src={content.hero.slidePreviews[activeSlide].image}
                    alt={content.hero.slidePreviews[activeSlide].label}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-opacity duration-500"
                  />
                )}

                {/* Hero Painter with Transparent Background */}
                <img
                  src={content.hero?.painterImage || "/templates/coloria-painting/hero-painter.png"}
                  alt="Professional Painter"
                  className="hero-painter-img relative z-10 max-h-[92%] object-contain"
                />

                {/* Floating Experience Badge */}
                <div className="absolute top-6 left-6 z-20 bg-white/95 backdrop-blur-md py-2 px-4 rounded-full border border-white shadow-lg flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#ff6c1f] text-white flex items-center justify-center">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-[#131126]">100% Dust-Free Guarantee</span>
                </div>

                {/* Floating Roller Tool Badge */}
                <div className="absolute bottom-6 right-6 z-20 bg-[#131126] text-white py-2 px-4 rounded-2xl shadow-xl flex items-center gap-2.5">
                  <PaintRollerIcon className="w-4 h-4 text-[#ff6c1f]" />
                  <div className="text-left">
                    <span className="block text-[10px] text-gray-400 font-medium leading-none">Paints Used</span>
                    <span className="text-xs font-bold text-white leading-tight">Dulux & Farrow</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. ABOUT / STATS & EXPERIENCE SECTION */}
      <section id="about" className="section-padding bg-[#f8f3ec]/60 border-y border-[#e8dfd4]/70">
        <div className="container-custom">
          
          {/* Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-5">
              <span className="section-tag">{content.about?.tag || "ABOUT US"}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight">
                {content.about?.title || "Excellence You Can Trust"}
              </h2>
            </div>
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-base sm:text-lg text-[#3f4051] leading-relaxed">
                {content.about?.description}
              </p>
            </div>
          </div>

          {/* 3-Image Mosaic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            <div className="rounded-3xl overflow-hidden h-72 sm:h-80 shadow-md border border-[#e8dfd4] group">
              <img
                src={content.about?.images?.woodPrep}
                alt="Wood prep and trim painting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-72 sm:h-80 shadow-md border border-[#e8dfd4] group sm:-translate-y-4">
              <img
                src={content.about?.images?.paintPots}
                alt="Fresh paint pots and rollers"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-3xl overflow-hidden h-72 sm:h-80 shadow-md border border-[#e8dfd4] group">
              <img
                src={content.about?.images?.painterAction}
                alt="Professional decorator rolling paint"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* 4 Counter Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.about?.stats?.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#e8dfd4] shadow-sm hover:border-[#ff6c1f] transition-all text-center flex flex-col items-center justify-center card-hover"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-[#ff6c1f] tracking-tight mb-2">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#131126] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[#6b7280]">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section id="services" className="section-padding bg-white">
        <div className="container-custom">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">{content.services?.tag || "SERVICES"}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-4">
              {content.services?.title}
            </h2>
            <p className="text-base sm:text-lg text-[#3f4051]">
              {content.services?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services?.items?.map((service, idx) => (
              <div key={idx} className="service-card card-hover shadow-sm group">
                <div className="img-wrapper relative">
                  <img src={service.image} alt={service.title} />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#ff6c1f] uppercase tracking-wider">
                    {service.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-bold text-[#131126] mb-3 group-hover:text-[#ff6c1f] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#6b7280] leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <a
                    href={service.linkHref || "#contact"}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#ff6c1f] group-hover:gap-3 transition-all pt-3 border-t border-gray-100"
                  >
                    <span>{service.linkText || "Learn More"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PROJECT PORTFOLIO SHOWCASE */}
      <section id="projects" className="section-padding bg-[#f8f3ec]">
        <div className="container-custom">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <span className="section-tag">{content.projects?.tag || "PORTFOLIO"}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-4">
                {content.projects?.title}
              </h2>
              <p className="text-base text-[#3f4051]">
                {content.projects?.description}
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {content.projects?.filterTabs?.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    selectedFilter === tab
                      ? "bg-[#131126] text-white shadow-md"
                      : "bg-white text-[#3f4051] border border-[#e8dfd4] hover:border-[#131126]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Masonry/Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
            
            {/* Card 1 (Large left) */}
            {filteredProjects[0] && (
              <div className="lg:col-span-7 project-card h-[400px] sm:h-[460px] shadow-md">
                <img src={filteredProjects[0].image} alt={filteredProjects[0].title} />
                <div className="project-overlay">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#ff6c1f] mb-1">
                    {filteredProjects[0].category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{filteredProjects[0].title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ff6c1f]" />
                      {filteredProjects[0].location}
                    </span>
                    <a
                      href={filteredProjects[0].linkHref || "#contact"}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#ff6c1f] backdrop-blur-md flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Card 2 (Top right) */}
            {filteredProjects[1] && (
              <div className="lg:col-span-5 project-card h-[400px] sm:h-[460px] shadow-md">
                <img src={filteredProjects[1].image} alt={filteredProjects[1].title} />
                <div className="project-overlay">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#ff6c1f] mb-1">
                    {filteredProjects[1].category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{filteredProjects[1].title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#ff6c1f]" />
                      {filteredProjects[1].location}
                    </span>
                    <a
                      href={filteredProjects[1].linkHref || "#contact"}
                      className="w-10 h-10 rounded-full bg-white/20 hover:bg-[#ff6c1f] backdrop-blur-md flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Card 3 (Bottom left) */}
            {filteredProjects[2] && (
              <div className="lg:col-span-4 project-card h-[380px] shadow-md">
                <img src={filteredProjects[2].image} alt={filteredProjects[2].title} />
                <div className="project-overlay">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#ff6c1f] mb-1">
                    {filteredProjects[2].category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{filteredProjects[2].title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#ff6c1f]" />
                      {filteredProjects[2].location}
                    </span>
                    <a
                      href={filteredProjects[2].linkHref || "#contact"}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#ff6c1f] backdrop-blur-md flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Card 4 (Bottom mid) */}
            {filteredProjects[3] && (
              <div className="lg:col-span-4 project-card h-[380px] shadow-md">
                <img src={filteredProjects[3].image} alt={filteredProjects[3].title} />
                <div className="project-overlay">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#ff6c1f] mb-1">
                    {filteredProjects[3].category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{filteredProjects[3].title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#ff6c1f]" />
                      {filteredProjects[3].location}
                    </span>
                    <a
                      href={filteredProjects[3].linkHref || "#contact"}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#ff6c1f] backdrop-blur-md flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Card 5 (Bottom right) */}
            {filteredProjects[4] && (
              <div className="lg:col-span-4 project-card h-[380px] shadow-md">
                <img src={filteredProjects[4].image} alt={filteredProjects[4].title} />
                <div className="project-overlay">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#ff6c1f] mb-1">
                    {filteredProjects[4].category}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{filteredProjects[4].title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#ff6c1f]" />
                      {filteredProjects[4].location}
                    </span>
                    <a
                      href={filteredProjects[4].linkHref || "#contact"}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-[#ff6c1f] backdrop-blur-md flex items-center justify-center text-white transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>

          <div className="text-center">
            <a href={content.projects?.ctaHref || "#contact"} className="btn-secondary">
              <span>{content.projects?.ctaText || "See More Projects"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* 7. PROCESS SECTION */}
      <section id="process" className="section-padding bg-white">
        <div className="container-custom">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">{content.process?.tag || "PROCESS"}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-4">
              {content.process?.title}
            </h2>
            <p className="text-base sm:text-lg text-[#3f4051]">
              {content.process?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.process?.steps?.map((step, idx) => (
              <div key={idx} className="process-card flex flex-col justify-between">
                <div>
                  <div className="process-num-badge font-['Instrument_Sans']">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-[#131126] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6b7280] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. TRUSTED PARTNER & WHY CHOOSE US */}
      <section className="section-padding bg-[#f8f3ec] border-t border-[#e8dfd4]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            <div className="lg:col-span-6">
              <span className="section-tag">{content.trustedPartner?.tag || "WHY CHOOSE US"}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-4">
                {content.trustedPartner?.title}
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-base sm:text-lg text-[#3f4051] leading-relaxed">
                {content.trustedPartner?.description}
              </p>
            </div>
          </div>

          {/* Paint Brand Partners */}
          <div className="bg-white rounded-2xl p-6 border border-[#e8dfd4] mb-12 shadow-sm">
            <div className="text-xs uppercase font-bold text-center text-gray-500 tracking-wider mb-6">
              Approved Applicator for Leading British & European Paint Brands
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-items-center opacity-85">
              {content.trustedPartner?.partnerLogos?.map((partner, idx) => (
                <div key={idx} className="h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all">
                  <img src={partner.icon} alt={partner.name} className="max-h-8 max-w-[140px] object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Big Team Painting Showcase Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white h-80 sm:h-[460px] group">
            <img
              src={content.trustedPartner?.showcaseImage}
              alt="Professional painting team at work"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8">
              <div className="bg-white/95 backdrop-blur-md py-3 px-6 rounded-full shadow-lg flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#ff6c1f]" />
                <span className="text-sm font-bold text-[#131126]">
                  {content.trustedPartner?.featureBadge || "Clean & Dust-Free Finish Guarantee"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. TESTIMONIALS SECTION */}
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-custom">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-tag">{content.testimonials?.tag || "TESTIMONIALS"}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-4">
              {content.testimonials?.title}
            </h2>
            <p className="text-base sm:text-lg text-[#3f4051]">
              {content.testimonials?.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {content.testimonials?.items?.map((item, idx) => {
              const isCenter = idx === 1;
              return (
                <div
                  key={idx}
                  className={`testimonial-card flex flex-col justify-between ${
                    isCenter
                      ? "bg-[#131126] text-white shadow-2xl scale-100 md:scale-105 border border-[#131126]"
                      : "bg-[#ffffff] text-[#3f4051] border border-[#e8dfd4] shadow-sm hover:border-[#ff6c1f]"
                  }`}
                >
                  <div>
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6 text-[#ff6c1f]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#ff6c1f]" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className={`text-base leading-relaxed mb-8 ${isCenter ? "text-white/90 italic" : "text-[#3f4051]"}`}>
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Author Details */}
                  <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#ff6c1f]"
                    />
                    <div className="flex flex-col">
                      <span className={`font-bold text-base ${isCenter ? "text-white" : "text-[#131126]"}`}>
                        {item.author}
                      </span>
                      <span className={`text-xs ${isCenter ? "text-gray-400" : "text-gray-500"}`}>
                        {item.role} • {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. BENEFITS SECTION */}
      <section className="section-padding bg-[#f8f3ec]/80 border-t border-[#e8dfd4]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-[#e8dfd4] h-[480px]">
                <img
                  src={content.benefits?.image}
                  alt="Quality painting benefits"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-[#e8dfd4] hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#fff3ec] flex items-center justify-center text-[#ff6c1f]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl font-black text-[#131126]">2-Year Warranty</div>
                  <div className="text-xs text-gray-500">On all interior & exterior painting</div>
                </div>
              </div>
            </div>

            {/* Right Benefit List */}
            <div className="lg:col-span-7">
              <span className="section-tag">{content.benefits?.tag || "BENEFITS"}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-8">
                {content.benefits?.title}
              </h2>

              <div className="space-y-6">
                {content.benefits?.items?.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-[#e8dfd4]/60 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-8 h-8 rounded-full bg-[#ff6c1f] text-white flex-shrink-0 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#131126] mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 11. CTA CONTACT BANNER */}
      <section id="contact" className="section-padding bg-white">
        <div className="container-custom">
          
          <div className="cta-banner p-8 sm:p-12 lg:p-16 border border-[#d6e3ee] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Content */}
              <div className="lg:col-span-7 z-10">
                <span className="badge-pill mb-4 bg-white/90 text-[#ff6c1f]">
                  {content.cta?.tag || "GET IN TOUCH"}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#131126] tracking-tight mb-6">
                  {content.cta?.title}
                </h2>
                <p className="text-base sm:text-lg text-[#3f4051] mb-8 max-w-lg leading-relaxed">
                  {content.cta?.description}
                </p>

                {/* Direct Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <a
                    href={`tel:${content.cta?.phone}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#d6e3ee] hover:bg-white transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#fff3ec] text-[#ff6c1f] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className="block text-xs text-gray-500 font-medium">Direct Line</span>
                      <span className="text-sm font-bold text-[#131126] truncate">{content.cta?.phone}</span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${content.cta?.email}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-[#d6e3ee] hover:bg-white transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#fff3ec] text-[#ff6c1f] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left overflow-hidden">
                      <span className="block text-xs text-gray-500 font-medium">Email Us</span>
                      <span className="text-sm font-bold text-[#131126] truncate">{content.cta?.email}</span>
                    </div>
                  </a>
                </div>

                <a
                  href={`tel:${content.cta?.phone}`}
                  className="btn-primary"
                >
                  <Phone className="w-4 h-4" />
                  <span>{content.cta?.buttonText || "Request a Free Quote"}</span>
                </a>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5 relative">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-white h-72 sm:h-96">
                  <img
                    src={content.cta?.painterImage}
                    alt="Decorator transforming wall"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 12. FOOTER */}
      <footer>
        <div className="container-custom">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Column 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4">
              <a href="#home" className="flex items-center gap-2.5 mb-4 inline-block">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff6c1f] to-[#f8a849] flex items-center justify-center text-white shadow-md shadow-[#ff6c1f]/20">
                  <PaintBrushIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white font-['Instrument_Sans']">
                  {content.brand?.name || "Coloria"}
                </span>
              </a>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">
                {content.footer?.tagline}
              </p>
              <div className="flex flex-col space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#ff6c1f]" />
                  <span>{content.brand?.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#ff6c1f]" />
                  <a href={`tel:${content.brand?.phone}`} className="hover:text-white">
                    {content.brand?.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#ff6c1f]" />
                  <span>{content.brand?.hours}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-white text-base font-bold mb-5 tracking-wide">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                {content.footer?.quickLinks?.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#ff6c1f]" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="text-white text-base font-bold mb-5 tracking-wide">Our Services</h4>
              <ul className="space-y-3 text-sm">
                {content.footer?.serviceLinks?.map((link, idx) => (
                  <li key={idx}>
                    <a href={link.href} className="hover:text-white flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-[#ff6c1f]" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Trust & Coverage (2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="text-white text-base font-bold mb-5 tracking-wide">Coverage</h4>
              <div className="text-xs text-gray-400 space-y-2">
                <p>• Kensington & Chelsea</p>
                <p>• Chiswick & Hammersmith</p>
                <p>• Fulham & Richmond</p>
                <p>• Notting Hill & Ealing</p>
                <p>• Westminster & Central</p>
              </div>
              <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-[11px] font-bold text-[#ff6c1f] block uppercase tracking-wider">Fully Insured</span>
                <span className="text-xs text-gray-300">£5M Public Liability</span>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>{content.footer?.copyright}</p>
            <div className="flex items-center gap-6">
              {content.footer?.legalLinks?.map((legal, idx) => (
                <a key={idx} href={legal.href} className="hover:text-gray-300">
                  {legal.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
