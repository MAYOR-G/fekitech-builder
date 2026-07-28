"use client";
import type { Service } from "../data/siteContent";

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {

  const Icon = service.icon;

  return (
    <article className="group relative h-full overflow-hidden rounded-[1.35rem] border border-spark-electric-line/80 bg-white/95 p-6 shadow-card backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-spark-electric-cobalt/30 hover:shadow-blue">
      <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-spark-electric-cyan/10 transition duration-500 group-hover:scale-125 group-hover:bg-spark-electric-cyan/16" />
      <div className="absolute inset-x-6 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-spark-electric-cobalt via-spark-electric-cyan to-spark-electric-safety transition duration-500 group-hover:scale-x-100" />
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-spark-electric-cobalt/10 text-spark-electric-cobalt ring-1 ring-spark-electric-cobalt/10 transition duration-300 group-hover:bg-spark-electric-cobalt group-hover:text-white group-hover:ring-spark-electric-cyan/30">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="relative rounded-full border border-spark-electric-cobalt/10 bg-spark-electric-mist px-3 py-1 text-[11px] font-black uppercase tracking-[0.15em] text-spark-electric-cobalt">
          {service.tag}
        </span>
      </div>
      <h3 className="relative font-spark-electric-display text-2xl font-extrabold tracking-[-0.04em] text-spark-electric-navy">
        {service.title}
      </h3>
      <p className="relative mt-3 text-[15px] leading-7 text-spark-electric-steel/74">
        {service.description}
      </p>
      <div className="relative mt-6 flex items-center justify-between border-t border-spark-electric-line/80 pt-4">
        <span className="text-xs font-black uppercase tracking-[0.14em] text-spark-electric-steel/52">
          Service path
        </span>
        <span className="text-xs font-black uppercase tracking-[0.14em] text-spark-electric-cobalt">
          {service.tag}
        </span>
      </div>
    </article>
  );
}
