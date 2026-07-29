import React from "react";
import { useTemplateData } from "../TemplateContext";

export default function Gallery() {
  const { gallery } = useTemplateData();

  return (
    <section className="gf-gallery" id="gallery">
      <div className="gf-gallery-head">
        <div>
          <span>Gallery</span>
          <h2>{gallery.title}</h2>
        </div>
        <p>{gallery.description}</p>
      </div>

      <div className="gf-gallery-grid">
        {[...gallery.rowOne, ...gallery.rowTwo].map((img, i) => (
            <div key={i} className="gf-gallery-item">
              <img src={img.image} alt={img.imageAlt} />
              <div>
                {img.caption}
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
