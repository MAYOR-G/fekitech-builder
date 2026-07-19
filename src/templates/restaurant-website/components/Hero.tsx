"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { Clock3, MapPin, Star } from "lucide-react";
import { ButtonLink } from "./ButtonLink";

import { useTemplateData } from "../TemplateContext";
export function Hero() {
  const { brand, heroStats } = useTemplateData();

  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      <TemplateImage
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2200&q=95"
        alt="Sharp warm restaurant dining room with tables and evening ambience"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,15,0.88)_0%,rgba(17,17,15,0.68)_38%,rgba(17,17,15,0.2)_72%,rgba(17,17,15,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_24%,rgba(242,159,69,0.24),transparent_30%),linear-gradient(180deg,rgba(17,17,15,0.36)_0%,rgba(17,17,15,0.05)_48%,rgba(17,17,15,0.82)_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-coal to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pb-10 pt-32 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_0.58fr] lg:items-end">
          <div className="max-w-4xl animate-heroIn">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream/36 bg-coal/22 px-4 py-2 text-[0.72rem] font-black uppercase tracking-[0.18em] text-ember shadow-insetLine">
              <Star className="h-3.5 w-3.5 fill-ember" aria-hidden="true" />
              Dinner, cocktails, private dining
            </p>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.9] text-cream drop-shadow-[0_4px_22px_rgba(0,0,0,0.55)] sm:text-7xl md:text-8xl xl:text-[7.5rem]">
              Fire-kissed plates for nights worth slowing down.
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-cream/82 drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]">
              {brand.name} serves memorable dinners, chef specials, relaxed
              family meals, date nights, cocktails, and private dining
              reservations.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#reservation">Reserve a table</ButtonLink>
              <ButtonLink href="#menu" variant="outline">
                Explore the menu
              </ButtonLink>
            </div>
          </div>

          <div
            className="animate-heroIn space-y-4 lg:justify-self-end"
            style={{ animationDelay: "160ms" }}
          >
            <div className="max-w-sm border-l border-ember/70 pl-5">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-ember">
                Tonight&apos;s table note
              </p>
              <p className="mt-3 font-display text-3xl font-semibold leading-tight text-cream drop-shadow-[0_3px_16px_rgba(0,0,0,0.6)]">
                Open-fire specials, a low-lit room, and a host stand ready for
                dinner.
              </p>
            </div>
            <div className="grid max-w-sm gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: "Dinner from 5 PM", icon: Clock3 },
                { label: "Chicago dining room", icon: MapPin },
                { label: "Chef specials nightly", icon: Star },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 border border-cream/18 bg-coal/24 px-4 py-3 shadow-insetLine"
                  >
                    <Icon className="h-5 w-5 text-ember" aria-hidden="true" />
                    <p className="text-sm font-extrabold text-cream">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className="animate-heroIn border-l border-ember/54 bg-coal/20 px-5 py-4 shadow-insetLine"
              style={{ animationDelay: `${260 + index * 90}ms` }}
            >
              <p className="font-display text-4xl font-semibold leading-none text-ember">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-cream/72">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
