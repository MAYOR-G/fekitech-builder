"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { CheckCircle2, Clock3, Droplets, Phone, ShieldCheck, Wrench } from "lucide-react";
import { useTemplateData } from "./TemplateContext";
import "./index.css";

const services = [
  "Emergency repairs",
  "Bathroom installations",
  "Boiler servicing",
  "Leak detection",
];

export default function Main() {
  const content = useTemplateData();

  return (
    <div className="min-h-screen bg-[#f8fcff] text-[#07182d]">
      <header className="sticky top-0 z-40 border-b border-[#07182d]/10 bg-white/92 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8" aria-label="Primary navigation">
          <a href="#top" className="flex items-center gap-3 font-extrabold tracking-tight text-[#07182d]" aria-label="PipeSure home">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#18bdf2] text-white">
              <Wrench className="h-5 w-5" aria-hidden="true" />
            </span>
            PipeSure
          </a>
          <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <a href="#services" className="hover:text-[#057ca8]">Services</a>
            <a href="#about" className="hover:text-[#057ca8]">About</a>
            <a href="#contact" className="hover:text-[#057ca8]">Contact</a>
          </div>
          <a href="tel:+12125550191" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#07182d] px-4 text-sm font-bold text-white hover:bg-[#0d2b50]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call now
          </a>
        </nav>
      </header>

      <main>
        <section id="top" className="relative overflow-hidden px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#18bdf2]/12 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#057ca8]">
                <Clock3 className="h-4 w-4" aria-hidden="true" />
                24/7 local plumbing
              </p>
              <h1 className="max-w-4xl font-['Oswald'] text-6xl font-bold uppercase leading-[0.95] tracking-tight text-[#07182d] sm:text-7xl lg:text-8xl">
                {content.hero.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#30445c] sm:text-xl">
                {content.hero.subtitle}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#18bdf2] px-6 font-extrabold text-[#07182d] hover:bg-[#5ad7ff]">
                  {content.hero.button}
                </a>
                <a href="#services" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#07182d]/15 bg-white px-6 font-extrabold text-[#07182d] hover:border-[#18bdf2]">
                  View services
                </a>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {["Fixed-price quotes", "Licensed engineers", "Same-day callouts"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-lg bg-white p-3 text-sm font-bold shadow-sm ring-1 ring-[#07182d]/8">
                    <CheckCircle2 className="h-4 w-4 text-[#057ca8]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-[#dff6ff] shadow-2xl shadow-[#07182d]/12">
              <TemplateImage
                src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1400&q=90"
                alt="Professional plumber repairing pipework under a sink"
                className="absolute inset-0 h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07182d]/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl bg-white/92 p-5 backdrop-blur">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#057ca8]">Rapid response</p>
                <p className="mt-2 text-2xl font-extrabold text-[#07182d]">Repairs, installs, maintenance.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="border-y border-[#07182d]/8 bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[#057ca8]">What we fix</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-[#07182d]">Straightforward plumbing support.</h2>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article key={service} className="rounded-xl border border-[#07182d]/10 bg-[#f8fcff] p-6">
                  <Droplets className="h-7 w-7 text-[#18bdf2]" aria-hidden="true" />
                  <h3 className="mt-5 text-xl font-extrabold">{service}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#30445c]">
                    Clear diagnosis, tidy workmanship, and communication before any extra work begins.
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-center">
            <div className="rounded-2xl bg-[#07182d] p-8 text-white">
              <ShieldCheck className="h-10 w-10 text-[#18bdf2]" aria-hidden="true" />
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight">{content.about.title}</h2>
            </div>
            <div>
              <p className="text-xl leading-9 text-[#30445c]">{content.about.text}</p>
              <div id="contact" className="mt-8 rounded-xl border border-[#07182d]/10 bg-white p-6">
                <p className="font-extrabold text-[#07182d]">Need a plumber today?</p>
                <p className="mt-2 text-[#30445c]">Call +1 212 555 0191 or request a quote and we will confirm availability.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
