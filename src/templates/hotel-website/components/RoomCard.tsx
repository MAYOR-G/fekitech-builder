"use client";
import { BedDouble } from "lucide-react";
import type { Room } from "../data/siteContent";
import { ImageFrame } from "./ImageFrame";
import { ButtonLink } from "./ButtonLink";

type RoomCardProps = {
  room: Room;
};

export function RoomCard({ room }: RoomCardProps) {

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-charcoal/10 bg-pureWhite shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-bronze/35">
      <ImageFrame
        src={room.image}
        alt={room.name}
        className="h-64 bg-charcoal/5"
        imageClassName="transition duration-700 group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-bronze">
              From {room.price}
            </p>
            <h3 className="mt-2 font-display text-3xl leading-tight text-onyx">
              {room.name}
            </h3>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-onyx text-bronze">
            <BedDouble className="h-5 w-5" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 text-[15px] leading-7 text-charcoal/80">
          {room.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {room.highlights.map((item) => (
            <span
              key={item}
              className="rounded-full bg-charcoal/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-charcoal/80"
            >
              {item}
            </span>
          ))}
        </div>
        <ButtonLink href="#booking" variant="secondary" className="mt-7 w-full">
          Reserve room
        </ButtonLink>
      </div>
    </article>
  );
}
