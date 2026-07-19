"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

import { useTemplateData } from "../TemplateContext";
export function Team() {
  const { team } = useTemplateData();

  return (
    <section id="team" className="bg-white px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <SectionHeader
              eyebrow="Dentists and care team"
              title="A small clinical team with a patient-first chairside style."
              description="Profile cards keep the team human and credible without overloading the page with biographies."
            />
            <p className="max-w-xl text-base leading-8 text-graphite/68 lg:justify-self-end">
              Replace these profiles with real clinicians, credentials,
              affiliations, and professional photography before launch.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 85}>
              <article className="group overflow-hidden rounded-[1.5rem] border border-ink/8 bg-porcelain shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="image-reveal h-80 overflow-hidden">
                  <TemplateImage
                    src={member.image}
                    alt={`${member.name}, ${member.role}.`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-ocean">
                    {member.role}
                  </p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-graphite/70">
                    {member.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
