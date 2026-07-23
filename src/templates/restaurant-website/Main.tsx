"use client";
import "./index.css";
import { ExperienceCard } from "./components/ExperienceCard";
import { FeaturedDishCard } from "./components/FeaturedDishCard";
import { Footer } from "./components/Footer";
import { GalleryCard } from "./components/GalleryCard";
import { Hero } from "./components/Hero";
import { HoursLocation } from "./components/HoursLocation";
import { MenuCard } from "./components/MenuCard";
import { Navbar } from "./components/Navbar";
import { ReasonCard } from "./components/ReasonCard";
import { ReservationCTA } from "./components/ReservationCTA";
import { Reveal } from "./components/Reveal";
import { ReviewCard } from "./components/ReviewCard";
import { SectionHeader } from "./components/SectionHeader";

import { useTemplateData } from "./TemplateContext";
function App() {
  const { experiences, featuredDishes, galleryItems, menuCategories, reasons, reviews } = useTemplateData();

  return (
    <div className="min-h-screen bg-dining-room text-cream">
      <Navbar />
      <main>
        <Hero />

        <section
          id="dishes"
          className="page-panel hero-overlap bg-white px-5 py-20 text-coal lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                <SectionHeader
                  eyebrow="Signature dishes"
                  title="Food photography, pricing, and appetite in the first few scrolls."
                  description="The featured dish cards are built for quick discovery: name, category, price, image, and a polished description guests can trust."
                />
                <p className="max-w-xl text-base leading-8 text-graphite/72 lg:justify-self-end">
                  Signature cards make best sellers, seasonal specials, brunch
                  favorites, chef tasting highlights, and private dining menus
                  easy to scan.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredDishes.map((dish, index) => (
                <Reveal key={dish.name} delay={index * 80}>
                  <FeaturedDishCard dish={dish} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="page-panel section-divider px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Menu preview"
                title="A concise menu that feels curated, not crowded."
                description="Categories keep the restaurant experience useful for casual dining, fine dining, cafés, lounges, grills, and chef-led menus without turning the site into a PDF menu."
                align="center"
                tone="light"
              />
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {menuCategories.map((category, index) => (
                <Reveal key={category.title} delay={index * 70}>
                  <MenuCard category={category} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="experience"
          className="page-panel section-divider bg-coal px-5 py-20 lg:px-8"
        >
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Restaurant experience"
                title="Ambience, private dining, ingredients, and chef-led menus."
                description="This section makes the restaurant feel like a destination, not just a list of dishes."
                tone="light"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {experiences.map((experience, index) => (
                <Reveal key={experience.title} delay={index * 80}>
                  <ExperienceCard experience={experience} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="why"
          className="page-panel section-divider bg-warm-paper px-5 py-20 text-coal lg:px-8"
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr]">
            <Reveal>
              <SectionHeader
                eyebrow="Why dine with us"
                title="Designed to convert hungry visitors into booked tables."
                description="The page balances atmosphere, menu confidence, operational details, and reservation pathways for guests who are ready to book."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.map((reason, index) => (
                <Reveal key={reason.title} delay={index * 80}>
                  <ReasonCard reason={reason} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="page-panel section-divider px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Gallery"
                title="A visual rhythm for food, drinks, craft, and dining-room atmosphere."
                description="Large image cards help the restaurant feel inspectable and desirable before guests make a reservation."
                tone="light"
              />
            </Reveal>
            <div className="mt-12 rounded-[1.4rem] bg-cream/[0.035] p-3 shadow-glow sm:p-4">
              <div className="grid gap-3 lg:grid-cols-[1.15fr_0.9fr_0.9fr] lg:auto-rows-[270px]">
                {galleryItems.map((item, index) => (
                  <Reveal
                    key={item.title}
                    delay={index * 80}
                    className={
                      index === 0
                        ? "lg:row-span-2"
                        : index === 4
                          ? "lg:col-span-2"
                          : index === 5
                            ? "lg:col-start-3 lg:row-start-2 lg:row-span-2"
                            : undefined
                    }
                  >
                    <GalleryCard
                      item={item}
                      variant={
                        index === 0 || index === 5
                          ? "tall"
                          : index === 4
                            ? "wide"
                            : "standard"
                      }
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Reveal>
          <HoursLocation />
        </Reveal>

        <section id="reviews" className="page-panel section-divider px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Guest reviews"
                title="Warm social proof for date nights, family dinners, and private dining."
                description="Reviews focus on atmosphere, service, pacing, and food quality: the things restaurant guests actually use to decide."
                align="center"
                tone="light"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <Reveal key={review.name} delay={index * 90}>
                  <ReviewCard review={review} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Reveal>
          <ReservationCTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}

export default App;
