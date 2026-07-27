"use client";

import { TemplateImage } from "@/components/templates/TemplateImage";
import { imageSource } from "../assets";
import { useTemplateData } from "../TemplateContext";

export default function Gallery() {
  const { gallery } = useTemplateData();

  return (
    <section className="vs-gallery" aria-label="Ice cream gallery">
      <div className="vs-gallery-track">
        {gallery.items.map((item, index) => (
          <figure className="vs-gallery-item" key={item.title}>
            <TemplateImage src={imageSource(item.image)} alt={item.alt} loading="eager" />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
