"use client";
import type { MenuCategory } from "../data/siteContent";

type MenuCardProps = {
  category: MenuCategory;
};

export function MenuCard({ category }: MenuCardProps) {

  const Icon = category.icon;

  return (
    <article className="group flex h-full flex-col rounded-[1.15rem] border border-cream/16 bg-[linear-gradient(155deg,rgba(255,242,215,0.1),rgba(255,242,215,0.045)_46%,rgba(242,159,69,0.065))] p-4 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-ember/48 hover:bg-cream/[0.09] sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold leading-none text-cream">
          {category.title}
        </h3>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ember/22 bg-ember/14 text-ember transition duration-300 group-hover:bg-ember group-hover:text-coal">
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
      </div>
      <div className="flex-1 space-y-4">
        {category.items.map((item) => (
          <div key={item.name} className="border-t border-cream/10 pt-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[14px] font-extrabold leading-5 text-cream">
                {item.name}
              </p>
              <p className="shrink-0 font-display text-xl font-semibold text-ember">
                {item.price}
              </p>
            </div>
            <p className="mt-2 text-[13px] leading-5 text-cream/58">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
