"use client";
import { CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";
import { BookingCTA } from "./components/BookingCTA";
import { Footer } from "./components/Footer";
import { GalleryCard } from "./components/GalleryCard";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { PricingCard } from "./components/PricingCard";
import { ProcessStep } from "./components/ProcessStep";
import { Reveal } from "./components/Reveal";
import { SectionHeader } from "./components/SectionHeader";
import { StylistCard } from "./components/StylistCard";
import { TestimonialCard } from "./components/TestimonialCard";

import { HorizontalScrollServices } from "./components/HorizontalScrollServices";
import './index.css';

import { useTemplateData } from "./TemplateContext";
export default function App() {
  const { brand, galleryItems, packages, processSteps, stylists, testimonials, trustPoints } = useTemplateData();

  return (
    <div className="min-h-screen overflow-clip bg-veil text-plum">
      <Navbar />
      <main>
        <Hero />

        <HorizontalScrollServices />

        <section id="pricing" className="relative overflow-hidden bg-pearl px-5 py-20 lg:px-8">
          <div className="absolute left-0 top-10 h-64 w-64 rounded-full bg-rose/12 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-champagne/30 blur-3xl" />
          <div className="relative mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Featured packages"
                title="Simple starting points for appointments that need a finished look."
                description="Package cards give clients simple starting points for beauty appointments, events, bridal planning, and regular care."
                align="center"
              />
            </Reveal>
            <div className="mt-11 grid gap-5 lg:grid-cols-3">
              {packages.map((item, index) => (
                <Reveal key={item.name} delay={index * 100}>
                  <PricingCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-plum px-5 py-20 text-pearl lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <SectionHeader
                eyebrow="Why choose us"
                title="Beauty appointments planned with skill, hygiene, comfort, and taste."
                description="The studio experience should feel calm from the first message through the final mirror check. These cards are built for trust signals that matter to salon clients."
                tone="light"
              />
              <div className="mt-8 rounded-[1.35rem] border border-white/12 bg-white/[0.07] p-5 shadow-insetLine">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-champagne text-plum">
                    <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.18em] text-champagne">
                      Easy appointment flow
                    </p>
                    <p className="mt-1 text-sm font-semibold text-pearl/70">
                      Designed for direct booking, calls, email, or salon software integration.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {trustPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <Reveal key={point.title} delay={index * 80}>
                    <article className="group h-full rounded-[1.2rem] border border-white/10 bg-white/[0.08] p-6 shadow-insetLine transition duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
                      <span className="grid h-12 w-12 place-items-center rounded-full bg-pearl text-plum transition duration-300 group-hover:bg-champagne">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h3 className="mt-6 font-display text-3xl font-semibold">
                        {point.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-pearl/70">
                        {point.description}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-cream px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Beauty transformations"
                title="Editorial image moments for results, rituals, and studio atmosphere."
                description="A polished gallery helps clients imagine results, studio atmosphere, bridal looks, nail details, and treatment rituals."
              />
            </Reveal>
            <div className="mt-10 grid auto-rows-[320px] gap-4 lg:grid-cols-4">
              {galleryItems.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 75}
                  className={index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}
                >
                  <GalleryCard item={item} featured={index === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="stylists" className="bg-veil px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <Reveal>
                <SectionHeader
                  eyebrow="Stylist team"
                  title="Team cards for artists, specialists, and senior stylists."
                  description="Introduce the people clients will trust with their look. Each profile keeps the tone professional while leaving room for personality."
                />
              </Reveal>
              <Reveal delay={120}>
                <div className="grid gap-3 rounded-[1.35rem] border border-plum/10 bg-pearl p-5 shadow-card sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-rose" aria-hidden="true" />
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-plum">
                      Color-safe treatments
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-5 w-5 text-rose" aria-hidden="true" />
                    <p className="text-sm font-black uppercase tracking-[0.14em] text-plum">
                      Appointment-first service
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {stylists.map((stylist, index) => (
                <Reveal key={stylist.name} delay={index * 90}>
                  <StylistCard stylist={stylist} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-pearl px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <Reveal>
              <SectionHeader
                eyebrow="Appointment process"
                title="A calm path from service selection to the final finish."
                description="This section helps clients understand what happens before the appointment, during the consultation, and after they leave the studio."
              />
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 80}>
                  <ProcessStep step={step} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="bg-plum-depth px-5 py-20 text-pearl lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Client reviews"
                title="Warm social proof for everyday beauty, bridal mornings, and regular care."
                description="Use these testimonial cards for Google reviews, client notes, wedding feedback, or before-and-after case study quotes."
                tone="light"
                align="center"
              />
            </Reveal>
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 90}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream px-5 py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_0.95fr]">
            <Reveal>
              <div className="h-full rounded-[1.6rem] bg-pearl p-7 shadow-card sm:p-8">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-rose">
                  Studio details
                </p>
                <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-plum sm:text-5xl">
                  Built for salons that need appointments, trust, and beautiful presentation.
                </h2>
                <p className="mt-5 text-lg leading-8 text-mink/72">
                  Add a map embed, booking widget, service menu PDF, stylist availability,
                  bridal inquiry form, or policy page as the business grows.
                </p>
              </div>
            </Reveal>
            <Reveal delay={110}>
              <div className="grid h-full gap-4 sm:grid-cols-2">
                <article className="rounded-[1.2rem] bg-plum p-6 text-pearl shadow-plum">
                  <MapPin className="h-5 w-5 text-champagne" aria-hidden="true" />
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-champagne">
                    Location
                  </p>
                  <p className="mt-3 text-lg font-bold leading-7">{brand.address}</p>
                </article>
                <article className="rounded-[1.2rem] border border-plum/10 bg-pearl p-6 shadow-card">
                  <Clock3 className="h-5 w-5 text-rose" aria-hidden="true" />
                  <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-rose">
                    Hours
                  </p>
                  <p className="mt-3 text-lg font-bold leading-7 text-plum">
                    {brand.hours}
                  </p>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal>
          <BookingCTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
