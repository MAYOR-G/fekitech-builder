"use client";
import "./index.css";
import { CheckCircle2, Gem, Hammer, Ruler, Truck } from "lucide-react";
import { CollectionCard } from "./components/CollectionCard";
import { ConsultationCTA } from "./components/ConsultationCTA";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ImageFrame } from "./components/ImageFrame";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { Reveal } from "./components/Reveal";
import { SectionHeader } from "./components/SectionHeader";
import { ShowroomCard } from "./components/ShowroomCard";
import { TestimonialCard } from "./components/TestimonialCard";

import { useTemplateData } from "./TemplateContext";
const processSteps = [
  { title: "Measure", text: "We map the room, light, traffic, and exact dimensions.", icon: Ruler },
  { title: "Material", text: "Walnut, oak, linen, boucle, leather, bronze, and stone are edited together.", icon: Gem },
  { title: "Make", text: "Custom sizing and finish notes are handled before production begins.", icon: Hammer },
  { title: "Place", text: "Delivery, assembly, and styling happen with a white-glove close.", icon: Truck },
];

const transformationImages = [
  {
    title: "Before: a room without a focal point",
    image:
      "https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=84",
  },
  {
    title: "After: proportion, texture, and calm",
    image:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=84",
  },
];

const furnitureMarquee = [
  "Custom Sofas",
  "Walnut Dining",
  "Bedroom Suites",
  "Interior Styling",
  "Bronze Accents",
  "White-Glove Setup",
];

function App() {
  const { collections, features, products, showroomStories, testimonials } = useTemplateData();

  return (
    <div className="min-h-screen overflow-hidden bg-white text-charcoal">
      <Navbar />
      <main>
        <Hero />

        <section className="bg-[#4A3018] px-6 py-12 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border-y border-white/10 bg-white/10 md:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="bg-[#4A3018] px-6 py-8">
                  <Icon className="h-5 w-5 text-amber" />
                  <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-white">
                    {feature.title}
                  </p>
                  <p className="mt-2 font-sans text-sm leading-[1.6] text-white/80">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden border-y border-white/10 bg-[#4A3018] py-6">
          <div className="marquee-track flex w-max gap-8 px-4">
            {[...furnitureMarquee, ...furnitureMarquee].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="font-display text-4xl uppercase leading-none text-white/80 sm:text-5xl"
              >
                {item}
                <span className="ml-8 text-amber">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="px-6 py-24 lg:px-8 bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <Reveal>
              <div className="relative">
                <ImageFrame
                  src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=86"
                  alt="Elegant interior with sculptural furniture"
                  className="min-h-[520px] shadow-sm rounded-2xl"
                  imageClassName="transition duration-700 hover:scale-105"
                />
                <div className="absolute -bottom-8 right-4 max-w-xs bg-white p-8 text-charcoal shadow-sm border border-charcoal/5 sm:right-10 rounded-2xl">
                  <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate">
                    Studio note
                  </p>
                  <p className="mt-3 font-display text-[28px] leading-tight text-charcoal">
                    Calm is designed before it is decorated.
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <SectionHeader
                eyebrow="Interior furniture studio"
                title="Calm, intentional pieces designed for real homes."
                description="Every room starts with proportion. We balance generous seating, tactile materials, quiet storage, and the small finishing pieces that make a space feel composed instead of filled."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {["Custom Pieces", "Interior Styling", "Handpicked Materials", "Delivery & Setup"].map((item) => (
                  <div key={item} className="flex items-center gap-3 border-t border-charcoal/5 pt-4 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-charcoal">
                    <CheckCircle2 className="h-4 w-4 text-amber" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="collections" className="bg-[#4A3018] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
                <SectionHeader
                  theme="dark"
                  eyebrow="Featured collections"
                  title="Room-by-room pieces with a showroom eye."
                  description="Living rooms, dining rooms, bedrooms, offices, and outdoor spaces are built as complete atmospheres, not isolated products."
                />
                <p className="max-w-xl text-base leading-8 text-white/70 lg:justify-self-end">
                  A subtle category glide keeps the page commercial, while the
                  image-led cards keep it emotional. Every collection is chosen
                  for scale, finish, and how it holds a room together.
                </p>
              </div>
            </Reveal>
            <div className="mt-16 grid gap-6 md:grid-cols-12">
              {collections.map((collection, index) => {
                let colSpan = "";
                if (index === 0) colSpan = "md:col-span-7";
                else if (index === 1) colSpan = "md:col-span-5";
                else colSpan = "md:col-span-4";
                
                return (
                  <Reveal key={collection.title} delay={index * 65} className={colSpan}>
                    <CollectionCard collection={collection} />
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="transformation" className="bg-[#efe2d0] px-6 py-24 text-charcoal lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <Reveal className="lg:sticky lg:top-28 lg:h-fit">
              <SectionHeader
                eyebrow="Transformation"
                title="Better furniture changes the feeling of the entire room."
                description="The right scale can make a compact room feel generous. The right material can make a new space feel settled."
              />
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {transformationImages.map((item, index) => (
                <Reveal key={item.title} delay={index * 90}>
                  <ImageFrame
                    src={item.image}
                    alt={item.title}
                    className={index === 0 ? "min-h-[420px] md:mt-20 rounded-2xl border border-charcoal/5" : "min-h-[520px] rounded-2xl border border-charcoal/5"}
                    imageClassName="transition duration-700 hover:scale-105"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                    <h3 className="absolute bottom-6 left-6 right-6 font-display text-[28px] leading-[1.1] text-white">
                      {item.title}
                    </h3>
                  </ImageFrame>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="bg-[#4A3018] px-6 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.86fr_1.14fr]">
            <Reveal>
              <SectionHeader
                theme="dark"
                eyebrow="Materials and process"
                title="Warm woods, quiet textiles, precise finishes, and a clear route to delivery."
                description="Our process is polished but not precious. You get material direction, proper measurements, custom options, and a room that arrives ready to live in."
              />
            </Reveal>
            <div className="grid gap-5 sm:grid-cols-2">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <Reveal key={step.title} delay={index * 80}>
                    <article className="rounded-2xl border border-charcoal/5 bg-[#fbf7ef] p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
                      <div className="flex items-center justify-between gap-5">
                        <span className="font-display text-5xl text-slate/20">0{index + 1}</span>
                        <StepIcon className="h-6 w-6 text-amber" />
                      </div>
                      <h3 className="mt-8 font-display text-3xl leading-none text-charcoal">
                        {step.title}
                      </h3>
                      <p className="mt-4 font-sans text-sm leading-[1.7] text-slate">{step.text}</p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section id="products" className="bg-[#f7f0e6] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Selected pieces"
                title="A focused edit for considered rooms."
                description="Sofas, dining pieces, beds, storage, and accent tables with refined material notes and consultation-led ordering."
                align="center"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.name} delay={index * 75}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="showroom" className="bg-[#4A3018] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                theme="dark"
                eyebrow="Lookbook"
                title="Image-led rooms with a quiet luxury point of view."
                description="Every room setting brings furniture, light, art, palette, and proportion into one complete visual story."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {showroomStories.map((story, index) => (
                <Reveal key={story.title} delay={index * 90}>
                  <ShowroomCard story={story} featured={index === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Reveal>
          <ConsultationCTA />
        </Reveal>

        <section id="testimonials" className="bg-[#efe2d0] px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Client words"
                title="Social proof for homeowners, designers, and project buyers."
                description="Clients come to Oak & Ivory for an experience that feels attentive, transparent, and quietly luxurious from first visit to final placement."
                align="center"
              />
            </Reveal>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 90}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
