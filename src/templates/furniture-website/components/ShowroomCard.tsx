"use client";
import type { ShowroomStory } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";

type ShowroomCardProps = {
  story: ShowroomStory;
  featured?: boolean;
};

export function ShowroomCard({ story, featured = false }: ShowroomCardProps) {

  return (
    <article className={featured ? "lg:col-span-2" : undefined}>
      <ImageFrame
        src={story.image}
        alt={story.title}
        className="h-80 rounded-2xl shadow-sm sm:h-[420px]"
        imageClassName="transition duration-700 hover:scale-105"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <p className="font-mono text-[11px] font-extrabold uppercase tracking-[0.15em] text-white/80">
            {story.detail}
          </p>
          <h3 className="mt-3 font-display text-4xl font-semibold leading-none">
            {story.title}
          </h3>
          <p className="mt-4 max-w-xl font-sans text-sm leading-[1.7] text-white/90">
            {story.description}
          </p>
        </div>
      </ImageFrame>
    </article>
  );
}
