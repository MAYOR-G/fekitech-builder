"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { CheckCircle2 } from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function AboutClinic() {
  const { careHighlights, clinicImages } = useTemplateData();

  return (
    <section id="about" className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <Reveal>
          <div className="relative">
            <div className="image-reveal overflow-hidden rounded-[2rem] border border-white bg-white shadow-soft">
              <TemplateImage
                src={clinicImages.about}
                alt="Bright dental treatment room with a dentist consulting a patient."
                className="h-[520px] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 left-5 max-w-[330px] rounded-[1.5rem] border border-ink/8 bg-white/86 p-5 shadow-card backdrop-blur-xl sm:left-10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ocean">
                Comfort first
              </p>
              <p className="mt-2 text-sm leading-6 text-graphite/74">
                Every visit is paced around clarity, privacy, and gentle care
                before a handpiece ever turns on.
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeader
              eyebrow="About the clinic"
              title="A bright private practice for people who want careful, modern dentistry."
              description="Luma Dental Studio is built for patients who value clinical precision and a calmer experience. We combine preventive care, cosmetic planning, and restorative dentistry with clear communication at every visit."
            />
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {careHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.label} delay={index * 75}>
                  <div className="flex min-h-16 items-center gap-3 rounded-full border border-ink/8 bg-white/70 px-4 py-3 shadow-insetGlow">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-pearl text-ocean">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {item.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={210}>
            <div className="mt-9 grid gap-6 rounded-[1.5rem] border border-ocean/12 bg-white/78 p-5 shadow-card backdrop-blur md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <CheckCircle2 className="h-5 w-5 text-ocean" aria-hidden="true" />
                  Transparent treatment planning
                </div>
                <p className="mt-3 text-sm leading-7 text-graphite/70">
                  Patients receive realistic timelines, conservative options,
                  and documented recommendations before committing to care.
                </p>
              </div>
              <ButtonLink href="#experience" variant="secondary">
                See the Journey
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="mx-auto mt-20 grid max-w-7xl gap-6 rounded-[2rem] border border-ink/8 bg-ink p-4 shadow-soft lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-6">
          <div className="relative min-h-[340px] overflow-hidden rounded-[1.5rem]">
            <TemplateImage
              src={clinicImages.videoPoster}
              alt="Bright dental operatory prepared for a clinic walkthrough video."
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="px-2 py-5 text-white lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-mint">
              Inside our clinic
            </p>
            <h3 className="mt-4 font-display text-4xl font-semibold leading-tight">
              A quiet look at the rooms, tools, and patient flow.
            </h3>
            <p className="mt-5 text-base leading-8 text-white/72">
              Use this optional media block for an office photo gallery, 
              doctor introduction, or patient welcome image. The image 
              stays bright and gives patients a feel for your space.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
