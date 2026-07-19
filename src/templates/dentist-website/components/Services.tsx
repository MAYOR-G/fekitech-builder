"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { useState, type MouseEvent } from "react";
import { cn } from "../lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
type PreviewState = {
  visible: boolean;
  image: string;
  title: string;
  x: number;
  y: number;
};

export function Services() {
  const { services } = useTemplateData();

  const [preview, setPreview] = useState<PreviewState>({
    visible: false,
    image: "",
    title: "",
    x: 0,
    y: 0,
  });

  const showPreview = (
    event: MouseEvent<HTMLElement>,
    image: string,
    title: string
  ) => {
    setPreview({
      visible: true,
      image,
      title,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const movePreview = (event: MouseEvent<HTMLElement>) => {
    setPreview((current) => ({
      ...current,
      x: event.clientX,
      y: event.clientY,
    }));
  };

  return (
    <section id="treatments" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
            <SectionHeader
              eyebrow="Services and treatments"
              title="Care that moves from prevention to confident smile design."
              description="Each service card is written for real patient decisions: what the treatment helps with, how it is planned, and where comfort matters."
            />
            <p className="max-w-xl text-base leading-8 text-graphite/68 lg:justify-self-end">
              The template uses balanced content, real-world treatment language,
              and visual previews that can be replaced with client photography.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 70}>
                <article
                  className="service-card group relative h-full overflow-hidden rounded-[1.35rem] border border-ink/8 bg-porcelain p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-ocean/24 hover:shadow-soft"
                  onMouseEnter={(event) =>
                    showPreview(event, service.image, service.title)
                  }
                  onMouseMove={movePreview}
                  onMouseLeave={() =>
                    setPreview((current) => ({ ...current, visible: false }))
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-ocean shadow-insetGlow">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="rounded-full border border-ocean/14 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ocean">
                      {service.detail}
                    </span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl font-semibold leading-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-graphite/70">
                    {service.description}
                  </p>
                  <div className="mt-8 h-px bg-ink/8" />
                  <a
                    href="#appointment"
                    className="mt-5 inline-flex text-sm font-semibold text-ocean transition hover:text-ink focus:outline-none focus-visible:rounded-full focus-visible:ring-4 focus-visible:ring-ocean/18"
                  >
                    Discuss this treatment
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none fixed z-[80] hidden h-44 w-56 overflow-hidden rounded-[1.25rem] border border-white bg-white p-2 shadow-soft transition duration-200 lg:block",
          preview.visible ? "opacity-100" : "opacity-0"
        )}
        style={{
          transform: `translate3d(${preview.x + 18}px, ${preview.y - 120}px, 0)`,
        }}
        aria-hidden="true"
      >
        {preview.image ? (
          <TemplateImage
            src={preview.image}
            alt=""
            className="h-full w-full rounded-[1rem] object-cover"
          />
        ) : null}
        <span className="absolute bottom-4 left-4 rounded-full bg-white/86 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
          {preview.title}
        </span>
      </div>
    </section>
  );
}
