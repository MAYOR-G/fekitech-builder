"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import "./index.css";
import { AmenityCard } from "./components/AmenityCard";
import { BookingCTA } from "./components/BookingCTA";
import { Footer } from "./components/Footer";
import { GalleryCard } from "./components/GalleryCard";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Reveal } from "./components/Reveal";
import { RoomCard } from "./components/RoomCard";
import { SectionHeader } from "./components/SectionHeader";
import { TestimonialCard } from "./components/TestimonialCard";

import { useTemplateData } from "./TemplateContext";
function App() {
  const { amenities, brand, galleryItems, locationHighlights, rooms, testimonials } = useTemplateData();

  return (
    <div className="min-h-screen overflow-hidden bg-pureWhite text-charcoal">
      <Navbar />
      <main>
        <Hero />

        {/* Editorial Break */}
        <section id="about" className="px-5 py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <div className="max-w-4xl">
                <h2 className="font-display text-[2.75rem] leading-[1.1] text-onyx sm:text-6xl">
                  Stay categories that feel clear, calm, and easy to book.
                </h2>
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal/80">
                  From a tailored classic room to a penthouse stay, every option is framed around sleep, light, quiet, and the rituals that make travel feel restorative. The Marlowe House is designed for unhurried arrivals, soft mornings, easy meetings, and evenings that unfold without friction.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms" className="px-5 pb-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {rooms.map((room, index) => (
                <Reveal key={room.name} delay={index * 80}>
                  <RoomCard room={room} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="A Visual Story"
                title="Rooms, arrivals, dining, and quiet rituals."
                description="Designed to feel like a boutique lookbook rather than a generic travel grid."
              />
            </Reveal>
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 80}
                  className={index === 0 ? "sm:col-span-2 lg:col-span-2" : undefined}
                >
                  <GalleryCard item={item} featured={index === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section id="amenities" className="px-5 py-32 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <Reveal>
                <SectionHeader
                  eyebrow="Amenities"
                  title="Practical comforts presented with boutique restraint."
                  description="Essential services delivered with effortless care, ensuring your stay is perfectly calibrated."
                />
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 overflow-hidden rounded-[4px] aspect-[4/3]">
                  <TemplateImage src="/images/amenity_dining.png" alt="Boutique dining" className="h-full w-full object-cover" />
                </div>
              </Reveal>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {amenities.map((amenity, index) => (
                <Reveal key={amenity.title} delay={index * 60}>
                  <AmenityCard amenity={amenity} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="bg-alabaster px-5 py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <SectionHeader
                eyebrow="Guest reviews"
                title="Trust signals for weekend stays, business travel, and romantic getaways."
                description="Testimonials focus on care, quiet, convenience, and the hospitality details guests remember."
                align="center"
              />
            </Reveal>
            <div className="mt-16 grid gap-8 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Reveal key={testimonial.name} delay={index * 90}>
                  <TestimonialCard testimonial={testimonial} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="location" className="px-5 py-32 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <SectionHeader
                  eyebrow="Location and contact"
                  title="A calm address with everything arranged nearby."
                  description={`${brand.address}. ${brand.locationNote}`}
                />
              </Reveal>
              <Reveal delay={200}>
                <div className="mt-10 overflow-hidden rounded-[4px] aspect-video">
                  <TemplateImage src="/images/location_street.png" alt="Location" className="h-full w-full object-cover" />
                </div>
              </Reveal>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {locationHighlights.map((item, index) => (
                <Reveal key={item} delay={index * 70}>
                  <div className="rounded-[8px] border border-charcoal/10 bg-pureWhite p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-bronze/35">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-bronze">
                      Nearby
                    </p>
                    <p className="mt-4 font-display text-2xl leading-tight text-onyx">
                      {item}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
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

export default App;
