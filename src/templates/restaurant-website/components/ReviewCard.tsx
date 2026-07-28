"use client";
import { Quote, Star } from "lucide-react";
import type { Review } from "../data/siteContent";

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {

  return (
    <article className="h-full rounded-[1.1rem] border border-halcyon-table-cream/14 bg-[linear-gradient(150deg,rgba(255,242,215,0.09),rgba(255,242,215,0.04)_54%,rgba(242,159,69,0.055))] p-6 shadow-glow transition duration-300 hover:-translate-y-1 hover:border-halcyon-table-ember/36">
      <div className="flex items-center justify-between">
        <Quote className="h-8 w-8 text-halcyon-table-ember" aria-hidden="true" />
        <span className="inline-flex items-center gap-1 rounded-full bg-halcyon-table-ember px-3 py-1 text-sm font-black text-halcyon-table-coal">
          <Star className="h-3.5 w-3.5 fill-halcyon-table-coal" aria-hidden="true" />
          {review.rating}
        </span>
      </div>
      <p className="mt-6 text-[17px] font-semibold leading-8 text-halcyon-table-cream/92">
        &quot;{review.quote}&quot;
      </p>
      <div className="mt-7 flex items-center gap-3 border-t border-halcyon-table-cream/10 pt-5">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-halcyon-table-cream/12 bg-halcyon-table-sage text-sm font-black text-halcyon-table-coal">
          {review.initials}
        </span>
        <span>
          <span className="block font-extrabold text-halcyon-table-cream">{review.name}</span>
          <span className="block text-sm font-semibold text-halcyon-table-cream/54">
            {review.title}
          </span>
        </span>
      </div>
    </article>
  );
}
