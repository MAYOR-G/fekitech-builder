"use client";
import type { Experience } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type ExperienceCardProps = {
  experience: Experience;
};

export function ExperienceCard({ experience }: ExperienceCardProps) {

  const Icon = experience.icon;

  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-[1.25rem] bg-onyx shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-deep sm:min-h-[430px]">
      <ImageFrame
        src={experience.image}
        alt={experience.title}
        className="absolute inset-0 h-full w-full"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-onyx/88 via-onyx/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-alabaster">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-onyx">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-3xl">{experience.title}</h3>
        <p className="mt-3 text-[15px] leading-7 text-alabaster/72">
          {experience.description}
        </p>
      </div>
    </article>
  );
}
