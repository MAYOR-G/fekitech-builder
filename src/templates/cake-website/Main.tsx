"use client";
import "./index.css";
import { AboutStudio } from "./components/AboutStudio";
import { CategoryCard } from "./components/CategoryCard";
import { CTA } from "./components/CTA";
import { FAQ } from "./components/FAQ";
import { FeatureCard } from "./components/FeatureCard";
import { Footer } from "./components/Footer";
import { GalleryCard } from "./components/GalleryCard";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { ProcessStep } from "./components/ProcessStep";
import { ProductCard } from "./components/ProductCard";
import { Reveal } from "./components/Reveal";
import { SectionHeader } from "./components/SectionHeader";
import { TestimonialCard } from "./components/TestimonialCard";

import { useTemplateData } from "./TemplateContext";
function App() {
  const { brand, categories, features, galleryItems, processSteps, products, testimonials } = useTemplateData();

  return (
    <div className="min-h-screen overflow-hidden bg-white text-ganache">
      <Navbar />
      <main>
        <Hero />

        <AboutStudio />

        <section id="categories" className="px-5 py-32 lg:px-8 bg-white border-y border-chocolate/5">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end mb-20">
                <SectionHeader
                  eyebrow="The Collection"
                  title="Celebration cakes with a polished point of view."
                  description="A refined menu structure for wedding cakes, birthdays, cupcakes, dessert boxes, and bespoke celebration orders."
                />
                <p className="max-w-xl text-[1.05rem] leading-[1.8] tracking-wide text-[#2D2D2D] lg:justify-self-end pb-2">
                  Choose from signature celebration styles or begin with a custom
                  brief. Every order is guided with clear sizing, flavour, finish,
                  and delivery recommendations.
                </p>
              </div>
            </Reveal>
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {categories.map((category, index) => (
                <Reveal key={category.title} delay={index * 100}>
                  <CategoryCard category={category} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="bg-white px-5 py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Menu Highlights"
                title="Sweet centrepieces, boxed beautifully."
                description="A curated menu of celebration cakes, gift-ready bakes, and dessert table favourites with clear starting prices."
                align="center"
              />
            </Reveal>
            <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.name} delay={index * 100}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="px-5 py-32 lg:px-8 bg-white border-t border-chocolate/5">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="The Experience"
                title="From first idea to the final ribbon."
                description="A simple order journey reassures clients who need custom cake details, delivery planning, and celebration timing handled clearly."
                align="center"
              />
            </Reveal>
            <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 100}>
                  <ProcessStep step={step} index={index} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="why" className="bg-ganache px-5 py-32 text-cream lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <div className="sticky top-32">
                <SectionHeader
                  eyebrow="The Standard"
                  title="Desserts that taste deeply considered."
                  description={`${brand.name} pairs design-led finishing with reliable ordering, careful packaging, and flavours guests remember.`}
                  className="[&_h2]:text-cream [&_p:last-child]:text-cream/70"
                />
              </div>
            </Reveal>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:pl-10 border-l border-white/5">
              {features.map((feature, index) => (
                <Reveal key={feature.title} delay={index * 100}>
                  <FeatureCard feature={feature} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="px-5 py-32 lg:px-8 bg-white">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Design Archive"
                title="A gallery to imagine the finish."
                description="Explore floral tiers, chocolate finishes, cupcake palettes, and buttercream textures for weddings, parties, and private events."
              />
            </Reveal>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {galleryItems.map((item, index) => (
                <Reveal key={item.title} delay={index * 100}>
                  <GalleryCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-white px-5 py-32 lg:px-8 border-t border-chocolate/5">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Client Notes"
                title="Social proof for milestone events."
                description="Clients come to us for polished design, calm communication, and cakes that arrive event-ready."
                align="center"
              />
            </Reveal>
            <div className="mt-20 grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 100}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <FAQ />

        <Reveal>
          <CTA />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}

export default App;
