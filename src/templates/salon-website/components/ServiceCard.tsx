"use client";
import { TemplateImage } from "@/components/templates/TemplateImage";
import type { Service } from "../data/siteContent";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {

  const Icon = service.icon;

  return (
    <article className="group h-full w-[280px] sm:w-[340px] overflow-hidden rounded-[1.2rem] border border-plum/10 bg-pearl shadow-card transition duration-300 hover:-translate-y-1 hover:border-rose/35 hover:shadow-glow flex flex-col">
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <TemplateImage 
          src={service.image} 
          alt={service.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
          loading="lazy" 
        />
        <div className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full bg-pearl/90 text-plum shadow-sm backdrop-blur-sm transition duration-300 group-hover:bg-plum group-hover:text-pearl">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-semibold text-plum">
            {service.title}
          </h3>
          <span className="font-display text-2xl font-semibold text-rose">
            {service.price}
          </span>
        </div>
        <p className="text-[15px] leading-7 text-mink/72">
          {service.description}
        </p>
      </div>
    </article>
  );
}
